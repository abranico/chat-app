import { createContext, useContext, useState } from "react";

interface ThemeContextProps {
  handleTheme: () => void;
  theme: string;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export default function ThemeContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem("__themeChat__");
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const handleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("__themeChat__", newTheme);
  };

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <ThemeContext.Provider value={{ handleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
