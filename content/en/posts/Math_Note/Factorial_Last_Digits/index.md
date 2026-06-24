---
categories:
- Mathematics
- Programming
# - Phase Field
# - Others
tags:
- Math problems
- Number Theory
- Python
- Algorithm
title: "What Is the Last Nonzero Digit of 2025!?"
description: "A fascinating question on Zhihu — how can we solve it?"
date: 2025-08-25T18:01:23+08:00
image: /images/清水吟.jpg
math: true
license: 
hidden: false
comments: true
---

*I saw [this interesting question on Zhihu](https://www.zhihu.com/question/666502327), as well as [a very impressive answer](https://www.zhihu.com/question/666502327/answer/18810753693). It's really fascinating. Here I'll write about my method for solving this problem and my thought process at the time.*

*The featured image is from [fasnakegod](https://www.pixiv.net/en/users/8605991)'s [清水吟](https://www.pixiv.net/en/artworks/124177921), paired with [**DDBY**](https://ddby.jp/)'s *Cramped space*. The flute sound is truly wonderful, paired with a light drum set and melody, giving a very leisurely and relaxed feeling. I hope you enjoy it too~*

{{<music auto="https://music.163.com/#/song?id=715690" loop="none">}}

## Problem Introduction

If you don't want to click that link, the problem is actually just one line: find the first nonzero digit of 2025! counting from right to left. This counts as a math olympiad problem, and also an exercise at the end of a chapter in a certain book (*Concrete Mathematics*).

Since 2025! is nearly impossible to verify by simple calculator computation (even though someone on Zhihu has [computed this value](https://www.zhihu.com/question/666502327/answer/18577793245?share_code=8Xj75jf4cL99&utm_psn=1942598977787761098)), we can regard this problem as asking: for the factorial of some large number $n$, $n!$, in its decimal representation, what is the first nonzero digit counting from right to left?

Describing this target digit is quite cumbersome. Let's call this digit $A$ for short. Furthermore, let's slightly abuse notation and use $A$ to extract the digit we want — for example, the $A$ of the number $12345000$ is denoted as $A(12345000) = 5$. Additionally, for convenience of discussion, denote the result of $n!$ as $a_k\dots a_3 a_2 a_1$, i.e., assign an index to each digit. For example, for $120$, $a_3 = 1$, $a_2 = 2$, $a_1 = 0$.

Alright, let's get started now and try to solve this problem.

## First Attempt: It Must Be Related to Prime Numbers, Right?

This problem must have a general algorithm, but before discovering that general solution, let's manually try a few simple values and observe whether there are any patterns.

### No $0$s, Please.

For example, compute $5! = 1\times 2\times 3\times 4\times 5 = 120$, then the $A$ we want equals 2. There is one 0 in this result, and it comes from the product of $2$ and $5$. This must be important! We also know $4\times 25 = 100$, $8\times 125 = 1000$, etc. When finding $A$, we certainly don't want to consider these "useless" numbers, because their results have no effect on the $A$ we seek.

Let's go further. Consider that the above products are actually powers of $2$ and $5$ multiplied together, or in other words, there are several pairings of $2$ and $5$. We can observe: if after prime factorization of the factorial, several $2$ and $5$ pairs appear, then these pairs have no effect on the final result.

Alright, then let's decompose the factorial into prime factors! Then remove every $2$-$5$ pair inside, and in the end only a final batch of results will be left. We multiply them together and look at the last digit — it must be $A$...

Is, is that right? Forget it, let's first compute a simple case. Let $n = 10$ and see the result. First find the prime numbers. The primes below 10 are only $2, 3, 5, 7$, four of them. Then decompose the numbers below 10 into prime factors and count their multiplicities, obtaining:

|Prime|Count|
|:-:|:-:|
|2|8|
|3|4|
|5|2|
|7|1|

Then after removing two $2$-$5$ pairs, multiply the rest together to get: $36288$, so $A = 8$.

OMG, that was so troublesome. Only two pairs? This was just for primes below 10; there are 25 primes below 100. How would we handle that?

### Actually, We Should Only Calculate $A$...

But we don't seem to need to compute the entire result either — getting $A=8$ is already OK. And it seems that to obtain $A$, we only need to pay attention to the units digit of every multiplication result?

Let's look at the powers of these four numbers and see what characteristics their units digits have:

|Prime|Pow 1|Pow 2|Pow 3|Pow 4|Pow 5|
|:-:|:-:|:-:|:-:|:-:|:-:|
|2|2|4|8|6|2|
|3|3|9|7|1|3|
|5|5|5|5|5|5|
|7|7|1|3|9|7|

Seems somewhat interesting — their results are cyclic, and in fact there are only two cycles: the $2$-cycle and $3$-cycle.

Wait, we haven't considered other primes yet, like $11$, $13$, $17$, $19$, etc. However, well, we can observe that the last digit of any prime greater than $10$ can only be one of $1, 3, 7, 9$, and these happen to all fall into the pattern of the $3$-cycle.

But even so, how do we count the primes? This method strongly depends on solving the troublesome problem of counting the number of primes clearly. It still feels unworkable...

## Second Attempt: At Least, We Really Only Need to Care About the Last Digit

### Repeated $1$ to $9$ — Does It Foreshadow Something!?

But the good news is that we have locked onto the idea of **only caring about the last digit**. If we only consider the last digit, why would we even consider primes and the like? For example, consider $A(20!)$. Then we have to compute the product of the *nonzero units digits* of $1\times 2\times \dots \times 9 \times 10\times 11\times 12\times \dots\times 19\times 20$ — that is, repeatedly computing $A(9!)$. After the computation, we still need to multiply by the $1$ in $10$ and the $2$ in $20$.

Huh? It seems that computing $A(n!)$ can be simplified to **computing $A$ for every number less than $n$, and then computing $A$ of their product**. Writing it more *mathematically*:

$$
A(n!) = A(\prod_{i=1}^{n} i ) = A(\prod_{i=1}^{n} A(i)).
$$

If this holds, then our computation can entirely focus on the $A$ corresponding to each number, because we always only want that last nonzero digit. We can even have an equality like:

$$
A(A(xy))=A(A(x)A(y)).
$$

That is, the $A$ corresponding to the product of any two numbers equals the $A$ obtained after multiplying the $A$ values corresponding to the two numbers and then taking $A$. The reason for taking $A$ twice is mainly to avoid possible trailing zeros. Then, following this method, perhaps we could repeatedly compute $A(9!)$ many times, whose result is $8$; then count clearly how many corresponding $1$-$9$ blocks there are, i.e., how many $8$s multiplied together, take their corresponding $A$, and finally multiply by the $A$ of the factorial of the few remaining numbers that don't fill a complete $1$ to $9$ block. Of course, take $A$ one final time at the very end — that's the result we want.

Let's test our idea with $A(20!)$. From the process above, we can see that the units digits $1$ through $9$ appear twice (i.e., $1$ to $9$ and $11$ to $19$). Then according to our algorithm, the $A$ corresponding to $20!$ is $A(8\times 8\times 1\times 2) = 8$.

Did I calculate correctly? By brute-force calculator computation, the result is $2432902008176640000$, whose $A = 4$.

**Great, I calculated wrong. Too bad, how could this happen!?**

### Why is $5$ So Bad

After the whole analysis above, the result turned out to be wrong?!? Where exactly did the problem lie? After careful verification and a little, tiny bit of care, one can discover that the culprit is the units digit $5$, because whenever $5$ appears, it always causes the result to acquire a $0$ and carry over to the next digit — or put another way, multiplying by $10$ and then dividing by $2$.

After taking this into account, if we try to drop the units digit $5$ from $9!$, we will find that the last digit of the result does not have $0$. We can also easily conclude that, in fact, if we remove all numbers whose units digit is $5$ or $0$, the last digit of $n!$ won't be $0$. Then it seems we can reorganize the form of this product — for example, we first compute the product of numbers whose units digit is not $5$. For $A(9)$, that is $4!$ and $9!/5!$, giving results $24$ and $3024$, respectively. Then we multiply their units digits, then multiply by $5$ or divide by $2$, and the result obtained is the result we need. A simple computation confirms the answer is $8$, no problem.

Huh?!? Wait a moment — the last digits of these two products are still the same digit $4$! It seems that the units digit of the product of such a group of four numbers must be $4$?! It looks like we can again adopt the previous line of thought. Earlier we grouped by 9 numbers, and that method included $5$, the troublemaker, so it failed. So this time let's adopt grouping by 4 numbers. For convenience, let's call this group $S$.

Let's try again with $20!$. There are 4 $S$ groups in it, so we need to compute $A(4^4) = 6$. There are 4 bad guys inside that contain $5$ as a prime factor, namely $1\times 5$, $2\times 5$, $3\times 5$, $4\times 5$. Multiplying them together gives:

$$
\prod_{i=1}^{4} i \times 5^4 = 4! \times 5^4 = 15000
$$

Finally, multiplying the two together gives... Huh? How is it $90000$!? Where did it go wrong again? If we consider that multiplying by $5$ in our problem is actually equivalent to dividing by $2$, we discover:

### $5$ Also Steals Other $2$s — That Won't Do!

Too bad, really too bad. But luckily we still have a trick: $S$ must have extra $2$s to feed to the ungrateful $5$s. We just need to account for how many $2$s are given out to the insufficient $5$s to make pairs. Perhaps we shouldn't rush to compute $A(4^4)$ — instead, remove the outer $A$, because when only one digit remains, there certainly aren't enough prime factor $2$s to feed to the extra $5$s (since the power cycle of $4$ only has $4$ and $6$). After this correction, we obtain:

There are 4 $S$ groups, so the product of the units digits of these four groups is $4^4 = 256$. Multiply this result by $4! \times 5^4$, yielding $256\times 15000 = 3840000$, then taking $A$ gives the result $4$. This should be correct now. Let's formally describe this process.

To compute $A(n!)$, first we need to find how many $S$ groups $n$ can be divided into. The computation method is very simple: we can use division with remainder. In this way, we can determine how many $S$ groups there are — i.e., how many $4$s to multiply — and what the remainder is. Let $k$ be the number of $S$ groups, and let $r$ be the remainder. Additionally, we can know what numbers containing $5$ remain — that is, which numbers are multiples of $5$. Due to the nature of factorial, the product of the remaining multiples of $5$ can always be written as $k!\times 5^k$, where $k$ here is precisely the number of $S$ groups above.

Thus we obtain the following expression:

$$
A(n!) = A(A(4!)^k\times k!\times 5^k\times r!) = A(4^k\times k!\times 5^k\times r!),
$$

Noting that $4^k \times 5^k = 20^k$, so $A(4^k \times 5^k) = A(2^k)$, we simplify the above expression to:

$$
A(n!) = A(4^k\times k!\times 5^k\times r!) = A(2^k \times k! \times r!) = A(A(2^k)\times A(r!)\times A(k!)).
$$

Here, since $r$ is a number less than $5$, its factorial is especially easy to compute — we could even look it up from a table. And the units digit of powers of $2$ cycles as $2,4,8,6$, so we can focus our attention entirely on $A(k!)$, where $k$ is the original number $n$ reduced by a factor of four. Next, we repeat the same trick to solve $A(k!)$, and the result obtained, when brought back into the original expression, yields a similar pattern again. By continuously repeating this process, we can recursively obtain the fully simplified expression. The result obtained via this method will ultimately be composed of the product of powers of $2$ and the factorials of the remainders — we only need to find $A$ of this expression, which is perfectly doable.

We have finally obtained a usable algorithm. Great! However, recursive algorithms, while exquisite, always give the feeling of "I can simplify this further." Here, the focus of simplification should be on $k$. If we could unwrap $k!$ in advance, or put another way, if we could have a method right from the start to decompose $n!$ into powers of $2$ and a series of $r!$s, then we wouldn't need to rely on recursive computation.

## Third Attempt: The Algorithm Must Have Room for Improvement!

Based on the analysis just now, it's clear that we first need to determine what power of $2$ we must compute. And this value is controlled by the number of $S$ groups. We need to give this $S$ group a somewhat more explicit meaning. Earlier we said "4 numbers per $S$ group" — that's still too vague. What we call an $S$ group should be this kind of consecutive block of numbers, whose units digits range from $1$ to $4$, or from $6$ to $9$, as one group. $S$ groups have this characteristic: they are evenly distributed in $n!$ and their count is extremely easy to compute. For the $S$ groups of $n!$, we only need to divide $n$ by $5$ to obtain the number of groups, and the remainder can be saved for later use. Moreover, the $A$ value corresponding to the product within each $S$ group is always $4$. This is a very important characteristic — and it's precisely this that enables us to simplify the computation.

As we carry out the algorithm described above, we must repeatedly compute the value of $A(k!)$. And this means we must repeatedly count the number of $S$ groups that appear each time. Is there a way to make $k!$ spit out all the $S$ group counts at once?

### What if $5$ Weren't a Bad Guy?

Suppose $5$ weren't a bad guy — multiplying by $5$ wouldn't add a trailing $0$ and thus affect the result. In that case, only multiples of 10 would affect the final result! This might give us some insight into computing the total number of $S$ groups.

Let's try grouping using the method that was originally wrong. Group all factors in $n!$ according to $A(n)$ from $1$ to $9$. Suppose we have assembled 9 numbers so that their $A$ values exactly traverse 1 through 9 — we'll denote such a group as $S_{10}$. Using the notation we established long ago, if we denote $n$ as $\dots a_3 a_2 a_1$, then we have: $\dots a_3 a_2 0$ groups where the *units digit is not 0*, $\dots a_3 0 0$ groups where the *units digit is 0 but the tens digit is not 0*, $\dots a_4 0 0 0$ groups where the *units and tens digits are 0 but the hundreds digit is not 0*...

Note that under the grouping method above, each group upon taking $A$ becomes what we want as $S_{10}$ — we can then very conveniently count the number of $S_{10}$ groups. Suppose $n = 1234$ — then the corresponding number of $S_{10}$ groups we want is $123+12+1 = 136$. A noteworthy boundary case here: if our number is $9$, $90$, or $990$ — in such cases our $S_{10}$ count is actually $0+1$, $9 + 1 = 10$, $99+9+1 = 109$ groups. If purely counting $S_{10}$ groups, to fix this oversight we could consider checking whether the first digit is $9$ — if yes, add 1 extra; if not, it means we haven't assembled enough, so don't add. However, we are not purely counting $S_{10}$ groups, so let's simply ignore this boundary case. We'll discuss it more later.

What can be observed is that in base-10, grouping by having $A(n)$ traverse 1 through 9 is an extremely natural process. The root cause — the convenience stems from the decimal representation. So what about counting the case of *groups of five*? This gives us a reason to try base-5. Let's give it a try.

### Counting All $S$ Groups in Base-5

Below, we'll express decimal numbers directly and simply, while base-5 numbers will have a subscript 5. We still express base-5 numbers as $\dots a_3 a_2 a_1$. In this way, $1$ to $4$ in decimal is $1_5$ to $4_5$ in base-5, and $6$ to $9$ in decimal is $11_5$ to $14_5$ in base-5. What about the decimal number $30$ — what is it in base-5? Since $30 = 1\times 5^2 + 1\times 5^1 + 0\times 5^0$, its base-5 representation is $110_5$.

So how many $S$ groups are there in $30!$? By analogy with the approach above, we first have $11_5$ groups whose units digit is not 0, and then $1_5$ groups whose *tens* digit is not 0 while the units digit is 0 — giving a total of $12_5$, i.e., $7$ groups. If we count manually, $30$ divided by $5$ gives $6$, and additionally, since our algorithm produces a $6!$, which has only one $S$ group — thus, there should be $6+1=7$ $S$ groups in $30!$, and this result is consistent with the earlier algorithm.

Let's also look at how many $S$ groups there are in $100!$. Written in base-5, it is $400_5$, so it has $40_5 + 4_5 = 44_5 = 24$ $S$ groups. Using the classical method to count, we obtain first $20$ $S$ groups; then for $20!$ there are $4$ $S$ groups — a total of $24$. The results are also consistent.

Great! We can now successfully analyze how many $S$ groups a number has. Then what?

### Also Need to Count Remainders

After analyzing exactly how many $S$ groups there are in total, we know the $k$ in $2^k$ within the expression for $A(n!)$. However, during the process of extracting $S$ groups, we also obtain a series of remainders. We must find a way to keep these remainders for computation. How should we do that?

In decimal, every time we divide by $10$, we obtain a quotient and a remainder — the remainder is the rightmost digit, and the quotient is the remaining part after removing the rightmost digit. This rule holds for base-5 as well — and indeed, for any base. In this way, we can very quickly obtain all the remainders — they are simply every digit of the number. For example, for the base-5 number $131423_5$, all its remainders are $1,3,1,4,2,3$. Here we have included the leftmost $1$ for two reasons: if we only consider direct remainders, we will eventually encounter needing to multiply by the factorial of the leftmost digit; additionally, during the base conversion process, we divide until the result is $0$, and the last remainder is precisely the leftmost digit.

Thus, our algorithm is now complete. We first count the total number of $S$ groups, obtaining $k$, then take $k$ modulo $4$ to get a remainder, use this remainder $r$ to compute $2^r$, then multiply by the factorial of each digit remainder, and finally take $A$ of this result — which yields the $A$ we want.

Let's try computing $A(13!)$ under the new algorithm. Its base-5 representation is $23_5$, so there are $2_5 = 2$ $S$ groups in total. Then its corresponding $A$ is $A(13!) = A(4^2 \times 5^2 \times 2! \times 3!) = 8$. It is easy to verify that this result is correct.

Let's also try computing $A(20!)$. Writing $20$ in base-5 gives $40_5$, so we have $4_5$, i.e., $4$ $S$ groups. Then the $A$ we want is $A(20!) = A(A(2^4)\times 4!) = 4$, which matches our result above. Let's also try finding $A(63!)$. Since $63 = 223_5$, there are $24_5 = 14$ $S$ groups in total. At this point, the $A(63!)$ we want is $A(A(2^{14}) \times 3! \times 2! \times 2!) = 6$. Let's compute this value with Python. The result is

$$1982608315404440064116146708361898137544773690227268628106279599612729753600000000000000$$

Its $A$ matches our requirement. Yay! We have successfully found a workable algorithm! And since it's an algorithm, can we write it as a program?

## Let's Implement It in Python~

Let's choose our dear Python. Although it's called a glue language, it's really very easy to use, especially when handling this kind of thing — many functions are already built-in. Not to mention that after version 3.13, Python's interactive interface has improved a lot: supporting auto-indentation, supporting `exit` to quit, etc. It's really great.

Enough chatter. Let's start implementing this algorithm. First, naturally, we need to convert decimal numbers to base-5. Also, later on we'll need to convert base-5 back to decimal, so let's implement both together. For some kind of "generality," let's simply make such base conversion support *any number as base*.

### Base Conversion

Noting that each digit is the remainder of division, we can have the number divide by the base sequentially, and finally concatenate them in reverse order. The specific implementation is as follows:

```python
def change_base(n:int, base):
    """ Converts a decimal number to its representation in a given base. """
    if n == 0:
        return "0"
    
    digits = []
    while n:
        digits.append(int(n % base))
        n //= base
    return ''.join(str(x) for x in digits[::-1])

```

It's worth noting that we return a string here, not a number. Because numbers are automatically in base-10. To avoid unwanted operations, it's safer to use a string.

Additionally, we need to convert a base-5 number (as a string) back to decimal. This is very simple, implemented as follows:

```python
def to_decimal(s:str, base):
    """ Converts a number in string representation from a given base to decimal. """
    n = 0
    length = len(s)
    for i, digit in enumerate(s):
        n += int(digit) * (base ** (length - i - 1))
    return n
```

In this way, we can freely convert between base-10 and base-5. Of course, for convenience, we define the `to_penta` function:

```python
def to_penta(s:str):
    return change_base(s,5)
```

### Counting the Number of $S$ Groups

The first somewhat difficult point we encounter should be how to count the number of $S$ groups. Earlier we computed the base-5 addition and then converted back to base-10. However, such an algorithm is not very suitable for a computer: it's not familiar with how to compute additions in strange bases. The good news is that for addition, summing first and then doing base conversion yields the same effect as doing base conversion first and then summing. I won't prove this here. Knowing this, we can very simply obtain the number of $S$ groups:

```python
def num_S(s:str):
    acu = 0
    for i in range(len(s)):
        d = (s[:len(s)-i-1])
        acu = acu + to_decimal(d,5)
    return acu
```

Then we also need to decide the units digit result of the power of $2$ based on this value. Python provides the handy `divmod` function to help us handle this result. We'll use it later. The next problem is multiplying together all the factorials of the digits.

### Handling the Factorials

Before handling the factorials, we can observe a magical phenomenon: the digits at each position only have five possible results — from $0$ to $4$. Among them, the factorials of $0$ and $1$ are both $1$, so they can be disregarded; the result $3! = 6$ is especially special, because multiplying it by an even number and taking $A$ always yields itself — that is, if $x\in \{0,2,4,6,8\}$, then $A(3!\times x) = x$. Moreover, since this remainder will certainly be multiplied by the power of $2$ from earlier, even if among the remainders there are only $1$ and $3$, its result is $6$, which will subsequently be absorbed by the earlier power of $2$. Therefore, we can ignore the odd numbers among the remainders and only consider the even numbers among them. Furthermore, $A(2!) = 2$, $A(4!) = 4$, so we can focus all our efforts on these two numbers.

```python
def res(s:str):
    result = 1
    for dig in s:
        if int(dig)%2==0 and dig != '0':
            result *= int(dig)
    return result
```

### Combining to Complete the Computation

Finally, we just need to combine the few functions above.

```python
def last_nonzero_digit(n:int):
    penta_n = to_penta(n)
    k = num_S(penta_n)
    resudal_4 = divmod(k,4)[1]
    A_pow_2 = 6 if resudal_4 == 0 else 2**resudal_4
    ress = res(penta_n)
    result = str(int (A_pow_2 * ress))[-1]
    return result
```

Great, now we just need to run this script to solve the problem we got at the very beginning. We want $2025$, so $A(2025!)$ computed gives the result: $2$! Awesome. This algorithm is quite fast — almost instantaneous computation. I tried it myself: on my own PC, computing $A(2^{5000}!)$ took about two seconds to get the result.

However, is our result correct? There should be an answer — how was the answer done?

## Final Chapter: The Mysterious Algorithm — How Can It Be So Fast?

When we introduced this problem, we mentioned that someone on Zhihu posted [a very impressive answer](https://www.zhihu.com/question/666502327/answer/18810753693). This algorithm is surprisingly simple — it doesn't require computing several troublesome divisions; it only needs one modulo 4 operation. This algorithm goes like this:

First write the number in base-5, then add up every even digit to get a result $t$, then multiply each digit by its position index (starting from 0) and sum to get $x$, and finally compute a discriminant $y = (x+t/2) \mod 4$. If $y = 0$, then the result is $6$; for the remaining cases, the result is $2^{y}$. This algorithm written as a Python program is (borrowing the base-5 conversion algorithm from above):

```python
def quick_method(n): 
    s = to_penta(n)
    t = 0
    x = 0
    i = len(s)-1 # index
    for digit in s:
        d = int(digit)
        if d % 2 == 0:
            t = t + d
        x = x + i*d
        i = i-1
    
    z = (x + t/2) % 4

    result = 6 if z==0 else int(2**z)
    return result
```

This algorithm is too concise... Its explanation is written in [this ancient webpage](https://oeis.org/w/images/4/48/AlgLastFinal1.txt). I'm truly drained and can't read on. But I believe its basic idea is probably similar to my algorithm. It should have made a great simplification at the step of finding $S$ groups, and managed to squeeze the handling of remainders into a single summation. I don't know how he did it either. But this algorithm is certainly much faster, because it computes $A(2^{5000}!)$ instantly. After all, the time complexity speaks for itself...

Perhaps some day I'll come back to see how the specific implementation of this algorithm actually works! I hope I'll remember to come back. Let's leave it here for now — this problem has already hurt quite a few of my brain cells.

## Afterword

Actually, solving this problem was not smooth sailing. At first, I saw this problem in a state of idle boredom and was immediately drawn in. This problem is really very interesting, and my initial train of thought, as written above, tried prime factorization and some loose ends, manually computing $A(20!)$ to try to find patterns and the like. However, that day I was in a hurry to eat, and after discovering that operations could be done by grouping 9 numbers together, I stopped thinking carefully. In fact, the approach of grouping by 9 numbers is wrong. I only realized the reason belatedly when I had already started writing this article. Fortunately, I quickly realized the problem, and after kicking aside the stumbling block of $5$, the computation could proceed very well.

In fact, during the computation, I kept using the `quick_method` given at the end as a reference for checking my results. Happily, the results are fine — my algorithm design withstood the pressure of *having no answer key*. After all, from this final answer, the only useful information one can obtain is almost just "remember to use base-5." It's hard to reverse-engineer it, this set of algorithms. Of course, regarding this problem, my ultimate goal is naturally to thoroughly digest how this algorithm actually works. But that too is a story for another day.

It's very clear that this problem is strongly related to number theory, and especially has a lot to do with modular arithmetic. However, I didn't delve deeply here — one main reason is that base conversion is already troublesome enough, and there's no need to introduce too much number theory content. Another is also my own problem: I don't know number theory — what can I possibly talk about? So, in the spirit of writing about what I know, using what I write, in the end only this half-baked piece came out. I hope you, reading this, find it at least somewhat interesting.

Also, I want to thank [柴 (oneis2much)](https://oneis2much.github.io/) for their careful review. Thank you!

Then finally, as always, I wish you good physical and mental health, smooth work, and a pleasant life.
