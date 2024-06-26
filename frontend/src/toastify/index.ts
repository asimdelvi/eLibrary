// Show toastify notification while loading, success, error while submitting form.

import { Id, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let notifyStatus: Id;

const loading = () => {
  notifyStatus = toast.loading("Processing...", {
    closeButton: false,
    isLoading: true,
  });
};

const success = (message: string) =>
  toast.update(notifyStatus, {
    render: message,
    type: "success",
    closeButton: true,
    isLoading: false,
    autoClose: 3000,
  });

const error = (message: string) =>
  toast.update(notifyStatus, {
    render: message,
    type: "error",
    closeButton: true,
    isLoading: false,
    autoClose: 3000,
  });

export const notify = {
  loading,
  success,
  error,
};
