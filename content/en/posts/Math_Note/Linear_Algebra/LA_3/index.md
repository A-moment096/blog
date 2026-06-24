---
categories:
- Mathematics
# - Programming
# - Phase Field
# - Others
tags:
- Linear Algebra
- Note
title: Linear Algebra Notes III
description: Matrix Spaces and Linear Map Spaces
date: 2026-03-06T23:45:01+08:00
image: /images/Alice.jpg
imageObjectPosition: "center 15%"
math: true
hidden: false
comments: true
---
$$
% =====  =====
\gdef       \vect           #1{\mathbf{#1}}                             % abstract vector
\gdef       \cvect          #1{\boldsymbol{#1}}
\gdef       \basis          #1#2{\mathcal{#1}_{#2}}                            % basis of vector space
\gdef       \basev          #1#2#3{\{\vect{#1}_{#2}\}_{#2=1}^{#3}}                     % base vector collection
\gdef       \cbasev         #1#2#3{\{\cvect{#1}^{#2}\}_{#2=1}^{#3}}                      % dual basis e^i
\gdef       \vrep           #1#2{[\vect{#1}]_{#2}}                           % coordinate representation [v]_B
\gdef       \rep            #1{[\vect{#1}]}
\gdef       \mrep           #1#2#3{[{#1}]_{#2}^{#3}}                      % representation [L]_{C,B}
% 
\gdef       \iprod          #1#2{\langle #1, #2 \rangle}                % inner product
\gdef       \tran           #1{\vect{#1}^{\mkern-1.5mu\mathsf{T}}}
\gdef       \mat            #1{\mathbf{#1}}                             % matrix (representation)
\gdef       \field          #1{\mathbb{#1}}                             % 
\gdef       \xto            #1{\xrightarrow{#1}}                        % arrow with label
\gdef       \xfrom          #1{\xleftarrow{#1}}                         % left arrow with label
\gdef       \Hom            {\operatorname{Hom}}             % morphisms between A and B
\gdef       \Iso            {\operatorname{Iso}}
\gdef       \End            {\operatorname{End}}                  % 
\gdef       \Aut            {\operatorname{Aut}}                  % 
\gdef       \cat            #1{\mathsf{#1}}                             % category symbol: e.g., \cat{Vect}, \cat{Set}
\gdef       \Mat            {\operatorname{Mat}}
\gdef       \Bilin          {\operatorname{Bilin}}
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
\gdef       \BaseH          {\basis{H}{}}
$$

*Picking up from last time, now that we have some understanding of $\Hom(\R,V)$ and $\Hom(V,\R)$, and with the special object of **duality** in hand, we can finally set out to study the space of linear maps $\Hom(V,W)$. And what kind of connection exists between the matrix space $\Mat(m,n)$ and the space of linear maps? Let's explore this in this chapter!*

*Header image info — see Chapter 1, thank you~! This time's featured track is [**椎乃味醂 (Shiino Mirin)**](https://weibo.com/sheeno3rin) on tuning, sung by Hatsune Miku and Kasane Teto, the song [まだ知らない君がいる！/ There's a You I Don't Yet Know!](https://www.bilibili.com/video/BV1dGhqzZEkz/) (Bilibili link), which placed 7th at [VCCL 2025 Summer]. A tremendously powerful song. This track requires a NetEase Cloud Music membership — if interested, you can listen and watch the beautiful MV on Bilibili. Original submission link (Niconico): [まだ知らない君がいる！ - 初音ミク･重音テト](https://www.nicovideo.jp/watch/sm45324905)*

{{<music auto="https://music.163.com/#/song?id=3317461399" loop="none">}}

## Preface

In the last chapter, we used $\Hom(\R,V)$ and $V^* = \Hom(V,\R)$ as examples to take a brief look at two special cases within the class of linear spaces $\Hom(V,W)$, and their relationship with matrix representations. Because of the relationship between vector spaces, dual spaces, and double dual spaces, we can view covectors as functions from vectors to $\R$, and at the same time we can view vectors as their double duals, thus becoming functions from covectors to $\R$. From the matrix representation of linear maps, we can also understand why they can be written as column vectors and row vectors.

However, we still haven't fully elucidated the internal structure of $\Hom(V,W)$. What exactly is its relationship with the matrix space $\Mat(m,n)$? What does a basis of this space look like? What is its own dual space like? In this chapter, we'll focus on studying this more general linear space.

But before diving directly into this linear space, let's first return to the basis of a vector space and add a few remarks about this important concept.

## Bases: The Bridge Between Finite and Infinite

In [Linear Algebra Notes I](/posts/LA_1), we first introduced the concept of a basis for a vector space, and we've been using this concept to varying degrees throughout the study of the vector spaces we've encountered since. Let's briefly recall its definition:

> [!NOTE] Basis of a vector space
> A basis of a vector space $V$ is a subset $\BaseBV$ whose elements are called basis vectors; this subset spans the vector space, and its basis vectors are pairwise linearly independent.
>
> Due to the properties of linear span and linear independence, once a basis of a vector space is chosen, every vector in the space can be uniquely expressed as a linear combination of the basis vectors.

Recall again how we used bases previously: we could often turn any vector into a basis and a linear combination thereof, and then prove a series of properties of the vector space through operations on this linear combination. From a set-theoretic perspective, the elements (vectors) in a vector space should be infinite in number, but through its basis, the *infiniteness* of a vector space is resolved by the concept of a basis, turning it into something finite and tractable as a mathematical object. A basis is like a bridge connecting the finite (a finite set of coefficients) and the infinite (infinitely many vectors).

More concretely, when we originally had to deal with a vector in a vector space of unknown specifics, we could rely on the fact that **every vector space has a basis**[^1], first select a basis, and then use the fact that **a vector can be uniquely expressed by a set of coefficients with respect to a basis** to represent the vector as a set of numbers. Then, after processing this set of numbers to arrive at the conclusion we need *under this basis*, we can state at the end: this basis was chosen **arbitrarily**, and the process of reaching this conclusion did not depend on the choice of a specific basis, so even if we switch to a different basis, we can still reach the same conclusion, thereby successfully establishing certain facts about an arbitrarily chosen vector.

This is especially critical when studying homomorphisms (linear maps) between vector spaces: constructing a linear map between two abstract vector spaces directly is not very practical, but once we choose bases for the vector spaces on both sides of the linear map, the linear map seems to become entirely a map from basis to basis — how the basis vectors of the domain are expressed in terms of the basis vectors of the codomain after the map is applied.

Thus, we might say: all properties of a vector space are condensed in its basis, and the problem of studying linear maps, once bases are chosen on both sides, becomes a problem of studying the relationships among the coefficient representations. We'll verify whether this statement is justified later.

It's time to set off. Let's turn our attention to $\Hom(V,W)$. Having understood the properties of $\Hom(V,\R)$ and $\Hom(\R,V)$ (especially their bases), I believe you already have some intuitive sense of $\Hom(V,W)$ as well.

## Revisiting $\operatorname{Hom}(V,W)$

We mentioned [the relationship between matrices and linear maps](/posts/la_2/#Remark-2) in the previous chapter, and we know that once a basis is chosen on both sides, a linear map can be expressed as a matrix. We also pointed out that the collection of all such matrices itself [forms a vector space](/posts/la_2/#Theorem-1), whose basis is the set of matrices with a $1$ in one position and $0$ everywhere else. If every matrix in this vector space is $m\times n$, then a basis has $mn$ basis vectors in total. So, if after choosing bases for the spaces on both sides of a linear map, all possible linear maps can be **uniquely** expressed as matrices, then we can establish a bijection between the set of linear maps and the set of matrices; if, further, this bijection preserves the two operations defined in both spaces as vector spaces, then we have successfully linked the two spaces via an isomorphism. So how do we go about doing this?

### $\operatorname{Hom}(V,W)$ and $\operatorname{Mat}(m,n)$

So, how do we prove uniqueness? Actually, we just need to examine the process by which a linear map gets expressed as a matrix. Recalling the [two paths of a linear map](/posts/la_2/#linear-maps-two-paths), once bases are chosen, the image $\vect{f}_j$ of a basis vector $\vect{b}_j$ under the linear map $L$ is unique, and the linear expression of $\vect{f}_j$ is also unique — and the coefficients of the latter are precisely the matrix entries $A^i{}_j$ we want. Therefore, once bases for the two vector spaces are chosen, every linear map between these two vector spaces can be uniquely expressed as a matrix.

Now, does this bijection preserve the addition and scalar multiplication defined on $\Hom(V,W)$ and $\Mat(m,n)$? Absolutely. Indeed, because we defined addition and scalar multiplication on $\Hom(V,W)$ pointwise, and the addition and scalar multiplication on $\Mat(m,n)$ are also defined pointwise, the preservation of these two operations on both sides is very obvious and intuitive. For example, given two linear maps $T,S\in\Hom(V,W)$ with matrix representations $A,B\in\Mat(m,n)$, then $T+S$ corresponds exactly to $A+B$: the linear-expression coefficients in $W$ of a vector $\vect{v}\in V$ after being mapped by $T+S$ are completely given by left-multiplying $\vect{v}$'s column matrix (column vector) by the matrix $A+B$. The same holds for scalar multiplication, so we won't belabor the point.

In summary, once **bases are chosen for the vector spaces on both sides**, we can connect the space of linear maps and the space of matrices — an isomorphism holds between them. But this condition is a bit of an eyesore: do we really have to first choose bases to establish an isomorphism between $\Hom(V,W)$ and $\Mat(m,n)$? In other words, is this isomorphism natural?

From the relationship between $\Hom(V,\R)$ and $V^*$, you might already guess that this isomorphism is not natural. Simply put, once we choose a basis for $V$, the choice of basis for $W$ affects the linear-expression coefficients of $V$'s basis vectors in $W$, which in turn affects the matrix representation of the linear map, and thus ultimately affects the isomorphism between them.

Before we study the basis of $\Hom(V,W)$, let's first introduce some notation for the basis of $\Mat(m,n)$. In the previous chapter, we mentioned that $\Mat(m,n)$ has a very simple basis, whose basis vectors are matrices with a $1$ in one particular row and column and $0$ everywhere else. We want a system of notation to denote these basis vectors and the basis of the matrix space.

> [!NOTE] Notation for basis vectors and bases of the matrix space
>
> For the matrix space $\Mat(m,n)$, we denote the matrix whose $(i,j)$-th entry is $1$ (with $0\leq i \leq m$, $0\leq j \leq n$) and all other entries are $0$ by $\mat{E}_i{}^j$. The set of all such matrices forms a basis of $\Mat(m,n)$, called its standard basis $\basis{E}{}{}^m_n$. We call $\mat{E}_i{}^j$ the $(i,j)$-th basis vector of $\Mat(m,n)$.



### The Basis of $\operatorname{Hom}(V,W)$

So, as a vector space, what does its basis actually look like? Since it is isomorphic to $\Mat(m,n)$, can we start from the basis of $\Mat(m,n)$ and work backwards to deduce the meaning of the basis of $\Hom(V,W)$?

Let's first choose bases for $V$ and $W$, $\BaseBV$ and $\BaseCW$. Now consider the standard basis of $\Mat(m,n)$ and take its $(i,j)$-th standard basis matrix $\mat{E}_i{}^j$, whose matrix entry at row $i$, column $j$ is $1$ and all other entries are $0$.

Let's try to interpret $\mat{E}_i{}^j$ within the framework of $\Hom(V,W)$: that is, this basis vector is a linear map that sends the $j$-th vector in $\BaseBV$, after being mapped into $W$, to the $i$-th vector in $\BaseCW$, while all other vectors in $\BaseBV$ are mapped to the origin of $W$. This is very much like what we saw in $\Hom(V,\R)$: send a particular basis vector of $V$ to $1$, and send all the remaining basis vectors to $0$. Except this time, because $W$ is not just one-dimensional, we need to specify which basis vector in $W$ a given basis vector of $V$ should be sent to.

Let's write out its basis vectors formally: denote the basis of $\Hom(V,W)$ by $\BaseH{}_{V}{}^W$, and denote the $(i,j)$-th basis vector by ${H}_i{}^j$. Then the formal definition of the basis vector we defined above is:

$$
 {H}_i{}^j (\vect{b}_k) = \begin{cases}
  \vect{c}_i &\text{if }\ k=j\\
  0_W &\text{if }\ k\neq j\\
\end{cases}
$$

This form always seems to harbor a Kronecker delta within it. Indeed, it can be expressed as:

$$
 {H}_i{}^j (\vect{b}_k) =  \delta^j{}_k \vect{c}_i,
$$

where $0 \vect{c}_i = 0_W$ is implicit.

Can such linear maps span this vector space? The answer is yes. By gathering all (all $mn$ of them) such basis vectors, we can achieve the following through linear combinations: a linear map in $\Hom(V,W)$ first sends the first basis vector of $V$ to the first basis vector of $W$, obtaining one component, then maps it to the second basis vector, then the third, the fourth... Then do the same to the second basis vector of $V$, the third, the fourth... until all basis vectors of $V$ are successfully expressed in $W$, thereby forming a complete linear map from $V$ to $W$.

Of course, a vector space ought to have infinitely many bases. For now, let's call the basis we just constructed the *induced basis* under $\BaseBV$ and $\BaseCW$, since it is easy to interpret and convenient for subsequent manipulation. We call the basis vector described above the $(i,j)$-th basis vector. Also worth noting is that, even though we call it a *basis vector* here, it is a basis vector of $\Hom(V,W)$ — the space of linear maps — and it is actually a linear map from $V$ to $W$. Due to the poverty of language, we abuse the definition a bit and call it a basis vector as well; please mind the distinction.

Finally, we give the definition of this basis vector:

> [!DEF] Induced basis of $\operatorname{Hom}(V,W)$
>
> The *induced basis* of the vector space $\Hom(V,W)$ is a set of linear maps from $V$ to $W$ that depend on the choice of bases for $V$ and $W$. Its basis vectors satisfy the condition
>
> $$ {H}_i{}^j (\vect{b}_k) =  \delta^j{}_k \vect{c}_i,$$
>
> where $\delta^j{}_k$ is the Kronecker delta, $\vect{b}_k$ is the $k$-th basis vector of $V$, and $\vect{c}_i$ is the $i$-th basis vector of $W$. This basis vector is called the $(i,j)$-th (induced) basis vector of $\Hom(V,W)$.

## The Dual of $\operatorname{Hom}(V,W)$

Once we have the basic information about a vector space, it's always hard to resist wondering what its dual space looks like. By the definition of dual, we know that its dual is $\Hom(V,W)^* = \Hom(\Hom(V,W),\R)$, i.e., assigning a real number to each linear map from $V$ to $W$. The basis vectors of this dual space, following the concept of dual basis we discussed in the last chapter, yield $1$ when acting on the corresponding basis vector and $0$ when acting on any other basis vector.

However, we observe that there is a natural isomorphism between $V$ and $\Hom(\R,V)$, and the dual space of $V$ is $\Hom(V,\R)$, which means the dual space of $\Hom(\R,V)$ is $\Hom(V,\R)$. Does this suggest that the dual space of $\Hom(V,W)$ is $\Hom(W,V)$? If that were really the case, then the basis vectors of $\Hom(W,V)$ would become the dual basis vectors of $\Hom(V,W)$. To settle this, let's start from the dual basis and see, by applying the definition of the dual basis, what kind of dual-space basis vectors emerge from the basis vectors of $\Hom(V,W)$.

### Dual basis vectors of $\operatorname{Hom}(V,W)$

As before, we first pick bases for $V$ and $W$, then pull out the induced basis of $\Hom(V,W)$ under these two bases. Take its $(i,j)$-th basis vector and try to define its dual basis vector. Its dual vector should also be a linear map: it yields $1$ when acting on the $(i,j)$-th basis vector of $\Hom(V,W)$ and $0$ when acting on any other basis vector. We denote this dual basis vector by ${\Theta}^m{}_n$; formally, by the definition of dual basis, we have:

$$
 {\Theta}^m{}_n ({H}_i{}^j) = \begin{cases}
  1&\text{if }\ m=i \land n = j;\\
  0 &\text{if }\ m\neq i \lor n \neq j.\\
\end{cases}
$$

How should we interpret the $1$ and $0$ here? The composition of such linear maps should yield another linear map, shouldn't it? But we can interpret this conveniently: when a linear map, after being acted upon by something, yields the numbers $1$ and $0$, we can think of it as actually yielding the *identity map* and the *zero map*. Yet, what are the domain and codomain of this identity map and zero map? We can investigate this by looking at the result of acting on a concrete element.

Since $ {H}_i{}^j (\vect{b}_k) = \vect{c}_i \delta^j{}_k $, when we try to compose $\Theta^m{}_n$ onto the expression in this definition, the result should be:

$$
\Theta^m{}_n (H_i{}^j(\vect{b}_k)) = \Theta^m{}_n (\delta^j{}_k \vect{c}_i) = \begin{cases}
  \vect{b}_k&\text{if }\ m=i \land n = j;\\
  0_V &\text{if }\ m\neq i \lor n \neq j.\\
\end{cases}
$$

Now we can see that $\Theta^m{}_n$ is a linear map from $W$ to $V$! Then, as such a linear map, when composed with $H_i{}^j$, it yields the identity map. Can this be expressed using the Kronecker delta? The answer is yes:

$$
\Theta^m{}_n (H_i{}^j(\vect{b}_k)) = \delta^m{}_i\delta^j{}_n\vect{b}_k,
$$

Notice that we cleverly exploited the fact that *0 times anything is 0* here, expressing the condition $m=i$ and $n=j$ using two Kronecker deltas. With this, we formally give the definition of the dual basis vectors of $\Hom(V,W)$:

> [!DEF] Dual basis vectors of $\operatorname{Hom}(V,W)$
>
> We denote a vector in the dual basis of $\Hom(V,W)$ by $\Theta^m{}_n$, which is a linear map from $W$ to $V$ satisfying:
> $$\Theta^m{}_n (H_i{}^j) = \delta^m{}_i\delta^j{}_n.$$
> Here, $H_i{}^j$ is the $(i,j)$-th induced basis vector of $\Hom(V,W)$.

### Other interpretations of the dual basis vectors

We have formally obtained the dual basis vectors of $\Hom(V,W)$, thereby understanding its dual basis situation, and further realizing that the dual space of this vector space is none other than $\Hom(W,V)$. However, we can also observe the induced basis of $\Hom(V,W)$ from another angle, which also yields some information about the dual basis. Let's describe this briefly.

First, let's examine the dual basis vectors from the perspective of how they act on basis vectors. When the $j$-th basis vector $\vect{b}_j$ of $V$ is mapped to the $i$-th basis vector $\vect{c}_i$ of $W$, while all other basis vectors of $V$ are mapped to the zero vector $0_W$ of $W$, this map yields $1$; and when any other basis vector of $\Hom(V,W)$ is given as input, it can only yield $0$. That is, when $\vect{b}_j$ is mapped to some other basis vector of $W$, or when a basis vector $\vect{b}_k$ ($k\neq j$) of $V$ is mapped to $\vect{c}_i$, the dual basis map yields $0$.

Let's observe the above situations: when $\vect{b}_j$ points to $\vect{c}_i$, our dual basis vector yields $1$; when $\vect{b}_j$ does not point to $\vect{c}_i$, by definition it either points to $0_W$ or to some other $\vect{c}_l \neq \vect{c}_i$, and in both cases the above dual basis vector yields $0$.

But what if we switch perspectives? When $\vect{c}_i$ and $\vect{b}_j$ are paired, the dual basis vector above yields $1$; when $\vect{c}_i$ is not paired with $\vect{b}_j$, the dual basis vector yields $0$. Thus, this dual basis vector essentially forms a selection: let the basis vector $\vect{c}_i$ in $W$ correspond to the basis vector $\vect{b}_j$ in $V$, and since the remaining basis vectors of $W$ have nowhere to go, they are mapped to $0_V$. Such a definition completely matches the definition of the $(j,i)$-th induced basis vector of $\Hom(W,V)$. But on the whole, this approach is still a bit abstract.

Thankfully, we have a simpler method: starting from matrices. First, we establish an isomorphism between $\Hom(V,W)$ and the matrix space $\Mat(m,n)$ induced by the bases of $V$ and $W$. Then we consider the dual basis of $\Mat(m,n)$. Its dual basis should consist of matrices that multiply with the original basis to yield $1$. In this way, we quickly see that the dual space of $\Mat(m,n)$ should be $\Mat(n,m)$, and under the given conditions, the simplest dual linear space that meets the requirements is $\Hom(W,V)$.

However, this method has some drawbacks — for instance, how do we determine that it's $\Hom(W,V)$ and not something like $\Hom(W^*,V)$? — but it gives us a good direction.

Finally, let's summarize. Regarding the space of linear maps and its dual space, we have the following small conclusion:

> [!NOTE] Duality and linear maps
>
> For the space of linear maps $\Hom(V,W)$, its dual space is $\Hom(W,V)$ — that is, we swap the order of the two spaces, or in other words, reverse the direction of the arrows.

Did you notice? Duality is linked to *reversing the direction of the arrows*. We'll encounter many dual concepts in category theory, and most of them, in the end, come down to *reversing arrows*. Perhaps we'll have a chance to see more such examples, but let's not belabor the point here — after all, these are notes on linear algebra, not category theory (）

## The Dual of the Space of Linear Maps and the Space of Matrices

Another natural and interesting topic is: what does the matrix representation of elements in the dual space look like? However, in this dual space of $\Hom(V,W)$, the answer is somewhat obvious. If the matrix space corresponding to the linear space $\Hom(V,W)$ is $\Mat(m,n)$, then the matrix space corresponding to $\Hom(V,W)^* = \Hom(W,V)$ is naturally $\Mat(n,m)$.

Nevertheless, to understand the specifics of each element, we still need to examine things carefully. The good news is that the concept of the *dual vector* can help us observe the situation inside the dual space. To review the concept of the *dual vector*, please refer to [here]().

### Matrices have more than one kind of multiplication

Let's take a matrix $\mat{M}$ in $\Mat(3,2)$:

$$
\mat{M} = \begin{bmatrix}
  1&2\\
  3&4\\
  5&6
\end{bmatrix},
$$

and see what its dual vector looks like. To obtain it, we first need the decomposition of $\Mat(3,2)$ with respect to a basis. Here we'll directly take the standard basis $\basis{E}{}{}_m^n = \{\vect{E}_{i}{}^j\}_{1\leq i\leq m}^{1\leq j\leq n}$ of $\Mat(m,n)$, and the result is:

$$\mat{M} = 1\vect{E}_{1}{}^1 + 2\vect{E}_{1}{}^2 + 3\vect{E}_{2}{}^1 + 4\vect{E}_{2}{}^2 + 5\vect{E}_{3}{}^1 + 6\vect{E}_{3}{}^2.$$

After that, we need to keep these linear-expression coefficients and then replace each basis vector with its corresponding dual basis vector. By the definition of dual basis vectors, we have:

$$ \vect{F}^{i}{}_{j} \vect{E}_{j}{}^{i}  = 1, $$

where $\vect{F}^{i}{}_{j} \in \Mat(2,3)$. But this raises a problem: matrix multiplication does not give a single number — it gives a matrix, and the shape of the resulting matrix depends on both matrices and the direction of multiplication! What on earth should we do...

The good news is: we *haven't defined multiplication in the matrix space*, nor have we declared that *there's only one kind of matrix multiplication*. In fact, there can be many kinds of matrix multiplication. And here, to obtain a scalar, we **custom-define a multiplication**. The multiplication rule is simple: multiply the "mirror-positioned" components together, then sum up all of those products.

For example, an $m\times n$ matrix $\mat{A}$ and an $n\times m$ matrix $\mat{B}$ multiplied under our method yield:

$$ \mat{A} \boxtimes \mat{B} = \sum_i^m \sum_j^n A_{ij} B_{ji},$$

where $\boxtimes$ is our custom-defined multiplication, and $A_{ij}$ is the $(i,j)$-th entry of the matrix $\mat{A}$. Here we're just using subscripts to indicate matrix entry positions. We'll talk more about matrix notation later. Let's write down the definition of this multiplication and give it a name for now.

> [!DEF] Dual multiplication of matrices
>
> Define the *dual multiplication* $\boxtimes$ between $\Mat(m,n)$ and $\Mat(n,m)$ as:
>
> $$\begin{align*} \boxtimes &\vcentcolon \Mat(m,n) \times \Mat(n,m)\to \field{F} \\ &\quad \mat{A}\boxtimes\mat{B} \mapsto \sum_i^m\sum_j^n A_{ij} B_{ji},\end{align*} $$
>
> where $A_{ij}$ is the $(i,j)$-th entry of $\mat{A}$.

Incidentally, from the definition it's easy to see that this multiplication is commutative, since in the end it just swaps the order of multiplication inside the sum, which doesn't affect the result. Also, a zero matrix makes the product $0$, but to get a result of $0$, the two matrices need not be zero matrices: it's enough for a factor of $0$ to appear at every *corresponding* position.

### The dual space of the matrix space & the dual vector of a matrix

So, under our definition of $\boxtimes$, a matrix in $\Mat(m,n)$ can be multiplied with a matrix in $\Mat(n,m)$ to yield a number. We can then naturally define the form of $\vect{F}^{i}{}_{j}$, namely the matrix whose entry at row $i$, column $j$ is $1$ and all other entries are $0$. In this way, we obtain the dual basis of the matrix space $\Mat(m,n)$ and, in turn, the dual of the matrix space.

Going back to our original matrix $\mat{M}$, by replacing each $\mat{E}_i{}^j$ in the component expansion of $\mat{M}$ with its corresponding dual basis vector $\mat{F}^j{}_i$, we get:

$$
\mat{M}^* = \begin{bmatrix}
  1&3&5\\
  2&4&6\\
\end{bmatrix}.
$$

And so, we obtain the dual vector of a matrix within the matrix space. It always feels a bit weird to call a *matrix* a *dual vector*, and later we'll likely encounter even more strange things, each with its own dual. Therefore, from now on, we'll refer to such objects as *dual elements*: in the case of ordinary vector spaces and vectors, the dual element of a vector is still a vector, also called a dual vector; in the matrix vector space, a matrix also has its own dual element, which is also a matrix; for a linear map, it also has its own dual element, which is likewise a linear map.

### Transposition

Although we called the result above the *dual of a matrix*, this definition seems too narrow: we relied on a custom-defined multiplication just to get this result, and fundamentally it's nothing more than rearranging the entries. For a *pure matrix*, we could just as well start from the perspective of entry rearrangement and rearrange the entries as above to obtain a new matrix. Such a rearrangement operation, being very practical (and very simple), is called **transposition**.

> [!DEF] Matrix transposition
>
> Let a matrix $\mat{A}$ be an element of the matrix set $\Mat(m,n)$, with its $(i,j)$-th matrix entry denoted $A_{ij}$. Then the result of its *transposition* is denoted $\tran{A} \in \Mat(n,m)$, and its $(i,j)$-th matrix entry is $[\tran{A}]_{ij} = A_{ji}$.

Matrix transposition depends solely, and only, on the arrangement of matrix entries. In fact, we could have introduced matrix transposition as soon as we introduced matrices. The main reason we didn't is that there wasn't much motivation / impetus to do so. A matrix can be transposed to produce another matrix — and then what? Hopefully, the concept of *dual* here can provide part of the answer: the dual element of a linear map, when both are expressed as matrices, differs from the original only by a transposition operation.

So why not just replace matrix transposition with the dual of a matrix? The reason has already been hinted at above: the dual of a matrix strictly depends on the fact that the matrix space is a vector space and on the definition of the *dual multiplication of matrices* introduced above. When we speak of the dual element of a matrix, we must presuppose this background to proceed further. Matrix transposition, by contrast, is much "lighter": it simply rearranges the matrix entries, pure and simple.

Of course, we could also endow matrix transposition with some properties — for instance, the transposition of a matrix is a kind of duality. Perhaps one could say that transposition also swaps the direction of entry arrangement, which is analogous to how duality reverses the direction of arrows. We'll encounter matrix transposition again later, when we focus specifically on matrices.

## $\operatorname{End}(V)$ and $\operatorname{Mat}(n)$

Having understood the general space of linear maps $\Hom(V,W)$, let's now examine a special class of linear map spaces: $\End(V)$, i.e. $\Hom(V,V)$, along with its corresponding matrix space $\Mat(n)$.

In Chapter 1, we mentioned that the set of all linear transformations on $V$ is called $\End(V)$, where $\End$ stands for Endomorphism. Here, $\Mat(n)$ is shorthand for $\Mat(n,n)$, i.e., the set of $n\times n$ *square matrices*. Endomorphisms bring many interesting properties; the most obvious one is that composition of endomorphisms is closed, that is:

$$L(R(\vect{v}))\in V\ \forall L,R\in \End(V), $$

or, if we accept operating purely in terms of the composition of linear maps,

$$ L(R) \in \End(V)\ \forall L,R\in \End(V).$$

Corresponding to matrices, this means that the multiplication of square matrices always yields a square matrix of the same size:

$$ \mat{AB}\in \Mat(n)\ \forall A, B\in \Mat(n).$$

Let's study these special properties.

### Endomorphism composition and bilinear maps

We start with linear endomorphisms; since square matrices are completely determined by linear endomorphisms, we won't rehash the square matrix case here.

The composition of linear endomorphisms, being closed, can be viewed as a new operation independent of addition and scalar multiplication. That being the case, let's examine the relationship between linear endomorphism composition (henceforth just "map composition") and the originally defined addition and scalar multiplication — what new properties do these three together yield?

First, addition. We know that addition and scalar multiplication satisfy distributivity. Intuitively, scalar multiplication acting from the outside to scale an already-computed vector gives the same result as scaling each summand and then adding. This seems to hold for map composition as well:

Take $\vect{v}\in V$ and $L,R,S\in\End(V)$. We have:

$$ \begin{align*}
(L(R+S))(\vect{v}) &= L((R+S)(\vect{v})) = L(R((\vect{v})+S(\vect{v}))) \\
                   &= L(\vect{u} + \vect{w}) =L(\vect{u}) + L(\vect{w})\\ 
                   &= L(R((\vect{v}))+L(S(\vect{v}))) =L(R)(\vect{v}) + L(S)(\vect{v})\\
                   &= (L(R)+L(S)) (\vect{v})
\end{align*} $$

We fed the map composition $L(R+S)$ a vector $\vect{v}$ and checked, with this vector present, how the form of this linear map could be transformed. The whole process is essentially just applying the properties of linear maps over and over, using two intermediate vectors to represent the different images of $\vect{v}$ when needed. What we got here seems to be a result independent of $\vect{v}$, depending only on the linear maps themselves.

Now, what about the other direction? Let's try:

$$\begin{align*}
  (L+R)(S(\vect{v}))  &= ((L+R)S)(\vect{v}) \\
                     &= (L+R)(\vect{w}) = L(\vect{w}) + R(\vect{w})\\
                     &= L(S(\vect{v})) + R(S(\vect{v}))\\
                     &= L(S)(\vect{v})+R(S)(\vect{v})\\
                     &= (L(S)+R(S))(\vect{v}),
\end{align*}    
$$

Here we again just kept applying the definitions, and in the end obtained a result that seems independent of $\vect{v}$.

In addition to addition, what about scalar multiplication? We again toss in a vector to test:

$$
\begin{align*}
  (a\cdot L(R))(\vect{v}) &=a\cdot L(R(\vect{v})) = a\cdot L(\vect{w}) \\
  &= (a\cdot L)(\vect{w}) = (a\cdot L)(R)(\vect{v}) \\
                     &=   L(a(R(\vect{v}))) =  L((a\cdot R)(\vect{v}))\\
                     &= L(a\cdot R)(\vect{v}).
\end{align*}    
$$

The manipulations above can feel a bit bewildering — it's nothing more than repeatedly applying the properties of linear maps and the definitions of addition and scalar multiplication in the vector space $\End(V) = \Hom(V)$. But when we strip away the final $\vect{v}$ from each of the three equations, something magical happens:

$$L(R+S) = L(R) + L(S)$$
$$(L+R)S = L(S) + R(S)$$
$$ a\cdot(L(R)) = (a\cdot L)(R) = L(a\cdot R)$$

And when we treat *map composition* as a kind of *multiplication* — no longer using parentheses to represent map composition, but only to indicate order of operations, simply writing maps in sequence to denote composition — we get:

$$L(R+S) = LR + LS$$
$$(L+R)S = LS + RS$$
$$ a\cdot (LR) = (a\cdot L)R = L(a\cdot R)$$

We can see: this *multiplication* has left-distributivity, right-distributivity, and is linear in each position. Such a multiplication is very special, and we give it a special name: a **bilinear map**, because it satisfies linearity in both of the two positions participating in the multiplication. We give the definition of a bilinear map:

> [!DEF] Bilinear map
>
> Let $V,W,U$ be vector spaces over $\field{k}$, with $\vect{v}\in V, \vect{w}\in W, \vect{u}\in U$, and let $a,b\in \field{k}$. Define a map $B$:
>
> $$ \begin{align*} B&\vcentcolon V\times W \to U\\  &\quad (\vect{v},\vect{w})\mapsto B(\vect{v},\vect{w})\in U,\end{align*} $$
> If it satisfies the following three properties:
> 
> - $B(\vect{v},\vect{w}+\vect{u})=B(\vect{v},\vect{w})+B(\vect{v},\vect{u})$;
> - $B(\vect{v}+\vect{w},\vect{u})=B(\vect{v},\vect{u})+B(\vect{w},\vect{u})$;
> - $B(a\vect{v},b\vect{w})=ab B(\vect{v},\vect{w})$,
>
> then we call the map $B$ a **bilinear map** over $\field{k}$.
> 
> Equivalently, if for any $\vect{w}\in W$, the map $$\vect{v}\mapsto B(\vect{v},\vect{w})$$ is a linear map from $V$ to $U$, and for any $\vect{v}\in V$, the map $$\vect{w}\mapsto B(\vect{v},\vect{w})$$ is a linear map from $W$ to $U$, then $B$ is called a bilinear map over $\field{k}$.

We can verify that when we define map composition as a binary multiplication from $\End(V)\times \End(V)$ to $\End(V)$, this binary multiplication satisfies the definition of a bilinear map. Moreover, we can continually extend this concept to obtain so-called **multilinear maps**. One of the goals of these notes is to keep writing until we reach *multilinear maps*, i.e., so-called **tensors**. But for now, we have other, more interesting objects worth studying.

The property of bilinearity is very attractive to mathematicians, especially when such an operation is defined on a vector space and maps back into itself. Thus, having endowed a vector space with a bilinear binary operation from itself to itself, people give this vector space a new name: an **algebra**, or more precisely, an **algebra over a field**.

### Algebras over a field

Let's first give the definition.

> [!DEF] Algebra over a field
>
> Let $A$ be a vector space over a number field $\field{k}$, and define a $\field{k}$-bilinear binary multiplication:
>
> $$\begin{align*}  \cdot&\vcentcolon A\times A \to A\\ &\quad (\vect{x},\vect{y})\mapsto \vect{x}\cdot\vect{y}, \end{align*} $$
>
> Then $A$ is called an **algebra over the number field $\field{k}$**.

Why do people call it an **algebra**? After all, the discipline itself is called algebra, and this subcategory is even called *linear algebra*. Well, I don't know either. But this does provide another way to explain "what linear algebra studies." If we adopt the *algebra over a field* perspective, we could say: *linear algebra is the study of linear algebras* (haha) [^2].

Besides starting from a vector space, we can observe that an algebra over a field $\field{k}$ has three operations: scalar multiplication, addition, and multiplication. If we remove scalar multiplication and keep only addition and multiplication, what we get is a *ring*. Therefore, we can also define an algebra over a field from the ring perspective, as a *ring + extra scalar-multiplication structure*. We won't be considering the ring algebraic structure for now, so we won't elaborate further here. But thanks to an algebra's multiple identities, we can study it not only using properties from linear algebra but also using properties from ring theory.

Though people are interested in the algebra formed by linear endomorphisms, what's more commonly studied is the algebra formed by square matrices under matrix multiplication — it's called the *matrix algebra*. Since the relationship between square matrices and linear endomorphisms is clear and tight, verifying the proposition that *the set of all $n\times n$ square matrices forms an algebra over $\field{k}$ under addition, scalar multiplication, and matrix multiplication* is left as an exercise for the reader. It should be much simpler than the verification above that $\End(V)$ is an algebra (after all, everyone is a bit more familiar with matrices, right?).

Finally, we note: the algebras formed by $\End(V)$ and $\Mat(n)$ under multiplication naturally have *associativity of multiplication*, so more precisely they should be called **associative algebras**. Moreover, both algebraic structures have an *identity element* under multiplication: the *identity map* and the *identity matrix*, so this algebra is also a *unital algebra*. If an algebra's multiplication further satisfies commutativity, then we call it a *commutative algebra*. Commutative algebras occupy a central place in certain fields — that's you, algebraic geometry. This author's wish is to live long enough to learn commutative algebra and catch a glimpse of the wonders of algebraic geometry. Of course, judging from the current situation, that's a bit of a pipe dream (）

## Summary

This chapter didn't have all that much content. Most of it, perhaps, was something the reader already picked up from hints in earlier chapters before reading this one, or already knew well from their study of linear algebra. Nevertheless, let's summarize here.

- We elaborated on the position of bases in linear algebra. Almost all properties of a vector space are condensed in its basis;
- $\Hom(V,W)$ and $\Mat(m,n)$ can be linked by choosing suitable bases for $V$ and $W$, establishing a one-to-one correspondence (linear isomorphism);
- The basis of $\Hom(V,W)$ can be obtained from the *standard basis* of $\Mat(m,n)$: map one particular basis vector of $V$ to one particular basis vector of $W$, while mapping all remaining basis vectors of $V$ to the zero vector of $W$;
- The dual space of $\Hom(V,W)$ is $\Hom(W,V)$, which can be obtained by studying the dual basis vectors;
- One can define a *dual multiplication* for matrices, multiplying an element of $\Mat(m,n)$ with an element of $\Mat(n,m)$ to obtain a number, and thereby define the dual space of $\Mat(m,n)$;
- Matrices admit a *transposition* operation, where the $(i,j)$-th entry of the old matrix becomes the $(j,i)$-th entry of the new matrix;
- There is a special connection between transposition and dual elements, but taking the dual of a vector depends on the definition of duality itself, while transposition only cares about the arrangement of entries;
- Linear endomorphisms have special properties: through composition as a bilinear operation, we obtain multiplication of linear endomorphisms;
- The set of all linear endomorphisms on $V$ forms an algebra over the number field $\field{k}$;
- Square matrices form a matrix algebra under matrix multiplication.

In the previous chapter, we mentioned *inner product*, and that it is a *bilinear form*. And a so-called *bilinear form* is actually a special kind of bilinear map. The *dual multiplication* in this chapter, in a sense, once again hints at some aspects of inner products. However, limited by space (and the author's tiny brain), we must leave the detailed discussion for the next chapter. Also, when it comes to inner products, one cannot help but mention three concepts that (this author) often gets mixed up: inner product, norm, and metric. We will likely touch on all three in the next chapter and distinguish them from one another. Finally, having established the relationship between linear maps and matrices, our study of linear maps can at last be carried out on the more concrete objects — matrices. This chapter has merely built the stage for our subsequent study of linear maps and matrices; please look forward to what follows.

[^1]: This conclusion has a certain scope of applicability: it is fully valid for finite-dimensional vector spaces, but not necessarily so when dealing with infinite-dimensional vector spaces. For details, see [my other post](/posts/product_and_coproduct_of_vector_space/#后记)
[^2]: The concept of "algebra" is actually very broad. The "algebra" mentioned here is only one of many definitions of algebra — a mathematical structure built atop a vector space. In a broader sense, "algebra" refers to a system with two operations satisfying certain conditions; note that it's *two* operations. In fact, it's **the latter** that is more likely the origin of the name *linear algebra*. By analogy, one can consult Boolean algebra, $\sigma$-algebras, and so on. We may get a chance to chat about this little topic — it's quite interesting.