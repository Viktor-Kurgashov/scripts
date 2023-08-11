import { createRoot } from "react-dom/client";
import App from "./app";
import './styles/tags.scss';

createRoot(
  document.getElementById('app')
).render(
  <App />
);
