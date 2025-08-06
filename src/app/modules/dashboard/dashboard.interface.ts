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
    order: number;
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


export interface IMedia extends Document {
    facebook: string;
    linkedin: string;
    twitter: string;
    instagram: string;
}

export interface IPrivacy extends Document {
    description: string;
}
export interface IContactForm extends Document {
    phone: string;
    email: string;
    message: string;
}

export interface IContent extends Document {
    imageHero: string;
    textHero: string;
}
export interface ISubscriber extends Document {
    email: string;
}

export interface IAboutCount extends Document {
    totalClients: string;
    totalHours: string;
    totalCases: string;
}