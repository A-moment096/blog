---
categories:
- Mathematics
# - Programming
# - Phase Field
# - Others
tags:
- Linear Algebra
- Note
title: Linear Algebra Notes I
description: Notation Conventions, Linear Spaces and Their Basic Properties
date: 2025-10-20T09:00:01+08:00
image: /images/Alice.jpg
imageObjectPosition: "center 15%"
math: true
hidden: false
comments: true
---

*I've always felt that I never fully grasped linear algebra, especially after studying some abstract algebra — I've come to realize that linear algebra is far more than just simple matrix operations. Seizing the opportunity to learn continuum mechanics, I'll organize what I know and boldly share my understanding of this subject~*

*The featured song is a cover by [**Kano**](https://space.bilibili.com/316381099), included in the album [**one**](https://music.163.com/#/album?id=37542486) — the song **Calc.** The original is a classic Vocaloid song I absolutely adore, produced by [**JimmyThumbP**](https://lit.link/en/jimmythumb) and posted on *Niconico Douga*, link: [Hatsune Miku Original Song「Calc.」](https://www.nicovideo.jp/watch/sm12050471). It's probably more of a love song, actually? But Calc. also gives off a vibe of calculation (lol)*

*The featured image is an AI-generated illustration by [**Neve_AI**](https://x.com/Neve_AI) — said to be Alice? Anyway, it looks pretty nice (runs away)*

{{<music auto="https://music.163.com/#/song?id=537854740" loop="none">}}

$$
% =====  =====
\gdef       \vect           #1{\mathbf{#1}}                             % abstract vector
\gdef       \cvect          #1{\boldsymbol{#1}}
\gdef       \basis          #1#2{\mathcal{#1}_{#2}}                            % basis of vector space
\gdef       \basev          #1#2#3{\{\vect{#1}_{#2}\}_{#2=1}^{#3}}                     % base vector collection
\gdef       \cbasev         #1#2{\mathbf{#1}^{#2}}                      % dual basis e^i
\gdef       \vrep           #1#2{[\vect{#1}]_{\basis{#2}{}}}                           % coordinate representation [v]_B
\gdef       \rep            #1{[\vect{#1}]}
\gdef       \mrep           #1#2#3{[{#1}]_{\basis{#2}{}}^{\basis{#3}{}}}                      % representation [L]_{C,B}
% 
\gdef       \iprod          #1#2{\langle #1, #2 \rangle}                % inner product
\gdef       \mat            #1{\mathbf{#1}}                             % matrix (representation)
\gdef       \field          #1{\mathbb{#1}}                             % 
\gdef       \xto            #1{\xrightarrow{#1}}                        % arrow with label
\gdef       \xfrom          #1{\xleftarrow{#1}}                         % left arrow with label
\gdef       \Hom            {\operatorname{Hom}}             % morphisms between A and B
\gdef       \Iso            {\operatorname{Iso}}
\gdef       \End            {\operatorname{End}}                  % 
\gdef       \Aut            {\operatorname{Aut}}                  % 
\gdef       \cat            #1{\mathsf{#1}}                             % category symbol: e.g., \cat{Vect}, \cat{Set}
\gdef       \t              {^{\mathsf{T}}}
\gdef       \id             {\mat{I}}                                % identity matrix
\gdef       \R              {\field{R}}                                % 
\gdef       \C              {\field{C}}                                % 
\gdef       \ot             {\otimes}                                   % tensor product symbol
\gdef       \zero           {\vect{0}}                                  % 
\gdef       \one            {\vect{1}}                                  % 
\gdef       \idop           {\mathrm{id}}                               % identity morphism
\gdef       \comp           {\circ}                                     % composition symbol
\gdef       \Set            {\cat{Set}}                                 % category of sets
\gdef       \Vectk          {\cat{Vect}_{\field{k}}}                    % category of vector spaces
\gdef       \Vect           {\cat{Vect}}                                % 
% 
\gdef       \BaseB             {\basis{B}{}}
\gdef       \BaseC             {\basis{C}{}}
\gdef       \BaseBV             {\basis{B}{V}}
\gdef       \BaseCW             {\basis{C}{W}}
\gdef       \BaseE          {\basis{E}{}}
$$

## Preface

Since I need to study some mechanics (continuum mechanics), which involves concepts from tensor algebra and tensor calculus, and to understand them one must inevitably bring up that legendary, mysterious course: linear algebra. So, in that case, let's simply start this entire journey from the perspective of algebra, taking linear algebra as our starting point. Since the content of this article is mixed with (perhaps a lot of) my personal understanding, if there are any errors or omissions, please do not hesitate to offer your corrections.

## Notation Conventions

Since we are approaching this from algebra, we must establish some notation conventions.

<!-- For brevity, we've tucked it below; expand it if needed. -->

<!-- <details> -->
<!-- <summary>Notation Conventions</summary> -->

| Meaning | Font/Glyph | Letters Used |
|:-:|:--:|:---:|
| Scalar | Regular letters | $a$, $b$, $c$, $v^i$, $\varphi_j$, $A^i{}_j$ |
| Number field | Blackboard bold | $\Bbbk$, $\field{R}$, $\field{C}$ | 
| Vector | Bold upright letters | $\vect{u}$, $\vect{v}$, $\vect{w}$, $\vect{x}$, $\vect{y}$, $\vect{z}$ |
| Covector | Bold Greek letters | $\cvect{\beta}$, $\cvect{\varphi}$, $\cvect{\psi}$, $\cvect{\xi}$ |
| Set, vector space | Uppercase regular letters | $U$, $V$, $W$|
| Basis | - | $\basis{B}{V} = \basev{b}{i}{n}$, $\basis{C}{W} = \basev{c}{j}{m}$, $\basis{D}{}$ |
| Vector representation | - | $\vrep{v}{B} = (v^1,\dots,v^n)\t$, $[\vect{u}]$| 
| Linear map | Regular letters | $L$, $R$, $S$, $T$ |
| Set of linear maps, isomorphisms, endomorphisms, automorphisms | - | $\Hom(V,W)$, $\Iso(V,W)$, $\End(V)$, $\Aut(V)$ |
| Category of linear spaces | - | $\Vectk, \Vect$ |
| Matrix | - | $\mat{A}$, $\mat{B}$, $\mat{C}$, $\mat{P}$, $\mat{Q}$, $\mat{M}$   |

<!-- </details> -->

In simple terms, we use boldface for matrices and vectors, and regular lowercase letters for scalars; when regular letters carry superscripts or subscripts, they represent the corresponding matrix/vector components. We strictly distinguish between linear maps and matrices in our notation. For the linear algebra portion, we will use this notation system for now. Furthermore, we will not use the Einstein summation convention until we fully enter the content on tensor algebra. Writing out the explicit summation process is helpful in derivations.

With this groundwork laid, let's begin.

## Definition of Linear Spaces

**Linear spaces**, also known as **vector spaces**, are the most fundamental objects of study in linear algebra, occupying a nearly central position in this discipline. The so-called matrices, vectors, and so on all depend on this most fundamental definition. Therefore, we will first introduce the basic properties that a linear space possesses.

In fact, we have been exposed to linear spaces for quite some time — for instance, the $3$-dimensional linear space $\R^3$ we often use in physics, and the Cartesian coordinate system we learned in middle school physics actually defines a two-dimensional linear space. An intuitive understanding is that a linear space is a space filled with vectors, and these vectors can ultimately be expressed as a sequence of numbers. From a purely mathematical perspective, a linear space is a space whose elements satisfy *linearity*. Below we give the definition.

> [!DEF] Linear Space
>
> Given a field $\field{k}$ and a set $V$, we define two operations on the set $V$, (vector) addition and scalar multiplication:
>
> $$\begin{align*} &+\vcentcolon V \times V \to V, \\ &(\vect{u},\vect{v})\mapsto \vect{u}+\vect{v} \ \  (\forall \vect{u},\vect{v} \in V) \\ &  \cdot\vcentcolon \field{k} \times V \to V,\\ &(a,\vect{v}) \mapsto  a \cdot \vect{v} = a \vect{v}\ \ (\forall a \in \field{k}, \vect{v} \in V) \end{align*}$$
>
> When $V$ and $\field{k}$ satisfy the following properties, we call $V$ a linear space over $\field{k}$:
>
> - Addition has an identity element $\zero\in V$ satisfying $\zero + \vect{v} = \vect{v} + \zero = \vect{v}$ for all $\vect{v} \in V$;
> - Every element $\vect{v}\in V$ of $V$ has an inverse under addition, denoted $-\vect{v}$, such that $\vect{v} + (-\vect{v}) = (-\vect{v})+\vect{v} = \zero;$
> - Addition is associative: for all $\vect{u},\vect{v},\vect{w}\in V$, $(\vect{u}+\vect{v})+\vect{w} = \vect{u}+(\vect{v}+\vect{w});$
> - Addition is commutative: for all $\vect{u},\vect{v}\in V$, $\vect{u}+\vect{v} = \vect{v}+\vect{u};$
> - The identity of the field acts as the identity under scalar multiplication: for $1_\field{k} \in \field{k}$, $1_\field{k} \vect{v} = \vect{v}$ holds for all $\vect{v} \in V$;
> - Scalar multiplication distributes over vector addition: $a\cdot(\vect{u}+\vect{v}) = a\cdot \vect{u} + a\cdot \vect{v}$ for all $a\in \field{k}, \vect{u},\vect{v}\in V$;
> - Scalar multiplication distributes over field addition: $(a+b)\cdot \vect{u} = a\cdot \vect{u} + b\cdot \vect{u}$ for all $a,b\in \field{k}, \vect{u}\in V$;
> - Scalar multiplication is compatible with field multiplication: $a\cdot(b\cdot \vect{u}) = (a\times b)\cdot \vect{u}$ for all $a,b\in \field{k}, \vect{u} \in V$.
>
> We call the elements of $V$ vectors. In the above definition we have mixed vector addition and scalar addition notation, since their domains are completely different; we use $\cdot$ and $\times$ to distinguish scalar multiplication of a vector from multiplication of scalars within the field. Normally we omit the multiplication sign.

We could also say that a vector space is a module formed by endowing an abelian group with scalar multiplication over a field.

Hereafter, we will consistently use capital letters $U$, $V$, and $W$ as the linear spaces we will be working with. Unless otherwise stated, all linear spaces we discuss are linear spaces over the field $\R$. Additionally, we will refer to elements of the field $\Bbbk$ as *numbers*, and their multiplication as scalar multiplication.

## The Internal Structure of Linear Spaces

With just the definition of a linear space and without knowing its internal structure, we can hardly do anything. But starting from the definition, we can develop some concepts to help us understand the internal structure of linear spaces. And thanks to the *linearity* of linear spaces, we can freely scalar-multiply vectors in the space and add or subtract them as we please. And if we choose a suitable set of vectors, we can express any element in the vector space as a combination of scalar multiplications and additions of these vectors. Below, we will formulate this idea in mathematical language; to do so, we first introduce the concepts of linear combination and linear independence.

### Linear Combinations

Given a set of vectors, we can form a **linear combination**: scalar-multiply the vectors by certain numbers and then add them together. Here is the definition:

> [!DEF] Linear Combination
>
> Let $V$ be a linear space over $\field{k}$. Using the addition and scalar multiplication on $V$, we define a **linear combination** of a subset $W$ of $V$ containing $n$ elements (vectors) as a **finite** sum of the form
>
> $$\sum_i^n a_i \vect{v}_i$$
>
> where $a_i\in \field{k}$ and $\vect{v}_i\in W\subset V$. We call the scalars in $\field{k}$ the coefficients of the linear combination.

With linear combinations defined, we now define linear dependence and linear independence.

### Linear Dependence and Linear Independence

Linear dependence and linear independence describe the relationship among a set of vectors — they serve as a test of a certain kind of "independence."

> [!DEF] Linear Dependence and Linear Independence
>
> For a subset $W$ with $n$ elements of a linear space $V$ over $\field{k}$, if their linear combinations satisfy the condition:
>
> $$\sum_i^n a_i \vect{v}_i = \zero \iff a_i = 0 \ \ \forall \vect{v}_i \in W, 1\leq i \leq n,$$
>
> then we call the subset $W$ linearly independent; otherwise, we call it linearly dependent.

With the concepts of linear dependence and linear independence, we can determine whether a vector can be linearly expressed in terms of a set of vectors, and also whether a set of vectors is mutually independent.

### Linear Subspaces, Linear Span

After having a linear space, we naturally want to ask: viewing it as a set, can its subsets possess some special properties? We point out: yes, and there are so-called **linear subspaces**. If a subset $U\subseteq V$ of a linear space $V$, when endowed with the addition and scalar multiplication of $V$, still satisfies the eight axioms of a linear space, then we call the set $U$ together with these two operations a linear subspace of $V$.

> [!DEF] Linear Subspace
>
> Given a subset $W$ of a linear space $V$, if under the addition and scalar multiplication defined on the original linear space $V$ it still satisfies the properties of a linear space, we call $W$ a linear subspace of $V$.
>

So, what method do we have to generate a linear subspace of a vector space? We can do this: take a subset of the vector space, then freely form linear combinations of all the vectors in it — scalar-multiply by any coefficient in the field, then add finitely many times. Such an operation is called linear span, and it generates a subspace of the linear space. The formal statement is as follows:

> [!DEF] Linear Span
>
> Again consider a subset $G$ of a linear space $V$. It can **linearly span** or **generate** a linear subspace $W$ — the method is to take all possible results of forming linear combinations of the elements of $G$ under the operations defined on $V$. In this case we call $W$ the linear span of $G$, and $G$ a generating set or spanning list of $W$.

However, we don't yet know how large a subspace a set of vectors can span. Due to the existence of linear dependence, if many vectors in a set are linearly dependent, they should span a relatively small space; conversely, if all vectors in a set are linearly independent, it should span a relatively large space. But we still cannot properly measure this size; for this we need to use the **dimension** of a linear space to express this idea, and defining it requires the **basis** of a linear space.

### Basis of a Linear Space

If a set of vectors is large enough to span the linear space itself, then it must be a special set; and if we further remove the redundant vectors from it, so that each of them is linearly independent and they can span the linear space exactly — no more, no less — we call it a **basis** of the linear space.

> [!DEF] Basis and Dimension
> 
> If a subset $B$ of $V$ both spans $V$ and is linearly independent, we call the set $B$ a **basis** of $V$, denoted $\basis{B}{V}$; when the linear space is clear from context, we write $\basis{B}{}$. The vectors in it are called **basis vectors**. After ordering the basis, we use the notation $\BaseBV = \basev{b}{i}{n}$ to express this relationship, where the $i$-th basis vector is denoted $\vect{b}_i$. By convention (and for mysterious reasons), we use subscripts to distinguish basis vectors.
> 
> We denote the cardinality of $\BaseB$ (the size of the set, i.e., the number of basis vectors) as the dimension of the linear space, written $\dim V$.

In fact, there is also a special relationship between linear subspaces and bases: if a linear space $V$ has a basis $\basis{B}{V}$, we can split this set into two parts, one called $B_1$ and the other $B_2$, then let each of them form a linear span; the two resulting linear spaces are both linear subspaces of $V$. And more specially, since these two linear subspaces, viewed as sets, intersect only at the zero vector $\zero$, we can define the so-called **direct sum**, and say that $V$ can be decomposed as the direct sum of these two subspaces.

Direct sums have many interesting properties; if interested, you can refer to another blog post of mine — I won't elaborate further here.

We also have another way to define a basis that does not rely on the linear span. If a set of linearly independent vectors becomes linearly dependent upon adding any other vector from the space, then this set of linearly independent vectors is called a maximal linearly independent set of the linear space. And a maximal linearly independent set of a linear space can serve as a basis of the linear space. This definition is equivalent to the one above; I won't elaborate further here.

With a basis, we can carry out more complex descriptions and operations on linear spaces. For instance, according to the definition of a basis, every vector in a linear space can be expressed as a linear combination of basis vectors.

### Representation of Vectors

Taking a basis $\basis{B}{V} = \basev{b}{i}{n}$ of an $n$-dimensional linear space, under this basis we can *uniquely* represent every vector in the linear space as a list of numbers — a list consisting of $n$ numbers in order. We call these numbers the **components** of the vector along the $i$-th basis (direction). Hereafter we assume all bases are ordered. We arrange these $n$ numbers vertically in order (the reason for which we will discuss later), forming a column vector; when no confusion arises, we simply call it a vector. Thus, "vector" has two meanings: an element in an abstract linear space, or a vertically arranged list of numbers once the linear space is equipped with a basis. Denoting the $i$-th component of a vector $\vect{v}\in V$ in an $n$-dimensional vector space $V$ by $v^i$, we have

$$
\vect{v} = \sum_i^n v^i \vect{b}_{i}.
$$

By convention (and, once again, for some mysterious reasons), we use superscripts to label vectors in a vector space, corresponding to the subscripts of the basis vectors.

Furthermore, because of this correspondence, we can consider relating an $n$-dimensional linear space over $\field{k}$ to a special and familiar linear space $\field{k}^n$; in the case $\field{k} = \R$, we obtain the familiar $\R^n$ space. The method of correspondence is to let the column vector formed by a vector after choosing a basis represent the coordinates of a point in $\R^n$. This correspondence has special significance, which we will mention later.

## Linear Maps

A linear space by itself does not have much to say about it; to study linear spaces more deeply, one must connect different linear spaces together. And the thing that connects different linear spaces is the so-called **linear map**.

A linear map is first and foremost a *map* from one linear space to another, and then it is required to possess *linearity*. Linearity is the property of preserving the linear space structure (addition and scalar multiplication); a map with this property does not destroy the structure of the linear space: the image of a linear space under such a map is certainly a linear space. This idea, when made rigorous, becomes the so-called linear map, or **linear homomorphism**.

> [!DEF] Linear Map (Linear Homomorphism)
>
> Let $V,W$ be linear spaces over the same field $\field{k}$. A map
> 
> $$L\vcentcolon V\to W$$
> 
> is called a linear map or linear homomorphism if for all $\vect{u},\vect{v}\in V$ and $a\in\field{k}$,
> 
> $$L(\vect{u}+\vect{v})=L(\vect{u})+L(\vect{v}),\qquad L(a \vect{u})=a L(\vect{u}).$$
> 
> Equivalently, for any finite sum,
> 
> $$L\Bigl(\sum_{i=1}^n a^i \vect{v}_i\Bigr)=\sum_{i=1}^n a^i L(\vect{v}_i).$$
> 
> We denote the set of all linear maps by $\Hom(V,W)$. If $L$ is a bijection, we call $L$ a linear isomorphism.

In summary, the linearity of a map $L$ from $V$ to $W$ makes the following approach completely viable: we can directly map $\vect{v}\in V$ to $\vect{w} = L(\vect{v}) \in W$, or we can first decompose $\vect{v}$ into a linear combination of several vectors $\vect{v}_i$, then map those vectors to $\vect{w}_i = L(\vect{v}_i) \in W$, and finally form a linear combination of the results. These two paths will yield exactly the same result. We call a linear map from a linear space $V$ to itself a *linear transformation* or *linear operator*; the set of all linear transformations on $V$ can be denoted $\End(V)$.

With linear maps, we have a way to connect different linear spaces together; therefore, linear maps are also one of the important objects of study in linear algebra. We will later learn more about the rich and interesting properties of linear maps.

## The Category of Linear Spaces

We can also consider linear spaces and linear maps together holistically — after all, linear spaces are connected by linear maps, and every linear map has a source and a target. There is an excellent concept in algebra: **categories**, which can be used to describe this kind of thing; in linear algebra, the category we study is the **category of linear spaces**.

### Basic Facts about $\mathsf{Vect}_{\mathbb{k}}$

If we consider all linear spaces over $\field{k}$ together with all linear maps between them, we obtain the so-called category of linear spaces. We denote this category by $\Vectk$. When the field over which the linear spaces are defined is clear, we can use $\Vect$ as a shorthand. We call a linear space an object in this category, and a linear map between linear spaces a homomorphism between them.

There can be many different homomorphisms between two objects; collecting these homomorphisms together yields the $\Hom(V,W)$ mentioned above. If there exists a structure-preserving bijection along with its inverse between two objects, we say there is an isomorphism between them, and the two objects become isomorphic objects. We can also form homomorphisms from an object to itself, obtaining the $\End(V)$ mentioned above; further, considering all isomorphisms from the object to itself, the resulting set is denoted $\Aut(V)$. These sets all possess rich properties, which we will discuss later. So in fact, the notation above is borrowed from category theory.

We will not give the definition of a category here; if interested, you can refer to some of my earlier articles, which contain a detailed and rigorous definition. The main reason we introduce the concept of a category here is to facilitate later discussions using the language of commutative diagrams — for instance, about the dual of a linear space, the double dual, natural maps, and so on.

### Commutative Diagrams

So what is a commutative diagram? A commutative diagram is an important tool for describing properties in a category; it uses homomorphisms, or arrows, to connect several objects in the category and asserts that certain composites of homomorphisms/arrows yield the same result. For example, if $g\circ f = \varphi$, we say the following diagram commutes:

<!-- https://q.uiver.app/#q=WzAsMyxbMCwwLCJBIl0sWzEsMCwiQiJdLFsxLDEsIkMiXSxbMCwxLCJmIl0sWzEsMiwiZyJdLFswLDIsIlxcdmFycGhpID0gZ1xcY2lyYyBmIiwyXV0= -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMyxbMCwwLCJBIl0sWzEsMCwiQiJdLFsxLDEsIkMiXSxbMCwxLCJmIl0sWzEsMiwiZyJdLFswLDIsIlxcdmFycGhpID0gZ1xcY2lyYyBmIiwyXV0=&embed" width="304" height="304" style="border-radius: 8px; border: none;"></iframe>

The main purpose of commutative diagrams is to express the equality of composites of morphisms, and when morphism composites are equal, one often obtains the special conclusion that the morphism does not depend on the internal structure of the objects. We will later discover the utility (power) of this formulation.

## An Example: $n$-Dimensional Linear Space $\R^n$

Finally, we discuss a special example: the $n$-dimensional linear space $\Bbbk^n$.

### Basic Structure of $\R^n$

$\Bbbk^n$ is a special linear space — it is the set obtained by taking the Cartesian product of the field $\Bbbk$ with itself $n$ times, and then endowing it with a simple linear structure. Here we set $\Bbbk = \R$ and see what $\R^n$ looks like.

> [!EX] The Linear Space $\R^n$
>
> We take the field $\R$ and form its Cartesian product with itself $n$ times, obtaining the set $\R^n$. Its elements are ordered tuples $(r_1,r_2,\dots,r_n)$. We define scalar multiplication over $\R$ on it as:
>
> $$\cdot_{\R^n}\vcentcolon\R\times\R^n\to\R^n,\quad (r,(r_1,\dots,r_n))\mapsto (rr_1,\dots,rr_n) \ \ \forall r\in \R, (r_1,\dots,r_n) \in \R^n$$
>
> That is, scalar multiplication is defined as multiplying each component by a number using the multiplication of $\R$. Addition is defined as:
> 
> $$+_{\R^n}\vcentcolon\R^n\times\R^n\to\R^n,\quad ((r_1,\dots,r_n),(s_1,\dots,s_n))\mapsto (r_1+s_1,\dots,r_n+s_n) \ \ \forall (s_1,\dots,s_n),(r_1,\dots,r_n) \in \R^n$$
>
> That is, each component is added using the addition of $\R$. It is easy to verify that this set indeed becomes a vector space under addition and scalar multiplication. It naturally has a basis, which we specially denote as $\BaseE = \basev{e}{i}{n}$, where $\vect{e}_i$ represents the coordinate $(0,\dots,1,\dots,0)$, i.e., with $1$ in the $i$-th position and $0$ everywhere else. We call this basis the **canonical basis** or **standard basis** of $\R^n$.

Why do we particularly discuss this vector space? It has many interesting aspects. First, we are very familiar with it, because its three-dimensional case is the so-called "three-dimensional space" we are familiar with (speaking loosely); second, we can use it to study some interesting perspectives, such as relating any linear space to it.

### $n$-Dimensional Free Vector Space over $\R$

First of all, thanks to the [discussion on MSE](https://math.stackexchange.com/questions/18315/free-vector-space-and-vector-space) — this section is essentially a retelling of the discussion there.

Consider a set with $n$ elements: $\{1,2,\dots,n\}$, and all maps from it to $\R$: $f\vcentcolon\{1,2,\dots,n\}\to\R$. Now consider one such map — it sends an element from the domain to a number in $\R$, or equivalently, it assigns a real number to each of the $n$ positions in the domain. It is not hard to see that this is essentially the same as the ordered tuples we created — in both cases, the $i$-th position has a real number. We collect all these $f$ into a set and then define addition and scalar multiplication on it. Addition is defined as pointwise addition of functions, and scalar multiplication is similarly defined as pointwise scalar multiplication. One can verify that such operations indeed make this set a linear space; and more cleverly, we have actually defined $\R^n$ above in another way!

But the interesting part does not stop there — the reason being that for this set of $n$ elements, we need not take the integer set from $1$ to $n$; we could take any set we like. Something like $\{\text{🍎},\text{🍑},\text{🍐}\}$, $\{\text{昨天},\text{今天},\text{明天}\}$, $\{\text{童年},\text{在人间},\text{我的大学}\}$ ... We can always construct maps from them to $\R$ and make them into a linear space, and notably, each element of this set will become a *basis vector* in the new linear space.

We call the collection of all such functions from a set with $n$ elements to $\R$ a **free linear space**. And with this concept, we can also obtain two facts:
- A finite-dimensional linear space can be completely determined by its basis. Because once the basis is given, we can always construct the linear space using the method above.
- All $n$-dimensional linear spaces are isomorphic, because we can always choose a basis for each of them, and starting from this basis, uniformly define the elements of the linear space as well as their addition and scalar multiplication using the method above, ultimately recovering the original linear space; and these bases as sets are all isomorphic, since isomorphism of sets only requires the existence of a bijection between them, or equivalently, that the two sets have the same cardinality.

Given this, we can regard any $n$-dimensional vector space over $\R$ as $\R^n$ — we only need to connect them via the isomorphism of sets $\BaseBV \to \BaseE$. This perhaps also explains why we call a vector space a linear space *over the field $\Bbbk$*. Additionally, we can also regard $\R$ itself as a linear space — its basis can simply be taken as $1$, which is quite convenient.

Finally, we point out: **free** is actually a concept originating from category theory. "Free" roughly means constructing an object in a category from a set, considering only what is necessary to satisfy the axioms for being such an object, without adding any extra structure. The object obtained this way becomes the purest possible algebraic structure. Due to the author's limited knowledge, I won't elaborate further here (sob sob). However, it can be noted that any finite-dimensional linear space can become a free linear space once a basis is chosen; if we consider changing the basis of this linear space, it becomes another free linear space, because the basis is different. Thus, free linear spaces and linear spaces are not quite the same thing. Moreover, for infinite-dimensional linear spaces, not all linear spaces are free — only those with **finite support** are free, i.e., those whose basis has only finitely many basis vectors.

In any case, as a special and important example, $\R^n$ is tremendously useful, which will be reflected in our subsequent discussions.

## Summary

Let us briefly summarize here. In this chapter, we have done the following:

- Briefly established the notation system for this series. We distinguish between abstract vectors, matrices, and scalar components, and for now we do not use Einstein summation;
- Defined linear spaces: satisfying the eight axioms is sufficient; introduced linear combinations, linear dependence/independence;
- Defined linear subspaces and linear span, explained the relationship between generating sets and span;
- Defined bases and dimension; noted that the so-called "maximal linearly independent set" is equivalent to a basis;
- Pointed out that a vector has a unique coordinate representation under a basis, and used this to establish an isomorphism between abstract vector spaces and $\R^n$;
- Briefly discussed the relationship between linear spaces and subspaces, namely the so-called direct sum;
- Introduced concepts such as linear maps/isomorphisms/operators, which are maps that preserve linear structure;
- Said a few words about the category of linear spaces and established some notation ($\Hom,\End,\Aut,\Vect$) to facilitate later discussion;
- Briefly studied the construction of the linear space $\R^n$ and its standard basis;
- From a new perspective of "free linear spaces," pointed out that "all $n$-dimensional linear spaces are isomorphic to one another."

With this chapter, we should have a basic understanding of linear spaces. Starting from the next chapter, we will discuss linear maps in depth — their own characteristics, and their connection to an important tool in linear algebra: matrices.