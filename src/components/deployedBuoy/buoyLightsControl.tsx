import ModelViewer from "../../components/model-viewer/ModelViewer";

const buoyControl = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <div
        className="group relative w-full rounded-2xl p-4 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700
                   shadow transition-all duration-300 hover:-translate-y-1  dark:hover:border-blue-500/50
                   hover:shadow-xl hover:shadow-blue-100 dark:hover:shadow-blue-500/20 min-h-[300px] max-h-[600px] lg:h-[710px]"
      >
        {/* Optional subtle hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex justify-center items-center h-full">
          <ModelViewer />
        </div>
      </div>
    </div>
  );
};

export default buoyControl;
