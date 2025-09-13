import { useTheme } from "../context/ThemeContext"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className="btn btn-outline-secondary"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  )
}
