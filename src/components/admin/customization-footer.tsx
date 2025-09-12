/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, Fragment } from "react";
import { Archive, Upload, Search } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import Footer from "../../preview/Footer";

// 1. Define the interfaces for the table items
interface TableItem {
  id: number;
  title: string;
  linkUrl: string;
  status: "Active" | "Inactive";
}

interface BrandDescriptionItem {
  id: number;
  title: string;
  description: string;
  status: "Active" | "Inactive";
}

interface ResourcesItem extends TableItem {
  linkUrl: string;
}

interface ContactItem {
  id: number;
  email: string;
  linkUrl: string;
  copyright: string;
  status: "Active" | "Inactive";
}

// 2. Define your mock data, ensuring it matches the interfaces
const mockBrandDescriptionData: BrandDescriptionItem[] = [
  {
    id: 1,
    title: "THE COASTELLA PROTOTYPE",
    description:
      "Coastal Operations Monitoring and Alert System through Solar-Powered Tracking of Environmental Conditions, Levels of water, Location, and Analytics",
    status: "Active",
  },
];

const mockQuickLinksData: TableItem[] = [
  { id: 1, title: "Home", linkUrl: "Home", status: "Active" },
  { id: 2, title: "About COASTELLA", linkUrl: "About COASTELLA", status: "Active" },
  { id: 3, title: "Meet the Team", linkUrl: "Meet the Team", status: "Active" },
  { id: 4, title: "Prototype", linkUrl: "Prototype", status: "Active" },
  { id: 5, title: "FAQs", linkUrl: "FAQs", status: "Active" },
];

const mockResourcesData: ResourcesItem[] = [
  { id: 1, title: "Project Documentation", linkUrl: "Project Documentation", status: "Active" },
  { id: 2, title: "Research Paper", linkUrl: "Research Paper", status: "Active" },
  { id: 3, title: "Contact Form", linkUrl: "Contact Form", status: "Active" },
  { id: 4, title: "Privacy Policy", linkUrl: "Privacy Policy", status: "Active" },
];

const mockContactData: ContactItem[] = [
  {
    id: 1,
    email: "coastella.project@gmail.com",
    linkUrl: "fb.com/coastella-project",
    copyright: "© 2025 COASTELLA Project Team. All Rights Reserved.",
    status: "Active",
  },
];

const CustomizationFooter: React.FC = () => {
  const [brandDescriptionData, setBrandDescriptionData] = useState<BrandDescriptionItem[]>(mockBrandDescriptionData);
  const [quickLinksData, setQuickLinksData] = useState<TableItem[]>(mockQuickLinksData);
  const [resourcesData, setResourcesData] = useState<ResourcesItem[]>(mockResourcesData);
  const [contactData, setContactData] = useState<ContactItem[]>(mockContactData);

  const [brandDescriptionSearchTerm, setBrandDescriptionSearchTerm] = useState("");
  const [quickLinksSearchTerm, setQuickLinksSearchTerm] = useState("");
  const [resourcesSearchTerm, setResourcesSearchTerm] = useState("");
  const [contactSearchTerm, setContactSearchTerm] = useState("");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentUpdateItem, setCurrentUpdateItem] = useState<any | null>(null);
  const [currentTableType, setCurrentTableType] = useState<string>("");

  const [isConfirmArchiveOpen, setIsConfirmArchiveOpen] = useState(false);
  const [isArchiveSuccessOpen, setIsArchiveSuccessOpen] = useState(false);
  const [itemToArchive, setItemToArchive] = useState<{
    id: number;
    table: "brandDescription" | "quickLinks" | "resources" | "contact";
  } | null>(null);

  // Pagination states for each table
  const [brandDescriptionCurrentPage, setBrandDescriptionCurrentPage] = useState(1);
  const [quickLinksCurrentPage, setQuickLinksCurrentPage] = useState(1);
  const [resourcesCurrentPage, setResourcesCurrentPage] = useState(1);
  const [contactCurrentPage, setContactCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleOpenUpdateModal = (item: unknown, tableType: string) => {
    setCurrentUpdateItem(item);
    setCurrentTableType(tableType);
    setIsUpdateModalOpen(true);
  };

  const handleSaveUpdate = () => {
    if (currentUpdateItem) {
      if (currentTableType === "brandDescription") {
        setBrandDescriptionData(
          brandDescriptionData.map((item) =>
            item.id === currentUpdateItem.id ? currentUpdateItem : item
          )
        );
      } else if (currentTableType === "quickLinks") {
        setQuickLinksData(
          quickLinksData.map((item) =>
            item.id === currentUpdateItem.id ? currentUpdateItem : item
          )
        );
      } else if (currentTableType === "resources") {
        setResourcesData(
          resourcesData.map((item) =>
            item.id === currentUpdateItem.id ? currentUpdateItem : item
          )
        );
      } else if (currentTableType === "contact") {
        setContactData(
          contactData.map((item) =>
            item.id === currentUpdateItem.id ? currentUpdateItem : item
          )
        );
      }
    }
    setIsUpdateModalOpen(false);
    setCurrentUpdateItem(null);
  };

  const handleArchive = (id: number, tableType: "brandDescription" | "quickLinks" | "resources" | "contact") => {
    setItemToArchive({ id, table: tableType });
    setIsConfirmArchiveOpen(true);
  };

  const handleConfirmArchive = () => {
    if (itemToArchive) {
      if (itemToArchive.table === "brandDescription") {
        setBrandDescriptionData(brandDescriptionData.filter((item) => item.id !== itemToArchive.id));
      } else if (itemToArchive.table === "quickLinks") {
        setQuickLinksData(quickLinksData.filter((item) => item.id !== itemToArchive.id));
      } else if (itemToArchive.table === "resources") {
        setResourcesData(resourcesData.filter((item) => item.id !== itemToArchive.id));
      } else if (itemToArchive.table === "contact") {
        setContactData(contactData.filter((item) => item.id !== itemToArchive.id));
      }
      setIsConfirmArchiveOpen(false);
      setItemToArchive(null);
      setIsArchiveSuccessOpen(true);
    }
  };

  const filteredBrandDescriptionData = brandDescriptionData.filter(
    (item) =>
      item.title.toLowerCase().includes(brandDescriptionSearchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(brandDescriptionSearchTerm.toLowerCase())
  );

  const filteredQuickLinksData = quickLinksData.filter(
    (item) =>
      item.title.toLowerCase().includes(quickLinksSearchTerm.toLowerCase()) ||
      item.linkUrl.toLowerCase().includes(quickLinksSearchTerm.toLowerCase())
  );

  const filteredResourcesData = resourcesData.filter(
    (item) =>
      item.title.toLowerCase().includes(resourcesSearchTerm.toLowerCase()) ||
      item.linkUrl.toLowerCase().includes(resourcesSearchTerm.toLowerCase())
  );

  const filteredContactData = contactData.filter(
    (item) =>
      item.email.toLowerCase().includes(contactSearchTerm.toLowerCase()) ||
      item.linkUrl.toLowerCase().includes(contactSearchTerm.toLowerCase())
  );

  // Pagination calculations for each table
  const totalBrandDescriptionPages = Math.ceil(filteredBrandDescriptionData.length / itemsPerPage);
  const lastBrandDescriptionItemIndex = brandDescriptionCurrentPage * itemsPerPage;
  const firstBrandDescriptionItemIndex = lastBrandDescriptionItemIndex - itemsPerPage;
  const paginatedBrandDescriptionData = filteredBrandDescriptionData.slice(
    firstBrandDescriptionItemIndex,
    lastBrandDescriptionItemIndex
  );

  const totalQuickLinksPages = Math.ceil(filteredQuickLinksData.length / itemsPerPage);
  const lastQuickLinksItemIndex = quickLinksCurrentPage * itemsPerPage;
  const firstQuickLinksItemIndex = lastQuickLinksItemIndex - itemsPerPage;
  const paginatedQuickLinksData = filteredQuickLinksData.slice(
    firstQuickLinksItemIndex,
    lastQuickLinksItemIndex
  );

  const totalResourcesPages = Math.ceil(filteredResourcesData.length / itemsPerPage);
  const lastResourcesItemIndex = resourcesCurrentPage * itemsPerPage;
  const firstResourcesItemIndex = lastResourcesItemIndex - itemsPerPage;
  const paginatedResourcesData = filteredResourcesData.slice(
    firstResourcesItemIndex,
    lastResourcesItemIndex
  );

  const totalContactPages = Math.ceil(filteredContactData.length / itemsPerPage);
  const lastContactItemIndex = contactCurrentPage * itemsPerPage;
  const firstContactItemIndex = lastContactItemIndex - itemsPerPage;
  const paginatedContactData = filteredContactData.slice(
    firstContactItemIndex,
    lastContactItemIndex
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      {/* Footer Preview Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
          Homepage Footers Preview
        </h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-2 mb-6">
        <div className="flex justify-center w-full">
          {/* I-wrap ang Slider component at bigyan ng fixed size */}
          <div className="w-full max-w-10xl">
            <Footer />
          </div>
        </div>
      </div>
      {/* Brand Description Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
            Brand Description Footers Table
          </h1>
        </div>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search name or description"
              value={brandDescriptionSearchTerm}
              onChange={(e) => setBrandDescriptionSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Record ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedBrandDescriptionData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 min-w-[200px] whitespace-normal">{item.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-5 py-1 inline-flex text-small font-normal rounded-full ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="relative group">
                      <button onClick={() => handleOpenUpdateModal(item, "brandDescription")} className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                        <Upload className="w-5 h-5" />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">UPDATE</span>
                    </div>
                    <div className="relative group">
                      <button onClick={() => handleArchive(item.id, "brandDescription")} className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                        <Archive className="w-5 h-5" />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">Archive</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {firstBrandDescriptionItemIndex + 1} to{" "}
              {Math.min(lastBrandDescriptionItemIndex, filteredBrandDescriptionData.length)}{" "}
              of {filteredBrandDescriptionData.length} Entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setBrandDescriptionCurrentPage(brandDescriptionCurrentPage - 1)}
                disabled={brandDescriptionCurrentPage === 1}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >Previous</button>
              {Array.from({ length: totalBrandDescriptionPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setBrandDescriptionCurrentPage(index + 1)}
                  className={`px-3 py-1 text-sm rounded-lg ${brandDescriptionCurrentPage === index + 1 ? "bg-[#453EFE] text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
                >{index + 1}</button>
              ))}
              <button
                onClick={() => setBrandDescriptionCurrentPage(brandDescriptionCurrentPage + 1)}
                disabled={brandDescriptionCurrentPage === totalBrandDescriptionPages}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >Next</button>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Links Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
            Quick Links Footers Table
          </h1>
        </div>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search name or email"
              value={quickLinksSearchTerm}
              onChange={(e) => setQuickLinksSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Record ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Link URL</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedQuickLinksData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 min-w-[200px] whitespace-normal">{item.linkUrl}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-5 py-1 inline-flex text-small font-normal rounded-full ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="relative group">
                      <button onClick={() => handleOpenUpdateModal(item, "quickLinks")} className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                        <Upload className="w-5 h-5" />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">UPDATE</span>
                    </div>
                    <div className="relative group">
                      <button onClick={() => handleArchive(item.id, "quickLinks")} className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                        <Archive className="w-5 h-5" />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">Archive</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {firstQuickLinksItemIndex + 1} to{" "}
              {Math.min(lastQuickLinksItemIndex, filteredQuickLinksData.length)}{" "}
              of {filteredQuickLinksData.length} Entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setQuickLinksCurrentPage(quickLinksCurrentPage - 1)}
                disabled={quickLinksCurrentPage === 1}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >Previous</button>
              {Array.from({ length: totalQuickLinksPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setQuickLinksCurrentPage(index + 1)}
                  className={`px-3 py-1 text-sm rounded-lg ${quickLinksCurrentPage === index + 1 ? "bg-[#453EFE] text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
                >{index + 1}</button>
              ))}
              <button
                onClick={() => setQuickLinksCurrentPage(quickLinksCurrentPage + 1)}
                disabled={quickLinksCurrentPage === totalQuickLinksPages}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >Next</button>
            </div>
          </div>
        </div>
      </div>
      {/* Resources Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
            Resources Footers Table
          </h1>
        </div>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search name or email"
              value={resourcesSearchTerm}
              onChange={(e) => setResourcesSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Record ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Link URL</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedResourcesData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 min-w-[200px] whitespace-normal">{item.linkUrl}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-5 py-1 inline-flex text-small font-normal rounded-full ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="relative group">
                      <button onClick={() => handleOpenUpdateModal(item, "resources")} className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                        <Upload className="w-5 h-5" />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">UPDATE</span>
                    </div>
                    <div className="relative group">
                      <button onClick={() => handleArchive(item.id, "resources")} className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                        <Archive className="w-5 h-5" />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">Archive</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {firstResourcesItemIndex + 1} to{" "}
              {Math.min(lastResourcesItemIndex, filteredResourcesData.length)}{" "}
              of {filteredResourcesData.length} Entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setResourcesCurrentPage(resourcesCurrentPage - 1)}
                disabled={resourcesCurrentPage === 1}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >Previous</button>
              {Array.from({ length: totalResourcesPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setResourcesCurrentPage(index + 1)}
                  className={`px-3 py-1 text-sm rounded-lg ${resourcesCurrentPage === index + 1 ? "bg-[#453EFE] text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
                >{index + 1}</button>
              ))}
              <button
                onClick={() => setResourcesCurrentPage(resourcesCurrentPage + 1)}
                disabled={resourcesCurrentPage === totalResourcesPages}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >Next</button>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Information Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
            Contact Information Footers Table
          </h1>
        </div>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search name or email"
              value={contactSearchTerm}
              onChange={(e) => setContactSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Record ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Link URL</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Copyright</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedContactData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 min-w-[200px] whitespace-normal">{item.linkUrl}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 min-w-[200px] whitespace-normal">{item.copyright}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-5 py-1 inline-flex text-small font-normal rounded-full ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="relative group">
                      <button onClick={() => handleOpenUpdateModal(item, "contact")} className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                        <Upload className="w-5 h-5" />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">UPDATE</span>
                    </div>
                    <div className="relative group">
                      <button onClick={() => handleArchive(item.id, "contact")} className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                        <Archive className="w-5 h-5" />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">Archive</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {firstContactItemIndex + 1} to{" "}
              {Math.min(lastContactItemIndex, filteredContactData.length)}{" "}
              of {filteredContactData.length} Entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setContactCurrentPage(contactCurrentPage - 1)}
                disabled={contactCurrentPage === 1}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >Previous</button>
              {Array.from({ length: totalContactPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setContactCurrentPage(index + 1)}
                  className={`px-3 py-1 text-sm rounded-lg ${contactCurrentPage === index + 1 ? "bg-[#453EFE] text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
                >{index + 1}</button>
              ))}
              <button
                onClick={() => setContactCurrentPage(contactCurrentPage + 1)}
                disabled={contactCurrentPage === totalContactPages}
                className="px-3 py-1 text-sm rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <Transition appear show={isUpdateModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsUpdateModalOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-left">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md overflow-hidden transform transition-all" style={{ borderRadius: "15px" }}>
                  <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      UPDATE {currentTableType.toUpperCase().replace(/S$/, '')}
                    </h3>
                    <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setIsUpdateModalOpen(false)}>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {currentTableType === "brandDescription" && (
                        <>
                          <div>
                            <label htmlFor="update-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                            <input type="text" id="update-title" name="title" value={currentUpdateItem?.title || ""} onChange={(e) => setCurrentUpdateItem((prev: any) => prev ? { ...prev, title: e.target.value } : null)} className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white" style={{ borderRadius: "12px" }} />
                          </div>
                          <div>
                            <label htmlFor="update-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                            <textarea id="update-description" name="description" value={currentUpdateItem?.description || ""} onChange={(e) => setCurrentUpdateItem((prev: any) => prev ? { ...prev, description: e.target.value } : null)} className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white" style={{ borderRadius: "12px" }} rows={3} />
                          </div>
                          <div>
                            <label htmlFor="update-status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                            <div className="relative">
                              <select id="update-status" name="status" value={currentUpdateItem?.status || "Active"} onChange={(e) => setCurrentUpdateItem((prev: any) => prev ? { ...prev, status: e.target.value } : null)} className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent appearance-none dark:bg-gray-700 dark:text-white" style={{ borderRadius: "12px" }}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="h-4 w-4 fill-current text-[#453EFE]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      {currentTableType === "quickLinks" || currentTableType === "resources" && (
                        <>
                          <div>
                            <label htmlFor="update-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                            <input type="text" id="update-title" name="title" value={currentUpdateItem?.title || ""} onChange={(e) => setCurrentUpdateItem((prev: any) => prev ? { ...prev, title: e.target.value } : null)} className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white" style={{ borderRadius: "12px" }} />
                          </div>
                          <div>
                            <label htmlFor="update-linkUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Link URL</label>
                            <input type="text" id="update-linkUrl" name="linkUrl" value={currentUpdateItem?.linkUrl || ""} onChange={(e) => setCurrentUpdateItem((prev: any) => prev ? { ...prev, linkUrl: e.target.value } : null)} className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white" style={{ borderRadius: "12px" }} />
                          </div>
                          <div>
                            <label htmlFor="update-status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                            <div className="relative">
                              <select id="update-status" name="status" value={currentUpdateItem?.status || "Active"} onChange={(e) => setCurrentUpdateItem((prev: any) => prev ? { ...prev, status: e.target.value } : null)} className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent appearance-none dark:bg-gray-700 dark:text-white" style={{ borderRadius: "12px" }}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="h-4 w-4 fill-current text-[#453EFE]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      {currentTableType === "contact" && (
                        <>
                          <div>
                            <label htmlFor="update-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                            <input type="email" id="update-email" name="email" value={currentUpdateItem?.email || ""} onChange={(e) => setCurrentUpdateItem((prev: any) => prev ? { ...prev, email: e.target.value } : null)} className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white" style={{ borderRadius: "12px" }} />
                          </div>
                          <div>
                            <label htmlFor="update-linkUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Link URL</label>
                            <input type="text" id="update-linkUrl" name="linkUrl" value={currentUpdateItem?.linkUrl || ""} onChange={(e) => setCurrentUpdateItem((prev: any) => prev ? { ...prev, linkUrl: e.target.value } : null)} className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white" style={{ borderRadius: "12px" }} />
                          </div>
                          <div>
                            <label htmlFor="update-copyright" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Copyright</label>
                            <input type="text" id="update-copyright" name="copyright" value={currentUpdateItem?.copyright || ""} onChange={(e) => setCurrentUpdateItem((prev: any) => prev ? { ...prev, copyright: e.target.value } : null)} className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white" style={{ borderRadius: "12px" }} />
                          </div>
                          <div>
                            <label htmlFor="update-status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                            <div className="relative">
                              <select id="update-status" name="status" value={currentUpdateItem?.status || "Active"} onChange={(e) => setCurrentUpdateItem((prev: any) => prev ? { ...prev, status: e.target.value } : null)} className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent appearance-none dark:bg-gray-700 dark:text-white" style={{ borderRadius: "12px" }}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="h-4 w-4 fill-current text-[#453EFE]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="px-6 py-4 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700">
                    <button type="button" className="bg-[#453EFE] text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors" onClick={handleSaveUpdate} style={{ borderRadius: "10px" }}>UPDATE</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Archive Confirmation Modal */}
      <Transition appear show={isConfirmArchiveOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsConfirmArchiveOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm overflow-hidden transform transition-all text-center p-6" style={{ borderRadius: "15px" }}>
                  <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setIsConfirmArchiveOpen(false)}>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert text-[#453EFE]">
                      <path d="m21.73 18.27-8.94-15.09a2 2 0 0 0-3.58 0L2.27 18.27a2 2 0 0 0 1.79 2.73h17.88a2 2 0 0 0 1.79-2.73Z" />
                      <path d="M12 9v4" />
                      <path d="M12 17h.01" />
                    </svg>
                    <h4 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Are you sure you want to archive this?</h4>
                  </div>
                  <div className="mt-6 flex justify-center gap-4">
                    <button type="button" className="px-6 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors" onClick={handleConfirmArchive}>Yes, I'm sure</button>
                    <button type="button" className="px-6 py-2 rounded-lg text-[#453EFE] border border-[#453EFE] hover:bg-gray-100 transition-colors" onClick={() => setIsConfirmArchiveOpen(false)}>Cancel</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Archive Success Modal */}
      <Transition appear show={isArchiveSuccessOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsArchiveSuccessOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm overflow-hidden transform transition-all text-center p-6" style={{ borderRadius: "15px" }}>
                  <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setIsArchiveSuccessOpen(false)}>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#453EFE]">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <h4 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Archived Successfully!</h4>
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

export default CustomizationFooter;