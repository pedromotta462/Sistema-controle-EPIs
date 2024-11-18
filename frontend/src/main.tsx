import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes/router";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster
        position="top-center"
        containerStyle={{ height: "300px" }}
        toastOptions={{ style: { fontSize: "20px" } }}
      />
    </QueryClientProvider>
  </React.StrictMode>
);
