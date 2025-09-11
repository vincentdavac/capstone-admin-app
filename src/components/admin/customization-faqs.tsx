import React, { useState, Fragment} from "react";
import { Archive, Upload, Search } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import FAQ from "../../preview/FAQs";

// 1. Define the interface for the table items
interface TableItem {
  id: number;
  title: string;
  description: string;
  status: "Active" | "Inactive";
}

interface HomepageFAQItem {
  id: number;
  question: string;
  description: string;
  status: "Active" | "Inactive";
}

const mockFAQDescriptionData: TableItem[] = [
  {
    id: 1,
    title: "FREQUENTLY ASK QUESTIONS",
    description:
      "Coastal Operations Monitoring and Alert System through Solar-Powered Tracking of Environmental Conditions, Levels of water, Location, and Analytics",
    status: "Active",
  },
];

const mockHomepageFAQsData: HomepageFAQItem[] = [
  {
    id: 1,
    question: "What is COASTELLA and how does it work?",
    description:
      "Coastal Operations Monitoring and Alert System through Solar-Powered Tracking of Environmental Conditions, Levels of water, Location, and Analytics",
    status: "Active",
  },
  {
    id: 2,
    question: "What is COASTELLA and how does it work?",
    description:
      "Coastal Operations Monitoring and Alert System through Solar-Powered Tracking of Environmental Conditions, Levels of water, Location, and Analytics",
    status: "Active",
  },
  {
    id: 3,
    question: "What is COASTELLA and how does it work?",
    description:
      "Coastal Operations Monitoring and Alert System through Solar-Powered Tracking of Environmental Conditions, Levels of water, Location, and Analytics",
    status: "Active",
  },
];

const CustomizationFaqs: React.FC = () => {
  const [faqDescriptionData, setFaqDescriptionData] = useState<TableItem[]>(
    mockFAQDescriptionData
  );
  const [homepageFAQsData, setHomepageFAQsData] = useState<HomepageFAQItem[]>(
    mockHomepageFAQsData
  );

  const [faqDescriptionSearchTerm, setFaqDescriptionSearchTerm] = useState("");
  const [homepageFAQsSearchTerm, setHomepageFAQsSearchTerm] = useState("");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentUpdateItem, setCurrentUpdateItem] = useState<
    TableItem | HomepageFAQItem | null
  >(null);
  const [currentTableType, setCurrentTableType] = useState<string>("");

  const [isConfirmArchiveOpen, setIsConfirmArchiveOpen] = useState(false);
  const [isArchiveSuccessOpen, setIsArchiveSuccessOpen] = useState(false);
  const [itemToArchive, setItemToArchive] = useState<{
    id: number;
    table: "faqDescription" | "homepageFAQs";
  } | null>(null);

  // New states for Add Modal
  const [newFAQData, setNewFAQData] = useState<HomepageFAQItem>({
    id: 0,
    question: "",
    description: "",
    status: "Active",
  });

  // Pagination states for each table
  const [faqDescriptionCurrentPage, setFaqDescriptionCurrentPage] = useState(1);
  const [homepageFAQsCurrentPage, setHomepageFAQsCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleOpenUpdateModal = (
    item: TableItem | HomepageFAQItem,
    tableType: string
  ) => {
    setCurrentUpdateItem(item);
    setCurrentTableType(tableType);
    setIsUpdateModalOpen(true);
  };

  const handleSaveUpdate = () => {
    if (currentUpdateItem) {
      if (currentTableType === "faqDescription") {
        setFaqDescriptionData(
          faqDescriptionData.map((item) =>
            item.id === currentUpdateItem.id ? currentUpdateItem : item
          ) as TableItem[]
        );
      } else if (currentTableType === "homepageFAQs") {
        setHomepageFAQsData(
          homepageFAQsData.map((item) =>
            item.id === currentUpdateItem.id
              ? (currentUpdateItem as HomepageFAQItem)
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
    tableType: "faqDescription" | "homepageFAQs"
  ) => {
    setItemToArchive({ id, table: tableType });
    setIsConfirmArchiveOpen(true);
  };

  const handleConfirmArchive = () => {
    if (itemToArchive) {
      if (itemToArchive.table === "faqDescription") {
        const newFaqDescriptionData = faqDescriptionData.filter(
          (item) => item.id !== itemToArchive.id
        );
        setFaqDescriptionData(newFaqDescriptionData);
        if (
          newFaqDescriptionData.length <=
            (faqDescriptionCurrentPage - 1) * itemsPerPage &&
          faqDescriptionCurrentPage > 1
        ) {
          setFaqDescriptionCurrentPage(faqDescriptionCurrentPage - 1);
        }
      } else {
        const newHomepageFAQsData = homepageFAQsData.filter(
          (item) => item.id !== itemToArchive.id
        );
        setHomepageFAQsData(newHomepageFAQsData);
        if (
          newHomepageFAQsData.length <=
            (homepageFAQsCurrentPage - 1) * itemsPerPage &&
          homepageFAQsCurrentPage > 1
        ) {
          setHomepageFAQsCurrentPage(homepageFAQsCurrentPage - 1);
        }
      }
      setIsConfirmArchiveOpen(false);
      setItemToArchive(null);
      setIsArchiveSuccessOpen(true);
    }
  };

  const handleAddModalOpen = () => {
    setNewFAQData({
      id: 0,
      question: "",
      description: "",
      status: "Active",
    });
    setIsAddModalOpen(true);
  };

  const handleAddNewFAQ = () => {
    const newId =
      homepageFAQsData.length > 0
        ? Math.max(...homepageFAQsData.map((item) => item.id)) + 1
        : 1;
    const newItem = { ...newFAQData, id: newId };
    setHomepageFAQsData([...homepageFAQsData, newItem]);
    setIsAddModalOpen(false);
  };

  const filteredFaqDescriptionData = faqDescriptionData.filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(faqDescriptionSearchTerm.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(faqDescriptionSearchTerm.toLowerCase())
  );

  const filteredHomepageFAQsData = homepageFAQsData.filter(
    (item) =>
      item.question
        .toLowerCase()
        .includes(homepageFAQsSearchTerm.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(homepageFAQsSearchTerm.toLowerCase())
  );

  const totalFaqDescriptionPages = Math.ceil(
    filteredFaqDescriptionData.length / itemsPerPage
  );
  const lastFaqDescriptionItemIndex =
    faqDescriptionCurrentPage * itemsPerPage;
  const firstFaqDescriptionItemIndex =
    lastFaqDescriptionItemIndex - itemsPerPage;
  const paginatedFaqDescriptionData = filteredFaqDescriptionData.slice(
    firstFaqDescriptionItemIndex,
    lastFaqDescriptionItemIndex
  );

  const totalHomepageFAQsPages = Math.ceil(
    filteredHomepageFAQsData.length / itemsPerPage
  );
  const lastHomepageFAQsItemIndex = homepageFAQsCurrentPage * itemsPerPage;
  const firstHomepageFAQsItemIndex = lastHomepageFAQsItemIndex - itemsPerPage;
  const paginatedHomepageFAQsData = filteredHomepageFAQsData.slice(
    firstHomepageFAQsItemIndex,
    lastHomepageFAQsItemIndex
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      {/* Preview Image Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
          Homepage FAQs Preview
        </h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="flex justify-center w-full">
          {/* I-wrap ang Slider component at bigyan ng fixed size */}
          <div className="w-full max-w-8xl">
            <FAQ />
          </div>
        </div>
      </div>


      {/* FAQ Description Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
              FAQs Description Table
            </h1>
          </div>
        </div>
        {/* Search */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search name or email"
              value={faqDescriptionSearchTerm}
              onChange={(e) => setFaqDescriptionSearchTerm(e.target.value)}
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
              {paginatedFaqDescriptionData.map((item) => (
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
                          handleOpenUpdateModal(item, "faqDescription")
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
                          handleArchive(item.id, "faqDescription")
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
              Showing {firstFaqDescriptionItemIndex + 1} to{" "}
              {Math.min(
                lastFaqDescriptionItemIndex,
                filteredFaqDescriptionData.length
              )}{" "}
              of {filteredFaqDescriptionData.length} Entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setFaqDescriptionCurrentPage(faqDescriptionCurrentPage - 1)
                }
                disabled={faqDescriptionCurrentPage === 1}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from(
                { length: totalFaqDescriptionPages },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setFaqDescriptionCurrentPage(index + 1)}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      faqDescriptionCurrentPage === index + 1
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
                  setFaqDescriptionCurrentPage(faqDescriptionCurrentPage + 1)
                }
                disabled={faqDescriptionCurrentPage === totalFaqDescriptionPages}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Homepage FAQs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
              Homepage FAQs Table
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
              + Add Question
            </button>
          </div>

          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search name or email"
              value={homepageFAQsSearchTerm}
              onChange={(e) => setHomepageFAQsSearchTerm(e.target.value)}
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
                  Question
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
              {paginatedHomepageFAQsData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                    {item.question}
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
                          handleOpenUpdateModal(item, "homepageFAQs")
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
                          handleArchive(item.id, "homepageFAQs")
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
              Showing {firstHomepageFAQsItemIndex + 1} to{" "}
              {Math.min(
                lastHomepageFAQsItemIndex,
                filteredHomepageFAQsData.length
              )}{" "}
              of {filteredHomepageFAQsData.length} Entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setHomepageFAQsCurrentPage(homepageFAQsCurrentPage - 1)
                }
                disabled={homepageFAQsCurrentPage === 1}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalHomepageFAQsPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setHomepageFAQsCurrentPage(index + 1)}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    homepageFAQsCurrentPage === index + 1
                      ? "bg-[#453EFE] text-white"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setHomepageFAQsCurrentPage(homepageFAQsCurrentPage + 1)
                }
                disabled={homepageFAQsCurrentPage === totalHomepageFAQsPages}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Description Modal */}
      <Transition appear show={isUpdateModalOpen && currentTableType === 'faqDescription'} as={Fragment}>
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
                      Update Description
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

      {/* Add Question Modal */}
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
                      Add Question
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
                      {/* Question Input */}
                      <div>
                        <label
                          htmlFor="add-question"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Question
                        </label>
                        <input
                          type="text"
                          id="add-question"
                          name="question"
                          value={newFAQData.question}
                          onChange={(e) =>
                            setNewFAQData({
                              ...newFAQData,
                              question: e.target.value,
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
                          value={newFAQData.description}
                          onChange={(e) =>
                            setNewFAQData({
                              ...newFAQData,
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
                            value={newFAQData.status}
                            onChange={(e) =>
                              setNewFAQData({
                                ...newFAQData,
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
                      onClick={handleAddNewFAQ}
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

      {/* Update FAQs Modal */}
      <Transition appear show={isUpdateModalOpen && currentTableType === 'homepageFAQs'} as={Fragment}>
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
                      Update FAQs
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
                      {/* Question Input */}
                      <div>
                        <label
                          htmlFor="update-question"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Question
                        </label>
                        <input
                          type="text"
                          id="update-question"
                          name="question"
                          value={(currentUpdateItem as HomepageFAQItem)?.question || ""}
                          onChange={(e) =>
                            setCurrentUpdateItem((prev) =>
                              prev ? { ...prev, question: e.target.value } : null
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
                          value={(currentUpdateItem as HomepageFAQItem)?.description || ""}
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
                            value={(currentUpdateItem as HomepageFAQItem)?.status || "Active"}
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

export default CustomizationFaqs;