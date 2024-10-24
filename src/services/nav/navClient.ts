import { BasicAuthSecurity, createClientAsync } from "soap";
import { config } from '../../config';

export class NavClient {
    private wsdlUrl: string;
    private client: any = null;
    private username: string;
    private password: string;

    constructor(scope: keyof typeof config.wsdlUrls) {
        // Set the WSDL URL based on the provided scope (product, customer, order...)
        this.wsdlUrl = config.wsdlUrls[scope];
        this.username = config.navCredentials.username;
        this.password = config.navCredentials.password;
    }

    /**
     * Initialize SOAP client
     * @returns NavClient instance
     */
    protected async initClient() {

        const options = {
            wsdl_headers: { Authorization: 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64') },
            // Only for testing purposes
            wsdl_options: {
                timeout: 3000,
                // rejectUnauthorized: false,
                strictSSL: false
            }
        };

        console.log(`\nCurrent WSDL URL: ${this.wsdlUrl}\n`);
        if (!this.client) {
            try {
                console.log('Initializing SOAP client...');

                // Create the SOAP client instance 
                const client = await createClientAsync(this.wsdlUrl, options);

                // Set Basic authentication
                client.setSecurity(new BasicAuthSecurity(this.username, this.password));
                console.log('SOAP client created succesfully.');

                // Assing the client instance
                this.client = client;

            } catch (error) {
                console.error('Failed to create SOAP client:', error);
                throw new Error('Unable to initialize SOAP client');
            }
        }
        return this.client;
    }

    /**
     * Call a method of the SOAP service
     * @param methodName 
     * @param args 
     * @returns The result of the service
     */
    protected async callMethod(methodName: string, args: object) {
        const client = await this.initClient();

        console.log(`\nCalling the service: ${methodName}...`);
        args ? console.log(`Given args for the service:`, args ) : console.log("No args given for the service\n");

        // Set the endpoint manually because the "node-soap" module automatically 
        // sets the port in the URL and it goes in timeout
        client.setEndpoint(this.wsdlUrl);

        try {
            
            const result = await client[`${methodName}Async`](args);
            return result;

        } catch (error) {

            console.error(`Error calling ${methodName}`, error);
            throw error;
        }
    }
}

export default NavClient;