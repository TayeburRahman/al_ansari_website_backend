import { Types } from "mongoose";
import { IPerson, IRequest, ISector } from "./dashboard.interface";
import { About, AboutCount, Award, ContactForm, CSR, Disclaimer, Events, Fraud, Newsletters, Person, Privacy, Sector, Subscriber, Terms, Updates } from "./dashboard.model";
import ApiError from "../../../errors/ApiError";
import Auth from "../auth/auth.model";



const totalCount = async () => {
    try {

        const [goldUsers, totalUpdates, totalEvents, totalNewsletters] = await Promise.all([
            Auth.countDocuments(),
            Updates.countDocuments(),
            Events.countDocuments(),
            Newsletters.countDocuments()
        ]);

        const [latestEvents, latestUpdates] = await Promise.all([
            Events.find({}).sort({ createdAt: -1 }).limit(5),
            Updates.find({}).sort({ createdAt: -1 }).limit(5)
        ]);

        return {
            count: {
                goldUsers,
                totalEvents,
                totalNewsletters,
                totalUpdates
            },
            latestUpdates,
            latestEvents
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: 'Error fetching data' };
    }
};



const mapPersonFields = (body: any, profileImage?: string) => {
    const parseArray = (value: any): string[] => {
        try {
            return typeof value === 'string' ? JSON.parse(value) : value;
        } catch (err) {
            return []; // or throw error if strict
        }
    };

    return {
        fullName: body.fullName,
        position: body.position,
        email: body.email,
        category: body.category,
        phoneNumber: body.phoneNumber,
        bio: body.bio,
        professional: parseArray(body.professional),
        education: body.education,
        barAdmission: body.barAdmission,
        awards: parseArray(body.awards),
        practice: parseArray(body.practice),
        industry: parseArray(body.industry),
        experience: body.experience,
        affiliation: body.affiliation,
        socialLinks: {
            facebook: body.facebook,
            twitter: body.twitter,
            instagram: body.instagram,
            linkedin: body.linkedin,
        },
        ...(profileImage && { profile_image: profileImage }),
    };
};

const createPerson = async (req: IRequest): Promise<IPerson> => {
    const { body, files } = req as any;

    const profileImage = files?.profile_image
        ? `/images/profile/${files.profile_image[0].filename}`
        : undefined;

    const personData = mapPersonFields(body, profileImage);

    const newPerson = await Person.create(personData);
    return newPerson;
};

const getAllPeople = async (req: any): Promise<IPerson[]> => {
    const category = req?.query?.category;

    if (category) {
        return await Person.find({ category });
    }

    return await Person.find()
};

const getAllSearch = async (req: any) => {
    try {
        const searchTerm = req.query?.searchTerm?.trim();


        const regex = new RegExp(searchTerm, "i");

        const [persons, updates, sectors, events, newsletters] = await Promise.all([
            Person.find({
                $or: [
                    { fullName: regex },
                    { position: regex },
                    { bio: regex },
                    { category: regex }
                ],
            }).select("fullName profile_image"),
            Updates.find({ $or: [{ title: regex }, { description: regex }] }).select("title image"),
            Sector.find({ $or: [{ title: regex }, { description: regex }] }).select("title image"),
            Events.find({ $or: [{ title: regex }, { description: regex }] }).select("title image"),
            Newsletters.find({ $or: [{ title: regex }, { description: regex }] }).select("title image"),


        ]);

        const results = [
            ...persons.map(p => ({ title: p.fullName, type: "person", id: p?._id, images: p?.profile_image })),
            ...updates.map(u => ({ title: u.title, type: "update", id: u?._id, images: u?.image })),
            ...sectors.map(s => ({ title: s.title, type: "sector", id: s?._id, images: s?.image })),
            ...events.map(e => ({ title: e.title, type: "event", id: e?._id, images: e?.image })),
            ...newsletters.map(n => ({ title: n.title, type: "newsletter", id: n?._id, images: n?.image })),
        ];

        return results;
    } catch (err) {
        console.error("Global search error:", err);
        throw new ApiError(404, "Something went wrong");
    }
};



const getPersonById = async (id: string): Promise<IPerson | null> => {
    if (!Types.ObjectId.isValid(id)) return null;
    return await Person.findById(id);
};

const updatePerson = async (id: string, req: IRequest): Promise<IPerson | null> => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid Person ID');
    }

    const { body, files } = req as any;

    const profileImage = files?.profile_image
        ? `/images/profile/${files.profile_image[0].filename}`
        : undefined;

    const updateData = mapPersonFields(body, profileImage);

    // console.log("updateData", body)

    const updatedPerson = await Person.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });

    return updatedPerson;
};

const deletePerson = async (id: string): Promise<boolean> => {
    if (!Types.ObjectId.isValid(id)) return false;
    const result = await Person.findByIdAndDelete(id);
    return !!result;
};

// =================================
const createSector = async (req: IRequest): Promise<ISector> => {
    const { body, files } = req;

    const payload: Partial<ISector> = {
        title: body.title,
        description: body.description,
    };

    if (files?.image && files.image.length > 0) {
        payload.image = `/images/image/${files.image[0].filename}`;
    }

    return await Sector.create(payload);
};

const getAllSectors = async (): Promise<ISector[]> => {
    return await Sector.find().sort({ createdAt: -1 });
};

const getSectorById = async (id: string): Promise<ISector | null> => {
    if (!Types.ObjectId.isValid(id)) return null;
    return await Sector.findById(id);
};

const updateSector = async (id: string, req: IRequest): Promise<ISector | null> => {
    if (!Types.ObjectId.isValid(id)) return null;

    const { body, files } = req;

    const updatePayload: Partial<ISector> = {
        title: body.title,
        description: body.description,
    };

    if (files?.image && files.image.length > 0) {
        updatePayload.image = `/images/image/${files.image[0].filename}`;
    }

    return await Sector.findByIdAndUpdate(id, updatePayload, {
        new: true,
        runValidators: true,
    });
};

const deleteSector = async (id: string): Promise<boolean> => {
    if (!Types.ObjectId.isValid(id)) return false;
    const result = await Sector.findByIdAndDelete(id);
    return !!result;
};

// =Updates================================
const createUpdates = async (req: IRequest): Promise<ISector> => {
    const { body, files } = req;

    const payload: Partial<ISector> = {
        title: body.title,
        description: body.description,
    };

    if (files?.image && files.image.length > 0) {
        payload.image = `/images/image/${files.image[0].filename}`;
    }

    return await Updates.create(payload);
};

const getAllUpdates = async (): Promise<ISector[]> => {
    return await Updates.find().sort({ createdAt: -1 });
};

const getUpdatesById = async (id: string): Promise<ISector | null> => {
    if (!Types.ObjectId.isValid(id)) return null;
    return await Updates.findById(id);
};

const updateUpdates = async (id: string, req: IRequest): Promise<ISector | null> => {
    if (!Types.ObjectId.isValid(id)) return null;

    const { body, files } = req;

    const updatePayload: Partial<ISector> = {
        title: body.title,
        description: body.description,
    };

    if (files?.image && files.image.length > 0) {
        updatePayload.image = `/images/image/${files.image[0].filename}`;
    }

    return await Updates.findByIdAndUpdate(id, updatePayload, {
        new: true,
        runValidators: true,
    });
};

const deleteUpdates = async (id: string): Promise<boolean> => {
    if (!Types.ObjectId.isValid(id)) return false;
    const result = await Updates.findByIdAndDelete(id);
    return !!result;
};

// =Events================================
const createEvents = async (req: IRequest): Promise<ISector> => {

    const { body, files } = req;

    const payload: Partial<ISector> = {
        title: body.title,
        description: body.description,
    };

    if (files?.image && files.image.length > 0) {
        payload.image = `/images/image/${files.image[0].filename}`;
    }

    return await Events.create(payload);
};

const getAllEvents = async (): Promise<ISector[]> => {

    return await Events.find().sort({ createdAt: -1 });
};

const getEventsById = async (id: string): Promise<ISector | null> => {
    if (!Types.ObjectId.isValid(id)) return null;
    return await Events.findById(id);
};

const updateEvents = async (id: string, req: IRequest): Promise<ISector | null> => {
    if (!Types.ObjectId.isValid(id)) return null;

    const { body, files } = req;

    const updatePayload: Partial<ISector> = {
        title: body.title,
        description: body.description,
    };

    if (files?.image && files.image.length > 0) {
        updatePayload.image = `/images/image/${files.image[0].filename}`;
    }

    return await Events.findByIdAndUpdate(id, updatePayload, {
        new: true,
        runValidators: true,
    });
};

const deleteEvents = async (id: string): Promise<boolean> => {
    if (!Types.ObjectId.isValid(id)) return false;
    const result = await Events.findByIdAndDelete(id);
    return !!result;
};
// =News================================
const createNewsletters = async (req: IRequest): Promise<ISector> => {
    const { body, files } = req;

    const payload: Partial<ISector> = {
        title: body.title,
        description: body.description,
    };

    if (files?.image && files.image.length > 0) {
        payload.image = `/images/image/${files.image[0].filename}`;
    }

    return await Newsletters.create(payload);
};

const getAllNewsletters = async (): Promise<ISector[]> => {
    return await Newsletters.find().sort({ createdAt: -1 });
};

const getNewslettersById = async (id: string): Promise<ISector | null> => {
    if (!Types.ObjectId.isValid(id)) return null;
    return await Newsletters.findById(id);
};

const updateNewsletters = async (id: string, req: IRequest): Promise<ISector | null> => {
    if (!Types.ObjectId.isValid(id)) return null;

    const { body, files } = req;

    const updatePayload: Partial<ISector> = {
        title: body.title,
        description: body.description,
    };

    if (files?.image && files.image.length > 0) {
        updatePayload.image = `/images/image/${files.image[0].filename}`;
    }

    return await Newsletters.findByIdAndUpdate(id, updatePayload, {
        new: true,
        runValidators: true,
    });
};

const deleteNewsletters = async (id: string): Promise<boolean> => {
    if (!Types.ObjectId.isValid(id)) return false;
    const result = await Newsletters.findByIdAndDelete(id);
    return !!result;
};

// =CSR================================
const createCSR = async (req: IRequest): Promise<ISector> => {
    const { body, files } = req;

    const payload: Partial<ISector> = {
        title: body.title,
        description: body.description,
    };

    if (files?.image && files.image.length > 0) {
        payload.image = `/images/image/${files.image[0].filename}`;
    }

    return await CSR.create(payload);
};

const getAllCSR = async (): Promise<ISector[]> => {

    return await CSR.find().sort({ createdAt: -1 });
};

const getCSRById = async (id: string): Promise<ISector | null> => {
    if (!Types.ObjectId.isValid(id)) return null;
    return await CSR.findById(id);
};

const updateCSR = async (id: string, req: IRequest): Promise<ISector | null> => {
    try {
        if (!Types.ObjectId.isValid(id)) {
            console.warn("Invalid ID format");
            return null;
        }

        const existingCSR = await CSR.findById(id);
        if (!existingCSR) {
            console.warn("CSR document not found");
            return null;
        }

        const { body, files } = req;

        const updatePayload: Partial<ISector> = {
            title: body?.title ?? existingCSR.title,
            description: body?.description ?? existingCSR.description,
            image: existingCSR.image, // default existing image
        };

        if (files?.image && files.image.length > 0) {
            updatePayload.image = `/images/image/${files.image[0].filename}`;
            console.log("Image filename:", files.image[0].filename);
        }

        // console.log("Updating CSR with ID:", id);
        // console.log("Update Payload:", updatePayload);

        const updatedCSR = await CSR.findByIdAndUpdate(id, updatePayload, {
            new: true,
            runValidators: true,
        });

        return updatedCSR;
    } catch (error) {
        console.error("Error updating CSR:", error);
        return null;
    }
};

const deleteCSR = async (id: string): Promise<boolean> => {
    if (!Types.ObjectId.isValid(id)) return false;
    const result = await CSR.findByIdAndDelete(id);
    return !!result;
};

// ======================================
const addTermsConditions = async (payload: any) => {
    const checkIsExist = await Terms.findOne();
    if (checkIsExist) {
        return await Terms.findOneAndUpdate({}, payload, {
            new: true,

            runValidators: true,
        });
    } else {
        return await Terms.create(payload);
    }
};

const getTermsConditions = async () => {
    return await Terms.findOne();
};

const addPrivacyPolicy = async (payload: any) => {
    const checkIsExist = await Privacy.findOne();
    if (checkIsExist) {
        return await Privacy.findOneAndUpdate({}, payload, {
            new: true,

            runValidators: true,
        });
    } else {
        return await Privacy.create(payload);
    }
};

const getPrivacyPolicy = async () => {
    return await Privacy.findOne();
};

const addDisclaimerPolicy = async (payload: any) => {
    const checkIsExist = await Disclaimer.findOne();
    if (checkIsExist) {
        return await Disclaimer.findOneAndUpdate({}, payload, {
            new: true,

            runValidators: true,
        });
    } else {
        return await Disclaimer.create(payload);
    }
};

const getDisclaimerPolicy = async () => {
    return await Disclaimer.findOne();
};


// =Award================================
const createAward = async (req: IRequest): Promise<ISector> => {
    const { body, files } = req;

    const payload: Partial<ISector> = {
        title: body.title,
        description: body.description,
    };

    if (files?.image && files.image.length > 0) {
        payload.image = `/images/image/${files.image[0].filename}`;
    }

    return await Award.create(payload);
};

const getAllAward = async (): Promise<ISector[]> => {
    // const deletes = await Award.deleteMany({})
    // const updates = await Award.insertMany(testData)
    return await Award.find().sort({ createdAt: -1 });
};

const getAwardById = async (id: string): Promise<ISector | null> => {
    if (!Types.ObjectId.isValid(id)) return null;
    return await Award.findById(id);
};

const updateAward = async (id: string, req: IRequest): Promise<ISector | null> => {
    try {
        if (!Types.ObjectId.isValid(id)) {
            console.warn("Invalid ID format");
            return null;
        }

        const existingAward = await Award.findById(id);
        if (!existingAward) {
            console.warn("Award document not found");
            return null;
        }

        const { body, files } = req;

        const updatePayload: Partial<ISector> = {
            title: body?.title ?? existingAward.title,
            description: body?.description ?? existingAward.description,
            image: existingAward.image, // default existing image
        };

        if (files?.image && files.image.length > 0) {
            updatePayload.image = `/images/image/${files.image[0].filename}`;
            console.log("Image filename:", files.image[0].filename);
        }

        // console.log("Updating CSR with ID:", id);
        // console.log("Update Payload:", updatePayload);

        const updatedAward = await Award.findByIdAndUpdate(id, updatePayload, {
            new: true,
            runValidators: true,
        });

        return updatedAward;
    } catch (error) {
        console.error("Error updating Award:", error);
        return null;
    }
};

const deleteAward = async (id: string): Promise<boolean> => {
    if (!Types.ObjectId.isValid(id)) return false;
    const result = await Award.findByIdAndDelete(id);
    return !!result;
};
// ==========================
const upsertFraud = async (payload: any) => {
    const checkIsExist = await Fraud.findOne();
    if (checkIsExist) {
        return await Fraud.findOneAndUpdate({}, payload, {
            new: true,

            runValidators: true,
        });
    } else {
        return await Fraud.create(payload);
    }
};

const getFraud = async () => {
    return await Fraud.findOne();
};

// ==========================
const upsertAboutUs = async (payload: any) => {
    const checkIsExist = await About.findOne();
    if (checkIsExist) {
        return await About.findOneAndUpdate({}, payload, {
            new: true,

            runValidators: true,
        });
    } else {
        return await About.create(payload);
    }
};

const getAboutUs = async () => {
    return await About.findOne();
};

// =========
const submitContactForm = async (payload: any) => {
    const result = await ContactForm.create(payload);
    return result;
};

const getContactForms = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
        ContactForm.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
        ContactForm.countDocuments(),
    ]);

    return {
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
        data,
    };
};


const submitSubscribe = async (payload: any) => {
    // prevent duplicate subscriptions by email
    const existing = await Subscriber.findOne({ email: payload.email });
    if (existing) return existing;

    const result = await Subscriber.create(payload);
    return result;
};

const getSubscribers = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
        Subscriber.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
        Subscriber.countDocuments(),
    ]);

    return {
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
        data,
    };
};


const upsertAboutCount = async (payload: any) => {
    const result = await AboutCount.findOneAndUpdate(
        {},
        payload,
        { new: true, upsert: true }
    );
    return result;
};

const getAboutCount = async () => {
    const result = await AboutCount.findOne();
    return result;
};

export const DashboardService = {
    getAllSearch,
    createPerson,
    getAllPeople,
    getPersonById,
    updatePerson,
    deletePerson,
    getDisclaimerPolicy,
    addDisclaimerPolicy,
    getTermsConditions,
    getPrivacyPolicy,
    addPrivacyPolicy,
    addTermsConditions,
    deleteSector,
    updateSector,
    getSectorById,
    getAllSectors,
    createSector,
    updateUpdates,
    deleteUpdates,
    createUpdates,
    getAllUpdates,
    getUpdatesById,
    deleteEvents,
    updateEvents,
    getAllEvents,
    getEventsById,
    createEvents,
    createNewsletters,
    getAllNewsletters,
    getNewslettersById,
    updateNewsletters,
    deleteNewsletters,
    deleteCSR,
    createCSR,
    updateCSR,
    getAllCSR,
    getCSRById,
    getAwardById,
    getAllAward,
    updateAward,
    createAward,
    deleteAward,
    upsertFraud,
    getFraud,
    upsertAboutUs,
    getAboutUs,
    totalCount,
    submitContactForm,
    getContactForms,
    getAboutCount,
    upsertAboutCount,
    getSubscribers,
    submitSubscribe
};
