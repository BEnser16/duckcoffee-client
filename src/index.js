import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import { baseRouter } from "./router/BaseRouter";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastProvider } from "./utils/ToastManager";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <RouterProvider router={baseRouter}>
          <App />
        </RouterProvider>
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);
