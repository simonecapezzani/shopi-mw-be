import NavClient from "../navClient";
import { CustomerData } from "../../../models/nav/customer";

export class NavCustomer extends NavClient {

    constructor() {
        super('customer'); // Scope set to 'customer' to use the customer WSDL 
    }

    /**
     * Creates a new customer account in Navision
     * @param customerData
     * @returns String return_value
     */
    public async createNewCustomerEntry(
        customerData: CustomerData
    ): Promise<string> {

        const result = await this.callMethod('CreateNewCustomerEntry', customerData);
        return result.return_value;
    }
}