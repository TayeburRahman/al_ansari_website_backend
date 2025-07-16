import { Types } from "mongoose";
import { IPerson, IRequest, ISector } from "./dashboard.interface";
import { Award, CSR, Disclaimer, Events, Newsletters, Person, Privacy, Sector, Terms, Updates } from "./dashboard.model";

const testData = [
    {
        "title": "Finalist at Middle East Legal Awards",
        "image": "/assets/award (1).png",
        "description": "Al-Ansari & Associates has been shortlisted by the Corporate Counsel Middle East Legal Awards 2019, an event hosted by the Association of Corporate Counsel Middle East and Legal Week. The nomination is for the Construction Team of the Year category."
    },
    {
        "title": "Corporate Team of the Year",
        "image": "/assets/award (2).png",
        "description": "Al-Ansari & Associates has recently won the Middle East Legal Awards Corporate Team of the Year 2023 for drafting the key legislation 'establishing the legal framework for the World Cup'."
    },
    {
        "title": "Finalist at Middle East Legal Awards",
        "image": "/assets/award (3).png",
        "description": "Al-Ansari & Associates has been shortlisted by the Corporate Counsel Middle East Legal Awards 2020, an event hosted by the Association of Corporate Counsel Middle East and Legal Week. The nomination is for the Arbitration Team of the Year category."
    },
    {
        "title": "ACC Achievement Award",
        "image": "/assets/award (4).png",
        "description": "In May 2016 Al-Ansari & Associates beat strong competition from the Government of Dubai Legal Affairs Department, to win the Achievement Award, at the 2016 Association of Corporate Counsel (ACC) Middle East annual awards gala held in Dubai."
    },
    {
        "title": "Middle East M&A Deal of the Year",
        "image": "/assets/award (5).png",
        "description": "In 2015, our firm won 'Middle East M&A Deal of the Year' at the M&A Atlas awards for our work on Labregah Real Estate's acquisition of Barwa Commercial Avenue in Barwa City and the sale of its stake in Barwa Bank."
    },
    {
        "title": "Domestic Deal of the Year",
        "image": "/assets/award (6).png",
        "description": "We walked home with the award for 'Domestic Deal of the Year' at the International Financial Law Review 2014 Middle East Awards for our work on the sale of Barwa real estate assets."
    },
    {
        "title": "M&A Deal of the Year",
        "image": "/assets/award (7).png",
        "description": "Al-Ansari & Associates won the International Financial Law Review ('IFLR') award as the Deal of the Year 2020 in the State of Qatar in M&A."
    },
    {
        "title": "ACC Middle East Achievement Award",
        "image": "/assets/award (8).png",
        "description": "In May 2017, Mr. Salman Al-Ansari was awarded the ACC Middle East Achievement Award 2017 based on his work in relation to the promotion of the welfare of professional footballers in Qatar."
    },
    {
        "title": "Recommended Law Firm",
        "image": "/assets/award (9).png",
        "description": "In 2014, Al-Ansari & Associates was highly recommended as a leading firm in corporate/commercial dispute resolution by Chambers and Partners."
    }

]

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
        return await Privacy.findOneAndUpdate({}, payload, {
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
export const DashboardService = {
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
};
