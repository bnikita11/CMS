// src/pages/UserManagementPage.tsx (Renamed to reflect client management if that's the intention, otherwise adjust)
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogPortal,
    DialogOverlay,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox"; // New import for checkboxes
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // New imports for dropdown menu

// Assuming you have an icon for vertical ellipsis, e.g., from 'lucide-react'
// If not, you might need to create a simple SVG component or adjust the import.
import { MagnifyingGlassIcon, MoreVertical } from '@/assets/sidebar'; // Assuming these paths are correct for your icons

// Import the AddNewClientCard component.
// !!! IMPORTANT: Ensure this path is correct based on your actual file structure.
// If your file is in 'src/components/AddNewClientCard.tsx', change it to:
// import AddNewClientCard from '@/components/AddNewClientCard';
import AddNewClientCard from '@/pages/clientmanagement/AddNewClient';
import { useNavigate } from 'react-router-dom';

// Interface for a client in the table
interface Client {
    id: string;
    name: string;
    accountType: string;
    status: string;
    recentCase: string; // Assuming 'recentCase' is still relevant for clients
}

const initialClients: Client[] = [
    { id: '23454G', name: 'Alice Johnson', accountType: "Corporate", status: 'Active', recentCase: "case1" },
    { id: '2', name: 'Bob Williams', accountType: "Individual", status: 'Active', recentCase: "case2" },
    { id: '3', name: 'Charlie Brown', accountType: 'Corporate', status: 'Inactive', recentCase: "Case3" },
    { id: '4', name: 'Diana Prince', accountType: 'Individual', status: 'Active', recentCase: "Case4" },
    { id: '5', name: 'Eve Adams', accountType: 'Individual', status: 'Active', recentCase: "Case5" },
    { id: '6', name: 'Frank White', accountType: 'Corporate', status: 'Inactive', recentCase: "Case6" },
    { id: '7', name: 'Grace Taylor', accountType: 'Individual', status: 'Active', recentCase: "Case7" },
    { id: '8', name: 'Harry Davis', accountType: 'Corporate', status: 'Active', recentCase: "Case8" },
    { id: '9', name: 'Ivy Miller', accountType: 'Individual', status: 'Inactive', recentCase: "Case9" },
    { id: '10', name: 'Jack Wilson', accountType: 'Corporate', status: 'Active', recentCase: "Case10" },
];

const ClientManagementPage: React.FC = () => {
    const [clientSearchQuery, setClientSearchQuery] = useState('');
    const [clients, setClients] = useState<Client[]>(initialClients);
    const [filteredClients, setFilteredClients] = useState<Client[]>(clients);
    const [showAddNewClientCard, setShowAddNewClientCard] = useState(false); // Controls visibility of the modal
    const navigate=useNavigate();

    // State for selection
    const [selectedClientIds, setSelectedClientIds] = useState<Set<string>>(new Set());

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(5); // You can adjust this number

    // Effect to filter clients based on search query
    useEffect(() => {
        const lowerCaseQuery = clientSearchQuery.toLowerCase();
        const filtered = clients.filter(client =>
            client.name.toLowerCase().includes(lowerCaseQuery) ||
            client.accountType.toLowerCase().includes(lowerCaseQuery) ||
            client.id.toLowerCase().includes(lowerCaseQuery) ||
            client.recentCase.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredClients(filtered);
        setCurrentPage(1); // Reset to first page on search
    }, [clientSearchQuery, clients]); // Re-filter when query or client list changes

    // Pagination Logic
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
    const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Selection Handlers
    const handleSelectAllClients = (checked: boolean) => {
        if (checked) {
            const allClientIdsOnPage = new Set(currentClients.map(client => client.id));
            setSelectedClientIds(allClientIdsOnPage);
        } else {
            setSelectedClientIds(new Set());
        }
    };

    const handleSelectClient = (clientId: string, checked: boolean) => {
        setSelectedClientIds(prev => {
            const newSelection = new Set(prev);
            if (checked) {
                newSelection.add(clientId);
            } else {
                newSelection.delete(clientId);
            }
            return newSelection;
        });
    };

    const handleExport = () => {
        alert(`Exporting ${selectedClientIds.size} selected clients (or all if none selected)!`);
        // In a real application, you'd trigger a data export (e.g., to CSV or Excel)
    };

    const handlePrint = () => {
        window.print();
        // This will open the browser's print dialog
    };

    // Callback function to add a new client from the AddNewClientCard form
    const handleClientAdded = (newClientData: { fullName: string; email: string; accountType: string; status: string; }) => {
        // Generate a new unique ID (simple increment, consider UUIDs for production)
        const newClientId = (clients.length > 0 ? Math.max(...clients.map(c => parseInt(c.id, 10))) + 1 : 1).toString();

        const newClient: Client = {
            id: newClientId,
            name: newClientData.fullName,
            accountType: newClientData.accountType,
            status: newClientData.status || 'Active',
            recentCase: 'N/A', // Default for new clients, adjust if needed
        };
        setClients(prevClients => [...prevClients, newClient]); // Add the new client to the list
        setShowAddNewClientCard(false); // Close the modal after successful submission
    };

    const handleViewDetails = (client: Client) => {
        // alert(`Viewing details for client: ${client.name} (ID: ${client.id})`);
        // Implement navigation or modal for client details
       navigate(`/client-management/client-detail/${client.id}`);
    };

    const handleEditClient = (client: Client) => {
        alert(`Editing client: ${client.name} (ID: ${client.id})`);
        // Implement logic to open an edit form for the client
    };

    const handleDeleteClient = (client: Client) => {
        if (confirm(`Are you sure you want to delete client: ${client.name}?`)) {
            setClients(prevClients => prevClients.filter(c => c.id !== client.id));
            setSelectedClientIds(prev => {
                const newSelection = new Set(prev);
                newSelection.delete(client.id);
                return newSelection;
            });
            alert(`${client.name} deleted.`);
        }
    };

    return (
        <div className='p-6'>
            {/* Search and Add New Client Button Row */}
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-64">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <MagnifyingGlassIcon />
                    </span>
                    <Input
                        type="text"
                        placeholder="Search clients..."
                        className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={clientSearchQuery}
                        onChange={(e) => setClientSearchQuery(e.target.value)}
                    />
                </div>
                <div>
                    <Button onClick={() => setShowAddNewClientCard(true)}>+ New Client</Button>
                </div>
            </div>

            {/* Export and Print Buttons Row */}
            <div className='flex justify-end gap-5 mb-6'>
                {selectedClientIds.size > 0 && (
                     <Button onClick={handleExport} variant="outline">
                        Export Selected ({selectedClientIds.size})
                    </Button>
                )}
                <Button onClick={handleExport} variant="outline">Export All</Button>
                <Button onClick={handlePrint} variant="outline">Print</Button>
            </div>

            {/* Clients Table Card */}
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px] text-center">
                                    <Checkbox
                                        checked={selectedClientIds.size === currentClients.length && currentClients.length > 0}
                                        onCheckedChange={(checked) => handleSelectAllClients(checked as boolean)}
                                        aria-label="Select all"
                                    />
                                </TableHead>
                                <TableHead>Client Name</TableHead>
                                <TableHead>Client ID</TableHead>
                                <TableHead>Client Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Recent Case</TableHead>
                                <TableHead className="text-right">Actions</TableHead> 
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentClients.length > 0 ? (
                                currentClients.map((client) => (
                                    <TableRow key={client.id}><TableCell className="text-center">
                                            <Checkbox
                                                checked={selectedClientIds.has(client.id)}
                                                onCheckedChange={(checked) => handleSelectClient(client.id, checked as boolean)}
                                                aria-label={`Select client ${client.name}`}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{client.name}</TableCell>
                                        <TableCell>{client.id}</TableCell>
                                        <TableCell>{client.accountType}</TableCell>
                                        <TableCell>{client.status}</TableCell>
                                        <TableCell className="text-right">{client.recentCase}</TableCell>
                                        <TableCell className="text-right"> 
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                     <Button>
                                                        <MoreVertical />
                                                    </Button> 
                                                   
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleViewDetails(client)}>
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleEditClient(client)}>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDeleteClient(client)}>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-gray-500"> {/* Updated colspan */}
                                        No clients found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Pagination Controls */}
            {filteredClients.length > clientsPerPage && (
                <div className="flex justify-between items-center space-x-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <Button
                                key={pageNumber}
        variant="outline" // Keep the outline variant for all, then add specific classes
        className={currentPage === pageNumber ? "font-bold text-primary" : ""} // Apply active styles directly
        onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </Button>
                        ))}
                    </div>
                    <Button className='border-none'
                        // variant="outline"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                    {/* <span className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span> */}
                </div>
            )}

            {showAddNewClientCard && (
                <Dialog open={showAddNewClientCard} onOpenChange={setShowAddNewClientCard}>
                    <DialogPortal>
                        <DialogOverlay className="bg-transparent" />
                        <DialogContent className="bg-white shadow-lg">
                            <AddNewClientCard
                                onClose={() => setShowAddNewClientCard(false)}
                                onClientAdded={handleClientAdded}
                            />
                        </DialogContent>
                    </DialogPortal>
                </Dialog>
            )}
        </div>
    );
};

export default ClientManagementPage;