import { create } from "zustand";

const useStoreToast = create((set) => ({
    toastShow: false, //초기값
    setToastShow: (boolToastShow) =>
        set((state) => ({
            toastShow: boolToastShow,
        })),
    resetToastShow: () => set({ toastShow: false }),
}));
export default useStoreToast;
