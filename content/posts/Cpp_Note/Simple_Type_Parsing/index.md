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
title: 如何解析 C/C++（比较）复杂的类型？
description: 读可爱群友博客有感，然后被干碎……
date: 2026-01-15T19:35:50+08:00
image: Science.png
math: true
hidden: false
comments: true
draft: true
---

*从可爱群友 [@0xa7973908](https://mahiro.ink/)的[博客](https://mahiro.ink/archives/homework)里了解到了数组指针和指针数组的类型区别，但是这种单纯的记号真的很难背，背后的逻辑究竟是什么样的呢？探究一下吧~*

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

这都啥年代了，为什么不问问神奇的 AI 呢？我得到的答案是：C/C++ 是 *不完全遵循* 前置类型的规则的，类型不是只由变量名前面的内容决定，而是还得用后面的 *declarator* 去一同决定的。也就是说，`*`，`[]`，`()` 等等这些东西也是参与到变量定义中的。

等一下，`()` 也是？可是这不是在定义函数吗？AI 还说，C 允许在一个类型名称后面定义很多个东西：

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

所以，算符优先级不能直接解释所有的复杂类型。不过我们可以尝试间接解释一些复杂类型。

## CV 限定与引用 

我们目前遇到的主要问题是，`const` 在之前的这套系统里不太合适，另外就是 `&` 在用给变量的时候是 OK 的，用来取得变量的地址，但用在变量名上的时候却不太行，因为这在 C++ 里代表的是引用，这个和我们的系统也不太相容。不过我们可以对这套系统打点补丁。我们先来讨论 `const`（以及 `volatile`）吧。

### CV 限定符

虽然我们最常用的其实是 `const`，但是 `const` 和 `volatile` 这两个类型限定符经常一同出现在语法讨论里。我们这里简单介绍一下这两个东西。

`const` 我们会更熟悉一些，它的作用是告诉编译器，我用 `const` 修饰了的变量在程序运行期间是不会变的。因此如果代码中出现了对 `const` 变量的更改，编译器会拒绝编译。也就是说，这是对编译器的一种 *承诺*，承诺这个变量不会改变，如果代码行为上出现了改变它的值的行为，则一定是写错了。

而 `volatile` 的作用也很类似，不过是从另一个方向来描述这个变量。当我们用 `volatile` 对一个变量修饰之后，我们相当于告诉编译器，*这个变量可能会受到这份代码写出的内容**之外**的改动，因此针对这个变量的读写都得小心*。我们举个例子，

```cpp
volatile bool ready = false;
while(!ready){}
```

这段代码一眼看过去，那不就是死循环了吗？没错，如果 *只有这段代码运行*，且 *没有别的外部程序干扰这个进程* 的时候，的确是一个死循环；如果我们的程序没有加 `volatile`，那么就一定是这么个情况，编译器很有可能会把这个代码优化为这样的东西：

```cpp
bool ready = false;
if(ready){
    for(;;){}
}
```

也就是只检查一次 `ready`。但是，现在我们加了 `volatile`，编译器就不能这么考虑了。它必须按照原代码的形式执行读写操作，即每个循环（即便是空的）都要检查 `ready` 这个变量的情况。有了 `volatile` 限定符，我们就可以让外部操作在尝试读/写 `ready` 后改变上述代码的行为，而且会成功修改，因为 `volatile` 修饰的变量一定会老实执行读写。

我们还可以把 `const` 和 `volatile` 两个限定符结合起来，成为 `const volatile`，告诉编译器这个变量 *在这份代码里不会变*，而编译器依旧要 *执行所有的读写操作*，保证获取最新的变量值。

`volatile` 限定符和 `const` 用法应该差不多，而关于别的限定符（比如只能用给对象指针的 `restrict`）我们这里就不提了。

#### CV 限定符与指针

有了这两个限定符，我们可以这样解析含有 CV 限定符的变量声明。比如：

```cpp
const int *p1; // pointer to constant int
int * const p2; // constant pointer, pointing to an int
int const *p3; // the same as p1
```

第一个我们从 `p1` 开始，它需要作用上解引用，得到的结果是一个 `int`，而这个 `int` 则是不可变的 （`const`），因此它是一个指向常整型值的指针；

第二个我们依旧从 `p2` 开始，首先碰到的是 `const`，则说明 `p2` 本身不能变，然后对这个不能变的 `p2` 我们可以解引用得到一个 `int`，因此它是一个永远指向一个整型变量的指针，这个指针不能指向别的东西。

第三个呢？我们必须先解引用 `p3`，然后得到的东西它是不可变的，不可变对象的类型是一个整型值。因此它和 `p1` 是一样的。

那么，怎么理解下面这个？

```cpp
const int * const * p; // pointer to a const poionter, 
                       // which again points to a const int
```

我们来分析：首先，它是一个指针，因为第一步得 `*p` 解引用；解引用之后得到的东西必须是常量；而这个常量又可以被进一步解引用，所以它是一个 *指向常指针* 的一个指针；最后，在层层解引用之后，我们得到的东西是一个整型值，这个整型值是不可变的。如此，`p` 是一个 *指向整型常指针* 的指针。

#### CV 限定符与函数调用/数组下标

它和数组下标算符或者函数调用算符如何组合呢？比如这个例子：

```cpp
int (* const fp)(int); // const pointer to a function which returns an int
```

我们这么来看。`fp` 首先必须是不可变的，在不可变的基础上它是可以被解引用的，解引用之后的结果可以有函数调用，调用结果是一个 `int`。因此，它是指向恒定的一个 *接受 `int` 后返回 `int` 的函数* 的 *指针*。

既然如此，我们再试试更复杂的：

```cpp
int (*(* const fpp)())()
```

我们还是从 `fpp` 出发。首先它不能变，然后它得能被解引用。解引用得到的结果我们记作 `x`，就有：

```cpp
int (* x ())()
```
`x` 是什么呢？它能被调用，必须是一个函数。这个函数什么参数都不用，返回的结果能被解引用，因此它的返回值是一个指针。解引用得到的东西又能被再调用，因此返回的指针指向的又是一个函数，而最外层的函数返回的值则为 `int`。

因此，`int (*(* const fpp)())()` 里的 `fpp`，是恒指向一个函数的指针，这个函数指针指向可变，指向的函数要返回一个函数指针，而最后的这个函数指针指向的函数返回的是是一个整型值。

> [!NOTE] 
> 
> 从上面的结果，我们可以观察到，每当有 `* const` 的时候，总得被解释为 “指向不变的指针”。因为它总代表着，`const` 修饰的东西是不变的，而这个不变的东西可以被解引用，能被解引用代表是一个指针，而指向因为 `const` 的原因而不能变化指向。

那么，数组又如何呢？其实也差不多，我们直接试一个复杂的：

```cpp
int * const (* pap)[N];
```

我们可以看到，`a` 是一个指针，指向的东西可以取下标，因此它指向数组，数组取下标得到的东西是 *常指针*，因此数组里装着的是常指针们，最后这些常指针指向的内容是整型值。自此我们解析完毕，`a` 是一个指向 *装有指向整型值的常指针* 的数组的指针。

我们甚至可以尝试将函数调用和数组下标二者混合起来：

```cpp
int (*(* const afpa[2])(const int * const))[3];
```

还是依旧从 `afpa` 开始。`afpa` 首先可以取下标，取完下标得到的是常指针，因此它首先是装有两个常指针的数组。接下来，数组中的每个指针指向谁？我们记 `(* const afpa[2])` 为 `y`，则有：

```cpp
int (* y (const int * const))[3];
```

那么 `y` 必须是一个函数，这个函数的返回结果可以被解引用，因此是一个返回指针的函数。这个函数的参数列表有什么呢？是一个指向常量的常指针。而它的返回的指针指向谁呢？我们记这个括号内 `(* y (const int * const))` 的内容为 `z`，则有：

```cpp
int z[3]
```

啊！这不就是一个数组吗？或者说，*因为能取下标得到整型值*，所以是存储了整型值的数组。现在我们把上面说的依次链接起来，就得到了 `afpa` 的真身：

`afpa` 是一个装有两个常函数指针的数组，常函数指针指向的函数取常量常指针为参数，返回指向整型数组的指针。

这样一来，有 CV 限定符、指针解引用、数组下标、函数调用的复合类型就能被顺利解读了。不过我们还剩下一个不好处理的东西：C++ 中引入的 **引用**。

### 引用

C++ 中引入了 *引用* 这么个新鲜东西。它常被称为 *变量的别名*，实际上也的确如此。在声明别名并绑定变量之后，我们对别名的操作和我们对原变量的操作是完全一样的。这个东西的引入带给我们一些便利，特别是在 *函数参数列表* 与 *类方法* 中。

可是，声明/定义引用时我们用的是取地址的算符 `&`，这还能符合我们之前的 *怎么用就怎么声明* 的逻辑吗？我们在使用引用的时候可不会再写一个 `&` 才对呀。

好消息是，我们在解析声明内容时，依旧可以采用前面的那套系统。不过此时我们需要对 C++ 的一些规则有所了解。下面有一些例子：

```cpp
int & ri = i; // reference to int
int * & rp = p; // reference to pointer
int & * pr; // pointer to reference, invalid

int &ar[N]; // array of reference, invalid
int (&ra)[N] = a; // reference to array

int & fr(); // function return reference
int (& rf)() = f; // reference to function
```

我们来逐个解析这些例子。

第一个很明显，是变量 `i` 的一个引用，也是介绍引用时最常用的例子。此时我们对 `ri` 的操作就 *等同于* 对 `i` 的操作；第二个则复杂一些，不过我们依旧使用算符优先级来考虑，则 `&` 比 `*` 更早与 `rp` 结合，因此 `&rp` 定义了一个引用，引用的值可以被解引用得到整型值，因此引用的东西是一个指向整型的指针。

而第三个就有趣了。根据算符优先级，首先 `pr` 是一个指针，指向的东西是一个引用，引用的东西则是一个整型值。因此 `pr` 是一个指向整型值引用的指针。然而这在 C++ 中是不被允许的。原因很简单：引用 *不创造新的值*，它真的就是别名而已，不能单独占用内存空间。而指针存储的正是变量的内存空间，因此 `int & * pr` 的写法是不合规的。

第四个案例和第三个差不多，按照之前的解析方法得到的结果是说 `ar` 是一个装有引用的数组，而数组也是要存储有具体内容的值的内存空间，因此这个写法也是不合规的。

不过，要是写成了第五个案例的形式，读起来就是 *一个数组的引用*，要先引用到对应变量上，再计算下标得到整型值，因此被引用的是一个数组，这是一个数组的引用。而这是完全 OK 的。

第六、七个案例则都是合规的。首先第六个是说函数 `fr` 返回值是一个引用。这是允许的：只要返回的东西确有其“人” 就行。而最后一个则又很明显了，是一个函数的引用。二者都是允许的。

根据上面的例子，我们又可以创造很复杂的类型了。比如这个：

```cpp
int (&(*pfr)())[5];
```

我们依旧从 `pfr` 出发，它是一个指针，先和右边调用算符结合，说明指向的是一个函数。函数的返回值是什么呢？我们先把函数部分写成 `x`，就得到了：

```cpp
int (& x) [5]
```

所以，我们要先对函数返回的结果引用回去，然后再取下标得到一个整型值。因此函数指针指向的函数会返回对整型数组的引用。所以实际上这一行我们定义了一个函数指针。

自此，`*`，`&`，`[]`，`()`，`const` 这五大天王与变量名的排列组合解析应该是被我们完全解决了。

## 类型系统，果真如此？

我们好像是找到了一个百试百灵的屠龙宝刀，不过问题又来了：C/C++ 的类型系统，果真是这样的吗？上面的这个 “规则”，真的是 C/C++ 的设计原则吗？这么去解析变量/函数声明，真的一定没问题吗？

好消息是，大部分我们能遇到的，这么个 *规则*，或者更好的说法，*思想模型*，都是适用的，而且的确 C/C++ 的类型系统设计时，这部分内容的确是 *怎么用就怎么声明*。像上面比较 **普通** 的情况，这套分析方法都是没啥大问题的。

可是坏消息是，C/C++ 的类型系统实在是太复杂了。我们这只是用了一些些的 *type constructor* 和 CV 限定符 (cv qualifier) 而已，属于 **简单声明**。实际上，声明系统根据 [cppreference.com-Declarations](https://en.cppreference.com/w/cpp/language/declarations.html) 的结果来看，还包含函数定义、模板声明/实现/特化、命名空间定义、属性声明等等更多的东西，而简单声明里一共是有 10 种方式去做声明，我们一点没提；我们的讨论中没有涉及声明中会出现的属性（Attribute），初始化（Initialize），更多的限定符（Qualifier）等等要素；甚至就连基础类型我们都只敢用人畜无害的 `int`，没有涉及更复杂的类型，特别是自定义类型。

没错，我们的讨论还完全抛开了枚举、联合体、结构体和类。实际上，它们也属于声明系统的一部分，或者说类型系统的一部分。即便是在讨论过的内容里，我们还有没涉及到的细节，比如所谓的 `&&`，右值引用声明，因为我还不够了解什么是右值引用，就不瞎讲了。

不过我并不觉得这有什么问题，我们的讨论依旧是有意义的。也许这里的讨论成功窥探到了一些语言设计之初所构想的类型系统设计思路，而且也能方便以后遇到奇怪的复合类型时不会两眼一抹黑。

## 后记

不得不说，一开始真的没有想到能写这么多，更是没有想到即便写了这么多，也似乎没能穷尽 C/C++ 类型系统的百分之一。在查阅大量的 cppreference 文档之后，我只感觉脑袋发胀，目光呆滞，但是看着自己能分析出来各种丑八怪类型，多少还是有点成就感的。

这里要非常感谢可爱群友 [@0xa793908](https://mahiro.ink/) 的笔记，没有看到那个笔记内容的话，我是肯定不会想到这么个有趣的问题，并且（也许是）深入到这里的吧。

另外不得不感慨的是 AI 的强大……我的很多例子都是让 AI 举出来之后，我再尝试分析理解，最后得到这么一套解析方法的。虽然说有时候很累，AI 算是比较认死理（偶尔又会出幻觉）的，但是用 AI 去学新东西一定是一个很有前景的学习方法。

感谢您能看到这里，这么啰嗦的一大篇能看下来也是很强大了。希望我写的这些东西能帮你解析遇到的奇怪类型，在 “谭浩强” 型考试中能多拿一点分数，哈哈。那么最后，一如既往地，祝您身心健康，工作顺利，天天开心~