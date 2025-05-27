import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AvatarIcon } from "@/assets/sidebar";

// Define the shape of the user prop
interface User {
  name: string;
  role: string;
  avatarUrl?: string;
}

interface Props {
  user: User;
  logoutHandler: (event: React.MouseEvent) => void;
}

const UserProfileDropdown: React.FC<Props> = ({ user, logoutHandler }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={`${user.name}'s avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <AvatarIcon />
        )}
        <span className="hidden md:block text-sm font-medium text-gray-700">
          {user.name}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
          <ul className="py-1">
            <li>
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <AvatarIcon />
                View Profile
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faGear} className="mr-2" />
                Settings
              </a>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
