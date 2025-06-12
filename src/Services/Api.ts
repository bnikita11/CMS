// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// API.interceptors.request.use((config) => {
//   const loginToken = localStorage.getItem('LoginToken');
//   if (loginToken) {
//     config.headers.Authorization = `Bearer ${loginToken}`;
//   }
//   const signupToken=sessionStorage.getItem("signupToken");
//   if(signupToken){
//     config.headers.Authorization=`Bearer ${signupToken}`
//   }


//   const tenantId = localStorage.getItem('tenantId');
//   const userId = localStorage.getItem('userId');

//   if (tenantId) {
//     config.headers['Tenant-ID'] = tenantId;
//   }
//   if (userId) {
//     config.headers['User-ID'] = userId;
//   }

//   return config;
// });

// export default API;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  // Handle login token (for authenticated users)
  const loginToken = localStorage.getItem('LoginToken');
  if (loginToken) {
    config.headers.Authorization = `Bearer ${loginToken}`;
  }
  
  // Handle signup token (for tenant registration flow)
  const signupToken = sessionStorage.getItem("signupToken");
  if (signupToken) {
    config.headers.Authorization = `Bearer ${signupToken}`;
  }

  // Add tenant and user IDs to headers
  // Check both localStorage and sessionStorage for flexibility
  const tenantId = localStorage.getItem('tenantId') || sessionStorage.getItem('tenantId');
  const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');

  if (tenantId) {
    config.headers['Tenant-ID'] = tenantId;
  }
  if (userId) {
    config.headers['User-ID'] = userId;
  }

  console.log('API Request Headers:', {
    Authorization: config.headers.Authorization,
    'Tenant-ID': config.headers['Tenant-ID'],
    'User-ID': config.headers['User-ID']
  });

  return config;
});

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        method: error.config?.method,
        url: error.config?.url,
        headers: error.config?.headers
      }
    });
    return Promise.reject(error);
  }
);

export default API;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
