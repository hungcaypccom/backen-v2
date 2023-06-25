import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 5 * 1000,
      cacheTime: 60 * 10 * 1000,
      retryDelay: (attemptIndex) => Math.min(500 * 2 ** attemptIndex, 30000),
      retry: 5
    },
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
