---
categories:
# - Mathematics
- Programming
# - Phase Field
# - Others
tags:
- C
- C++
- Type
- Note
title: "How to Parse (Relatively) Complex C/C++ Types?"
description: "Inspired by a lovely group member's blog post, and then got wrecked..."
date: 2026-01-15T19:35:50+08:00
image: /images/Science.png
math: true
hidden: false
comments: true
---

*I learned about the type distinction between array pointers and pointer arrays from the blog post of a lovely group member [@0xa7973908](https://mahiro.ink/), but such pure notation is really hard to memorize by rote. What's the logic behind it, really? Let's explore~*

*This issue's header image is a screenshot from the MV of the song [サイエンス](https://www.bilibili.com/video/BV1nkB7YQE1z/ "Bilibili link") (Science) by [MIMI](https://x.com/mimi_3mi). It's really pleasant to listen to, very fitting for us research dogs (). The MV was illustrated by [3774.](https://x.com/bokarokaku), whose art is adorable and rock-solid...*

{{< music auto="https://music.163.com/#/song?id=2656567752" loop="none">}} 

## Pointer Array? Array Pointer?

The lovely group member's blog post contained the following:

> `int* a[2]` is an array that holds pointers.
> 
> `int (*a)[2]` is a pointer to an array. Note that `a` points to the array as a whole.
> 
> Similarly, `int (*a)[2][2]` points to the [2][2] as a whole.
> 
> In `int (**a)[2][2]`, `*a` points to the [2][2] as a whole, while `a` points to `*a`.
> 
> For function pointers, we can use a right-first-then-left approach.
> 
> `int* (*a[3])(int*, int)` — first, this is an array; the array holds pointers; these are function pointers; the parameter types are an int pointer and an int; the return value is int*.

Bravo! That's a very concise summary, and this kind of *right-first-then-left* approach is indeed recommended by many articles and textbooks. However, here's a question: HYW (WHY)? Why did the language designers design the C/C++ type system this way? Isn't C/C++ supposed to have a prefix type system? Why do I have to look right sometimes and left other times? What a hassle... Especially with array pointers and pointer arrays — how does a single pair of parentheses turn a set of pointers into a pointer to an array?

But then, bro suddenly thought of a cheeky trick that can perfectly help memorize these two cases, so that mom never has to worry about me mixing them up again:

## Modernizing C/C++ Types

Since C/C++ isn't thoroughly prefix-typed, let's make it even more prefix! In this section, we'll *ignore the array size*, since we're more concerned with the array itself rather than all of its information.

First, we have:

```cpp
int *a_of_p []; // an array contains several pointers, the array is *a_of_p*
int (*p_to_a) []; // a pointer to an array *p_to_a*
```

Since we said C/C++'s prefix typing isn't thorough — meaning it doesn't fully follow the `type name variable_name = value` pattern — let's just move the variable name to the back:

```cpp
int *[] a_of_p;
int [] (*p_to_a);
```

Here we move the parenthesized content as a whole to the back, because, well, parentheses — we all know how parentheses work, and when dealing with parenthesized content it's best to move the entire parenthesized group. Then we consider removing the parentheses from the latter, yielding:

```cpp
int *[] a_of_p;
int []* p_to_a;
```

Eh? Does this step start to feel like something? Well, the next step will make the feeling even clearer! But before introducing it, let's first present a bit of syntactic sugar: in C/C++, we can swap the order of the array subscript and the array name:

```cpp
array[2] == 2[array]; // true
```

HYW? Let's speculate — in the compiler, both are actually processed as the head pointer represented by `array` offset by some amount:

```cpp
*(array+2) == *(2+array); //true
```

Addition is commutative, so the compiler accepts both forms. In reality, the compiler probably does some additional processing to make this syntactic sugar truly valid — after all, under a proper abstraction, an address shouldn't be equivalent to a plain integer but rather a special object. Still, understanding the sugar this way probably isn't too far off.

So? What we need to do to the types above becomes quite clear. We need to take what's in front of the square brackets and put it inside:

```cpp
[int*] a_of_p;
[int]* p_to_a;
```

And so, after our thorough *modernization*, we've made the first variable declaration semantically clear: it is unequivocally an array of pointers `a_of_p`, and the second is equally clear: there is an array, and `p_to_a` points to this array, making it a pointer.

But... to be honest, this method doesn't have a particularly solid theoretical basis. Moving `(*p_to_a)` as a whole to the back and then being able to drop the parentheses — while this operation feels quite intuitive, it really has little justification. And using *syntactic sugar* as an analogy for the type system also feels a bit odd. But it's enough for a mnemonic device.

But didn't the inventors of C/C++ have anything to say about this? Did they just arbitrarily decide it like this? That can't be right, can it?!?

## Ask AI?

What era are we living in? Why not ask the magical AI? The answer I got was: C/C++ is a language that *does not fully follow* the rules of prefix types. The type is not determined solely by the content before the variable name — it also needs the *declarator* after it to jointly decide. That is to say, `*`, `[]`, `()`, and so on are also part of the variable definition.

Wait, `()` too? But isn't that for defining functions? AI also said that C allows defining many things after a single type name:

```cpp
int *p, a[10], (*f)(void);
```

The first is a pointer to an integer, the second is an array of integers, and the third is a pointer to a function that returns an integer value. Wait a minute, the process of using a function after defining it seems...

So I asked AI to list a few more compound variable types, and I discovered a magical pattern:

## Declare It the Way You Use It!

In fact, I recalled a small question I had when first learning C/C++ pointers: when we declare a pointer, we use `int *p;`, but when assigning/initializing this pointer, we need to write `int *p = &a`, where `&` is the address-of operator. Yet when using the pointer, to get the value of `a`, we must use `*p`, even though the variable `p` stores the address of `a`.

All that rambling above is meant to point out: when we declare `int *p`, the variable is indeed `p`, but when using it, we always seem to need `*p` to get the integer value. There are many such examples: `int a[10]` means an array of length `10`, but using `a` directly isn't quite workable — when we want to retrieve content from the array, we always use `a[2]` and so on. If we bring functions into the picture, it becomes even more interesting: after declaring a function `int f()`, when we use it, we always call it with `f()` — plain `f` won't do.

Have you noticed something? **How we declare a variable** is **how we later use it**. More precisely, if we **use the variable in the manner of its declaration**, we will **obtain a value of the type specifier's type**. Let's do an experiment, again with the two examples above:

```cpp
int *a_of_p [N]; // an array contains several pointers, the array is *a_of_p*
int (*p_to_a) [N]; // a pointer to an array *p_to_a*
```

How should we read these two declarations? If we follow the principle of *how do you use this variable later to get a value of the corresponding type*, then the first one seems to be: we first need to fetch something from a certain position in `a_of_p` (applying `[]`), then apply the *dereference* operator `*` to whatever was fetched, and we'll get an integer value. Viewed this way, the thing fetched must be an address (since it can be dereferenced), and the "fetch" action indicates that the first layer wrapping is an array. We finally conclude: it's a pointer array — an array holding many pointers.

And the second one? With the presence of parentheses, we must change the operator precedence, meaning we first need to dereference `p_to_a`. What we get after dereferencing is something we can use the subscript operator on to fetch something — and what's fetched is an integer value. So the first step is dereferencing, and what's dereferenced is an array. Therefore, `p_to_a` is an array pointer — a pointer to an array.

Can this approach be generalized to other situations? Pleasantly but unsurprisingly, yes — in *the vast majority of cases*, it works perfectly. For instance, a slightly more complex type:

```cpp
int (*a)[2][2];
```

This appeared in the lovely group member's examples. How do we analyze it? First, `a` must be dereferenced. The dereferenced thing can have its subscript taken twice, so it must be a pointer to a two-dimensional array! And this one:

```cpp
int* (*a[3])(int*,int)
```

What is it? In the lovely group member's explanation, it goes like this:

> `int* (*a[3])(int*, int)` — first, this is an array; the array holds pointers; these are function pointers; the parameter types are an int pointer and an int; the return value is int*.

Let's try analyzing it with our own method. First, the name is `a`. Following operator precedence, we must first fetch something from within it. The fetched thing gets dereferenced. After dereferencing, we must use the call operator to consume two things. Finally, the resulting thing must be dereferenced once more to get an integer value. Eh? It matches the lovely group member's result perfectly! Wonderful! And what's even more interesting is that I didn't use the *right-first-then-left* approach at all — I relied entirely on operator precedence to determine what the parsing order should be.

Wait, is the operator precedence really like that?

## C/C++ Operator Precedence

I can confidently say, yes, that's how the precedence works. Consulting [cppreference: C++ Operator Precedence](https://en.cppreference.com/w/cpp/language/operator_precedence), we can see the full operator precedence order. For ease of reference (and to pad the word count), let's put it here:

| Precedence | Operator | Description | Associativity |
|:----------:|:---------|:------------|:-------------:|
| 1 | `a::b` | [Scope resolution](https://en.cppreference.com/w/cpp/language/identifiers#Qualified_identifiers) | Left-to-Right → |
| 2 | `a++` `a--`<br>`type(a)` `type{a}`<br>`a()`<br>`a[]`<br>`a.b` `a->b` | [Suffix/postfix increment and decrement](https://en.cppreference.com/w/cpp/language/operator_incdec)<br>[Functional cast](https://en.cppreference.com/w/cpp/language/explicit_cast)<br>[Function call](https://en.cppreference.com/w/cpp/language/operator_other#Built-in_function_call_operator)<br>[Subscript](https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_subscript_operator)<br>[Member access](https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_member_access_operators) | Left-to-Right → |
| 3 | `++a` `--a`<br>`+a` `-a`<br>`!a` `~a`<br>`(type)a`<br>`*a`<br>`&a`<br>`sizeof`<br>`co_await`<br>`new` `new[]`<br>`delete` `delete[]` | [Prefix increment and decrement](https://en.cppreference.com/w/cpp/language/operator_incdec)<br>[Unary plus and minus](https://en.cppreference.com/w/cpp/language/operator_arithmetic#Unary_arithmetic_operators)<br>[Logical NOT and bitwise NOT](https://en.cppreference.com/w/cpp/language/operator_logical)<br>[C-style cast](https://en.cppreference.com/w/cpp/language/explicit_cast)<br>[Indirection (dereference)](https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_indirection_operator)<br>[Address-of](https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_address-of_operator)<br>[Size-of](https://en.cppreference.com/w/cpp/language/sizeof)<br>[await-expression (C++20)](https://en.cppreference.com/w/cpp/language/coroutines)<br>[Dynamic memory allocation](https://en.cppreference.com/w/cpp/language/new)<br>[Dynamic memory deallocation](https://en.cppreference.com/w/cpp/language/delete) | Right-to-Left ← |
| 4 | `a.*b` `a->*b` | [Pointer-to-member](https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_pointer-to-member_access_operators) | Left-to-Right → |
| 5 | `a * b` `a / b` `a % b` | [Multiplication, division, and remainder](https://en.cppreference.com/w/cpp/language/operator_arithmetic#Multiplicative_operators) | Left-to-Right → |
| 6 | `a + b` `a - b` | [Addition and subtraction](https://en.cppreference.com/w/cpp/language/operator_arithmetic#Additive_operators) | Left-to-Right → |
| 7 | `a << b` `a >> b` | [Bitwise left shift and right shift](https://en.cppreference.com/w/cpp/language/operator_arithmetic#Bitwise_shift_operators) | Left-to-Right → |
| 8 | `a <=> b` | [Three-way comparison operator (C++20)](https://en.cppreference.com/w/cpp/language/operator_comparison#Three-way_comparison) | Left-to-Right → |
| 9 | `a < b` `a <= b` `a > b` `a >= b` | [Relational operators](https://en.cppreference.com/w/cpp/language/operator_comparison) | Left-to-Right → |
| 10 | `a == b` `a != b` | [Equality operators](https://en.cppreference.com/w/cpp/language/operator_comparison) | Left-to-Right → |
| 11 | `a & b` | [Bitwise AND](https://en.cppreference.com/w/cpp/language/operator_arithmetic#Bitwise_logic_operators) | Left-to-Right → |
| 12 | `a ^ b` | [Bitwise XOR (exclusive or)](https://en.cppreference.com/w/cpp/language/operator_arithmetic#Bitwise_logic_operators) | Left-to-Right → |
| 13 | `a \| b` | [Bitwise OR (inclusive or)](https://en.cppreference.com/w/cpp/language/operator_arithmetic#Bitwise_logic_operators) | Left-to-Right → |
| 14 | `a && b` | [Logical AND](https://en.cppreference.com/w/cpp/language/operator_logical) | Left-to-Right → |
| 15 | `a \|\| b` | [Logical OR](https://en.cppreference.com/w/cpp/language/operator_logical) | Left-to-Right → |
| 16 | `a ? b : c`<br>`throw`<br>`co_yield`<br>`a = b`<br>`a += b` `a -= b`<br>`a *= b` `a /= b` `a %= b`<br>`a <<= b` `a >>= b`<br>`a &= b` `a ^= b` `a \|= b` | [Ternary conditional](https://en.cppreference.com/w/cpp/language/operator_other#Conditional_operator)<br>[throw operator](https://en.cppreference.com/w/cpp/language/throw)<br>[yield-expression (C++20)](https://en.cppreference.com/w/cpp/language/coroutines)<br>[Direct assignment](https://en.cppreference.com/w/cpp/language/operator_assignment#Builtin_direct_assignment)<br>[Compound assignment by sum and difference](https://en.cppreference.com/w/cpp/language/operator_assignment#Builtin_compound_assignment)<br>[Compound assignment by product, quotient, and remainder](https://en.cppreference.com/w/cpp/language/operator_assignment#Builtin_compound_assignment)<br>[Compound assignment by bitwise left shift and right shift](https://en.cppreference.com/w/cpp/language/operator_assignment#Builtin_compound_assignment)<br>[Compound assignment by bitwise AND, XOR, and OR](https://en.cppreference.com/w/cpp/language/operator_assignment#Builtin_compound_assignment) | Right-to-Left ← |
| 17 | `a, b` | [Comma operator](https://en.cppreference.com/w/cpp/language/operator_other#Built-in_comma_operator) | Left-to-Right → |


(All the links inside point to [cppreference.com](https://cppreference.com), so feel free to click on them.) Among them, the highest precedence belongs to the `::` operator for extracting content from namespaces, while the second precedence level includes the call operator and subscript operator, with the address-of and dereference operators at the next level down.

So there's no problem. In `int *a[N]`, `a` does indeed first combine with `[]` for the operation, and then is dereferenced by `*`. We can also use this same logic to explain *most* other complex types. For example, those that mix functions, arrays, and pointers nested multiple layers deep — all can be analyzed this way to produce a result.

But, what about `const`? It's not an operator — how do we account for it? And what about `&` for taking addresses? When the address-of operator appears in a variable declaration, it should be defining a C++ **reference** instead — how do we explain that with operator precedence?

So, operator precedence can't directly explain all complex types. But we can try to indirectly explain some of them.

## CV Qualifiers and References

The main problems we currently face are: `const` doesn't fit well into the system described above, and `&` is fine when used on a variable to obtain its address, but it doesn't work well when used on a variable name because that represents a reference in C++ — which also doesn't quite fit our system. However, we can patch the system a bit. Let's first discuss `const` (and `volatile`).

### CV Qualifiers

Although `const` is what we use most often, `const` and `volatile` — these two type qualifiers — frequently appear together in syntax discussions. Let's briefly introduce both of them here.

We're more familiar with `const`. Its role is to tell the compiler: the variable I've modified with `const` will not change during the program's execution. Therefore, if the code contains a modification to a `const` variable, the compiler will refuse to compile. In other words, it's a *promise* to the compiler that this variable won't change. If the code's behavior shows an attempt to change its value, then something must have been written incorrectly.

The role of `volatile` is similar, but it describes the variable from the opposite direction. When we modify a variable with `volatile`, we are essentially telling the compiler: *this variable may be subject to changes **outside** of what this code writes, so reads and writes to this variable must all be handled with care*. Let's look at an example:

```cpp
volatile bool ready = false;
while(!ready){}
```

At a glance, isn't that just an infinite loop? Correct — if *only this piece of code is running* and *no other external program interferes with this process*, it is indeed an infinite loop. If our program didn't have `volatile`, that would definitely be the case, and the compiler would very likely optimize this code into something like:

```cpp
bool ready = false;
if(ready){
    for(;;){}
}
```

That is, it would check `ready` only once. But now, with `volatile` added, the compiler cannot make that assumption. It must execute reads and writes according to the original code, meaning every iteration of the loop (even if empty) must check the state of the `ready` variable. With the `volatile` qualifier, we can let external operations change the behavior of the above code after attempting to read/write `ready`, and the modification will succeed because `volatile`-qualified variables will faithfully execute reads and writes.

We can also combine both `const` and `volatile` qualifiers into `const volatile`, telling the compiler that *this variable won't change within this code*, while the compiler must still *execute all reads and writes* to ensure it gets the latest value of the variable.

The `volatile` qualifier should be used in much the same way as `const`, and as for other qualifiers (such as `restrict`, which can only be used on object pointers), we won't mention them here.

#### CV Qualifiers and Pointers

With these two qualifiers in hand, we can parse variable declarations containing CV qualifiers as follows. For example:

```cpp
const int *p1; // pointer to constant int
int * const p2; // constant pointer, pointing to an int
int const *p3; // the same as p1
```

For the first one, we start from `p1`. It needs to be dereferenced, and the result is an `int`, which is immutable (`const`). Therefore, it's a pointer to a constant integer value.

For the second one, we again start from `p2`. The first thing we encounter is `const`, meaning `p2` itself cannot change. Then, this immutable `p2` can be dereferenced to yield an `int`. Therefore, it's a pointer that forever points to an integer variable — this pointer cannot point to anything else.

The third one? We must first dereference `p3`, and what we get is immutable. The type of this immutable object is an integer value. So it's the same as `p1`.

Now, how do we understand the following?

```cpp
const int * const * p; // pointer to a const pointer, 
                       // which again points to a const int
```

Let's analyze: first, it's a pointer, because the first step is to dereference `*p`. What we get after dereferencing must be constant; and this constant can be further dereferenced, so it's a pointer to a *constant pointer*. Finally, after layers of dereferencing, what we get is an integer value that is immutable. Thus, `p` is a pointer to a *constant pointer to an integer*.

#### CV Qualifiers with Function Calls / Array Subscripts

How do they combine with array subscript operators or function call operators? Consider this example:

```cpp
int (* const fp)(int); // const pointer to a function which returns an int
```

Let's look at it this way. `fp` first must be immutable. On the basis of being immutable, it can be dereferenced. The dereferenced result can have a function call applied to it, and the call result is an `int`. Therefore, it is a constant pointer to a *function that accepts an `int` and returns an `int`*.

Given that, let's try something even more complex:

```cpp
int (*(* const fpp)())()
```

We still start from `fpp`. First, it cannot change. Then it must be dereferenceable. Denote the dereferenced result as `x`, and we have:

```cpp
int (* x ())()
```
What is `x`? It can be called, so it must be a function. This function takes no parameters, and its return result can be dereferenced, so its return value is a pointer. The dereferenced thing can be called again, so the returned pointer points to yet another function, and the outermost function's return value is `int`.

Therefore, `fpp` in `int (*(* const fpp)())()` is a constant pointer to a function. The function this pointer points to can vary, and the function it points to must return a function pointer, while the function pointed to by that final function pointer returns an integer value.

> [!NOTE] 
> 
> From the above results, we can observe that whenever `* const` appears, it's always interpreted as "a pointer that cannot change what it points to." This is because it always represents that the thing modified by `const` is immutable, and this immutable thing can be dereferenced. Being dereferenceable means it's a pointer, and its pointee cannot change due to the `const`.

So what about arrays? It's actually quite similar. Let's directly try a complex one:

```cpp
int * const (* pap)[N];
```

We can see that `a` is a pointer, and the thing it points to can be subscripted, so it points to an array. Taking a subscript of the array yields *constant pointers*, so the array holds constant pointers. Finally, the content these constant pointers point to are integer values. With that, we've finished parsing — `a` is a pointer to an array that holds *constant pointers to integer values*.

We can even try mixing function calls and array subscripts together:

```cpp
int (*(* const afpa[2])(const int * const))[3];
```

As always, start from `afpa`. `afpa` can first be subscripted. After subscripting, we get constant pointers, so it is, first of all, an array holding two constant pointers. Next, what does each pointer in the array point to? Let's denote `(* const afpa[2])` as `y`, giving us:

```cpp
int (* y (const int * const))[3];
```

Then `y` must be a function. The return result of this function can be dereferenced, so it's a function that returns a pointer. What's in its parameter list? A constant pointer to a constant. And what does the pointer it returns point to? Let's denote the content inside `(* y (const int * const))` as `z`:

```cpp
int z[3]
```

Ah! Isn't that just an array? Or rather, *because it can be subscripted to get an integer value*, it's an array storing integer values. Now linking everything we said above in order, we get the true identity of `afpa`:

`afpa` is an array holding two constant function pointers. The functions pointed to by these constant function pointers take a constant pointer to constant as a parameter and return a pointer to an integer array.

With this, compound types involving CV qualifiers, pointer dereference, array subscripts, and function calls can be smoothly interpreted. But we still have one thing that's hard to handle: **references**, introduced in C++.

### References

C++ introduced the novelty of *references*. They are often called *aliases for variables*, and that's indeed what they are. After declaring an alias and binding it to a variable, operations on the alias are completely identical to operations on the original variable. The introduction of this feature brings us some conveniences, especially in *function parameter lists* and *class methods*.

But when declaring/defining a reference, we use the address-of operator `&`. Does this still conform to our earlier *declare it the way you use it* logic? After all, when using a reference, we don't write another `&`.

The good news is that when parsing declarations, we can still use the same system as before. However, at this point we need to understand some rules of C++. Here are some examples:

```cpp
int & ri = i; // reference to int
int * & rp = p; // reference to pointer
int & * pr; // pointer to reference, invalid

int &ar[N]; // array of reference, invalid
int (&ra)[N] = a; // reference to array

int & fr(); // function returns reference
int (& rf)() = f; // reference to function
```

Let's parse these examples one by one.

The first one is obvious — a reference to the variable `i`. This is the most common example used when introducing references. Here, operations on `ri` are *equivalent to* operations on `i`. The second is a bit more complex, but we still consider it using operator precedence: `&` binds with `rp` earlier than `*`, so `&rp` defines a reference. The referenced value can be dereferenced to get an integer value, so the referenced thing is a pointer to an integer.

The third one is interesting. According to operator precedence, first `pr` is a pointer, and what it points to is a reference, and the referenced thing is an integer value. So `pr` is a pointer to a reference to an integer value. However, this is not allowed in C++. The reason is simple: a reference *does not create a new value* — it really is just an alias, and it cannot independently occupy memory space. But a pointer stores the memory address of a variable, hence the form `int & * pr` is invalid.

The fourth case is similar to the third. Parsing it using the earlier method yields that `ar` is an array holding references. But arrays also need to store values with concrete content in memory space, so this form is also invalid.

However, if you write it as in the fifth case, it reads as *a reference to an array* — you first reference the corresponding variable, then compute the subscript to get an integer value. So what's being referenced is an array — this is a reference to an array. And this is perfectly OK.

The sixth and seventh cases are both valid. First, the sixth says that function `fr` returns a reference. This is allowed: as long as the returned thing actually "exists" somewhere. And the last one is again obvious — it's a reference to a function. Both are allowed.

Using the examples above, we can create even more complex types. For instance:

```cpp
int (&(*pfr)())[5];
```

We still start from `pfr`. It's a pointer. It first combines with the call operator on the right, indicating it points to a function. What's the return value of the function? Let's first write the function part as `x`, giving us:

```cpp
int (& x) [5]
```

So, we first need to reference the result returned by the function, and then take a subscript to get an integer value. Therefore, the function pointed to by the function pointer returns a reference to an integer array. So this line actually defines a function pointer.

With this, the parsing of the five great masters — `*`, `&`, `[]`, `()`, `const` — in combination with variable names should be fully resolved.

## The Type System — Is It Really Like This?

It seems we've found a one-size-fits-all dragon-slaying treasure blade, but here comes another question: is the C/C++ type system really like this? Is the "rule" we've described above truly a design principle of C/C++? Is parsing variable/function declarations this way guaranteed to be correct?

The good news is that, for most cases we'll encounter, this *rule* — or better put, this *mental model* — applies. And indeed, when designing the C/C++ type system, this part is genuinely based on the principle of *declare it the way you use it*. For the relatively **ordinary** cases discussed above, this analytical method is largely problem-free.

The bad news, however, is that the C/C++ type system is simply too complex. We've only used a handful of *type constructors* and CV qualifiers here, which belong to the category of **simple declarations**. In reality, according to [cppreference.com — Declarations](https://en.cppreference.com/w/cpp/language/declarations.html), the declaration system also includes function definitions, template declarations/implementations/specializations, namespace definitions, attribute declarations, and much more. Within simple declarations alone, there are a total of 10 ways to make declarations, none of which we mentioned. Our discussion didn't touch on attributes that can appear in declarations, initialization, more qualifiers, and other elements. We even limited ourselves to the innocuous `int` as our base type, never venturing into more complex types — especially user-defined types.

That's right — our discussion completely set aside enums, unions, structs, and classes. In fact, they are also part of the declaration system, or rather part of the type system. Even within the content we did discuss, there are details we didn't cover, such as `&&`, the rvalue reference declaration — I'm not familiar enough with rvalue references yet, so I won't spout nonsense.

But I don't think this is a problem. Our discussion is still meaningful. Perhaps what we've explored here has successfully caught a glimpse of some design ideas conceived for the type system when the language was first designed. And it will also help avoid being completely lost the next time we encounter strange compound types.

## Afterword

I have to say, I really didn't expect to end up writing this much at the start, and even less expected that after writing so much, I still couldn't seem to exhaust even one percent of the C/C++ type system. After checking a mountain of cppreference documentation, my head feels swollen and my vision blurred, but seeing that I can now analyze all sorts of ugly monster types gives me a bit of a sense of accomplishment.

A huge thanks here to the lovely group member [@0xa793908](https://mahiro.ink/) for their notes — without seeing that blog post, I would certainly never have stumbled upon such an interesting problem, nor (perhaps) delved this deeply into it.

I also can't help but marvel at the power of AI... Many of the examples I used were generated by AI first, after which I tried to analyze and understand them, eventually arriving at this set of parsing methods. Although it can be tiring at times — AI can be quite rigid (and occasionally hallucinates) — using AI to learn new things is definitely a very promising approach to learning.

Thank you for reading all the way to the end. Making it through such a long-winded piece is already quite impressive. I hope what I've written here can help you parse those strange types you encounter, and maybe even earn you a few extra points on "Tan Haoqiang"-style exams, haha. Well then, as always, I wish you good health, smooth work, and happiness every day~
