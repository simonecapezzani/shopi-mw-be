import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    wsdlUrls: {
        customer: process.env.NAV_CUSTOMER_WSDL || '',
        invoice: process.env.NAV_INVOICE_WSDL || '',
    },
    navCredentials: {
        username: process.env.NAV_USERNAME || '',
        password: process.env.NAV_PASSWORD || '',
    },
    shopify:{
        apiKey: process.env.SHOPIFY_API_KEY || '',
        apiSecret: process.env.SHOPIFY_API_SECRET || '',
        appScopes: process.env.SHOPIFY_APP_SCOPES || ''
    },
    web:{
        address: process.env.FORWARDING_ADDRESS || ''
    },
    system:{
        frontendPath: process.env.FRONTEND_PATH || ''
    }

};