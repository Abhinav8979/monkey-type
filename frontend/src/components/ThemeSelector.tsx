import { useState, useEffect } from "react";
import { Theme } from "../types";
import { themes } from "../utils/colorScheme";

const ThemeSelector: React.FC = () => {
  // Load theme from localStorage or fall back to default theme
  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem("selectedTheme");
    return savedTheme ? JSON.parse(savedTheme) : themes[0];
  };

  const [selectedTheme, setSelectedTheme] = useState<Theme>(getInitialTheme);

  // Update CSS variables based on the selected theme
  const applyTheme = (theme: Theme) => {
    document.documentElement.style.setProperty("--bgColor", theme.background);
    document.documentElement.style.setProperty(
      "--textPrimary",
      theme.textColor
    );
    document.documentElement.style.setProperty(
      "--textSecondary",
      theme.untyped
    );
    document.documentElement.style.setProperty("--bgCursor", theme.cursorColor);
    document.documentElement.style.setProperty(
      "--textCorrectColor",
      theme.correctType
    );
    document.documentElement.style.setProperty(
      "--textIncorrectColor",
      theme.wrongType
    );
    document.documentElement.style.setProperty(
      "--bgButton",
      theme.buttonBackground
    );
  };

  useEffect(() => {
    // Apply theme on initial render and whenever the selected theme changes
    applyTheme(selectedTheme);
  }, [selectedTheme]);

  // Function to handle theme selection, update CSS variables, and save to localStorage
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = themes[parseInt(e.target.value)];
    setSelectedTheme(selected);
    localStorage.setItem("selectedTheme", JSON.stringify(selected));

    // Remove focus from the select element
    e.target.blur();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-1 text-sm text-textPrimary">
      <select
        onChange={handleThemeChange}
        value={themes.indexOf(selectedTheme)}
        className="p-1 rounded-xl bg-bgColor"
      >
        {themes.map((theme, index) => (
          <option key={index} value={index} className="text-xs">
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;
