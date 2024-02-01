"use client"

import { useTheme } from "next-themes"
import { Button } from "../ui/button"
import { FaSun, FaMoon } from "react-icons/fa";
import { cn } from "@/lib/utils";

export function ToggleTheme({
  css
}: {
  css?: string
}) {
  const { setTheme, theme } = useTheme()

  return (
    <Button className={cn(css, 'p-3')} onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}>
      {theme === 'light' ? <FaMoon className="w-[20px] h-[17px]" /> : <FaSun className="w-[20px] h-[17px]" />}
    </Button>
  )
}