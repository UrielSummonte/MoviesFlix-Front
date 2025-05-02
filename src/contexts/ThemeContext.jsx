import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  // Verificar si el usuario tiene una preferencia de tema en localStorage o prefiere modo oscuro
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      return savedTheme
    }

    // Verificar preferencia del usuario
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  const [theme, setTheme] = useState(getInitialTheme)

  // Aplicar tema al documento
  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')
    root.classList.add(theme)

    // Guardar preferencia de tema
    localStorage.setItem('theme', theme)
  }, [theme])

  // Alternar tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
