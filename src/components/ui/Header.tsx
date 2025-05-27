// src/components/Header.tsx
import React from 'react';

import {
  HamburgerIcon,
  MagnifyingGlassIcon,
  
} from '@/assets/sidebar/index';
import { Input } from '@/components/ui/input';
import UserProfileDropdown from '@/components/userProfile/userProfile'; // Make sure this path is correct
// import { Link } from 'react-router-dom'; // Import Link for breadcrumbs
import { BellIcon } from 'lucide-react';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  pageTitle: string;
  parentTitle?: string; // Optional, for breadcrumbs
  user: { name: string; role: string; avatarUrl: string }; // User prop
  logoutHandler: (event: React.MouseEvent) => void; // Logout handler prop
  onGlobalSearch?: (query: string) => void; // Optional global search handler
}

const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  // pageTitle,
  parentTitle = 'Dashboard', // Default parent title
  user,
  logoutHandler,
  onGlobalSearch,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onGlobalSearch) {
      onGlobalSearch(e.target.value);
    }
  };

  return (
    <header className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
      <div className="flex items-center gap-6">
        <button onClick={toggleSidebar} className="text-blue-800 text-2xl">
          <HamburgerIcon/>
        </button>
        {/* <div className="flex items-center space-x-2 text-gray-700"> */}
          {/* Breadcrumbs */}
          {/* {parentTitle !== 'Dashboard' && ( // Only show parent if not Dashboard
            <Link to={`/${parentTitle.toLowerCase().replace(/\s/g, '-')}`} className="text-gray-500 hover:underline">
              {parentTitle}
            </Link>
          )}
          {parentTitle !== 'Dashboard' && <span className="text-gray-500"> / </span>} {/* Separator */}
          {/* <h1 className="text-3xl font-semibold text-blue-800">{pageTitle}</h1>
        </div> */}
        <div className="flex items-center text-gray-700">
  {/* Show only the parent section in large bold blue text */}
  <h1 className="text-3xl font-semibold text-blue-800">
     {/* {parentTitle === 'Home' ? 'Dashboard' : parentTitle} */}
     {parentTitle}
  </h1>
</div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative w-64">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <MagnifyingGlassIcon />
          </span>
          <Input
            type="text"
            placeholder="Search here"
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="relative inline-block">
          <BellIcon />
          <span className="absolute -top-1 -right-3 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">
            5
          </span>
        </div>
        <div className="userProfile">
          <UserProfileDropdown user={user} logoutHandler={logoutHandler} />
        </div>
      </div>
    </header>
  );
};

export default Header;