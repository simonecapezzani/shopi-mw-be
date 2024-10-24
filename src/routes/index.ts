import { Router } from "express";
import shopifyRouter from './shopify';
import navRouter from './nav';

const router = Router();

router.use('/shopify', shopifyRouter);
router.use('/api/nav', navRouter);

export default router;