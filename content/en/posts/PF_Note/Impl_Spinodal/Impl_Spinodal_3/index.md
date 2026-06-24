---
categories:
- Phase Field
- Programming
tags:
- JavaScript
- TypeScript
- Spinodal Decomposition
- Numerical Analysis
title: "Phase Field Simulation, but in Many Languages III"
description: Let the browser run phase field!
image: /images/Alice-2.png
imageObjectPosition: center 20%
date: 2026-04-10
math: true
mermaid: true
---

*We've already used C++ and Python for phase field simulations. Besides these typical "backend" languages, can the frontend run phase field simulations? The answer is yes! This time let's try the renowned JavaScript and TypeScript~*

*To maintain the consistency of the series, we once again chose the header image from last time: AI Alice drawn by [Neve_AI](https://x.com/Neve_AI). The song choice is **Laplace Chocolate**, which I've been really into recently (how many "recentlies" are there...), written and composed by [Kai](https://space.bilibili.com/3706933947140196) and sung by Hatsune Miku. Lively and adorable, and to some extent even on-topic (Laplace <-> Laplacian)? Hope you enjoy it too~*

{{< music auto="https://music.163.com/#/song?id=2121980419" loop="none">}}

## Starting from the Browser

This time we turn our attention to JavaScript and TypeScript, since the basic spinodal decomposition simulation has already been discussed quite a lot in the previous two posts. And to talk about JavaScript and TypeScript, we cannot avoid mentioning the internet gateway we are all already familiar with: the browser.

### The Very Excellent Browser Technology

Our lives are already filled with all kinds of browsers. From well-known browsers like Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari, and some you may have tried like UC/QQ/360 browsers, to browsers hidden behind software — such as many Android apps, many desktop applications with modern UI styles, and even the mini-programs used for ordering food at restaurants — they are all various forms of browsers. The VS Code that the author uses to write this blog post is built using the desktop application framework *Electron*. If you happen to have VS Code on your computer, you can open a developer tools page identical to Google Chrome's from `Help->Toggle Developer Tools`.

> Sigh, why does every service nowadays go out of its way to make users download mobile apps or open things from WeChat mini-programs? What a hassle! If only there were something that could unify all of these, how wonderful that would be! (Congratulations, you've reinvented the browser)

Why are browsers so popular? I think this is mainly because browser technology has numerous advantages:

- Clear technical structure. People often talk about the *Frontend Three Musketeers* (we'll discuss what frontend and correspondingly backend are later): HTML, CSS, and JavaScript. These three respectively provide content description, interface styling, and interaction logic. Combined with network and backend server communication, these make the browser ecosystem *nearly omnipotent*, allowing many ideas to be realized on it. Such an excellent structural design also facilitates web development, and the first major advantage this brings is:
- Beautiful. This is almost beyond doubt. Current browser pages are blossoming in all their variety, with many great graphic designs achieving unprecedented expression in the browser, and to support the expression of these designs, browser frontend technology is continuously evolving to support more and more effects. The magical effects of CSS and JavaScript's near-absolute control over page elements allow the Frontend Three Musketeers to achieve virtually any conceivable effect — the differences probably only lie in difficulty and latency.
- Strong portability. There is hardly any desktop operating system that cannot install a browser, and as long as a browser can be installed, browser-related technologies can all run JavaScript code in a desktop environment via tools like **Node.js**, a local JavaScript runtime, and many WebApp frameworks, becoming a good-looking and easy-to-use application.
- Rich ecosystem. This point follows naturally — when something is easy to use, everyone naturally flocks to that technology, contributing bricks and tiles to it. This means that many features we don't need to implement ourselves; we can use existing tools, especially when designing UIs. It also means that the barrier to entry for frontend development is gradually lowering. Coupled with the boost from AI technology, even a novice like me dares to recklessly modify my blog using AI.

So great, the browser! But despite all this glowing praise, what exactly are frontend and backend?

### Let Me Rotate Between Frontend and Backend

Since the author isn't particularly knowledgeable about web development, I can only shallowly discuss a bit of my humble opinion here. If there are any omissions, please feel free to enlighten me. In the author's view, frontend and backend are relative — they cooperate to provide the user with a complete service. Among them, the frontend represents *the part that interacts with the user* — everything the user can see, touch, and directly interact with should be classified as frontend. And when the user expects to receive a service, such as after clicking a button, what is *responsible for handling the business logic behind the button* becomes the backend.

Under this understanding, frontend and backend should actually be a responsibility model of certain logical processing, and such a distinction need not be limited to web development. For instance, in Python desktop application programming, we can use PyQt to describe what components an application has without worrying about what they specifically do, only leaving some interfaces, and then implement elsewhere the business processing to be executed after clicking a button, without worrying about how this functionality should appear to the user. We also need not confine ourselves to desktop programs; for example, designing a TUI (Text User Interface) program for use in the command line — then the command line interface is the corresponding frontend; designing a CLI (Command Line Interface) program like `gcc` — then how to reasonably pass in arguments and parse them becomes the corresponding frontend problem.

But this clearly doesn't match our usual impression of *frontend development*. When we talk about frontend development, what are we talking about? Perhaps what we mention is mainly how to interact with users in the browser. This includes how to design page elements (what text appears, what images are placed, what buttons and text boxes are present), where elements should appear on the page, and what should happen when a button is pressed.

Here you might ask: the first two points are understandable, but why the third? Why does the situation of pressing a button also need to be considered by the frontend? Isn't that a backend problem? This brings us to what the backend is in web development. Generally, when a button is pressed, there are probably two situations: one is an operation within the page, such as switching the page style or jumping to a certain position; the second is an operation that requires *communicating with a server*. The most common example is user registration. When a user registers, while filling out the form, the frontend is responsible for beautifully displaying the elements, helping the user understand what to do, and providing basic form validation; and when the user presses the `Register` button, what the frontend is responsible for is: letting the user know they pressed the `Register` button (perhaps graying it out or something), and *notifying the backend server to record this entry*. In this scenario, the backend is a database service.

Generally speaking, the frontend is these three: HTML, CSS, and JavaScript.

So, how does the frontend execute logic like "what to do after a button is pressed"? How does the frontend communicate with the backend? This calls for today's protagonists: **JavaScript** and **TypeScript**.

## JavaScript and TypeScript

Whether from a historical perspective or a logical relationship, we should first talk about this strangely named JavaScript.

### The Mysterious Naming and Successful Marketing

I believe many people unfamiliar with JavaScript have, to varying degrees, tried to associate it with Java or abbreviate JavaScript as Java, having heard of *Java* somewhere. However, this is truly a very humorous and interesting misunderstanding.

In 1993, the founders of Netscape developed Mosaic, a graphical user interface browser. This browser and its successor Navigator achieved great success, but people's demands for browsers quickly went beyond mere "browsing." To allow browser pages to have some dynamic response effects after loading, Netscape hired Brendan Eich in 1995, asking him to implement Scheme, a dialect of the scripting language Lisp, in the browser. However, at the same time, Netscape was also planning to collaborate with Sun Microsystems (which developed Java, and was later acquired by Oracle Corporation) to embed their Java into Navigator, thereby achieving dynamic web page functionality. Comparing and competing between the two approaches, Netscape's senior management ultimately decided to use a scripting language for implementation, letting this language play the role of "glue," but requiring it to have a syntax similar to Java and to be lightweight and easy to use. Eich completed the prototype design in *ten days* in May 1995 and gave it the name Mocha. Subsequently, Netscape's marketing department changed the name to LiveScript, officially launching it with Navigator in November of that year, but then changed the name again in December to JavaScript, riding on the coattails of Java's then-skyrocketing fame[^1], and it has kept this name to the present day.

So, it's hard to say that JavaScript and Java have no relationship at all, but this relationship probably only goes as far as JavaScript once referencing Java, and to better achieve commercialization, JavaScript intentionally chose this name. But, so far it seems that JavaScript is a scripting language exclusively for the Navigator browser — yet now every browser uses this language. What happened in between? Actually, the story about JavaScript's name is still not over.

Perhaps you've seen the name ECMAScript somewhere, or seen an ugly little icon in the Windows system. In fact, after JavaScript rapidly swept the globe along with the Navigator browser, in November 1996 Netscape held a meeting with ECMA (European Computer Manufacturers Association) to begin standardizing this language, and it was defined in the standard document [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/). This standard also later passed as an ISO standard, becoming ISO-16262[^2].

As a standard, the ECMAScript standard only specifies how to implement this type of script. Therefore, it should be said that if one wants to implement one's own script engine conforming to the ECMAScript standard (such as Firefox's SpiderMonkey or Chrome's V8 engine), one needs to reference this standard, while the JavaScript we commonly use is both the prototype and an implementation of ECMAScript. Among other implementations, the one Microsoft implemented is called JScript — that file with the ugly icon. There are also some others, such as Adobe's ActionScript, etc. But overall, the most widely used is still JavaScript; when people mention JS, they are most likely referring to that old veteran, JavaScript.

### TypeScript: JavaScript, but with Static Types

In fact, when people discovered that a browser could be crammed everywhere, JavaScript naturally became popular. Who doesn't want a beautiful GUI interface and cool interaction logic? This is simply too cool! It matches my imagination of the beautiful 21st-century internet. But this brings a problem: wanting to write a flexible, easy-to-use, powerful desktop program based on JavaScript — the amount of code is predictably enormous. However, our dear JavaScript is a dynamically, weakly typed language. Let's look at this famous hellscape:

![The hellscape of JavaScript loose equality](JS_compare.png)

Scary, isn't it? Yes, very scary... JavaScript considerately does many type conversions for you, while considerately telling you that two things written completely identically are actually different. Very great.

But, Y? JavaScript, why? Because JavaScript itself is a lightweight, quick language. Behind such equality or inequality is actually the type conversion system at work. But even if JavaScript really does have a type system behind it, under such mysterious conversions, people can easily think this language fundamentally has no types at all. Such minor shortcomings are still somewhat okay when handling simple logic and small applications, but if one considers using JavaScript to write some particularly complex application logic, I believe the result of lacking type hints would be bugs blooming everywhere, mysterious errors, and crashed bald-headed programmers...

But we can find a way to give it types! Exactly — Microsoft thought so too. On October 1, 2012, TypeScript burst onto the scene. Its goal is simple: give JavaScript type annotations. Its approach is simple: the written TypeScript script will be checked by a static type checker to ensure the code has no type issues, and will then be *compiled* into corresponding JavaScript code, by stripping away all the type annotations. But its result is powerful: it liberated JavaScript from the shackles of lacking static checking, allowing frontend technology to be further applied in larger-scale programs.

### Node.js, `pnpm`, and React

Great. So how can I run JavaScript and TypeScript code? Since it has countless ties to the browser, can I run JavaScript directly in the browser? That's right, it is so, but not entirely. The way to run JavaScript code in a browser is by inserting tags like `<script></script>` into a webpage and running code inside them. But this approach is somewhat awkward. One could also write a couple of lines through the developer tools' Debug Console, but that should be even more awkward... Is there something like a Python interpreter tool that can run JavaScript code on a computer without depending on a browser?

Yes, my friend! There is! Allow me to introduce **Node.js**, a free, open-source, cross-platform JavaScript runtime environment. Node.js allows JavaScript to run independently of the browser, endowing JavaScript with the capability to serve as a backend development language. To run JavaScript code with Node.js, simply `node hello_world.js`! Just like `python hello_world.py`, except two fewer letters to type!

Furthermore, Node.js also has a modern package management system, `npm`, to provide package management support for Node.js or any JavaScript project. `npm` provides a modern file locking mechanism to lock down the dependency versions of a project and allows automatic recognition and installation of project dependencies via `npm install`. More importantly, `npm` by default installs dependencies in the project folder rather than globally. This automatically provides environment separation, avoiding dependency conflicts — compared to Python, which requires manually creating virtual environments, Node.js's approach is more elegant.

However, we don't plan to use the most traditional `npm`, but rather the more advanced package manager `pnpm`. It provides superior package management and dependency resolution, making dependency installation faster and supporting symlinks to save space occupied by packages. Also, for some reason I've forgotten, I installed `pnpm`, while `npm` only has `pnpm` installed — so let's just keep it pure~

And to run TypeScript code, we use `pnpm` to install the `typescript` package and also install the `tsx` tool. `tsx` can directly run TypeScript code without needing to first "compile" it into corresponding JavaScript code. Finally, to open a temporary port locally and observe the rendered result, we also install the `vite` tool.

We've talked so much about the frontend and JavaScript above — so the simulation results run with JavaScript should definitely be beautifully displayed through a beautiful frontend with beautiful results, right! Let's do it! We introduce **React**, a JavaScript frontend component library for building beautiful user interfaces. React allows users to design user interfaces using reusable components and provides various hooks for managing component state and side effects. Although the author doesn't know React, the author can make AI write React! Coupled with the existing React example code from the lovely group member [開源 lib](https://ex-tasty.com/), my assessment is:

> Frontend? Easy as pie!!!

Alright, enough chatter, let's quickly dive into today's main topic!

## JavaScript Implementation

As usual, the first version directly replicates the initial C++ program to familiarize ourselves with the basic syntax of this language!

### Nice Syntax is Really Nice!

First, let's design a periodic grid iteration function:

```javascript
function mesh_periodic(u, ker_fun, Nx, Ny, dx, dy, A, kappa) {
  let new_mesh = new Array(u.length).fill(0);
  const inv_dx2 = 1 / (dx * dy);

  for (let j = 0; j < Ny; j++) {
    for (let i = 0; i < Nx; i++) {
      const left = u[j * Nx + ((i - 1 + Nx) % Nx)];
      const right = u[j * Nx + ((i + 1) % Nx)];
      const down = u[((j - 1 + Ny) % Ny) * Nx + i];
      const up = u[((j + 1) % Ny) * Nx + i];
      const center = u[j * Nx + i];
      new_mesh[j * Nx + i] = ker_fun(
        left,
        right,
        up,
        down,
        center,
        inv_dx2,
        A,
        kappa,
      );
    }
  }

  return new_mesh;
}
```

We can see that when declaring a function, we use the `function` keyword, and still without adding any types. I occasionally quite like this approach of not needing to write types, especially when it's clear what each parameter specifically does. And a single `function` keyword can very clearly indicate that this is a function — really nice.

Additionally, JavaScript's flow control statement syntax is truly identical to C/C++! I really like this — this writing approach has a clear structure and rigorous logic, a very good design. And the point where it further surpasses C/C++ is: the semicolon `;` at the end of statements is not required. This is truly great news, especially for a fool like me who often forgets to write semicolons. Even better news is that VS Code can cleverly add semicolons for you automatically — just enable this switch in the settings. However, I won't enable it here, because the default is off ().

Next, arrays in JavaScript use the `Array` keyword, and creating a new array requires the `new` keyword, followed by the class constructor argument list. I'm not particularly fond of this point: it reminds me of the keyword `new` with the same name in C/C++, but in C/C++ it's used to create objects on the heap, while in modern C++ we discourage using the `new` keyword and instead prefer managing resources in ways more aligned with RAII. Perhaps it's because when JavaScript was born, writing it this way was already the established convention? But it's not a big deal.

Next, what's noteworthy is the keywords used for declaring variables. Here we use both `let` and `const` — the first is the general variable declaration approach, while the second is for constants. The main purpose of writing this way is to facilitate engine code optimization. However, what's more recommended is actually declaring `Array` as a `const` variable. You might wonder why such a frequently changing variable would instead need to be defined with `const`, but the `const` here actually means that this *name* cannot be bound to another variable, and it does not affect internal changes to the variable. That is to say, if we now declare this `Array` with `let new_mesh`, on the very next line we could make `new_mesh` become the number `1`; whereas if we use `const new_mesh`, `new_mesh = 1` would produce an error, because we are attempting to bind a new value to this name.

Finally, we employ a little clever trick. Notice that here we didn't use boundary judgment syntax, but instead performed a modulo operation. This leverages the properties of modulo: internal values remain unchanged after taking the modulo, the index beyond the right boundary automatically becomes `0` after taking the modulo, and `-1` added to the grid length and then taking the modulo yields the value at the right boundary. Finally, we still use the kernel function for computation and return the result.

We won't elaborate on the functions for computing the Laplacian and the energy derivative. Let's see how to output results to files. Node.js provides us with the `fs` module — we just need `import fs from "node:fs"`. And the `write_VTK` function is written like this:

```javascript
function write_VTK(mesh, istep, Nx, Ny, dx, dy, folder_name) {
  const vtkContent = `# vtk DataFile Version 3.0
Spinodal Decomposition Step ${istep}
ASCII
DATASET STRUCTURED_GRID
DIMENSIONS ${Nx} ${Ny} 1
POINTS ${Nx * Ny} float
${Array.from({ length: Ny }, (_, j) =>
    Array.from({ length: Nx }, (_, i) => `${i * dx} ${j * dy} 0`).join("\n"),
  ).join("\n")}
POINT_DATA ${Nx * Ny}
SCALARS CON float
LOOKUP_TABLE default
${mesh.join("\n")}
`;

  fs.writeFileSync(`${folder_name}/step_${istep}.vtk`, vtkContent);
}
```

You might be surprised — how is this code so short? It's actually because we heavily used the `.join` function to replace the traditional double loop. In JavaScript, there are three ways to write strings: `'` and `"` have similar effects, and when multi-line text is needed, you can use `` ` `` to open multi-line text. And if formatted output is needed, we can directly use `${}`, writing expressions inside. Here we write the logic of outputting grid points as a single expression:

```javascript
Array.from({ length: Ny }, (_, j) =>
    Array.from({ length: Nx }, (_, i) => `${i * dx} ${j * dy} 0`).join("\n"),
  ).join("\n")
```

This one line looks a bit hard to understand at first glance, because we leverage two interesting features of JavaScript.

- (Almost) everything is an object!

  First, let's introduce the `Array` data structure. You might wonder what's there to introduce about an array, but in JavaScript, arrays also come from *objects* — they are syntactic sugar wrapped around a class of objects. We can verify this with `console.log(typeof([]));` — it returns `object`, not `List` or `Array` or the like. What are objects in JavaScript? And what kind of object is `Array`?

  In JavaScript, an object is actually a dictionary. It has many key-value pairs, each key being unique. And `Array` is *an object with integer keys starting from `0` and possessing a `length` property*. So, `{length: 5}` is already an uninitialized `Array` of length `5`.

  So what is `Array.from()`, and why does the symbol `=>` appear inside?

- First-class citizen: functions

  In fact, `Array.from()`, as can be felt from its literal meaning, should be a function for creating from some source. Checking its help information, we can see:

  ```javascript
  (method) ArrayConstructor.from<any, string>(iterable: Iterable<any> | ArrayLike<any>, mapfn: (v: any, k: number) => string, thisArg?: any): string[] (+3 overloads)
  ```

  The preceding `{ length: Ny }`, according to what we said earlier, should match the `ArrayLike<any>` type for that `iterable`, and the following `mapfn`, judging by its name, should be a function. That's right — here we use JavaScript's second way of declaring functions, also called *arrow functions*, or by another name, Lambda expressions.

  In JavaScript, arrow functions are defined like this: `(param1, param2) => {statement1; statement2; return value;}`. Some syntactic sugar has also been added — for example, when the parameter list has only one non-temporary-object parameter, the parentheses can be omitted (for temporary objects, parentheses should be written to distinguish from the following curly braces), or when the function only needs to execute one line of computation and return, the curly braces and `return` keyword can be omitted and the value can be directly written out. As a language that supports and encourages the use of functional programming, JavaScript uses arrow functions far more extensively than what you may currently see. This is just a simple example here.

  So, how should we understand the parameter list of `Array.from()`? Actually, of the three parameters it accepts, the last one has a question mark, indicating it's an optional parameter — we don't need it here, so ignore it. Of the other two parameters, the `iterable` parameter will have its `.map()` method called, and the callback function accepted by the `.map()` method is something like the `mapfn` here. The type requirement of `mapfn` is to accept `v` and `k`, corresponding to the value in `iterable` and the key of this value, respectively, and finally this callback function needs to return a string.

  That is to say, we need to fill in the source from which we generate the `Array` in `iterable`, and then define, through the `mapfn` callback function, the method for generating the values in the new `Array` from each key-value pair of this `iterable`. The general logic is shown in the diagram below:

  ![Array.from()](mermaid-array_from.png)

  Returning to our output logic, we can see that the mapping function `mapfn` here chose the approach of mapping from `(_,j)` to a new `Array`. Since we only need to return this new `Array`, we didn't write curly braces and `return`, and directly used the same method to create an `Array` where each position in the new `Array` is a string. The content of the string uses the two indices `i`, `j` along with `dx` and `dy`. Finally, we use the `.join()` method to concatenate the strings at each position with the `\n` newline character, stuff them into the outer list elements, and then concatenate all the outer values again with `\n`, obtaining one giant string.

  Here, the `_` in `(_,j)` means we don't need this value, because we mainly care about the indices of the list, or in other words, we really just want to generate a sequence of integers starting from `0` and ending before `Ny`. Also, this way of writing was not written by me, but done by AI for me. A very excellent way of writing — it made my head spin, but I suppose I've now seen the power of JavaScript callbacks.

  In fact, JavaScript explicitly treats function objects as *first-class citizens*, on equal footing with other objects. The advantage of this is that we can more freely pass functions as arguments to other functions. Other languages can also do this, but their application approaches or syntactic restrictions still fall short of the convenience offered by JavaScript.

Let's return to the main topic. Next is writing our computation logic. There isn't much to discuss at this step — the main points are that JavaScript's built-in math library `Math` and performance checking utility `performance` make it convenient for us to implement random number noise and record computation time. Here, the definition of our main grid `con_mesh` once again uses callback functions:

```javascript
let con_mesh = new Array(Nx * Ny)
  .fill(0)
  .map(() => con_init + 2 * dcon * (Math.random() - 0.5));
```

Here, the reason we `.fill(0)` first is that we need to fill this grid before considering the mapping, and the mapping rule is also very simple — regardless of the parameters passed in, just directly fill in the value.

The complete code for the first version can be found [here](/attachments/Impl_Spinodal/JS/JS_impl_v1.js) — feel free to try running it. The Node.js version used by the author is v24.14.0, and the computation time is roughly around 1420 milliseconds. As can be seen, the execution speed of this code is still quite good. Thank you, V8 (Node.js uses Google's V8 engine)!

### Savoring Object-Oriented Programming

Next, let's savor JavaScript's object-oriented syntax. Class declarations in JavaScript are very special — all methods inside can be defined without the `function` keyword, and there is a special method `constructor` serving as the constructor. Defining properties for a class requires using the `this.attribute` syntax. Additionally, this time we plan to make a small change by using *inheritance* from object-oriented programming, making certain classes serve as *base classes* and deriving *subclasses* from them. Subclasses can inherit the properties and methods of the base class and can also override the base class's methods. The advantage of this is that we can extract the common parts of some objects, and when passing objects, we can restrict operations to only certain common properties.

In JavaScript, inheritance uses the `extends` keyword, and `super()` is used to call the base class constructor. Let's use boundary conditions as an example:

```javascript
class BoundaryCondition {
  constructor(pos, type) {
    this.type = type;
    this.pos = pos;
  }
}

class PeriodicBC extends BoundaryCondition {
  constructor(pos) {
    super(pos, "periodic");
  }
  apply(mesh) {
    const stride = mesh.Nx + 2;
    if (this.pos === "north") {
      for (let idx = 0; idx < mesh.Nx; idx++) {
        mesh.data[(mesh.Ny + 1) * stride + idx + 1] =
          mesh.data[1 * stride + idx + 1];
      }
    }
    if (this.pos === "south") {
      for (let idx = 0; idx < mesh.Nx; idx++) {
        mesh.data[idx + 1] = mesh.data[mesh.Ny * stride + idx + 1];
      }
    }
    if (this.pos === "east") {
      for (let idx = 0; idx < mesh.Ny; idx++) {
        mesh.data[(idx + 1) * stride + (mesh.Nx + 1)] =
          mesh.data[(idx + 1) * stride + 1];
      }
    }
    if (this.pos === "west") {
      for (let idx = 0; idx < mesh.Ny; idx++) {
        mesh.data[(idx + 1) * stride] = mesh.data[(idx + 1) * stride + mesh.Nx];
      }
    }
  }
}
```

As can be seen, we extracted the most important properties of boundary conditions, namely the direction of the boundary to be assigned, and also recorded the boundary type together in `BoundaryCondition`. Then we let `PeriodicBC` inherit `BoundaryCondition`, giving it a new method `apply()` to assign boundary conditions. Note that we use `stride = mesh.Nx + 2` here, which is to facilitate computing the Laplacian inside the grid. Below is a diagram:

![Grid structure diagram, drawn with Draw.io](mesh_grid.png)

As can be seen, around the main grid (green part) we added blue parts on all four sides. These parts serve as *boundaries*, and after each computation spanning the grid range, they are individually assigned according to the corresponding rules. This approach ensures that in the green part, computation can directly proceed according to the established calculation flow, avoiding boundary judgments. The downside, however, is that we must use `stride` to fetch points across rows, and when doing loops, we need to pay a bit more attention to the starting points and ending conditions of the loops — slightly more effort to write, that's all.

So, can we further derive new boundary conditions based on this `BoundaryCondition`? Of course! Let's implement one more, a fixed boundary condition `FixedBC`, as an example.

```javascript
class FixedBC extends BoundaryCondition {
  constructor(pos, value) {
    super(pos, "fixed");
    this.value = value;
  }
  apply(mesh) {
    const stride = mesh.Nx + 2;
    if (this.pos === "north") {
      for (let idx = 0; idx < mesh.Nx; idx++) {
        mesh.data[(mesh.Ny + 1) * stride + idx + 1] = this.value;
      }
    }
    // Other three boundaries
  }
}
```

As can be seen, this time our `constructor` has one more parameter, `value`, used to store the fixed value of the boundary. Interestingly, however, we have the same boundary assignment function `apply()` that only accepts a `mesh`, ensuring uniformity in the calling approach.

In fact, we really just wanted to define some functions for assigning boundaries, and some of these functions need no parameters, some need one or two numbers as parameters, and some may need other, more complex types as parameters. By packaging them into classes and exposing a unified interface, we successfully achieved first *setting the boundary conditions*, and then, without worrying about the specific boundary condition, only needing to use a *unified approach* to apply the boundary conditions. We will see this design pattern again later.

To facilitate unified boundary assignment, we designed the `BoundaryConditions` class, used to load boundary conditions and assign them uniformly. Next, we abstract the process of assigning initial values to the grid as an initial geometric structure `InitGeometry`, and derive from it the `RandomInit` random assignment method, in a manner similar to the boundary conditions above. Next is designing the grid — the information it contains is actually largely the same as before. Let's look directly at the energy design:

```javascript
class BulkFreeEnergy {
  constructor(type, params) {
    this.type = type;
    this.params = params;
  }
}

class DoubleWellBulk extends BulkFreeEnergy {
  constructor(A) {
    super("double_well", { A });
  }
  dbulk_dc() {
    return (center_val) =>
      2 * this.params.A * center_val * (1 - center_val) * (1 - 2 * center_val);
  }
}

```

Same as before, we designed the base class `BulkFreeEnergy` and let `DoubleWellBulk` inherit from it, adding the parameter `A` during initialization and designing the `dbulk_dc` function as a unified interface. What's noteworthy here is that `dbulk_dc` does not return a plain value, but returns an *arrow function*. The purpose of doing this is actually very simple — because what ultimately participates in the computation should be a kernel function, and if we directly pass `dbulk_dc`, we would have to design the parameter list that the function should accept in advance. By having it return a function object (arrow function), we can directly place the result of calling this function in the later solver initialization step.

For the final solver, we won't do further abstraction. The definition of `CH_Solver` is as follows:

```javascript
class CH_Solver {
  constructor(mesh, M, dbulk_dc, dint_dc, others = undefined, dt) {
    this.mesh = mesh;
    this.M = M;
    this.dbulk_dc = dbulk_dc;
    this.dint_dc = dint_dc;
    if (others !== undefined) {
      this.others = others;
    }
    this.dt = dt;
  }
  dF_dc() {
    return this.mesh.output_mesh(
      (left_val, right_val, up_val, down_val, center_val, inv_dxdy) => {
        const dbulk = this.dbulk_dc(center_val);
        const dint = this.dint_dc(left_val,right_val,up_val,down_val,
          center_val,inv_dxdy,
        );
        let dF = dbulk + dint;
        if (this.others !== undefined) {
          dF += this.others(left_val,right_val,up_val,down_val,
          center_val,inv_dxdy,
          );
        }
        return dF;
      },
    );
  }
  step() {
    const dF = this.dF_dc();
    const dc = dF.output_mesh(
      (left_val, right_val, up_val, down_val, center_val, inv_dxdy) =>
        (left_val + right_val + up_val + down_val - 4 * center_val) * inv_dxdy,
    );
    for (let j = 1; j <= this.mesh.Ny; j++) {
      for (let i = 1; i <= this.mesh.Nx; i++) {
        const idx = j * (this.mesh.Nx + 2) + i;
        this.mesh.data[idx] += this.M * dc.data[idx] * this.dt;
      }
    }
    this.mesh.boundCons.applyAll(this.mesh);
  }
}
```

As can be seen, we designed two functions: `dF()` for receiving the energy solution result, and `step()` for performing a single-step computation. All computation information is loaded into the solver via the constructor.

At the final computation step, our initialization process is very simple:

```javascript

const Nx = 64;
// Define numbers ...

const folder_name = "output";
fs.mkdir(folder_name, { recursive: true }, (err) => {
  if (err) console.error("Error creating folder:", err);
  else console.log(`Folder '${folder_name}' is ready.`);
});

const con_mesh = new Mesh(Nx, Ny, dx, dy);
con_mesh.load_boundary_conditions([
  new PeriodicBC("north"),
  new PeriodicBC("south"),
  new PeriodicBC("east"),
  new PeriodicBC("west"),
]);
con_mesh.init_geometry(new RandomInit(con_init, -dcon, dcon));
con_mesh.boundCons.applyAll(con_mesh);

const bulk = new DoubleWellBulk(A);
const interfacial = new GradientEnergy(kappa);

const solver = new CH_Solver(
  con_mesh,
  M,
  bulk.dbulk_dc(),
  interfacial.dint_dc(),
  undefined,
  dt,
);

```

The computation process is further simplified to:

```javascript
for (let istep = 0; istep < Nstep + 1; istep++) {
  solver.step();

  if (istep % 100 === 0) {
    con_mesh.write_VTK(istep, folder_name);
    if (istep % 500 === 0) {
      console.log(`Step: ${istep}`);
    }
  }
}
```

That's right — just let `solver` keep calling the `step()` function. All the computation logic is layered and hidden, and at the calling stage only `step()` is needed to advance. This is simply too cool, very much in line with...

Let's look at the execution speed of the second version. On average it only takes about 860 milliseconds!? Very excellent JavaScript, makes me (). You can still find this version of the program [here](/attachments/Impl_Spinodal/JS/JS_impl_v2.js) — feel free to try running it!

### Read Data from a File!

However, a mature program definitely shouldn't stop at directly defining all kinds of variables internally and running. We want to be able to pass in parameters from external files and let the program read the file and then start running. To achieve this, we need to design a function for parsing files. The good news is that JavaScript has a very standard object file format that you must have more or less encountered: *JSON*, i.e., JavaScript Object Notation. It is an open data interchange format and also one of the formats used by many configuration files. If you, like the author, use VS Code, then you must have seen files like `.vscode/settings.json` or `.vscode/launch.json` — they are configuration files used to configure VS Code's behavior.

Additionally, because the author is deeply troubled by `NaN` — every time after computation finishes, discovering that the program secretly stuffed `NaN` into the results, very annoying — I designed a small function to check whether `NaN` appears in the computation results. When it does, the program immediately stops and tells me at which row and column the problem occurred. However, since this feature is quite performance-intensive, we selectively enable it, controllable through the input file.

Next, because our program is becoming longer and longer (the second version has a full 330+ lines), we consider splitting this large file into three parts, used to store *data reading*, *data type design*, and *actual execution* respectively. The third version of the program and an example input file are packaged and placed [here](/attachments/Impl_Spinodal/JS/JS_impl_v3.7z) — feel free to extract and consume. (Oh my, is compression really necessary for this amount of text ())

The performance of this version of the code fluctuates somewhat severely when running, but basically won't exceed 1.1 seconds — still a quite fast result.

## TypeScript Implementation

After savoring JavaScript, one can feel that its strengths lie in its relatively flexible syntax and the beauty of not needing to explicitly state types. However, as we mentioned earlier, when the program scale grows larger, using type checking can help us write healthier code. So next, let's savor TypeScript and see if it can bring us something new.

### Built on Top of JavaScript

For our first version, we directly replicate the final version of the JavaScript program, and we choose to let AI do the work. AI is so useful, and adding type annotations to code isn't hard either — why not? We won't split the files this time, and directly place the code [here](/attachments/Impl_Spinodal/TS/TS_impl_v1.ts) for your convenient viewing and running.

Comparing with the JavaScript implementation, one can see that the TypeScript implementation has many pieces of code defined with the `type` keyword that resemble class definitions or operations, such as:

```typescript
type BoundaryPosition = "north" | "south" | "east" | "west";
type BoundaryType = "periodic" | "fixed";

type ParsedBoundaryConfig = {
    position?: unknown;
    type?: unknown;
    value?: unknown;
};
```

This is actually specifying what should be inside a conforming type. Here `BoundaryPosition` means only four strings are accepted, otherwise the type checker will report an error, while `ParsedBoundaryConfig` requires that objects of this type possess three possibly existing properties, and the types of the three properties, for safety, are all set to `unknown`, to be processed later.

Additionally, some classes have also changed internally. Perhaps the biggest change is in the constructors. Let's take the `MeshConfig` class used for receiving grid information as an example:

```typescript
class MeshConfig {
    constructor(
        public readonly Nx: number,
        public readonly Ny: number,
        public readonly dx: number,
        public readonly dy: number,
        public readonly minVal: number,
        public readonly maxVal: number,
        public readonly boundaryConditions: ParsedBoundaryConfig[],
    ) { }
    // other methods...
}
```

As can be seen, we no longer define parameters from the parameter list and then use the `this.attribute = attribute` syntax inside the function body to define what properties are inside; instead we directly write them in the parameter list and leave the function body empty, and the class initialization is already complete. If other properties need to be defined, one can refer to the later data class `Mesh`:

```typescript
class Mesh {
    readonly inv_dxdy: number;
    readonly data: number[];
    readonly boundCons: BoundaryConditions;

    constructor(
        public readonly Nx: number,
        public readonly Ny: number,
        public readonly dx: number,
        public readonly dy: number,
        data?: number[],
        boundCons?: BoundaryConditions,
    ) {
        this.inv_dxdy = 1 / (dx * dy);
        this.data = data ?? new Array((Nx + 2) * (Ny + 2)).fill(0);
        this.boundCons = boundCons ?? new BoundaryConditions();
    }
    // other methods...
}
```

As can be seen, besides the parameter list of `constructor`, there are two positions that differ from before. One is that some `readonly` properties are declared before the constructor, and they are defined inside the constructor body using `this` for assignment, as usual. Overall, such a design facilitates access control and avoids accidentally changing data.

Finally, it's worth mentioning that we can truly define the type of a certain function! The way to define it is similar to the arrow function syntax:

```typescript
type DBulkDC = (centerVal: number) => number;
```

Here we defined the `DBulkDC` type, which should be a function that accepts a number and returns another number. Such a design facilitates the operation of passing function parameters into other functions.

How is the execution speed of this version of the code? After several tests, the execution speed stabilizes at around 1030 milliseconds. I'm quite satisfied with this result — a little over a second to finish, what more could you ask for, right?

### I Can't Take It Anymore, I Want to Run It in the Browser!

In the end, after writing so many versions of code, none of them ran in the browser — they all ran on Node.js... This really doesn't match the application scenarios of these frontend technologies. So finally, let's leverage the power of Vite and the mysterious power embedded in my blog by the great group member [開源 lib](https://ex-tasty.com/) to make it run in the browser!

The library we choose is React, whose advantages we have already introduced earlier. To let Vite run directly, we had AI cobble together an HTML file, using `<script type="module" src="./TS_impl_v2.ts"></script>` inside to place our code results in the browser. The TypeScript code and corresponding files are placed [here](/attachments/Impl_Spinodal/TS/TS_impl_v2.7z). To run the code here, after extracting, use `pnpm vite --open TS_impl_v2.html` to open a port, click the localhost link displayed in the terminal to enter the browser page, and see the running results of the code! Press `F12` in the browser to open the developer tools and view the console output, where you can see the computation happening in real time.

Of course, with the help of mysterious powers, you can view the running results below (please drag the slider left and right):

{{< react component="Impl_Spinodal_3/TS_impl_v2" >}}

Not bad! The result running from my own browser is roughly around 0.85 seconds, and I'm quite satisfied. However, it should be noted that for rendering in the browser, we did not output results to files, but directly stored them in an array, rendering the array results by time frame during rendering, so the timing does not account for file IO issues. But even so, I still think this is simply too cool...

If you have carefully examined this code, you can find that it uses the two keywords `async` and `await`, as well as the type `Promise<>`. What do these two keywords do? And what is this type? This is actually the *coroutine* syntax implemented by JavaScript/TypeScript. When we declare that a certain function returns a `Promise`, it means that this function may execute *asynchronously* and relatively slowly, and will eventually return the type wrapped inside the `Promise` template class. For example, the meaning of `Promise<string>` is that this function, when executed to the end, will definitely return a `string` type.

With this, we can mark a larger function with `async`, telling the engine that there are `Promise`s used inside this function, and within this function, using any method that returns a `Promise` will *immediately* execute — their execution time we may not be clear about, but they won't block the execution of subsequent programs, and later when needed, the `await` keyword will definitely synchronize the execution results of these async functions, ensuring that after the `await` statement finishes executing, all functions have returned the needed values (or successfully errored).

What benefits can such an approach bring? Actually, it's quite obvious: we can have the relatively slow IO in the program execution process start early, and then when we need to use them, use `await` to guarantee the execution state, thereby improving the program's execution speed. It's like the classic elementary school problem — traditional programming is boiling water first and then chopping vegetables, while asynchronous programming is chopping vegetables while the water is boiling, and when water is needed, `await` until the water boils.

However, the author's understanding of JavaScript/TypeScript asynchronous programming, or asynchronous programming itself, is still insufficient. There are actually many nuances inside — when properly utilized, it can greatly improve computational efficiency, but when improperly utilized, it can easily create mysterious bugs... This counts as an initial experience with coroutines/asynchrony.

## Summary and Afterword

This time, since I was learning JavaScript/TypeScript *almost* from scratch (actually I encountered a little bit when writing blog posts, but not much), I wrote all the code first, went through several iterations to get a satisfactory version, and only then came to write this blog post. During the writing process, I realized that my understanding of many areas is still not deep enough. If there are any issues with what I've written, I sincerely ask for your guidance.

I really like the story of JavaScript's birth — it's very interesting. Especially knowing that JavaScript's name was simply a commercial consideration, and that everyone just kept using it ever since, it makes the world feel like a makeshift stage. And then considering the current thriving frontend ecosystem, one can't help but feel that even in what looks like a makeshift stage, the crystallization of everyone's wisdom has step by step elevated it to its current heights. In my view, JavaScript ultimately realized Brendan Eich and Netscape's original vision — that it should be a simple and easy-to-use *glue* language, bringing together useful features and characteristics, and invoking the crystallization of everyone's wisdom. At the same time, it's precisely this simplicity and ease of use that has made the frontend ecosystem even more prosperous and rich.

Actually, when I first started writing this post, I very much wanted to bring in *functional programming* and do some introduction. But after some material searching and reading, I found that when we consider passing functions as objects into parameters, we are already engaging in functional programming to some degree. Moreover, my understanding of this concept is not yet deep, and there are languages better suited for implementing functional programming (such as *Haskell*), so perhaps later, after I have a deeper understanding of this philosophy, I will consider showing you my understanding of it.

Additionally, there's a very interesting point: across these three posts, the *line number* where I start the code implementation is always around line 100 of my editor. This is truly a magical number — I hope you don't find my earlier rambling too verbose. In fact, through learning and comparing different languages, my understanding of some concepts has deepened further, such as memory models, variable lifetimes, and so on. And speaking of this, I believe anyone who has heard the great name of *Programming Genshin — Rust* will relish discussing Rust's special variable rules. In the near future, I will try running phase field code with Rust.

Oh, by the way, I've placed the code used in the blog in a [Github repository](https://github.com/A-moment096/Impl_Spinodal/), where you can obtain my source code; I've also created a new page [Attachment](/page/attachments) on the blog, where you can also get my code.

Finally, thank you for bearing with my rambling to this point. The next installment of this series may need to wait for some time, but the content has already been decided: we will return to the 1970s and see how *C language*, designed and implemented by Dennis Ritchie, can implement our phase field simulation. At that time, we will also make some adjustments to our simulation subject — after all, continuously watching a patch of gray mud split into mysterious red and blue blocks does get somewhat boring. So that's it! Thank you for reading. I wish you physical and mental well-being, happiness every day, and happy coding!~


[^1]: Source: [Speaking JavaScript, Chapter 4. How JavaScript Was Created](https://exploringjs.com/es5/ch04.html)
[^2]: Source: [JavaScript and the ECMAScript specification](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction#javascript_and_the_ecmascript_specification)
