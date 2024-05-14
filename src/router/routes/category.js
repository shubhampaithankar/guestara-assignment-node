import { Router } from "express"
import mongoose from "mongoose"
import { Category, Item, SubCategory } from "../../database/index.js"

const router = Router()

// API to get all categories
router.get('/get-all', async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

// API to get a category by name or ID along with its attributes
router.get('/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params
        let category
          
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            category = await Category.findById(identifier)
        } else {
            category = await Category.find({ name: identifier })
        }
    
        if (!category) {
          return res.status(404).json({
            error: 'Category not found'
          })
        }
        
        res.json(category)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// Get all subcategories under a category by categoryId
router.get('/:categoryId/subcategories', async (req, res) => {
    try {
        const { categoryId } = req.params

        const category = await Category.findById(categoryId)
            .populate('subCategories')
        
            if (!category) {
            return res.status(404).json({
                error: 'Category not found'
            })
        }

        res.json(category)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

// API to get all items under a category
router.get('/:categoryId/items', async (req, res) => {
    try {
        const { categoryId } = req.params
        const category = await Category.findById(categoryId)
            .populate('items')
        res.json(category)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// API to create category
router.post('/create', async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            taxApplicability: req.body.taxApplicability,
            taxNumber: req.body.taxNumber,
            taxType: req.body.taxType,
            subCategories: [],
            items: []
        })

        const newCategory = await category.save()
        res.status(201).json(newCategory)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// Create a subcategory under a category
router.post('/:categoryId/subcategories/create', async (req, res) => {
    try {
        const { categoryId } = req.params
        const category = await Category.findById(categoryId)
        if (!category) {
            return res.status(404).json({
                error: 'Category not found'
            })
        }

        const subCategory = new SubCategory({
            ...req.body,
            categoryId: categoryId,
            // Set tax applicability and tax from the parent category
            taxApplicability: category.taxApplicability,
            tax: category.tax,
            items: req.body.items || []
        })

        await subCategory.save()

        category.subCategories.push(subCategory._id)
        await category.save()

        res.status(201).json(subCategory)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

// Create an item under a category
router.post('/:categoryId/items/create', async (req, res) => {
    try {
        const { categoryId } = req.params
        const category = await Category.findById(categoryId)
        if (!category) {
            return res.status(404).json({
                error: 'Category not found'
            })
        }

        const item = new Item({
            ...req.body,
            categoryId: categoryId,
            // Set tax applicability and tax from the parent category
            taxApplicability: category.taxApplicability,
            tax: category.tax
        })

        await item.save()

        category.items.push(item._id)
        await category.save()

        res.status(201).json(item)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

// Api to edit category
router.post('/edit/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, {
            new: true
        })
        if (updatedCategory) {
            res.json(updatedCategory)
        } else {
            res.status(404).json({
                message: "Category not found"
            })
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

export default router