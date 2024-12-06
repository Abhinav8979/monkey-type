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
import { setGameValue } from "../redux/features/commonSlice";

const Options = () => {
  const dispatch = useDispatch();

  const gameStart = useAppSelector((state) => state.practice.startPracticeGame);

  const [tooltipStyles, setTooltipStyles] = useState<ToolTipStyle>({
    backgroundColor: "",
    color: "",
  });

  const [localSelectedOptions, setLocalSelectedOptions] = useState({
    group1: [] as string[],
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
    let updatedOptions;

    if (group === "group1") {
      const currentSelections = localSelectedOptions.group1;
      const isSelected = currentSelections.includes(value as string);

      updatedOptions = {
        ...localSelectedOptions,
        group1: isSelected
          ? currentSelections.filter((item) => item !== value)
          : [...currentSelections, value],
      };

      setLocalSelectedOptions(updatedOptions);

      const containsBoth =
        updatedOptions.group1.includes("punctuations") &&
        updatedOptions.group1.includes("numbers");

      if (containsBoth) {
        dispatch(setGameValue("paraContainBoth"));
      } else {
        // If nothing is selected from group1, or only one of the options is selected, dispatch that option
        !isSelected && dispatch(setGameValue(value));
      }

      const hasNumbers = updatedOptions.group1.includes("numbers");
      const hasPunctuations = updatedOptions.group1.includes("punctuations");
      const hasQuotes = value === "quotes";

      if (hasNumbers && hasPunctuations && hasQuotes) {
        dispatch(setGameValue("paraWithNumbersQuotesAndPunctuation"));
      } else if (hasNumbers && hasQuotes) {
        dispatch(setGameValue("paraWithNumbersAndQuotes"));
      } else if (hasPunctuations && hasQuotes) {
        dispatch(setGameValue("paraWithPunctuationAndQuotes"));
      } else {
        dispatch(setGameValue(value));
      }
    } else if (group === "group2") {
      updatedOptions = { ...localSelectedOptions, [group]: value };
      setLocalSelectedOptions(updatedOptions);

      if (value === "timer") {
        dispatch(setGameValue("words"));
        return;
      }

      const hasNumbers = updatedOptions.group1.includes("numbers");
      const hasPunctuations = updatedOptions.group1.includes("punctuations");
      const hasQuotes = value === "quotes";

      if (hasNumbers && hasPunctuations && hasQuotes) {
        dispatch(setGameValue("paraWithNumbersQuotesAndPunctuation"));
      } else if (hasNumbers && hasQuotes) {
        dispatch(setGameValue("paraWithNumbersAndQuotes"));
      } else if (hasPunctuations && hasQuotes) {
        dispatch(setGameValue("paraWithPunctuationAndQuotes"));
      } else {
        dispatch(setGameValue(value));
      }
    } else {
      updatedOptions = { ...localSelectedOptions, [group]: value };
      setLocalSelectedOptions(updatedOptions);
      // dispatch(setGameValue("words"));
    }

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
              localSelectedOptions.group1.includes(value)
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
