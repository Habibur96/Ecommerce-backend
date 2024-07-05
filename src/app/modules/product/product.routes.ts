import express from 'express';
import { productControllers } from './product.controller';

const router = express.Router();

router.post('/', productControllers.createProduct);
router.get('/', productControllers.createProduct);

export const ProductRoutes = router;
