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
title: C/C++ 的类型系统小记
description: 如何阅读 C/C++ 的复杂类型？
date: 2026-01-15T19:35:50+08:00
image: Science.png
math: true
hidden: false
comments: true
draft: true
---

*从[可爱群友 @0xa7973908](https://mahiro.ink/)的[博客](https://mahiro.ink/archives/homework)里了解到了数组指针和指针数组的类型区别，但是这种单纯的记号真的很难背，背后的逻辑究竟是什么样的呢？探究一下吧~*

*本期的头图是从歌曲的 MV 中截下来的，是 [MIMI](https://x.com/mimi_3mi) 的 [サイエンス](https://www.bilibili.com/video/BV1nkB7YQE1z/ "B站链接") (Science，科学)，非常好听，很适合科研狗（）绘制 MV 的是 [3774.](https://x.com/bokarokaku) 太太，可爱铁头……*

{{< music auto="https://music.163.com/#/song?id=2656567752" loop="none">}} 

## 指针数组？数组指针？

可爱群友的博客里写了这样一些内容：

> `int* a[2]` 是一个存放指针的数组。
> 
> `int (*a)[2]` 是指向数组的指针。注意，`a` 指向的是数组整体。
> 
> 同理，`int (*a)[2][2]` 指向的是 [2][2] 这个整体。
> 
> `int (**a)[2][2]` 中 `*a` 指向 [2][2] 这个整体，而 `a` 指向 `*a` 。
> 
> 对于函数指针，我们可以用先右后左的思路看。
> 
> `int* (*a[3])(int*, int)` 首先这是一个数组；数组里面放的是指针；这是函数指针；参数类型是一个 int 指针和一个 int；返回值是 int*。

Bravo! 总结地很到位，而且像这样 *先右后左* 的思路其实很多文章、教材等都是推荐的。然而，有这么一个问题：HYW（WHY）？为什么这个程序的设计者要这么设计 C/C++ 的类型系统？C/C++ 不是前置类型系统吗？怎么一会儿右看一会儿左看的，真麻烦……特别是数组指针和指针数组，怎么一个括号就让一组指针变成了一个指向数组的指针了？

不过，bro 突然想到一个骚操作，可以完美地记住这两种情况，自此妈妈再也不用担心我分不清这两个东西了：

## 帮 C/C++ 类型现代化

既然 C/C++ 不是彻底类型前置，那我们就让前置更加彻底！在下面这一部分，我们会*忽略掉数组的大小*，毕竟我们更关心的是数组本身而不是它的全部信息。

首先，我们有：

```cpp
int *a_of_p []; // an array contains several pointers, the array is *a_of_p*
int (*p_to_a) []; // a pointer to an array *p_to_a*
```

既然我们说 C/C++ 前置不彻底，也就是不完全遵循 `type name variable_name = value` 的模式，那我们就直接把变量名挪到后面吧：

```cpp
int *[] a_of_p;
int [] (*p_to_a);
```

这里我们把括号的内容整体挪到后面，因为，嘛，括号嘛，我们都明白括号是怎么回事，处理带括号的东西的时候最好把括号整体做个操作。然后我们考虑把后一个的括号去掉，就得到了：

```cpp
int *[] a_of_p;
int []* p_to_a;
```

诶？这步是不是有点感觉了？那么接下来这一步会让你的感觉更明确一些！不过在引入这一步之前，我们先来介绍一个语法糖：在 C/C++ 中，我们可以把数组下标和数组名交换顺序：

```cpp
array[2] == 2[array]; // true
```

HYW？我们揣测一下，在编译器里其实它们都会被加工为 `array` 代表的头指针偏移一个量：

```cpp
*(array+2) == *(2+array); //true
```

加法是交换的嘛，所以这两种写法编译器都认。其实吧编译器也许还有一些别的处理来让这个语法糖真正成立，毕竟在合适的抽象下，地址不应该等同于一个整数，而是一个特殊的对象。不过这么理解这个语法糖也许也没啥问题。

那么？我们要对上面的类型做的事就很明显了。我们要把方括号前面的东西放进去：

```cpp
[int*] a_of_p;
[int]* p_to_a;
```

这么一来，经过我们彻底的 *现代化* 改造，我们让第一个变量声明从语义上就明确地是一个装有指针的数组 `a_of_p`，而第二个也很明确地是有一个数组，然后让 `p_to_a` 指向这个数组成为一个指针。

不过……这个做法说实在的，没有特别大的道理。把 `(*p_to_a)` 整体挪到后面之后还能去掉括号，这个操作虽然很符合直觉，但是真没啥道理，而且最后用 *语法糖* 去类比类型系统，感觉也怪怪的。用来助记倒也是足够了。

可是 C/C++ 的发明人们就没有什么说法吗？就这么随便地决定了吗？这不对吧？！？

## 问问 AI？

这都啥年代了，为什么不问问神奇的 AI 呢？我得到的答案是：C/C++ 是 *不完全遵循* 前置类型的规则的，类型不是只由变量名前面的内容决定，而是还得用后面的 *declarator* 去一同决定的。也就是说，`*`，`[]`，`()` 等等这些 *declarator* 也是参与到变量定义中的。

等一下，`()` 也是？可是这不是在定义函数吗？AI 还说，C 允许在一个类型说明符后面定义很多个东西：

```cpp
int *p, a[10], (*f)(void);
```

第一个是指向整型的指针，第二个是整型数组，而第三个是指向返回整型值的函数指针。再等一下，好像函数定义好之后，我们使用函数的过程……

于是我让 AI 又简单列了几个复合变量类型，发现了神奇的规律：

## 怎么用，就怎么声明！

其实我想到了初学 C/C++ 指针的时候就有的一个小疑问：我们声明指针的时候是要用 `int *p;`，但是在给这个指针赋值/初始化的时候我们需要的是 `int *p = &a` 的写法，而 `&` 是取地址的写法，但是用指针的时候，要想得到 `a` 的值就又必须用 `*p`，而 `p` 这个变量存的是 `a` 的地址。

上面扯这些废话，意在指出：我们在声明 `int *p` 的时候，变量确实是 `p`，但是用它的时候貌似总是要 `*p` 才能取到整型值。这样的例子有很多：`int a[10]` 的意思是一个长为 `10` 的数组，但 `a` 直接去用是不太行的，我们取数组中的内容的时候总是要 `a[2]` 这样；如果把函数也考虑进来，就更有趣了：当我们声明一个函数 `int f()` 的之后，我们在使用这个函数时，总是要 `f()` 来调用它，单纯的 `f` 是不行的。

你有注意到些什么吗？我们 **如何声明一个变量**，后续就会 **这样使用它**。更确切地说，如果 **用声明的方式用这个变量**，就会 **得到类型说明符这个类型的值**。我们来做个实验，还是用上面的两个例子：

```cpp
int *a_of_p [N]; // an array contains several pointers, the array is *a_of_p*
int (*p_to_a) [N]; // a pointer to an array *p_to_a*
```

这两个声明要怎么去看呢？如果按照 *后面怎么用这个变量得到对应类型的值* 的说法来解释这两个值，那么第一个似乎就是：我们要先从 `a_of_p` 的某个位置取个东西（作用上 `[]`），然后用 *解引用* 算符 `*` 来作用在取出来的东西上，就会得到一个整型值。这么来看，取出来的东西肯定是一个地址（因为可以被解引用），而 “取” 这个动作就说明了第一层包装的是一个数组。最后我们得到结论：它是一个指针数组，一个装了很多指针的数组。

那么第二个呢？有了括号的存在，我们必须改变算符优先级，也就是说我们得先对 `p_to_a` 解引用，解引用后得到的东西是可以用下标算符来取个东西出来的，取出来的是一个整型值。所以我们第一步是在解引用，解引用出来的东西是数组，因此 `p_to_a` 是一个指向数组的数组指针。

这样的做法能推广到别的情况吗？令人惊喜但不惊讶的是，没错，在 *绝大部分情况下*，都是完全没问题的。比如一个稍微更复杂的类型：

```cpp
int (*a)[2][2];
```

出现在可爱群友给的例子中，它要怎么分析呢？首先，`a` 要先被解引用，解引用出来的东西可以取两次下标，因此它一定是一个指向二维数组的指针！而这个：

```cpp
int* (*a[3])(int*,int)
```

是什么呢？在可爱群友的解释中，是这样的：

> `int* (*a[3])(int*, int)` 首先这是一个数组；数组里面放的是指针；这是函数指针；参数类型是一个int指针和一个int；返回值是int*。

我们尝试用自己的方法来分析一下这个东西。首先，这个名字是 `a`，按照算符优先级，我们得先从里面取个东西出来，取出来的东西得解引用，解完引用之后得用调用算符吃掉两个什么东西，最后得到的玩意儿还得再解一次引用才能得到一个整型值。诶？和可爱群友的结果正好合上了！真不错！而且更有趣的一点是，我没有用 *先右后左* 这样的思路，而是完全依靠算符优先级来确定这个解析顺序应该是什么样的。

等一下，算符优先级真的是这样吗？

## C/C++ 算符优先级

我可以拍着胸脯说，没错，优先级是这样的。查阅 [cppreference: C++ Operator Precedence](https://en.cppreference.com/w/cpp/language/operator_precedence.html)，可以看到算符的全部优先级顺序。为方便查阅（也为了水字数），我们把它放过来：

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


(里面的链接都会链到 [cppreference.com](https://cppreference.com) 上，请放心点开。) 其中，最高优先级的是从命名空间中取内容的 `::` 算符，而第二优先级的就是调用运算和下标运算了，取地址和解引用运算则在下一级。

那就没问题了。 `int *a[N]` 中，`a` 的确更先与 `[]` 相结合进行运算，而后由 `*` 解引用。我们还可以用这套逻辑来解释别的 *大多数* 复杂类型。比如把函数，数组和指针等混合在一起套好几层的那种，都可以这样分析出来结果。

但是，`const` 呢？它不是运算符才对，这要怎么考虑？另外，`&` 取地址又要如何考虑？当取地址出现在变量声明里的时候，应该是在定义 C++ 的 **引用** 才对，这要怎么用算符优先级来解释？

所以，算符优先级不能直接解释所有的复杂类型。
