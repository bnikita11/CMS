// src/components/ClientProfile/CasesTab.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MagnifyingGlassIcon, MoreVertical } from '@/assets/sidebar'; // Assuming these paths are correct for your icons

// Interface for a case in the table
interface Case {
    id: string;
    caseTitle: string;
    clientName: string;
    clientEmail: string;
    status: 'Active' | 'Inactive' | 'High Court'; // Example statuses
    court: string;
    clientAvatar: string; // URL for client avatar
}

// Mock data for cases
const mockCases: Case[] = [
    {
        id: '#J7YT2',
        caseTitle: 'Drug Trafficking Charges...',
        clientName: 'Tanner Finsha',
        clientEmail: 'Tannerfisher@gmail.com',
        status: 'Active',
        court: 'Supreme Court',
        clientAvatar: 'https://via.placeholder.com/24/6c63ff/ffffff?text=TF', // Placeholder for Tanner
    },
    {
        id: '#J7YT7',
        caseTitle: 'Drug Trafficking Charges...',
        clientName: 'Tanner Finsha',
        clientEmail: 'Tannerfisher@gmail.com',
        status: 'High Court',
        court: 'High Court',
        clientAvatar: 'https://via.placeholder.com/24/6c63ff/ffffff?text=TF',
    },
    {
        id: '#J7YT8',
        caseTitle: 'Drug Trafficking Charges...',
        clientName: 'Emeto Winner',
        clientEmail: 'Emetowinner@gmail.com',
        status: 'Inactive',
        court: 'Supreme Court',
        clientAvatar: 'https://via.placeholder.com/24/FF5733/ffffff?text=EW', // Placeholder for Emeto
    },
    {
        id: '#J7YT9',
        caseTitle: 'Drug Trafficking Charges...',
        clientName: 'Tanner Finsha',
        clientEmail: 'Tannerfisher@gmail.com',
        status: 'Inactive',
        court: 'Supreme Court',
        clientAvatar: 'https://via.placeholder.com/24/6c63ff/ffffff?text=TF',
    },
    {
        id: '#J7YT4',
        caseTitle: 'Drug Trafficking Charges...',
        clientName: 'Tassy Omah',
        clientEmail: 'Tassyomah@gmail.com',
        status: 'Inactive',
        court: 'Supreme Court',
        clientAvatar: 'https://via.placeholder.com/24/33FF57/ffffff?text=TO', // Placeholder for Tassy
    },
    {
        id: '#J7YT3',
        caseTitle: 'Drug Trafficking Charges...',
        clientName: 'Tanner Finsha',
        clientEmail: 'Tannerfisher@gmail.com',
        status: 'Active',
        court: 'Supreme Court',
        clientAvatar: 'https://via.placeholder.com/24/6c63ff/ffffff?text=TF',
    },
    {
        id: '#J7YT5',
        caseTitle: 'Drug Trafficking Charges...',
        clientName: 'James Muriel',
        clientEmail: 'JamesMuriel@Aerten.finance',
        status: 'Active',
        court: 'Supreme Court',
        clientAvatar: 'https://via.placeholder.com/24/3357FF/ffffff?text=JM', // Placeholder for James
    },
    {
        id: '#J7YT6',
        caseTitle: 'Drug Trafficking Charges...',
        clientName: 'Tanner Finsha',
        clientEmail: 'Tannerfisher@gmail.com',
        status: 'Inactive',
        court: 'Supreme Court',
        clientAvatar: 'https://via.placeholder.com/24/6c63ff/ffffff?text=TF',
    },
];

interface CasesTabProps {
    clientId: string; // Assuming we pass the client ID to filter cases
}

const CasesTab: React.FC<CasesTabProps> = ({ clientId }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cases, setCases] = useState<Case[]>([]);
    const [filteredCases, setFilteredCases] = useState<Case[]>([]);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [casesPerPage] = useState(5); // Adjust as needed

    useEffect(() => {
        // In a real application, you'd fetch cases for the given clientId
        // For now, filter mock data to simulate cases belonging to the current client
        const clientSpecificCases = mockCases.filter(
            (c) => c.clientName.toLowerCase().includes('tanner finsha') || c.clientEmail.toLowerCase().includes('tannerfisher@gmail.com')
        ); // This is a rough filter, you'd match by actual client ID in a real app

        setCases(clientSpecificCases);
    }, [clientId]);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = cases.filter(
            (caseItem) =>
                caseItem.caseTitle.toLowerCase().includes(lowerCaseQuery) ||
                caseItem.id.toLowerCase().includes(lowerCaseQuery) ||
                caseItem.clientName.toLowerCase().includes(lowerCaseQuery) ||
                caseItem.status.toLowerCase().includes(lowerCaseQuery) ||
                caseItem.court.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredCases(filtered);
        setCurrentPage(1); // Reset to first page on search
    }, [searchQuery, cases]);

    // Pagination Logic
    const indexOfLastCase = currentPage * casesPerPage;
    const indexOfFirstCase = indexOfLastCase - casesPerPage;
    const currentCases = filteredCases.slice(indexOfFirstCase, indexOfLastCase);
    const totalPages = Math.ceil(filteredCases.length / casesPerPage);

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleCreateCase = () => {
        alert('Navigating to Create New Case page/modal!');
        // Implement navigation to a new case creation form
    };

    const handleExport = () => {
        alert('Exporting cases!');
        // Logic to export cases
    };

    const handlePrint = () => {
        window.print();
    };

    const handleViewCaseDetails = (caseItem: Case) => {
        alert(`Viewing details for Case ID: ${caseItem.id}`);
        // Implement navigation to a specific case detail page
    };

    const handleEditCase = (caseItem: Case) => {
        alert(`Editing Case ID: ${caseItem.id}`);
        // Implement logic to open an edit form for the case
    };

    const handleDeleteCase = (caseItem: Case) => {
        if (confirm(`Are you sure you want to delete Case ID: ${caseItem.id}?`)) {
            setCases(prevCases => prevCases.filter(c => c.id !== caseItem.id));
            alert(`Case ${caseItem.id} deleted.`);
        }
    };

    return (
        <div className="p-4">
            {/* Header with Search and Buttons */}
            <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <MagnifyingGlassIcon />
                    </span>
                    <Input
                        type="text"
                        placeholder="Search cases..."
                        className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex space-x-3">
                    <Button onClick={handleExport} variant="outline">Export</Button>
                    <Button onClick={handlePrint} variant="outline">Print</Button>
                    <Button onClick={handleCreateCase}>Create</Button>
                </div>
            </div>

            {/* Cases Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Case ID</TableHead>
                        <TableHead>Case Title</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Court</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentCases.length > 0 ? (
                        currentCases.map((caseItem) => (
                            <TableRow key={caseItem.id}> {/* Using index as key, ideally use unique case.id if available */}
                                <TableCell className="font-medium">{caseItem.id}</TableCell>
                                <TableCell>{caseItem.caseTitle}</TableCell>
                                <TableCell className="flex items-center space-x-2">
                                    <img src={caseItem.clientAvatar} alt={caseItem.clientName} className="w-6 h-6 rounded-full" />
                                    <div>
                                        <div className="font-medium">{caseItem.clientName}</div>
                                        <div className="text-xs text-gray-500">{caseItem.clientEmail}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                        ${caseItem.status === 'Active' ? 'bg-green-100 text-green-700' :
                                        caseItem.status === 'Inactive' ? 'bg-red-100 text-red-700' :
                                        'bg-blue-100 text-blue-700'}`}>
                                        {caseItem.status}
                                    </span>
                                </TableCell>
                                <TableCell>{caseItem.court}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            {/* <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreVertical className="h-4 w-4" />
                                            </Button> */}
                                            <Button>
                                             <MoreVertical />
                                            </Button> 
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleViewCaseDetails(caseItem)}>
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleEditCase(caseItem)}>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDeleteCase(caseItem)}>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500">
                                No cases found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            {filteredCases.length > casesPerPage && (
                <div className="flex justify-center items-center space-x-2 mt-6">
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
                                variant="outline"
                                className={currentPage === pageNumber ? "font-bold text-primary bg-gray-100" : ""}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </Button>
                        ))}
                    </div>
                    <Button
                        // variant="outline"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CasesTab;