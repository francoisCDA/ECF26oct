import { configureStore } from "@reduxjs/toolkit";
import TrackerSlice from "./slices/TrackerSlice";

export default configureStore({
    reducer: {
        trackerpro: TrackerSlice
    }
})