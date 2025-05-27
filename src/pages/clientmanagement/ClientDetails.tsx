// src/components/ClientDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import ClientSidebar from './ClientProfile/ClientSidebar';
import {ClientProfileTab} from './ClientProfile/Profile';
import CasesTab from './ClientProfile/cases/Case';
import DocumentsTab from './ClientProfile/Documents/Document';

// Define the type for URL parameters
interface ClientRouteParams {
  clientId?:string;
    [key: string]: string | undefined; // ✅ Index signature
}

// Define a simple type for client data (you'd expand this)
interface Client {
  id: string;
  name: string;
  username: string;
  email: string;
  activeCases: number;
  documents: number;
  invoices: number;
  clientType: string;
  organizationName: string;
  country: string;
  mobileNumber: string;
  gender: string;
  city: string;
  description: string;
  profilePictureUrl: string;
}

// Mock data based on the original image, now using a map for client IDs
const mockClientData: { [key: string]: Client } = {
  '23454G': { // This is the ID used in the example
    id: '23454G',
    name: 'Tanner Finsha',
    username: 'Tannerfisher',
    email: 'Tannerfisher@gmail.com',
    activeCases: 12,
    documents: 200,
    invoices: 15,
    clientType: 'Individual',
    organizationName: 'N/A',
    // barLicenseNumber: 'BLN12345',
    // panVatNumber: 'PAN98765',
    // issuingAuthority: 'Tax Dept.',
    country: 'USA',
    mobileNumber: '+1 (555) 123-4567',
    gender: 'Female',
    city: 'New York',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    profilePictureUrl: 'https://via.placeholder.com/80/6c63ff/ffffff?text=TF',
  },
  'CLIENT001': { // Another example client
    id: 'CLIENT001',
    name: 'Alice Wonderland',
    username: 'aliceW',
    email: 'alice@example.com',
    activeCases: 5,
    documents: 50,
    invoices: 3,
    clientType: 'Organization',
    organizationName: 'Wonder Corp.',
    // barLicenseNumber: 'BLN54321',
    // panVatNumber: 'VAT12345',
    // issuingAuthority: 'State Board',
    country: 'Canada',
    mobileNumber: '+1 (444) 987-6543',
    gender: 'Female',
    city: 'Toronto',
    description: 'A loyal client with multiple ongoing projects.',
    profilePictureUrl: 'https://via.placeholder.com/80/4CAF50/ffffff?text=AW',
  },
};

const ClientDetailPage: React.FC = () => {
  const { clientId } = useParams<ClientRouteParams>(); // Get clientId from URL
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [clientData, setClientData] = useState<Client | null>(null); // Initialize as null

  // Simulate fetching client data based on clientId from URL
  useEffect(() => {
    if (clientId) {
      // In a real app, you'd make an API call here:
      // fetch(`/api/clients/${clientId}`)
      //   .then(response => response.json())
      //   .then(data => setClientData(data))
      //   .catch(error => console.error("Error fetching client:", error));

      // For now, use mock data
      const foundClient = mockClientData[clientId];
      if (foundClient) {
        setClientData(foundClient);
      } else {
        setClientData(null); // Client not found
        console.warn(`Client with ID ${clientId} not found.`);
      }
    }
  }, [clientId]); // Re-fetch if clientId changes in the URL

  const handleUpdateClient = (updatedData: Partial<Client>) => {
    if (clientData) {
      console.log('Updating client with:', updatedData);
      setClientData((prev) => (prev ? { ...prev, ...updatedData } : null));
      // In a real app, send updatedData to backend API
    }
  };

  if (!clientData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Loading client data or client not found...</p>
      </div>
    );
  }

  const renderTabContent = () => {
     const currentClientId = 'someClientId123'; 
    switch (activeTab) {
      case 'profile':
        return <ClientProfileTab client={clientData} onUpdate={handleUpdateClient} />;
      case 'cases':
        return <CasesTab clientId={clientData.id} />;
      case 'documents':
        return     <DocumentsTab clientId={currentClientId} /> ;
      case 'communication':
        return <div className="p-6 text-gray-700">Communication content for {clientData.name} goes here...</div>;
      case 'invoices':
        return <div className="p-6 text-gray-700">Invoices content for {clientData.name} goes here...</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Dashboard Header / Breadcrumbs */}
      <header className="bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
        <div className="text-sm text-gray-500">
          Dashboard &gt; Client Detail &gt; #{clientData.id}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col md:flex-row p-5 md:p-8 max-w-7xl mx-auto w-full gap-5">
        {/* Left Sidebar */}
        <ClientSidebar client={clientData} />

        {/* Main Content Area */}
        <main className="flex-grow bg-white rounded-lg shadow-md p-6">
          {/* Tabs Navigation */}
          <nav className="flex border-b border-gray-200 mb-6">
            {['profile', 'cases', 'documents', 'communication', 'invoices'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-3 px-5 -mb-px text-sm font-medium
                  ${activeTab === tab
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                  focus:outline-none transition-colors duration-200
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} {/* Capitalize first letter */}
              </button>
            ))}
          </nav>

          {/* Tab Content */}
          <div className="tab-content">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDetailPage;