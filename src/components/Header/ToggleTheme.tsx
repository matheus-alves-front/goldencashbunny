"use client"

import { useTheme } from "next-themes"
import { Button } from "../ui/button"
import { FaSun, FaMoon } from "react-icons/fa";

export function ToggleTheme() {
  const { setTheme, theme } = useTheme()

  return (
    <Button onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}>
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </Button>
  )
}