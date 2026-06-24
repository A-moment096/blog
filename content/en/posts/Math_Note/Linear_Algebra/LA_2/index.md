---
categories:
- Mathematics
# - Programming
# - Phase Field
# - Others
tags:
- Linear Algebra
- Note
title: Linear Algebra Notes II
description: Linear Maps, Matrices, and Duals
date: 2025-10-20T09:03:01+08:00
cascade:
  image: /images/Alice.jpg
imageObjectPosition: "center 15%"
math: true
hidden: false
comments: true
---

*Picking up where we left off, now that we've got a rough idea of what a linear space is about, let's take a look at what kinds of connections exist between linear spaces~!*

*For the header image info, please refer to the previous section, thanks~ The featured track is **お茶ガール**, a duet by [**Chata**](https://chata.moo.jp/index.html) and [**nayuta**](https://www.7uta.com/), youthful and full of sunshine, it kept me company through my sophomore year of grinding through linear algebra...*

{{<music auto="https://music.163.com/#/song?id=529668393" loop="none">}}

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

After discussing the basics of linear spaces in the previous chapter, a natural question is how to study maps between linear spaces. We already have those definitions, but concretely, we haven't yet reached a conclusion about how a vector actually gets mapped to a vector in another space via a linear map. Fortunately, the basis of a linear space gives us some guidance — with it, we can express nearly all linear objects in a linear space in the form of **matrices**. Moreover, the set of all linear maps between linear spaces itself has extremely special properties, to the extent that such properties give us a lot of inspiration, and among them, the **dual space** is an important concept that later content depends on. In this chapter, we discuss linear maps, the set of all linear maps, the relationship between matrices and linear maps, and the so-called dual.

## Matrices and Matrix Spaces

Let's first take a look at the basic situation of matrices:

### What Exactly Is a Matrix?

Before we assign any mathematical meaning to a matrix, it is really just an ordinary *two-dimensional table of numbers*. We can take some numbers from a number field $\Bbbk$, arrange them into a rectangle, so that each row has the same number of entries and each column has the same number of entries. Such a table of numbers is what we call a matrix — specifically, a matrix defined over $\Bbbk$. If a matrix has $m$ rows and $n$ columns, we call it an $m\times n$ matrix.

We refer to the element in the $i$-th row and $j$-th column as its $(i,j)$-th element (matrix entry), denoted $[\mat{A}]^i{}_j = A^i{}_j$. It is an element (a number) in $\Bbbk$.

We denote the set of all $m\times n$ matrices defined over $\Bbbk$ by $\Mat(m,n,\Bbbk)$, and when the number field is clear, we often drop the field notation and write $\Mat(m,n)$. In what follows, unless otherwise specified, we always assume matrices to be over $\R$.

Since every entry in every matrix in $\Mat(m,n)$ is a real number, we naturally wonder: can we equip $\Mat(m,n)$ with some algebraic structure so that it acquires special properties? No need to keep you guessing — yes, we can endow it with addition and scalar multiplication, making it a linear space.

### The Linear Space $\operatorname{Mat}(m,n)$

We give the definitions of addition and scalar multiplication that make the set of all $m\times n$ matrices $\Mat(m,n)$ into a linear space.

> [!THM] Matrix Space
>
> On the set $\Mat(m,n)$ of all $m\times n$ matrices, define addition and scalar multiplication as follows:
> 
> $$\begin{align*} +&\vcentcolon \Mat(m,n)\times \Mat(m,n)\to \Mat(m,n)\\ &\quad [\mat{A}+\mat{B}]^i{}_j = A^i{}_j+B^i{}_j\ \  \forall \mat{A},\mat{B}\in \Mat(m,n); \\[1.5ex] \cdot&\vcentcolon \R\times\Mat(m,n)\to\Mat(m,n)\\ &\quad [r\cdot\mat{A}]^i{}_j = rA^i{}_j \  \forall r\in \R, \mat{A}\in \Mat(m,n). \end{align*} $$
>
> With these two operations, $\Mat(m,n)$ becomes a linear space, which we call a matrix space.

We won't give a full account of how it satisfies the eight axioms of a linear space here, because the properties of its operations are simply too straightforward: they're just the operations on $\R$, copied in bulk onto an $m\times n$ table of numbers. It's worth noting that its zero vector is called the zero matrix $\zero$, i.e., a matrix where all entries are $0$.

Naturally, we're curious: as a linear space, what is its dimension? What kind of basis can we choose for it? This question isn't hard either, because we can immediately construct a basis: a set of $mn$ matrices, each of which has a $1$ in exactly one position and $0$ in all other positions. That these matrices are linearly independent is an almost trivial conclusion. Hence, the dimension of the matrix space $\Mat(m,n)$ is $\dim \Mat(m,n) = mn$.

As we can see, it's actually pretty obvious that the set of matrices of the same shape forms a linear space, and the addition and scalar multiplication are fairly simple. It's a nice example, and we'll later often need to reduce various peculiar spaces to matrix spaces to study their properties. So, is that all there is to matrices?

## Linear Maps and Matrices

Of course, matrices are not just such a simple thing — we can absolutely endow matrices with richer meaning. When we combine *matrices* with *linear maps*, they acquire deep significance. But before that, let's first study how, concretely, a vector obtains its image under a linear map.

### Two Paths for a Linear Map

Consider two linear spaces: an $n$-dimensional linear space $V$ and an $m$-dimensional linear space $W$, and a linear map $L$ between them. Now, suppose we have a vector $\vect{v}\in V$, and we want to map it to a vector $\vect{w}$ in $W$. There are two paths:

- Put the entire vector directly under the linear map $L$ and obtain a vector in $W$: $L(\vect{v}) = \vect{w}$;
- Break this process down into the following steps using the properties of linear maps:
  - First express $\vect{v}$ as a linear combination of the basis vectors of $V$, $\basis{B}{V} = \basev{b}{j}{n}$: $$\sum_j^n v^j \vect{b}_{j}$$
  - Using the definition of a linear map, we have $$L(\vect{v}) = L(\sum_j^n v^j \vect{b}_j) = \sum_j^n v^j L(\vect{b}_j)$$
  - Map the basis vectors of $V$ into $W$ to obtain new vectors: $$L(\vect{b}_j) = \vect{f}_{j} \in W$$
  - Express these new vectors $\vect{f}_{j}$ as linear combinations of the basis vectors of $W$, $\basis{C}{W} = \vect{c}_{i}$: $$\vect{f}_{j} = \sum_i^m A^i{}_j\vect{c}_{i}$$
  - Substitute everything back in to get: $$L(\vect{v}) = \sum_j^n v^j L(\vect{b}_j) = \sum_j^n v^j \vect{f}_{j} = \sum_j^n v^j \sum_i^m A^i{}_j\vect{c}_{i}$$
  - After rearranging, we obtain $$L(\vect{v}) =  = \sum_j^n\sum_i^m v^jA^i{}_j\vect{c}_{i} = \sum_i^m (\sum_j^n A^i{}_jv^j)\vect{c}_{i} = \sum_i^m w^i \vect{c}_{i} = \vect{w}$$

Comparing the two paths above, we discover: by expressing a vector as a linear representation in terms of a basis, we have transformed the problem of the image of a vector under a linear map into an operation between two kinds of coefficients:

$$w^i = \sum_j^n A^i{}_jv^j$$

One is the coefficients $v^j$ of $\vect{v}$ in the basis of $V$, and the other is the coefficients of $\vect{b}_j$ in the basis of $W$ after being mapped by $L$. The former is something we can always obtain, because once $V$ has a basis, every vector can be linearly expressed in terms of the basis. This precisely shows that *all* properties of $L$ depend entirely on the latter — we need to know what linear combination $\vect{b}_j$ is expressed as, in the basis of $W$, after being mapped.

Since $V$ has $n$ basis vectors, and each basis vector is expressed as a linear combination of $m$ vectors in the basis of $W$, each basis vector has $m$ linear combination coefficients, so this process requires determining a total of $mn$ linear combination coefficients. This is (part of) the origin of the notation $A^i{}_j$. Notice that we use a superscript and a subscript to represent this linear map: the subscript $j$ indicates that the $j$-th basis vector of $\BaseBV$ is being mapped over, and the superscript $i$ indicates the $i$-th component of the resulting new vector $\vect{f}_j$ when expressed in the basis $\BaseCW$. We distinguish the two indices by order, which will be convenient for later handling.

But wait — isn't $A^i{}_j$ the notation we used for matrices? Could it be... that similar? Then why not directly express a linear map, once bases are chosen on both ends, as a matrix? Let's now assign matrices their meaning under linear maps.

> [!REM] Matrix Meaning Under Linear Maps
>
> Given an $n$-dimensional linear space $V$ and an $m$-dimensional linear space $W$, a linear map $L\vcentcolon V\to W$ between them can be expressed, under a basis $\basis{B}{V}$ of $V$ and a basis $\basis{C}{W}$ of $W$, as a matrix. We denote it as $\mat{A} = \mrep{L}{\BaseBV}{\BaseCW} = \mrep{L}{\BaseB}{\BaseC}$. This matrix has $m$ rows and $n$ columns, i.e., $\mat{A}\in\Mat(m,n)$. The meaning of the $(i,j)$-th entry $A^i{}_j$ of this matrix is the component of the $j$-th basis vector of $V$, after undergoing the linear map $L$, along the $i$-th basis vector of $W$.

With this way of expression, what can we do? We can try to compute the matrix representation of the composition of two linear maps. We know that the composition of two linear maps is still a linear map, and it too can certainly be expressed as a matrix. Given that, we can take the entries of the two matrices and, through some operation, obtain a new matrix expressing the composition of the two maps. Let's take a look at this process.

### Composition of Linear Maps and Matrices

Suppose we have linear spaces $U,V,W$, of dimensions $m,n,p$ respectively, and linear maps $T\vcentcolon U\to V$ and $S\vcentcolon V\to W$. Then the composition $S\circ T = R$ is a linear map from $U$ to $W$. Choose bases $\BaseB$, $\BaseC$, and $\basis{D}{}$ for $U,V,W$ respectively. Then $T$, $S$, and $R$ can be expressed as $\mat{A} = \mrep{T}{\BaseB}{\BaseC}$, $\mat{B} = \mrep{S}{\BaseC}{\basis{D}{}}$, and $\mat{C} = \mrep{R}{\BaseB}{\basis{D}{}}$.

Now take a vector $\vect{u} = \sum_i^m u^i \vect{b}_i$ in $U$. Following the steps above, we have:

$$T(\vect{u}) = \sum_k^n \sum_j^m A^k{}_j u^j \vect{c}_k = \sum_k^n v^k \vect{c}_k = \vect{v};$$
$$S(\vect{v}) = \sum_i^p \sum_k^n B^i{}_k v^k \vect{d}_i = \sum_i^p w^i \vect{d}_i = \vect{w},$$

Substituting the bottom result into the top gives the result of the composition:

$$S(\vect{v}) = S(T(\vect{u})) =  \sum_i^p \sum_k^n B^i{}_k v^k \vect{d}_i =  \sum_i^p \sum_k^n B^i{}_k \sum_j^m A^k{}_j u^j \vect{d}_i;$$

And if we directly apply $R$ to $\vect{u}$, we get:

$$R(\vect{u}) = \sum_i^p \sum_j^m C^i{}_j u^j \vect{d}_i,$$

Comparing the two, we obtain the following result:

$$C^i{}_j = \sum_k^n B^i{}_k A^k{}_j.$$

Thus, the matrix representation $\mat{C}$ of $R$ is entirely determined by $\mat{A}$ and $\mat{B}$! We call this operation **matrix multiplication**, and in this way, we have expressed the composition of linear maps through the multiplication of their corresponding matrices.

Moreover, in the example above, $\mat{B}$ is a $p\times n$ matrix, $\mat{A}$ is an $n\times m$ matrix, and the result $\mat{C}$ is a $p\times m$ matrix. From this we learn that: this multiplication is only well-defined when the number of columns of the first matrix equals the number of rows of the second. Let's summarize as follows:

> [!REM] Matrix Multiplication
>
> If $\mat{A}$ and $\mat{B}$ are $m\times n$ and $n\times p$ matrices respectively, then their product $\mat{AB}$ is an $m\times p$ matrix. This process can be interpreted as the composition of linear maps, where:
> - $\mat{B}$ represents a linear map from a $p$-dimensional to an $n$-dimensional linear space;
> - $\mat{A}$ represents a linear map from an $n$-dimensional to an $m$-dimensional linear space;
> - Their product $\mat{AB}$ represents their composition, a linear map from a $p$-dimensional to an $m$-dimensional linear space.

## Structures Induced by Linear Maps

Above, we endowed matrices with the meaning of linear maps. Once bases are chosen for the linear spaces, every linear map between them can be uniquely expressed as a matrix. But we already know that the matrix space $\Mat(m,n)$ is a linear space. Then, is the set of all linear maps from an $n$-dimensional linear space $V$ to an $m$-dimensional linear space $W$, denoted $\Hom(V,W)$, also a linear space?

Indeed, it too can become a linear space under reasonable addition and scalar multiplication.

### The Linear Space $\operatorname{Hom}(V,W)$

> [!THM] The Linear Space $\operatorname{Hom}(V,W)$ 
>
> On the set $\Hom(V,W)$, define addition and scalar multiplication as follows:
>
> $$\begin{align*} +&\vcentcolon \Hom(V,W)\times \Hom(V,W)\to \Hom(V,W)\\ &\quad (R+S)(\vect{v}) = R(\vect{v}) + S(\vect{v})\ \  \forall R, S\in \Hom(V,W),\vect{v}\in V; \\[1.5ex] \cdot&\vcentcolon \R\times\Hom(V,W)\to\Hom(V,W)\\ &\quad (r\cdot L)(\vect{v}) = r\cdot L(\vect{v})= L(r\cdot \vect{v}) \  \forall r\in \R, L\in \Hom(V,W),\vect{v}\in V. \end{align*} $$
>
> With these two operations defined, $\Hom(V,W)$ becomes a linear space.

We can see that the definitions of addition and scalar multiplication above are both very natural: adding two maps means adding their values at each point to get the new value at that point; scalar-multiplying a map by a number means scalar-multiplying the value at each point. That this operation works also relies on the fact that $W$, the codomain of the maps, is itself a linear space. We call this way of defining operations **pointwise definition**.

However, we have merely *declared* it to be a linear space. Is it really? Does it satisfy the eight axioms of a linear space? We need to prove it.


> [!PROOF] The Set $\operatorname{Hom}(V,W)$ Is a Linear Space
>
> To prove it is a linear space, we must verify that it satisfies the eight axioms of a linear space.
>
> - There exists an additive identity $O$, which maps every scalar identically to $\zero_W$: $O(\vect{v}) = \zero_W$ holds for all $\vect{v}\in V$. Then we have $$\begin{align*}(O+L)(\vect{v}) &= O(\vect{v}) + L(\vect{v}) \\ &= L(\vect{v}) = L(\vect{v}) + O(\vect{v})\\ &= (L+O)(\vect{v})\end{align*}$$ for all $\vect{v}\in V$ and $L\in\Hom(V,W)$;
> - Every element has an inverse. For any $S\in \Hom(V,W)$, define a linear map $T\in\Hom(V,W)$ such that for all $\vect{v}\in V$, $T(\vect{v}) = S(-\vect{v})$. By properties of linear maps, $T(\vect{v}) = -S(\vect{v})$. Then for all $\vect{v}\in V$, we have $$\begin{align*}(T+S)(\vect{v}) &= T(\vect{v}) + S(\vect{v})\\ &= -S(\vect{v})+S(\vect{v}) = \zero_W = S(\vect{v}) + T(\vect{v})\\ &=(S+T)(\vect{v})\end{align*}$$ Thus $T$ is indeed the inverse of $S$;
> 
> - Addition is associative and commutative. For any $R,S,T\in\Hom(V,W)$ and any $\vect{v}\in V$, we have $$\begin{align*}(R+(S+T))(\vect{v}) &= R(\vect{v})+(S+T)(\vect{v})\\ & = R(\vect{v})+S(\vect{v})+T(\vect{v})= (R+S)(\vect{v})+T(\vect{v}) \\ &= ((R+S)+T)(\vect{v}) \\ &= S(\vect{v})+T(\vect{v})+R(\vect{v})\\ & = ((S+T)+R)(\vect{v})\end{align*}$$ which always holds;
> 
> - Taking the multiplicative identity $1$ in $\R$, we have $$(1\cdot L)(\vect{v}) = 1\cdot_W L(\vect{v}) =L(1\cdot_V\vect{v})= L(\vect{v})$$ for all $L\in\Hom(V,W),\vect{v}\in V$. Thus scalar multiplication indeed has an identity;
> 
> - Scalar multiplication distributes over vector addition: for any $r\in\R, S, T\in\Hom(V,W)$ and $\vect{v}\in V$, the following always holds: $$\begin{align*}(r\cdot( S+ T))(\vect{v}) &= ( S+ T)(r\cdot\vect{v})=  S(r\cdot\vect{v})+ T(r\cdot\vect{v}) \\ &= r\cdot S(\vect{v})+r\cdot T(\vect{v}) = (r\cdot S)(\vect{v})+(r\cdot T)(\vect{v})\\ &= (r\cdot( S+ T))(\vect{v});\end{align*}$$
> - Scalar addition distributes over scalar multiplication: for any $r,s\in\R, S\in\Hom(V,W)$ and $\vect{v}\in V$, the following always holds: $$\begin{align*}((r+s)\cdot S)(\vect{v}) &=  S((r+s)\cdot\vect{v})=  S(r\cdot\vect{v}+s\cdot\vect{v}) \\ &= r\cdot S(\vect{v})+s\cdot S(\vect{v}) = (r\cdot S)(\vect{v})+(s\cdot S)(\vect{v})\\ &= (r\cdot S+s\cdot S)(\vect{v});\end{align*}$$
> - Scalar multiplication is compatible with field multiplication: for any $r,s\in\R, S\in\Hom(V,W)$ and $\vect{v}\in V$, the following always holds: $$((rs)\cdot S)(\vect{v}) =  S((rs)\cdot\vect{v}) =  S((sr)\cdot\vect{v}) = ((sr)\cdot S)(\vect{v}).$$
>
> With this, the verification is complete. $\Hom(V,W)$ is indeed a vector space under the addition and scalar multiplication defined above.

This proof is so long, but in reality it really just boils down to checking every axiom against the definitions and properties of linear maps — ugh, so exhausting. I won't prove such tedious things again later, unless it's a very special linear space that doesn't so obviously satisfy the axioms.

So now, we know that $\Mat(m,n)$, the set of all $m\times n$ matrices, is an $mn$-dimensional linear space; and $\Hom(V,W)$, the set of all linear maps from a linear space $V$ to $W$, is also a linear space. And an $m\times n$ matrix can be interpreted as a linear map from an $n$-dimensional linear space to an $m$-dimensional one (once bases are chosen on both sides). There must be some special connection between them! Perhaps, if $\dim V = n, \dim W = m$, then $\Mat(m,n)$ and $\Hom(V,W)$ are isomorphic!

How do we confirm this? Let's first look at two special cases: $\Hom(\R,V)$ and $\Hom(V,\R)$.

### $\operatorname{Hom}(\R,V)$ and $V$

Consider a linear map $L$ in $\Hom(\R,V)$. According to the relationship between linear maps and matrices, its matrix representation under bases of $\R$ and $V$ is $\mat{A} = \mrep{L}{\BaseE}{\BaseBV}$. Following our notation above, this matrix representation has $n$ rows but only $1$ column.

Let's first look at $\R$. From the discussion in the previous chapter, we already know that $\R$ itself is a linear space, and its canonical basis is $1$. Now consider this linear map $L$: it *uniquely maps a vector to a vector in another space* while preserving linearity. In other words, this linear map sends $0$ in $\R$ to $\zero$ in $V$, and every number corresponds to some vector in $V$.

Since we have chosen bases for both linear spaces, we can, using the content of the previous chapter, consider them as free linear spaces: $\{f\ \vert\ f\vcentcolon\{1\}\to\R\}$ and $\{g\vert\ g\vcentcolon\BaseBV\to \R\}$. That is, both are uniquely determined by their bases $\BaseE = \{1\}$ and $\BaseBV$, and a map between these two linear spaces can be seen as this process: pick a vector from $V$ and make it correspond to the basis $\{1\}$ of $\R$. This can also be seen from the meaning of the $(i,1)$-th matrix entry of its representing matrix: it represents the component along the $i$-th basis vector of $V$, after the basis vector $1$ of $\R$ is mapped into $V$.

See it yet? One such linear map actually uniquely corresponds to a vector in $V$. Then? What about the set of all such linear maps? Exactly — it is $V$ itself. This means that a linear map from $\R$ to an $n$-dimensional linear space $V$ is really *just a vector in $V$*! This also explains why we use so-called *column vectors*, or, as some places call them, *column matrices*, to represent a vector.

#### Column Vectors and $\R\to V$: A Natural Isomorphism

In fact, we can define a **natural isomorphism** between $\Hom(\R,V)$ and $V$:

$$ \eta\vcentcolon\Hom(\R,V)\to V,\quad  f \mapsto f(1)\ \ \forall f\in\Hom(\R,V),$$

where $1$ is the familiar number $1$. That is, we just need each map in $\Hom(\R,V)$ to evaluate at $1$, and we get the corresponding vector in $V$. The reason this isomorphism is indeed an isomorphism is that we can immediately define its inverse:

$$ \phi\vcentcolon V\to\Hom(\R,V),\quad (\phi(\vect{v}))(r) = r\cdot\vect{v}\ \ \forall\vect{v}\in V, r\in\R, $$

i.e., we map a vector to a linear map from $\R$ to $V$. This linear map takes a number in $\R$ and scalar-multiplies the vector by it. We can prove this is an isomorphism:

> [!PROOF] The Map $\eta$ Is an Isomorphism of Linear Spaces
> 
> Since both sides of $\eta$ are linear spaces, and we have already constructed its candidate inverse $\phi$. To verify it's an isomorphism, we can prove $\phi$ is indeed its inverse, i.e., $\phi\comp\eta = \idop_{\Hom(\R,V)}$ and $\eta\comp\phi = \idop_{V}$ are both identity transformations:
> - For any $f\in \Hom(\R,V)$, for any $r\in\R$, if we can make $f$ go full circle and return to itself, the first part is proved, and we have: $$ (\phi\comp\eta)(f(r)) = (\phi\comp\eta(f))(r) = \phi(f(1))(r) = r\cdot f(1) = f(r);$$
> - For any $\vect{v}\in V$, we have $$\eta\comp\phi(\vect{v}) = \eta(\phi(\vect{v})) = \phi(\vect{v})(1) = 1\cdot \vect{v} = \vect{v}.$$
> The last equality in both expressions uses properties of linear maps and linear spaces; the equalities before them are composition of maps. Thus, we conclude it is an isomorphism.

Now, why is it called a **natural** isomorphism? This is because we're once again borrowing language from category theory — its definition should involve so-called **functors**, which we won't expand on here (because I'm a newbie). One can understand so-called *natural* like this: if the construction of this homomorphism does not rely on any extra information beyond the basic information about the domain and codomain regarding this category, and the objects used in this homomorphism are not specific — any object in this category would work. Here, the category we're discussing is linear spaces, so "a homomorphism is natural" means that the construction of this map requires nothing beyond the basic properties of linear spaces — the $V$ used to define it can be any valid linear space.

Why did we emphasize *natural*? Because when we express a vector as a *column matrix*, through the description in the previous section, we need two sets of bases to determine it. But in reality, we only need one basis on $V$ to express it, and this is consistent with the idea that *a vector needs one basis to be expressed as a column vector*. The reason we don't need another basis for $\R$ stems precisely from this *naturality*: this correspondence doesn't require choosing a specific basis, so if we want to express something as a column matrix, we really only need a basis on $V$.

And this, in turn, perfectly guarantees that we can indeed transform the process of computing the image of a vector under a linear map into the multiplication of a matrix and a column vector — we just need to use matrix multiplication. One operation, two interpretations — not bad at all!

### The Dual Space $V^*$

Let's now examine $\Hom(V,\R)$. Before that, since $\Hom(V,\R)$ has a special meaning, it is defined as the so-called **dual space** of $V$:

> [!DEF] Dual Space
>
> The dual space of a linear space $V$, denoted $V^*$, is obtained by defining addition and scalar multiplication on the set $\Hom(V,\R)$, with addition and scalar multiplication defined respectively as:
> 
> $$\begin{align*} +&\vcentcolon  V^*\times  V^*\to  V^*\\ &\quad(\cvect{\varphi}+\cvect{\psi})(\vect{v}) = \cvect{\varphi}(\vect{v})+\cvect{\psi}(\vect{v})\ \  \forall \cvect{\varphi},\cvect{\psi}\in  V^*,\vect{v}\in V;\\[1.5ex] \cdot&\vcentcolon \R\times V^*\to V^*\\ &\quad(r\cdot\cvect{\varphi})(\vect{v}) = r\cdot \cvect{\varphi}(\vect{v}) = \cvect{\varphi}(r\cdot\vect{v})\ \  \forall r\in \R, \cvect{\varphi}\in  V^*,\vect{v}\in V.\end{align*}$$
>
> We call elements of the original space $V$ *vectors*, and elements of $V^*$ **covectors**.

We can see that each covector in $V^*$ is a linear map from $V$ to $\R$ — given a vector in $V$, it produces a real number. With this definition in place, let's continue with our earlier question: how do we connect $\Hom(V,\R)$, i.e., $V^*$, with $V$ and with matrix representations?

#### Linear Spaces and Dual Spaces

Again, we first choose bases for both $V$ and $\R$, namely $\BaseBV$ and $\BaseE$. Then a linear map $T\in V^*$ can be expressed as $\mat{B} = \mrep{T}{\BaseBV}{\BaseE}$. This matrix has $1$ row and $n$ columns — it is what we call a **row matrix** or **row vector**.

Next, let's try to use the earlier concept of *free linear spaces* to study the relationship between it and $V$. Following our earlier approach, the two spaces, once bases are chosen, are uniquely determined, so a map between them can be reduced to a map from $\BaseBV$ to $\{1\}$. Then we can just...

Wait a moment — from an arbitrary set $S$ to a singleton set $\{\bullet\}$, there is one and only one map, namely the constant map! Looks like the free-linear-space route won't work. So, how should we think about its relationship with the linear space $V$?

Fortunately, we still have the matrix representation of $\cvect{\varphi}\in V^* = \Hom(V,\R)$. When $\cvect{\varphi}\in V^*$ is expressed as a $1\times n$ matrix, the meaning of its $(1,j)$-th matrix entry is the component, in the basis $\{1\}$ of $\R$, of the $j$-th basis vector of $V$ after undergoing the linear map — or simply, the value of the $j$-th basis vector under the map. This tells us that the $n$ entries of this matrix correspond to the values of $\cvect{\varphi}$ on $\BaseBV$.

Thus we obtain a triangular relationship: a covector in the dual space, as a linear map $V\to \R$, uniquely determines a $1\times n$ matrix, and the $n$ entries of this matrix represent, respectively, the values of the basis vectors of $V$ under the covector map. This means: if we can determine the values of the basis vectors of $V$ under a covector, we can uniquely determine that covector.

However, when expressing a vector as a linear combination of basis vectors, there is a similar correspondence: once a basis is chosen for a linear space, a single set of linear combination coefficients uniquely determines a vector. This suggests that we could very well take the values of those basis vectors of $V$ under the covector as the linear combination coefficients of this covector. But then the question arises: this time we've ended up with the linear combination coefficients of the covector *first* — so what basis should these coefficients be paired with to express a covector?

We need to find a basis for $V^*$.

#### The Dual Basis

Let's take a covector $\cvect{\varphi} \in V^*$. It has linear combination coefficients $\varphi_1,\varphi_2,\dots,\varphi_n$. Although we don't yet know the concrete form of a basis of $V^*$, let's suppose this basis is $\BaseB^* = \cbasev{\beta}{i}{n}$. Then $\cvect{\varphi}$ can be expressed as the linear combination:

$$\cvect{\varphi} = \sum_i^n \varphi_i\cvect{\beta}^i,$$

Our immediate task is to find an expression for $\cvect{\beta}^i$. It is also a covector in $V^*$, i.e., a linear map from $V$ to $\R$. To determine a map, the best method is to feed it a value from the domain and see what comes out. Unsurprisingly, if we give it $\vect{v}\in V$, the result is:

$$\cvect{\varphi}(\vect{v}) = \sum_i^n \varphi_i\cvect{\beta}^i(\vect{v}),$$

But $\vect{v}$ can also be expressed as a linear combination of the basis $\BaseB$ of $V$. Substituting that in:

$$\cvect{\varphi}(\vect{v}) = \sum_i^n \varphi_i \cvect{\beta}^i(\sum_j^n v^j\vect{b}_j) = \sum_i^n\sum_j^n\varphi_i v^j\cvect{\beta}^i(\vect{b}_j),$$

Now let's recall the original meaning of these "linear combination coefficients": the values of the basis vectors of $V$ after being mapped by $\cvect{\varphi}$, i.e.,

$$\cvect{\varphi}(\vect{v}) = \sum_i^n\sum_j^n v^j\cvect{\beta}^i(\vect{b}_j)\cvect{\varphi}(\vect{b}_i),$$

Our $\cvect{\varphi}$ appears once again! More importantly, $v^i$ and $\cvect{\beta}^i(\vect{b}_j)$ are all real numbers in $\R$, so by properties of linear maps, we have

$$\cvect{\varphi}(\vect{v}) = \cvect{\varphi}(\sum_j^n v^j \sum_i^n \cvect{\beta}^i(\vect{b}_j)\vect{b}_i),$$

And since $\vect{v} = \sum_j^n v^j \vect{b}_j$, by *comparing*, we obtain:

$$\sum_i^n \cvect{\beta}^i(\vect{b}_j)\vect{b}_i = \vect{b}_j,$$

This says that $\vect{b}_j$ is a linear combination of basis vectors. But it's already a basis vector itself! If it's expressed as a linear combination, the only possibility is that the coefficient at the $j$-th position is $1$ and all others are $0$. That is:

$$\cvect{\beta}^i(\vect{b}_j) = \begin{cases}
  1 &\text{if }\ i=j\\
  0 &\text{if }\ i\neq j\\
\end{cases}$$

We've constructed a basis for $V^*$! ...Have we?

#### Proving $\mathcal{B}^*$ Is a Basis

Our construction above has a huge hole: $f(a) = f(b)$ never implies $a = b$ — we must prove $f$ is injective to draw such a conclusion. But we didn't prove that the covector $\cvect{\varphi}$ above is injective.

Actually, one can prove that all covectors in $V^*$ are injective. The bad news is, this is not easy to prove with the tools we currently have. So have all our efforts been for nothing? Not really. At least, the conclusion is correct — what separates it from being safely usable is not so much a rigorous construction, but simply proving that it is indeed a basis. So, let's try to prove the following proposition (theorem).

> [!THM] Dual Basis
>
> Suppose the vector space $V$ has a basis $\BaseBV = \basev{b}{i}{n}$. Then its dual space $V^*$ has a basis $\cbasev{\beta}{i}{n}$, defined as 
> 
> $$\cvect{\beta}^i(\vect{b}_j) = \delta^i{}_j,$$
>
> where $\delta^i{}_j$ is called the **Kronecker delta**, defined as
>
> $$\delta^i{}_j = \begin{cases} 1 &\text{if }\ i=j\\ 0 &\text{if }\ i\neq j\\\end{cases}.$$

It's worth noting a few things about the Kronecker delta symbol:

> [!REM] The Meaning of the Kronecker Delta
>
> This symbol is called a "symbol" because its function is too simple, yet it admits multiple interpretations. The symbol actually represents a function that compares two positive integer values: it outputs $1$ if they are equal, and $0$ if they are not. So, we can say it is a function:
> 
> $$ \delta \vcentcolon \field{N}\times\field{N}\to \R,$$
>
> and we use $\delta^i{}_j$ to record its value at $(i,j)$. However, doing so raises two minor issues:
> - First, whether its codomain is appropriate. If we use $\R$, it might seem too large; if we use $\{0,1\}$, then it loses the ability to be multiplied and added with other numbers. For compatibility with multiplication in our context, we still adopt the $\R$ definition;
> - Second, whether its domain is appropriate. This issue mainly stems from the fact that this symbol is simply too basic: it judges whether two things are equal. If they are, output $1$; otherwise, output $0$. There's absolutely no need to restrict it to $\field{N}$ — we could extend it to $\field{Z}$, or even to arbitrary sets more generally. But we won't do that here: restricting it to the index set $I = \field{N}$ that we need is enough.
>
> Also, note that before introducing *Einstein summation convention*, we treat $\delta^i{}_j$ purely as a real number. Even though it can be interpreted as the identity matrix, it is an element *within* a matrix, not actually a matrix itself.

Now let's prove the proposition.

> [!PROOF] Dual Basis
>
> To prove that the set of vectors $\BaseB^* = \cbasev{\beta}{i}{n}$ is a basis of the linear space $V^*$, we need to prove that it is a linearly independent set, and that it spans the linear space $V^*$.
>
> - Proof of linear independence
>   
>   Take an arbitrary vector $\vect{v}\in V$, and form a linear combination of $\BaseB^*$: $$\cvect{\varphi}= \sum_i^n \varphi_i\cvect{\beta}^i,$$ and set it equal to $\zero_{V^*}$. Then we have $$\begin{align*}\cvect{\varphi}(\vect{v}) &= \sum_i^n\varphi_i \cvect{\beta}^i(\vect{v}) \\ &= \sum_i^n\varphi_i\sum_j^nv^j\cvect{\beta}^i(\vect{b}_j) = \sum_i^n\sum_j^n\varphi_iv^j\delta^i{}_j \\ & =\zero_{V^*}(\vect{v}) = 0_\R. \end{align*}$$ By the definition of the Kronecker delta, $$\begin{align*}\sum_i^n\sum_j^n\varphi_iv^j\delta^i{}_j &= \sum_i^n\varphi_i(\sum_j^n v^j \delta^i{}_j) \\ &= \sum_i^n\varphi_i (v^1\delta^i{}_1 + v^2\delta^i{}_2 + \dots + v^n\delta^i{}_n) \\  &= \sum_i^n \varphi_iv^i = 0_\R. \end{align*}$$ Since this holds for an arbitrary vector $\vect{v}\in V$, we must have $\varphi_i = 0\quad\forall 1\leq i \leq n$, i.e., when a linear combination of $\BaseB^*$ equals $\zero_{V^*}$, all its coefficients are $0$. This shows that $\BaseB^*$ is linearly independent.
>
> - Proof that $\BaseB^*$ spans $V^*$
>
>   To prove it linearly spans $V^*$, we need to show that every covector in $V^*$ can be uniquely expressed as a linear combination of this set. Take an arbitrary $\cvect{\varphi}\in V^*$ and $\vect{v}\in V$. Choosing the basis $\BaseB$ of $V$, we have $$\cvect{\varphi}(\vect{v}) = \sum_i^nv^i\cvect{\varphi}(\vect{b}_i).$$ Set $\cvect{\varphi}(\vect{b}_i) = a_i$. Then $$\begin{align*} \cvect{\varphi}(\vect{v})  &= \sum_i^n v^i a_i\\ &= \sum_i^n v^i \sum_j^n a_j \delta^j{}_i = \sum_i^n v^i \sum_j^n a_j \cvect{\beta}^j(\vect{b}_i) \\ &=\sum_j^n a_j \cvect{\beta}^j (\vect{v}) = (\sum_i^n a_i \cvect{\beta}^i)(\vect{v}).\end{align*} $$ Thus we have successfully proved that an arbitrary $\cvect{\varphi}\in V^*$ can, once we have defined $\BaseB^*$, be expressed as a linear combination of it.
>
> With this, we have successfully proved that $\BaseB^*$ is a basis of $V^*$.

The proof idea is really just flipping back and forth, using the properties of linear maps and the definition of dual basis vectors — not very hard. From the proof we can see that the definition of the dual basis *completely* depends on the basis of the original space. If we want to obtain a basis $\BaseB^*$ of $V^*$, we must first choose a basis $\BaseB$ of $V$, and then define $\BaseB^*$ as the set of covectors that send the vectors in $\BaseB$ to $1$ or $0$. Precisely because of this, some textbooks define the dual space by starting from the dual of the basis, then using these dual covectors to linearly span a space, and finally calling it $V^*$.

#### Duals and Matrix Representations

At the end of Chapter 1, we mentioned that an $n$-dimensional linear space over $\R$, once a basis is chosen, can always be made isomorphic to $\R^n$, with this isomorphism sending the basis of the linear space to the standard basis of $\R^n$. From the content of the previous section, we can also see that $V^*$ and $V$ have the same number of basis vectors (after all, each vector in $\BaseB^*$ is defined one by one from vectors in $\BaseB$). By the definition of dimension, they have the same dimension, so they are indeed isomorphic. And one can directly see the isomorphism between them from the construction process of the dual basis.

However, we point out that this isomorphism is *not* the *natural isomorphism* we mentioned earlier. It does not satisfy the requirement of *naturality* — namely, that the isomorphism should not depend on any features beyond the eight axioms of linear spaces. Because if we want to describe this isomorphism, we must find basis vectors in $V$ before we can describe what's going on in $V^*$. Even though any choice of basis in $V$ yields the same $V^*$, we still ultimately relied on the choice of basis. Therefore, we commonly regard $V$ and $V^*$ as two closely related but *not identical* linear spaces — unlike before, where we directly identified $V$ with $\Hom(\R,V)$.

But when we choose a basis for the linear space $V$ and express it as $\Hom(\R,V)$, we can see that: since we chose a basis for $V$, we immediately obtain a basis for $V^*$. And since the matrix representation of $\Hom(V,\R)$ is a row vector, we get that each matrix entry of the row vector is a linear combination coefficient of $\Hom(V,\R)$.

Consider two vectors $\vect{u},\vect{v}\in V$. After choosing a basis $\BaseB$ for $V$, the two vectors can be expressed as column vectors. Now let's do the following: turn the column vector $\vrep{v}{\BaseB}$ into a row vector, denoting the result as $[\vect{v}^*]_{\BaseB^*}$. Concretely, take each number out, replace all the corresponding basis vectors with dual basis vectors, then form the linear combination as before. The changed matrix representation only alters the arrangement direction of the numbers — from vertical to horizontal. And by the meaning of a covector, it is a linear map $V\to \R$. We define it as the **dual vector**:

> [!DEF] Dual Vector
>
> Suppose there is a vector $\vect{v}\in V$ in a linear space $V$, whose linear expression under a basis of $V$ is $\sum_i^n v^i \vect{b}_i$. Replace $\vect{b}_i$ with the corresponding dual basis vectors $\cvect{\beta}^i$ of $V^*$, and use the original linear combination coefficients to obtain the vector $\vect{v}^*$, called the *dual vector* of $\vect{v}$:
> $$\vect{v}^* = \sum_i^n v_i \cvect{\beta}^i,$$
>
> where $v^i = v_i$.

Since a vector can have a corresponding dual vector, and this dual vector happens to be a linear map that sends vectors to real numbers, what do we get when the dual vector of one vector acts on another vector?

The result of this computation is actually quite simple: multiply the components in corresponding positions and then add them up. But its significance is not simple at all: we endow a linear space with a basis, express two vectors as matrices; pick one vector, and through the isomorphism between the linear space and its dual, uniquely determine the dual vector (covector) of this vector — its matrix representation only changes the arrangement of the matrix entries, from vertical to horizontal; then we use the meaning of a covector as a linear map to send the other vector to a number. This number is nothing other than the sum of the products of the corresponding components of the two vectors. From the perspective of matrix operations, it is a row matrix multiplied by a column matrix, yielding a real number.

Observing this process, we can draw the following conclusion: after choosing a basis for a linear space, we can define on it an operation that takes two vectors, turns one of them into its dual vector, and then applies it to the other vector, yielding a real number. In effect, this defines the so-called **inner product** — which maps two vectors to a real number, and is a *bilinear form*, linear in both argument positions. We will discuss this so-called inner product in the next chapter.

We also point out that, once a basis of the linear space is chosen, the difference between a vector and its dual, in terms of matrix representation, is entirely just a change in the arrangement of the matrix entries. We will point this out later when we specifically discuss matrices — this is essentially the so-called **matrix transpose**, and there are in turn rich relationships among transposition, duals, and linear maps.

## Beyond the Dual

We can also raise an interesting question: the dual space, as a linear space, must itself have a dual. What would that space look like?

### The Double Dual Space

First let's give this space a notation. The dual space $V^*$ can have its own dual space, denoted $V^{**}$. We can study how $V^{**}$ arises from $V^*$ in exactly the same way we studied how $V^*$ arises from $V$. Therefore, all conclusions we have about $V$ and $V^*$ carry over, mutatis mutandis, to $V^*$ and $V^{**}$. The question is: what is the relationship between $V$ and $V^{**}$? Although we won't recount all the details of $V^{**}$, let's still give the basic description of the **double dual** space.

> [!DEF] Double Dual Space
>
> We call the dual space of the dual space $V^* = \Hom(V,\R)$ of a linear space $V$, namely $V^{**} = \Hom(V^*,\R)$, the double dual space of $V$, denoted $V^{**}$. That is:
>
> $$\Hom(V^*,\R) = \Hom(\Hom(V,\R),\R).$$

We immediately think of a question: what do the vectors in the double dual space look like? From the definition of this space, it's a linear map from $V^*$ to $\R$ — in other words, something that assigns a real number to each covector. But that still doesn't give us a clue about the relationship between $V^{**}$ and $V$. Still, since the concept of *dual* is almost inseparable from the choice of basis vectors, let's look at what a basis of $V^{**}$ looks like.

According to our earlier study of dual spaces, a basis of $V^{**}$ is uniquely determined once we choose a basis of $V^*$. We can define its double dual basis $\BaseB^{**}= \{\cvect{\beta}^*_i\}_{i=1}^{n}$ by analogy with how we defined the dual basis $\BaseB^*$ of $V$:

$$ \begin{align*}
\cvect{\beta}_i^{*} &\vcentcolon V^*\to \R,\\
&\quad \cvect{\beta}_i^{*}(\cvect{\beta}^j) = \delta_i{}^j,
\end{align*} $$

What is this $\delta_i{}^j$? We can study its domain, codomain, and correspondence, and discover that it is actually the same function as $\delta^j{}_i$, because their inputs are the same, their outputs are the same, and their correspondence rules are the same — all three elements of a function are equal, so the two functions are indeed equal.

Our choice of notation here is largely for formalistic reasons. Thanks to this definition of the basis (and our earlier efforts in the "first" dual part), we can now set about describing what the vectors in $V^{**}$ are like. Since each vector is a linear map from $V^*$ to $\R$, let's take $\cvect{\xi}\in V^*$ and feed it into $\cvect{\varphi}^*\in V^{**}$:

$$\cvect{\varphi}^* (\cvect{\xi}) = \sum_i^n\sum_j^n\varphi^{*i}\xi_j\cvect{\beta}^*_i(\cvect{\beta^j}),$$

By our definition of the double dual basis, we have

$$\cvect{\varphi}^* (\cvect{\xi}) = \sum_i^n\sum_j^n \varphi^{*i}\xi_j\delta_i{}^j.$$

However, according to our earlier remark, $\delta_i{}^j$ is in fact equal to $\delta^i{}_j$. Moreover, $\varphi^{*i}$ and $\xi_j$ are the linear combination coefficients of a vector in $V^{**}$ and a covector, respectively — they are all real numbers. Let's perform a bold and mysterious operation:

$$\begin{align*}
\cvect{\varphi}^* (\cvect{\xi}) &= \sum_i^n\sum_j^n \varphi^{*i}\xi_j\delta_i{}^j \\
                                &\overset{?}{=} \sum_i^n\sum_j^n\xi_j\varphi^{*i} \delta^j{}_i  \\
                                &= \sum_j^n\sum_i^n\xi_j\varphi^{*i} \cvect{\beta}^j(\vect{b}_i) \\
                                &= \sum_i^n\varphi^{*i}\cvect{\xi}(\vect{b}_i)\\
                                &= \cvect{\xi}(\sum_i^n \varphi^{*i}\vect{b}_i). 
\end{align*}$$

One equality is marked with $?$: before it is just the commutativity of multiplication, and after it is our claimed substitution of *the two forms of the Kronecker delta as the same thing*. Then expanding it is just formally using the relationship among the basis, the dual basis, and $\delta^j{}_i$, followed by using the linear combination in $V^*$ to obtain $\cvect{\xi}$, and finally using the properties of linear maps to bring the sum inside.

Now look at this sum — what is it? It involves the basis of $V$ and the linear combination coefficients from $V^{**}$, and these coefficients, being real numbers, combine perfectly with the basis. So, ultimately, what does that last line mean? $\cvect{\varphi}^*$ is linearly mapping $\cvect{\xi}$ to a real number, just as if $\cvect{\xi}$ were mapping a vector $\vect{v}\in V$ to a real number, and the coefficients of its representation under the basis $\BaseB = \basev{b}{i}{n}$ of $V$ are $v^i = \varphi^{*i}$!?

There is definitely a deep relationship between a linear space and its double dual. It seems that no matter what basis we choose for $V^{**}$, no matter how a $\cvect{\varphi^*}\in V^{**}$ is represented under that basis, we can get the exact same representation under the *corresponding basis* in $V$. Could there be a *natural isomorphism* between them, like the one between $\Hom(\R,V)$ and $V$?

### The Double Dual and Natural Isomorphism

Exactly. There exists a natural isomorphism between a linear space and its double dual — or, we might as well say, we can simply regard $V^{**}$ as $V$! To illustrate this, we need to directly define an isomorphism from $V$ to $V^{**}$ that does not rely on any information about $V$ or $V^{**}$. And the definition of this isomorphism has actually been hinted at above. Let's begin.

> [!THM] Natural Isomorphism Between $V$ and $V^{**}$
>
> We define a linear map $\iota$ as follows:
>
> $$\begin{align*} \iota\vcentcolon& V\to V^{**},\\ \quad & (\iota(\vect{v}))(\cvect{\varphi}) = \cvect{\varphi}(\vect{v}) \quad \forall \cvect{\varphi}\in V^*, \end{align*}$$
>
> This linear map is a **natural isomorphism** (in this context, also called the **evaluation map**). Thus, we may not distinguish between $\vect{v}$ and $\iota{\vect{v}}$.

Now let's prove it is an isomorphism and explain why it is natural.

> [!PROOF] The Homomorphism $\iota$ Is an Isomorphism
>
> Since every vector in a vector space is uniquely expressed as a linear combination of basis vectors, if the basis of $V$, after being mapped by $\iota$, can uniquely become a basis of $V^{**}$ — i.e., there is a one-to-one correspondence between the bases of $V$ and $V^{**}$ — then each vector in $V$ uniquely corresponds to a vector in $V^{**}$. And we have already discussed this: regarding the mapping of bases between the two, we have:
>
> $$(\iota(\vect{b}_i))(\cvect{\beta}^j) = \cvect{\beta}^j(\vect{b}_i) = \delta^j{}_i ,$$
>
> Thus each $\iota(\vect{b}_i)$ can serve as a basis vector, and furthermore, $\{\iota(\vect{b_i})\}_{i=1}^n$ becomes a basis of $V^{**}$. With this we have successfully proved it is an isomorphism.

It is also natural, as we explain below:

> [!REM] The Isomorphism $\iota$ Is a Natural Isomorphism
>
> According to our explanation of *natural*: its definition does not depend on any extra, internal information/properties of $V$ and $V^{**}$ beyond the fact that they are linear spaces and the definition of $V^{**}$. We do not need to find specific bases for the two spaces in order to define this linear isomorphism, so this isomorphism is a natural isomorphism.

The beautiful property of the double dual was already hinted at when we described the basis and linear combinations of elements of $V^{**}$: its basis vectors have their labels written as *subscripts*, and the components are written as *superscripts* — exactly the same convention as when expressing a vector in $V$ as a linear combination. And a linear map from a vector space to $\R$ is a linear space — no matter how many times you nest it, it will always land back on one of the two, $V$ or $V^*$. I think this is also why we only need superscripts and subscripts to determine which linear space an element belongs to.

### Duals and Category Theory

But the concept of the dual goes even further. We can even elevate it to the level of category theory (yes, the concept of *natural* also comes from category theory):

> [!REM] Dual Functor, Double Dual Functor, and Natural Transformation
> 
> $(-)^*$ is a **functor** from the category $\Vect$ to itself, sending an object $V$ to another object $V^*$, and transforming a linear map from $V$ to $W$ into a linear map from $W^*$ to $V^*$. That is:
>
> <!-- https://q.uiver.app/#q=WzAsNCxbMCwwLCJWIl0sWzEsMCwiVyJdLFswLDEsIlZeKiJdLFsxLDEsIldeKiJdLFswLDEsImYiXSxbMCwyLCIiLDAseyJzdHlsZSI6eyJ0YWlsIjp7Im5hbWUiOiJtYXBzIHRvIn19fV0sWzEsMywiIiwwLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoibWFwcyB0byJ9fX1dLFszLDIsImZeKiIsMl1d -->
> <iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwwLCJWIl0sWzEsMCwiVyJdLFswLDEsIlZeKiJdLFsxLDEsIldeKiJdLFswLDEsImYiXSxbMCwyLCIiLDAseyJzdHlsZSI6eyJ0YWlsIjp7Im5hbWUiOiJtYXBzIHRvIn19fV0sWzEsMywiIiwwLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoibWFwcyB0byJ9fX1dLFszLDIsImZeKiIsMl1d&embed" width="304" height="304" style="border-radius: 8px; border: none;"></iframe>
>
> Since a linear map changes direction under this functor, this functor is a **contravariant functor**.
> 
> Furthermore, we can define the *double dual functor* $(-)^{**}$, which sends $V$ to $V^{**}$, and transforms a linear map from $V$ to $W$ into a linear map from $V^{**}$ to $W^{**}$. Moreover, there exists a **natural transformation** from the identity functor $\operatorname{Id}$ to the double dual functor $(-)^{**}$. Under this natural transformation, we can define for every linear space an *evaluation map* $$\eta_V\vcentcolon V\to V^{**},$$ and the following diagram commutes:
> 
> <!-- https://q.uiver.app/#q=WzAsNCxbMCwwLCJWIl0sWzEsMCwiVyJdLFswLDEsIlZeeyoqfSJdLFsxLDEsIldeeyoqfSJdLFswLDEsImYiXSxbMCwyLCJcXGV0YV9WIiwyXSxbMSwzLCJcXGV0YV9XIl0sWzIsMywiZl57Kip9IiwyXV0= -->
> <iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwwLCJWIl0sWzEsMCwiVyJdLFswLDEsIlZeeyoqfSJdLFsxLDEsIldeeyoqfSJdLFswLDEsImYiXSxbMCwyLCJcXGV0YV9WIiwyXSxbMSwzLCJcXGV0YV9XIl0sWzIsMywiZl57Kip9IiwyXV0=&embed" width="304" height="304" style="border-radius: 8px; border: none;"></iframe>

We only introduce the so-called functors and natural transformations here, without delving deeper into the above statements.

A so-called *functor* is a map between categories: it sends objects of one category to objects of another, and correspondingly sends morphisms (arrows) of the category to morphisms of the other. Here, both our dual functor and double dual functor are functors from $\Vect$ to itself, so their effect is to turn one linear space into another linear space, and to transform linear maps in the domain into the corresponding linear maps.

A so-called *natural transformation*, on the other hand, is defined between functors. It transforms one functor into another. Here, our natural transformation transforms the identity functor (the one that does nothing) into the double dual functor. And the existence of such a *natural transformation* allows us to *naturally* define the double dual space for *any* linear space — this linear map is called the evaluation map. Perhaps from this you can sense why we say that the *dual* is not natural, but the *double dual* is. Because the double dual can be obtained purely from a natural transformation between functors, while the dual cannot — you must go inside the linear space to define it.

## Summary

As usual, let's summarize what this chapter covered. In this chapter we did the following things:

- Introduced *matrices* as two-dimensional tables of numbers, and constructed the **matrix space** $\Mat(m,n)$ under **pointwise** addition and scalar multiplication;
- By computing the result of a vector under a linear map, we arrived at the **meaning of the matrix entry $A^i{}_j$**: the $i$-th component of the $j$-th basis vector of $V$ under the basis of $W$ after being mapped;
- From the meaning of matrix entries, we defined the matrix representation of a linear map $\mrep{L}{\BaseB}{\BaseC}$, and the **relationship between matrix multiplication and composition of linear maps**;
- We proved that $\Hom(V,W)$ is a linear space under pointwise addition and scalar multiplication, and that it has a strong correspondence with $\Mat(m,n)$;
- Through the example of $\Hom(\R,V)$, we obtained its natural isomorphism with $V$, which shows that the representation as column vectors is completely justified;
- We defined the dual space $V^*=\Hom(V,\R)$, and by constructing the dual basis $\{\cvect{\beta}^i\}$ and proving it is a basis, we took it as a second example to obtain its relationship with $V$;
- Briefly discussed the pairing of a vector and its dual, and that there are rich connections among duals, transposition, and linear maps;
- We defined the double dual $V^{**}$ and gave the so-called natural isomorphism (evaluation map) $\iota:V\to V^{**}$, by which we can regard $V$ and $V^{**}$ as the same space;
- From the perspective of category theory, we explained why a single dual is not natural while the double dual is;

Linear maps alone already possess extremely rich properties. Here we have only studied two special cases of $\Hom(V,W)$, and even this brings up more questions: why do matrices have so many different meanings, and why do we usually define matrix multiplication in just this one way? What exactly is the relationship between duals and matrix transposition? What new things will those special linear maps bring us? Let's leave these for the next chapter.
