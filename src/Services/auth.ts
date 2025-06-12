// // src/services/auth.ts
// import API from '@/Services/Api';

// export const registerTenant = (data: {
//   organizationName: string;
//   panVatNumber:string;
//   accountType:string;
  
// }) =>{ return API.post('/Auth/register-tenant', data);
// };
// export const signupUser = (
//   data: {
//     email: string;
//     password: string;
//     confirmPassword: string;
//     name: string;
//   }

// ) => {
//   return API.post('/Auth/register-user', { ...data });
// };




// export const loginUser =async (data: {
//   email: string;
//   password: string;
//   accountType:string;
// }) => {return await API.post('/Auth/login', data);};




// export const contactInfo = (data: {
// primaryContactNumber:string;
// secondaryContactNumber: string;
//   address: string;
// }) => { return API.put('/Auth/update-contact-info', data);};

// export const addClient=(data:{
//   accountType:string,
//   organizationName:string,
//   passportNumber:string,
//   clientName:string,
//   email:string,
//   status:string,
//   recentCase:string,
// })=>{return API.post("/Client",data)}





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


import API from '@/Services/Api';

export const registerTenant = (data: {
  organizationName: string;
  panVatNumber: string;
  accountType: string;
}) => {
  return API.post('/Auth/register-tenant', data);
};

export const signupUser = (data: {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}) => {
  return API.post('/Auth/register-user', { ...data });
};

export const loginUser = async (data: {
  email: string;
  password: string;
  accountType: string;
}) => {
  return await API.post('/Auth/login', data);
};

export const contactInfo = (data: {
  primaryContactNumber: string;
  secondaryContactNumber: string;
  address: string;
}) => {
  return API.put('/Auth/update-contact-info', data);
};

export const addClient = (data: {
  accountType: string;
  organizationName: string;
  passportNumber: string;
  clientName: string;
  email: string;
  status: string;
  recentCase: string;
}) => {
  return API.post("/Client", data);
};

// Utility function to decode JWT token
export const decodeJwtToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};