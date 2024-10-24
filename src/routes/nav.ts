import { Response, Request, Router } from "express";
import customerController from '../controllers/nav/navCustomerController';

const router = Router();

// Default request
router.get('/', async (req: Request, res: Response) => {
    res.send({ message: 'This is the default route for Navision APIs, try something else...' });
});

// Request to create a new customer account
router.get('/customer/create', customerController.createCustomer);


export default router;