import express from 'express'
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  bulkInactiveCategories,
  getActiveCategories,
} from '../controllers/categoryController.js'
import upload from '../middleware/upload.js';


const categoryRoute = express.Router();

categoryRoute.post('/create', upload.single("image"), createCategory);
categoryRoute.get('/get-all', getAllCategories);
categoryRoute.get('/get/:id', getCategoryById);
categoryRoute.post('/update/:id', upload.single("image"), updateCategory);
categoryRoute.delete('/delete/:id', deleteCategory);
categoryRoute.post('/bulk-inactive', bulkInactiveCategories);
categoryRoute.get('/get-active', getActiveCategories);

export default categoryRoute;