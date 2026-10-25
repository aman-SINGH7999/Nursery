// useCatchError.ts
import { useAlert } from "@/context/alert-context";
import axios from "axios";

export const useCatchError = () => {
  const { showAlert } = useAlert();

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      showAlert({
        type: "error",
        title: error?.response?.data?.message || error.message || "Something went wrong.",
      });
    } else {
      showAlert({
        type: "error",
        title: "Something went wrong.",
      });
    }
  };

  return handleError;
};
