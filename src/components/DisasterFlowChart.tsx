const DisasterFlowChart = () => {
  const StepBox = ({ text }: { text: string }) => (
    <div
      className="
      w-[140px]
      flex-shrink-0
      h-[60px]
      px-3
      py-1.5
      flex
      items-center
      justify-center
      text-center
      text-xs
      rounded-lg
      border-2
      border-[#D9D9D9]
      bg-white
      backdrop-blur-lg
      shadow-sm
      text-gray-800
      dark:bg-gray-800
      dark:text-white
      dark:border-gray-700
      transition-all
      hover:scale-105
      hover:shadow-md
      font-bold 
    "
    >
      {text}
    </div>
  );
  const ArrowLeft = () => (
    <span className="w-[24px] flex-shrink-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl select-none drop-shadow-sm">
      ⬅
    </span>
  );
  const ArrowRight = () => (
    <span className="w-[24px] flex-shrink-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl select-none drop-shadow-sm">
      ➡
    </span>
  );

  const ArrowDown = () => (
    <span className="text-gray-500 dark:text-gray-400 text-xl select-none drop-shadow-sm">
      ⬇
    </span>
  );
  return (
    <div
      className="
        w-full
        mx-auto
        px-4
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
      <div className="w-full px-4 pt-3 text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Disaster Response Flowchart
        </h3>
      </div>

      {/* Horizontal rule - moved up with reduced margin */}
      <hr className="mt-2 mb-4 border-gray-300 dark:border-gray-600" />

      {/* Content with responsive adjustments */}
      <div className="flex flex-col items-center px-2 sm:px-4">
        {/* Row 1 */}
        <div className="flex items-center gap-2">
          <StepBox text="Report to Operations Center" />
          <ArrowRight />
          <StepBox text="Check-in to site & follow protocol" />
          <ArrowRight />
          <StepBox text="Secure area & ensure safety" />
          <ArrowRight />
          <StepBox text="Brief team on situation" />
        </div>

        {/* ArrowDown under LAST (rightmost) box — mirrors row structure with spacers */}
        <div className="flex items-center gap-2">
          <div className="w-[140px] flex-shrink-0" />
          <div className="w-[24px] flex-shrink-0" />
          <div className="w-[140px] flex-shrink-0" />
          <div className="w-[24px] flex-shrink-0" />
          <div className="w-[140px] flex-shrink-0" />
          <div className="w-[24px] flex-shrink-0" />
          <div className="w-[140px] flex-shrink-0 flex justify-center py-1">
            <ArrowDown />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex items-center gap-2">
          <StepBox text="Conduct triage" />
          <ArrowLeft />
          <StepBox text="Coordinate medical treatment" />
          <ArrowLeft />
          <StepBox text="Deploy SAR teams" />
          <ArrowLeft />
          <StepBox text="Utilize equipment" />
        </div>

        {/* ArrowDown under FIRST (leftmost) box */}
        <div className="flex items-center gap-2">
          <div className="w-[140px] flex-shrink-0 flex justify-center py-1">
            <ArrowDown />
          </div>
          <div className="w-[24px] flex-shrink-0" />
          <div className="w-[140px] flex-shrink-0" />
          <div className="w-[24px] flex-shrink-0" />
          <div className="w-[140px] flex-shrink-0" />
          <div className="w-[24px] flex-shrink-0" />
          <div className="w-[140px] flex-shrink-0" />
        </div>

        {/* Row 3 */}
        <div className="flex items-center gap-2">
          <StepBox text="Transfer victims for treatment" />
          <ArrowRight />
          <StepBox text="Coordinate ID" />
          <ArrowRight />
          <StepBox text="Report status to command" />
          <ArrowRight />
          <StepBox text="Assess need for backup" />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-[140px] flex-shrink-0" />
          <div className="w-[24px] flex-shrink-0" />
          <div className="w-[140px] flex-shrink-0" />
          <div className="w-[24px] flex-shrink-0" />
          <div className="w-[140px] flex-shrink-0" />
          <div className="w-[24px] flex-shrink-0" />
          <div className="w-[140px] flex-shrink-0 flex justify-center py-1">
            <ArrowDown />
          </div>
        </div>

        {/* Final step - positioned directly under Assess need for backup */}
        <div className="flex items-center gap-2">
          <div className="w-[140px] flex-shrink-0" />
          <div className="w-[24px] flex-shrink-0" />
          <div className="w-[140px] flex-shrink-0" />
          <div className="w-[24px] flex-shrink-0" />
          <div className="w-[140px] flex-shrink-0" />
          <div className="w-[24px] flex-shrink-0" />
          <StepBox text="Maintain log of all events" />
        </div>
      </div>
    </div>
  );
};

export default DisasterFlowChart;
