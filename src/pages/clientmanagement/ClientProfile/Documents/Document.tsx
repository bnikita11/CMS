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
import { MagnifyingGlassIcon, MoreVertical } from '@/assets/sidebar'; // Ensure these paths are correct for your icons

// Import Dialog components
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";

// Import other form components
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";


// Interface for a document
interface Document {
    id: string;
    name: string;
    type: string; // e.g., 'PDF', 'Word', 'Image'
    size: string; // e.g., '2.5 MB'
    uploadDate: string;
    associatedCaseId?: string; // Optional: if documents are linked to cases
    clientName: string; // To show who the document belongs to
}

// Mock data for documents
const mockDocuments: Document[] = [
    {
        id: 'DOC001',
        name: 'Client Agreement - Tanner Finsha',
        type: 'PDF',
        size: '1.2 MB',
        uploadDate: '2023-01-15',
        associatedCaseId: '#J7YT2',
        clientName: 'Tanner Finsha',
    },
    {
        id: 'DOC002',
        name: 'Case Brief - Drug Trafficking',
        type: 'Word',
        size: '500 KB',
        uploadDate: '2023-02-01',
        associatedCaseId: '#J7YT2',
        clientName: 'Tanner Finsha',
    },
    {
        id: 'DOC003',
        name: 'Evidence Photos',
        type: 'ZIP',
        size: '10.5 MB',
        uploadDate: '2023-03-10',
        associatedCaseId: '#J7YT7',
        clientName: 'Tanner Finsha',
    },
    {
        id: 'DOC004',
        name: 'Witness Statement - Emeto Winner',
        type: 'PDF',
        size: '800 KB',
        uploadDate: '2023-01-20',
        associatedCaseId: '#J7YT8',
        clientName: 'Emeto Winner',
    },
    {
        id: 'DOC005',
        name: 'Court Order - #J7YT2',
        type: 'PDF',
        size: '300 KB',
        uploadDate: '2023-04-05',
        associatedCaseId: '#J7YT2',
        clientName: 'Tanner Finsha',
    },
    {
        id: 'DOC006',
        name: 'Communication Log - James Muriel',
        type: 'Excel',
        size: '1.1 MB',
        uploadDate: '2023-03-22',
        associatedCaseId: '#J7YT5',
        clientName: 'James Muriel',
    },
     {
        id: 'DOC007',
        name: 'Affidavit - Tanner Finsha',
        type: 'PDF',
        size: '750 KB',
        uploadDate: '2023-04-10',
        associatedCaseId: '#J7YT9',
        clientName: 'Tanner Finsha',
    },
    {
        id: 'DOC008',
        name: 'Plea Bargain Agreement',
        type: 'Word',
        size: '600 KB',
        uploadDate: '2023-05-01',
        associatedCaseId: '#J7YT3',
        clientName: 'Tanner Finsha',
    },
    {
        id: 'DOC009',
        name: 'Discovery Documents - Vol 1',
        type: 'PDF',
        size: '15.0 MB',
        uploadDate: '2023-05-15',
        associatedCaseId: '#J7YT2',
        clientName: 'Tanner Finsha',
    },
];

// Removed the unused CasesTabProps interface
// interface CasesTabProps {
//     clientId: string;
// }

interface DocumentsTabProps {
    clientId?: string; // Optional: if you want to filter documents by client
    caseId?: string;    // Optional: if you want to filter documents by case
}


const DocumentsTab: React.FC<DocumentsTabProps> = ({ clientId, caseId }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [documents, setDocuments] = useState<Document[]>([]);
    const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // State for modal visibility

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [documentsPerPage] = useState(5); // Adjust as needed

    // States for the upload form
    const [documentTitle, setDocumentTitle] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [assignedCase, setAssignedCase] = useState('');
    const [documentDescription, setDocumentDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});


    useEffect(() => {
        let relevantDocuments = mockDocuments;

        if (clientId) {
            relevantDocuments = relevantDocuments.filter(doc => doc.clientName.toLowerCase().includes('tanner finsha'));
        }

        if (caseId) {
            relevantDocuments = relevantDocuments.filter(doc => doc.associatedCaseId === caseId);
        }
        
        setDocuments(relevantDocuments);
    }, [clientId, caseId]);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = documents.filter(
            (doc) =>
                doc.name.toLowerCase().includes(lowerCaseQuery) ||
                doc.id.toLowerCase().includes(lowerCaseQuery) ||
                doc.type.toLowerCase().includes(lowerCaseQuery) ||
                doc.clientName.toLowerCase().includes(lowerCaseQuery) ||
                (doc.associatedCaseId?.toLowerCase().includes(lowerCaseQuery))
        );
        setFilteredDocuments(filtered);
        setCurrentPage(1); // Reset to first page on search
    }, [searchQuery, documents]);

    // Pagination Logic
    const indexOfLastDocument = currentPage * documentsPerPage;
    const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
    const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);
    const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleUploadDocument = () => {
        setIsUploadModalOpen(true); // Open the modal
    };

    const handleExportDocuments = () => {
        alert('Exporting documents!');
        // Logic to export selected or filtered documents
    };

    const handlePrintDocuments = () => {
        window.print();
    };

    const handleViewDocument = (documentItem: Document) => {
        alert(`Viewing document: ${documentItem.name} (ID: ${documentItem.id})`);
        // Implement logic to open a document viewer or download the document
    };

    const handleEditDocument = (documentItem: Document) => {
        alert(`Editing document details for: ${documentItem.name}`);
        // Implement logic to edit document metadata (not the file content)
    };

    const handleDeleteDocument = (documentItem: Document) => {
        if (confirm(`Are you sure you want to delete document: ${documentItem.name}?`)) {
            setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== documentItem.id));
            alert(`Document ${documentItem.name} deleted.`);
        }
    };

    // --- New functions for file upload modal ---
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setSelectedFiles(prev => [...prev, ...filesArray]);
            filesArray.forEach(file => {
                setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
            });
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files) {
            const filesArray = Array.from(event.dataTransfer.files);
            setSelectedFiles(prev => [...prev, ...filesArray]);
            filesArray.forEach(file => {
                setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
            });
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleRemoveFile = (fileName: string) => {
        setSelectedFiles(prev => prev.filter(file => file.name !== fileName));
        setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileName];
            return newProgress;
        });
    };

    const handleModalUpload = () => {
        if (selectedFiles.length === 0) {
            alert('Please select files to upload.');
            return;
        }
        if (!documentTitle || !documentType || !assignedCase) {
             alert('Please fill in Title, Document Type, and Assign to case fields.');
             return;
        }

        console.log({
            title: documentTitle,
            type: documentType,
            case: assignedCase,
            description: documentDescription,
            files: selectedFiles.map(file => file.name)
        });

        // Simulate upload progress
        selectedFiles.forEach(file => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
                if (progress >= 100) {
                    clearInterval(interval);
                    // Add the new document to the documents list
                    setDocuments(prevDocs => [
                        ...prevDocs,
                        {
                            id: `DOC${Math.floor(Math.random() * 10000)}`, // Generate a simple ID
                            name: file.name,
                            type: documentType, // Use selected type
                            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                            uploadDate: new Date().toISOString().split('T')[0],
                            associatedCaseId: assignedCase,
                            clientName: clientId ? 'Tanner Finsha' : 'N/A', // Adjust based on how client is determined
                        }
                    ]);
                }
            }, 100);
        });

        // Reset form and close modal after a short delay to show progress
        setTimeout(() => {
            alert('Documents uploaded successfully!');
            setDocumentTitle('');
            setDocumentType('');
            setAssignedCase('');
            setDocumentDescription('');
            setSelectedFiles([]);
            setUploadProgress({});
            setIsUploadModalOpen(false); // Close the modal
        }, 1200); // Give a bit of time for progress to reach 100%
    };

    // Mock data for dropdowns (replace with real data from your backend)
    const mockDocumentTypes = ['Agreement', 'Brief', 'Evidence', 'Order', 'Statement', 'Other'];
    const mockCasesForDropdown = [
        { id: '#J7YT2', title: 'Drug Trafficking Charges (Tanner Finsha)' },
        { id: '#J7YT7', title: 'Drug Trafficking Charges (High Court)' },
        { id: '#J7YT8', title: 'Civil Dispute (Emeto Winner)' },
        { id: '#J7YT9', title: 'Real Estate Fraud (Tanner Finsha)' },
        { id: '#J7YT3', title: 'Assault Case (Tanner Finsha)' },
        { id: '#J7YT5', title: 'Financial Misconduct (James Muriel)' },
    ];


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
                        placeholder="Search documents..."
                        className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex space-x-3">
                    <Button onClick={handleExportDocuments} variant="outline">Export</Button>
                    <Button onClick={handlePrintDocuments} variant="outline">Print</Button>
                    {/* DialogTrigger wraps the button to open the modal */}
                    <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={handleUploadDocument}>Upload Document</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] p-6"> {/* Increased width for better layout */}
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">Upload documents</DialogTitle>
                                <DialogDescription className="text-gray-500">
                                    Fill out the fields and upload your file.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-5">
                                {/* Title */}
                                <div className="flex flex-col">
                                    <Label htmlFor="title" className="text-right mb-2">
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        placeholder="Document title"
                                        className="col-span-3"
                                        value={documentTitle}
                                        onChange={(e) => setDocumentTitle(e.target.value)}
                                    />
                                </div>

                                {/* Document Type */}
                                <div className="flex flex-col">
                                    <Label htmlFor="documentType" className="text-right mb-2">
                                        Document Type
                                    </Label>
                                    <Select onValueChange={setDocumentType} value={documentType}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select document type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mockDocumentTypes.map(type => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Assign to case */}
                                <div className="flex flex-col">
                                    <Label htmlFor="assignCase" className="text-right mb-2">
                                        Assign to case
                                    </Label>
                                    <Select onValueChange={setAssignedCase} value={assignedCase}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a case" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mockCasesForDropdown.map(caseItem => (
                                                <SelectItem key={caseItem.id} value={caseItem.id}>
                                                    {caseItem.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Description */}
                                <div className="flex flex-col">
                                    <Label htmlFor="description" className="text-right mb-2">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Add any relevant description..."
                                        className="col-span-3"
                                        value={documentDescription}
                                        onChange={(e) => setDocumentDescription(e.target.value)}
                                    />
                                </div>

                                {/* File Upload Area */}
                                <div className="col-span-4 ">
                                    <Label className="block text-sm font-medium text-gray-700 mb-2">Upload a file</Label>
                                    <p className="text-xs text-gray-500 mb-2">File upload description</p>
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onClick={() => document.getElementById('file-upload-input')?.click()}
                                    >
                                        <input
                                            id="file-upload-input"
                                            type="file"
                                            multiple
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-10 w-10 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                />
                                            </svg>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold text-blue-600">Drop your files here</span>
                                            </p>
                                            <p className="text-xs text-gray-500">Browse file from your computer</p>
                                        </div>
                                    </div>
                                    {selectedFiles.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            {selectedFiles.map((file) => ( // Removed 'index'
                                                <div key={file.name} className="flex items-center justify-between p-2 border rounded-md">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium truncate">{file.name}</p>
                                                        <Progress value={uploadProgress[file.name] || 0} className="w-[100%]" />
                                                        <p className="text-xs text-gray-500">{`${(file.size / 1024).toFixed(2)} KB`} - {uploadProgress[file.name] === 100 ? 'Uploaded' : `${uploadProgress[file.name]}%`}</p>
                                                    </div>
                                                    {uploadProgress[file.name] !== 100 && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleRemoveFile(file.name)}
                                                            className="ml-2"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 01-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                                                            </svg>
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleModalUpload} className="w-full">Upload</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Documents Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Document ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead>Associated Client/Case</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentDocuments.length > 0 ? (
                        currentDocuments.map((documentItem) => (
                            <TableRow key={documentItem.id}>
                                <TableCell className="font-medium">{documentItem.id}</TableCell>
                                <TableCell>{documentItem.name}</TableCell>
                                <TableCell>{documentItem.type}</TableCell>
                                <TableCell>{documentItem.size}</TableCell>
                                <TableCell>{documentItem.uploadDate}</TableCell>
                                <TableCell>
                                    {documentItem.clientName}
                                    {documentItem.associatedCaseId && (
                                        <span className="text-xs text-gray-500 block">
                                            (Case: {documentItem.associatedCaseId})
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button>
                                                <MoreVertical />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleViewDocument(documentItem)}>
                                                View Document
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleEditDocument(documentItem)}>
                                                Edit Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDeleteDocument(documentItem)}>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500">
                                No documents found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            {filteredDocuments.length > documentsPerPage && (
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

export default DocumentsTab;