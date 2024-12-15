import { create } from "zustand";

const useStoreModal = create((set) => ({
    modalShow: false, //초기값
    setModalShow: (boolModalShow) =>
        set((state) => ({
            modalShow: boolModalShow,
        })),
    resetModalShow: () => set({ modalShow: false }),
}));
export default useStoreModal;
