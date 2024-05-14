import { Router } from "express"
import mongoose from "mongoose"
import { Item } from "../../database/index.js"

const router = Router()

// Get all items
router.get('/get-all', async (req, res) => {
  try {
    const items = await Item.find()
    res.json(items)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

// API to get an item by name or ID along with its attributes
router.get('/:identifier', async (req, res) => {
  const { identifier } = req.params
  try {
      let item

      if (mongoose.Types.ObjectId.isValid(identifier)) {
          item = await Item.findById(identifier)
      } else {
          item = await Item.find({ name: identifier })
      }

    if (!item) {
      return res.status(404).json({
        error: 'Item not found'
      })
    }

    res.json(item) 
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/create', async (req, res) => {
  try {

    const item = new Item(req.body)
    await item.save()

    res.status(201).json(item)
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

// API to edit item attributes
router.post('/edit/:id', async (req, res) => {
  try {
    const itemId = req.params.id
    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
      new: true
    })
    if (updatedItem) {
      res.json(updatedItem)
    } else {
      res.status(404).json({
        message: "Item not found"
      })
    }
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
})

// API to search the item by its name
router.get('/search/:itemName', async (req, res) => {
  try {
    const { itemName } = req.params
    const items = await Item.find({
      name: {
        $regex: new RegExp(itemName, "i")
      }
    })
    res.json(items)
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

export default router