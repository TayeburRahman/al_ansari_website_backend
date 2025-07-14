import { Types } from "mongoose";
import { IPerson, IRequest, ISector } from "./dashboard.interface";
import { Disclaimer, Events, Newsletters, Person, Privacy, Sector, Terms, Updates } from "./dashboard.model";


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
        phoneNumber: body.phoneNumber,
        bio: body.bio,
        professional: body.professional,
        education: body.education,
        barAdmission: body.barAdmission,
        sectors: parseArray(body.sectors),
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

const getAllPeople = async (): Promise<IPerson[]> => {
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
// =Events================================
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
    deleteNewsletters
};
