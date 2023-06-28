import * as Switch from "@radix-ui/react-switch";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ?? themes.DARK
  );

  const handleClick = () => {
    setTheme(theme === themes.LIGHT ? themes.DARK : themes.LIGHT);
  };

  useEffect(() => {
    if (theme === themes.DARK) {
      document.documentElement.classList.add(themes.DARK);
    } else {
      document.documentElement.classList.remove(themes.DARK);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
      Theme:
      <Switch.Root
        key={theme}
        checked={theme == themes.DARK}
        onCheckedChange={handleClick}
        className="focus-visible:ring-ring focus-visible:ring-offset-background peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-800 data-[state=unchecked]:bg-gray-800"
      >
        <Switch.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-gray-100 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
      </Switch.Root>
    </div>
  );
};

const themes = {
  LIGHT: "light",
  DARK: "dark",
} as const;
