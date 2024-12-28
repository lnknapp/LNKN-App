import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import "hammerjs";
import "./css/site.scss";
import './index.css';
import { ErrorBoundary } from "./features";
import { PageTitleProvider } from "./hooks";

const container = document.getElementById("root")!;
const root = createRoot(container);

window.onerror = function (message, source, lineno, colno, error) {
  console.error(
    "Ooops... An error just ocurred:",
    message,
    source,
    lineno,
    colno,
    error
  );
  return true;
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <PageTitleProvider>
          <RouterProvider router={router} />
        </PageTitleProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

