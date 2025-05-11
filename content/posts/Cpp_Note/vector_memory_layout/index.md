---
categories:
# - Mathematics
- Programming
# - Phase Field
# - Others
tags:
- C++
title: "C++ Vector 的内存布局"
description: "C++ Vector 容器的内存是连续的吗？"
date: 2025-03-24T09:53:29+08:00
image: 
math: true
license: 
hidden: false
comments: true
draft: true
---

```cpp
#include <iostream>
#include <vector>

int main() {
    // Declare two vector, one for element push_back,
    // and another one for recording the elements address
    std::vector<int> array;
    std::vector<int *> array_element_address;

    //? Reserve the space or not ?//
    // array.reserve(100);

    // Start the element push back
    for (int i = 0; i < 10000; i++) {
        array.push_back(i);
        array_element_address.push_back(&array.back());
    }

    // Output the length between address of the first and last element ?
    std::cout << array.end() - array.begin() << std::endl;
    // Output the length between the "ACTUAL" address the first and last element in array
    std::cout << *(array_element_address.end() - 1) - *array_element_address.begin() << std::endl;
}
```