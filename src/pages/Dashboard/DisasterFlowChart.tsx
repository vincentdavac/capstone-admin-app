const DisasterFlowChart = () => {
  const StepBox = ({ text }: { text: string }) => (
    <div
      className="
        min-w-[180px]        /* wider width */
        h-[100px]            /* taller height */
        px-6                 /* horizontal padding */
        py-4                 /* vertical padding */
        flex
        items-center
        justify-center
        text-center
        text-            /* larger, readable text */
        font-semibold
        rounded-xl          /* more elegant rounding */
        border-2
        border-[#D9D9D9]
        bg-white
        backdrop-blur-lg
        shadow-xl            /* stronger for elegance */
        text-gray-800
        dark:bg-gray-800
        dark:text-white
        dark:border-gray-700
        transition-all
        hover:scale-105
        hover:shadow-2xl      /* subtle glow effect on hover */
      "
    >
      {text}
    </div>
  );

  const Arrow = () => (
    <span className="text-gray-500 dark:text-gray-400 text-2xl select-none drop-shadow-md">
      ➜
    </span>
  );

  const ArrowDown = ({ align }: { align: "left" | "right" }) => (
    <div
      className={`flex w-full ${
        align === "right" ? "justify-end pr-20" : "justify-start pl-20"
      }`}
    >
      <span className="text-gray-500 dark:text-gray-400 text-3xl select-none drop-shadow-md">
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
    border-[#D9D9D9]
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
      {/* Header */}
      <div className="w-full text-center mb-4">
        <h3 className="text-lg  text-gray-900 dark:text-white">
          Disaster Response Flowchart
        </h3>
      </div>
      <hr className="w-full border-t border-gray-300 dark:border-gray-600 mb-6" />

      {/* Row 1 */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <StepBox text="Report to Operations Center" />
        <Arrow />
        <StepBox text="Check-in to site & follow protocol" />
        <Arrow />
        <StepBox text="Secure area & ensure safety of responders" />
        <Arrow />
        <StepBox text="Brief team on current situation" />
      </div>

      <ArrowDown align="right" />

      {/* Row 2 */}
      <div className="flex items-center justify-between gap-4 my-4">
        <StepBox text="Conduct triage" />
        <Arrow />
        <StepBox text="Coordinate medical treatment" />
        <Arrow />
        <StepBox text="Deploy SAR teams" />
        <Arrow />
        <StepBox text="Utilize response equipment" />
      </div>

      <ArrowDown align="left" />

      {/* Row 3 */}
      <div className="flex items-center justify-between gap-4 my-4">
        <StepBox text="Transfer victims for treatment" />
        <Arrow />
        <StepBox text="Coordinate cadaver identification" />
        <Arrow />
        <StepBox text="Report status to command center" />
        <Arrow />
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
