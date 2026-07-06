import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store/store.ts";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

document.documentElement.setAttribute("data-theme", "dark");

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <SkeletonTheme baseColor="#1f1f1f" highlightColor="#2e2e2e">
      <App />
    </SkeletonTheme>
  </Provider>,
);
