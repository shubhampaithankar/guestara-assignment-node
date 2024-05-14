# GUESTARA NODE AND EXPRESS ASSIGNMENT

## Installation

- Clone this repository: `git clone`
- Run `npm install`
- Create a `.env` file in the root directory and add your MongoDB connection URL as `MONGO_URI`
- Use `npm run dev` for development purposes
- Use `npm run build` for building

## Usage

### `/api/category` Routes

- *Get all categories*
-  **GET**  `/get-all` 

- *API to Get a category by name or ID along with its attributes*
-  **GET**  `/:identifier`

- *Get all subcategories under a category by categoryId*
-  **GET**  `/:categoryId/subcategories`

- *Get all items under a category*
-  **GET**  `/:categoryId/items`

- *Create a category*
-  **POST**  `/create`
```JSON
	{
		name: String,
		image: String,
		description: String,
		taxApplicability: Boolean,
		taxNumber: Number,
		taxType: String,
		items: []
	}
```

- *Create a subcategory under a category*
-  **POST**  `/:categoryId/subcategories/create`
```JSON
	{
		name: String,
		image: String,
		description: String,
		taxApplicability: Boolean,
		taxNumber: Number,
		taxType: String,
		items: []
	}
```
  
- *Create an item under a category*
-  **POST**  `/:categoryId/items/create`
```JSON
	{
		name: String,
		image: String,
		description: String,
		taxApplicability: Boolean,
		taxNumber: Number,
		baseAmount: Number,
		discount: Number
	}
```
  
- *Edit a category*
-  **POST**  `/edit/:categoryId`
```JSON
	{
		name: String,
		image: String,
		description: String,
		taxApplicability: Boolean,
		taxNumber: Number,
		taxType: String,
		subCategories: [],
		items: []
	}
```
  
### `/api/subcategory` Routes

- *Get all subcategories*
-  **GET**  `/get-all`
  
- *Get a subcategory by name or ID along with its attributes*
-  **GET**  `/:identifier`

- *Get all items under a sub-category*
-  **GET**  `/:subCategoryId/items`

- *Create an item under a subcategory*
-  **POST**  `/:subCategoryId/items/create`
```JSON
	{
		name: String,
		image: String,
		description: String,
		taxApplicability: Boolean,
		taxNumber: Number,
		baseAmount: Number,
		discount: Number
	}
```
  
- *Edit a subcategory attributes by ID*
-  **POST**  `/edit/:subCategoryId`
```JSON
	{
		name: String,
		image: String,
		description: String,
		taxApplicability: Boolean,
		taxNumber: Number,
		baseAmount: Number,
		discount: Number
	}
```

### `/api/item/` Routes

- *Get all items*
-  **GET**  `/get-all`

- *Get an item by name or ID along with its attributes*
-  **GET**  `/:identifier`

- *Create an item*
-  **POST**  `/create`
```JSON
	{
		name: String,
		image: String,
		description: String,
		taxApplicability: Boolean,
		taxNumber: Number,
		baseAmount: Number,
		discount: Number
	}
```

- *Edit item attributes by ID*
-  **POST**  `/edit/:id`
```JSON
	{
		name: String,
		image: String,
		description: String,
		taxApplicability: Boolean,
		taxNumber: Number,
		baseAmount: Number,
		discount: Number
	}
```

- *Search for items by their name*
-  **GET**  `/search/:itemName`

## Short Answers

1.  **Which database did you choose and why?**
I have used MongoDB Database for this project because I have a lot more control over it for a small assignment like this

2.  **3 things you learned from this assignment:**
- Linking Schemas together by using the `ref` property in the schemas
- Using the `populate` function provided by mongoose. It is a convenient method to get all the data needed by just having the `_id`
- Writing better code and not using redundant methods

3.  **What was the most difficult part of the assignment?**
- It was my first time using Vite to create applications so it was hard to get a grasp of its CLI and the library

4.  **What would you have done differently given more time?**
- Optimize the queries for better performance and fast calls
- Create a simple frontend app to demonstrate the queries in real-world example
