import React, { useState, Fragment, useRef } from "react";
import { Archive, Upload, Search } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import Team from "../../preview/Team";

// 1. Define the interfaces for the table items
interface TableItem {
  id: number;
  title: string;
  description: string;
  status: "Active" | "Inactive";
}

interface HomepageTeamItem {
  id: number;
  name: string;
  role: string;
  image: string;
  status: "Active" | "Inactive";
}

// 2. Define your mock data, ensuring it matches the interfaces
const mockTeamDescriptionData: TableItem[] = [
  {
    id: 1,
    title: "MEET OUR TEAM",
    description:
      "The dedicated team of innovators behind COASTELLA, working together to create a safer and smarter coastal communities.",
    status: "Active",
  },
];

const mockHomepageTeamData: HomepageTeamItem[] = [
  {
    id: 1,
    name: "Vincent Davac",
    role: "Leader",
    image: "/images/preview/vince-preview.png",
    status: "Active",
  },
  {
    id: 2,
    name: "Sean Gonzalo",
    role: "Frontend Developer",
    image: "/images/preview/sean-preview.png",
    status: "Active",
  },
  {
    id: 3,
    name: "John Eric Malinao",
    role: "Backend Developer",
    image: "/images/preview/john-preview.png",
    status: "Active",
  },
  {
    id: 4,
    name: "Adrian John De Leon",
    role: "IoT Engineer",
    image: "/images/preview/adrian-preview.png",
    status: "Active",
  },
];

const CustomizationTeam: React.FC = () => {
  const [teamDescriptionData, setTeamDescriptionData] = useState<TableItem[]>(
    mockTeamDescriptionData
  );
  const [homepageTeamData, setHomepageTeamData] = useState<HomepageTeamItem[]>(
    mockHomepageTeamData
  );

  const [teamDescriptionSearchTerm, setTeamDescriptionSearchTerm] = useState("");
  const [homepageTeamSearchTerm, setHomepageTeamSearchTerm] = useState("");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddDescModalOpen, setIsAddDescModalOpen] = useState(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false); // New state for Add Team

  const [currentUpdateItem, setCurrentUpdateItem] = useState<
    TableItem | HomepageTeamItem | null
  >(null);
  const [currentTableType, setCurrentTableType] = useState<string>("");

  const [isConfirmArchiveOpen, setIsConfirmArchiveOpen] = useState(false);
  const [isArchiveSuccessOpen, setIsArchiveSuccessOpen] = useState(false);
  const [itemToArchive, setItemToArchive] = useState<{
    id: number;
    table: "teamDescription" | "homepageTeam";
  } | null>(null);

  // New states for Add Description Modal
  const [newDescriptionData, setNewDescriptionData] = useState<TableItem>({
    id: 0,
    title: "",
    description: "",
    status: "Active",
  });

  // New states for Add Team Modal
  const [newTeamData, setNewTeamData] = useState<HomepageTeamItem>({
    id: 0,
    name: "",
    role: "",
    image: "", // Placeholder for image path
    status: "Active",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pagination states for each table
  const [teamDescriptionCurrentPage, setTeamDescriptionCurrentPage] = useState(1);
  const [homepageTeamCurrentPage, setHomepageTeamCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleOpenUpdateModal = (
    item: TableItem | HomepageTeamItem,
    tableType: string
  ) => {
    setCurrentUpdateItem(item);
    setCurrentTableType(tableType);
    setIsUpdateModalOpen(true);
  };

  const handleSaveUpdate = () => {
    if (currentUpdateItem) {
      if (currentTableType === "teamDescription") {
        setTeamDescriptionData(
          teamDescriptionData.map((item) =>
            item.id === currentUpdateItem.id
              ? (currentUpdateItem as TableItem)
              : item
          )
        );
      } else if (currentTableType === "homepageTeam") {
        setHomepageTeamData(
          homepageTeamData.map((item) =>
            item.id === currentUpdateItem.id
              ? (currentUpdateItem as HomepageTeamItem)
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
    tableType: "teamDescription" | "homepageTeam"
  ) => {
    setItemToArchive({ id, table: tableType });
    setIsConfirmArchiveOpen(true);
  };

  const handleConfirmArchive = () => {
    if (itemToArchive) {
      if (itemToArchive.table === "teamDescription") {
        const newTeamDescriptionData = teamDescriptionData.filter(
          (item) => item.id !== itemToArchive.id
        );
        setTeamDescriptionData(newTeamDescriptionData);
        if (
          newTeamDescriptionData.length <=
            (teamDescriptionCurrentPage - 1) * itemsPerPage &&
          teamDescriptionCurrentPage > 1
        ) {
          setTeamDescriptionCurrentPage(teamDescriptionCurrentPage - 1);
        }
      } else {
        const newHomepageTeamData = homepageTeamData.filter(
          (item) => item.id !== itemToArchive.id
        );
        setHomepageTeamData(newHomepageTeamData);
        if (
          newHomepageTeamData.length <=
            (homepageTeamCurrentPage - 1) * itemsPerPage &&
          homepageTeamCurrentPage > 1
        ) {
          setHomepageTeamCurrentPage(homepageTeamCurrentPage - 1);
        }
      }
      setIsConfirmArchiveOpen(false);
      setItemToArchive(null);
      setIsArchiveSuccessOpen(true);
    }
  };

  // Handlers for Add Description Modal
  const handleAddDescModalOpen = () => {
    setNewDescriptionData({
      id: 0,
      title: "",
      description: "",
      status: "Active",
    });
    setIsAddDescModalOpen(true);
  };

  const handleAddNewDescription = () => {
    const newId =
      teamDescriptionData.length > 0
        ? Math.max(...teamDescriptionData.map((item) => item.id)) + 1
        : 1;
    const newItem = { ...newDescriptionData, id: newId };
    setTeamDescriptionData([...teamDescriptionData, newItem]);
    setIsAddDescModalOpen(false);
  };

  // Handlers for Add Team Modal
  const handleAddTeamModalOpen = () => {
    setNewTeamData({
      id: 0,
      name: "",
      role: "",
      image: "",
      status: "Active",
    });
    setIsAddTeamModalOpen(true);
  };

  const handleAddNewTeam = () => {
    const newId =
      homepageTeamData.length > 0
        ? Math.max(...homepageTeamData.map((item) => item.id)) + 1
        : 1;
    const newItem = { ...newTeamData, id: newId };
    setHomepageTeamData([...homepageTeamData, newItem]);
    setIsAddTeamModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        // Here, we set the image property to the base64 string or URL
        if (currentUpdateItem) {
          setCurrentUpdateItem((prev) =>
            prev ? { ...prev, image: reader.result as string } : null
          );
        } else if (isAddTeamModalOpen) {
          setNewTeamData((prev) => ({
            ...prev,
            image: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredTeamDescriptionData = teamDescriptionData.filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(teamDescriptionSearchTerm.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(teamDescriptionSearchTerm.toLowerCase())
  );

  const filteredHomepageTeamData = homepageTeamData.filter(
    (item) =>
      item.name.toLowerCase().includes(homepageTeamSearchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(homepageTeamSearchTerm.toLowerCase())
  );

  // Pagination calculations for Team Description table
  const totalTeamDescriptionPages = Math.ceil(
    filteredTeamDescriptionData.length / itemsPerPage
  );
  const lastTeamDescriptionItemIndex = teamDescriptionCurrentPage * itemsPerPage;
  const firstTeamDescriptionItemIndex =
    lastTeamDescriptionItemIndex - itemsPerPage;
  const paginatedTeamDescriptionData = filteredTeamDescriptionData.slice(
    firstTeamDescriptionItemIndex,
    lastTeamDescriptionItemIndex
  );

  // Pagination calculations for Homepage Team table
  const totalHomepageTeamPpages = Math.ceil(
    filteredHomepageTeamData.length / itemsPerPage
  );
  const lastHomepageTeamItemIndex = homepageTeamCurrentPage * itemsPerPage;
  const firstHomepageTeamItemIndex = lastHomepageTeamItemIndex - itemsPerPage;
  const paginatedHomepageTeamData = filteredHomepageTeamData.slice(
    firstHomepageTeamItemIndex,
    lastHomepageTeamItemIndex
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      {/* Preview Image Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
          Homepage Team Preview
        </h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-2 mb-6">
        <div className="flex justify-center w-full">
          {/* Team component is assumed to be the preview */}
          <div className="w-full max-w-7xl">
            {/* Note: In a real app, you would pass the current description/team members as props to <Team /> */}
            <Team />
          </div>
        </div>
      </div>

      {/* Team Description Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
              Team Description Table
            </h1>
          </div>
        </div>

        {/* Search and Add Description Button Controls - UPDATED LAYOUT */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search bar is on the left */}
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search title or description"
              value={teamDescriptionSearchTerm}
              onChange={(e) => setTeamDescriptionSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Add Description button is on the right */}
          <div className="flex-shrink-0">
            <button
              onClick={handleAddDescModalOpen}
              className="bg-[#453EFE] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              + Add Description
            </button>
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
              {paginatedTeamDescriptionData.map((item) => (
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
                          handleOpenUpdateModal(item, "teamDescription")
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
                        onClick={() => handleArchive(item.id, "teamDescription")}
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
              Showing {firstTeamDescriptionItemIndex + 1} to{" "}
              {Math.min(
                lastTeamDescriptionItemIndex,
                filteredTeamDescriptionData.length
              )}{" "}
              of {filteredTeamDescriptionData.length} Entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setTeamDescriptionCurrentPage(teamDescriptionCurrentPage - 1)
                }
                disabled={teamDescriptionCurrentPage === 1}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from(
                { length: totalTeamDescriptionPages },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setTeamDescriptionCurrentPage(index + 1)}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      teamDescriptionCurrentPage === index + 1
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
                  setTeamDescriptionCurrentPage(teamDescriptionCurrentPage + 1)
                }
                disabled={teamDescriptionCurrentPage === totalTeamDescriptionPages}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Homepage Team Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
              Homepage Team Table
            </h1>
          </div>
        </div>
        {/* Search and Add Button Controls - UPDATED LAYOUT */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search bar is now on the left */}
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search name or role"
              value={homepageTeamSearchTerm}
              onChange={(e) => setHomepageTeamSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Add Team button is now on the right */}
          <div className="flex-shrink-0">
            <button
              onClick={handleAddTeamModalOpen}
              className="bg-[#453EFE] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              + Add Team Member
            </button>
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
              {paginatedHomepageTeamData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {item.role}
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
                          handleOpenUpdateModal(item, "homepageTeam")
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
                        onClick={() => handleArchive(item.id, "homepageTeam")}
                        className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition"
                      >
                        <Archive className="w-5 h-5" />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                        Archive
                      </span
>
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
              Showing {firstHomepageTeamItemIndex + 1} to{" "}
              {Math.min(
                lastHomepageTeamItemIndex,
                filteredHomepageTeamData.length
              )}{" "}
              of {filteredHomepageTeamData.length} Entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setHomepageTeamCurrentPage(homepageTeamCurrentPage - 1)
                }
                disabled={homepageTeamCurrentPage === 1}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalHomepageTeamPpages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setHomepageTeamCurrentPage(index + 1)}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    homepageTeamCurrentPage === index + 1
                      ? "bg-[#453EFE] text-white"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setHomepageTeamCurrentPage(homepageTeamCurrentPage + 1)
                }
                disabled={homepageTeamCurrentPage === totalHomepageTeamPpages}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal (Shared for both tables) */}
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
                      {currentTableType === "homepageTeam"
                        ? "UPDATE TEAM MEMBER"
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
                      {currentTableType === "homepageTeam" ? (
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
                              value={(currentUpdateItem as HomepageTeamItem)?.name || ""}
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
                              value={(currentUpdateItem as HomepageTeamItem)?.role || ""}
                              onChange={(e) =>
                                setCurrentUpdateItem((prev) =>
                                  prev ? { ...prev, role: e.target.value } : null
                                )
                              }
                              className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                              style={{ borderRadius: "12px" }}
                            />
                          </div>
                          {/* Image Input */}
                          <div>
                            <label
                              htmlFor="update-image"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              Image URL / Upload Image
                            </label>
                            <input
                              type="text"
                              id="update-image-url"
                              name="image-url"
                              placeholder="Enter Image URL"
                              value={(currentUpdateItem as HomepageTeamItem)?.image || ""}
                              onChange={(e) =>
                                setCurrentUpdateItem((prev) =>
                                  prev ? { ...prev, image: e.target.value } : null
                                )
                              }
                              className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent mb-2 dark:bg-gray-700 dark:text-white"
                              style={{ borderRadius: "12px" }}
                            />
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                              >
                                Browse Local File
                              </button>
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                              />
                            </div>
                            {(currentUpdateItem as HomepageTeamItem)?.image && (
                              <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Current Image Preview:
                                </p>
                                <img
                                  src={(currentUpdateItem as HomepageTeamItem)?.image}
                                  alt="Current Member"
                                  className="h-20 w-20 object-cover rounded-full"
                                />
                              </div>
                            )}
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
                        </>
                      )}

                      {/* Status Dropdown (Applicable to both) */}
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
                            value={
                              (
                                currentUpdateItem as TableItem | HomepageTeamItem
                              )?.status || "Active"
                            }
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

      {/* Add Description Modal */}
      <Transition appear show={isAddDescModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsAddDescModalOpen(false)}
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
                      Add Description
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={() => setIsAddDescModalOpen(false)}
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
                          value={newDescriptionData.title}
                          onChange={(e) =>
                            setNewDescriptionData({
                              ...newDescriptionData,
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
                          value={newDescriptionData.description}
                          onChange={(e) =>
                            setNewDescriptionData({
                              ...newDescriptionData,
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
                            value={newDescriptionData.status}
                            onChange={(e) =>
                              setNewDescriptionData({
                                ...newDescriptionData,
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
                      onClick={handleAddNewDescription}
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

      {/* Add Team Member Modal */}
      <Transition appear show={isAddTeamModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsAddTeamModalOpen(false)}
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
                      Add Team Member
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={() => setIsAddTeamModalOpen(false)}
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
                          value={newTeamData.name}
                          onChange={(e) =>
                            setNewTeamData({ ...newTeamData, name: e.target.value })
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
                          value={newTeamData.role}
                          onChange={(e) =>
                            setNewTeamData({ ...newTeamData, role: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                          style={{ borderRadius: "12px" }}
                        />
                      </div>
                      {/* Image Input */}
                      <div>
                        <label
                          htmlFor="add-image"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Image URL / Upload Image
                        </label>
                        <input
                          type="text"
                          id="add-image-url"
                          name="image-url"
                          placeholder="Enter Image URL"
                          value={newTeamData.image}
                          onChange={(e) =>
                            setNewTeamData({ ...newTeamData, image: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent mb-2 dark:bg-gray-700 dark:text-white"
                          style={{ borderRadius: "12px" }}
                        />
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                          >
                            Browse Local File
                          </button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                          />
                        </div>
                        {newTeamData.image && (
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Current Image Preview:
                            </p>
                            <img
                              src={newTeamData.image}
                              alt="New Member"
                              className="h-20 w-20 object-cover rounded-full"
                            />
                          </div>
                        )}
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
                            value={newTeamData.status}
                            onChange={(e) =>
                              setNewTeamData({
                                ...newTeamData,
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
                      onClick={handleAddNewTeam}
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

      {/* Archive Confirmation Modal and Success Modal (The rest of the modals are omitted for brevity but should be included in your file) */}
      {/* ... (Existing Archive Confirmation Modal and Success Modal should be here) */}

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
                  className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all"
                  style={{ borderRadius: "15px" }}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Confirm Archive
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Are you sure you want to archive this item? This action
                      cannot be undone.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => setIsConfirmArchiveOpen(false)}
                      style={{ borderRadius: "10px" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handleConfirmArchive}
                      style={{ borderRadius: "10px" }}
                    >
                      Archive
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
                  className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all"
                  style={{ borderRadius: "15px" }}
                >
                  <button
                    type="button"
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
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

export default CustomizationTeam;