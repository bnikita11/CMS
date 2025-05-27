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
import { registerTenant } from '@/Services/auth';


type Props = Record<string, never>;

const RegisterPage: React.FC<Props> = () => {
    const [organizationName, setOrganizationName] = useState('');
    const [passportNumber, setPassportNumber]=useState("");
    const [barLicenseNumber, setBarLicenseNumber] = useState('');
    const [licenseIssuingAuthority, setLicenseIssuingAuthority] = useState('');
    const [accountType, setAccountType] = useState('');
      const navigate = useNavigate();
    

    const handleOrganizationNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrganizationName(event.target.value);
    };

    const handlePassportNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassportNumber(event.target.value);
    };

    const handleBarLicenseNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBarLicenseNumber(event.target.value);
    };

    const handleLicenseIssuingAuthorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLicenseIssuingAuthority(event.target.value);
    };

    const handleAccountTypeChange = (value: string) => {
        setAccountType(value);
    };

    const handleGetStarted = async (event: React.FormEvent) => {
        event.preventDefault();
      
        
    // Simple form validation
    if (!organizationName.trim()) {
        alert("Organization Name is required.");
        return;
    }

    if (!passportNumber.trim()) {
        alert("Passport Number is required.");
        return;
    }

    if (!barLicenseNumber.trim()) {
        alert("Bar License Number is required.");
        return;
    }

    if (!licenseIssuingAuthority.trim()) {
        alert("License Issuing Authority is required.");
        return;
    }

    if (!accountType.trim()) {
        alert("Please select an Account Type.");
        return;
    }


      // Handle the registration logic here
        try{
            const response= await registerTenant({organizationName,accountType,passportNumber,licenseIssuingAuthority,barLicenseNumber});
            console.log(response);
             navigate("/sign-up");
        }catch (error)
        {
            console.error("error registering",error);
        }

};

    //     const registrationData={
    //         organizationName,
    //         passportNumber,
    //         barLicenseNumber,
    //         licenseIssuingAuthority,
    //         accountType
    //     };
    //      localStorage.setItem('smartlaw_registration', JSON.stringify(registrationData));

    // console.log('Saved to localStorage:', registrationData);

    //     navigate("/sign-up");
    // };

    const handleSignIn = () => {
        // Handle sign in navigation

         navigate("/");
        // console.log('Navigating to sign in');
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
                            <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-900">Passport Number</label>
                            <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
                                <PenIcon/>
                            </span>
                            <Input
                                type="text"
                                id="panVatNumber"
                                value={passportNumber}
                                onChange={handlePassportNumberChange}
                                placeholder="Pan/Vat Number"
                                required
                                className="w-full h-12 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="barLicenseNumber" className="block text-sm font-medium text-gray-900">Bar License Number</label>
                            <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
                                <PenIcon/>
                            </span>
                            <Input
                                type="text"
                                id="barLicenseNumber"
                                value={barLicenseNumber}
                                onChange={handleBarLicenseNumberChange}
                                placeholder="Bar License Number"
                                className="w-full h-12 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="licenseIssuingAuthority" className="block text-sm font-medium text-gray-900">License Issuing Authority</label>
                            <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
                                <PenIcon/>
                            </span>
                            <Input
                                type="text"
                                id="licenseIssuingAuthority"
                                value={licenseIssuingAuthority}
                                onChange={handleLicenseIssuingAuthorityChange}
                                placeholder="License Issuing Authority"
                                className="w-full h-12 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <Button type="submit" className="w-full h-12 py-2.5 bg-[#1B5BFF] text-white rounded-md text-lg font-semibold transition-colors duration-200 hover:bg-blue-700 mt-6 ">
                            Get Started →
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
