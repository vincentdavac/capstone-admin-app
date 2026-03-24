import React from "react";
import { ArrowRight, ArrowLeft, ArrowDown, ShieldAlert } from "lucide-react";

const DisasterFlowChart = () => {
  // Fixed widths for precise alignment math
  const cardWidth = "w-40"; // 160px
  const connectorWidth = "w-8"; // 32px
  // Total row width calculation for the final step alignment:
  // (4 cards * 160px) + (3 connectors * 32px) = 736px
  const rowWidth = "w-[736px]";

  const StepBox = ({
    text,
    phase,
  }: {
    text: string;
    phase?: "prep" | "action" | "final";
  }) => {
    const phaseStyles = {
      prep: "border-blue-200 bg-blue-50/50 text-blue-900 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-100",
      action:
        "border-amber-200 bg-amber-50/50 text-amber-900 dark:border-amber-900/30 dark:bg-amber-900/20 dark:text-amber-100",
      final:
        "border-emerald-200 bg-emerald-50/50 text-emerald-900 dark:border-emerald-900/30 dark:bg-emerald-900/20 dark:text-emerald-100",
    };

    return (
      <div
        className={`
        ${cardWidth} h-20 px-3 py-2 flex items-center justify-center text-center text-[11px] leading-tight
        rounded-xl border-2 shadow-sm transition-all hover:scale-105 hover:shadow-md font-bold
        backdrop-blur-md ${phaseStyles[phase || "prep"]}
      `}
      >
        {text}
      </div>
    );
  };

  const Connector = ({ dir }: { dir: "right" | "left" | "down" }) => (
    <div
      className={`flex items-center justify-center ${connectorWidth} text-slate-400 dark:text-slate-500`}
    >
      {dir === "right" && <ArrowRight size={18} />}
      {dir === "left" && <ArrowLeft size={18} />}
      {dir === "down" && <ArrowDown size={18} />}
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-x-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <h3 className="text-xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
          <ShieldAlert className="text-red-500" size={24} />
          Disaster Response Flow
        </h3>
        <div className="flex gap-4 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
          {["prep", "action", "final"].map((p) => (
            <span
              key={p}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-slate-600 dark:text-slate-400"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  p === "prep"
                    ? "bg-blue-500"
                    : p === "action"
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
              />
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Flow Container */}
      <div className="flex flex-col items-center min-w-[800px]">
        {/* Row 1: Left to Right */}
        <div className={`flex items-center ${rowWidth}`}>
          <StepBox phase="prep" text="Report to Operations Center" />
          <Connector dir="right" />
          <StepBox phase="prep" text="Check-in to site & follow protocol" />
          <Connector dir="right" />
          <StepBox phase="prep" text="Secure area & ensure safety" />
          <Connector dir="right" />
          <StepBox phase="prep" text="Brief team on situation" />
        </div>

        {/* Down Arrow Right (Aligned to center of 4th box) */}
        <div className={`${rowWidth} flex justify-end pr-16 py-2`}>
          <Connector dir="down" />
        </div>

        {/* Row 2: Right to Left */}
        <div className={`flex items-center ${rowWidth}`}>
          <StepBox phase="action" text="Utilize equipment" />
          <Connector dir="left" />
          <StepBox phase="action" text="Deploy SAR teams" />
          <Connector dir="left" />
          <StepBox phase="action" text="Coordinate medical treatment" />
          <Connector dir="left" />
          <StepBox phase="action" text="Conduct triage" />
        </div>

        {/* Down Arrow Left (Aligned to center of 1st box) */}
        <div className={`${rowWidth} flex justify-start pl-16 py-2`}>
          <Connector dir="down" />
        </div>

        {/* Row 3: Left to Right */}
        <div className={`flex items-center ${rowWidth}`}>
          <StepBox phase="final" text="Transfer victims for treatment" />
          <Connector dir="right" />
          <StepBox phase="final" text="Coordinate ID" />
          <Connector dir="right" />
          <StepBox phase="final" text="Report status to command" />
          <Connector dir="right" />
          <StepBox phase="final" text="Assess need for backup" />
        </div>

        {/* Down Arrow Right (Aligned to center of 4th box) */}
        <div className={`${rowWidth} flex justify-end pr-16 py-2`}>
          <Connector dir="down" />
        </div>

        {/* Final Row (Pinned to the end of the row width) */}
        <div className={`${rowWidth} flex justify-end`}>
          <StepBox phase="final" text="Maintain log of all events" />
        </div>
      </div>
    </div>
  );
};

export default DisasterFlowChart;
