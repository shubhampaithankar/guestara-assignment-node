import { Router } from "express"

import categoryRouter from './routes/category.js'
import subCategoryRouter from './routes/subcategory.js'
import itemRouter from './routes/item.js'

const router = Router()

router.use('/category', categoryRouter)
router.use('/subcategory', subCategoryRouter)
router.use('/item', itemRouter)

export default router