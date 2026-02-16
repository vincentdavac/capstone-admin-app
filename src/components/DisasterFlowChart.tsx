const DisasterFlowChart = () => {
  const StepBox = ({ text }: { text: string }) => (
    <div
      className="
        min-w-[120px]        /* further reduced from 140px */
        max-w-[140px]        /* added max-width */
        h-[60px]             /* reduced from 70px */
        px-3                 /* reduced from px-4 */
        py-1.5               /* reduced from py-2 */
        flex
        items-center
        justify-center
        text-center
        text-xs              /* reduced from text-sm */
        font-medium
        rounded-lg
        border-2
        border-[#D9D9D9]
        bg-white
        backdrop-blur-lg
        shadow-sm            /* reduced from shadow-md */
        text-gray-800
        dark:bg-gray-800
        dark:text-white
        dark:border-gray-700
        transition-all
        hover:scale-105
        hover:shadow-md
      "
    >
      {text}
    </div>
  );

  const ArrowRight = () => (
    <span className="text-gray-500 dark:text-gray-400 text-xl select-none drop-shadow-sm">
      ➡
    </span>
  );

  const ArrowLeft = () => (
    <span className="text-gray-500 dark:text-gray-400 text-xl select-none drop-shadow-sm">
      ⬅
    </span>
  );

  const ArrowDown = ({ align }: { align: "left" | "right" | "center" }) => {
    let justifyClass = "justify-center";
    if (align === "left") justifyClass = "justify-start pl-12";
    if (align === "right") justifyClass = "justify-end pr-12";
    
    return (
      <div className={`flex w-full ${justifyClass}`}>
        <span className="text-gray-500 dark:text-gray-400 text-xl select-none drop-shadow-sm">
          ⬇
        </span>
      </div>
    );
  };

  return (
    <div
      className="
        w-full
        lg:w-[648px]         /* Match the disaster alert container width */
        mx-auto
        px-4                 /* Adjusted padding to match alert container */
        py-4
        bg-white
        dark:bg-gray-800
        backdrop-blur-xl
        shadow-sm
        rounded-2xl
        border
        border-[#D9D9D9]
        dark:border-gray-700
        overflow-x-auto
        overflow-y-auto
      "
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Header - moved up with reduced padding */}
      <div className="w-full px-4 pt-3 text-center">  {/* Changed pt-4 to pt-3 */}
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Disaster Response Flowchart
        </h3>
      </div>

      {/* Horizontal rule - moved up with reduced margin */}
      <hr className="mt-2 mb-4 border-gray-300 dark:border-gray-600" /> {/* Changed my-3 to mt-2 mb-4 */}

      {/* Content with responsive adjustments */}
      <div className="px-2 sm:px-4">
        {/* Row 1 */}
        <div className="flex items-center justify-center gap-2 mb-3 flex-wrap sm:flex-nowrap">
          <StepBox text="Report to Operations Center" />
          <ArrowRight />
          <StepBox text="Check-in to site & follow protocol" />
          <ArrowRight />
          <StepBox text="Secure area & ensure safety" />
          <ArrowRight />
          <StepBox text="Brief team on situation" />
        </div>

        <ArrowDown align="right" />

        {/* Row 2 */}
        <div className="flex items-center justify-center gap-2 my-3 flex-wrap sm:flex-nowrap">
          <StepBox text="Conduct triage" />
          <ArrowLeft />
          <StepBox text="Coordinate medical treatment" />
          <ArrowLeft />
          <StepBox text="Deploy SAR teams" />
          <ArrowLeft />
          <StepBox text="Utilize equipment" />
        </div>

        <ArrowDown align="left" />

        {/* Row 3 */}
        <div className="flex items-center justify-center gap-2 my-3 flex-wrap sm:flex-nowrap">
          <StepBox text="Transfer victims for treatment" />
          <ArrowRight />
          <StepBox text="Coordinate ID" />
          <ArrowRight />
          <StepBox text="Report status to command" />
          <ArrowRight />
          <StepBox text="Assess need for backup" />
        </div>

        {/* Down arrow positioned below Assess need for backup */}
        <ArrowDown align="right" />

        {/* Final step - positioned directly under Assess need for backup */}
        <div className="flex justify-end mr-[calc(25%-150px)] mt-3">
          <StepBox text="Maintain log of all events" />
        </div>
      </div>
    </div>
  );
};

export default DisasterFlowChart;