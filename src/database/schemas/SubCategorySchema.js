import mongoose from "mongoose"

export default new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: false },
    description: { type: String, required: true },
    taxApplicability: { type: Boolean, default: false },
    taxNumber: { type: Number, required: false },
    taxType: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }],
})