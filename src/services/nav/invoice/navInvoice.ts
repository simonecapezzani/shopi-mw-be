import NavClient from "../navClient";
import { InvoiceData } from "../../../models/nav/invoice";

/**
 * Inizialmente chiamo getSalesInvoices per vedere tutte le fatture e le note credito,
 * quando scelgo una fattura il servizio viene richiamato ma questa volta viene passato l'id
 * fattura come paramentro, returnano i dati e il PDF codificato
 */
export class NavInvoice extends NavClient{

    constructor(){
        super('invoice');
    }

    /**
     * Ritorna xml con fatture e note credito
     * 
     * @param invoiceData 
     * @returns return_value
     */
    public async getSalesInvoices(invoiceData: InvoiceData): Promise<string> {
        const result = await this.callMethod('GetSalesInvoices', invoiceData);
        return result.return_value;
    }
  
}