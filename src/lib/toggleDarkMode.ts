export const toggleDarkMode = () => {
  const html = document.querySelector("html");
  const htmlContainsDark = html?.classList.contains("dark");

  if (!html) {
    return;
  }

  if (htmlContainsDark) {
    html?.classList.remove("dark");
    localStorage.setItem("nsn_theme", "light");
  } else if (!htmlContainsDark) {
    html?.classList.add("dark");
    localStorage.setItem("nsn_theme", "dark");
  }
};

export const getInitialThemeAndSet = () => {
  const html = document.querySelector("html");

  const isLightMode =
    localStorage.getItem("nsn_theme") === "light" || window.matchMedia("(prefers-color-scheme: light)").matches;

  if (!isLightMode) {
    html?.classList.add("dark");
    localStorage.setItem("nsn_theme", "dark");
  } else {
    localStorage.setItem("nsn_theme", "light");
  }
};
