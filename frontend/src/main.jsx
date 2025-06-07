import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <App />
        </AnimatePresence>
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
