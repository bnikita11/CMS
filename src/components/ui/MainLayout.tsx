// src/layouts/MainLayout.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import type { RootState } from '@/redux/slices/store';

import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';
import { cn } from '@/lib/utils'; // Assuming this is for conditional class names

const user = {
name: 'Vermillion',
role: 'admin',
avatarUrl: '', // or provide a URL
};

const MainLayout: React.FC = () => {
const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation();
const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Start with sidebar open by default, adjust as needed
const mainContentRef = useRef<HTMLElement>(null);

// Redirect to login if not authenticated
useEffect(() => {
if (!isAuthenticated) {
navigate('/login', { replace: true }); // Use replace to prevent back navigation to dashboard
}
}, [isAuthenticated, navigate]);

const toggleSidebar = () => {
setIsSidebarOpen(!isSidebarOpen);
};

const logoutHandler = (event: React.MouseEvent) => {
event.preventDefault();
dispatch(logout());
localStorage.removeItem('token');
navigate('/login'); // Redirect to login page after logout
};

// Function to determine page title and parent title based on current path
const getPageTitles = () => {
const path = location.pathname.split('/').filter(Boolean); // Split and remove empty strings
let pageTitle = 'Dashboard'; // Default for /dashboard
let parentTitle = 'Dashboard'; // Default parent for /dashboard

if (path.length > 0) {
  // Get the last segment, which is usually the page title
  const lastSegment = path[path.length - 1];
  pageTitle = lastSegment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Determine parent title based on path structure or specific rules
  if (path.length > 1) {
    parentTitle = path[path.length - 2]
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

// Specific overrides for your design:
if (pageTitle === 'User Management') {
  parentTitle = 'User';
} else if (pageTitle === 'Client Management') {
  parentTitle = 'Client';
}
else if(pageTitle==="Calendar")
{
  parentTitle="Calendar";
}
else if (pageTitle === 'Dashboard') {
    parentTitle = 'Dashboard'; // Or keep it 'Dashboard' if you prefer "Home > Dashboard"
}
else if (pageTitle==="Case Management"){
  parentTitle="Case";
}
else if (pageTitle==="Task Management"){
  parentTitle="Task";
}
else if (pageTitle==="Documents"){
  parentTitle="Documents";
}
else if (pageTitle==="Billing & Invoices"){
  parentTitle="Billing";
}
else if (pageTitle==="Report"){
  parentTitle="Report";
}
else if (pageTitle==="Setting"){
  parentTitle="Setting"
}
return { pageTitle, parentTitle };
};

const { pageTitle, parentTitle } = getPageTitles();

const handleGlobalSearch = (query: string) => {
console.log('Global search query from Header:', query);
// Implement global search logic here (e.g., redirect to a search results page)
};

// Adjust main content height dynamically (from your original code)
useEffect(() => {
const updateMainContentHeight = () => {
if (mainContentRef.current) {
const headerElement = document.querySelector('header'); // Assuming your Header is the first header
const headerHeight = headerElement ? headerElement.offsetHeight : 0;
const viewportHeight = window.innerHeight;
const availableHeight = viewportHeight - headerHeight;

    mainContentRef.current.style.maxHeight = `${availableHeight}px`;
    mainContentRef.current.style.overflowY = 'auto';
  }
};
updateMainContentHeight();
window.addEventListener('resize', updateMainContentHeight);

return () => {
  window.removeEventListener('resize', updateMainContentHeight);
};
}, [isSidebarOpen]); // Recalculate if sidebar opens/closes

if (!isAuthenticated) {
// This state should ideally be handled by the useEffect above
// or a dedicated public route for login.
// Returning null or a loading spinner is safer here.
return null;
}

return (
<div className="flex h-screen overflow-hidden">
<Sidebar isSidebarOpen={isSidebarOpen} />
<main
className={cn(
'flex-1 p-6 bg-gray-50 transition-all duration-300', // Changed bg to gray-50 for subtle distinction
isSidebarOpen ? 'ml-64' : 'ml-0'
)}
style={{
marginLeft: isSidebarOpen ? '256px' : '0px',
transition: 'margin-left 0.3s ease-in-out',
}}
ref={mainContentRef}
>
<Header
isSidebarOpen={isSidebarOpen}
toggleSidebar={toggleSidebar}
pageTitle={pageTitle}
parentTitle={parentTitle}
user={user}
logoutHandler={logoutHandler}
onGlobalSearch={handleGlobalSearch}
/>
{/* The Outlet renders the specific page component based on the current route */}
<div className="flex-1 bg-white p-6 rounded-lg shadow-md">
<Outlet />
</div>
</main>
</div>
);
};

export default MainLayout;

