import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import  {Button}  from '@/components/ui/button';
import { cn } from '@/lib/utils'; // For conditional class names
import { useNavigate } from 'react-router-dom';

import LeftSide from '@/components/ui/LeftSide';
import { InputUserIcon, LocationIcon, MobileIcon } from '@/assets/sidebar';
// import { contactInfo } from '@/Services/auth';

type Props=Record<string, never>

const RegisterPage3: React.FC<Props> = () => {
    const [primaryContactNumber, setPrimaryContactNumber] = useState('');
    const [secondaryContactNumber, setSecondaryContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [primaryUserName, setPrimaryUserName] = useState('');
    const [primaryContactNumberError, setPrimaryContactNumberError] = useState('');
    const [secondaryContactNumberError, setSecondaryContactNumberError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [primaryUserNameError, setPrimaryUserNameError] = useState('');
    const navigate=useNavigate();

    const handlePrimaryContactNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrimaryContactNumber(event.target.value);
        setPrimaryContactNumberError('');
    };

    const handleSecondaryContactNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSecondaryContactNumber(event.target.value);
        setSecondaryContactNumberError('');
    };

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
        setAddressError('');
    };

    const handlePrimaryUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrimaryUserName(event.target.value);
        setPrimaryUserNameError('');
    };

    const validateForm = () => {
        let isValid = true;
        let primaryContactNumberErrorMessage = '';
        let secondaryContactNumberErrorMessage = '';
        let addressErrorMessage = '';
        let primaryUserNameErrorMessage = '';

        // Primary Contact Number Validation
        if (!primaryContactNumber.trim()) {
            primaryContactNumberErrorMessage = 'Primary Contact Number is required';
            isValid = false;
        } else if (!/^\+977-9\d{9}$/.test(primaryContactNumber)) {
            primaryContactNumberErrorMessage = 'Invalid Primary Contact Number (e.g., +977-9812345678)';
            isValid = false;
        }
        setPrimaryContactNumberError(primaryContactNumberErrorMessage);

        // Secondary Contact Number Validation (Optional, but validate if provided)
        if (secondaryContactNumber.trim() && !/^\d{10}$/.test(secondaryContactNumber)) {
            secondaryContactNumberErrorMessage = 'Invalid Secondary Contact Number (e.g., 0000000111)';
            isValid = false;
        }
        setSecondaryContactNumberError(secondaryContactNumberErrorMessage);

        // Address Validation
        if (!address.trim()) {
            addressErrorMessage = 'Address is required';
            isValid = false;
        }
        setAddressError(addressErrorMessage);

        // Primary User's Name Validation
        if (!primaryUserName.trim()) {
            primaryUserNameErrorMessage = "Primary User's Name is required";
            isValid = false;
        }
        setPrimaryUserNameError(primaryUserNameErrorMessage);

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (validateForm()) {


            
    //     try {
    //         const response=await contactInfo({primaryContactNumber,secondaryContactNumber,address,primaryUserName});
    //         console.log(response);
    //         navigate("./account-activated")
            
    //     } catch (error) {
    //         console.log("error updating contactInfo",error)
            
    //     }
    // }
    // };






            // Handle the form submission logic here
            const registrationDataContact={
                primaryContactNumber,
                secondaryContactNumber,
                address,
                primaryUserName,
            };
            // In a real application, you would proceed to the next step or submit the data.
            localStorage.setItem("smartlaw_registration", JSON.stringify(registrationDataContact));
            console.log("saved to local storage ",registrationDataContact)
            navigate("/account-activated");

        }}

  

    return (
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-auto  ">
        <div className="hidden lg:block flex-[1]"> <LeftSide/></div>

           <div className="flex flex-[1.95] justify-center items-center  bg-[#E6EBFA] py-10 px-4 sm:px-6 md:px-8">
                <div className="w-full max-w-md p-4 sm:p-6 md:p-8 rounded-md">
                    <h2 className="text-2xl font-bold text-blue-900 mb-6 text-left">Contact Information</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="input-group relative">
                            <label htmlFor="primaryContactNumber" className="block text-sm font-medium text-gray-900">Primary Contact Number</label>
                            <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
                            <MobileIcon/>
                            </span>
                            <Input
                                type="text"
                                id="primaryContactNumber"
                                value={primaryContactNumber}
                                onChange={handlePrimaryContactNumberChange}
                                placeholder="+977-9812345678"
                                required
                                className={cn(
                                    "w-full h-[58px] pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                    primaryContactNumberError && "border-red-500 focus:ring-red-500 focus:border-red-500"
                                )}
                            />
                            {primaryContactNumberError && <p className="text-red-500 text-sm mt-1">{primaryContactNumberError}</p>}
                        </div>
                        <div className="input-group relative">
                            <label htmlFor="secondaryContactNumber" className="block text-sm font-medium text-gray-900">Secondary Contact Number</label>
                            <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
                            <MobileIcon/>
                            </span>
                            <Input
                                type="text"
                                id="secondaryContactNumber"
                                value={secondaryContactNumber}
                                onChange={handleSecondaryContactNumberChange}
                                placeholder="0000000111"
                                className={cn(
                                    "w-full h-[58px] pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                    secondaryContactNumberError && "border-red-500 focus:ring-red-500 focus:border-red-500"
                                )}
                            />
                            {secondaryContactNumberError && <p className="text-red-500 text-sm mt-1">{secondaryContactNumberError}</p>}
                        </div>
                        <div className="input-group relative">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-900">Address (City, Province, Country)</label>
                            <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
                            <LocationIcon/>
                            </span>
                            <Input
                                type="text"
                                id="address"
                                value={address}
                                onChange={handleAddressChange}
                                placeholder="Address (City, Province, Country)"
                                required
                                className={cn(
                                    "w-full h-[48px] pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                    addressError && "border-red-500 focus:ring-red-500 focus:border-red-500"
                                )}
                            />
                            {addressError && <p className="text-red-500 text-sm mt-1">{addressError}</p>}
                        </div>
                        <div className="input-group relative">
                            <label htmlFor="primaryUserName" className="block text-sm font-medium text-gray-900">Primary User's Name</label>
                            <span className='absolute inset-y-0 left-0 pl-3 pt-4 flex items-center text-gray-500'>
                            <InputUserIcon/>
                            </span>
                            <Input
                                type="text"
                                id="primaryUserName"
                                value={primaryUserName}
                                onChange={handlePrimaryUserNameChange}
                                placeholder="Ram Bahadur"
                                required
                                className={cn(
                                    "w-full h-[48px] pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                    primaryUserNameError && "border-red-500 focus:ring-red-500 focus:border-red-500"
                                )}
                            />
                            {primaryUserNameError && <p className="text-red-500 text-sm mt-1">{primaryUserNameError}</p>}
                        </div>
                            <Button type="submit" className="w-full h-[48px] py-2.5 bg-[#1B5BFF] text-white rounded-md text-lg font-semibold cursor-pointer transition-colors duration-200 hover:bg-blue-700 mt-6">
                                Submit →
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

export default RegisterPage3;
