// src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {UserIcon,DocumentIcon,CalendarIcon,BillingIcon,DocumentFilterIcon,
  SettingIcon,TaskIcon,TwoDocumentIcon,UserCheckIcon,CalendarCheckIcon,
  DocumentCheckIcon,
  BillCheckIcon,
  SettingCheckIcon,
  DocumentFilterCheckIcon,
HomeCheckIcon} from "@/assets/sidebar/index";
import { HomeIcon } from 'lucide-react';




interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const today = new Date();

  return (
    <aside
      className={`bg-oklch(98.5% 0 0) text-slate-600 w-70 p-4 transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-all duration-300`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 10,
        overflowY: 'auto',
      }}
    >
      <div className="logo text-2xl text-blue-800 font-semibold mb-10 ml-8">
        Smart Law
      </div>
      <nav className="space-y-4 ml-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center bg-blue-100 text-blue-800 rounded-md p-2'
              : 'flex items-center hover:text-blue-500 rounded-md p-2'
          }>
           {({isActive})=>(
              <>
              {isActive? (<HomeCheckIcon/>): 
              (<HomeIcon/>)}
               <span className='ml-5'> Dashboard</span>
              </>
            )}    
        </NavLink>
        <NavLink
          to="/client-management"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center bg-blue-100 text-blue-800 rounded-md p-2'
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >
          {({isActive})=>(
              <>
              {isActive? (<UserCheckIcon/>): 
              (<UserIcon/>)}
               <span className='ml-5'>Client Management</span>
              </>
            )}    
        </NavLink>
        <NavLink
          to="/user-management"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center bg-blue-100 text-blue-800 rounded-md p-2'
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >{({isActive})=>(
              <>
              {isActive? (<UserCheckIcon/>): 
              (<UserIcon/>)}
               <span className='ml-5'>User Management</span>
              </>
            )}    
        {/*  <FontAwesomeIcon icon={faChevronDown} className="ml-auto h-3 w-3" /> {/* Added a dropdown indicator */}
        </NavLink>
        <NavLink
          to="/case-management"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center bg-blue-100 text-blue-800 rounded-md p-2'
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >
          {({isActive})=>(
              <>
              {isActive? (<DocumentCheckIcon/>): 
              (<DocumentIcon/>)}
               <span className='ml-5'>Case Management</span>
              </>
            )}    
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center bg-blue-100 text-blue-800 rounded-md p-2'
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >
          <TaskIcon />
          <span className='ml-5'>Task Management</span>
        </NavLink>
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center bg-blue-100 text-blue-800 rounded-md p-2'
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >
          {({isActive})=>(
              <>
              {isActive? (<CalendarCheckIcon/>): 
              (<CalendarIcon/>)}
               <span className='ml-5'> Calendar</span>
              </>
            )}        
        </NavLink>
         <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center bg-blue-100 text-blue-800 rounded-md p-2'
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >
          <TwoDocumentIcon />
          <span className='ml-5'>Documents</span>
        </NavLink>
        <NavLink
          to="/billing-invoice"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center bg-blue-100 text-blue-800 rounded-md p-2'
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >
         {({isActive})=>(
              <>
              {isActive? (<BillCheckIcon/>): 
              (<BillingIcon/>)}
               <span className='ml-5'> Billing & Invoice</span>
              </>
            )}    
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center bg-blue-100 text-blue-800 rounded-md p-2'
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >
         {({isActive})=>(
              <>
              {isActive? (<DocumentFilterCheckIcon/>): 
              (<DocumentFilterIcon/>)}
               <span className='ml-5'> Report</span>
              </>
            )}    
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? 'flex items-center bg-blue-100 text-blue-800 rounded-md p-2'
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >
         {({isActive})=>(
              <>
              {isActive? (<SettingCheckIcon/>): 
              (<SettingIcon/>)}
               <span className='ml-5'> Setting</span>
              </>
            )}    
        </NavLink>
      </nav>
      <div className="mt-36">
        <hr />
        <footer className="mt-auto text-sm text-center pt-2">
          <p className="text-shadow-2xs">Smart Law Admin Dashboard</p>
          &copy; {today.getFullYear()} All Rights Reserved
        </footer>
      </div>
    </aside>
  );
};

export default Sidebar;