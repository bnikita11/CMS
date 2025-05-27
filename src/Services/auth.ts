// src/services/auth.ts
import API from '@/Services/Api';

export const registerTenant = (data: {
  organizationName: string;
  passportNumber:string;
  barLicenseNumber:string;
  licenseIssuingAuthority:string;
  accountType:string;
  
}) =>{ return API.post('/Auth/register-tenant', data);
};
export const signupUser = (data: {
  email: string;
  password: string;
  confirmPassword:string;
}) => {return API.post('/Auth/register-user', data); } 



export const loginUser =async (credentials: {
  email: string;
  password: string;
}) => {return await API.post('/Auth/login', credentials);};




export const contactInfo = (data: {
primaryContactNumber:string;
secondaryContactNumber: string;
  address: string;
  primaryUserName:string;
}) => { return API.put('/Auth/update-contact-info', data);};
