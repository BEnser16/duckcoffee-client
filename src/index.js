import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import { baseRouter } from "./router/BaseRouter";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastProvider } from "./utils/ToastManager";
import { login } from "./slice/userSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

// load local storage user info into redux store
const user = JSON.parse(localStorage.getItem("user-info"));
if (user) {
  store.dispatch(login(user));
}

root.render(
  <React.StrictMode>
    <ToastProvider>
      <Provider store={store}>
        <RouterProvider router={baseRouter}>
          <App />
        </RouterProvider>
      </Provider>
    </ToastProvider>
  </React.StrictMode>
);
