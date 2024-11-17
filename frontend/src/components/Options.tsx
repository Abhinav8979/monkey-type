import {
  faAt,
  faHashtag,
  faClock,
  faQuoteRight,
  faFont,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { ToolTipStyle } from "../types";

const Options = () => {
  const [tooltipStyles, setTooltipStyles] = useState<ToolTipStyle>({
    backgroundColor: "",
    color: "",
  });

  const [selectedOptions, setSelectedOptions] = useState({
    group1: null,
    group2: "timer",
    timer: 15,
  });

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setTooltipStyles({
      backgroundColor: rootStyles.getPropertyValue("--textPrimary").trim(),
      color: rootStyles.getPropertyValue("--bgColor").trim(),
    });
  }, []);

  const handleSelect = (group: "group1" | "group2" | "timer", value: any) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [group]: value,
    }));
  };

  return (
    <section className="w-full flex gap-32 items-center justify-center font-medium text-textPrimary text-sm mt-20">
      <div className="border-2 border-textSecondary py-1 px-1 rounded-3xl flex gap-3">
        {[
          { icon: faAt, tooltip: "Add punctuations", value: "punctuations" },
          { icon: faHashtag, tooltip: "Add numbers", value: "numbers" },
        ].map(({ icon, tooltip, value }) => (
          <span
            key={tooltip}
            data-tooltip-id="my-tooltip"
            data-tooltip-content={tooltip}
            data-tooltip-place="bottom"
            onClick={() => handleSelect("group1", value)}
            className={`cursor-pointer px-3 py-2 rounded-full transition-colors duration-300 ${
              selectedOptions.group1 === value
                ? "bg-textPrimary text-bgColor"
                : "text-textPrimary hover:text-bgColor hover:bg-textPrimary"
            }`}
          >
            <FontAwesomeIcon icon={icon} />
          </span>
        ))}
      </div>

      <div className="border-2 border-textSecondary py-1 px-1 rounded-3xl flex gap-10">
        {[
          { icon: faClock, tooltip: "Set timer", value: "timer" },
          { icon: faQuoteRight, tooltip: "Quotes", value: "quotes" },
          { icon: faFont, tooltip: "Words", value: "words" },
        ].map(({ icon, tooltip, value }) => (
          <span
            key={tooltip}
            data-tooltip-id="my-tooltip"
            data-tooltip-content={tooltip}
            data-tooltip-place="bottom"
            onClick={() => handleSelect("group2", value)}
            className={`cursor-pointer px-3 py-2 rounded-full transition-colors duration-300 ${
              selectedOptions.group2 === value
                ? "bg-textPrimary text-bgColor"
                : "text-textPrimary hover:text-bgColor hover:bg-textPrimary"
            }`}
          >
            <FontAwesomeIcon icon={icon} />
          </span>
        ))}
      </div>

      <div className="border-2 border-textSecondary py-1 px-2 rounded-3xl flex gap-4">
        {[15, 30, 60, 120].map((timer) => (
          <h1
            key={timer}
            data-tooltip-id="my-tooltip"
            data-tooltip-content={`${timer} seconds`}
            data-tooltip-place="bottom"
            onClick={() => handleSelect("timer", timer)}
            className={`cursor-pointer px-3 py-2 rounded-full transition-colors duration-300 ${
              selectedOptions.timer === timer
                ? "bg-textPrimary text-bgColor"
                : "text-textPrimary hover:text-bgColor hover:bg-textPrimary"
            }`}
          >
            {timer}
          </h1>
        ))}
      </div>

      <Tooltip
        id="my-tooltip"
        style={{
          backgroundColor: tooltipStyles.backgroundColor || "black",
          color: tooltipStyles.color || "white",
        }}
      />
    </section>
  );
};

export default Options;
