import ModelViewer from "../../components/model-viewer/ModelViewer";
const buoyControl = () => {
  return (
    <>
      <div className="z-10 flex w-full max-w-sm items-center justify-center rounded-xl bg-[#EEEEEE] p-4 shadow-lg sm:max-w-md md:h-[500px] md:w-[619px]">
        <ModelViewer />
      </div>
     <div className="z-10 flex w-full max-w-sm sm:max-w-md md:h-[87px] md:w-[619px] mt-5 items-center justify-center rounded-xl bg-white border border-[#DDDDDD]">
        <button className="flex items-center gap-3 px-6 py-3 border border-[#59FF00] rounded-[8px]">
            <span className="w-5 h-5 bg-[#59FF00] rounded-full"></span>
            <span className="font-medium text-black">Lights On/Off</span>
        </button>
    </div>
    </>
  );
};
export default buoyControl;
