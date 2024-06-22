import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

const useAccountData = create((set) => ({
  data: {},
  getAccountData: async () => {
    try {
      const res = await axios.get("/accountsinfo");
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        set({ data: res.data });
      }
    } catch (error) {
      toast.error("Failed to fetch account data");
    }
  },
}));

export default useAccountData