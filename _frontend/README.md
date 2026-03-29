# React in Hugo - Frontend Integration Guide

Welcome! This folder (`_frontend`) contains the React and Vite toolchain that allows us to build and inject interactive React components directly into our Hugo blog posts!

Please see the changes I committed recently to learn exactly what I did to set up this architecture. Here is a breakdown of how everything works and how you can develop and use React components within our Hugo site.

## 1. How the Pipeline Works (Build Scripts & Modifications)

I've set up Vite in this directory to handle bundling our React components. 
- The entry point is `islands.tsx`.
- The Vite build is configured to compile the React code and output the generated JS and CSS directly into the Hugo static assets folder (e.g., `../static/react`).
- When you run `pnpm build` in this folder, Vite bundles the dependencies, parses the Tailwind CSS, and outputs the optimized chunks so Hugo can serve them natively.

## 2. Opening the Dev Server
The development workflow depends on what you are trying to do:

- **If you are only writing Markdown / Hugo content**: 
  You just need the normal Hugo server.
  ```bash
  hugo server -D -F -E --disableFastRender -O
  ```

- **If you are developing React components**: 
  You need to run **two terminals**.
  
  Terminal 1 (Vite Watcher): Watches for changes in React/Tailwind code and continuously rebuilds the JS/CSS into Hugo's static folder.
  ```bash
  cd _frontend
  pnpm dev
  ```

  Terminal 2 (Hugo Server): Serves the site and reloads when static files (the built React scripts) change.
  ```bash
  hugo server -D -F -E --disableFastRender -O
  ```

## 3. Adding a New Component & Using it in Markdown
Whenever you want to create a new interactive React component:
1. Create a new `.tsx` file inside `_frontend/components/`. 
   *(You can organize them in subfolders like `_frontend/components/Impl_Spinodal/simulation.tsx`)*
2. **Important:** Always use a **default export** for your component.
   ```tsx
   import React from "react";
   
   export default function MyCoolComponent(props) {
     return <div>Hello {props.name}</div>;
   }
   ```
3. To use this component in a Hugo markdown article, use the provided `react` shortcode. The `component` argument should map to the file path relative to the `components` directory (omitting the `.tsx` extension). 
   ```md
   {{< react component="MyCoolComponent" name="World" >}}
   ```
   *(Or for grouped components: `{{< react component="Impl_Spinodal/simulation" >}}`)*

## 4. How Injection Works
Here's the magic behind the scenes:
1. **The Shortcode**: The `layouts/shortcodes/react.html` file renders an empty `<div>` with the class `.react-island`. It stores the component name in `data-component` and any extra parameters (like `name="World"`) as JSON in `data-props`.
2. **The Hydrator**: The script we build (`_frontend/islands.tsx`) runs on the client side. It scans the page for all `.react-island` elements.
3. **Dynamic Import**: It reads the `data-component` attribute, dynamically imports the corresponding React chunk, and uses `hydrateRoot` to mount the component inside that div, passing the `data-props` as React props.

## 5. Using Tailwind CSS
Tailwind CSS has been completely set up via `@tailwindcss/vite` (Tailwind v4) and is imported in `islands.tsx`.
- Simply use Tailwind utility classes in any of your `.tsx`/`.html`/`.md` components and pages (e.g., `className="text-skin-base p-4 mx-auto"` for React or `class="w-full h-128 border"` for MD and HTML).
- The Vite watcher (`pnpm dev`) will automatically detect the classes you've used, compile the CSS, and inject the updated Tailwind styles into the Hugo static folder. You can use Tailwind anywhere within the React components!

Happy coding!
