import "./styles.css";
import { createRoot } from "react-dom/client";

const modules = import.meta.glob("./components/**/*.tsx");

async function hydrateIsland(el: Element) {
  console.log("Hydrating island:", el);
  const component = el.getAttribute("data-component");
  if (!component) return;

  const props = JSON.parse(el.getAttribute("data-props") || "{}");

  const loader = modules[`./components/${component}.tsx`];
  if (!loader) {
    console.warn(`Missing component: ${component}`);
    return;
  }

  const mod = await loader();
  const Component = mod.default || Object.values(mod)[0];

  createRoot(el).render(<Component {...props} />);
}

document.querySelectorAll(".react-island").forEach((el) => hydrateIsland(el));
