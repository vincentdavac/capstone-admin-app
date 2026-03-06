const DisasterFlowChart = () => {
  const StepBox = ({ text }: { text: string }) => (
    <div
      className="
        h-[100px]
        px-6
        py-4
        flex
        items-center
        justify-center
        text-center
        rounded-xl
        border-2
        border-[#2C7DA0]
        bg-gradient-to-br from-white to-[#A9D6E5]
        shadow-xl
        text-gray-800
        dark:from-gray-800 dark:to-[#01497C]/30
        dark:text-white
        dark:border-[#2C7DA0]/70
        transition-all
        hover:scale-105
        hover:shadow-2xl
        hover:border-[#01497C]
        dark:hover:border-[#61A5C2]
        w-[186.328px]
      "
    >
      {text}
    </div>
  );

  const ArrowRight = () => (
    <span className="text-[#2C7DA0] dark:text-[#89C2D9] text-3xl select-none drop-shadow-md">
      ➡
    </span>
  );

  const ArrowLeft = () => (
    <span className="text-[#2C7DA0] dark:text-[#89C2D9] text-3xl select-none drop-shadow-md">
      ⬅
    </span>
  );

  const ArrowDown = ({ align }: { align: "left" | "right" }) => (
    <div
      className={`flex w-full ${
        align === "right" ? "justify-end pr-20" : "justify-start pl-20"
      }`}
    >
      <span className="text-[#2C7DA0] dark:text-[#89C2D9] text-3xl select-none drop-shadow-md">
        ⬇
      </span>
    </div>
  );

  return (
    <div
      className="
    w-full
    max-w-full
    sm:max-w-[640px]
    md:max-w-[768px]
    lg:max-w-[955px]
    xl:max-w-[1100px]
    2xl:max-w-[1280px]

    min-h-[60vh]
    lg:min-h-[700px]

    mx-auto
    px-3
    sm:px-4
    md:px-6

    bg-white
    dark:bg-gray-800

    backdrop-blur-xl
    shadow-sm
    rounded-2xl
    border
    border-gray-200
    dark:border-gray-700

    py-4
    overflow-x-hidden
    overflow-y-auto
  "
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="w-full text-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Disaster Response Flowchart
        </h3>
      </div>
      <hr className="w-full border-t border-gray-300 dark:border-gray-600 mb-6" />

      {/* Row 1 */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <StepBox text="Report to Operations Center" />
        <ArrowRight />
        <StepBox text="Check-in to site & follow protocol" />
        <ArrowRight />
        <StepBox text="Secure area & ensure safety of responders" />
        <ArrowRight />
        <StepBox text="Brief team on current situation" />
      </div>

      <ArrowDown align="right" />

      {/* Row 2 */}
      <div className="flex items-center justify-between gap-4 my-4">
        <StepBox text="Conduct triage" />
        <ArrowLeft />
        <StepBox text="Coordinate medical treatment" />
        <ArrowLeft />
        <StepBox text="Deploy SAR teams" />
        <ArrowLeft />
        <StepBox text="Utilize response equipment" />
      </div>

      <ArrowDown align="left" />

      {/* Row 3 */}
      <div className="flex items-center justify-between gap-4 my-4">
        <StepBox text="Transfer victims for treatment" />
        <ArrowRight />
        <StepBox text="Coordinate cadaver identification" />
        <ArrowRight />
        <StepBox text="Report status to command center" />
        <ArrowRight />
        <StepBox text="Assess need for backup responders" />
      </div>

      <ArrowDown align="right" />

      {/* Final step */}
      <div className="flex justify-end mt-4">
        <StepBox text="Maintain log of all events" />
      </div>
    </div>
  );
};

export default DisasterFlowChart;