// src/pages/UserManagementPage.tsx
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import AddNewUserCard from './UserCard'; // Import your AddNewUserCard component
import { MagnifyingGlassIcon } from '@/assets/sidebar';

// Define a type for User
interface User {
    id: string;
    name: string;
    email: string;
    accountType: string;
    status: string;
}

// Dummy data for users
const initialUsers: User[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', accountType: 'Admin', status: 'Active' },
    { id: '2', name: 'Bob Williams', email: 'bob@example.com', accountType: 'Staff', status: 'Active' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', accountType: 'Intern', status: 'Inactive' },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com', accountType: 'Staff', status: 'Active' },
];

const UserManagementPage: React.FC = () => {
    const [userSearchQuery, setUserSearchQuery] = useState('');
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    useEffect(() => {
        const lowerCaseQuery = userSearchQuery.toLowerCase();
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(lowerCaseQuery) ||
            user.email.toLowerCase().includes(lowerCaseQuery) ||
            user.accountType.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredUsers(filtered);
    }, [userSearchQuery, users]);

    const handleUserAdded = (newUser: { fullName: string; email: string; accountType: string; status: string }) => {
        const newId = (Math.max(...users.map(u => parseInt(u.id, 10))) + 1).toString();
        const userToAdd: User = {
            id: newId,
            name: newUser.fullName,
            email: newUser.email,
            accountType: newUser.accountType,
            status: newUser.status || 'Active',
        };
        setUsers(prevUsers => [...prevUsers, userToAdd]);
        setIsAddUserModalOpen(false);
    };

    const handleExport = () => {
        alert('Export functionality will be implemented here!');
        // In a real application, you'd trigger a data export (e.g., to CSV or Excel)
    };

    const handlePrint = () => {
        window.print();
        // This will open the browser's print dialog
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-64">
                     <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <MagnifyingGlassIcon />
                    </span>
                    <Input
                        type="text"
                        placeholder="Search users..."
                        className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={userSearchQuery}
                        onChange={(e) => setUserSearchQuery(e.target.value)}
                    />
                    {/* <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
                </div>
                {/* Moved Add New User button to the left in this row */}
                <div>
                    <Button onClick={() => setIsAddUserModalOpen(true)}>+ New User</Button>
                </div>
            </div>

            {/* New row for Export and Print buttons, aligned to the right */}
            <div className='flex justify-end gap-5 mb-6'>
                <Button onClick={handleExport} variant="outline">Export</Button>
                <Button onClick={handlePrint} variant="outline">Print</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">User List</CardTitle>
                    <CardDescription>Manage your user accounts and roles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.accountType}</TableCell>
                                        <TableCell>{user.status}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">Edit</Button>
                                            <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-gray-500">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Modal Overlay and AddNewUserCard Conditional Rendering */}
            {isAddUserModalOpen && (
                <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
                    <DialogPortal>
                        <DialogOverlay className="bg-transparent" />
                        <DialogContent className="bg-white shadow-lg">
                            <AddNewUserCard
                                onClose={() => setIsAddUserModalOpen(false)}
                                onUserAdded={handleUserAdded}
                            />
                        </DialogContent>
                    </DialogPortal>
                </Dialog>
            )}
        </div>
    );
};

export default UserManagementPage;