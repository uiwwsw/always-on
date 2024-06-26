import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "$/font/SUITE-Variable.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();
const router = createRouter({ routeTree });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
