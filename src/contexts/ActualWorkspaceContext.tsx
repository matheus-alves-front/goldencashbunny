"use client"
import { WorkspaceType } from "@/@types/globalTypes";
import { ReactNode, createContext, useState } from "react";

type ActualWorkspaceContextTypes = {
  activeWorkspace: WorkspaceType | null,
  UpdateActiveWorkspace: (workspace: WorkspaceType) => void
}

export const ActualWorkspaceContext = createContext({} as ActualWorkspaceContextTypes)

export function ActualWorkspaceContextProvider({ children }: { children: ReactNode }) {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceType | null>(null)

  function UpdateActiveWorkspace(workspace: WorkspaceType | null) {
    setActiveWorkspace(workspace)
  }

  return (
    <ActualWorkspaceContext.Provider value={{
      activeWorkspace,
      UpdateActiveWorkspace
    }}>
      {children}
    </ActualWorkspaceContext.Provider>
  )
}