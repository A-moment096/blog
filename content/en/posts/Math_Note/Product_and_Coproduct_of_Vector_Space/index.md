---
categories:
- Mathematics
# - Programming
# - Phase Field
# - Others
tags:
- Linear Algebra
- Category Theory
- Algebra 
- Abstract Algebra
- Note
title: The Product and Coproduct of Vector Spaces
description: The distinction hidden deep within set theory
date: 2025-10-05T19:55:20+08:00
image: /images/Eyjafjalla.jpg
imageObjectPosition: center 20%
math: true
hidden: false
comments: true
---

*What exactly is the difference between the direct product (product) and direct sum (coproduct) of vector spaces? Where does their distinction originate? This question that troubled me for a long time has finally found its answer today — let's take a look together~*

*The selected song is from the album [**two**](https://music.163.com/#/album?id=72378630) by [**鹿乃**](https://space.bilibili.com/316381099), which I recently asked a friend to buy from Japan (hasn't arrived yet). It is also a song by my beloved producer [**電ポルP**](https://www.nicovideo.jp/user/865371) (Koyori, also called Utility Pole P, because the song illustrations often feature utility poles), released in 2014 and sung by v flower: **曖昧劣情Lover**. It's truly wonderful — I really like it. The featured image is an AI-generated picture of the adorable Eyjafjalla, produced by a certain mysterious group-chat friend's friend **派佬**. I hope you enjoy it~*

{{<music auto="https://music.163.com/#/song?id=1302953067" loop="none">}}

$$
\gdef\field#1{\mathbb{#1}}
\gdef\zero{\mathbf{0}}
\gdef\one{\mathbf{1}}
\gdef\cat#1{\mathcal{#1}}
\gdef\catname#1{\mathsf{#1}}
\gdef\Hom{\operatorname{Hom}}
\gdef\Ob{\operatorname{Ob}}
\gdef\Mor{\operatorname{Mor}}
$$

## Preface

Recently, while writing content related to linear algebra and tensor algebra, I suddenly recalled a question that had troubled me for a very, very long time: what exactly is the difference between the direct product and the direct sum of vector spaces? There is a very simple answer to this question: in finite dimensions, the direct product and direct sum are isomorphic, but in infinite dimensions, things are different — the direct product is just like the Cartesian product of sets, that's fine, while the direct sum requires that a vector can only have finitely many nonzero components. However, this answer is still unsatisfying: why? Why are the direct product and direct sum so different? Seen this way, the direct sum becomes a subset of the direct product?

Although forcibly accepting it is not impossible, this seemingly perfunctory answer is still hard to be satisfied with. Fortunately, with the help of category theory and the great internet, I was able to touch upon some of the inner workings of this problem and arrive at an answer that I'm satisfied with. Here I'll boldly chat about my views on this question.

We assume here that the reader knows what concepts like vector spaces, linear independence, and bases are. A rough idea is enough — we'll bring these concepts up again later. Additionally, all our vector spaces are over $\field{k}$. For readers familiar with category theory, the problems we discuss are confined to the category $\catname{Vect}_\field{k}$. Finally, we don't distinguish between vector spaces and linear spaces, nor between infinite and infinity — as we write, we'll casually pick one of the two words; please excuse us.

## The Direct Product of Vector Spaces

Let's first look at the direct product, naturally starting from the direct product of finitely many vector spaces.

### The Direct Product of Two Vector Spaces, and Generalization

Suppose we have two vector spaces. We can construct a larger vector space from them, and the method is precisely the so-called *direct product*. The method of direct product is very simple: we view the vector spaces as sets, take the Cartesian product of these two sets, and then each of its elements becomes a pair. Then we define addition and scalar multiplication on this set: the addition of pairs is defined as the addition of the elements at corresponding positions in their original vector spaces, and scalar multiplication simultaneously multiplies both positions. It can be verified that such a result still yields a vector space. We call this construction process the so-called **direct product**.

For example, suppose we have two vector spaces $V$ and $W$ over $\field{k}$. We want to construct the so-called direct product from them, denoted $V\times W$. Its elements are of the form $(v,w)$, where $v\in V$ and $w\in W$. To facilitate distinguishing between the addition and scalar multiplication of different vector spaces, we attach subscripts to their addition and scalar multiplication. So, as described above, the addition and scalar multiplication of the direct product are respectively:

$$
\begin{aligned}
+_\times \colon &(V \times W) \times (V \times W) \to V \times W,\\
&((v_1, w_1), (v_2, w_2)) \longmapsto 
(v_1 +_V v_2,\, w_1 +_W w_2);
\\[1em]
\cdot_\times \colon &\Bbbk \times (V \times W) \to V \times W,\\
&(\lambda, (v, w)) \longmapsto 
(\lambda \cdot_V v,\, \lambda \cdot_W w).
\end{aligned}
$$

The two operations above hold for all $v_1,v_2,v\in V$, $w_1,w_2,w\in W$, $\lambda\in\field{k}$.

We can naturally extend this concept backward. We can consider taking the direct product of multiple vector spaces to obtain an even larger vector space, with addition and scalar multiplication on it defined similarly to above. We call addition defined in this way **pointwise addition**, and such scalar multiplication also **pointwise scalar multiplication**.

We can even try to generalize this concept to the infinite case.

### The Direct Product of Infinitely Many Vector Spaces

Let there be an index set $I$ and an index $i\in I$ on it (what is an index set? A set that only cares about size without caring about specific elements — for example, a finite set $\{1,2,3\}$, the set of natural numbers $\field{N}$, or an uncountable set like $\field{R}$). We define the direct product $\prod_{i\in I}V_i$ of $\{V_i\}_{i\in I}$ as the following set: its element at the $i$-th position comes from $V_i$, and its addition and scalar multiplication are defined in a pointwise manner.

It can be proved that it satisfies the eight axioms of a vector space:

- Addition satisfies closure, because the pointwise addition at each $i$ is closed within $V_i$;
- Addition is associative and commutative, because the addition at $i$ is associative and commutative;
- Addition has an identity element — simply make the element at each position $\zero$;
- Addition has inverses — also simply give the inverse from $V_i$ for the element at each position;
- Scalar multiplication is compatible with multiplication in $\field{k}$ and multiplication of elements in $\prod_{i\in I}V_i$, because at each position $i$ this result holds;
- Scalar multiplication distributes over addition — simply let scalar multiplication distribute over the addition in each $V_i$;
- Addition in $\field{k}$ is compatible with scalar multiplication — also simply let each addition result first scalar-multiply onto the $i$-th position, then distribute according to the addition in $V_i$.

The direct product is just such a thing — very simple (plain? monotonous?). So what about the direct sum?

## The Direct Sum of Vector Spaces

Before discussing the direct sum of vector spaces, let's first discuss *subspaces of a vector space* and *the sum of subspaces*.

### Linear Subspaces

Having a vector space, as a set we can naturally discuss subsets of the vector space. If this subset, after being endowed with the addition and scalar multiplication of the original space, can still become a vector space, we call this subset a linear subspace. The existence of linear subspaces allows us to split a smaller space out of a vector space. We will naturally consider this question: if we subtract a subspace from the original space in the manner of set subtraction, what is the remaining thing?

Let us point out here: the remaining thing is very strange — it is a broken vector space: it lacks $\zero$. If we duplicate a copy of $\zero$ and give it to the remaining thing, it becomes a vector space again, and according to the definition of a subspace, the remaining part together with $\zero$ is also a linear subspace. Spoiler alert: the vector space is thus split into the direct sum of two such linear subspaces.

However, the direct sum does not appear directly — a direct sum defined in this way must first have an original space and a subspace; it's not very free. The definition of the direct sum appears only after we define the sum of vector spaces.

### The Sum of Subspaces

With the help of the vector addition defined on the vector space, we can define the sum of two subspaces: we arbitrarily take vectors from the two subspaces, then combine them linearly in any arbitrary way, and finally collect them together. What does it yield? What are its elements? We don't need to worry that the newly obtained thing lacks a definition, because it is simply a vector in the original vector space, and we can confidently say that this sum is also a subspace of the original vector space.

We denote the sum of subspaces $V_1$ and $V_2$ of the vector space $V$ as $V_1+V_2$. By definition, we know that the sum of subspaces satisfies commutativity — we can swap the order of the two linear subspaces and the resulting subspace is the same. Additionally, we can naturally generalize the sum of *two* vector spaces to the sum of *multiple* vector spaces. We won't elaborate further here.

However, the sum of subspaces has an interesting characteristic: if $V_1 = V_2$, then $V_1+V_2 = V_1 = V_2$ — this can be verified from its definition. Or put another way, the sum of subspaces does not necessarily give a larger subspace, and when it can give a larger subspace, the two subspaces can only have partial overlap. So? At minimum, how much can they overlap? Can they not overlap at all (have no common vectors)? The answer is: at minimum, they must both have $\zero$ — this is a necessary condition for being a linear subspace.

At last, we can discuss the direct sum of subspaces.

### The Direct Sum of Subspaces

Let us define the direct sum in a less rigorous way. When several subspaces of a vector space share only the common $\zero$, their sum can be called a direct sum. Such a description can be expressed in the language of linear combinations: the sum of linear subspaces becomes a direct sum if and only if the vectors from the sum can be *uniquely* expressed as linear combinations of vectors from each subspace — or put another way, the zero vector can only be obtained by combining the zero vectors from each linear subspace. If we borrow the concepts of the original space and linear independence, we can conclude: a sum of a family of linear subspaces can become a direct sum if and only if, after arbitrarily selecting one nonzero vector from each linear subspace to form a set of vectors, this set of vectors is linearly independent.

Four conditions for the sum of linear subspaces to become a direct sum were given above. It can be proved that they are all equivalent and mutually derivable.

Finally, the direct sum of linear subspaces can be analogized to the disjoint union of sets. For example, if a vector space $V$ has a linear subspace $W$, we can delete this subspace from the vector space to obtain another thing $V\setminus W$, which naturally is disjoint from $W$, but this set is not a linear subspace. When we add $\zero$ back to $V\setminus W$, it can become a linear subspace, and after taking the direct sum with $W$, it yields $V$. Or we can put it this way: due to the nature of the direct sum of linear subspaces, their common subset is only $\{\zero\}$. And if we dig out $\zero$ from each linear subspace, they become sets with empty intersection; after taking the disjoint union and then adding $\zero$ back, we again obtain a linear subspace — and this subspace is none other than the result of taking the direct sum of the preceding subspaces.

As can be seen, the direct sum of linear subspaces and the disjoint union of sets differ only by "one of the conditions for a set to become a vector space": the zero vector. Then can we generalize the *direct sum of subspaces* to the *direct sum of vector spaces*? Using the analogy above, this is actually possible. Just like the disjoint union, we operate as follows:

- Dig out $\zero$ from each vector space. They then become a family of sets;
- Assign an index to each vector space, and take the disjoint union.
- Add $\zero$ back to the result of the disjoint union. According to the requirements of the direct sum, let the $\zero$ in the direct sum be the result obtained by taking $\zero$ from each vector space and placing it at the corresponding position.

Thus, we obtain the direct sum of vector spaces. It no longer depends on the existence of a subspace of some vector space. Moreover, we can see that if we follow the operations above, the result obtained is actually the same as the direct product of vector spaces: the elements are all $n$-tuples, and the $i$-th position is obtained from the vector space $V_i$.

Then can we generalize the direct sum of vector spaces to the direct sum of infinitely many vector spaces? This is a very interesting question. The answer is: yes, but not arbitrary ones. The direct sum of infinitely many vector spaces is a subspace of their direct product (a subset set-theoretically). The direct sum imposes a requirement on the elements of the infinite-dimensional tuple: there can only be finitely many nonzero vectors, and all remaining positions must be the $\zero$ of their respective vector spaces.

Why? Why is this the case? Why are the direct sum and direct product of vector spaces the same in the finite-dimensional case, but not the same in the infinite case? Let's set this question aside for now and first look at how category theory views the direct product and direct sum. If you are relatively familiar with the language of category theory, you may skip the following chapter.

## Categories

Why discuss this problem from the perspective of category theory? Because structures like *direct product* and *direct sum* appear in various fields of mathematics — they are so universal that we can abstract them out from the perspective of category theory for unified study. Let's first look at what a category is.

A category collects a series of mathematical *objects*, and the *arrows* between these mathematical objects, also called *morphisms*, and finally stipulates the axioms that these arrows must satisfy.

### The Definition of a Category

Here I borrow the definition of a category from Professor Li Wenwei's *Methods of Algebra*:

> [!DEF] Category
>
> A category $\cat{C}$ refers to the following data:
>
> 1. A set $\Ob(\cat{C})$, whose elements are called the **objects** of $\cat{C}$;
> 2. Another set $\Mor(\cat{C})$, whose elements are called the **morphisms** of $\cat{C}$.
>
> Additionally, the following requirements exist between the above two sets:
> - There is a pair of mappings between the two sets: $s\vcentcolon\space\Mor(\cat{C}) \to \Ob(\cat{C})$ and $t\vcentcolon\space\Mor(\cat{C}) \to \Ob(\cat{C})$, which respectively indicate the **source** and **target** of a morphism.
>
> For morphisms, there are the following requirements:
> - For any two objects $X,Y\in\Ob(\cat{C})$, we can obtain from the pair of mappings above the set of all morphisms between these two objects: $\Hom_\cat{C}(X,Y)\vcentcolon=\space s^{-1}(X)\cap t^{-1}(Y)$. When the category referred to is clear, this may be abbreviated as $\Hom(X,Y)$. Such sets are also called $\mathrm{Hom}$-sets;
> - For any object $X$, there must exist a morphism $\mathrm{id}_ {X} \in \Hom_{\cat{C}}(X,X),$ called the identity morphism from $X$ to itself;
> - Given any three objects $X,Y,Z\in\Ob(\cat{C})$, there is a mapping between their $\mathrm{Hom}$-sets, called the **composition map**, defined as:
> $$\begin{align*} 
> \circ\vcentcolon\space\Hom_\cat{C}(Y,Z) \times \Hom_\cat{C}(X,Y)&\to \Hom_\cat{C}(X,Z)\\ 
> (f,g)&\mapsto f\circ g\\
> \end{align*}$$
> and when there is no risk of confusion, the middle $\circ$ may be omitted, abbreviating $f\circ g$ as $fg$.
>
> Finally, for the composition map above, there are two requirements:
> 1.    Associativity: For any morphisms $h,g,f\in\Mor(\cat{C})$, if the compositions $f(gh)$ and $(fg)h$ are both defined, then $$f(gh) = (fg)h.$$
> 2.    For any morphism $f\in\Hom_\cat{C}(X,Y)$, its composition with the identity morphism satisfies the relations:
> $$f\circ\mathrm{id}_X = f = \mathrm{id}_Y\circ f.$$

A very nice example is the category of sets $\catname{Set}$. Its objects are naturally various sets, and its morphisms or arrows are mappings between sets, without any additional structure. For other categories, we also require that morphisms preserve structure: otherwise the target of the morphism wouldn't be in the category. And here, vector spaces can naturally also form a category. We generally fix a number field $\field{k}$ and then study the vector spaces defined over it. Therefore, the vector spaces over $\field{k}$, together with the linear maps (homomorphisms) between them, form a category. We call it $\catname{Vect}_\field{k}$, the category of vector spaces over the number field $\field{k}$. It can be said that the linear algebra course we study is precisely the study of $\catname{Vect}_\field{R}$ or $\catname{Vect}_\field{C}$.

### Commutative Diagrams

One of the important objects of study in category theory is the commutative diagram. A commutative diagram visualizes the property that *two operations commute in order*. Taking linear maps between vector spaces as an example, for two vector spaces $V,W$ in the category of vector spaces $\catname{Vect}_\field{k}$ and a morphism $f\vcentcolon V\to W$ from $V$ to $W$ between them, by definition the following two commutative diagrams hold:

For vector space addition, we have:

<!-- https://q.uiver.app/#q=WzAsNCxbMCwwLCJWIFxcdGltZXMgViJdLFsxLDAsIlcgXFx0aW1lcyBXIl0sWzAsMSwiViJdLFsxLDEsIlciXSxbMCwxLCJmIFxcdGltZXMgZiJdLFswLDIsInsrX1Z9IiwyXSxbMSwzLCJ7K19XfSJdLFsyLDMsImYiLDJdXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwwLCJWIFxcdGltZXMgViJdLFsxLDAsIlcgXFx0aW1lcyBXIl0sWzAsMSwiViJdLFsxLDEsIlciXSxbMCwxLCJmIFxcdGltZXMgZiJdLFswLDIsInsrX1Z9IiwyXSxbMSwzLCJ7K19XfSJdLFsyLDMsImYiLDJdXQ==&embed" width="372" height="304" style="border-radius: 8px; border: none;"></iframe>

where the subscript at the lower right indicates the vector addition in different vector spaces. For scalar multiplication, we have:

<!-- https://q.uiver.app/#q=WzAsNCxbMCwwLCJcXG1hdGhiYntrfSBcXHRpbWVzIFYiXSxbMSwwLCJcXG1hdGhiYntrfSBcXHRpbWVzIFciXSxbMCwxLCJWIl0sWzEsMSwiVyJdLFswLDEsIntcXG1hdGhybXtpZH1fe1xcbWF0aGJie2t9fSBcXHRpbWVzIGZ9Il0sWzAsMiwie1xcY2RvdF9WfSIsMl0sWzEsMywie1xcY2RvdF9XfSJdLFsyLDMsImYiLDJdXQ== -->
<span style="display:block"><iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwwLCJcXG1hdGhiYntrfSBcXHRpbWVzIFYiXSxbMSwwLCJcXG1hdGhiYntrfSBcXHRpbWVzIFciXSxbMCwxLCJWIl0sWzEsMSwiVyJdLFswLDEsIntcXG1hdGhybXtpZH1fe1xcbWF0aGJie2t9fSBcXHRpbWVzIGZ9Il0sWzAsMiwie1xcY2RvdF9WfSIsMl0sWzEsMywie1xcY2RvdF9XfSJdLFsyLDMsImYiLDJdXQ==&embed" width="347" height="304" style="border-radius: 8px; border: none;"></iframe></span>

Similarly, the subscript at the lower right indicates the scalar multiplication in different vector spaces. We say these two diagrams commute if and only if we have the definition of a linear map given above — or, using the categorical way, using composition of morphisms, the following two equalities hold:

$$ +_W \circ f\times f = f\circ +_V;$$
$$ \cdot_W\circ \mathrm{id}_\field{k}\times f = f\circ \cdot_V.$$

Here, $\circ$ represents composition of morphisms. The first equality represents that the first diagram commutes, and the second equality represents that the second diagram commutes.

### Universal Properties

Finally, let's discuss the so-called *universal property* in category theory. A universal property is such a property: when certain objects, together with their morphisms, have some kind of connection with another object, we can use the thing with the universal property to connect them. The concrete procedure (following the manner of abstract nonsense) is illustrated with an example, as follows:

We first claim that there are some definite objects, which we call $A_i$, with $i$ being an index in an index set $I$. The next step is more interesting: we first do not discuss that special object we want to describe, but instead discuss *some object that has some relationship with this special object*. We call it $X$, and there should be some morphisms $f_i\vcentcolon X \to A_i$ between $X$ and $A_i$. Let's imagine the morphisms between $X$ and $A_i$: under the connection of these morphisms, they can form a cone-shaped structure: arrange the $A_i$ in a circle, place $X$ above, and then draw many $f_i$ from it connecting to the $A_i$.

Finally, it's our protagonist's turn to appear. The object we need to describe, which we call $S$, together with a series of morphisms from $S$ to $A_i$ (which we call $\pi_i$), has the following characteristic: we say there exists a **unique** morphism $f\vcentcolon X\to S$ such that $\pi_i \circ f = f_i$ always holds — or in other words, this commutative diagram commutes:
<!-- https://q.uiver.app/#q=WzAsMyxbMCwyLCJYIl0sWzIsMiwiUyIsWzAsNjAsNjAsMV1dLFsyLDAsIkFfaSJdLFswLDEsIlxcZXhpc3QgIWYiLDAseyJjb2xvdXIiOlsxODAsNjAsNjBdfSxbMTgwLDYwLDYwLDFdXSxbMCwyLCJmX2kiXSxbMSwyLCJcXHBpX2kiLDAseyJjb2xvdXIiOlswLDYwLDYwXX0sWzAsNjAsNjAsMV1dXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMyxbMCwyLCJYIl0sWzIsMiwiUyIsWzAsNjAsNjAsMV1dLFsyLDAsIkFfaSJdLFswLDEsIlxcZXhpc3QgIWYiLDAseyJjb2xvdXIiOlsxODAsNjAsNjBdfSxbMTgwLDYwLDYwLDFdXSxbMCwyLCJmX2kiXSxbMSwyLCJcXHBpX2kiLDAseyJjb2xvdXIiOlswLDYwLDYwXX0sWzAsNjAsNjAsMV1dXQ==&embed" width="300" height="300" style="border-radius: 8px; border: none;"></iframe>

We have marked $S$ and $\pi_i$ in red, because they are the special objects we want; we have marked the bottom arrow in blue, indicating that it is the special property that $S$ and $\pi_i$ satisfy.

It is worth noting that in category theory, what we should care most about is not objects, but the morphisms between objects: a morphism contains information about its source and target, while a mere object does not have such rich information. If we shift our gaze from $S$ and $X$ to the morphisms among the three objects, we can see that we currently have $A_i$, the special objects are $\pi_i$ and the accompanying $S$, and for any $f_i$ we can have a unique $f$ that decomposes $f_i$ into $\pi_i$ and $f$.

With the universal property, we can finally begin to enter the main topic.

## Products and Coproducts

In category theory, there are the so-called *product* and *coproduct*. They actually respectively belong to the so-called *limit* and *colimit*, but we don't plan to discuss things this deeply.

### Products

We use commutative diagrams to define the categorical product:

> [!DEF] Product
> 
> In a category $\cat{C}$, take objects $X_1$ and $X_2$ in it. Another object $X$ in $\cat{C}$ is called the product of $X_1$ and $X_2$, which we usually denote as $X_1\times X_2$. It is an object in $\cat{C}$ together with a pair of projection morphisms $\pi_1\vcentcolon X\to X_1$ and $\pi_2\vcentcolon X\to X_2$, satisfying the following universal property:
>
> For any object $Y$ in $\cat{C}$ and morphisms $f_1\vcentcolon Y\to X_1$ and $f_2\vcentcolon Y\to X_2$, there exists a unique morphism $f\vcentcolon Y\to X$ such that the following diagram commutes:
>
> <!-- https://q.uiver.app/#q=WzAsNCxbMCwxLCJZIl0sWzIsMSwiWCJdLFszLDAsIlhfMSJdLFszLDIsIlhfMiJdLFswLDEsIlxcZXhpc3QhZiJdLFswLDIsImZfMSJdLFswLDMsImZfMiIsMl0sWzEsMiwiXFxwaV8xIiwyXSxbMSwzLCJcXHBpXzIiXV0= -->
> <iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwxLCJZIl0sWzIsMSwiWCJdLFszLDAsIlhfMSJdLFszLDIsIlhfMiJdLFswLDEsIlxcZXhpc3QhZiJdLFswLDIsImZfMSJdLFswLDMsImZfMiIsMl0sWzEsMiwiXFxwaV8xIiwyXSxbMSwzLCJcXHBpXzIiXV0=&embed" width="560" height="432" style="border-radius: 8px; border: none;"></iframe>
>
> Generalizing this construction to a family of objects $\{X_i\}_{i\in I}$, we denote their product as $\prod_{i\in I}X_i$, with projection morphisms $\pi_i\vcentcolon \prod_{i\in I} X_i \to X_i$, which makes the following diagram commute:
>
> <!-- https://q.uiver.app/#q=WzAsMyxbMCwyLCJZIl0sWzIsMiwiXFxwcm9kX3tpXFxpbiBJfVhfaSJdLFsyLDAsIlhfaSJdLFswLDEsIlxcZXhpc3QhZiJdLFsxLDIsIlxccGlfaSIsMl0sWzAsMiwiZl9pIl1d -->
> <iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMyxbMCwyLCJZIl0sWzIsMiwiXFxwcm9kX3tpXFxpbiBJfVhfaSJdLFsyLDAsIlhfaSJdLFswLDEsIlxcZXhpc3QhZiJdLFsxLDIsIlxccGlfaSIsMl0sWzAsMiwiZl9pIl1d&embed" width="473" height="432" style="border-radius: 8px; border: none;"></iframe>

From the commutative diagram above, we can make the following comment about the product: the product of a family of mathematical objects is a special object such that when an object $Y$ contains information about one of this family of mathematical objects (denoted $X_i$), we can always first map this object to the product, and then recover from the product the information destined for $X_i$. Or put another way: we don't construct the product from the mathematical objects; rather, there is an object named the product that contains all the information of these mathematical objects. Precisely for this reason, any object and a mapping from it to $X_i$ can first find the information of $X_i$ in the product, and finally transmit it from the product to $X_i$ itself.

### Coproducts

And when we reverse all the arrows in the definition above, we obtain the so-called coproduct.

> [!DEF] Coproduct
>
> In a category $\cat{C}$, given objects $X_1,X_2$, if there exists an object $X$ (denoted $X_1 \amalg X_2$) and insertion morphisms $\iota_1\vcentcolon X_1 \to X$ and $\iota_2\vcentcolon X_2 \to X$, such that:
>
> For any object $Y$ and morphisms $g_1\vcentcolon X_1 \to Y$, $g_2\vcentcolon X_2 \to Y$, there exists a unique morphism $g\vcentcolon X \to Y$ satisfying
> $g \circ \iota_1 = g_1,\quad g \circ \iota_2 = g_2$,
> then $X$ is called the coproduct of $X_1$ and $X_2$.
>
> Making the following diagram commute:
> <!-- https://q.uiver.app/#q=WzAsNCxbMSwxLCJYIl0sWzMsMSwiWSJdLFswLDAsIlhfMSJdLFswLDIsIlhfMiJdLFswLDEsIlxcZXhpc3QhZyIsMCx7ImxhYmVsX3Bvc2l0aW9uIjo0MH1dLFsyLDAsIlxcaW1hdGhfMSIsMl0sWzMsMCwiXFxpbWF0aF8yIl0sWzMsMSwiZ18yIiwyXSxbMiwxLCJnXzEiXV0= -->
> <iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMSwxLCJYIl0sWzMsMSwiWSJdLFswLDAsIlhfMSJdLFswLDIsIlhfMiJdLFswLDEsIlxcZXhpc3QhZyIsMCx7ImxhYmVsX3Bvc2l0aW9uIjo0MH1dLFsyLDAsIlxcaW1hdGhfMSIsMl0sWzMsMCwiXFxpbWF0aF8yIl0sWzMsMSwiZ18yIiwyXSxbMiwxLCJnXzEiXV0=&embed" width="560" height="432" style="border-radius: 8px; border: none;"></iframe>
> 
> Generalizing to a family of objects $\{X_i\}_{i\in I}$, their coproduct is denoted $\coprod_{i\in I} X_i$, with insertion morphisms $\iota_i\vcentcolon X_i \to \coprod_{i\in I} X_i$, satisfying:
>
> For any object $Y$ and a family of morphisms $g_i\vcentcolon X_i \to Y$, there exists a unique morphism
> $g\vcentcolon \coprod_{i\in I} X_i \to Y$ such that for each $i$,
> $g \circ \iota_i = g_i$.
>
> Making the following diagram commute:
>
> <!-- https://q.uiver.app/#q=WzAsMyxbMCwyLCJZIl0sWzIsMiwiXFxjb3Byb2Rfe2lcXGluIEl9WF9pIl0sWzIsMCwiWF9pIl0sWzEsMCwiXFxleGlzdCFnIiwyXSxbMiwxLCJcXGltYXRoX2kiXSxbMiwwLCJnX2kiLDJdXQ== -->
> <iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMyxbMCwyLCJZIl0sWzIsMiwiXFxjb3Byb2Rfe2lcXGluIEl9WF9pIl0sWzIsMCwiWF9pIl0sWzEsMCwiXFxleGlzdCFnIiwyXSxbMiwxLCJcXGltYXRoX2kiXSxbMiwwLCJnX2kiLDJdXQ==&embed" width="473" height="432" style="border-radius: 8px; border: none;"></iframe>

And for the coproduct, imitating our comment on the product, we can say that the coproduct contains all the information originating from a family of objects. If one wishes to combine the information from a certain family of objects to form a new object, one can always first place their information into the coproduct, and finally perform this combining operation from the coproduct.

### Summary: The Difference Between Product and Coproduct

With products and coproducts, we point out: in the category of sets, the product is the Cartesian product, and the coproduct is the disjoint union of sets, and in the category of sets, the two are isomorphic. But in most other categories, for example, today's protagonist — the category of vector spaces — the product and coproduct are different. In the category of vector spaces, the product is the direct product, while the coproduct becomes the direct sum.

Where does the difference between product and coproduct lie? It actually lies in the reversal of the arrows. We know that these arrows must point from the *domain* to the *codomain*. Let's carefully examine the part about *there exists a unique mapping*. In the product, this arrow goes from an arbitrary object to the product — that is to say, the product sits in the position of the codomain. As the passively receiving party, when mapping to the product, no special operation is needed — just forward the information to the target of the original mapping, i.e., some member of that family of objects. However, in the coproduct, this arrow goes from the coproduct to some arbitrary object. This means that after we select an element from that family of objects, it must first find a correspondent in the coproduct, and then take that unique mapping to correspond to the target, while guaranteeing that the result is the same as without going through itself.

To give a perhaps not-entirely-apt analogy: in the case of the product, it's like in the old days when people communicated by telephone. If you wanted to communicate with someone, you could spend a lot of money to pull a dedicated line over, but if you wanted to call many people, this wouldn't be very convenient. At such times, you could first dial the switchboard, letting the switchboard operator handle the problem of whom you wanted to call. The telephone directory at the switchboard operator's desk is like that product. And in the case of the coproduct, it's like assigning seats to people in a class — you could let everyone directly go into the classroom and sit down, or you could first take out a piece of paper, let everyone choose a position on it, and then let them sit on the positions drawn on the paper.

The subtle distinction between product and coproduct thus becomes the root of the distinction between the direct product and the direct sum. And the trigger that causes their difference is a frequent guest in mathematics: the infinite / infinity.

## The Nightmare of Infinite Dimensions

Let's first look at the situation in the finite-dimensional case for both.

### The Finite-Dimensional Situation

In the finite-dimensional case, for the direct product, needless to say, each vector is simply an $n$-tuple, with each position being a vector in a vector space. The direct sum is similar, because each vector in the direct sum can be written as the sum of a unique vector from each vector space in this family of vector spaces. After we order these vector spaces, we can still express them as an $n$-tuple. Everything is reasonable and fully in line with our expectations.

However, when we reach infinite dimensions, things change.

### The Infinite-Dimensional Situation

In the infinite-dimensional case, we have already verified the direct product. Due to the manner of its construction, its existence is perfectly reasonable — one simply needs to piece together the vectors from each vector space to obtain a vector in the direct product, and the direct product is likewise a vector space.

However, for the direct sum, things are not so simple. Consider the definition process of the direct sum: we started from the sum of linear subspaces, developed the direct sum of linear subspaces, and then abstracted the meaning of the direct sum into a "disjoint-union analogue" to develop the direct sum of vector spaces. In this process, the process of constructing elements of the direct sum still depends on the concept of *vector addition*. Even with "disjointness" to avoid the inability to directly sum two identical vector spaces, the generation of the direct sum still requires performing addition on the vectors from each vector space.

And herein lies the problem. When we define vector addition, we only define the addition of two vectors. And our generalization of it can only extend to the addition of finitely many vectors — it **cannot be naturally generalized to the addition of infinitely many vectors**. And this point leads to the fact that when infinitely many vector spaces are directly summed, their elements cannot contain infinitely many nonzero vectors, because that would represent the need to add **infinitely many nonzero vectors** from disjoint infinitely many vector spaces, which is not permitted — algebra does not allow such strange things to exist. Imagine: what is the result of adding infinitely many $1$s? Without a topological structure, we cannot draw any conclusion.

Therefore, only by having finitely many nonzero elements can we guarantee that in the process of constructing the direct sum, the illegal situation of "adding infinitely many nonzero vectors" does not arise.

### Where Does Category Theory Fit In?

Then, why is the characteristic of products and coproducts in category theory the root of this distinction? Let's still adopt the notation above. Consider the universal property of the product: when mapping from an object — here a vector space $Y$ — to the $i$-th member $X_i$ of a family of vector spaces, we don't need to consider any special restrictions. When it transits through $X$, it also doesn't need any special restrictions. Therefore, as long as $X$ is indeed a vector space, that's fine. The problem brought by infinity is bypassed when $X$ becomes the object receiving the information from $Y$ (regardless of whether it's infinite, the whole process is legitimate).

Now consider the universal property of the coproduct. First, if for any arrows $g_i\vcentcolon X_i\to Y$ targeting $Y$ there can be an object that realizes the decomposition of these mappings, this object must contain all the information of $\{X_i\}_{i\in I}$, and each $X_i$ must be distinguishable (two spaces cannot be mapped onto the same space). Otherwise, such a decomposition cannot succeed: some places might be missing a piece. That being the case, the elements from each space will (in some form) appear in the coproduct. So what is their form of appearance? The first thing we think of is naturally the same construction as the product: i.e., impose no restrictions whatsoever. Now consider that *there exists and is unique* arrow: take a vector with infinitely many nonzero components — it means each vector space contributes a nonzero vector. When it is brought onto $Y$ via that unique arrow, a problem arises: when going from $\{X_i\}_{i\in I}$ to $Y$, after we take an element from $X_i$, it can only correspond to one element in $Y$, and it can also only correspond to one element in the coproduct (which we are currently assuming is the product). Then placing this element into $Y$ — but the **infinitely** many nonzero elements cause **this arrow from the coproduct to $Y$ not to be unique**, because we have infinitely many slots and can arbitrarily arrange all vectors except the one that must correspond into different $Y$s, forming different morphisms.

To remedy this, one can only allow each element in the coproduct to contain only finitely many nonzero elements from the $X_i$, with all the rest set to zero. This way, we still have a method — and a unique one at that — to uniquely map the elements of the coproduct onto $Y$.

Additionally, we can also prove from a purely categorical perspective that the coproduct can only have finitely many nonzero components. Its proof utilizes the feature that the images of all $g_i$ can span a subspace of the coproduct, and proves that this spanned subspace is in fact the coproduct itself, thereby proving that the elements of the coproduct can only be composed of finitely many nonzero vectors from the $X_i$ (according to the definition of span, only linear combinations of finitely many vectors are allowed). This method is given by [this answer by Martin Brandenburg on MSE](https://math.stackexchange.com/questions/523670/infinite-coproduct-of-abelian-groups?noredirect=1&lq=1). The interesting point is that this answer is actually aimed at the category of abelian groups. But since a vector space itself is indeed an abelian group, and the root of this problem also lies in the addition on abelian groups, the answer to the problem linked here is actually fully applicable to our problem. Similarly, since a module itself is also an abelian group, modules also have such a construction, also have such a problem, and such an answer.

## Afterword

This question, to be honest, troubled me for quite a long time. After I learned about the direct product and direct sum of vector spaces, as well as category theory, this question would pop up from time to time, troubling me for several days. However, by a chance opportunity, I again systematically studied some content in vector spaces (thank you, continuum mechanics — thank you, linear algebra?), studied some content about bases of vector spaces, linear dependence/independence, and sums of subspaces, and formed some of my own views on this question.

In fact, without introducing category theory, this problem is simply a problem arising from a definition or concept that cannot be arbitrarily extended. Because the direct sum originates from the direct sum of subspaces, which strongly depends on *finite* linear combinations, this concept, algebraically, simply cannot be extended to the infinite case, and consequently, the direct sum, in any case, cannot be naturally extended to the case of infinitely many vector spaces. And because the construction of the direct product has absolutely nothing to do with the properties of vector spaces — it is purely about putting all things at different positions and squishing them together, and the result happens, under the simplest pointwise definitions of addition and scalar multiplication, to form a legitimate vector space, so it was simply allowed to become the direct product.

This problem actually receives a new answer under the framework of category theory — or perhaps a more complex (richer) interpretation. Under category theory, the direct product of vector spaces becomes the product, and the direct sum becomes the coproduct. They are two sides of the same commutative diagram, distinguished by the *directionality* of the morphisms, and the existence of the universal property magically constrains the *shape* of the product and coproduct. It's hard not to marvel at the magic of category theory. And if one delves deeper into category theory, as far as I know, the difference in their characteristics can be traced further back to *limits* and *colimits* — one of them is the "largest" and the other the "smallest." I wonder if you, the reader who has reached this point, have such a feeling. However, if we discuss limits and colimits, the content would become more complex, possibly requiring concepts like functors and natural transformations, which I'm not even sure I understand well. So, let's stop here — a satisfying answer is already good enough.

In the process of searching for the answer to this question, I also discovered many interesting things. For example, "every vector space has a basis" is equivalent to the famous AC, i.e., the Axiom of Choice. When we accept AC, all vector spaces, even infinite-dimensional ones, do possess a basis. And if we can find a basis for an infinite-dimensional vector space, we can construct other bases from this basis — and this operation is very similar to the operation in a certain miraculous phenomenon that appears after accepting AC: the Banach-Tarski paradoxical decomposition of the sphere. Additionally, the "always has a basis" we speak of is still under our existing definition of **linear combination**, i.e., **every element in the vector space can be uniquely expressed as a linear combination of basis vectors**, and the linear combination here is always finite.

So actually, I initially planned to write some content about set theory and bases of vector spaces at the end of this article. Nevertheless, they are somewhat too far off from the main topic, and I abandoned them. This article also initially planned to gradually introduce the whole problem starting from the definition of vector spaces, but later I also rejected that, because then this article would again become a super lengthy piece. Regarding the linear algebra part, let's organize it and put it into the planned *Tensor Algebra / Tensor Calculus* series. I'm also not entirely satisfied with the content of this article — I got stuck many times during the writing process, and the expression in some places is not sufficiently satisfying. If in the process of reading you discover places that are not smooth, please feel free to offer criticism; if you have any suggestions, you are also welcome to propose them.

Additionally, I want to thank and recommend the tool [quiver](https://q.uiver.app/). All commutative diagrams in this article were drawn using it — convenient and easy to use, it's truly wonderful. It is open-sourced on GitHub; if interested, you can also check its [repository](https://github.com/varkor/quiver). I also thank the Bilibili uploader [数学わかんない](https://space.bilibili.com/27733394) for this episode [（科普）直积和直和的不同--从线性代数到范畴论](https://www.bilibili.com/video/BV1mJfaYxEQ5), which was very well explained and helped me a lot.

So, thank you very much for reading this far. That such a long and obscure article (perhaps) made you willing to read to this point — I am already satisfied. Finally, as always, I wish you good health and a happy double holiday~ (even if there's probably only one day left)
