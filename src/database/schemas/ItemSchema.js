import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: false },
    description: { type: String, required: true },
    taxApplicability: { type: Boolean, default: false },
    tax: { type: Number, default: 0 },
    baseAmount: { type: Number, default: 0, required: true },
    discount: { type: Number, default: 0, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: false }
})

// Define a virtual property for totalAmount
itemSchema.virtual('totalAmount').get(function() {
    return this.baseAmount - this.discount
})

export default itemSchema