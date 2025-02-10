import { configureStore } from "@reduxjs/toolkit";
import postsApi  from "./features/BlogsApi"; // Import the posts API slice
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer, // Add the posts API slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

// Enables automatic refetching of data when needed
setupListeners(store.dispatch);

export default store;
