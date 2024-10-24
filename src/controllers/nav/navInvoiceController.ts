import { Request, Response } from "express";
import { NavInvoice } from "../../services/nav/invoice/navInvoice";
import { sampleInvoiceData } from "../../models/nav/invoice";

const invoiceService = new NavInvoice();

export default {

    getSalesInvoices: async (req: Request, res: Response) => {
        try {
            const result = await invoiceService.getSalesInvoices(sampleInvoiceData);
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


