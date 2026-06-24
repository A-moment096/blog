---
categories:
- Mathematics
# - Programming
# - Phase Field
# - Others
tags:
- Calculus
- Algebra
- Category Theory
- Notations
- Talk
title: "What Exactly Is a Function!?"
description: "A concept everyone uses, yet textbooks..."
date: 2025-09-23T17:41:51+08:00
image: /images/笔中的呓喃之境.jpg
math: true
license: 
hidden: false
comments: true
---

*We frequently encounter the so-called **function**, in mathematics, physics, and even in programs — we see its figure everywhere. Yet, what exactly is it? You may have an answer in your own heart. Here I'll venture to compare definitions of functions across various textbooks and chat about this concept that we may be very familiar with.*

*The featured image is still selected from [fasnakegod](https://www.pixiv.net/en/users/8605991)'s [笔中的呓喃之境](https://www.pixiv.net/en/artworks/115191853). It's truly beautiful, and Aya is so cute. The song is selected from a classic fingerstyle guitar piece: Masaaki Kishibe's "Time Travel" — light and pleasant. I like it very much (even tried learning it) (didn't succeed).*

{{<music auto="https://y.qq.com/yqq/song/000NZt2P0PPeoR" loop="none">}}

## Functions in My Impression

In my impression, functions should actually be quite common. There was this thing back in middle school.

### Middle School: Some Strange Formulas and Graphs

If I remember correctly, in middle school, textbooks would discuss so-called univariate functions: things that look like $y = kx+b$ are linear functions; and those in the final exam problems, looking like $y = a x^2 + b x + c$, are quadratic functions. Oh right, in the second expression, $a$ cannot be $0$, otherwise it would degenerate into a linear function. This was even an exam point. Back then, I naively believed that functions were just these things — oh, and also trigonometric functions, but those were too advanced and I couldn't understand them. In short, functions in middle school were very simple: they were just lines that were either straight or curved, with a formula you could calculate back and forth, and had some relation to equations. The exam just tested computing intersection points — that was all there was to it.

### High School: Correspondence Rules on Sets

Entering high school, based on the content from my copy of *Mathematics Compulsory Volume 1, People's Education Press, B Edition, April 2007, 3rd Edition*, we spent almost the entire first book studying what a function is. After introducing sets, their representation, and relationships and operations among sets with very concrete examples, we encountered **functions** in Chapter 2. The book began introducing functions by saying that in middle school, students had already learned the concepts of variables and functions:

> [!DEF] Functions and Variables (Middle School)
> 
> In a process of change, there are two variables $x$ and $y$. If, given a value of $x$, a unique value of $y$ is correspondingly determined, then we call $y$ a *function* of $x$, where $x$ is the *independent variable* and $y$ is the *dependent variable*.

It then indicated that with the development of mathematics, the definition of functions has also evolved, and then used sets from Chapter 1[^1]:

> [!DEF] Function, Domain, and Range (High School)
>
> Let set $A$ be a nonempty set of numbers. For any number $x$ in $A$, according to a definite rule $f$, there is a uniquely determined number $y$ corresponding to it. Then this correspondence relation is called a function on set $A$, denoted as
>
> $$y=f(x),x\in A,$$
> 
> where $x$ is called the independent variable, and the range of values that the independent variable takes (the set of numbers $A$) is called the **domain** of this function.
>
> If the independent variable takes value $a$, then the value $y$ determined by the rule $f$ is called the function value at $a$, denoted as
>
> $$y = f(a)\;\;\; \text{or}\;\;\; y\vert_{x = a},$$
>
> The set consisting of all function values
>
> $$\left\{y\,\vert\,y = f(x),x\in A\right\}$$
>
> is called the **range** of this function.
>
> The function $y = f(x)$ is also often written as function $f$ or function $f(x)$.

Thereupon, the textbook made the following statement:

> [!REM]
> 
> Because the range of a function is completely determined by its domain and correspondence rule, to determine a function only two elements are required: **the domain and the correspondence rule**.

In fact, this definition is nearly the definition we adopt when discussing problems day-to-day. It is perfectly adequate for discussing general problems. However, is it precise enough? Are mappings and functions the same thing? What is a functional? Regardless, the definition of functions from high school is definitely not the ultimate answer to this question. And to find this answer, we should move from elementary mathematics toward higher mathematics[^2].

<details>
<summary>I can't help but complain about the new edition high school math textbook</summary>

Let's take a look at how the new PEP (People's Education Press) high school math textbook introduces functions. To evaluate a book, one must first look at its table of contents:

![Chapter 1 Content](img/renjiao-toc1.png)

Not bad — beautifully bound, interesting illustrations, and content that's fairly detailed. A good starting point for entering a new mathematical context.

Let's look at Chapter 2... Wait a minute? Huh?

![?](img/renjiao-toc23.png)

What do you mean by introducing the univariate quadratic function first, and then the concept and properties of functions?

What kind of upside-down nonsense is this?

WTF is that?

I understand that middle school already introduced linear functions and quadratic functions — after all, exam problems test them. But, still, this is not a reason to introduce the concept of functions in this reversed order! Sigh, I'm dizzy. Let's not even discuss their definition of functions above.

Not a textbook I like — I'll just not reference it.

</details>

## Functions in Higher Mathematics

The vast majority of science and engineering students in domestic universities should all study *Higher Mathematics*. And among them, the math textbook chosen by a great many students' schools (or by themselves) is the famous *Tongji Higher Mathematics*, i.e., *Higher Mathematics, Edited by the School of Mathematical Sciences, Tongji University, Higher Education Press* (I always thought it was published by Tongji University Press — seems the new edition changed it). Let's take the first volume of the 8th edition and see how it introduces functions.

### The Function Definition in Tongji Higher Mathematics

Very interestingly, Tongji Higher Mathematics first establishes the distinction between "elementary mathematics" and "higher mathematics" right at the start:

> [!REM]
> 
> The objects of study in elementary mathematics are basically constant quantities, whereas the objects of study in higher mathematics are changing quantities.

And directly dives into functions — oh no, mappings? In its *Section 1.1 Mappings and Functions*, it first introduces both:

> [!REM]
> 
> Mappings are a fundamental concept in modern mathematics, while functions are the objects of study in calculus and are also a type of mapping.

Oh my, weren't we talking about functions? How did we jump to mappings? Since it says functions are a type of mapping, let's look at the definition of mappings:

> [!DEF] Mapping (Tongji Higher Mathematics)
>
> Let $X,Y$ be two nonempty sets. If there exists a rule $f$ such that for each element $x$ in $X$, according to the rule $f$, there is a uniquely determined element $y$ in $Y$ corresponding to it, then $f$ is called a mapping from $X$ to $Y$, denoted as
>
> $$ f\colon X\to Y,$$
>
> where $y$ is called the image of element $x$ (under the mapping $f$), and is denoted as $f(x)$, i.e.,
>
> $$y=f(x),$$
>
> and element $x$ is called a preimage of element $y$ (under the mapping $f$); the set $X$ is called the domain of the mapping $f$, denoted as $D_f$, i.e., $D_f = X$; the set consisting of the images of all elements in $X$ is called the range of the mapping $f$, denoted as $R_f$ or $f(X)$, i.e.,
>
> $$R_f = f(X) = \left\{f(x)\,\vert\, x\in X\right\}.$$

Why does this definition feel so similar to a function? So what is a function, then? The definition immediately following defines a function:

> [!DEF] Function (Tongji Higher Mathematics)
>
> Let the set of numbers $D\subset \mathbb{R}$. Then the mapping $f\colon D\to \mathbb{R}$ is called a function defined on $D$, usually abbreviated as
>
> $$ y=f(x),\, x\in D,$$
>
> where $x$ is called the independent variable, $y$ is called the dependent variable, $D$ is called the domain, denoted as $D_f$, i.e., $D_f = D$.

From this perspective, a function is indeed a special type of mapping: it replaces the domain and, umm? What is $Y$ in the definition of mapping? It's not the range, is it? Whatever — the sets inside are all replaced with things on $\mathbb{R}$. The domain is a subset of $\mathbb{R}$, and the other end of the arrow is $\mathbb{R}$. And a mapping? A mapping doesn't care what these two are — as long as they're sets, it's fine.

Compared with the high school definition, the main difference in this definition is that it is built on top of *mappings*, rather than directly giving us a definition as in high school. Additionally, it *seemingly* no longer conflates $y=f(x)$, $f(x)$, and $f$. Instead, it indicates that $f$ is the function, and $y = f(x)$ and $f(x)$ are the images of the element $x$. Why "seemingly"? Because if we look at mappings, it clearly distinguishes images from mappings. If this can be directly applied to functions, then the distinction is clear; however, in the definition of functions, we find that it once again says "usually abbreviated as."

Finally, the definition of functions in Tongji Higher Mathematics (and most fundamentally, the definition of mappings) does not explain a very important issue: where did $Y$ from the mapping definition go, and what is it?

However, Tongji Higher Mathematics is not the only one that records the definition of functions. There are so many higher math textbooks — let's look at others too.

### Function Definitions in Other Higher Math Textbooks

I obtained from a friend the higher mathematics textbook used at Hunan University. Although the name of this book is *University Mathematics*, whose full title is *University Mathematics Series Textbook (4th Edition) University Mathematics, Edited by the School of Mathematics, Hunan University, Higher Education Press*, it doesn't prevent it from being used for teaching general science and engineering students.

#### University Mathematics — Hunan University

This book does not assume some set theory content right from the beginning; instead, it introduces what sets are and their notation in the first section, then immediately introduces *mappings*, and formally introduces functions only in the second section. Let's look at its definition:

> [!DEF] Mapping (Hunan University Higher Math)
> 
> Let $A,B$ be two nonempty sets. If for every element $x\in A$, according to some definite rule $f$, there is a uniquely determined $y\in B$ corresponding to it, then $f$ is called a mapping from $A$ to $B$ (as illustrated), denoted as
>
> $$ f\colon X\to Y\;\;\;\text{or}\;\;\;f\colon x\mapsto y = f(x), x\in A.$$
>
> Here, $y$ is called the **image** of $x$ under the mapping $f$, and $x$ is called a **preimage** (or inverse image) of $y$ under the mapping $f$. $A$ is called the **domain** of the mapping $f$, denoted as $D(f) = A$. The totality of all images $y$ of elements $x$ in $A$ constitutes a set called the **range** of $f$, denoted as $R(f)$ or $f(A)$, i.e.,
>
> $$ R(f) = f(A) = \left\{y\,\vert\,y=f(x),\, x\in A\right\}$$
>
> The set $D(f)\times R(f) = \left\{ (x,f(x))\vert x\in A \right\}$ is called the **graph** of the mapping $f$.

What is particularly interesting is that the Hunan University textbook immediately mentions, after these definitions:

> [!REM]
>
> Depending on the different situations of the sets $A$ and $B$, in different branches of mathematics, "mapping" has different terms, such as "function," "functional," "operator," etc.

So? Mappings have this many identities? In different branches, the meaning of mapping is different? Let's look at this textbook's definition of functions:

> [!DEF] Function (Hunan University Higher Math)
>
> If $f$ is a mapping from a set of numbers $A\subset \mathbb{R}$ to $\mathbb{R}$, then $f$ is called a **univariate (real) function** on the set of numbers $A$ (abbreviated as function). This function is usually abbreviated as
>
> $$ y=f(x),\,x\in A.$$
>
> $x$ is called the **independent variable** of the function, $y$ is called the **dependent variable** of the function, $A$ is called the **domain** of the function, usually denoted as $D(f)$, and $f(A) = \left\{y\,\vert\,y=f(x),\, x\in A\right\}$ is called the **range** of $f$, denoted as $R(f)$. The set of points $C = \left\{(x,y)\,\vert y = f(x),\, x\in D(f) \right\}$ is called the graph (or image) of $y = f(x)$.

<span style="font-size: 0.6em">This definition is exactly the same as the earlier PEP Mathematics Compulsory Volume 1 A definition... What can I say?</span>

Comparing the definitions from the Hunan University textbook and the Tongji textbook, we find that they are largely similar with minor differences. The characteristic of the Hunan University textbook is that it actively uses some set notation — this may be because it covered set theory content in the first chapter; additionally, it mentions so-called graphs and images, which are *$x$ and $y$ wrapped in parentheses, separated by a comma*.

What? You say these are graph points? I can't agree. Because I don't know what exactly the meaning of these parentheses is. Though this is indeed splitting hairs, it shows that the Hunan University textbook is still not rigorous enough. Most importantly, both textbooks simultaneously and deliberately ignore that poor child on the right side of the arrow. What exactly is it?

#### Higher Mathematics — Central South University

Sadly, the book I used as an undergraduate is already lost (because I sold it); even more sadly, secondhand bookstores no longer sell this book! I searched through every book stall on campus and couldn't find it. How frustrating... I even searched for this book on the campus marketplace, only to get an answer that I had already ruled out long ago: it's not the *Higher Mathematics* published by Central South University Press, but the one published by Higher Education Press. Truly disheartening, too sad.

However, while obtaining this book that was not my target, I received news: actually, the editor-in-chief of this Higher Education Press *Higher Mathematics* is none other than the vice dean of the School of Mathematics and Statistics, Professor Zheng Zhoushun. At this moment, dead memories violently assaulted me — that's right, my higher math textbook seems to have been edited by him!

Anyway, after a long detour, I still managed to get a rebranded version of *Higher Mathematics (Volume 1), Editor-in-Chief Zheng Zhoushun, Deputy Editor-in-Chief Ren Yeqing, Higher Education Press*. Let's just treat it as published by Central South University Press. Enough rambling, let's look directly at the definition:

> [!DEF] Function (Central South Higher Math)
> 
> Let $D$ be a nonempty set of real numbers. If there exists a correspondence rule $f$ such that for any $x\in D$, according to the correspondence rule $f$, there is always a uniquely determined $y\in\mathbb{R}$ corresponding to it, then $f$ is called a **function** defined on $D$. It is usually abbreviated as
> 
> $$ y = f(x), x\in D,\ \text{or}\ f\colon x\mapsto y = f(x), x\in D, $$
>
> where $x$ is called the **independent variable**, $y$ is called the **dependent variable**, $D$ is called the **domain**, denoted as $D(f)$, i.e., $D(f) = D$.
>
> In the definition of a function, for each $x\in D$, according to the correspondence rule $f$, there is always a uniquely determined value $y$ corresponding to it. This value is called the **function value** of the function $f$ at $x$, denoted as $f(x)$, i.e., $y = f(x)$. This dependence relationship between the dependent variable $y$ and the independent variable $x$ is usually called a functional relationship. The totality of all function values $f(x)$ constitutes a set called the range of the function $f$, denoted as $R(f)$ or $f(D)$, i.e.,
>
> $$R(f) = f(D) = \left\{y\,\vert\,y=f(x),\, x\in D\right\}.$$

Actually, the notation is a bit messy... especially the abbreviated part. At the same time, it did not first introduce mappings, but directly defined a function as the correspondence between elements of a subset of the real number set and elements of the real number set. The other parts are also largely similar, but the advantage is that there is no ghost-like thing on the right side of the arrow — it directly says it is from elements of a nonempty real number set to elements of the real number set, bypassing this problem. It's concise and clear.

Right, besides domestic textbooks, they should study higher math abroad too, right? That's right — abroad they also study this content, but they generally call it *Calculus*. Let's look at the situation there:

### Function Definitions in Foreign Textbooks

First, let's look at the widely acclaimed *The Calculus Lifesaver*. Its English title is actually *The Calculus Lifesaver: All the Tools You Need to Excel at Calculus* — there is no place name "Princeton" in it.

Anyway, let's see how it handles these definitions. Given that this book was originally in English, and I believe everyone should be able to read English (maybe), I'll directly paste the English original text.

#### The Calculus Lifesaver

It gets straight to the point — after a few introductory sentences, it immediately gives the... definition of a function?

> [!DEF] Function (The Calculus Lifesaver)
>
> A *function* is a rule for transforming an object into another object. The object you start with is called the *input*, and comes from some set called the *domain*. What you get back is called the *output*; it comes from some set called the *codomain*.

Emmm, how to put it? Very colloquial. I find it hard to call this a "definition." Perhaps this is because this book was meant to be read slowly in just this way, using an approachable manner to understand these concepts. Yet we can still extract something different from it: what is the *codomain*? From its description, it seems that the *codomain* is what we call the range, because given an $x$, you get a $y$ from it. However, this is not the case, because it immediately gives the definition of *range*:

> [!DEF] Range (The Calculus Lifesaver)
>
> The *range* is the set of all outputs that could possibly occur.

Immediately following is this description:

> [!REM] Codomain and Range
>
> So why isn't the range the same thing as the codomain? Well, the range is actually a subset of the codomain. The codomain is a set of **possible** outputs, while the range is the set of actual outputs.

That explains all. *Codomain* is not the range. The range is the *range*, and the *codomain* is a large set in which the corresponding function values of elements could possibly appear. That is to say, the range is a subset of the *codomain*. Let us hereby formally reveal the Chinese translation of the so-called *codomain*: *陪域* (accompanying domain).

Although very colloquial, it resolves the problem we hadn't solved before! Moreover, such colloquial content seems to hide some details... Let's not worry about that for now. So, what about other textbooks? Let's look at a calculus textbook used by a group-chat friend in Canada: *Calculus: Single and Multivariable*, edited by Hughes-Hallett.

#### Calculus: Single and Multivariable

This book is even more direct — the very first sentence tells what a function is:

> [!REM]
>
> In mathematics, a *function* is used to represent the dependence of one quantity upon another.

And immediately there is a definition that looks quite agreeable:

> [!DEF] Function (Calculus: Single and Multivariable)
>
> A **function** is a rule that takes certain numbers as inputs and assigns to each a definite output number. The set of all input numbers is called the **domain** of the function and the set of resulting output numbers is called the **range** of the function. 
> 
> The input is called the *independent variable* and the output is called the *dependent variable*.

Disappointingly, this definition does not mention the codomain, but instead uses the domain and range approach like domestic textbooks. However, it at least appears concise. Additionally, in this textbook, the word *codomain* was not found — this is somewhat disappointing. Yet it is worth mentioning that *The Calculus Lifesaver*, which introduced the codomain above, still does not use the word *codomain* extensively — it appears only about 5 times in the entire text. But we can also look at another supremely famous book, *Thomas' Calculus*, written by George B. Thomas, Jr., one of the top-tier American-style textbooks.

#### Thomas' Calculus

It's still the familiar function opening, the familiar first introduction to the status of functions:

> [!REM]
>
> Functions are fundamental to the study of calculus. ...
>
> Functions are a tool for describing the real world in mathematical terms. ...

The prestige is maxed out (is "functions" plural + "are" + "a tool" singular really OK? ()). So what is the definition?

> [!DEF] Function (Thomas' Calculus, full version)
>
> ... the value of one variable quantity, say $y$, depends on the value of another variable quantity, which we often call $x$. We say that "$y$ is a function of $x$" and write this symbolically as
>
> $$ y = f(x) \ \ \ \text{("$y$ equals f of $x$")} $$
>
> The symbol $f$ represents the function, the letter $x$ is the **independent variable** representing the input value to $f$, and $y$ is the **dependent variable** or output value of $f$ at $x$.
>
> (The next line is the formal definition — note by AMoment)
> 
> A **function** $f$ from a set $D$ to a set $Y$ is a rule that assigns a *unique* value $f(x)$ in $Y$ to each $x$ in $D$.
> 
> The set $D$ of all possible input values is called the **domain** of the function. The set of all output values of $f(x)$ as $x$ varies throughout $D$ is called the **range** of the function.

Immediately following the content about the range (in the same paragraph) is an explanation about the range, $Y$, and the concept of a function:

> [!REM]
>
> The range might not include every element in the set Y. The domain and range of a function can be any sets of objects, but often in calculus they are sets of real numbers interpreted as points of a coordinate line.

It still doesn't say much about the codomain — it just lets the ghost-like $Y$ appear briefly and notes that the range does not always contain all elements in $Y$. However, an interesting point emerges: its definition of a function does not restrict the domain and the ghost $Y$ to number fields, but instead supplements later by saying that in calculus, functions are generally real numbers on a coordinate axis. So, its function is the *mapping* in our domestic higher math textbooks! Let's look back at *The Calculus Lifesaver* — it doesn't say what *the object* is! It only says the *input* and *output* come from two *sets*: domain and codomain. So, *The Calculus Lifesaver*'s function definition is also *biased* toward mapping.

Having looked at so many American textbooks, let's also look at a British textbook.

#### A British Textbook, Perhaps?

...Oh no, I only have one set of lecture notes provided by a friend to refer to. And moreover, the instructor, Theodore Voronov, is a Russian who graduated from Moscow State University... Anyway, we can look at how he defines a function in his lecture notes:

> [!DEF] Functional dependence (From Prof. Theodore Voronov.)
>
> In many cases application of mathematics to natural science and engineering deals with analyzing **functional dependence**. What is a functional dependence? We have one varying quantity described by a variable, say, $x$, and another quantity described by a variable, say, $y$, so that to each value of the first quantity, $x$, by a certain given law there corresponds a particular value (which should be uniquely defined) of the second quantity, $y$. We write this as
> 
>  $$ x\mapsto y \ \ \text{or} \ \ y = f(x) \ \ or \ \ y = y(x) $$
> 
> (here the letter $f$ is used to express a *functional law* by which y depends on $x$; but very often we simply write $y = y(x)$). The variable $x$ is called *independent variable* or the *argument* of the function. Respectively, $y$ is called *dependent variable* and $y = y(x)$ is called the value of the function (corresponding to a given value $x$ of the argument).

Rather than giving a definition of a function, it's more like describing what *functional dependence* is. In view of this, we get a glimpse of a perhaps higher perspective: this might be a universally existing relation, rather than something that only a specific thing (a function, a mapping) can carry. Additionally, we can see that the notation here is relatively casual: $y$ can equal $f(x)$, and can also equal $y(x)$, both expressing a functional relationship. I won't judge the quality of this notation, but I don't like it.

#### There's Even a Japanese High School Textbook

That's right — I somehow collected several translated Japanese high school math textbooks. The original author is the famous Japanese mathematician Kunihiko Kodaira, and the edition used is *Mathematics I, Edited by Kunihiko Kodaira, Jilin People's Publishing House*. As for why it appears in this collection of university-level higher mathematics textbooks, I think maybe you could ask the American calculus textbooks (). Let's also look at how it was written:

> [!DEF] Function (Japanese High School Textbook)
>
> Let $X$ and $Y$ be sets of numbers. Make each element of $X$ correspond respectively to a unique element $y$ of $Y$. This correspondence is called a **function** from $X$ to $Y$. A function may be denoted by letters $f$, $g$, etc.
>
> When $f$ is a function from $X$ to $Y$, the element $y$ of $Y$ that corresponds to the element $x$ of $X$ according to $f$ is called the value of $f$ at $x$, written as
>
> $$ y = f(x)$$
>
> Moreover, $X$ is called the domain of the function $f$. The set of all values $f(x)$ of $f$
> 
> $$\left\{f(x)\ \vert\ x \in X\right\} $$
>
> is called the range of $f$.
>
> Generally, $y = f(x)$ means that $y$ is a function of $x$. $x$ is called the **independent variable**, and $y$ is called the **dependent variable**.

Perhaps due to era, some translations, such as dependent variable and independent variable, adopted somewhat unusual translation choices. Additionally, this book directly skipped mappings and specified that a function is a correspondence from a set of numbers to a set of numbers — also a good way of handling it. Lastly, so in Japan they study functions in the very first high school math book? ()

### Summary

I believe that after reading so many definitions of functions from higher mathematics textbooks, you must be exhausted: none of these definitions satisfactorily address all the questions we raised. Only by combining them can we answer:

- What a function is, and how its notation is written;
- What a mapping is, and what relationship mappings and functions have;
- What exactly that mysterious set / set of numbers on the right side of the arrow is.

The root of this problem is perhaps that these textbooks are all *Higher Mathematics* textbooks. They don't care about other uses — they only care about how they are used within the textbook itself. We can see that very few textbooks mention the third question above, which is actually quite bizarre: everyone knows there's something there, and everyone pretends not to see it. Yet this is also understandable: throughout our study of these textbooks, we almost never need to use this elephant in the room.

So, since the definitions in *Higher Mathematics*, studied by ordinary science and engineering university students, cannot satisfy us, perhaps we should cast our gaze toward mathematics department textbooks, and see how mathematics departments handle the concept of a function, which is almost the most fundamental concept in mathematical research. Let's first start with *Mathematical Analysis*, which is not far removed from Higher Mathematics.

## Functions in Mathematical Analysis

I know of far more textbooks for mathematical analysis compared to higher mathematics. Here we pick these few to chat about:

- *Lectures on Mathematical Analysis — Chen Tianquan*
- *Mathematical Analysis — Mei Jiaqiang*
- *A Course in Mathematical Analysis — Chang Gengzhe, Shi Jihuai*
- *Mathematical Analysis — Chen Jixiu*
- *Lecture Notes for a Course in Mathematical Analysis — Yu Pin*
- *Mathematical Analysis I — Vladimir A. Zorich*
- *Principles of Mathematical Analysis — Walter Rudin*
- *Analysis — Terence Tao*
- *Roger Godement — Analysis I: Convergence, Elementary Functions*

Among them, the first four books are widely used domestic textbooks; the fifth is actually lecture notes but very comprehensive, so we reference it too; the latter several are foreign mathematical analysis textbooks: the famous Zorich, Rudin, Tao, and Godement, representing mathematics textbooks from Russia, America, Australia, and France, respectively. Since these book titles are all too similar — all being something-something Analysis — and their authors are all very famous (almost synonymous with the book itself), we adopt the professors' names when the book has no nickname; when there is a nickname, we use the more lighthearted and humorous nickname. Finally, it should be mentioned that due to the connection between functions and mappings, we also include mappings as objects of investigation.

### Definitions in Domestic Textbooks

Let's first point out that the vast majority of mathematical analysis textbooks must discuss a fundamental issue: how the real numbers are constructed. Some books choose to place this in the first chapter, while others place it in the second chapter, with the goal of first introducing some more basic concepts in the first chapter to facilitate later use. For example, the *Lectures on Mathematical Analysis* edited by Professor Chen Tianquan of Peking University adopts the approach of discussing real numbers later. We are thus able to directly first look at the definition of functions that we care most about.

#### Chen Tianquan

After briefly introducing the basic situation of sets, the first thing we see is the definition of mappings:

> [!DEF] Mapping (Chen Tianquan)
>
> A **mapping** $\varphi$ from set $A$ to set $B$ refers to a rule according to which each element $x \in A$ has an element $y \in B$ corresponding to it. Two of the following notations are commonly used to denote such a mapping (correspondence relation):
>
> $$ y = f(x) $$
>
> or
>
> $$ \varphi\ \colon A\to B,\ \varphi\ \colon x\mapsto y.$$
>
> $A$ is called the **domain** of the mapping $\varphi$. $B$ is called the **target domain** of $\varphi$. The element $x$ in $A$ is called the **independent variable** of the mapping, and $y$ is called the **dependent variable**. When the target domain of the mapping is $\mathbb{C}$, the mapping is also often called a **function**. Sometimes (as in algebra or geometry), mappings are also called **transformations**. A mapping, function, or transformation is often denoted as $\varphi$, and sometimes also denoted as $\varphi(x)$.

<span style="font-size: 0.6em">Illusion of Mathematical Genshin ()</span> We won't write out the definitions of image, range, preimage, etc. As can be seen, here we directly face that concept that we felt was evasive in higher mathematics: that strange ghost is called the *target domain*. Unfortunately, the name *codomain* was not used here, but target domain is also very appropriate. Moreover, it adopts the statement that *when the target domain is the complex number field, we call the mapping a function*. This is different from every one we've seen before: it only restricts the target domain of the mapping, without considering the domain; it also directly restricts the target domain to the complex number field, which from a certain angle is indeed not problematic, but is also quite bold (). It's a pity I haven't carefully read this book — I believe it must also be a very splendid book.

Let's continue. Look at another famous analysis textbook, *Mathematical Analysis* edited by Professor Mei Jiaqiang of Nanjing University, which came out with its second edition in 2020.

#### Mei Jiaqiang

Drumroll:

> [!REM] Introduction to Chapter 1 Introduction
>
> In this chapter, we briefly introduce common methods and common concepts in analysis. Some basic concepts, such as sets and mappings, everyone has already studied in middle school courses, so we will not introduce them in detail here. ...

What... It's actually like this? However, the good news is that we have another book, or rather lecture notes, by Professor Mei: *Lectures on Mathematical Analysis*. This book, compiled between 2006 and 2010, gives the definition of mappings in a structured manner:

> [!DEF] Mapping (Mei Jiaqiang)
>
> Let $X$, $Y$ be sets. If for each element $x \in X$, there is a unique element $y$ in $Y$ corresponding to it, then this kind of correspondence relation is called a mapping from $X$ to $Y$, denoted as
>
> $$f\ \colon X\to Y,\ \ y = f(x),$$
>
> or
>
> $$f\ \colon X\to Y,\ \ x\mapsto f(x),$$
> 
> We call $y = f(x)$ the image of $x$ under $f$, and call $x$ a preimage or inverse image of $y$. The set $X$ is called the domain of the mapping $f$. The set $f(X)$ consisting of all images of $f$ is a subset of $Y$, called the range of $f$, i.e.,
>
> $$f(X) = \left\{ f(x)\ \vert\ x\in X \right\}. $$
> 

And an annotation:

> [!REM] Annotation after the Mapping Definition
>
> Mappings are sometimes also called **functions**, especially when $Y \subset \mathbb{R}$ is a set of numbers. Usually, the mapping is also written as $y = f(x)$ or $f(x)$, in which case $x$ is also called a variable or independent variable, and $y$ is also called a dependent variable. If $X, Y \subset \mathbb{R}$ are both sets of numbers, the mapping $f \colon\ X \to Y$ is also called a univariate function, or a univariate real-valued function, or a univariate real function.

We first notice an interesting place: Professor Mei adopts *象* (elephant) instead of the more commonly seen *像* (likeness) we've seen earlier. I acknowledge that this way of writing does exist, but I also don't know the reason for writing it this way. But, we can consider this as a modern-day phonetic loan character, hahaha. Returning to the main topic, the definition of mappings here is standard, though the notation is a bit shaky ($Y$'s unique element $y$, without using logical notation), and unfortunately does not mention the name of $Y$. However, what is said in the annotation about functions is different again: a mapping is a function, and when $Y$ (which we know is the codomain/target domain) is a subset of the real number set, it is *even more so*; and if both $X$ and $Y$ are subsets of real numbers, it is directly called a *univariate function* or *univariate real-valued function* or *univariate real function*. It feels like accidentally walking into a boss room — how did real functions suddenly appear? But it is understandable: this is discussing this function from three aspects — only describing the number of variables, emphasizing the codomain, and emphasizing the domain.

Then, how does *A Course in Mathematical Analysis*, edited by Professors Chang Gengzhe and Shi Jihuai of USTC, introduce these concepts?

#### Shi Jihuai

I must first mention that even though two professors participated in editing this book, everyone still likes to call it Shi Jihuai. So let's use the more commonly used name here. Additionally, this book is a relatively popular textbook, but its reputation is somewhat average: it is said to have some errors and omissions, and some definitions are not rigorous enough. On the other hand, the advantage of this book is that the quality of its exercises is very high, and in his lectures (available on Bilibili), Professor Shi Jihuai mentions which places have errors and lack rigor. Given that this book is indeed used by so many people, it's hard for us not to reference its definition of functions.

> [!DEF] Mapping (Shi Jihuai)
>
> Let $A$, $B$ be two sets. If $f$ is a rule such that for each element $x$ in $A$, there is a uniquely determined element in $B$ — denoted as $f(x)$ — corresponding to $x$, then $f$ is called a **mapping** from $A$ to $B$, expressed using
>
> $$ f\colon\ A\to B$$
> 
> The set $A$ is called the **domain** of the mapping $f$; $f(x)\in B$ is called the **image** of $x$ under the mapping $f$, or the **value** of $f$ at $x$.

Unfortunately, its definition seems somewhat pale. I also checked the later content, and it still doesn't discuss the matter of the codomain. And what about the function part?

> [!REM] Functions
>
> Functions are a special class of mappings. If for the mapping $f\colon\ X\to Y$, both $X$ and $Y$ consist of real numbers, then $f$ is called a function. In short, a function is a mapping from real numbers to real numbers. To be more precise, $f$ is a single-variable function.

Personally, I'm not very fond of the phrasing *both $X$ and $Y$ consist of real numbers*. Since basic set-theoretic notation has already been introduced, why not clearly express it using subsets? Such colloquial phrasing gives me an impression: $X$ and $Y$ are both the set of real numbers. I hope the video lectures can make up for these issues.

Next, let's look at the *Mathematical Analysis* textbook edited by Professor Chen Jixiu of Fudan University:

#### Chen Jixiu

After introducing some content on sets, we immediately get the definitions of mappings and functions:

> [!DEF] Mapping (Chen Jixiu)
>
> Let $X$, $Y$ be two given sets. If, according to some rule $f$, for each element $x$ in the set $X$, one can find a uniquely determined element $y$ in the set $Y$ corresponding to it, then this correspondence rule $f$ is called a **mapping** from the set $X$ to the set $Y$, denoted as
>
> $$\begin{align*}f\colon\ &X\to Y \\ &x\mapsto y = f(x)\end{align*}.$$
>
> Here $y$ is called the **image** of $x$ under the mapping $f$, and $x$ is called an **inverse image** (also called **preimage**) of $y$ under the mapping $f$. The set $X$ is called the **domain** of the mapping $f$, denoted as $D_f$. And under the mapping $f$, the totality of the images $y$ of the elements $x$ in $X$ is called the **range** of the mapping $f$, denoted as $R_f$, i.e.,
>
> $$R_f = \left\{ y\ \vert\ y\in Y\ \ \text{and}\ \ y = f(x),\ x\in X \right\}.$$

Still no mention of the codomain — disappointing. However, I really like the notation for mappings here: after determining the domain and codomain of the mapping, then determine how to map the variable $x$ to its image. Right, its definition of a function is:

> [!DEF] Univariate Real Function (Chen Jixiu)
>
> If in Definition 1.2.1 (the definition of mapping) we specially take the set $X\subset\mathbb{R}$, and the set $Y = \mathbb{R}$, then the mapping
> 
> $$\begin{align*}f\colon\ &X\to Y \\ &x\mapsto y = f(x)\end{align*}.$$
>
> is called a **univariate real function**, abbreviated as **function**. Since what a function represents must be a correspondence relation between sets of real numbers and sets of real numbers, in its mapping representation, the first line is unnecessary. It suffices to write
>
> $$ y = f(x), x\in X(=D_f)$$
> That's all — read as "function y = f(x)" or "function f." Here $f$ represents a correspondence rule; for each $x\in D_f$, it determines the unique $y=f(x)\in \mathbb{R}$ corresponding to $x$.

We can see that here the function is directly restricted to a univariate real function. This is perhaps also unobjectionable — after all, choosing an appropriate definition according to the needs of use is no problem. What's interesting is that Professor Chen specially introduces how the notation is read, and the notation $y = f(x) \in \mathbb{R}$ appears here. This notation indicates that the $f(x)$ on the right side is an element of the set of real numbers. Reading this notation might feel confusing at first, but one only needs to view $f(x)\in\mathbb{R}$ as a whole.

Finally, let's glance at how Professor Yu Pin of Tsinghua University handles these definitions in his *Lecture Notes for Mathematical Analysis*.

#### Yu Pin

Bad news: Professor Yu Pin's lecture notes don't discuss overly basic things like mappings and functions. He starts from the axiomatic system of real numbers, defining what a field is using algebraic methods, and in this process very naturally uses the two concepts of functions and mappings. Should one say, as expected of Tsinghua's lecture notes? Yet we can still observe from within how mappings and functions are treated in Professor Yu Pin's lecture notes.

Through some searching, we can see that the use of the word "function" in these lecture notes is mainly concentrated on terms like power functions, distance functions, exponential functions, trigonometric functions, etc., while mappings appear for all sorts of sets. Therefore, the definition of mappings should still be the same as the definition we've long been familiar with, while functions still have a special codomain (perhaps also a restricted domain). Let's not chat more about the content in this book — its very modern presentation is quite intimidating.

Having sampled the domestic materials, let's try the few foreign books and see how they handle this issue.

### Definitions in Foreign Textbooks

Let's first look at "the best mathematical analysis textbook in Russia," Zorich:

#### Zorich

After Zorich finishes introducing sets, the function section directly presents *The Concept of a Function (Mapping)* — i.e., it seems to directly connect functions and mappings:

> [!DEF] Function (Zorich)
>
> Let $X$ and $Y$ be certain sets. We say that there is a *function* defined on $X$ with values in $Y$ if, by virtue of some rule $f$, to each element $x \in X$ there corresponds an element $y \in Y$.
> 
> In this case the set $X$ is called the *domain of definition* of the function. The symbol $x$ used to denote a general element of the domain is called the *argument* of the function, or the *independent variable*. The element $y_0 \in Y$ corresponding to a particular value $x_0 \in X$ of the argument $x$ is called the value of the function at $x_0$, or the value of the function at the value $x = x_0$ of its argument, and is denoted $f (x_0)$. As the argument $x \in X$ varies, the value $y = f (x) \in Y$, in general, varies depending on the values of $x$. For that reason, the quantity $y = f (x)$ is often called the *dependent variable*.
>
> The set
>
> $$ f(X)\ \coloneqq \left\{ y\in Y \ \vert\  \exists x \ \left( (x\in X) \land (y = f(x)) \right) \right\} $$
>
> of values assumed by a function on elements of the set $X$ will be called the *set of values* or the *range* of the function.

It gives the definition of a function! It doesn't give the definition of mappings. But is that really so? Observing this definition carefully, we can find that the *function* defined here seems like it should actually be the *mapping* we've frequently discussed earlier. Additionally, we can see that logical predicates are employed here: that upside-down E is actually the existential quantifier, and that little wedge is the so-called *and*. The element filtering condition of this set is: there exists an $x$, which is an element of $X$, and at the same time, the result of $f(x)$ is denoted as $y$. This is truly very novel. However, the bad news is that the definition here still does not mention *codomain* — it still doesn't explicitly say what $Y$ here is.

Interestingly, the content after it is like a spoiler, giving us many novel things, and pointing out that they are all functions as defined here, just differing in the domain and the specific sets of concern:

> [!REM]
>
> The term "function" has a variety of useful synonyms in different areas of mathematics, depending on the nature of the sets $X$ and $Y$: *mapping*, *transformation*, *morphism*, *operator*, *functional*. The commonest is *mapping*, and we shall also use it frequently.
> 
> For a function (mapping) the following notations are standard:
>
> $$ f\ \colon\ X\to Y,\ \ \ X \xrightarrow[]{f} Y.$$
>
> When it is clear from the context what the domain and range of a function are, one also uses the notation $x \mapsto f (x)$ or $y = f (x)$, but more frequently a function in general is simply denoted by the single symbol $f$.

Good heavens, so many strange terms. Let's simply give their translations here. They are: mapping; transformation; morphism; operator; functional. Here there's a bit of a spoiler: it has already told us that the ideas behind many concepts are consistent. It also mentions that we usually use many different notations to express a function.

Overall, Zorich's definition of functions gives us the greatest inspiration from two points: the use of sets with logical predicates, and the spoiler-like elaboration of the connections behind many concepts. Then, how does the likewise-famous Baby Rudin define functions?

#### Baby Rudin

Why is this *Principles of Mathematical Analysis* called Baby Rudin? It's actually because the elder Rudin wrote three analysis textbooks — one is this book we are referencing, another is *Real and Complex Analysis*, and the last is *Functional Analysis*. And because the difficulty of these three books increases step by step, they were crowned with the titles Baby, Papa, and Grandpa Rudin.

Although Baby Rudin is said to be the easiest in difficulty, my assessment after finishing it is that it's not easy. As the first math textbook I finished reading, Rudin's content introduction is very interesting: he first introduces order structure, immediately followed by the concept of algebraic fields, and finally, through these two things introduced, brings in the real number field (and the extended real number field) and the complex number field to Euclidean space. I hadn't anticipated this order when I first read it. Yet what's even more magical is that all of the above did not rely on any concept of functions or mappings. Precisely for this reason, it only introduced the concept of functions in Chapter 2, and the content of this chapter is called Topology. (Even more magical: the entire chapter talks about topology, and only the table of contents of the whole book has the word Topology.)

So how does it define functions?

> [!DEF] Function (Baby Rudin)
>
> Consider two sets $A$ and $B$, whose elements may be any objects whatsoever, and suppose that with each element $x$ of $A$ there is associated, in some manner, an element of $B$, which we denote by $f(x)$. Then $f$ is said to be a *function* from $A$ to $B$ (or a *mapping* of $A$ into $B$). The set $A$ is called the *domain* of $f$ (we also say $f$ is defined on $A$), and the elements $f(x)$ are called the values of $f$. The set of all values of $f$ is called the *range* of $f$.

It seems to be the same as Zorich, adopting the *function = mapping* statement, and this book does not use formalized language to narrate this definition — perhaps that's the charm of American textbooks. Equally disappointing is that it does not explain what $B$ is. How to put it — it's still a bit disappointing. But no matter, let's forge ahead and look at another famous analysis textbook: how Terence Tao's textbook defines functions.

#### Terence Tao

Although I haven't read this book, its table of contents is very appealing: the first chapter first introduces not "sets," "number systems," or that sort of content, but an "Introduction" with two subsections, "What is analysis?" and "Why do analysis." I feel I must find the time to read this part — it's sure to be very interesting. And in the second chapter, it also doesn't directly start with content we'd notionally consider analysis; instead, it first introduces the so-called Peano axioms, as well as addition and multiplication — clearly intending to build up from the natural numbers step by step to the real number system. Finally, in Chapter 3, it discusses set theory, and within it, discusses functions. First, it conceptually talks about what functions are:

> [!REM] Function
>
> In order to do analysis, it is not particularly useful to just have the notion of a set; we also need the notion of a *function* from one set to another. Informally, a function $f \colon X \to Y$ from one set $X$ to another set $Y$ is an operation which assigns to each element (or "input") $x$ in $X$, a single element (or "output") $f(x)$ in $Y$; we have already used this informal concept in the previous chapter when we discussed the natural numbers. 

Ha, seems he already used this informal definition back in the natural numbers part. But from here we can also see that this book also takes the *function = mapping* route, because you can see that a function is from one set to another set. But the formal definition is below — let's take a look:

> [!DEF] Function (Terence Tao)
>
> Let $X$, $Y$ be sets, and let $P(x, y)$ be a property pertaining to an object $x \in X$ and an object $y \in Y$, such that for every $x \in X$, there is exactly one $y \in Y$ for which $P(x, y)$ is true (this is sometimes known as the *vertical line test*). Then we define the *function* $f \colon X \to Y$ defined by $P$ on the *domain $X$ and range* $Y$ to be the object which, given any input $x \in X$, assigns an output $f(x) \in Y$, defined to be the unique object $f(x)$ for which $P(x, f(x))$ is true. Thus, for any $x \in X$ and $y \in Y$,
> 
> $$y = f(x) \iff P(x, y)\text{ is true.}$$

Its definition is very interesting, using a concept we hadn't used before: "property." It still takes elements from two sets, then requires that $P$ be such a property: every $x\in X$ must have a unique $y\in Y$ such that the property $P(x,y)$ is true, and calls it the "vertical line test." Finally, it makes the function a mathematical object that can receive an $x \in X$ with result in $Y$, and then lets this object and $x$ and $f(x)$ make $P(x,f(x))$ true. This definition is also expressed using an expression. It somehow has a feeling of putting on pants just to fart, but it also very well embodies the characteristic of functions as *mathematical objects*: it is not merely a relation, but also an operable mathematical object.

Another gratifying point is that it gives that $Y$ as well. Here it's called... *range*? Huh? Why the word for "range"? Then what about the range? It seems it abandons the concept of range and instead directly uses *image*. From the subsequent definition of *onto functions* we can also see that it indeed seems to have chosen to use *range* as the name for that mysterious set. Although it might be different from what we expected, and it seems most mathematicians don't use *range* for this concept, the content in this book is self-consistent, which is enough. Additionally, it also has an annotation at the end:

> [!REM]
>
> Functions are also referred to as *maps* or *transformations*, depending on the context. They are also sometimes called *morphisms*, although to be more precise, a morphism refers to a more general class of object, which may or may not correspond to actual functions, depending on the context.

It is very clear — it also holds the *function = mapping* view, except that here it uses *map* instead of *mapping*. Perhaps Australians like to say it this way, but *map* is generally used as a verb meaning "to map to," while *mapping* is the gerund form, meaning the concept of mapping. Well, no big problem. Then let's finally look at this textbook by the French mathematician Godement.

#### Godement

When I searched for this person's name in my own library, I only found a copy of *A Tutorial on Algebra*, translated by a domestic teacher. And how did I learn about the analysis textbook he wrote? I learned about it from Professor Liu Siqi of Tsinghua University (he has his own Bilibili page: [我真的不懂分析](https://space.bilibili.com/85657899)) and his video [如何选择一本适合你的《数学分析》教科书？北京某高校数学老师为你揭示选书的秘密](https://www.bilibili.com/video/BV1xp4y1e7Nh/). Actually, some of the textbooks chosen earlier were learned about from this video, including Godement chosen this time. Considering I found the English translation and I can't read French, I'll still refer to this English translation.

Looking at the table of contents, this book first introduces set theory, immediately followed by functions. However, its language, to be honest, is relatively long: it doesn't just define functions — it even gives some historical context to the development of this definition. Let me put its description below. For ease of reading, I've folded it, and then provided some summary below. If you don't want to read it, feel free to skip this text. To be honest, it really is quite long.

<details>
<summary>Definition of Function: Godement</summary>

The concept of the cartesian product allows one to introduce the general
concept of a *function* or *map*, which is as fundamental as that of a set and
which, as we shall see, reduces to it as do all others. In elementary education
and in the whole history of mathematics up to the beginning of the XIX<sup>th</sup>
century, a function was given by a "formula" such as $f (x ) = x^2 - 3$, $f (x) =
\sin x$, etc., but starting with Descartes one often also defined a function from a
curve whose "equation" one sought. For experimental scientists and engineers
a function is very often also given by its *graph*, the geometrical locus of those
points $(x , y)$ in the plane such that $y = f( x)$ for a function $f$ which, quite
often, one does not really know.

Starting with the XIX<sup>th</sup> century the concept of a function ceased to be
associated with a simple or complicated "formula"; the German Dirichlet for
example speaks of the function equal to 0 if $x$ is a rational number and to 1
if $x$ is irrational, and one later envisaged much stranger functions, until the
general and abstract concept emerged of a *function defined on a set $X$ and
having values in a set $Y$*; such a function $f$ associates to every $x \in X$ a well
determined $y = f (x) \in Y$ depending on $x$ according to a precise rule. The
graph of $f$ is then the set of ordered pairs $(x , y) \in X \times Y$ such that $y = f (x)$
for every $x \in X$. One encounters this in everyday life: if, in a monogamous
society, one denotes by $H$ the set of married men and by $F$ the set of women,
the relation "$y$ is the wife of $x$" is a function with values in $F$ defined on $H$.
Its graph is clearly a set of ... couples.

Conversely, a subset $G$ of $X \times Y$ is the graph of a function $f$ provided that
$G$ has the following property: for every $x \in X$ there exists one, and only one,
$y \in Y$ such that $(x , y) \in G$; and then one writes $y = f( x)$ . This convention
allows one to reduce the concept of a function to that of a set: *by definition*
a function defined on X with values in $Y$ *is* a subset of $X \times Y$ subject to the
preceding condition; no longer is there a "formula".
</details>

It constructs the concept of functions starting from the Cartesian product. It first introduces how in the 19th century, people's definition of functions was limited to having an expression, or engineers needed a graph; then the strange function defined by the German mathematician Dirichlet — the function that takes 0 at rational points and 1 at irrational points (the so-called Dirichlet function) — made people rethink the concept of functions, settling on the idea that an $x$ in one set must have a unique correspondence to another set. And using the Cartesian product, we can construct the graph of a function: a subset of the Cartesian product $X \times Y$, whose elements (ordered pairs) have the property that their first component $x\in X$ has a uniquely determined $y$ in $Y$ corresponding to it. It is truly an ingenious approach: by characterizing the graph of a function, it simultaneously describes in reverse how a function ought to be defined.

Even though I've never read this book before, this passage still fascinates me very much. And I also roughly looked at the subsequent content — it's extremely meticulous, introducing many details of notation and concepts, including questions like "what if this correspondence relation is not unique?" Additionally, it also claims *function = map*, which can be seen from the later descriptions of the notation and naming of functions. Unfortunately, it does not point out any special name for $X$ or $Y$: a function is simply *defined on* $X$, and *has its values in $Y$*.

Considering that Godement also has an algebra textbook, we can, in the algebra section later, also see how he defines functions within algebra.

### Summary

After looking at these definitions of functions in calculus and mathematical analysis here, we can see that they mainly hold two attitudes. The first is the more finely-grained classification commonly used in domestic textbooks: a mapping is a correspondence relation from a set to a set, while a function requires that either the codomain of the mapping, or both the domain and codomain together, be restricted to some number field (real numbers or complex numbers). Unfortunately, most domestic textbooks do not mention the word "codomain" — it is rather some foreign textbooks that mention the name of that set on the right side of the arrow. And the second attitude is precisely the less finely-grained statement commonly adopted by foreign textbooks: a function is a mapping, and a mapping is also a function. A function can even be many other (more) things: morphisms, transformations, operators, functionals, etc. However, in the details of the definition, several textbooks seem to diverge: some are similar to domestic textbooks, such as Zorich and Baby Rudin; Terence Tao uses a relation-function approach, while Godement is the most unique, using a graph-function definition method.

However, it cannot be denied that both types of definitions first express: a function must be a correspondence relation from a set to a set. And if you know something about algebra, especially abstract algebra, you certainly understand that a major characteristic of algebra lies in studying the relationships among mathematical objects. And functions — or rather, this relation between sets — inevitably become one of the foundational objects of study in algebra. Next, let's look at how functions are introduced in algebra.

## Functions in Algebra

Since algebra generally starts from abstract algebra / modern algebra, which are specialized courses for mathematics majors, we no longer need to look at content that ordinary science and engineering students need to learn. Here, the textbooks we choose still include several domestic ones and several foreign ones, covering as many countries as possible to appreciate the styles of each country. Here we choose these books:

- *Qiu Weisheng — Advanced Algebra*
- *Yao Musheng, Wu Quanshui, Xie Qihong — Advanced Algebra*
- *Roger Godement — Algebra*
- *Paolo Aluffi — Algebra: Chapter 0*
- *Serge Lang — Undergraduate Algebra*
- *Thomas W. Hungerford — Algebra*
- *A. I. Kostrikin — Introduction to Algebra*
- *A. L. Gorodentsev — Algebra I*

We've chosen these books, but here we mainly select foreign textbooks. Domestically, we only chose the widely-used *Advanced Algebra* by Professor Qiu Weisheng of Peking University, and the equally popular *Advanced Algebra* by Yao Musheng and Xie Qihong. Among the foreign textbooks, we'll first look at what the French mathematician Godement, whom we've already seen, writes in his algebra book; then we'll look at the works of three American mathematicians — *Algebra: Chapter 0* by Paolo Aluffi (the famous *Chapter 0*, a very good book), *Undergraduate Algebra* by Serge Lang (a French-American mathematician, author of the famous *GTM 211*), and the renowned *GTM 73*: *Algebra* by Thomas Hungerford. Lastly, let's appreciate the works of two Russian mathematicians: Kostrikin's *Introduction to Algebra* (which has a Chinese translation, but the translation is generally so-so, so here we choose the English translation), and *Algebra I* by Gorodentsev, a book with a relatively higher and newer viewpoint.

To be honest, I think we are already quite familiar with many concepts. So here, when I excerpt definitions, I'll only excerpt parts with strong logical relevance. And when some concepts, such as "image," "preimage," etc., are not closely connected to the surrounding text (not in the same paragraph), we won't excerpt them here. Finally, I want to say that I recommend reading the context surrounding these definitions in these algebra textbooks. Some content, due to my selective excerpting, will become somewhat puzzling. Therefore, I strongly recommend still looking at their original texts — at least the context of these definition parts is worth reading.

### Domestic

The most famous domestic advanced algebra textbooks I know are these two. The reason for choosing advanced algebra here is mainly that domestic algebra textbooks generally no longer introduce the foundational concept of "function" in abstract algebra, while this concept is still mentioned in advanced algebra. So, the two books chosen here are advanced algebra books. The first, by Professor Qiu of Peking University, should be the advanced algebra textbook for many schools; the second is the famous "Commander Xie" — the advanced algebra textbook edited by Yao Musheng, Wu Quanshui, and Xie Qihong of Fudan University. Why "Commander Xie"? It seems because Professor Xie is very handsome; secondly, on Bilibili there is an advanced algebra course taught by Professor Xie, using the textbook they edited, so this book is sometimes simply referred to as Xie Qihong.

Enough idle chatter — let's begin.

#### Qiu Weisheng

Let's first look at Qiu's treatment. In this 2013 edition textbook, the definition of mappings is placed right at the very beginning of the entire textbook. Interestingly, we'd generally consider learning about sets first, but here it directly states that "the concept of a set cannot be defined; it can only be described." From a certain angle, if we don't use axiomatic set theory, this is indeed true. Of course, algebra probably doesn't need to go this deep.

> [!DEF] Mapping (Qiu Weisheng)
>
> Let $A$ and $B$ be two nonempty sets. If from set $A$ to set $B$ there is a correspondence rule $f$ such that each element $a$ in $A$ has a uniquely determined element $b$ in $B$ corresponding to it, then $f$ is called a **mapping** from set $A$ to $B$, denoted as
>
> $$\begin{align*} f\colon &A\to B\\& a\mapsto b, \end{align*}$$
>
> where $b$ is called the **image** of $a$ under $f$, and $a$ is called a **preimage** of $b$ under $f$. The image of $a$ under $f$ is denoted by the symbol $f(a)$. Thus the mapping $f$ can also be written as
>
> $$f(a) = b\ \ \text{or}\ \ b = f(a),\ \ \ a\in A$$
>
> Two sets $A$ and $B$ must be given in advance in order to speak of a mapping from $A$ to $B$. Let $f$ be a mapping from set $A$ to set $B$. Then $A$ is called the **domain** of $f$, and $B$ is called the **codomain** of $f$. A mapping $f \colon\ A \to B$ consists of the domain, codomain, and correspondence rule. Therefore, if the mapping $f$ and the mapping $g$ have the same domain, the same codomain, and the same correspondence rule, then $f$ and $g$ are said to be **equal**, denoted as $f = g$. The so-called "same correspondence rule" for $f$ and $g$ means that for every element $a$ in the domain, $f(a) = g(a)$.
>
> Let $f$ be a mapping from set $A$ to set $B$. The set consisting of the images of all elements of $A$ under $f$ is called the range or image (set) of $f$, denoted as $f(A)$ or $\operatorname{}{Im}(f)$, i.e.,
> 
> $$f(A) \coloneqq \left\{f(a)\ \vert\ a \in A\right\}.$$
> 
> The symbol "$\coloneqq$" in the formula means "is defined as," i.e., the $f(A)$ next to the colon is defined by the set next to the equals sign. From the definition of a mapping and this formula we deduce that $f(A) \subseteq B$, i.e., the range of $f$ is a subset of the codomain of $f$.

We can see that Qiu here very explicitly states that $B$ is the so-called *codomain*, and simultaneously points out the three important elements of a mapping: domain, codomain, and correspondence rule. When these three elements of two mappings are equal, we say the two functions are equal. Moreover, it directly points out that the image set / range is a subset of the codomain. After a long sequence of content related to mappings is exhaustively narrated, two additional sentences are supplemented:

> [!REM] Transformations and Functions
>
> A mapping from set $A$ to itself is called a **transformation** on $A$.
>
> A mapping from set $A$ to a set of numbers (a subset of the number field $K$) is called a **function** on $A$.

That's right — here two concepts are given: transformations and functions. Transformations are defined as mappings from a set to itself, while functions are defined as mappings from a set to a set of numbers. This is compatible with some of the domestic textbook definitions we saw earlier. Then how about the *Advanced Algebra* from Fudan University Press?

#### Xie Qihong

This book is also very popular, but its introduction of mappings comes relatively late. Because it starts from matrices, determinants, systems of linear equations, etc. — akin to introducing "how to do the basic four arithmetic operations in a new space" — there isn't an urgent need for mappings / functions. And for this reason, the concept of mappings is not brought up until Chapter 4, in the part on linear mappings, and it is introduced under the guise of *review*:

> [!REM] Mappings (Xie Qihong)
>
> The reader has already studied the concept of mappings. Let us now review it. A so-called mapping refers to a correspondence $\varphi\colon\ A\to B$ from one set $A$ to another set $B$. For any element $a$ in $A$, there is a unique element $b\in B$ corresponding to it, denoted as $b = \varphi(a)$. The element $b$ is called the image of $a$ under $\varphi$, and $a$ is called a preimage or inverse image of the element $b$. The totality of the images of elements in $A$ under $\varphi$ forms a subset of $B$, denoted as $\varphi(A)$ or $\operatorname{Im}\varphi$. If $\operatorname{Im}\varphi = B$, i.e., for any element $b$ in $B$, there is an element $a$ in $A$ such that $b = \varphi(a)$, then $\varphi$ is called a surjective mapping or an onto mapping. If a mapping $\varphi$ satisfies the following condition: if $a\neq a'$, then $\varphi(a)\neq\varphi(a')$, then $\varphi$ is called an injective mapping. Another equivalent statement for an injective mapping is that from $\varphi(a) = \varphi(a')$ one can deduce $a = a'$. If $\varphi$ is both injective and surjective, then $\varphi$ is called a bijection. In this case, not only does each element in $A$ have one and only one element in $B$ corresponding to it, but also each element in $B$ has one and only one element in $A$ corresponding to it. Therefore, a bijection is also called a one-to-one correspondence.

The description here does not mention the names of $A$ and $B$, but introduces the more algebraic notation $\operatorname{Im}\varphi$ to denote the image set. However, it still explicitly states the fact that $\operatorname{Im}\varphi \subseteq B$, and points out that when the two are equal, the mapping is called a so-called *surjection*. Incidentally, it discusses the so-called injection here, i.e., different elements in $A$ all have different $f(a)$ corresponding to them; finally, it discusses bijections, when both properties hold simultaneously.

Overall, the explanation is still relatively simple — after all, it's said to be a review. The main purpose is to lead into the protagonist: *linear mappings*. Next, let's look at how the French mathematician Godement, who already appeared in the mathematical analysis section, views mappings / functions.

### France

#### Godement

Let's first recall how Godement introduced functions above. He said that initially functions were some kind of formula, engineers might have thought of them as some kind of graph; later, this definition by formula encountered difficulties: Dirichlet invented the unique Dirichlet function, forcing the definition of functions to undergo further development. Finally, he started from the Cartesian product, considering the graph of a function to be a special subset of this Cartesian product, and ultimately stipulated that a function is something that has such a graph. It is truly a very interesting approach. So, does he still use a similar approach here?

Here I've artificially divided his exposition into several parts — annotations and definitions. Let's first look at his first short paragraph:

> [!REM] Graphs and functions
>
> Let $X$, $Y$ be two sets. A function on the set $X$, with values in the set $Y$, is any operation which makes correspond to each element $x \in X$ an element $y$ of $Y$ depending on $x$ in accordance with some well-defined law: for example, the function $y = \sin x$, when $X=Y=\mathbb{R}$.
> 
> This "definition" unfortunately contains several words which have not been mathematically defined. For example, what does the expression "make correspond" mean? Taken at its face value, this definition is just another piece of word-juggling.

He first gives the common definition we've seen: two sets, a well-defined rule, and everyone is happy. However, this definition has a problem: what does *correspond* mean? Does this word have an appropriate, good mathematical definition? It seems not — this again seems like some kind of word game, giving people the feeling of understanding, rather than truly obtaining a definition from logic.

So how do we handle it?

> [!DEF] Function (Godement)
>
> A *function* is an ordered triple
>
> $$f = (G,X,Y)$$
>
> where $G$, $X$, $Y$ are sets satisfying the following conditions:
>
> (F 1): $G\subset X \times Y$;
> (F 2): for each $x\in X$ there is exactly one $y\in Y$ such that $(x,y)\in G$.
>
> Condition (F 1) means that $G$ is a graph (section 1), called the **graph of the function** $f$. By (F 2), for each $x\in X$ there exists $z\in G$ such that $x = \operatorname{pr}_1(z)$, and therefore
>
> $$\operatorname{pr}_1(G) = X,\ \ \ \ \ \operatorname{pr}_2(G) \subset Y.$$
>
> Let $x$ be an element of $X$; then the unique element $y\in Y$ such that $(x,y) \in G$ is called **the value of the function $f$ at $x$**, and is denoted by
>
> $$y = f(x).$$
>
> Clearly the graph $G$ of $f$ is the set of all ordered pairs of the form $(x,f(x))$, in accordance with the intuitive idea of a function.
>
> If $f = (G,X,Y)$ is a function, $X$ is called the **domain** or **source** of $f$ and $Y$ the **target** of $f$.

Relatively speaking, this definition actually develops the definition he used in his mathematical analysis textbook above. A function now has very clear *data*, or *information* — it is an ordered triple $(G,X,Y)$, whose first component is a subset of the Cartesian product of the latter two, and this subset is not arbitrarily chosen, but rather for every element of $X$, there is uniquely one $y \in Y$ such that $(x,y)$ is an element of $G$. Here we see the definition of graph mentioned — it was introduced in the first part of this chapter — and it is accordingly defined as the graph of the function. Later, $\operatorname{pr}_n$ appears, which was introduced slightly earlier in the book as notation meaning Projection, i.e., "taking the $n$-th component of an ordered pair."

Let's pay attention to a detail: here we are not using $x$ to construct $z$ (otherwise there'd be a suspicion of circular definition); we are saying that for each $x$ there exists a $z$, and the first projection of this $z$ happens to be $x$. And precisely for this reason, we naturally obtain that the first projection of the function graph $G$ is naturally the set $X$, while the second projection can only be said to be a subset of $Y$. Furthermore, the familiar notation $y = f(x)$ no longer has those multiple layers of meaning here: $y = f(x)$ is a notation expressing that $y$ is the unique element in $Y$ obtainable from $x$ such that $(x,y)$ is an element of $G$. Then, very naturally (and obviously), the graph $G$ of the function $f$ is precisely the set of all ordered pairs of the form $(x,f(x))$, consistent with our pre-existing intuitive understanding.

Here at the end, it specifies that in this ordered triple called a function, $X$ is the domain of $f$, or called the *source*, and $Y$ is the *target*. The names of these two important sets are thereby given.

Looking at this definition once more, it remains very ingenious: starting from the concept of a graph, which developed from subsets of the Cartesian product, and adding some predicates from mathematical logic, one can inversely define a function. Here $G$ is still something that does not depend on $X$ and $Y$ — it is only required to be a subset of them: this point is very liberal, and also provides sufficient necessity for defining a function as an ordered *triple*, because the third element cannot be directly obtained from the graph $G$ and $X$.

Yet this is not the end. Because in this book, the author more frequently uses the simpler word *mapping* rather than the word *function*, which is more cumbersome to say, even though the author treats the two as near-synonyms here. Why?

> [!REM] Mapping of X into Y
>
> If $X$, $Y$ are two sets, a **mapping of $X$ into $Y$** is a function with $X$ as source and $Y$ as target. The words "function" and "mapping" are thus synonyms, but in practice it is often more convenient to say "let $f$ be a mapping of $X$ into $Y$" rather than "let $f$ be a function defined on $X$ with values in $Y$".

So it turns out: if we say *mapping*, we can say it's a mapping from $X$ to $Y$; while if we say *function*, rigorously speaking, we have to say it is a *function defined on $X$ with values in $Y$*.

Having experienced the baptism of French mathematics, let's look at American textbooks:

### United States

Whether out of private preference or similarity of definitions, let's first introduce the definition from *Chapter 0*. Then we'll introduce the famous Serge Lang and Hungerford.

#### Chapter 0

This book was written by the Italian-American mathematician Paolo Aluffi. Its language is humorous, lively, and modern — boldly introducing abstract algebra directly from category theory, constructing the whole of abstract algebra on a more abstract framework, and thereby enabling a higher viewpoint to survey the entire field of algebra, especially the ability to naturally connect different algebraic structures. Having said all that, let's still look at how functions, the cornerstone of this book, are defined.

> [!DEF] Function (Chapter 0)
>
> Sets interact with each other through *functions*. It is tempting to think of a function $f$ from a set $A$ to a set $B$ in 'dynamic' terms, as a way to 'go from $A$ to $B$'. Similarly to the business with relations, it is straightforward to formalize this notion in ways that do not need to invoke any deep 'meaning' of any given $f$: everything that can be known about a function $f$ is captured by the information of *which element $b$ of $B$ is the image of any given element a of $A$*. This information is nothing but a subset of $A \times B$:
>
> $$ \Gamma_f \coloneqq \left\{ (a,b)\in A\times B\ \vert\ b = f(a) \right\} \subseteq A\times B. $$
>
> This set $\Gamma_f$ is the *graph* of $f$; officially, a function really 'is' its graph.

As can be seen, it first introduces the significance of the concept of a function: sets connect with each other through functions. And when we want to define a function, we only capture the most critical, most necessary information of this concept: *which element $b$ in $B$ is the image of a given element $a$ in $A$?* And this information happens to be perfectly represented by a subset of $A\times B$. Let's look at this set — unlike the $G$ used above, here $\Gamma_f$ (gamma-f) is used to denote this set. Its elements are in the Cartesian product of $A$ and $B$, satisfying the condition that $b = f(a)$ between $a$ and $b$. In this way, this set becomes a subset of $A\times B$. It immediately points out that this set is the graph of the function $f$, and more formally, further says that this function *is* its graph. There is a footnote here:

> [!REM] Function and Graph
>
> To be precise, it is the graph $\Gamma_f$ *together with* the information of the source $A$ and the target $B$ of $f$. These are part of the data of the function.

Isn't this exactly the definition Godement gave above? A function is the collective body of its graph, source, and target. But, can we say anything else about this subset of the Cartesian product? Or rather, what must the graph of a function look like, or what must it definitely not look like? Let's look:

> [!REM]
> 
> Not all subsets $\Gamma\subseteq A\times B$ correspond to ('are') functions: we need to put one requirement on the graphs of *functions*, which can be expressed as follows:
>
> $$(\forall a \in A)(\exists !b\in B)\ \ \ (a,b) \in \Gamma_f,$$
>
> or ('in functional notation')
>
> $$(\forall a \in A)(\exists !b\in B)\ \ \ f(a) = b.$$
>
> That is, a function must send each element $a$ of $A$ to exactly one element of $B$, depending on $a$. 'Multivalued functions' such as $\pm \sqrt{x}$ (which are very important in, e.g., the study of Riemann surfaces) are *not* functions in this sense.

So, it's not that just any arbitrary subset can be the graph of a function. It must satisfy that for any $a\in A$, there must be, and there is uniquely, one $b\in B$ satisfying the condition $(a,b)\in \Gamma_f$, or using a more function-like notation, satisfying the condition $f(a) = b$. In this sense, $\pm \sqrt{x}$ is not a function graph: a given $x$ does have elements of the target set that can together with $x$ satisfy this condition, but there are too many — it has two elements that can together with $x$ satisfy this condition, one greater than 0 and one less than 0. In this case, this set is not a function graph, and naturally the expression producing this set is not a function. Additionally, Aluffi points out that this is especially important in the context of Riemann surfaces in complex geometry, because complex functions very easily produce multiple values — and in such cases, to have a genuine *function*, one must take only one branch.

Overall, this definition coincides with what we saw above in Godement. Perhaps in European algebra teaching, functions are defined from graphs in this way? Haha. Let's turn to the next one — Serge Lang, equally well-known.

#### Serge Lang

Actually, the Chinese translation of this name (from Wikipedia) should be 塞尔日·兰 — French pronunciation is truly magical. Yet I always misread it... Sorry. Lang's most famous work is surely the well-known GTM 211: Algebra, where GTM is Springer's *Graduate Texts in Mathematics* series. This series contains many classic books, such as 52 (Algebraic Geometry), 73 (Hungerford, mentioned below), 96 (A Course in Functional Analysis), Lang's 211, 218 (the famous Introduction to Smooth Manifolds), 249 and 250 (Classical and Modern Fourier Analysis), etc.

However, what is chosen here is not his most famous 211: 211 doesn't introduce what functions / mappings are at all — after all, it's a GTM. But Lang also has a UTM — Undergraduate Texts in Mathematics — which, as the name suggests, is written for undergraduates. That is this *Undergraduate Algebra*. How to translate it? University Algebra? When it's clearly abstract algebra...

Enough idle chatter. Let's quickly see whether Lang brings anything new to the definition of functions or mappings:

> [!DEF] Mappings (Serge Lang)
>
> Let $S$, $S'$ be sets. A **mapping** (or **map**) **from** $S$ **to** $S'$ is an association which to every element of $S$ associates an element of $S'$. Instead of saying that $f$ is a mapping of $S$ into $S'$, we shall often write the symbols $f \colon\ S \to S'$.
> 
> If $f \colon\  S \to S'$ is a mapping, and $x$ is an element of S, then we denote by $f(x)$ the element of $S'$ associated to $x$ by $f$. We call $f(x)$ the value of $f$ at $x$, or also the **image** of $x$ under $f$. The set of all elements $f(x)$, for all $x\in S$, is called the **image** of $f$. If $T$ is a subset of $S$, then the set of elements $f(x)$ for all $x\in T$ is called the **image** of $T$, and denoted by $f(T)$.
> 
> If $f$ is as above, we often write $x\mapsto f(x)$ to denote the image of $x$ under $f$. Note that we distinguish two types of arrows, namely
>
> $$\to\ \ \ \text{and}\ \ \ \mapsto.$$

Alright, there's really nothing particularly new. It adopts what should be the definition we are most familiar with. However, it uses the word *image* three consecutive times, and these three uses of image all differ: it can be the image of the element $x$ under $f$; it can be the image of the function $f$; it can also be the image of a subset of the domain under $f$. This is quite useful, because people do indeed always mix up these three concepts, calling all of them "images." And finally, it emphasizes the difference between these two arrows: $\to$ expresses the relation between sets, while $\mapsto$ marks what the image of $x$ under $f$ is. Actually, this point, I, the one typing this blog post, know best — because the $\LaTeX$ code for $\to$ is `\to`, while that for $\mapsto$ is `\mapsto`.

I actually think we perhaps need not hold too high expectations for GTM 73: it might also just say a couple of simple lines. But let's still take a look.

#### GTM 73

In GTM 73, the introduction of functions comes quite quickly. Yet its definition is also finished in one paragraph:

> [!DEF] Functions (GTM 73)
>
> Given classes $A$ and $B$, a function (or map or mapping) $f$ from $A$ to $B$ (written $f\colon\ A \to B$) assigns to each $a \,\varepsilon A$ exactly one element $b \,\varepsilon B$; $b$ is called the value of the function at $a$ or the image of $a$ and is usually written $f(a)$. $A$ is the domain of the function (sometimes written $\operatorname{Dom} f$) and $B$ is the **range** or **codomain**. Sometimes it is convenient to denote the effect of the function $f$ on an element of $A$ by $a\mapsto f(a)$. Two functions are **equal** if they have the same domain and range and have the same value for each element of their common domain.

Wait a minute, what are *classes*? Here's the thing: GTM 73 actually discusses set theory rather deeply. It's not that it simply gives a definition of sets followed by some set operations and then defines functions; it starts from the propositional logic of mathematical logic, strictly distinguishing *sets* from *classes*, adopting the G\"odel-Bernays (as written in the book; currently Wikipedia gives NBG, adding von Neumann's name) form of axiomatic set theory. We won't discuss this so deeply — we'll only point out: classes are an extension of the concept of sets. We separate out some small classes and call them sets, letting the remaining especially large classes become so-called proper classes. This distinction is mainly to avoid (circumvent) the famous problem (paradox) in naive set theory: the barber paradox (i.e., Russell's paradox). If interested, one can learn about these axiomatic set theories — there are many forms of axiomatic set theory, such as NBG here, and the famous, widely-used ZF axiomatic set theory, etc. See how they all circumvent the terrible Russell's paradox.

OK, so that means functions defined on classes are more general — they have a broader scope of application than functions defined on sets. Setting aside the issues of axiomatic set theory, let's simply treat it as defined on sets — no big problem. Having resolved this doubt, let's continue.

No, wait another moment — what is $\varepsilon$? Is it $\in$? That's right — the most interesting point of this book (in my view) is that it uses $\varepsilon$ as the symbol for $\in$. Perhaps because the symbol $\in$ was not so easy to type at that time — this book was completed in 1974, truly very old.

Actually, in this definition, the points worth paying attention to are only a few: first, it chooses to treat functions and mappings (two forms — *map* and *mapping*) as synonyms; second, it gives $A$ the name *domain*, and directly calls $B$ the *range* or *codomain*; finally, it gives a method for judging the equality of two functions, though described using pure text — as long as two functions have the same domain, the same codomain, and the same value for each element on their domain, the two functions are equal.

Overall, this definition's content is actually rather plain. The most eye-catching thing is surely the use of classes from axiomatic set theory, rather than the sets we're used to. However — also because it uses axiomatic set theory, this book exudes a strong aura of rigor right from the beginning. Later in the first chapter of this book, you will encounter order structures, the Axiom of Choice and Zorn's Lemma, proofs of mathematical induction, and other rather intimidating content — and this is merely the first chapter. That's GTM for you.

### Russia

Russian mathematics is world-renowned for its heavy computation load. The famous calculus exercise book *Demidovich* is also a memory of problem-drilling for many, and Russia is simultaneously a well-known mathematical powerhouse, as well as the place where many of our country's older-generation mathematicians studied abroad. If you find some old textbooks particularly awkward to read, it's very likely because their translations retain a Russian flavor, hahaha (just kidding).

Let's first look at a very well-known algebra textbook, called *Linear Algebra Disguised as Abstract Algebra*: Kostrikin's *Introduction to Algebra*. We'll put both the Chinese and English versions here for reference.

#### Kostrikin

Why are we posting the Chinese-English comparison? Because... no special reason. I initially found the Chinese version (after all, many people use this version), but when searching for materials online, I discovered that its Chinese translation seems to be relatively poor... So I also found its English translation. I did not expect the English translation to be even more mysterious: it was typed on a typewriter.

> [!DEF] Mappings (Kostrikin)
>
> The notation of a <u>function</u> or <u>mapping</u> (also: "map") plays a central role in mathematics. Given two sets $X$ and $Y$, a mapping f with <u>domain of definition</u> $X$ and <u>range of values</u> $Y$ associates to every element $x\in X$ an element $f(x)\in Y$, which can also be denoted $fx$. In the case $Y=X$ we also call $f$ a <u>transformation</u> of the set $X$ to itself. A mapping is written symbolically in the form $f\ \colon X\to Y$ or  $X\xrightarrow{f}Y$. 

> [!DEF] Mapping (Kostrikin)
>
> The concept of **mapping** or **function** plays a central role in mathematics. Given two sets $X$ and $Y$, a mapping $f$ with $X$ as **domain of definition** and $Y$ as **range of values** associates each element $x\in X$ with an element $f(x)\in Y$. $f(x)$ may also be denoted $fx$ or $f_x$. When $X=Y$, $f$ is also called a **transformation** of the set $X$ to itself. Using symbols, a mapping is written as $f\ \colon X\to Y$ or $X \xrightarrow{f} Y$.

We see that its definition is also of the relatively plain and unadorned type, but the interesting part is its magical notation for the function value of an element: $fx$ and $f_x$ (in the English version there is only $fx$). The main reason for this is that notation like $fx$ is very convenient for linear algebra discussions. The product of a linear mapping and a vector is essentially just the notation $fx$. Truly worthy of being linear algebra disguised as abstract algebra. Let's look at our last book, Gorodentsev's *Algebra I*.

#### Gorodentsev

This book is relatively new, belonging to a new Springer series: *Textbooks for Students of Mathematics*. From its brief preface, one can see that this book was written to enable mathematics students to learn algebra within two years, based on their course lecture notes. Its most famous feature should be its outstanding exercises, though to be honest I haven't looked at them either. Enough talk — let's see what its definition of functions looks like:

> [!DEF] Map (Gorodentsev)
>
> A *map* (or *function*) $f\ \colon X\to Y$ from a set $X$ to a set $Y$ is an assignment $x\mapsto f(x)$ that relates each point $x\in X$ with some point $y = f(x)\in Y$ called the *image* of $x$ under $f$ or the *value* of $f$ at $x$. Note that $y$ must be uniquely determined by $x$ and $f$. Two maps $f\ \colon X \to Y$ and $g\ \colon X\to Y$ are said to be *equal* if $f(x) = g(x)$ for all $x\in X$. We write $\operatorname{Hom}(X,Y)$ for the set of all maps $X\to Y$.

We can see that its definition is also of the most plain and unadorned type, but its most interesting part is the last section. What is $\operatorname{Hom}$? Actually, if you've looked at some of the later content of the aforementioned *Algebra: Chapter 0*, you'll quickly discover that this symbol is commonly used in *category theory*, denoting all *morphisms* from $X$ to $Y$. What is a morphism? In category theory, a morphism is a special mapping — besides satisfying the most basic mapping relations, it must also satisfy the requirement of *preserving the structure between objects*. The good news is that, for sets, morphisms and functions are the same: a set is the most plain and unadorned mathematical object. So here saying $\operatorname{Hom}(X,Y)$ is the set of all mappings from $X\to Y$ is also fine.

### Summary

In algebra textbooks, it seems to be universally the case that functions and mappings are treated as synonyms. Even though some authors believe that what is emphasized differs when this object is called a function versus when it's called a mapping, and the way it's named differs, they still appear as synonyms — this point is very different from the situation we encountered in analysis. Yet the difference in usage also reflects our attitude toward mathematical objects: sometimes we need a mathematical object defined on some set, and at other times we need a relation between two sets, a bridge. *Function* and *mapping* perfectly capture these two characteristics. As for why, when talking about *mappings*, we still use $f$ as the symbol for the mapping rather than using a symbol like $m$ — I personally tend to believe that the concept of mapping perhaps actually appeared later than the concept of function, and was abstracted from the concept of function. And we're already used to using $f$ to represent many "association" or "transformation" relations, so everyone chose to use $f$ to denote mappings, and in the field of algebra, unified the two concepts — this has historical reasons.

Additionally, among the definitions here in algebra, two textbooks define functions in reverse starting from the graph of the function. This allows a very algebraic, formalized definition of a function as a clear mathematical object, rather than some kind of illusory rule — that rule has already been condensed into that function graph. Furthermore, in algebra, that "ghost on the right side of the arrow" is given a very clear name — basically, no one avoids this issue. However, it's interesting to note that many places use the name *range* that we used in analysis for it, but here I believe this is not ambiguous: in algebra, the "range" used in analysis would be replaced by the *image* of the mapping, directly denoted as $f(A)$ (if defined on $A$), or $\operatorname{Im}f$, or $\operatorname{im}f$, etc. In this way, even if we use *range* to represent the codomain of the mapping, we can still have a reasonable symbol / concept to express the range / image. As for why the image is so important, because... I won't expand on that here, but it is indeed an important algebraic object that can be extracted from a function — it will be used to make some quotients and produce some weirder algebraic objects, so it's necessary to give it a special symbol. If interested, you can reference a [lengthy article I wrote before](/posts/snake_lemma), which wrote about how to prove the Snake Lemma.

## So, What Is a Function?

Having made a full circle, it's time to answer this initial question: what exactly is a function? A correspondence relation? A mathematical object? Actually just a mapping? Must it be from a number field to a number field? Is it enough to just go to a number field? A morphism? A transformation? How come there are so many names?

My answer to these questions is: a function is a prototype for a series of mathematical concepts. I believe this word probably appeared earlier than "mapping." At first, people probably didn't worry too much about a strict definition of this thing. Later, after strange functions appeared (yes, you, Dirichlet function), we were forced to confront the problem of functions without a rigorous definition. And it was against this backdrop that a series of definitions appeared — most of them first give two sets, require that each element in one set must have, and can only have, one element in the other set corresponding to it, and finally call this kind of correspondence rule a so-called *function*.

However, perhaps due to the needs of the development of mathematics, the term "function" had already become somewhat impoverished — it seems to be an object that depends on a domain and a codomain (and some may believe it doesn't depend on the codomain), and *map*, as a verb (or noun), can very well depict the relationship between two mathematical objects, thereby drawing an equality sign between functions and mappings. This situation perhaps underwent further differentiation in analysis — letting mappings represent this layer of relationship among all sets, and letting functions become that most special relationship: from a set to a number field, or requiring that both must be number fields.

I believe that the emergence of the term "mapping" may already have signaled the development of disciplines like category theory, and thereby emerged complex and novel terms like *morphism*, *transformation*, and the like. We say morphisms need to preserve the mathematical structure of objects, transformations are dedicated to mappings from an object to itself, functionals are mappings from function spaces to number fields, and so on. And sometimes, people still say things like "xxx is a function from X to Y, and then xxx" without distinguishing them from mappings — creating today's chaotic situation.

But, this isn't really that big a problem. After all, the textbooks listed above all provide their own definitions of functions and mappings, and in the process of usage, they all strictly follow the rules they laid down at the start — who is used for what, and who is used for what. And if a book doesn't touch on the concept of mappings, it's very likely because they already assume that everyone has grasped a certain foundation in algebra and can understand what that "function" in the book actually means, or because later on, the book won't use the term "function," a term not endowed with any special structure, again — instead, it will heavily use terms like *linear transformation*, *group homomorphism*, *linear operator*, *differential operator*, and other "mappings" that have more definite meaning and are endowed with complex structures.

That's how it is. Functions are both simple and complex. Wanting to understand what exactly that *function* used in each field is, is almost unrealistic. Here I still hold a pragmatic attitude: as long as the people listening to me can understand, and the people reading my writing can understand, that's fine. If they don't understand or can't understand, then let's hash out these definitions a bit more. At the end of the day, isn't a function just a strange machine that eats something and then spits something out?

## Afterword

This article is again much longer than I imagined. At first, I actually just wanted to roughly compare the similarities and differences among various textbooks' definitions of functions, and then write a bit about some higher-level mathematical concepts related to functions / mappings — like operators, functionals, transformations, and all those messy things — and peek at the strange concepts derived from them (strange descriptor words like injective, surjective, faithful, full, etc.), see where they're all used, and chat about what their roles are. As a result, as I wrote, I discovered that the concept of a function really is very big, and each textbook's definition also has a little bit of something fresh in it. Writing to the end, I simply steered the content toward comparing textbook definitions. After all, if a reader is truly willing to read, they can certainly feel from these textbook descriptions what these messy definitions all represent, and will surely form their own judgment in their heart.

Additionally, I want to mention that I deleted many textbooks I originally planned to put here. In analysis, I deleted the *Fikhtengol'ts* that I initially planned to reference — i.e., *A Course in Differential and Integral Calculus* by Fikhtengol'ts. Although this book is called calculus, it genuinely teaches the content of mathematical analysis — it's just that, indeed, studying these will make you very good at calculus, turning you into a calculus domain expert. The main reason for not choosing this one is that its definition of functions is a bit "slow" — it uses a lot of ink to characterize what a function is, and I felt it wasn't very suitable to put here. I also deleted some textbooks, like Artin's algebra, that GTM 211, and even *Methods of Algebra* by Professor Li Wenwei, which I especially wanted to put here, but couldn't, because none of them mention the definition of functions / mappings — after all, this concept is still a bit too foundational.

Writing this article has also been very rewarding for me: I originally supported the view that *functions must go from sets to number fields, while mappings have no such requirement*, but after reading so many textbook definitions of functions and mappings, I realized that actually, when it comes to definitions — being self-consistent and practical is the best. We don't need to necessarily pursue a very fancy definition, even if doing so indeed has great benefits (algebraization of objects, extremely strong descriptive power), nor do we need to pursue a definition applicable to all textbooks. When we need it to be something, it is that something, and then within that context, it never changes thereafter — that's already a good definition.

If you noticed that among the excerpts' typesetting, some use bold for emphasis, some use italics for emphasis, and some use regular script for emphasis, with no unified format — this is because each textbook uses somewhat different methods. Also, during the typesetting process, I deleted some things, like equation numbers, or some footnote marks. The footnote part (in *Chapter 0*) I rewrote as a *Remark*. I hope this clears up any confusion about inconsistencies in the transported content.

I also want to complain: who on earth likes to use $\varphi$ when defining functions / mappings? This is too hard to type: `\varphi` is genuinely much harder to type than `f`. Sigh, what a pain.

Finally, thank you for reading this far. I hope this article brings you some inspiration. So, here is $\text{AMoment}$, isomorphic to the nonsense function $F()$. As always, I wish you good health and happiness every day~

[^1]: This is also a huge pitfall — studying mathematical logic, one certainly cannot bypass axiomatic set theory. Here, we first adopt traditional naive set theory, and later, when needed, seamlessly switch to ZFC axiomatic set theory without notice. Please be aware of this. (Basically, we won't delve deeply into sets — it's fine and correct, OK.)

[^2]: Actually, privately, I don't like the term "higher mathematics." Such a term always gives me the impression that "higher mathematics is more advanced than elementary mathematics." In my view, the main difference between higher mathematics (post-university mathematics) and elementary mathematics (pre-university, sometimes relaxable to pre-high-school) is that the former is more rigorous — starting from certain axioms to obtain theorems, lemmas, corollaries, etc., using definitions to simplify descriptions; the latter is mostly introductory exposition, and how to solve simple problems within a limited framework of knowledge. However, I also can't think of a better term to express these two...
