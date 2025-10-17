import React, { useState, Fragment, useRef } from "react";
import { Archive, Upload, Search } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import Prototype from "../../preview/Prototype";

// 1. Define the interface for the table items
interface TableItem {
  id: number;
  title: string;
  description: string;
  status: "Active" | "Inactive";
}

interface HomepagePrototypeItem extends TableItem {
  image: string;
}

// 2. Define your mock data, ensuring it matches the interfaces
const mockPrototypeDescriptionData: TableItem[] = [
  {
    id: 1,
    title: "THE COASTELLA PROTOTYPE",
    description:
      "Coastal Operations Monitoring and Alert System through Solar-Powered Tracking of Environmental Conditions, Levels of water, Location, and Analytics",
    status: "Active",
  },
];

const mockHomepagePrototypeData: HomepagePrototypeItem[] = [
  {
    id: 1,
    title: "Solar Controller",
    description:
      "Coastal Operations Monitoring and Alert System through Solar-Powered Tracking of Environmental Conditions, Levels of water, Location, and Analytics",
    status: "Active",
    image: "/images/preview/prototype-preview.png",
  },
  {
    id: 2,
    title: "Warning Light",
    description:
      "Coastal Operations Monitoring and Alert System through Solar-Powered Tracking of Environmental Conditions, Levels of water, Location, and Analytics",
    status: "Active",
    image: "/images/preview/prototype-preview.png",
  },
  {
    id: 3,
    title: "Rain Sensor",
    description:
      "Coastal Operations Monitoring and Alert System through Solar-Powered Tracking of Environmental Conditions, Levels of water, Location, and Analytics",
    status: "Active",
    image: "/images/preview/prototype-preview.png",
  },
];

const CustomizationPrototype: React.FC = () => {
  const [prototypeDescriptionData, setPrototypeDescriptionData] = useState<
    TableItem[]
  >(mockPrototypeDescriptionData);
  const [homepagePrototypeData, setHomepagePrototypeData] = useState<
    HomepagePrototypeItem[]
  >(mockHomepagePrototypeData);

  const [prototypeDescriptionSearchTerm, setPrototypeDescriptionSearchTerm] =
    useState("");
  const [homepagePrototypeSearchTerm, setHomepagePrototypeSearchTerm] =
    useState("");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentUpdateItem, setCurrentUpdateItem] = useState<
    TableItem | HomepagePrototypeItem | null
  >(null);
  const [currentTableType, setCurrentTableType] = useState<string>("");

  const [isConfirmArchiveOpen, setIsConfirmArchiveOpen] = useState(false);
  const [isArchiveSuccessOpen, setIsArchiveSuccessOpen] = useState(false);
  const [itemToArchive, setItemToArchive] = useState<{
    id: number;
    table: "prototypeDescription" | "homepagePrototype";
  } | null>(null);

  // New states and ref for Add Modal
  const [newPrototypeData, setNewPrototypeData] =
    useState<HomepagePrototypeItem>({
      id: 0,
      title: "",
      description: "",
      status: "Active",
      image: "",
    });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pagination states for each table
  const [prototypeDescriptionCurrentPage, setPrototypeDescriptionCurrentPage] =
    useState(1);
  const [homepagePrototypeCurrentPage, setHomepagePrototypeCurrentPage] =
    useState(1);
  const itemsPerPage = 5;

  const handleOpenUpdateModal = (
    item: TableItem | HomepagePrototypeItem,
    tableType: string
  ) => {
    setCurrentUpdateItem(item);
    setCurrentTableType(tableType);
    setIsUpdateModalOpen(true);
  };

  const handleSaveUpdate = () => {
    if (currentUpdateItem) {
      if (currentTableType === "prototypeDescription") {
        setPrototypeDescriptionData(
          prototypeDescriptionData.map((item) =>
            item.id === currentUpdateItem.id ? currentUpdateItem : item
          ) as TableItem[]
        );
      } else if (currentTableType === "homepagePrototype") {
        setHomepagePrototypeData(
          homepagePrototypeData.map((item) =>
            item.id === currentUpdateItem.id
              ? (currentUpdateItem as HomepagePrototypeItem)
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
    tableType: "prototypeDescription" | "homepagePrototype"
  ) => {
    setItemToArchive({ id, table: tableType });
    setIsConfirmArchiveOpen(true);
  };

  const handleConfirmArchive = () => {
    if (itemToArchive) {
      if (itemToArchive.table === "prototypeDescription") {
        const newPrototypeDescriptionData = prototypeDescriptionData.filter(
          (item) => item.id !== itemToArchive.id
        );
        setPrototypeDescriptionData(newPrototypeDescriptionData);
        if (
          newPrototypeDescriptionData.length <=
            (prototypeDescriptionCurrentPage - 1) * itemsPerPage &&
          prototypeDescriptionCurrentPage > 1
        ) {
          setPrototypeDescriptionCurrentPage(
            prototypeDescriptionCurrentPage - 1
          );
        }
      } else {
        const newHomepagePrototypeData = homepagePrototypeData.filter(
          (item) => item.id !== itemToArchive.id
        );
        setHomepagePrototypeData(newHomepagePrototypeData);
        if (
          newHomepagePrototypeData.length <=
            (homepagePrototypeCurrentPage - 1) * itemsPerPage &&
          homepagePrototypeCurrentPage > 1
        ) {
          setHomepagePrototypeCurrentPage(homepagePrototypeCurrentPage - 1);
        }
      }
      setIsConfirmArchiveOpen(false);
      setItemToArchive(null);
      setIsArchiveSuccessOpen(true);
    }
  };

  const handleAddModalOpen = () => {
    setNewPrototypeData({
      id: 0,
      title: "",
      description: "",
      status: "Active",
      image: "",
    });
    setIsAddModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPrototypeData({
          ...newPrototypeData,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewPrototype = () => {
    const newId =
      homepagePrototypeData.length > 0
        ? Math.max(...homepagePrototypeData.map((item) => item.id)) + 1
        : 1;
    const newItem = { ...newPrototypeData, id: newId };
    setHomepagePrototypeData([...homepagePrototypeData, newItem]);
    setIsAddModalOpen(false);
  };

  const filteredPrototypeDescriptionData = prototypeDescriptionData.filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(prototypeDescriptionSearchTerm.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(prototypeDescriptionSearchTerm.toLowerCase())
  );

  const filteredHomepagePrototypeData = homepagePrototypeData.filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(homepagePrototypeSearchTerm.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(homepagePrototypeSearchTerm.toLowerCase())
  );

  // Pagination calculations for Prototype Description table
  const totalPrototypeDescriptionPages = Math.ceil(
    filteredPrototypeDescriptionData.length / itemsPerPage
  );
  const lastPrototypeDescriptionItemIndex =
    prototypeDescriptionCurrentPage * itemsPerPage;
  const firstPrototypeDescriptionItemIndex =
    lastPrototypeDescriptionItemIndex - itemsPerPage;
  const paginatedPrototypeDescriptionData =
    filteredPrototypeDescriptionData.slice(
      firstPrototypeDescriptionItemIndex,
      lastPrototypeDescriptionItemIndex
    );

  // Pagination calculations for Homepage Prototype table
  const totalHomepagePrototypePages = Math.ceil(
    filteredHomepagePrototypeData.length / itemsPerPage
  );
  const lastHomepagePrototypeItemIndex =
    homepagePrototypeCurrentPage * itemsPerPage;
  const firstHomepagePrototypeItemIndex =
    lastHomepagePrototypeItemIndex - itemsPerPage;
  const paginatedHomepagePrototypeData = filteredHomepagePrototypeData.slice(
    firstHomepagePrototypeItemIndex,
    lastHomepagePrototypeItemIndex
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      {/* Preview Image Section - Just put your image here */}
      <div className="mb-6">
        <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
          Homepage Sliders Preview
        </h1>
      </div>
      {/* Slider Preview Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="flex justify-center w-full">
          {/* I-wrap ang Slider component at bigyan ng fixed size */}
          <div className="w-full max-w-8xl">
            <Prototype />
          </div>
        </div>
      </div>
      {/* Prototype Description Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
              Prototype Description Table
            </h1>
          </div>
        </div>
        {/* Search */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search name or email"
              value={prototypeDescriptionSearchTerm}
              onChange={(e) =>
                setPrototypeDescriptionSearchTerm(e.target.value)
              }
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
              {paginatedPrototypeDescriptionData.map((item) => (
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
                          handleOpenUpdateModal(item, "prototypeDescription")
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
                          handleArchive(item.id, "prototypeDescription")
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
              Showing {firstPrototypeDescriptionItemIndex + 1} to{" "}
              {Math.min(
                lastPrototypeDescriptionItemIndex,
                filteredPrototypeDescriptionData.length
              )}{" "}
              of {filteredPrototypeDescriptionData.length} Entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setPrototypeDescriptionCurrentPage(
                    prototypeDescriptionCurrentPage - 1
                  )
                }
                disabled={prototypeDescriptionCurrentPage === 1}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from(
                { length: totalPrototypeDescriptionPages },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() =>
                      setPrototypeDescriptionCurrentPage(index + 1)
                    }
                    className={`px-3 py-1 text-sm rounded-lg ${
                      prototypeDescriptionCurrentPage === index + 1
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
                  setPrototypeDescriptionCurrentPage(
                    prototypeDescriptionCurrentPage + 1
                  )
                }
                disabled={
                  prototypeDescriptionCurrentPage ===
                  totalPrototypeDescriptionPages
                }
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Homepage Prototype Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
              Homepage Prototype Table
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
              + Add Prototype
            </button>
          </div>

          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search name or email"
              value={homepagePrototypeSearchTerm}
              onChange={(e) => setHomepagePrototypeSearchTerm(e.target.value)}
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
                  Image
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
              {paginatedHomepagePrototypeData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-auto object-cover rounded-lg"
                    />
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
                          handleOpenUpdateModal(item, "homepagePrototype")
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
                          handleArchive(item.id, "homepagePrototype")
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
              Showing {firstHomepagePrototypeItemIndex + 1} to{" "}
              {Math.min(
                lastHomepagePrototypeItemIndex,
                filteredHomepagePrototypeData.length
              )}{" "}
              of {filteredHomepagePrototypeData.length} Entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setHomepagePrototypeCurrentPage(
                    homepagePrototypeCurrentPage - 1
                  )
                }
                disabled={homepagePrototypeCurrentPage === 1}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from(
                { length: totalHomepagePrototypePages },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setHomepagePrototypeCurrentPage(index + 1)}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      homepagePrototypeCurrentPage === index + 1
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
                  setHomepagePrototypeCurrentPage(
                    homepagePrototypeCurrentPage + 1
                  )
                }
                disabled={
                  homepagePrototypeCurrentPage === totalHomepagePrototypePages
                }
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
                      {currentTableType === "homepagePrototype"
                        ? "UPDATE PROTOTYPE"
                        : "UPDATE  DESCRIPTION"}
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
                          value={currentUpdateItem?.title || ""}
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
                          value={currentUpdateItem?.description || ""}
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
                            value={currentUpdateItem?.status || "Active"}
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
                      UPDATE
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md overflow-hidden transform transition-all"
            style={{ borderRadius: "15px" }}
          >
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Prototype
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
                {/* Title Input */}
                <div>
                  <label
                    htmlFor="add-title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="add-title"
                    name="title"
                    value={newPrototypeData.title}
                    onChange={(e) =>
                      setNewPrototypeData({
                        ...newPrototypeData,
                        title: e.target.value,
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
                    value={newPrototypeData.description}
                    onChange={(e) =>
                      setNewPrototypeData({
                        ...newPrototypeData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    style={{ borderRadius: "12px" }}
                  ></textarea>
                </div>

                {/* Image Input */}
                <div>
                  <label
                    htmlFor="add-image"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Image
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="add-image"
                      name="image"
                      value={newPrototypeData.image ? "Image uploaded" : ""}
                      readOnly
                      className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                      style={{
                        borderRadius: "12px",
                        paddingRight: newPrototypeData.image ? "1rem" : "9rem",
                      }}
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    {!newPrototypeData.image && (
                      <button
                        type="button"
                        className="absolute left-1 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs text-white bg-[#453EFE] rounded hover:bg-indigo-700 transition"
                        onClick={() => fileInputRef.current?.click()}
                        style={{ borderRadius: "10px" }}
                      >
                        Upload a file
                      </button>
                    )}
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
                      value={newPrototypeData.status}
                      onChange={(e) =>
                        setNewPrototypeData({
                          ...newPrototypeData,
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
                onClick={handleAddNewPrototype}
                style={{ borderRadius: "10px" }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

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

export default CustomizationPrototype;
