// import React, { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import  {Button}  from '@/components/ui/button';
// import { cn } from '@/lib/utils'; // For conditional class names
// import { useNavigate } from 'react-router-dom';
// import LeftSide from '@/components/ui/LeftSide';
// import { signupUser } from '@/Services/auth';
// import { InputUserIcon, LockIcon } from '@/assets/sidebar';
// // import axios from 'axios';

// type Props=Record<string,never>

// const RegisterPage2: React.FC<Props> = () => {
//     const [name,setName]=useState("");
//     const [nameError,setNameError]=useState("");
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [confirmPasswordError, setConfirmPasswordError] = useState('');
//     const navigate=useNavigate();

 



//     const handleNameChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
//         setName(event.target.value);
//         setNameError("");
//     }

//     const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setEmail(event.target.value);
//         setEmailError(''); // Clear error on input change
//     };

//     const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setPassword(event.target.value);
//         setPasswordError(''); // Clear error on input change
//     };

//     const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setConfirmPassword(event.target.value);
//         setConfirmPasswordError(''); // Clear error on input change
//     };

//     const validateForm = () => {
//         let isValid = true;
//         let emailErrorMessage = '';
//         let passwordErrorMessage = '';
//         let confirmPasswordErrorMessage = '';
//         let nameErrorMessage="";

//         // name validation
//         if(!name.trim()){
//             nameErrorMessage="Name is required";
//             isValid=false;
//         }
//         setNameError(nameErrorMessage);

//         // Email validation
//         if (!email.trim()) {
//             emailErrorMessage = 'Email is required';
//             isValid = false;
//         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
//             emailErrorMessage = 'Invalid email address';
//             isValid = false;
//         }
//         setEmailError(emailErrorMessage);

//         // Password validation
//         if (!password.trim()) {
//             passwordErrorMessage = 'Password is required';
//             isValid = false;
//         } else if (password.length < 8) {
//             passwordErrorMessage = 'Password must be at least 8 characters';
//             isValid = false;
//         }
//         setPasswordError(passwordErrorMessage);

//         // Confirm Password validation
//         if (!confirmPassword.trim()) {
//             confirmPasswordErrorMessage = 'Confirm Password is required';
//             isValid = false;
//         } else if (confirmPassword !== password) {
//             confirmPasswordErrorMessage = 'Passwords do not match';
//             isValid = false;
//         }
//         setConfirmPasswordError(confirmPasswordErrorMessage);

//         return isValid;
//     };

//     const handleNext =async (event: React.FormEvent) => {
//         event.preventDefault();
//         if (validateForm()) 
//         {
//             try{
//             const response= await signupUser({email,password,confirmPassword,name});       
//             const { token, user, tenantId } = response.data;  
//             sessionStorage.setItem('signupToken', token); // ✅ match interceptor
//             localStorage.setItem('userId', user.userId); // Save userId
//             localStorage.setItem('tenantId', tenantId); // ✅ ADD THI

//             navigate("/contact")}

//         catch(error){
//          console.error("error signing up",error)
//         }   
//     };};
       
// //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // try {
// //             const payload = {
// //                 email,
// //                 password,
// //                 confirmPassword,
// //                 name
// //                 // Removed confirmPassword as it's for frontend validation only
// //             };
// //             const response = await signupUser(payload); 
// //             console.log("Signup successful response:", response.data);

// //             const { token, user, tenantId } = response.data; // Backend explicitly returns user.userId and tenantId

// //             sessionStorage.setItem('signupToken', token); // Use 'signupToken' for consistency

// //             // FIX 4: Update localStorage with the actual userId and tenantId returned by the backend
// //             if (tenantId) { 
// //                 localStorage.setItem('tenantId', tenantId.toString()); 
// //             }
// //             if (user && user.userId) { // Access user.userId from the nested 'user' object
// //                 localStorage.setItem('userId', user.userId.toString()); 
// //             } else {
// //                 console.warn("User ID not found in signup response. Subsequent requests might fail if userId is required.");
// //             }

// //             navigate("/contact"); 

// //         } catch (error) {
// //             console.error("error signing up", error);
// //             // More robust error handling:
// //             if (axios.isAxiosError(error) && error.response) {
// //                 console.error("Backend error response:", error.response.data);
// //                 alert(`Error signing up: ${error.response.data.message || error.response.data || error.message}`);
// //             } else {
// //                 alert(`An unexpected error occurred: ${error.message}`);
// //             }
// //         }
// //     }
// // };
// //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    

    
//     return (
//        <div className="flex flex-col lg:flex-row h-screen w-full overflow-auto  ">
//        <div className="hidden lg:block flex-[1]"> <LeftSide/></div>

//         <div className="flex flex-[1.95] justify-center items-center  bg-[#E6EBFA] py-10 px-4 sm:px-6 md:px-8">
//             <div className="w-full max-w-md p-6 sm:p-8 md:p-10 rounded-md">
//                 <h2 className="text-2xl font-bold text-blue-900 mb-8 text-left">Sign up</h2>
//                     <form onSubmit={handleNext} className="space-y-4">
//                         <div className="input-group relative">
//                             <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">Name</label>
//                             <span className='absolute inset-y-0 left-0 pl-3 pt-3 flex items-center text-gray-500'>
//                             <InputUserIcon/>
//                             </span>
//                             <Input
//                                 type="text"
//                                 id="name"
//                                 value={name}
//                                 onChange={handleNameChange}
//                                 placeholder="Vermillion...."
//                                 // required
//                                 className={cn(
//                                     "w-full pl-10 pr-4 py-2 h-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
//                                     nameError && "border-red-500 focus:ring-red-500 focus:border-red-500"
//                                 )}
//                             />
//                             {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
//                         </div>
//                         <div className="input-group relative">
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">Email Address</label>
//                             <span className='absolute inset-y-0 left-0 pl-3 pt-3 flex items-center text-gray-500'>
//                             <InputUserIcon/>
//                             </span>
//                             <Input
//                                 type="email"
//                                 id="email"
//                                 value={email}
//                                 onChange={handleEmailChange}
//                                 placeholder="rambahadur12@..."
//                                 required
//                                 className={cn(
//                                     "w-full pl-10 pr-4 py-2 h-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
//                                     emailError && "border-red-500 focus:ring-red-500 focus:border-red-500"
//                                 )}
//                             />
//                             {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
//                         </div>
//                         <div className="input-group relative">
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
//                             <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
//                             <LockIcon/>
//                             </span>
//                             <Input
//                                 type="password"
//                                 id="password"
//                                 value={password}
//                                 onChange={handlePasswordChange}
//                                 placeholder="Password"
//                                 required
//                                 className={cn(
//                                     "w-full pl-10 pr-4 py-2 h-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
//                                     passwordError && "border-red-500 focus:ring-red-500 focus:border-red-500"
//                                 )}
//                             />
//                             {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
//                         </div>
//                         <div className="input-group relative">
//                             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirm Password</label>
//                             <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
//                             <LockIcon/>
//                             </span>
//                             <Input
//                                 type="password"
//                                 id="confirmPassword"
//                                 value={confirmPassword}
//                                 onChange={handleConfirmPasswordChange}
//                                 placeholder="Confirm Password"
//                                 required
//                                 className={cn(
//                                     "w-full pl-10 pr-4 py-2 h-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
//                                     confirmPasswordError && "border-red-500 focus:ring-red-500 focus:border-red-500"
//                                 )}
//                             />
//                             {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
//                         </div>

                        
//                             {/* <Button type="button" onClick={handleBack} variant="outline" className="bg-gray-200 hover:bg-gray-300 text-gray-800">
//                                 ← Back
//                             </Button> */}
//                             <Button type="submit"  className="w-full h-12 py-2.5 bg-[#1B5BFF] text-white rounded-md text-lg font-semibold transition-colors duration-200 hover:bg-blue-700 mt-4">
//                                 Next →
//                             </Button>
                            
                        
//                     </form>
//                     <footer className="flex justify-center mt-8 text-sm text-gray-600">
//                     <a href="/terms" className="text-blue-600 hover:underline ">Terms & Conditions/</a>
//                     <a href="/privacy" className=" text-blue-600 hover:underline">Privacy Policy</a>
//                    </footer>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RegisterPage2;




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import  {Button}  from '@/components/ui/button';
import { cn } from '@/lib/utils'; // For conditional class names
import { useNavigate } from 'react-router-dom';
import LeftSide from '@/components/ui/LeftSide';
import { signupUser } from '@/Services/auth';
import { InputUserIcon, LockIcon } from '@/assets/sidebar';

type Props = Record<string, never>;

const RegisterPage2: React.FC<Props> = () => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setNameError("");
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setEmailError(''); // Clear error on input change
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordError(''); // Clear error on input change
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
        setConfirmPasswordError(''); // Clear error on input change
    };

    const validateForm = () => {
        let isValid = true;
        let emailErrorMessage = '';
        let passwordErrorMessage = '';
        let confirmPasswordErrorMessage = '';
        let nameErrorMessage = "";

        // name validation
        if (!name.trim()) {
            nameErrorMessage = "Name is required";
            isValid = false;
        }
        setNameError(nameErrorMessage);

        // Email validation
        if (!email.trim()) {
            emailErrorMessage = 'Email is required';
            isValid = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            emailErrorMessage = 'Invalid email address';
            isValid = false;
        }
        setEmailError(emailErrorMessage);

        // Password validation
        if (!password.trim()) {
            passwordErrorMessage = 'Password is required';
            isValid = false;
        } else if (password.length < 8) {
            passwordErrorMessage = 'Password must be at least 8 characters';
            isValid = false;
        }
        setPasswordError(passwordErrorMessage);

        // Confirm Password validation
        if (!confirmPassword.trim()) {
            confirmPasswordErrorMessage = 'Confirm Password is required';
            isValid = false;
        } else if (confirmPassword !== password) {
            confirmPasswordErrorMessage = 'Passwords do not match';
            isValid = false;
        }
        setConfirmPasswordError(confirmPasswordErrorMessage);

        return isValid;
    };

    const handleNext = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            console.log('Registering user with data:', { email, name });
            
            const response = await signupUser({ email, password, confirmPassword, name });
            console.log("Signup successful response:", response.data);
            
            const { token, user, tenantId: responseTenantId } = response.data;
            
            if (token) {
                // Update the signup token
                sessionStorage.setItem('signupToken', token);
                
                // Store the actual user ID and tenant ID from the response
                if (user && user.userId) {
                    sessionStorage.setItem('userId', user.userId.toString());
                    localStorage.setItem('userId', user.userId.toString());
                }
                
                if (responseTenantId) {
                    sessionStorage.setItem('tenantId', responseTenantId.toString());
                    localStorage.setItem('tenantId', responseTenantId.toString());
                }
                
                console.log('User registered successfully, navigating to contact page');
                navigate("/contact");
            } else {
                throw new Error('No token received from server');
            }
        } catch (error: unknown) {
            console.error("Error signing up:", error);
            
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

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full overflow-auto  ">
            <div className="hidden lg:block flex-[1]"> <LeftSide/></div>

            <div className="flex flex-[1.95] justify-center items-center  bg-[#E6EBFA] py-10 px-4 sm:px-6 md:px-8">
                <div className="w-full max-w-md p-6 sm:p-8 md:p-10 rounded-md">
                    <h2 className="text-2xl font-bold text-blue-900 mb-8 text-left">Sign up</h2>
                    <form onSubmit={handleNext} className="space-y-4">
                        <div className="input-group relative">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">Name</label>
                            <span className='absolute inset-y-0 left-0 pl-3 pt-3 flex items-center text-gray-500'>
                                <InputUserIcon/>
                            </span>
                            <Input
                                type="text"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                                placeholder="Vermillion...."
                                required
                                className={cn(
                                    "w-full pl-10 pr-4 py-2 h-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                    nameError && "border-red-500 focus:ring-red-500 focus:border-red-500"
                                )}
                            />
                            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                        </div>
                        <div className="input-group relative">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">Email Address</label>
                            <span className='absolute inset-y-0 left-0 pl-3 pt-3 flex items-center text-gray-500'>
                                <InputUserIcon/>
                            </span>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="rambahadur12@..."
                                required
                                className={cn(
                                    "w-full pl-10 pr-4 py-2 h-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                    emailError && "border-red-500 focus:ring-red-500 focus:border-red-500"
                                )}
                            />
                            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                        </div>
                        <div className="input-group relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                            <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
                                <LockIcon/>
                            </span>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Password"
                                required
                                className={cn(
                                    "w-full pl-10 pr-4 py-2 h-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                    passwordError && "border-red-500 focus:ring-red-500 focus:border-red-500"
                                )}
                            />
                            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                        </div>
                        <div className="input-group relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirm Password</label>
                            <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
                                <LockIcon/>
                            </span>
                            <Input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                placeholder="Confirm Password"
                                required
                                className={cn(
                                    "w-full pl-10 pr-4 py-2 h-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                    confirmPasswordError && "border-red-500 focus:ring-red-500 focus:border-red-500"
                                )}
                            />
                            {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full h-12 py-2.5 bg-[#1B5BFF] text-white rounded-md text-lg font-semibold transition-colors duration-200 hover:bg-blue-700 mt-4 disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : 'Next →'}
                        </Button>
                    </form>
                    
                    <footer className="flex justify-center mt-8 text-sm text-gray-600">
                        <a href="/terms" className="text-blue-600 hover:underline ">Terms & Conditions/</a>
                        <a href="/privacy" className=" text-blue-600 hover:underline">Privacy Policy</a>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage2;