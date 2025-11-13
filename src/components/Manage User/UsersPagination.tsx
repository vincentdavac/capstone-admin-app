import React from 'react';

interface UsersPaginationProps {
  currentPage: number;
  totalPages: number;
  filteredUsersLength: number;
  itemsPerPage: number;
  startIndex: number;
  setCurrentPage: (page: number) => void;
}

const UsersPagination: React.FC<UsersPaginationProps> = ({ 
    currentPage, 
    totalPages, 
    filteredUsersLength, 
    itemsPerPage, 
    startIndex, 
    setCurrentPage 
}) => {
  return (
    <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredUsersLength)} of{" "}
          {filteredUsersLength} entries
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
              key={i}
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
  );
};

export default UsersPagination;