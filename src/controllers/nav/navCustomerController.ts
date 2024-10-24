import { Request, Response } from "express";
import { NavCustomer} from "../../services/nav/customer/navCustomer";
import { sampleCustomerData, CustomerData } from "../../models/nav/customer";

const customerService = new NavCustomer();

export default {

    createCustomer: async (req: Request, res: Response) => {
        try {
            const result = await customerService.createNewCustomerEntry(sampleCustomerData);
            console.log('RESPONSE:\n', result);
            res.send(result);
            return;
        } catch (err) {
            console.error(err);
            res.send(err);
            return;
        }
    }

}
