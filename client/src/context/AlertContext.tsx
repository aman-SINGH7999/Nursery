import { useState } from "react";
import type { ReactNode } from "react";
import { AlertContext, type AlertState } from "./alert-context";

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    type: "info",
  });

  const showAlert = (data: Omit<AlertState, "open">) => {
    setAlert({ ...data, open: true });

    setTimeout(() => {
      setAlert((prev) => ({ ...prev, open: false }));
    }, 4000);
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alert }}>
      {children}
    </AlertContext.Provider>
  );
}
