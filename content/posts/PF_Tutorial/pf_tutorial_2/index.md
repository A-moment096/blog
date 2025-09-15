---
categories:
- Phase Field
- Mathematics
- Programming
tags:
- Tutorial
- Phase Field
- Numerical Analysis
- Python
title: "Phase Field: 相场模拟学习笔记 II"
description: 记录相场方法的学习内容
image: "/posts/PF_Tutorial/Skadi.png"
date: 2024-11-22
math: true
links:
  - title: PF_Tutorial_2 数值方法的Python实现
    description: 放在B站的讲课录播
    website: https://www.bilibili.com/video/BV16jDVYTEbY
  - title: Github 上的讲义仓库
    description: 放在 Github 上的讲义, 包含课件和用到的资料
    website: https://github.com/A-moment096/Phase-Field-Tutorial/tree/main/PF_T2-Numerical_Method_and_Python
---

*接上一节内容, 这节会简单介绍 Python 的一些语法知识, 以及尝试使用 Python 实现上节所列出来的部分算法.*

## Python 初探索

### 简介

Python 是一种蟒蛇, 而在编程语境下, Python 则是一门十分受欢迎的编程语言. Python 具有语法友好 (接近英语), 功能强大 (感谢开源与社区), 社区活跃等优秀的特点, 让 Python 成为入门编程的一个好选择. 

为什么选择 Python 来实现上节内容提到的算法呢? 主要原因有二: 一是 Python 的语法实在是太友好, 对于没有学习过或者对编程不甚了解的同学而言, 先尝试 Python 的话不容易因为语言的问题劝退. 相比于直接介绍下一节要讲的 C++, 先用 Python 熟悉一些编程中常见的概念也是有好处的. 其二可能是出于我个人的私心吧, 因为 Python 真的太好用了, 我个人而言希望能稍微做一些推广. 作为一门好用的工具语言, 它在很多情况下都可以帮助完成一些琐碎的工作. 特别是如画图, 我很喜欢用 Python 绘制函数图像之类, 非常好用.

总之, 这里选择使用 Python 来作为程序的入门. 相信在通过 Python 了解一定的编程基础之后, 再去了解别的语言也不会显得那么吃力了 (比如, C++).

### 解释器安装与环境配置

#### Python 解释器
Python 的运行是需要其解释器的. 目前最新版的 Python 解释器可以直接在 [Python 官网](https://www.python.org/downloads/) 下载. Linux 平台用户可以考虑使用各自发行版的包管理器实现 Python 的安装. 安装时请切记选择 **ADD TO PATH**, 否则可能需要手动调整环境变量以让 Shell 能找到 Python.

**解释器**是什么? 简单来说, 就是*逐行*把写的脚本翻译为机器所能理解的代码指令, 然后执行. 所以 Python 是逐行运行的, 这点非常适合 Debug, 也许也是 Python 受人欢迎的原因之一. 与**解释器**相对的一个概念是**编译器**. 这里所指的编译器应该是狭义上的编译器, 广义上的编译器应该也包含 Python 这类的解释器. 编译器不会逐行解释代码, 而是将代码作为一个整体, 然后处理翻译, 最后形成机器能阅读并执行的内容后进行执行. 这种方式让编译器可以为代码做出很多的优化, 但是也一定程度上牺牲了 "逐行运行" 的便利. C/C++, Rust 等语言都是需要编译器进行编译的. 为了弥补无法原生逐行运行的缺陷, 这些语言使用了调试器 (Debugger) 以及调试符号 (Debug Symbol) 等技术来在编译完成后, 根据符号表一一对照并运行代码, 呈现出逐行运行的效果. 然而这种方法依旧会损失一定的运行性能.

Python 解释器拥有多个版本, 每个版本对语言的语法都有一定的调整. 有些调整影响巨大 (比如从 Python2 到 Python3 的转变), 另一些可能因为其语法特性不常用, 不会直接影响到用户体验. Python 解释器也不一定是最新版就最好, 需要考虑项目的适配以及对应包的版本需求. 不过在这里我们并不太依赖 Python 解释器的版本, 只要保证是比较新的 Python 解释器版本, 并且主流的科学计算库, 如 `numpy`, `matplotlib`, `scipy` 等即可.

#### 编辑器 与 Visual Studio Code
在安装好 Python 解释器之后其实就已经可以开始 Python 编程了 (没错, 就是传说中的记事本编程). 然而这当然不是最好的方法, 这种方法光是考虑到没有代码高亮就让人很难以接受了. 这里我个人推荐 Visual Studio Code (以下简称 VSC). 

VSC 功能强大, [安装](https://code.visualstudio.com/)方便, 插件生态极其丰富, 通过合理的配置近乎可以达到 IDE (Integrated Development Environment, 集成开发环境) 的水平. 我个人在写简单的 Python 脚本时几乎都是使用 VSC 写的. 一路默认安装后, 根据需要安装中文插件, 然后再在插件页面搜索 Python 即可安装 Python 插件全家桶, 然后就可以开始使用 VSC 写 Python 代码 (脚本)了. VSC 的安装与环境配置也可以参考我之前写的[博客文章]({{<ref "/posts/Tools_Note/VSC_Py/index.md">}}).

这里没有推荐 IDE, 因为 IDE 对这里仅仅使用 Python 做一些简单应用而言太过 "全能", 或者说, 负担太重. 当然, 如果感兴趣, 可以考虑使用大名鼎鼎的 PyCharm. 这里不再赘述.

#### 虚拟环境, venv 和 pip 
这里简单介绍一下虚拟环境. 因为 Python 的生态丰富, 可能会碰到某些依赖相互冲突的情况, 尤其是在多人共同开发的情况下, 每个人的开发环境配置不同, 很容易导致依赖冲突. 为解决这种情况, 可以考虑使用 Python 的虚拟环境 `virtualenv`. 创建的虚拟环境下有该虚拟环境所自有的一些包, 并且和该虚拟环境以外的部分是相互独立的. 使用 VSC 创建 `virtualenv` 虚拟环境非常简单, 只需要 `Ctrl+Shift+P` 打开 VSC 的命令, 然后搜索 `Python: Create Environment` 即可根据向导一步步搭建虚拟环境.

搭建好的虚拟环境会存放在 `.venv` 的文件夹中. 这里面将会包含所有该虚拟环境的内容, 包括在该虚拟环境下安装的各种包. 如果不想再使用该虚拟环境, 只需要删除该文件夹即可. VSC 会自动检测是否存在虚拟环境, 并且自动切换到虚拟环境下. 如果您使用 Shell, 可以手动在命令行中运行 `.venv` 文件夹内的 `acitvate` 脚本 (Windows 在子文件夹 `Scripts` 中, Linux 则一般在 `bin` 子文件夹中), 即可启动该虚拟环境.

在搭建好虚拟环境 (或者不使用虚拟环境) 之后, 需要从网上下载需要的包来帮助 Python 脚本的运行, 实现各种功能. 这时就需要用到*包管理器*. Python 默认的包管理器为 `pip`, 使用 `pip` 安装或者更新包都十分简单, 以安装 `matplotlib` 举例, 输入命令 `pip install matplotlib` 即可. 要更新包, 则使用 `pip install --upgrade matplotlib` 就可以. 如果有一份使用 `pip freeze` 所生成的软件包列表 (一般该列表文件名为 `requirements.txt`), 则可以使用命令 `pip install -r requirements.txt` 即可根据该列表中的内容进行安装.

### Python 语法基础

上面的废话可能有点多了, 下面就介绍 Python 最主要的语法点, 作为使用 Python 的基础, 同时提出一些编程语言中所拥有的共性:

#### 类型

虽然 Python 是一门动态类型的语言, 数据在 Python 中是根据上下文做出类型判断的, 然而这里还是简单介绍一下 Python 中常用的变量类型. 其中最常用的就是一些基础类型, 如 `int`, `float`, `str`, `bool` 等, 它们分别代表*整数*, *浮点数*, *字符串*, *布尔值*. 这些类型是 Python 所天然支持的, 也是一般语言中常常原生支持的类型. 除了这些基础类型外, 还有很多的组合类型, 如 `List` (列表), `Dict` (字典), `Tuple` (元组) 等等.  这些类型通常是由一些基础类型所产生, 比如列表, 就是由不同类型的内容组合在一起形成的类似于容器的数据结构. 

Python 中的类型通常其本身也是一个*类* (`class`), 意味着它们也有一些成员函数可以进行操作. 这里就不详细叙述了.

此外, 尽管 Python 是动态类型语言, 其依旧支持对类型的标注. Python 采取后置类型标记方法, 在变量的后面添加 `:` 然后跟上对应的类型名即可标注其类型. 值得注意的是, 尽管有了类型标注, 这个标注更应该作为仅对程序开发者或使用者的提示, 这里标注的任何类型*都没有任何的约束力*.

#### 变量声明

Python 的变量声明非常简单, 只需要遵循 `name = value` 的规则即可声明并初始化一个变量. 顺带一提, Python 中变量的赋值也是同样的语法, 而 Python 中的变量又具有唯一的名称, 因此在使用 `name = value` 的语句时, 如果前面已经声明了 `name` 这个变量, 则会直接使用新的值覆盖掉原有的值. 而且由于是动态类型语言, 这里不会因为类型不匹配而报错. 因此你可以随时让一个变量拥有别的类型. 这一点十分灵活, 尤其是在确定某个变量的值不再使用, 而该变量的名称又很适合用作下一个值的名称时, 即可立刻覆盖掉原有的值.

#### 作用域

编程语言中常常拥有*作用域*这一概念. 这个概念可以认为是为了约束变量的生存周期而存在的. 一般而言, 一个变量的作用域在没有特殊声明的情况下, 只能对自己所在的区域以及该区域下的子区域可见.

Python 这门语言其中的一个特别之处就在于, Python 的作用域划分是通过缩进完成的. 当代码顶格写成时, 这些语句的作用域即为全局作用域. 而如果有代码需要在某个作用域内时 (比如, 定义的函数内, `for` 循环中, 条件判断中), 则需要使用冒号 `:` 打开一个新的子区域, 然后使用缩进去标识哪些部分是属于该作用域的. 这一点褒贬不一, 有人认为这个方法很简洁, 避免了过多的符号; 也有人认为这种风格让 Python 的代码逻辑可能不清晰, 造成阅读困难. 但是, 无论如何, Python 的作用域是这样通过缩进定义的. 那么, 在上一层的作用域中所定义的变量对下一级的子作用域是可见的, 而子作用域内定义的变量会在程序脱离该作用域之后消失, 因此子作用域的变量对外部是不可见的. 这一点几乎是所有编程语言所通用的. 

举个例子:

```python
i = 10
outside = 1
if i > 0:
    inside = 10
    print(outside)
# 下面这句会报错, 找不到定义. 因为在前面离开作用域的时候, inside就被回收然后消失了.
# print(inside) 
```

其中 `if` 就开启了一个新的子作用域, 其中定义的变量 `inside` 在外面是看不到的, 而其中是可以看到 `outside` 变量的.

#### 控制流, 循环和判断语句

Python 中可以使用 `for` 循环, `while` 循环以及其他的循环. 其中, `for` 循环比较特殊, 只能在某个范围内循环, 而这个循环需要是 *iterable* 的. 这个所谓的 iterable 可以翻译为*可迭代的*, 比如 `range` 函数所生成的范围, 一个 List, 一个 Tuple 等等. 其语法为:

```python
for i in iterable:
    # Do something
    # And something more
# Here is not inside the for loop.
```

其中的 `i` 会从 `iterable` 的第一个元素开始, 每过一个循环体便会让 `i` 变成 `iterable` 中的下一个元素, 直到 `iterable` 中的元素被取完. 而 `while` 循环则比较简单, 只要判断条件为真则一直循环, 当检测到条件为假时则终止循环. 语法为:

```python
while something_is_true:
    # Do something
    # And something more
# Here is not inside the while loop.
```

所以一般而言, 使用 `while` 循环时需要在循环体中让循环条件在某时不满足, 以跳出循环.

Python 中的判断语句是较为通用的形式, 这里只介绍 `if else` 循环:

```python
if something_might_be_true :
    # Do something
elif something_might_also_be_true:
    # Do another thing
else:
    # No other condition is satisfied
# Not in condition 
```

其语法也是十分的简单. Python 还支持一行式的判断, 可以对标 C/C++ 的三元表达式:

```python
do_something if condition_is_true else do_other_things
```

这个语法非常贴近英语语法, 且避免了难以理解的三元表达式. 但为了代码结构清晰, 请尽量使用完整的 `if else` 判断语句.

#### 函数

函数是众多编程语言的一大组成部分. Python 由于对类型不敏感, Python 的函数定义非常地简单:

```python
def Some_function (parameter_1, parameter_2, parameter_with_init_value = init_value):
    # Do something
    # Do other things
    return some_value
```

像这样就能成功地定义了一个函数. 其中 `Some_function` 为函数名, 其本身也是一个变量, 所以在重新定义时实际上是为这个变量赋了新的值.

`parameter*` 即为函数参数, 这些参数名将用作外界参数传入函数内时使用的占位符, 并且这些参数名将用在函数体内部. 且其中最后一个参数 `parameter_with_init_value` 是具有默认值的参数, 其默认值为 `init_value`. 具有默认值也就意味着这个函数可以不传入这个参数以代表传入默认参数. 在向函数传参时, 可以按照函数参数的顺序传入参数, 也可以显式地指明某个参数的值是什么, 如 `Some_function(parameter_2 = 1, parameter_1 = 3)` 这种写法是合法的. 

最后的 `return` 代表返回的值. 所谓返回值, 可以认为是函数运算的结果. 这个结果需要手动通过 `return` 关键字指定, 这里使用了变量 `some_value` 作为占位符.

函数除了便于代码复用之外, 还可以让代码结构更加清晰, 以及控制一段逻辑的*输入-输出*结构. 这里不介绍 *lambda* 表达式, 这是一类匿名函数, 没有函数名, 但是具有函数的功能 (参数列表, 返回值), 即便目前大部分编程语言已经支持这一特性.

### Python 面向对象, numpy, matplotlib

这里简单介绍一些进阶的语言特性, 以及展示两个常用包的使用.

#### 面向对象与类

面向对象是目前十分热门的编程范式, 其通过将数据以及对数据的操作等打包为一个*对象*, 从而实现对数据的统筹管理. 而为了实现面向对象, 就需要某种方式实现这种打包, 这一方法即为所谓的*类* (class). 各个语言对面向对象的实现均有其特点, 在 Python 中对类的声明与定义语法如下:

```python
class some_class:
    def __init__(self, param_1, param_2, param_default = default_val):
        # Define class members

        self.member_1 = param_1
        self.member_2 = param_2
        self.some_member = param_default

        # Do something, just like in a function

        self.do_something()
    
    def do_something():
        # Do something

# End of definition

my_variable = some_class(val_1, val_2) 

# Use Inheritance from some_class
class derived_class(some_class):
    def __init__(self, para_1, para_2, sub_para, para_default = default):
        # Must call parent class's __init__ method to avoid overwritting __init__ of parent class.
        some_class.__init__(self, para_1, para_2, para_default)
        self.sub_member = sub_para

        self.sub_class_method()

    def sub_class_method():
        # Do sub_class things

my_sub_variable = derived_class()
```

可以看到, Python 可以通过定义 `__init__` 函数来定义类里面都有什么成员变量, 并且调用一些成员函数. 定义成员函数时语法同定义普通函数别无二致, 而在调用类中的内容时需要使用关键字 `self`. 并且在使用类定义变量时, 直接可以通过类的名称来作为函数名并传入 `__init__` 函数中规定的参数即可调用成员函数 `__init__`. 最后这里要提到的是, Python 的类成员访问控制符通过变量的名字进行控制, 如双下划线代表成员是*私有* (private) 的, 单下划线代表成员是*保护* (protect) 的, 而其余普通名称则为*公开* (public) 的.

所谓私有成员, 即只有该类内部可以使用的成员变量或方法. 这些变量或方法在类外是不可见的. 而所谓保护成员则是只在类内部以及*子类* (派生类) 内部可以使用的成员, 公开成员即为没有访问限制的成员, 无论是外部还是内部都可以取得. 使用访问控制可以控制 "谁能取到类内的数据", 从而保护数据不会被意外读取或者篡改. 对访问控制的理解也决定着对面向对象范式的理解.

然而我们这里并不对面向对象做要求 (主要是我也不太懂 Python 的面向对象), 这里就仅作一个介绍, 并使用其最基础的部分而已.

#### 包, numpy, matplotlib

Python 最强大的部分当属其活跃的社区所贡献的大量好用的包. 为了实现科学运算, 常用的数学库即为 `numpy`, 而画图则有 `matplotlib`. 这里大概介绍二者的基础使用. 

为了引入包, 需要使用关键字 `import`. 通常, 为了使用 `numpy` 与 `matplotlib`, 有如下代码:

```python
import numpy as np
import matplotlib.pyplot as plt
# from matplotlib import pyplot as plt
```

底下注释的内容和上一行内容的功能相同. 可以看到使用 `as` 关键字可以为包引入别名, 而为了导入子模块可以使用 `from` 关键字, 也可以直接 `.` 出来并引入.

首先介绍 `numpy` 的一些使用. `numpy` 主要提供了一种数据结构: `numpy.array`, 这种结构可以用来存储数组, 矩阵等数学对象, 且支持对其进行遍历, 切片以及常见数学运算等操作; `numpy.array` 可以通过 Python 原生的 `List` 来初始化一个数组. 对于尺寸相符的数组, 可以进行加减乘除等运算, 包括数组间运算, 数组与标量运算等, 非常方便. 除此之外, `numpy` 还提供了大量的数学函数以供使用, 比如 `numpy.exp`, `numpy.sin` 等, 以及对文件的一些操作, 将文件中的数据加载为 `numpy.array`.

然后介绍 `matplotlib.pyplot`, 这是一个绘制图形的库, 通常与 `numpy` 搭配使用, 可以高质量地将数据可视化. 下面举一个绘制 $y = sin(2x)+1$ 的图像的例子, 作为 `numpy` 以及 `matplotlib` 的应用.

```python 
import numpy as np
from matplotlib import pyplot as plt

x = np.linspace(0, 2*np.pi, 10000)
y = np.sin(2*x) + 1
plt.plot(x,y,"-b",label="$y = \sin(2x)+1$")
plt.xlabel("x")
plt.ylabel("y")
plt.legend(loc = 1)
plt.show()
```

上述代码首先定义了一个从 $0$ 开始到 $2\pi$ 结束的, 总数据量为 10000 的一个 `numpy.array` 并命名为 `x`, 然后使用 `x` 通过运算定义了名为 `y` 的数组, 最后使用 `matplotlib.pyplot.plot` 函数进行绘制并进行图像处理. 可以看到 `matplotlib` 是支持 $\LaTeX$ 语法的.

Python 还有海量的包可以调用, 大多数都拥有友好的 API 且易于上手. 这里就不再赘述.

### 算法实现

Python 的基础语法以及进阶语法先告一段落. 接下来会演示上一章节内容所展示的算法如何使用 Python 进行实现. 要实现的算法如下:

- 向前欧拉法
- 数值积分方法
- 有限差分法求梯度与拉普拉斯

#### 向前欧拉法

向前欧拉法的实现主要依赖于其显式公式部分. 设待求 ODE 为:
$$
\dfrac{\partial y}{\partial x} = F(x, y),
$$
且解满足初值 $(x_0, y_0)$, 要求求解范围为 $[x_0, x_t]$,  则根据向前欧拉法, 选择合适的步长 $\Delta x$ 后, 有:
$$
y_{n+1} = y_{n} + \Delta x \cdot F(x_n, y_n)
$$

因此, 为了实现这一算法, 该算法实现的函数有如下几点:

> 接收参数:
> - $x$ 轴的离散信息 (初始位置, 结束位置, 步长)
> - 解的初始值 $y_0$
> - ODE 右端的函数 $F(x,y)$ 的显式表达
> 
> 返回值:
> - 一个数组, 作为解得的 $y$ 的函数值

则有如下 Python 实现:

```python
from typing import Callable

def forwardEuler(
    x_0: float,
    x_end: float,
    dx: float,
    y_0: float,
    F_x_y: Callable[[float, float], float],
) -> list[float]:
    result: list[float] = [y_0]
    this_x = x_0
    this_y = y_0
    while this_x <= x_end:
        this_y = this_y + dx * F_x_y(this_x, this_y)
        result.append(this_y)
        this_x += dx
    return result
```

#### 数值积分

数值积分的实现同样比较简单, 分析该算法的输入输出如下:

> 接收参数:
> - $x$ 轴的离散信息 (初始位置, 结束位置, 步长)
> - 被积函数
>
> 返回值:
> - 一个数, 作为积分值

根据不同的积分算法, 可以有多种不同的实现. 下面实现四种算法: "黎曼"式积分法, 梯形公式, Simpson 公式, Newton-Cotes 公式.

```python {lineNos=inline}
from typing import Callable

def RiemannIntegral(
    f: Callable[[float], float], x_start: float, x_end: float, dx: float
) -> float:
    sum = 0
    x = x_start
    while x < x_end:
        sum += f(x)
        x += dx
    return sum * dx


def QuadratureIntegral(
    f: Callable[[float], float], x_start: float, x_end: float, dx: float
) -> float:
    sum = 0
    x = x_start
    while x < x_end:
        sum += f(x)
        x += dx
    sum -= (f(x_start) + f(x_end)) / 2
    return sum * dx


def SimpsonIntegral(
    f: Callable[[float], float], x_start: float, x_end: float, dx: float
) -> float:
    sum = 0
    x = x_start
    while x < x_end:
        sum += 4 * f(x + dx / 2)
        sum += 2 * f(x)
        x += dx
    sum -= f(x_start) + f(x_end)
    return sum * dx / 6


def N_C_Integral(
    f: Callable[[float], float], x_start: float, x_end: float, dx: float
) -> float:
    sum = 0
    x = x_start
    while x < x_end:
        sum += 32 * f(x + dx / 4)
        sum += 12 * f(x + dx / 2)
        sum += 32 * f(x + 3 * dx / 4)
        sum += 14 * f(x)
        x += dx
    sum -= 7 * (f(x_start) + f(x_end))
    return sum * dx / 90
```

#### 梯度与拉普拉斯

这里针对二维情况进行计算. 同上, 考虑算法的输入输出:

- 梯度:
  > 输入
  > - 待计算网格(二维列表)
  > - 网格步长
  > - 边界条件字段 (这里固定为周期边界以便实现)
  >
  > 输出
  > - 两个二维列表, 分别为对 $x$ 方向的梯度和对 $y$ 方向的梯度

- 拉普拉斯
  > 输入
  > - 同上
  > 
  > 输出
  > - 一个二维列表, 存储每个网格点的拉普拉斯

以下是代码实现:

```python {lineNos=inline}
def calc_grad(
    mesh: list[list[float]], dx: float, boundary: str = "Periodic"
) -> tuple[list[list[float]], list[list[float]]]:
    Nx = len(mesh)
    Ny = len(mesh[0])
    grad_x = mesh
    grad_y = mesh
    for i in range(Nx):
        for j in range(Ny):
            v_l = 0
            v_d = 0
            v_r = 0
            v_u = 0
            if (boundary == "Periodic"):
                v_l = mesh[i - 1][j] if i != 0 else mesh[Nx - 1][j]
                v_d = mesh[i][j - 1] if j != 0 else mesh[i][Ny - 1]
                v_r = mesh[i + 1][j] if i != Nx - 1 else mesh[0][j]
                v_u = mesh[i][j + 1] if j != Nx - 1 else mesh[i][0]
            # elif (boundary == "Fixed"):
                # XXX
            grad_x[i][j] = (v_r - v_l) / (2 * dx)
            grad_y[i][j] = (v_u - v_d) / (2 * dx)
    return grad_x, grad_y

def calc_laps(
    mesh: list[list[float]], dx: float, boundary: str = "Periodic"
) -> list[list[float]]:
    Nx = len(mesh)
    Ny = len(mesh[0])
    laps = mesh
    for i in range(Nx):
        for j in range(Ny):
            v_l = 0
            v_d = 0
            v_r = 0
            v_u = 0
            v_c = mesh[i][j]
            if boundary == "Periodic":
                v_l = mesh[i - 1][j] if i != 0 else mesh[Nx - 1][j]
                v_d = mesh[i][j - 1] if j != 0 else mesh[i][Ny - 1]
                v_r = mesh[i + 1][j] if i != Nx - 1 else mesh[0][j]
                v_u = mesh[i][j + 1] if j != Nx - 1 else mesh[i][0]
            # elif (boundary == "Fixed"):
                # XXX
            laps[i][j] = (v_l + v_d + v_r + v_u - 4 * v_c) / (dx * dx)
    return laps
```

至此, 我们使用 Python 实现了我们将在相场模拟中使用的大部分算法. 具体的模拟过程中, 我们可能不需要用函数的方式将这些算法打包起来, 只需要直接实现即可.

### 总结

这部分内容希望能对上一章节中的算法内容有更进一步的补充, 并且希望能对算法如何实现为代码的过程起到促进理解的作用. 同时, 希望这里介绍的 Python 能成为您日常学习生活中的另一件有利工具, 并且能对编程这门技术有一定的入门理解, 为后续的程序编写提供基本的认识. 下一章节将会介绍如何使用 C++ 来实现这些算法, 并使用 C++ 完成一个小型的模拟, 尝试从这个小型模拟中了解模拟过程中会面临的问题, 以及数据最后的可视化方法.