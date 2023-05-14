import mongoose from "mongoose";
const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        notes: {
            type: String,
        }
    },
    { timestamps: true }
)
const contactModel = mongoose.model("Contact", ContactSchema);
export default contactModel;