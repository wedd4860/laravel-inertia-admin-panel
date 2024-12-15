import { create } from "zustand";

const useStoreMenu = create((set) => ({
    menuShow: true, //초기값
    setMenuShow: (boolMenuShow) =>
        set((state) => ({
            menuShow: boolMenuShow,
        })),
    resetMenuShow: () => set({ menuShow: true }),
}));
export default useStoreMenu;
