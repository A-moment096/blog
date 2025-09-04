---
title: "代码高亮测试"
description: "测试代码高亮的支持情况"
date: 3000-07-25
categories:
- Testing
tags:
- Test
mermaid: true
draft: true
# hidden: true
---

这是用于测试 Hugo 中各种编程语言的代码高亮支持情况。

---

## Bash-Session (Console)

```console
> echo hello
hello
$ ls -l
total 12
-rw-r--r--  1 user user  123 Jul 25 12:01 file1.txt
-rw-r--r--  1 user user  456 Jul 25 12:02 file2.log
drwxr-xr-x  2 user user 4096 Jul 25 12:03 dir1
$ cat file1.txt
This is a sample text file.
It contains multiple lines.
End of file.
% df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   20G   28G  42% /
tmpfs           1.9G  2.0M  1.9G   1% /run
# whoami
root
# pacman -Qqe
base
>>> echo "Custom prompt!"
Custom prompt!
```

## PowerShell

```powershell
PS> Get-ChildItem

    Directory: C:\Users\User

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----        7/26/2025  10:05 AM                Documents
-a----        7/25/2025  11:30 PM           1024 notes.txt
```


## Bash

```bash
#!/bin/bash
echo "Hello, Bash!"
for i in {1..3}; do
  echo "Line $i"
done
ls -la | grep ".md"
```

---

## Python

```python
import math

def greet(name):
    print(f"Hello, {name}!")

class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

greet("Python")
c = Circle(5)
print("Area:", c.area())
```

---

## JavaScript

```javascript
const nums = [1, 2, 3, 4];
nums.forEach(n => {
  console.log(`Square of ${n}:`, n * n);
});

async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}
```

---

## TypeScript

```typescript
interface User {
  name: string;
  age: number;
}

const user: User = { name: "Alice", age: 30 };
console.log(user.name);
```

---

## C

```c
#include <stdio.h>

int main() {
    for (int i = 0; i < 5; i++) {
        printf("C loop %d\n", i);
    }
    return 0;
}
```

---

## C++

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3};
    for (int n : v) {
        cout << "C++ value: " << n << endl;
    }
    return 0;
}
```

---

## C#

```csharp
using System;
class Program {
    static void Main() {
        Console.WriteLine("Hello from C#!");
    }
}
```

---

## Java

```java
public class HelloWorld {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            System.out.println("Hello Java " + i);
        }
    }
}
```

---

## Go

```go
package main

import "fmt"

func main() {
    for i := 1; i <= 3; i++ {
        fmt.Println("Hello Go", i)
    }
}
```

---

## Rust

```rust
fn main() {
    for i in 0..3 {
        println!("Hello from Rust {}", i);
    }
}
```

---

## HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Test</title>
  </head>
  <body>
    <h1>Hello HTML</h1>
    <p>This is a test.</p>
  </body>
</html>
```

---

## CSS

```css
body {
  font-family: sans-serif;
  background: #f9f9f9;
  color: #333;
}

h1 {
  color: #007acc;
}
```

---

## SCSS

```scss
$main-color: #3498db;

body {
  background-color: lighten($main-color, 40%);
  color: darken($main-color, 20%);
}
```

---

## JSON

```json
{
  "name": "test",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  }
}
```

---

## YAML

```yaml
version: '3.8'
services:
  app:
    image: node:18
    ports:
      - "3000:3000"
```

---

## TOML

```toml
[package]
name = "test"
version = "0.1.0"
edition = "2021"
```

---

## SQL

```sql
SELECT id, name FROM users WHERE active = 1 ORDER BY created_at DESC;
```

---

## Dockerfile

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
```

---

## Makefile

```makefile
build:
	go build -o myapp main.go

run:
	./myapp
```

---

## Lua

```lua
for i = 1, 3 do
  print("Hello from Lua", i)
end
```

---

## Swift

```swift
for i in 1...3 {
    print("Hello Swift", i)
}
```

---

## Kotlin

```kotlin
fun main() {
    for (i in 1..3) {
        println("Hello Kotlin $i")
    }
}
```

---

## PHP

```php
<?php
for ($i = 1; $i <= 3; $i++) {
    echo "Hello PHP $i\n";
}
?>
```

---

## Perl

```perl
for my $i (1..3) {
  print "Hello Perl $i\n";
}
```

---

## R

```r
for (i in 1:3) {
  print(paste("Hello from R", i))
}
```

---

## Matlab

```matlab
for i = 1:3
  disp(['Hello from MATLAB ', num2str(i)])
end
```

---

## Haskell

```haskell
main = mapM_ putStrLn ["Hello from Haskell 1", "Hello from Haskell 2"]
```

---

## Scheme

```scheme
(begin
  (display "Hello from Scheme")
  (newline))
```

---

## Assembly (x86 NASM)

```asm
section .data
  msg db 'Hello, world!',0xA
section .text
  global _start
_start:
  ; syscall write
```

---
