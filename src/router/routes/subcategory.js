import { Router } from "express"
import mongoose from "mongoose"
import { SubCategory, Item } from "../../database/index.js"

const router = Router()

// Get all subcategories
router.get('/get-all', async (req, res) => {
  try {
    const subCategories = await SubCategory.find()

    res.json(subCategories)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

// Get a subcategory by name or ID along with its attributes
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params
    let subcategory
      
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      subcategory = await SubCategory.findById(identifier)
    } else {
      subcategory = await SubCategory.find({ name: identifier })
    }

    if (!subcategory) {
      return res.status(404).json({
        error: 'Subcategory not found'
      })
    }

    res.json(subcategory)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

// API to get all items under a sub-category
router.get('/:subCategoryId/items', async (req, res) => {
  const { subCategoryId } = req.params
  try {
    const items =  await SubCategory.findById(subCategoryId)
      .populate('items')

    res.json(items)
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

// Create an item under a subcategory
router.post('/:subCategoryId/items/create', async (req, res) => {
  try {
      const { subCategoryId } = req.params
      const subcategory = await SubCategory.findById(subCategoryId)
      if (!subcategory) {
          return res.status(404).json({
              error: 'SubCategory not found'
          })
      }

      const item = new Item({
          ...req.body,
          categoryId: subcategory.categoryId,
          subCategoryId: subcategory.id,
          // Set taxNumber applicability and taxNumber from the parent category
          taxApplicability: subcategory.taxApplicability,
          taxNumber: subcategory.taxNumber
      })

      await item.save()

      subcategory.items.push(item._id)
      await subcategory.save()

      res.status(201).json(item)
  } catch (error) {
      res.status(400).json({
          error: error.message
      })
  }
})

// Edit subcategory attributes by ID
router.post('/edit/:subCategoryId', async (req, res) => {
  try {
    const { subCategoryId } = req.params
    let subcategory = await SubCategory.findById(subCategoryId)
    if (!subcategory) {
      return res.status(404).json({
        error: 'Subcategory not found'
      })
    }

    subcategory.set(req.body)
    subcategory = await subcategory.save()

    res.json(subcategory)
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

export default router