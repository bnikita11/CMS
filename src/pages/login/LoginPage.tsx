import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@/components/ui/input'; // Adjust the path if necessary
import  {Button}  from '@/components/ui/button'; // Import Button as well
import { useNavigate } from "react-router-dom";
import { login } from '@/redux/slices/authSlice';
import { InputUserIcon,LockIcon } from '@/assets/sidebar';
import LeftSide from '@/components/ui/LeftSide';
import { loginUser } from '@/Services/auth';
import { AxiosError } from 'axios'; // ✅ Import this
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


type Props = Record<string, never>;

const LoginPage: React.FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType,setAccountType]=useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleAccountTypeChange=(value:string)=>{
    setAccountType(value);
  };

  
//   const isLoggedIn = (event: React.FormEvent) => {
//     event.preventDefault();

//   if (email === "abc@example.com" && password === "nikita@14581") {
//     const userData = {
//       name: "abc",
//       email: "abc@example.com"
//     };
//     dispatch(login(userData));
//     localStorage.setItem("token", "14581");
//     navigate("/dashboard");
//   } else {
//     alert("Invalid email or password");
//   }
// };

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password, accountType });
      const { token, user } = response.data;

      localStorage.setItem('token', token); // store token
      dispatch(login({ name: user.name, email: user.email, accountType:user.accountType })); // update Redux state
      navigate("/dashboard"); // redirect
    }  catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    console.error(error.response?.data?.message || "Login failed");
  }
};


  const handleForgotPassword = () => {
    // Add navigation to your forgot password page
    console.log('Navigating to forgot password');
  };

  return (
 <div className="flex flex-col lg:flex-row h-screen w-full overflow-auto ">
   <div className="hidden lg:block flex-[1]">
    <LeftSide/>
   </div>
     
       
      
      <div className="flex flex-[1.95] justify-center items-center  bg-[#E6EBFA] py-10 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-md ">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2B5BD4] mb-6 text-left">Sign in</h2>
          <form onSubmit={handleLogin} className="space-y-6">
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
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><InputUserIcon/></span>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="rambahadur12@..."
                  required
                  className="pl-10 h-12 w-full  " // Make space for the icon
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><LockIcon/></span>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  required
                  className="pl-10 h-12 w-full "
                />
              </div>
            </div>
            <div className="text-right">
              <button type="button" onClick={handleForgotPassword} className="text-blue-600 hover:underline text-sm">
                Forgot Password?
              </button>
            </div>
            <Button  type="submit" className="w-full h-12 py-2.5 bg-[#1B5BFF] text-white rounded-md text-lg font-semibold cursor-pointer transition-colors duration-200 hover:bg-blue-700 mt-6">
              Sign in
            </Button>
            <Button type="button" onClick={() => navigate("/get-started")} className="w-full h-12 py-2.5 bg-white hover:bg-[#1B5BFF] text-blue-600 border border-blue-600 rounded-md text-lg font-semibold cursor-pointer transition-colors duration-200  mt-4">
              Sign up
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

export default LoginPage;
