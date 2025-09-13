import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

  useEffect(() => {
    localStorage.setItem("theme", theme)
    if (theme === "dark") {
      document.body.classList.add("dark", "bg-dark", "text-light")
    } else {
      document.body.classList.remove("dark", "bg-dark", "text-light")
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
