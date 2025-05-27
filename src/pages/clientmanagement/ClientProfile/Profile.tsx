// src/components/ClientProfileTab.tsx
import React, { useState, useEffect } from 'react';

interface ClientProfileTabProps {
  client: {
    id: string; // Include ID as it's part of the displayed info
    name: string;
    clientType: string;
    organizationName: string;
    email: string;
    country: string;
    mobileNumber: string;
    gender: string;
    city: string;
    description: string;
  };
  onUpdate: (updatedData: Partial<ClientProfileTabProps['client']>) => void;
}

export const ClientProfileTab: React.FC<ClientProfileTabProps> = ({ client, onUpdate }) => {
  const [formData, setFormData] = useState(client);

  // Update form data if client prop changes (e.g., after an external update or new client ID loads)
  useEffect(() => {
    setFormData(client);
  }, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData); // Pass the updated form data to the parent component
  };

  return (
    <div className="client-info-section">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        Client Info
        <span className="ml-3 text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-md font-normal">
          #{client.id}
        </span>
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-600 mb-1">Client Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="clientType" className="text-sm font-medium text-gray-600 mb-1">Client Type</label>
          <select
            id="clientType"
            value={formData.clientType}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          >
            <option value="Individual">Individual</option>
            <option value="Organization">Organization</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="organizationName" className="text-sm font-medium text-gray-600 mb-1">Organization Name</label>
          <input
            type="text"
            id="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">Email Id</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="country" className="text-sm font-medium text-gray-600 mb-1">Country</label>
          <input
            type="text"
            id="country"
            value={formData.country}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="mobileNumber" className="text-sm font-medium text-gray-600 mb-1">Mobile Number</label>
          <input
            type="tel"
            id="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender" className="text-sm font-medium text-gray-600 mb-1">Gender</label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="city" className="text-sm font-medium text-gray-600 mb-1">City</label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        <div className="flex flex-col md:col-span-2"> {/* Span two columns */}
          <label htmlFor="description" className="text-sm font-medium text-gray-600 mb-1">Description</label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y"
          ></textarea>
        </div>

        <div className="md:col-span-2 flex justify-end pt-6 border-t border-gray-200 mt-6">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-md shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

// export default ClientProfileTab;