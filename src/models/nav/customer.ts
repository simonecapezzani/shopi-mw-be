export interface CustomerData {
    pEmail: string;
    pFiscalCode: string;
    pVATRegistrationNo: string;
    pFirstName: string;
    pLastName: string;
    pDateOfBirth: string; // Format 'YYYY-MM-DD'
    pMagentoCustomerType: string;
    pCustUniqueOfficeCode: string;
    pEmailPec: string;
    pCustMagentoId: number;
    pCustTypology: string;
    pPlaceOfBirth: string;
    pSex: number;
}

export const sampleCustomerData = {
    pEmail: 'cegopaf412@janfab.com',
    pFiscalCode: 'DGRGGS80D29G361Y',
    pVATRegistrationNo: '67890',
    pFirstName: 'Test',
    pLastName: 'Middleware',
    pDateOfBirth: '1980-01-01', // Ensure correct format
    pMagentoCustomerType: 'B2C_22',
    pCustUniqueOfficeCode: 'OFFICE123',
    pEmailPec: '',
    pCustMagentoId: 1,
    pCustTypology: 'Regular',
    pPlaceOfBirth: 'Civitanova Marche',
    pSex: 1,
};
