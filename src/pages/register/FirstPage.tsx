// import React, { useState } from 'react';

// import { Input } from '@/components/ui/input';  // Adjust the path if needed
// import  {Button}  from '@/components/ui/button'; // Import Button
// import { useNavigate } from "react-router-dom";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { BuildingIcon,PenIcon } from '@/assets/sidebar';
// import LeftSide from '@/components/ui/LeftSide';
// import { registerTenant } from '@/Services/auth';


// type Props = Record<string, never>;

// const RegisterPage: React.FC<Props> = () => {
//     const [organizationName, setOrganizationName] = useState('');
//     const [accountType, setAccountType] = useState('');
//     const [panVatNumber, setPanVatNumber]=useState("");
//       const navigate = useNavigate();
    

//     const handleOrganizationNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setOrganizationName(event.target.value);
//     };

//     const handlePanVatNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setPanVatNumber(event.target.value);
//     };

//     const handleAccountTypeChange = (value: string) => {
//         setAccountType(value);
//     };

//     const handleGetStarted = async (event: React.FormEvent) => {
//         event.preventDefault();
      
        
//     // Simple form validation
//     if (!accountType.trim()) {
//         alert("Please select an Account Type.");
//         return;
//     }

//     if (!organizationName.trim()) {
//         alert("Organization Name is required.");
//         return;
//     }

//     if (!panVatNumber.trim()) {
//         alert("Passport Number is required.");
//         return;
//     }

//     //   Handle the registration logic here
//         try{
//             const response= await registerTenant({organizationName,accountType,panVatNumber});
//             console.log(response);
//             const {token,tenantId}=response.data;
            
//             if(token){
//                 sessionStorage.setItem("jwtToken",token);
//                 sessionStorage.setItem("tenantId",tenantId)
//                 navigate("/sign-up");
//             }
//         }catch (error)
//         {
//             console.error("error registering",error);
//         }

// };





  
//     const handleSignIn = () => {
//         // Handle sign in navigation

//          navigate("/");
//         // console.log('Navigating to sign in');
//     };

//     return (
//   <div className="flex flex-col lg:flex-row h-screen w-full overflow-auto ">
//      <div className="hidden lg:block flex-[1]"> <LeftSide/></div>
   
//             <div className="flex flex-[1.95] justify-center items-center  bg-[#E6EBFA] py-10 px-4 sm:px-6 md:px-8">
//                 <div className="w-full max-w-md ">
//                     <h2 className="text-2xl font-medium font-poppins text-[#2B5BD4]  mb-6 text-left">Let's get started</h2>
//                     <form onSubmit={handleGetStarted} className="space-y-6">
//                         <div className="space-y-2">
//                             <label htmlFor="accountType" className="block text-sm font-medium text-gray-900">Select Account Type</label>
//                             <Select onValueChange={handleAccountTypeChange} value={accountType}>
//                                 <SelectTrigger className="w-full h-14">
//                                     <SelectValue placeholder="Select Account Type" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="corporate">Corporate</SelectItem>
//                                     <SelectItem value="individual">Individual</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>

//                         <div className="relative">
//                             <label htmlFor="organizationName" className="block text-sm font-medium text-gray-900">Organization / Individual Information</label>
//                             <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
//                             <BuildingIcon/>
//                             </span>
//                             <Input
//                                 type="text"
//                                 id="organizationName"
//                                 value={organizationName}
//                                 onChange={handleOrganizationNameChange}
//                                 placeholder="Enter your organization name"
//                                 required
//                                 className="w-full h-12 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                
//                             />
//                         </div>
//                         <div className="relative">
//                             <label htmlFor="panVatNumber" className="block text-sm font-medium text-gray-900">Pan/Vat cdNumber</label>
//                             <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
//                                 <PenIcon/>
//                             </span>
//                             <Input
//                                 type="text"
//                                 id="panVatNumber"
//                                 value={panVatNumber}
//                                 onChange={handlePanVatNumberChange}
//                                 placeholder="Pan/Vat Number"
//                                 // required
//                                 className="w-full h-12 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                         <Button type="submit" className="w-full h-12 py-2.5 bg-[#1B5BFF] text-white rounded-md text-lg font-semibold transition-colors duration-200 hover:bg-blue-700 mt-6 ">
//                             Get Started →
//                         </Button>
//                     </form>
                   
//                     <div className="flex items-center justify-center-safe mt-7 text-sm text-gray-700">
//                         Already have an account?{' '}
//                         <button type="button" onClick={handleSignIn} className="text-blue-600 ml-1 hover:underline font-medium">
//                             Sign in
//                         </button>
//                     </div>
               
//                     <footer className="flex justify-center mt-8 text-sm text-gray-600">
//                     <a href="/terms" className="text-blue-600 hover:underline ">Terms & Conditions/</a>
//                     <a href="/privacy" className=" text-blue-600 hover:underline">Privacy Policy</a>
//                    </footer>
//                 </div>
//             </div>
//             </div>
//     );
// };

// export default RegisterPage;








//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import React, { useState } from 'react';

import { Input } from '@/components/ui/input';  // Adjust the path if needed
import  {Button}  from '@/components/ui/button'; // Import Button
import { useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BuildingIcon,PenIcon } from '@/assets/sidebar';
import LeftSide from '@/components/ui/LeftSide';
import { registerTenant, decodeJwtToken } from '@/Services/auth';


type Props = Record<string, never>;

const RegisterPage: React.FC<Props> = () => {
    const [organizationName, setOrganizationName] = useState('');
    const [accountType, setAccountType] = useState('');
    const [panVatNumber, setPanVatNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    

    const handleOrganizationNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrganizationName(event.target.value);
    };

    const handlePanVatNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPanVatNumber(event.target.value);
    };

    const handleAccountTypeChange = (value: string) => {
        setAccountType(value);
    };

    const handleGetStarted = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
      
        // Simple form validation
        if (!accountType.trim()) {
            alert("Please select an Account Type.");
            setIsLoading(false);
            return;
        }

        if (!organizationName.trim()) {
            alert("Organization Name is required.");
            setIsLoading(false);
            return;
        }

        if (!panVatNumber.trim()) {
            alert("Pan/Vat Number is required.");
            setIsLoading(false);
            return;
        }

        try {
            console.log('Registering tenant with data:', { organizationName, accountType, panVatNumber });
            
            const response = await registerTenant({
                organizationName,
                accountType,
                panVatNumber
            });
            
            console.log('Tenant registration response:', response.data);
            
            const { token } = response.data;
            
            if (token) {
                // Store the signup token for the user registration step
                sessionStorage.setItem("signupToken", token);
                
                // Decode the JWT token to extract tenantId
                const decodedToken = decodeJwtToken(token);
                console.log('Decoded token:', decodedToken);
                
                if (decodedToken && decodedToken.tenantId) {
                    // Store tenantId for API headers
                    sessionStorage.setItem("tenantId", decodedToken.tenantId.toString());
                    
                    // For the first user registration, set userId to 0
                    // Backend will handle this: CreatedBy = userId == 0 ? 1 : userId
                    sessionStorage.setItem("userId", "0");
                    
                    console.log('Tenant registered successfully, navigating to signup');
                    navigate("/sign-up");
                } else {
                    throw new Error('Could not extract tenant ID from token');
                }
            } else {
                throw new Error('No token received from server');
            }
        } catch (error: unknown) {
            console.error("Error registering tenant:", error);
            
            let errorMessage = "An error occurred during registration.";
            
            // Type-safe error handling
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };
                if (axiosError.response?.data?.message) {
                    errorMessage = axiosError.response.data.message;
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignIn = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full overflow-auto ">
            <div className="hidden lg:block flex-[1]"> <LeftSide/></div>
       
            <div className="flex flex-[1.95] justify-center items-center  bg-[#E6EBFA] py-10 px-4 sm:px-6 md:px-8">
                <div className="w-full max-w-md ">
                    <h2 className="text-2xl font-medium font-poppins text-[#2B5BD4]  mb-6 text-left">Let's get started</h2>
                    <form onSubmit={handleGetStarted} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="accountType" className="block text-sm font-medium text-gray-900">Select Account Type</label>
                            <Select onValueChange={handleAccountTypeChange} value={accountType}>
                                <SelectTrigger className="w-full h-14">
                                    <SelectValue placeholder="Select Account Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="corporate">Corporate</SelectItem>
                                    <SelectItem value="individual">Individual</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="relative">
                            <label htmlFor="organizationName" className="block text-sm font-medium text-gray-900">Organization / Individual Information</label>
                            <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
                                <BuildingIcon/>
                            </span>
                            <Input
                                type="text"
                                id="organizationName"
                                value={organizationName}
                                onChange={handleOrganizationNameChange}
                                placeholder="Enter your organization name"
                                required
                                className="w-full h-12 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="panVatNumber" className="block text-sm font-medium text-gray-900">Pan/Vat Number</label>
                            <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
                                <PenIcon/>
                            </span>
                            <Input
                                type="text"
                                id="panVatNumber"
                                value={panVatNumber}
                                onChange={handlePanVatNumberChange}
                                placeholder="Pan/Vat Number"
                                required
                                className="w-full h-12 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full h-12 py-2.5 bg-[#1B5BFF] text-white rounded-md text-lg font-semibold transition-colors duration-200 hover:bg-blue-700 mt-6 disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : 'Get Started →'}
                        </Button>
                    </form>
                   
                    <div className="flex items-center justify-center-safe mt-7 text-sm text-gray-700">
                        Already have an account?{' '}
                        <button type="button" onClick={handleSignIn} className="text-blue-600 ml-1 hover:underline font-medium">
                            Sign in
                        </button>
                    </div>
               
                    <footer className="flex justify-center mt-8 text-sm text-gray-600">
                        <a href="/terms" className="text-blue-600 hover:underline ">Terms & Conditions/</a>
                        <a href="/privacy" className=" text-blue-600 hover:underline">Privacy Policy</a>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;