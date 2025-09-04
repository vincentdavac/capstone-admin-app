import React, { useState, Fragment } from "react";
import { Archive, Upload, Search } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";

// 1. Define the interfaces for the table items
interface TableItem {
  id: number;
  title: string;
  description: string;
  status: "Active" | "Inactive";
}

interface HomepageFeedbackItem {
  id: number;
  name: string;
  role: string;
  description: string;
  status: "Active" | "Inactive";
}

// 2. Define your mock data, ensuring it matches the interfaces
const mockFeedbackDescriptionData: TableItem[] = [
  {
    id: 1,
    title: "VOICES FROM OUR COMMUNITY",
    description:
      "Join us on our mission to save lives. Become a part of the Coastella community by sharing your stories.",
    status: "Active",
  },
];

const mockHomepageFeedbackData: HomepageFeedbackItem[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Local Fisherman",
    description:
      "The new early warning system has been a game-changer for my daily work. I feel safer knowing I'll be alerted to any potential danger, and the information is always accurate.",
    status: "Active",
  },
  {
    id: 2,
    name: "Maria Reyes",
    role: "Community Leader",
    description:
      "This system has empowered our community, giving us the tools to respond proactively to threats and keep our families safe. It's a true testament to how technology can serve the people.",
    status: "Active",
  },
  {
    id: 3,
    name: "Ramon Cruz",
    role: "Marine Biologist",
    description:
      "The real-time data on environmental conditions has been invaluable for my research. It helps us track changes and understand how to better protect our precious marine ecosystems.",
    status: "Active",
  },
];

const CustomizationFeedbacks: React.FC = () => {
  const [feedbackDescriptionData, setFeedbackDescriptionData] = useState<TableItem[]>(
    mockFeedbackDescriptionData
  );
  const [homepageFeedbackData, setHomepageFeedbackData] = useState<HomepageFeedbackItem[]>(
    mockHomepageFeedbackData
  );

  const [feedbackDescriptionSearchTerm, setFeedbackDescriptionSearchTerm] = useState("");
  const [homepageFeedbackSearchTerm, setHomepageFeedbackSearchTerm] = useState("");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentUpdateItem, setCurrentUpdateItem] = useState<
    TableItem | HomepageFeedbackItem | null
  >(null);
  const [currentTableType, setCurrentTableType] = useState<string>("");

  const [isConfirmArchiveOpen, setIsConfirmArchiveOpen] = useState(false);
  const [isArchiveSuccessOpen, setIsArchiveSuccessOpen] = useState(false);
  const [itemToArchive, setItemToArchive] = useState<{
    id: number;
    table: "feedbackDescription" | "homepageFeedback";
  } | null>(null);

  // New states for Add Modal
  const [newFeedbackData, setNewFeedbackData] =
    useState<HomepageFeedbackItem>({
      id: 0,
      name: "",
      role: "",
      description: "",
      status: "Active",
    });

  // Pagination states for each table
  const [feedbackDescriptionCurrentPage, setFeedbackDescriptionCurrentPage] =
    useState(1);
  const [homepageFeedbackCurrentPage, setHomepageFeedbackCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleOpenUpdateModal = (
    item: TableItem | HomepageFeedbackItem,
    tableType: string
  ) => {
    setCurrentUpdateItem(item);
    setCurrentTableType(tableType);
    setIsUpdateModalOpen(true);
  };

  const handleSaveUpdate = () => {
    if (currentUpdateItem) {
      if (currentTableType === "feedbackDescription") {
        setFeedbackDescriptionData(
          feedbackDescriptionData.map((item) =>
            item.id === currentUpdateItem.id ? currentUpdateItem : item
          ) as TableItem[]
        );
      } else if (currentTableType === "homepageFeedback") {
        setHomepageFeedbackData(
          homepageFeedbackData.map((item) =>
            item.id === currentUpdateItem.id
              ? (currentUpdateItem as HomepageFeedbackItem)
              : item
          )
        );
      }
    }
    setIsUpdateModalOpen(false);
    setCurrentUpdateItem(null);
  };

  const handleArchive = (
    id: number,
    tableType: "feedbackDescription" | "homepageFeedback"
  ) => {
    setItemToArchive({ id, table: tableType });
    setIsConfirmArchiveOpen(true);
  };

  const handleConfirmArchive = () => {
    if (itemToArchive) {
      if (itemToArchive.table === "feedbackDescription") {
        const newFeedbackDescriptionData = feedbackDescriptionData.filter(
          (item) => item.id !== itemToArchive.id
        );
        setFeedbackDescriptionData(newFeedbackDescriptionData);
        if (
          newFeedbackDescriptionData.length <=
            (feedbackDescriptionCurrentPage - 1) * itemsPerPage &&
          feedbackDescriptionCurrentPage > 1
        ) {
          setFeedbackDescriptionCurrentPage(feedbackDescriptionCurrentPage - 1);
        }
      } else {
        const newHomepageFeedbackData = homepageFeedbackData.filter(
          (item) => item.id !== itemToArchive.id
        );
        setHomepageFeedbackData(newHomepageFeedbackData);
        if (
          newHomepageFeedbackData.length <=
            (homepageFeedbackCurrentPage - 1) * itemsPerPage &&
          homepageFeedbackCurrentPage > 1
        ) {
          setHomepageFeedbackCurrentPage(homepageFeedbackCurrentPage - 1);
        }
      }
      setIsConfirmArchiveOpen(false);
      setItemToArchive(null);
      setIsArchiveSuccessOpen(true);
    }
  };

  const handleAddModalOpen = () => {
    setNewFeedbackData({
      id: 0,
      name: "",
      role: "",
      description: "",
      status: "Active",
    });
    setIsAddModalOpen(true);
  };

  const handleAddNewFeedback = () => {
    const newId =
      homepageFeedbackData.length > 0
        ? Math.max(...homepageFeedbackData.map((item) => item.id)) + 1
        : 1;
    const newItem = { ...newFeedbackData, id: newId };
    setHomepageFeedbackData([...homepageFeedbackData, newItem]);
    setIsAddModalOpen(false);
  };

  const filteredFeedbackDescriptionData = feedbackDescriptionData.filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(feedbackDescriptionSearchTerm.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(feedbackDescriptionSearchTerm.toLowerCase())
  );

  const filteredHomepageFeedbackData = homepageFeedbackData.filter(
    (item) =>
      item.name.toLowerCase().includes(homepageFeedbackSearchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(homepageFeedbackSearchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(homepageFeedbackSearchTerm.toLowerCase())
  );

  // Pagination calculations for Feedback Description table
  const totalFeedbackDescriptionPages = Math.ceil(
    filteredFeedbackDescriptionData.length / itemsPerPage
  );
  const lastFeedbackDescriptionItemIndex = feedbackDescriptionCurrentPage * itemsPerPage;
  const firstFeedbackDescriptionItemIndex =
    lastFeedbackDescriptionItemIndex - itemsPerPage;
  const paginatedFeedbackDescriptionData = filteredFeedbackDescriptionData.slice(
    firstFeedbackDescriptionItemIndex,
    lastFeedbackDescriptionItemIndex
  );

  // Pagination calculations for Homepage Feedback table
  const totalHomepageFeedbackPages = Math.ceil(
    filteredHomepageFeedbackData.length / itemsPerPage
  );
  const lastHomepageFeedbackItemIndex = homepageFeedbackCurrentPage * itemsPerPage;
  const firstHomepageFeedbackItemIndex = lastHomepageFeedbackItemIndex - itemsPerPage;
  const paginatedHomepageFeedbackData = filteredHomepageFeedbackData.slice(
    firstHomepageFeedbackItemIndex,
    lastHomepageFeedbackItemIndex
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      {/* Preview Image Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
          Homepage Feedbacks Preview
        </h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="flex justify-center">
          <img
            src="/images/preview/feedback-preview.png"
            alt="Homepage Feedbacks Preview"
            className="rounded-lg border dark:border-gray-700 w-full max-w-2xl"
          />
        </div>
      </div>

      {/* Feedbacks Description Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
              Feedbacks Description Table
            </h1>
          </div>
        </div>
        {/* Search */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search title or description"
              value={feedbackDescriptionSearchTerm}
              onChange={(e) => setFeedbackDescriptionSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                >
                  Record ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedFeedbackDescriptionData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 min-w-[200px] whitespace-normal">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-5 py-1 inline-flex text-small font-normal rounded-full ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="relative group">
                      <button
                        onClick={() =>
                          handleOpenUpdateModal(item, "feedbackDescription")
                        }
                        className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition"
                      >
                        <Upload className="w-5 h-5" />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                        UPDATE
                      </span>
                    </div>
                    <div className="relative group">
                      <button
                        onClick={() =>
                          handleArchive(item.id, "feedbackDescription")
                        }
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
        {/* Pagination */}
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {firstFeedbackDescriptionItemIndex + 1} to{" "}
              {Math.min(
                lastFeedbackDescriptionItemIndex,
                filteredFeedbackDescriptionData.length
              )}{" "}
              of {filteredFeedbackDescriptionData.length} Entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setFeedbackDescriptionCurrentPage(feedbackDescriptionCurrentPage - 1)
                }
                disabled={feedbackDescriptionCurrentPage === 1}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from(
                { length: totalFeedbackDescriptionPages },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setFeedbackDescriptionCurrentPage(index + 1)}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      feedbackDescriptionCurrentPage === index + 1
                        ? "bg-[#453EFE] text-white"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setFeedbackDescriptionCurrentPage(feedbackDescriptionCurrentPage + 1)
                }
                disabled={feedbackDescriptionCurrentPage === totalFeedbackDescriptionPages}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Homepage Feedback Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
              Homepage Feedback Table
            </h1>
          </div>
        </div>
        {/* Search */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-shrink-0">
            <button
              onClick={handleAddModalOpen}
              className="bg-[#453EFE] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              + Add Feedback
            </button>
          </div>

          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search name, role, or description"
              value={homepageFeedbackSearchTerm}
              onChange={(e) => setHomepageFeedbackSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                >
                  Record ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedHomepageFeedbackData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 min-w-[200px] whitespace-normal">
                    {item.role}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 min-w-[200px] whitespace-normal">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-5 py-1 inline-flex text-small font-normal rounded-full ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="relative group">
                      <button
                        onClick={() =>
                          handleOpenUpdateModal(item, "homepageFeedback")
                        }
                        className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition"
                      >
                        <Upload className="w-5 h-5" />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                        UPDATE
                      </span>
                    </div>
                    <div className="relative group">
                      <button
                        onClick={() =>
                          handleArchive(item.id, "homepageFeedback")
                        }
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
        {/* Pagination */}
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {firstHomepageFeedbackItemIndex + 1} to{" "}
              {Math.min(
                lastHomepageFeedbackItemIndex,
                filteredHomepageFeedbackData.length
              )}{" "}
              of {filteredHomepageFeedbackData.length} Entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setHomepageFeedbackCurrentPage(homepageFeedbackCurrentPage - 1)
                }
                disabled={homepageFeedbackCurrentPage === 1}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalHomepageFeedbackPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setHomepageFeedbackCurrentPage(index + 1)}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    homepageFeedbackCurrentPage === index + 1
                      ? "bg-[#453EFE] text-white"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setHomepageFeedbackCurrentPage(homepageFeedbackCurrentPage + 1)
                }
                disabled={homepageFeedbackCurrentPage === totalHomepageFeedbackPages}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <Transition appear show={isUpdateModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsUpdateModalOpen(false)}
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
            <div className="flex min-h-full items-center justify-center p-4 text-left">
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
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md overflow-hidden transform transition-all"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {currentTableType === "homepageFeedback"
                        ? "UPDATE FEEDBACK"
                        : "UPDATE DESCRIPTION"}
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600 transition-colors"
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
                      {currentTableType === "homepageFeedback" ? (
                        <>
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
                              value={(currentUpdateItem as HomepageFeedbackItem)?.name || ""}
                              onChange={(e) =>
                                setCurrentUpdateItem((prev) =>
                                  prev ? { ...prev, name: e.target.value } : null
                                )
                              }
                              className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                              style={{ borderRadius: "12px" }}
                            />
                          </div>
                          {/* Role Input */}
                          <div>
                            <label
                              htmlFor="update-role"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              Role
                            </label>
                            <input
                              type="text"
                              id="update-role"
                              name="role"
                              value={(currentUpdateItem as HomepageFeedbackItem)?.role || ""}
                              onChange={(e) =>
                                setCurrentUpdateItem((prev) =>
                                  prev ? { ...prev, role: e.target.value } : null
                                )
                              }
                              className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                              style={{ borderRadius: "12px" }}
                            />
                          </div>
                          {/* Description Input */}
                          <div>
                            <label
                              htmlFor="update-description"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              Description
                            </label>
                            <textarea
                              id="update-description"
                              name="description"
                              rows={3}
                              value={(currentUpdateItem as HomepageFeedbackItem)?.description || ""}
                              onChange={(e) =>
                                setCurrentUpdateItem((prev) =>
                                  prev
                                    ? { ...prev, description: e.target.value }
                                    : null
                                )
                              }
                              className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                              style={{ borderRadius: "12px" }}
                            ></textarea>
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
                                value={(currentUpdateItem as HomepageFeedbackItem)?.status || "Active"}
                                onChange={(e) =>
                                  setCurrentUpdateItem((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          status: e.target.value as
                                            | "Active"
                                            | "Inactive",
                                        }
                                      : null
                                  )
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
                        </>
                      ) : (
                        <>
                          {/* Title Input */}
                          <div>
                            <label
                              htmlFor="update-title"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              Title
                            </label>
                            <input
                              type="text"
                              id="update-title"
                              name="title"
                              value={(currentUpdateItem as TableItem)?.title || ""}
                              onChange={(e) =>
                                setCurrentUpdateItem((prev) =>
                                  prev ? { ...prev, title: e.target.value } : null
                                )
                              }
                              className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                              style={{ borderRadius: "12px" }}
                            />
                          </div>
                          {/* Description Input */}
                          <div>
                            <label
                              htmlFor="update-description"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              Description
                            </label>
                            <textarea
                              id="update-description"
                              name="description"
                              rows={3}
                              value={(currentUpdateItem as TableItem)?.description || ""}
                              onChange={(e) =>
                                setCurrentUpdateItem((prev) =>
                                  prev
                                    ? { ...prev, description: e.target.value }
                                    : null
                                )
                              }
                              className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                              style={{ borderRadius: "12px" }}
                            ></textarea>
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
                                value={(currentUpdateItem as TableItem)?.status || "Active"}
                                onChange={(e) =>
                                  setCurrentUpdateItem((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          status: e.target.value as
                                            | "Active"
                                            | "Inactive",
                                        }
                                      : null
                                  )
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
                        </>
                      )}
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Add Feedback Modal */}
      <Transition appear show={isAddModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsAddModalOpen(false)}
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
            <div className="flex min-h-full items-center justify-center p-4 text-left">
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
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md overflow-hidden transform transition-all"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Add Feedback
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600 transition-colors"
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
                          value={newFeedbackData.name}
                          onChange={(e) =>
                            setNewFeedbackData({
                              ...newFeedbackData,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                          style={{ borderRadius: "12px" }}
                        />
                      </div>
                      {/* Role Input */}
                      <div>
                        <label
                          htmlFor="add-role"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Role
                        </label>
                        <input
                          type="text"
                          id="add-role"
                          name="role"
                          value={newFeedbackData.role}
                          onChange={(e) =>
                            setNewFeedbackData({
                              ...newFeedbackData,
                              role: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                          style={{ borderRadius: "12px" }}
                        />
                      </div>
                      {/* Description Input */}
                      <div>
                        <label
                          htmlFor="add-description"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Description
                        </label>
                        <textarea
                          id="add-description"
                          name="description"
                          rows={3}
                          value={newFeedbackData.description}
                          onChange={(e) =>
                            setNewFeedbackData({
                              ...newFeedbackData,
                              description: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                          style={{ borderRadius: "12px" }}
                        ></textarea>
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
                            value={newFeedbackData.status}
                            onChange={(e) =>
                              setNewFeedbackData({
                                ...newFeedbackData,
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
                      onClick={handleAddNewFeedback}
                      style={{ borderRadius: "10px" }}
                    >
                      Add
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Archive Confirmation Modal */}
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
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Archive Success Modal */}
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

export default CustomizationFeedbacks;