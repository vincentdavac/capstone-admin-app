import React, { useState, useRef, ChangeEvent } from "react";
import { Upload, Archive } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface SliderData {
  id: number;
  title: string;
  description: string;
  image: string;
  status: "Active" | "Inactive";
}

const CustomizationSlider: React.FC = () => {
  const [sliders, setSliders] = useState<SliderData[]>([
    {
      id: 1,
      title: "COASTELLA",
      description:
        "Coastal Operations Monitoring and Alert System through Solar-Powered Tracking of Environmental Conditions, Levels of water, Location, and Analytics.",
      image:
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=8",
      status: "Active",
    },
    {
      id: 2,
      title: "AgriSmart",
      description:
        "Smart agriculture monitoring system that automates irrigation and monitors crop health using IoT sensors.",
      image:
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=8",
      status: "Inactive",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSliderData, setNewSliderData] = useState({
    title: "",
    description: "",
    image: "",
    status: "Active" as "Active" | "Inactive",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentSlider, setCurrentSlider] = useState<SliderData | null>(null);
  const [isConfirmArchiveOpen, setIsConfirmArchiveOpen] = useState(false);
  const [isArchiveSuccessOpen, setIsArchiveSuccessOpen] = useState(false);
  const [sliderToArchive, setSliderToArchive] = useState<number | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      if (isAddModalOpen) {
        setNewSliderData({ ...newSliderData, image: imageUrl });
      } else if (isUpdateModalOpen && currentSlider) {
        setCurrentSlider({ ...currentSlider, image: imageUrl });
      }
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
    setNewSliderData({
      title: "",
      description: "",
      image: "",
      status: "Active",
    });
  };

  const handleSaveNewSlider = () => {
    const newSlider: SliderData = {
      id: sliders.length > 0 ? Math.max(...sliders.map((s) => s.id)) + 1 : 1,
      title: newSliderData.title,
      description: newSliderData.description,
      image: newSliderData.image,
      status: newSliderData.status,
    };
    setSliders([...sliders, newSlider]);
    setIsAddModalOpen(false);
  };

  const handleOpenUpdateModal = (slider: SliderData) => {
    setCurrentSlider(slider);
    setIsUpdateModalOpen(true);
  };

  const handleSaveUpdate = () => {
    if (currentSlider) {
      setSliders(
        sliders.map((s) => (s.id === currentSlider.id ? currentSlider : s))
      );
      setIsUpdateModalOpen(false);
      setCurrentSlider(null);
    }
  };

  const handleArchive = (id: number) => {
    setSliderToArchive(id);
    setIsConfirmArchiveOpen(true);
  };

  const handleConfirmArchive = () => {
    if (sliderToArchive !== null) {
      setSliders(sliders.filter((slider) => slider.id !== sliderToArchive));
      setIsConfirmArchiveOpen(false);
      setSliderToArchive(null);
      setIsArchiveSuccessOpen(true); // Open success modal
    }
  };

  const filteredSliders = sliders.filter(
    (slider) =>
      slider.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slider.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSliders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSliders = filteredSliders.slice(
    startIndex,
    startIndex + itemsPerPage
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
        <div className="flex justify-center">
          <img
            src="/images/preview/slider-preview.png"
            alt="Homepage Slider Preview"
            className="rounded-lg border dark:border-gray-700"
          />
        </div>
      </div>
      {/* Sliders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
              Homepage Sliders Table
            </h1>
          </div>
        </div>
        {/* Search */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-shrink-0">
            <button
              onClick={handleOpenAddModal}
              className="bg-[#453EFE] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              + Add Slider
            </button>
          </div>

          <div className="relative w-full sm:max-w-md">
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
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Record ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Description
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
              {currentSliders.map((slider) => (
                <tr
                  key={slider.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {/* Record ID */}
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {slider.id}
                  </td>

                  {/* Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={slider.image}
                      alt={slider.title}
                      className="w-20 h-12 object-cover rounded-md"
                    />
                  </td>

                  {/* Title */}
                  <td className="px-6 py-4 text-sm font-normal text-gray-900 dark:text-white whitespace-nowrap">
                    {slider.title}
                  </td>

                  {/* Description */}
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 min-w-[200px] whitespace-normal">
                    {slider.description}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-5 py-1 inline-flex text-small font-normal rounded-full ${
                        slider.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {slider.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    {/* Update */}
                    <div className="relative group">
                      <button
                        onClick={() => handleOpenUpdateModal(slider)}
                        className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition"
                      >
                        <Upload className="w-5 h-5" />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                        Update
                      </span>
                    </div>

                    {/* Archive */}
                    <div className="relative group">
                      <button
                        onClick={() => handleArchive(slider.id)}
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
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredSliders.length)} of{" "}
              {filteredSliders.length} Entries
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

      {/* Add Slider Modal */}
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
                Add Slider
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
                {/* Title Input */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newSliderData.title}
                    onChange={(e) =>
                      setNewSliderData({
                        ...newSliderData,
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
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={newSliderData.description}
                    onChange={(e) =>
                      setNewSliderData({
                        ...newSliderData,
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
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Image
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={newSliderData.image}
                      readOnly
                      className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                      style={{
                        borderRadius: "12px",
                        paddingRight: newSliderData.image ? "1rem" : "9rem",
                      }}
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />

                    {!newSliderData.image && (
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
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Status
                  </label>
                  <div className="relative">
                    <select
                      id="status"
                      name="status"
                      value={newSliderData.status}
                      onChange={(e) =>
                        setNewSliderData({
                          ...newSliderData,
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
                onClick={handleSaveNewSlider}
                style={{ borderRadius: "10px" }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Slider Modal */}
      {isUpdateModalOpen && currentSlider && (
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
                Update Slider
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
                    value={currentSlider.title}
                    onChange={(e) =>
                      setCurrentSlider({
                        ...currentSlider,
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
                    htmlFor="update-description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="update-description"
                    name="description"
                    rows={3}
                    value={currentSlider.description}
                    onChange={(e) =>
                      setCurrentSlider({
                        ...currentSlider,
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
                    htmlFor="update-image"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Image
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="update-image"
                      name="image"
                      value={currentSlider.image}
                      readOnly
                      className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                      style={{
                        borderRadius: "12px",
                        paddingRight: currentSlider.image ? "1rem" : "9rem",
                      }}
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />

                    {!currentSlider.image && (
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
                    htmlFor="update-status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Status
                  </label>
                  <div className="relative">
                    <select
                      id="update-status"
                      name="status"
                      value={currentSlider.status}
                      onChange={(e) =>
                        setCurrentSlider({
                          ...currentSlider,
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

      {/* Archive Confirmation Modal with Animation */}
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

      {/* Archive Success Modal with Animation */}
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

export default CustomizationSlider;
