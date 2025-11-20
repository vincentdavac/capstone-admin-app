import ModelViewer from "../../components/model-viewer/ModelViewer";

const buoyControl = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex w-full items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 p-4 shadow-lg min-h-[300px] max-h-[500px] lg:h-[500px]">
        <ModelViewer />
      </div>

      <div className="flex w-full h-[87px] mt-4 items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-[#DDDDDD] dark:border-gray-700 shadow-md">
        <button className="flex items-center gap-3 px-6 py-3 border border-[#59FF00] rounded-[8px] bg-white hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-green-400">
            <span className="w-5 h-5 bg-[#59FF00] rounded-full"></span>
            <span className="font-medium text-black dark:text-white">Lights On/Off</span>
        </button>
    </div>
    </div>
  );
};
export default buoyControl;