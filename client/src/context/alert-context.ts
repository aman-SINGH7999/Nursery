import { createContext, useContext } from "react";

export type AlertType = "success" | "error" | "info";

export interface AlertState {
  open: boolean;
  type: AlertType;
  title?: string;
  description?: string;
}

export interface AlertContextType {
  showAlert: (alert: Omit<AlertState, "open">) => void;
  hideAlert: () => void;
  alert: AlertState;
}

export const AlertContext = createContext<AlertContextType | null>(null);

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error("useAlert must be used inside AlertProvider");
  }
  return ctx;
};
