// src/components/ClientSidebar.tsx
import React from 'react'
import { PhoneIcon,MessageIcon } from '@/assets/sidebar';
interface ClientSidebarProps {
  client: {
    name: string;
    username: string;
    email: string;
    activeCases: number;
    documents: number;
    invoices: number;
    profilePictureUrl: string;
  };
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ client }) => {
  return (
    <aside className="w-full md:w-72 bg-white rounded-lg shadow-md p-6 flex flex-col items-center flex-shrink-0">
      {/* Profile Card */}
      <div className="text-center w-full pb-6 border-b border-gray-200">
        <img
          src={client.profilePictureUrl}
          alt={`${client.name} Profile`}
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-800">{client.name}</h3>
        <p className="text-sm text-gray-600 mb-1">@{client.username}</p>
        <p className="text-sm text-gray-700 mb-4">{client.email}</p>
        <div className="flex justify-center gap-4">
          <PhoneIcon className="h-6 w-6 text-indigo-500 cursor-pointer hover:text-indigo-600" />
          <MessageIcon className="h-6 w-6 text-indigo-500 cursor-pointer hover:text-indigo-600" />
        </div>
      </div>

      {/* Client Overview Metrics */}
      <div className="w-full pt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Client Overview</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-blue-50 border border-blue-200 rounded-md p-3 text-blue-800">
            <span className="font-medium text-lg">{client.activeCases}+</span> Active Cases
          </div>
          <div className="flex justify-between items-center bg-yellow-50 border border-yellow-200 rounded-md p-3 text-yellow-800">
            <span className="font-medium text-lg">{client.documents}</span> Documents
          </div>
          <div className="flex justify-between items-center bg-green-50 border border-green-200 rounded-md p-3 text-green-800">
            <span className="font-medium text-lg">{client.invoices}+</span> Invoices
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ClientSidebar;