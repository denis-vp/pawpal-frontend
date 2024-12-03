import { create } from "zustand";

type SnackBarStore = {
  isOpenAlert: boolean;
  alertText: string;
  severity: "error" | "warning" | "info" | "success";
  setIsOpenAlert: (isOpenAlert: boolean) => void;
  openAlert: (
    alertText: string,
    severity?: "error" | "warning" | "info" | "success"
  ) => void;
};

export const useSnackBarStore = create<SnackBarStore>()((set) => ({
  isOpenAlert: false,
  alertText: "",
  severity: "info",
  setIsOpenAlert: (isOpenAlert: boolean) => set({ isOpenAlert }),
  openAlert: (
    alertText: string,
    severity: "error" | "warning" | "info" | "success" = "info"
  ) => set({ isOpenAlert: true, alertText, severity }),
}));
