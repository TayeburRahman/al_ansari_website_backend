import mongoose, { Schema, Document, Model } from 'mongoose';
import { IPerson, IPrivacy, ISector } from './dashboard.interface';

const PersonSchema: Schema<IPerson> = new Schema({
    fullName: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    bio: { type: String, required: true },
    professional: { type: String, required: true },
    education: { type: String, required: true },
    barAdmission: { type: String, required: true },
    sectors: [{ type: String, required: true }],
    practice: [{ type: String, required: true }],
    industry: [{ type: String, required: true }],
    experience: { type: String, required: true },
    affiliation: { type: String, required: true },
    socialLinks: {
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        linkedin: { type: String }
    },
    profile_image: { type: String }
}, {
    timestamps: true
});

const SectorSchema: Schema<ISector> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }
}, {
    timestamps: true
});

const PrivacySchema: Schema<IPrivacy> = new Schema({
    description: { type: String, required: true }
}, {
    timestamps: true
});
const TermsSchema: Schema<IPrivacy> = new Schema({
    description: { type: String, required: true }
}, {
    timestamps: true
});
const DisclaimerSchema: Schema<IPrivacy> = new Schema({
    description: { type: String, required: true }
}, {
    timestamps: true
});

const UpdatesSchema: Schema<ISector> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }
}, {
    timestamps: true
});

const EventsSchema: Schema<ISector> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }
}, {
    timestamps: true
});
const NewslettersSchema: Schema<ISector> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }
}, {
    timestamps: true
});

const Newsletters: Model<ISector> = mongoose.model<ISector>('Newsletters', NewslettersSchema);
const Events: Model<ISector> = mongoose.model<ISector>('Events', EventsSchema);
const Updates: Model<ISector> = mongoose.model<ISector>('Update', UpdatesSchema);
const Sector: Model<ISector> = mongoose.model<ISector>('Sector', SectorSchema);
const Person: Model<IPerson> = mongoose.model<IPerson>('Person', PersonSchema);
const Privacy: Model<IPrivacy> = mongoose.model<IPrivacy>('Privacy', PrivacySchema);
const Terms: Model<IPrivacy> = mongoose.model<IPrivacy>('Terms', TermsSchema);
const Disclaimer: Model<IPrivacy> = mongoose.model<IPrivacy>('Disclaimer', DisclaimerSchema);


export { Person, Sector, Privacy, Terms, Disclaimer, Updates, Events, Newsletters };
