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
import { useDispatch } from "react-redux";
import { setSelectedOption } from "../redux/features/practiceSlice"; // Update with the actual path to your slice
import { ToolTipStyle } from "../types";
import { useAppSelector } from "../redux/hooks";

const Options = () => {
  const dispatch = useDispatch();

  const gameStart = useAppSelector((state) => state.practice.startPracticeGame);

  const [tooltipStyles, setTooltipStyles] = useState<ToolTipStyle>({
    backgroundColor: "",
    color: "",
  });

  const [localSelectedOptions, setLocalSelectedOptions] = useState({
    group1: null,
    group2: "timer",
    time: 15,
  });

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setTooltipStyles({
      backgroundColor: rootStyles.getPropertyValue("--textPrimary").trim(),
      color: rootStyles.getPropertyValue("--bgColor").trim(),
    });
  }, []);

  const handleSelect = (
    group: "group1" | "group2" | "time",
    value: number | string
  ) => {
    const updatedOptions = { ...localSelectedOptions, [group]: value };
    setLocalSelectedOptions(updatedOptions);

    dispatch(setSelectedOption(updatedOptions));
  };

  return (
    <section
      style={{
        filter: gameStart ? "blur(3px)" : "none",
        pointerEvents: gameStart ? "none" : "initial",
      }}
      className="w-full flex gap-32 items-center justify-center font-medium text-textPrimary text-sm mt-20"
    >
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
              localSelectedOptions.group1 === value
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
              localSelectedOptions.group2 === value
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
            onClick={() => handleSelect("time", timer)}
            className={`cursor-pointer px-3 py-2 rounded-full transition-colors duration-300 ${
              localSelectedOptions.time === timer
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
