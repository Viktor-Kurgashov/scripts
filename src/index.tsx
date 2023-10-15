import { createRoot } from "react-dom/client";
import App from "./app";
import "./styles/tags.scss";
import "./styles/fonts.scss";
import "./styles/typography.module.scss";

createRoot(
  document.getElementById('app')
).render(
  <App />
);
