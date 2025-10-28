import React, { useState, Fragment } from "react";
import { Upload, Archive } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";

interface UserData {
  id: number; 
  name: string;
  email: string;
  roles: "Admin" | "User" | "Editor";
  status: "Active" | "Inactive";
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: 1,
      name: "Ma. Helen Marie Y. Rodas",
      email: "rodasmahelenmarie.bsit@gmail.com",
      roles: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Ma. Helen Marie Y. Rodas",
      email: "rodasmahelenmarie.bsit@gmail.com",
      roles: "Admin",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Ma. Helen Marie Y. Rodas",
      email: "rodasmahelenmarie.bsit@gmail.com",
      roles: "Admin",
      status: "Active",
    },
    {
      id: 4,
      name: "Ma. Helen Marie Y. Rodas",
      email: "rodasmahelenmarie.bsit@gmail.com",
      roles: "Admin",
      status: "Active",
    },
    {
      id: 5,
      name: "Ma. Helen Marie Y. Rodas",
      email: "rodasmahelenmarie.bsit@gmail.com",
      roles: "Admin",
      status: "Active",
    },
    // Adding more data to ensure pagination works with the new total
    {
      id: 6,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      roles: "User",
      status: "Active",
    },
    {
      id: 7,
      name: "John Smith",
      email: "john.smith@example.com",
      roles: "Editor",
      status: "Inactive",
    },
    {
      id: 8,
      name: "Alice Johnson",
      email: "alice.j@example.com",
      roles: "User",
      status: "Active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    roles: "User" as "Admin" | "User" | "Editor",
    status: "Active" as "Active" | "Inactive",
  });
  // fileInputRef removed because it was unused
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isConfirmArchiveOpen, setIsConfirmArchiveOpen] = useState(false);
  const [isArchiveSuccessOpen, setIsArchiveSuccessOpen] = useState(false);
  const [userToArchive, setUserToArchive] = useState<number | null>(null);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
    setNewUserData({
      name: "",
      email: "",
      roles: "User",
      status: "Active",
    });
  };

  const handleSaveNewUser = () => {
    const newUser: UserData = {
      id: users.length > 0 ? Math.max(...users.map((s) => s.id)) + 1 : 1,
      name: newUserData.name,
      email: newUserData.email,
      roles: newUserData.roles,
      status: newUserData.status,
    };
    setUsers([...users, newUser]);
    setIsAddModalOpen(false);
  };

  const handleOpenUpdateModal = (user: UserData) => {
    setCurrentUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleSaveUpdate = () => {
    if (currentUser) {
      setUsers(
        users.map((s) => (s.id === currentUser.id ? currentUser : s))
      );
      setIsUpdateModalOpen(false);
      setCurrentUser(null);
    }
  };

  // Renamed Archive to a more common "Delete/Remove" action for user management
  const handleArchive = (id: number) => {
    setUserToArchive(id);
    setIsConfirmArchiveOpen(true);
  };

  const handleConfirmArchive = () => {
    if (userToArchive !== null) {
      setUsers(users.filter((user) => user.id !== userToArchive));
      setIsConfirmArchiveOpen(false);
      setUserToArchive(null);
      setIsArchiveSuccessOpen(true); // Open success modal
    }
  };

  const handleExportCSV = () => {
    alert("Exporting Users to CSV...");
    // Implement actual CSV export logic here
  };

  // Updated search logic to filter by name or email
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      {/* Table Title and Header (Modified to 'Manage Users') */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
              Manage Users Table
            </h1>
          </div>
        </div>

        {/* Search & Add Button (Search bar on the left, buttons on the right) */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          
          {/* Search Bar - Left Side */}
          <div className="relative w-full sm:max-w-md order-1 sm:order-1">
            <input
              type="text"
              placeholder="Search name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Add & Export Buttons - Right Side */}
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 order-2 sm:order-2 ml-auto">
            <button
              onClick={handleOpenAddModal}
              className="bg-[#453EFE] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              + Add User
            </button>
            <button
              onClick={handleExportCSV}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Table (Removed ID column) */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {/* ID Header REMOVED */}
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Roles
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {/* ID Data REMOVED */}

                  {/* Name */}
                  <td className="px-6 py-4 text-sm font-normal text-gray-900 dark:text-white whitespace-nowrap">
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 min-w-[200px] whitespace-normal">
                    {user.email}
                  </td>

                  {/* Roles */}
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {user.roles}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-5 py-1 inline-flex text-small font-normal rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    {/* Update */}
                    <div className="relative group">
                      <button
                        onClick={() => handleOpenUpdateModal(user)}
                        className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition"
                      >
                        <Upload className="w-5 h-5" />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                        Update
                      </span>
                    </div>

                    {/* Archive/Delete */}
                    <div className="relative group">
                      <button
                        onClick={() => handleArchive(user.id)}
                        className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition"
                      >
                        <Archive className="w-5 h-5" />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                        Archive
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (Kept original design as requested) */}
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} Entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === i + 1
                      ? "bg-[#453EFE] text-white"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal (Updated fields) */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md overflow-hidden transform transition-all"
            style={{ borderRadius: "15px" }}
          >
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add User
              </h3>
              <button
                type="button"
                className="text-[#453EFE] hover:text-indigo-700 transition-colors"
                onClick={() => setIsAddModalOpen(false)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="add-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="add-name"
                    name="name"
                    value={newUserData.name}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    style={{ borderRadius: "12px" }}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="add-email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="add-email"
                    name="email"
                    value={newUserData.email}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    style={{ borderRadius: "12px" }}
                  />
                </div>

                {/* Roles Dropdown */}
                <div>
                  <label
                    htmlFor="add-roles"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Roles
                  </label>
                  <div className="relative">
                    <select
                      id="add-roles"
                      name="roles"
                      value={newUserData.roles}
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          roles: e.target.value as "Admin" | "User" | "Editor",
                        })
                      }
                      className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent appearance-none dark:bg-gray-700 dark:text-white"
                      style={{ borderRadius: "12px" }}
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                      <option value="Editor">Editor</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="h-4 w-4 fill-current text-[#453EFE]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Status Dropdown */}
                <div>
                  <label
                    htmlFor="add-status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Status
                  </label>
                  <div className="relative">
                    <select
                      id="add-status"
                      name="status"
                      value={newUserData.status}
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          status: e.target.value as "Active" | "Inactive",
                        })
                      }
                      className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent appearance-none dark:bg-gray-700 dark:text-white"
                      style={{ borderRadius: "12px" }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="h-4 w-4 fill-current text-[#453EFE]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                className="bg-[#453EFE] text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={handleSaveNewUser}
                style={{ borderRadius: "10px" }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update User Modal (Updated fields) */}
      {isUpdateModalOpen && currentUser && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md overflow-hidden transform transition-all"
            style={{ borderRadius: "15px" }}
          >
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update User
              </h3>
              <button
                type="button"
                className="text-[#453EFE] hover:text-indigo-700 transition-colors"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="update-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="update-name"
                    name="name"
                    value={currentUser.name}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    style={{ borderRadius: "12px" }}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="update-email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="update-email"
                    name="email"
                    value={currentUser.email}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    style={{ borderRadius: "12px" }}
                  />
                </div>

                {/* Roles Dropdown */}
                <div>
                  <label
                    htmlFor="update-roles"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Roles
                  </label>
                  <div className="relative">
                    <select
                      id="update-roles"
                      name="roles"
                      value={currentUser.roles}
                      onChange={(e) =>
                        setCurrentUser({
                          ...currentUser,
                          roles: e.target.value as "Admin" | "User" | "Editor",
                        })
                      }
                      className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent appearance-none dark:bg-gray-700 dark:text-white"
                      style={{ borderRadius: "12px" }}
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                      <option value="Editor">Editor</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="h-4 w-4 fill-current text-[#453EFE]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Status Dropdown */}
                <div>
                  <label
                    htmlFor="update-status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Status
                  </label>
                  <div className="relative">
                    <select
                      id="update-status"
                      name="status"
                      value={currentUser.status}
                      onChange={(e) =>
                        setCurrentUser({
                          ...currentUser,
                          status: e.target.value as "Active" | "Inactive",
                        })
                      }
                      className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent appearance-none dark:bg-gray-700 dark:text-white"
                      style={{ borderRadius: "12px" }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="h-4 w-4 fill-current text-[#453EFE]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                className="bg-[#453EFE] text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={handleSaveUpdate}
                style={{ borderRadius: "10px" }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Archive Confirmation Modal with Animation (Kept as requested) */}
      <Transition appear show={isConfirmArchiveOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsConfirmArchiveOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-25"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm overflow-hidden transform transition-all text-center p-6"
                  style={{ borderRadius: "15px" }}
                >
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setIsConfirmArchiveOpen(false)}
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-triangle-alert text-[#453EFE]"
                    >
                      <path d="m21.73 18.27-8.94-15.09a2 2 0 0 0-3.58 0L2.27 18.27a2 2 0 0 0 1.79 2.73h17.88a2 2 0 0 0 1.79-2.73Z" />
                      <path d="M12 9v4" />
                      <path d="M12 17h.01" />
                    </svg>
                    <h4 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                      Are you sure you want to archive this?
                    </h4>
                  </div>
                  <div className="mt-6 flex justify-center gap-4">
                    <button
                      type="button"
                      className="px-6 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
                      onClick={handleConfirmArchive}
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 rounded-lg text-[#453EFE] border border-[#453EFE] hover:bg-gray-100 transition-colors"
                      onClick={() => setIsConfirmArchiveOpen(false)}
                    >
                      No, Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Archive Success Modal with Animation (Kept as requested) */}
      <Transition appear show={isArchiveSuccessOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsArchiveSuccessOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-25"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm overflow-hidden transform transition-all text-center p-6"
                  style={{ borderRadius: "15px" }}
                >
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setIsArchiveSuccessOpen(false)}
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check text-[#453EFE]"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <h4 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                      Archived Successfully!
                    </h4>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ManageUsers;