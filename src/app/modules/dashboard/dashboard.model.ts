import mongoose, { Schema, Document, Model } from 'mongoose';
import { IPerson, IPrivacy, ISector } from './dashboard.interface';

const PersonSchema: Schema<IPerson> = new Schema({
    fullName: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, },
    bio: { type: String, required: true },
    professional: [{ type: String, }],
    education: { type: String, },
    barAdmission: { type: String, },
    awards: [{ type: String, }],
    practice: [{ type: String, }],
    industry: [{ type: String, }],
    // experience: { type: String, },
    // affiliation: { type: String, },
    category: { type: String, required: true },
    // socialLinks: {
    //     facebook: { type: String },
    //     twitter: { type: String },
    //     instagram: { type: String },
    //     linkedin: { type: String }
    // },
    profile_image: { type: String }
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

const SectorSchema: Schema<ISector> = new Schema({
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

const CSRSchema: Schema<ISector> = new Schema({
    title: { type: String },
    description: { type: String },
    image: { type: String }
}, {
    timestamps: true
});


const awardSchema: Schema<ISector> = new Schema({
    title: { type: String },
    description: { type: String },
    image: { type: String }
}, {
    timestamps: true
});


const FraudSchema: Schema<IPrivacy> = new Schema({
    description: { type: String, required: true }
}, {
    timestamps: true
});

const AboutSchema: Schema<IPrivacy> = new Schema({
    description: { type: String, required: true }
}, {
    timestamps: true
});
const Newsletters: Model<ISector> = mongoose.model<ISector>('Newsletters', NewslettersSchema);
const Events: Model<ISector> = mongoose.model<ISector>('Events', EventsSchema);
const Updates: Model<ISector> = mongoose.model<ISector>('Update', UpdatesSchema);
const Sector: Model<ISector> = mongoose.model<ISector>('Sector', SectorSchema);
const Person: Model<IPerson> = mongoose.model<IPerson>('Person', PersonSchema);




const Privacy: Model<IPrivacy> = mongoose.model<IPrivacy>('Privacy', PrivacySchema);
const Terms: Model<IPrivacy> = mongoose.model<IPrivacy>('Terms', TermsSchema); const Fraud: Model<IPrivacy> = mongoose.model<IPrivacy>('Fraud', FraudSchema);
const About: Model<IPrivacy> = mongoose.model<IPrivacy>('About', AboutSchema);
const CSR: Model<ISector> = mongoose.model<ISector>('CSR', CSRSchema);
const Award: Model<ISector> = mongoose.model<ISector>('Award', awardSchema);

const Disclaimer: Model<IPrivacy> = mongoose.model<IPrivacy>('Disclaimer', DisclaimerSchema);

export { Person, Sector, Privacy, Terms, Fraud, Disclaimer, Updates, Events, Newsletters, CSR, Award, About };
