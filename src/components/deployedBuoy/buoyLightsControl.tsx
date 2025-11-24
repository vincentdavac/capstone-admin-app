import ModelViewer from "../../components/model-viewer/ModelViewer";

const buoyControl = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex w-full items-center justify-center rounded-xl bg-gray-300 dark:bg-gray-700 p-4 shadow-lg min-h-[300px] max-h-[600px] lg:h-[710px]">
        <ModelViewer />
      </div>
    </div>
  );
};
export default buoyControl;