import mongoose from "mongoose"

import CategorySchema from "./schemas/CategorySchema.js"
import SubCategorySchema from "./schemas/SubCategorySchema.js"
import ItemSchema from "./schemas/ItemSchema.js"

export const Category = mongoose.model('Category', CategorySchema)
export const SubCategory = mongoose.model('SubCategory', SubCategorySchema)
export const Item = mongoose.model('Item', ItemSchema)