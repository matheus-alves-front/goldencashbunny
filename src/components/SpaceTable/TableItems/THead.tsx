import { ReactNode } from "react";

export function THead({ children }: { children: ReactNode }) {
  return (
    <thead>
      {children}
    </thead>
  )
}