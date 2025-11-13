import React from 'react';
import { Archive, Fullscreen } from 'lucide-react';

interface BarangayData {
    id: number;
    name: string;
}

interface UserAttributes {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    houseNo: string;
    street: string;
    barangay: BarangayData | null;
    municipality: string | null;
    isAdmin: boolean;
    isActive: boolean;
    image: string | null;
    imageUrl: string | null;
    createdDate: string | null;
    createdTime: string | null;
    updatedDate: string | null;
    updatedTime: string | null;
}

interface UserData {
    id: number;
    attributes: UserAttributes;
}

interface UsersTableProps {
  currentUsers: UserData[];
  loading: boolean;
  startIndex: number;
  handleUpdateClick: (u: UserData) => void;
  handleArchiveClick: (u: UserData) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ 
    currentUsers, 
    loading, 
    startIndex, 
    handleUpdateClick, 
    handleArchiveClick 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
              No.
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
              Profile
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
              Contact No.
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
              Email
            </th>

            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
              Barangay
            </th>

            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
              Role
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <tr>
              <td colSpan={9} className="text-center py-10">
                <div className="flex justify-center items-center gap-2 text-gray-500">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
                  Loading data...
                </div>
              </td>
            </tr>
          ) : currentUsers.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-10 text-gray-500">
                No user records found.
              </td>
            </tr>
          ) : (
            currentUsers.map((u, i) => {
              const a = u.attributes;
              return (
                <tr
                  key={u.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                    {startIndex + i + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                    <img
                      src={a.image ?? ""}
                      alt="User"
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                    {a.firstName} {a.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {a.contactNumber ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {a.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {a.barangay?.name ?? "—"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-3 py-0.5 inline-flex text-xs font-medium rounded-full ${
                        a.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {a.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {a.isAdmin ? "Admin" : "User"}
                  </td>
                  <td className="px-6 py-4 flex flex-row gap-2">
                    <button
                      onClick={() => handleUpdateClick(u)}
                      className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
                    >
                      <Fullscreen className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleArchiveClick(u)}
                      className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
                    >
                      <Archive className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;