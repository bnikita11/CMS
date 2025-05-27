// src/components/AddNewUserCard.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // For conditional classNames
import {validateNepalesePassport} from "@/lib/utils/Validation";


interface ClientForm {
    fullName: string;
    email: string;
    phone: string;
    accountType: string;
    description: string;
    organizationName:string;
    passportNumber:string;
    country:string;
    gender:string;
    city:string;

}

interface FormErrors {
    [key: string]: string | undefined;
}

interface AddNewClientCardProps {
    onClose: () => void; // Function to call when the modal should close
    onClientAdded: (newClient: { fullName: string; email: string; accountType: string; status: string; }) => void;
}





const AddNewClientCard: React.FC<AddNewClientCardProps> = ({ onClose, onClientAdded }) => {
    const [formData, setFormData] = useState<ClientForm>({
    fullName: "",
    email: "",
    phone: "",
    accountType: "",
    description: "",
    organizationName:"",
    passportNumber:"",
    country:"",
    gender:"",
    city:"",

    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: undefined });
    };

    const handleSelectChange = (value: string, name: keyof ClientForm) => {
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: undefined });
    };

    const validateForm = (): boolean => {
        const errors: FormErrors = {};
        let isValid = true;

        if (!formData.fullName.trim()) {
            errors.fullName = 'Full Name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Invalid email format';
            isValid = false;
        }

        if (!formData.phone.trim()) {
            errors.phone = 'Phone Number is required';
            isValid = false;
        } else if (!/^\+977-9\d{9}$/.test(formData.phone)) {
            errors.phone = 'Invalid Phone Number (e.g., +977-9812345678)';
            isValid = false;
        }

        if (!formData.accountType) {
            errors.accountType = 'Account Type is required';
            isValid = false;
        }
        if (!formData.organizationName.trim()){
            errors.organizationName="Organization is required";
            isValid=false;
        }
        if (!formData.gender){
            errors.gender="Gender is require";
            isValid=false;
        }
        if (!formData.country.trim()){
            errors.country="Country is required";
            isValid=false;
        }
        if (!formData.city.trim()){
            errors.city="City is required";
            isValid=false;
        }
       if (!formData.passportNumber.trim()) { // Check if the field is empty
            errors.passportNumber = "Passport Number is required";
            isValid = false;
        } else if (!validateNepalesePassport(formData.passportNumber)) { // Pass the actual value to the function
            errors.passportNumber = "Invalid Nepalese passport number format. Expected: 8 or 9 digits, or 2 letters followed by 7 digits.";
            isValid = false;
        }
        if (!formData.description.trim()){
            errors.description="Description is required";
            isValid=false;
        }


        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            console.log('Form Data:', formData);
            // Simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const newClientResponseData = {
                fullName: formData.fullName,
                email: formData.email,
                accountType: formData.accountType,
                status: 'Active',
            };

            onClientAdded(newClientResponseData); // Inform parent about new client
            // onClose(); // <--- Modal is closed by parent after onClientAdded
            alert('Client added successfully!');

            // Reset form data after successful submission
            setFormData({
              fullName: "",
    email: "",
    phone: "",
    accountType: "",
    description: "",
    organizationName:"",
    passportNumber:"",
    country:"",
    gender:"",
    city:"",

    });


        setFormErrors({});
        } catch (error) {
            console.error('Failed to add user:', error);
            alert('Failed to add user. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-[500px] overflow-y-auto p-4 border">
        <Card className="w-full max-w-2xl mx-auto z-50">
            <CardHeader>
                <CardTitle>Add New Client</CardTitle>
                <CardDescription>
                    Create a new client by providing the required information.
                </CardDescription>
            </CardHeader>
            <CardContent>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className='leftSide '>

                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Client Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            className={cn(formErrors.fullName && 'border-red-500')}
                        />
                        {formErrors.fullName && <p className="text-red-500 text-sm">{formErrors.fullName}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="organizationName">Organization Name</Label>
                        <Input
                            id="organizationName"
                            name="organizationName"
                            value={formData.organizationName}
                            onChange={handleChange}
                            placeholder="Enter your organization"
                            className={cn(formErrors.organizationName && 'border-red-500')}
                        />
                        {formErrors.organizationName && <p className="text-red-500 text-sm">{formErrors.organizationName}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Id</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            className={cn(formErrors.email && 'border-red-500')}
                        />
                        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Mobile Number</Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                            className={cn(formErrors.phone && 'border-red-500')}
                        />
                        {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="passportNumber">Passport Number</Label>
                        <Input
                            id="passport"
                            name="passportNumber"
                            value={formData.passportNumber}
                            onChange={handleChange}
                            placeholder="Enter passport number"
                            className={cn(formErrors.passportNumber && 'border-red-500')}
                        />
                        {formErrors.passportNumber && <p className="text-red-500 text-sm">{formErrors.passportNumber}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="accountType">Account Type</Label>
                        <Select onValueChange={(value) => handleSelectChange(value, 'accountType')} value={formData.accountType}>
                            <SelectTrigger className={cn(formErrors.role && 'border-red-500')}>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Individual</SelectItem>
                                <SelectItem value="editor">Corporate</SelectItem>
                            </SelectContent>
                        </Select>
                        {formErrors.accountType && <p className="text-red-500 text-sm">{formErrors.accountType}</p>}
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                        <Select onValueChange={(value) => handleSelectChange(value, 'gender')} value={formData.gender}>
                            <SelectTrigger className={cn(formErrors.gender && 'border-red-500')}>
                                <SelectValue placeholder="Select a gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="LGBTQPlus">LGBTQ Plus</SelectItem>
                            </SelectContent>
                        </Select>
                        {formErrors.accountType && <p className="text-red-500 text-sm">{formErrors.accountType}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="min-h-[100px]"
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        {/* The "Cancel" button uses the onClose prop to close the modal */}
                        <Button variant="outline" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </Button>
                        {/* The "Submit" button remains within this component */}
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
        </div>
    );
};

export default AddNewClientCard;