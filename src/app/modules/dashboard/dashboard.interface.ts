import { Schema } from "mongoose";

export interface IRequest extends Document {
    body: any;
    files?: any | {
        [fieldname: string]: Express.Multer.File[];
    };
    user: {
        userId: string;
        authId: string;
    };
    query: {
        [key: string]: string;
    };
    params: {
        [key: string]: string;
    };
}

export interface IPerson extends Document {
    _id: Schema.Types.ObjectId;
    fullName: string;
    position: string;
    email: string;
    phoneNumber: string;
    bio: string;
    education: string;
    barAdmission: string;
    professional: string;
    awards: [string];
    category: string;
    experience: string;
    practice: [string];
    industry: [string];
    affiliation: string;
    socialLinks: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };
    profile_image?: string;
}

export interface ISector extends Document {
    title: string;
    description: string;
    image: string;
}

export interface IPrivacy extends Document {
    description: string;
}
export interface IContactForm extends Document {
    phone: string;
    email: string;
    message: string;
}

export interface ISubscriber extends Document {
    email: string;
}

export interface IAboutCount extends Document {
    totalClients: number;
    totalHours: number;
    totalCases: number;
}