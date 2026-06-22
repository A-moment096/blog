---
title: "代码高亮测试"
description: "测试代码高亮的支持情况"
date: 3000-07-25
categories:
- Testing
tags:
- Test
draft: true
---

## Console

```console
PS C:\Users\user> Get-Date
Monday, May 12, 2026 10:30:00 AM

PS> Get-Process | Where-Object { $_.WorkingSet64 -gt 100MB } |
>> Select-Object Name, Id |
>> Format-Table -AutoSize

Name        Id
----        --
chrome    1234
code      5678

$ echo "Hello, World!"
Hello, World!

$ curl -s https://api.example.com/status \
> -H "Authorization: Bearer token123" \
> -H "Content-Type: application/json"
{"status":"ok","version":"1.0"}

% brew install hugo
==> Fetching hugo
==> Downloading https://formulae.brew.sh/formula/hugo
################################################## 100.0%
==> Installing hugo
🍺  /opt/homebrew/Cellar/hugo/0.145.0: 1 files, 52MB

% python3 -m venv .venv && source .venv/bin/activate
(.venv) % pip install requests
Collecting requests
  Downloading requests-2.31.0-py3-none-any.whl (62 kB)
Successfully installed requests-2.31.0
```

---

## PowerShell

```powershell
# Parameters and types
param(
    [string]$Name  = "World",
    [int]   $Count = 3
)

# Function with pipeline input
function Get-Greeting {
    param([Parameter(ValueFromPipeline)]$InputObject)
    process { "Hello, $InputObject!" }
}

# Error handling
try {
    $result = 1 / 0
} catch [DivideByZeroException] {
    Write-Warning "Division by zero: $_"
} finally {
    Write-Verbose "Done"
}

# Pipeline, filtering, calculated property
1..$Count | ForEach-Object { $_ * 2 } | Where-Object { $_ -gt 2 }

Get-Process | Where-Object { $_.WorkingSet64 -gt 100MB } |
    Select-Object Name, Id, @{
        Name       = 'MemoryMB'
        Expression = { [math]::Round($_.WorkingSet64 / 1MB, 1) }
    } |
    Sort-Object MemoryMB -Descending |
    Format-Table -AutoSize

# Hash table and string interpolation
$config = @{ Host = "localhost"; Port = 8080 }
Write-Output "Listening on $($config.Host):$($config.Port)"
```

---

## Bash

```bash
#!/usr/bin/env bash
set -euo pipefail

# Variables and arithmetic
NAME="World"
COUNT=3
SUM=$(( COUNT * 2 ))

# Function with local variable
greet() {
    local target="${1:-$NAME}"
    echo "Hello, ${target}!"
}

# Conditionals
if [[ $SUM -gt 4 ]]; then
    greet "Bash"
elif [[ $SUM -eq 4 ]]; then
    echo "Exactly four"
else
    echo "Less than four"
fi

# Loop and array
fruits=("apple" "banana" "cherry")
for fruit in "${fruits[@]}"; do
    echo "Fruit: $fruit"
done

# Command substitution and pipe
files=$(ls -1 | grep "\.md$" | wc -l)
echo "Markdown files: $files"

# Here-doc
cat <<EOF
  Name  : $NAME
  Count : $COUNT
EOF
```

---

## Python

```python
from __future__ import annotations
import math
from dataclasses import dataclass, field
from typing import Generator

# Decorator
def repeat(n: int):
    def decorator(fn):
        def wrapper(*args, **kwargs):
            return [fn(*args, **kwargs) for _ in range(n)]
        return wrapper
    return decorator

# Dataclass with default factory
@dataclass
class Circle:
    radius: float
    tags: list[str] = field(default_factory=list)

    @property
    def area(self) -> float:
        return math.pi * self.radius ** 2

    def __repr__(self) -> str:
        return f"Circle(r={self.radius:.2f}, area={self.area:.2f})"

# Generator
def fibonacci() -> Generator[int, None, None]:
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Exception handling
@repeat(2)
def safe_divide(x: float, y: float) -> float | str:
    try:
        return x / y
    except ZeroDivisionError as e:
        return f"Error: {e}"

# Comprehension and unpacking
squares = {n: n ** 2 for n in range(5) if n % 2 == 0}
first, *rest = list(squares.values())

c = Circle(radius=5.0, tags=["geometry", "test"])
fibs = [next(fibonacci.__wrapped__()) for _ in range(6)]  # type: ignore
print(c, squares, first, rest)
```

---

## JavaScript

```javascript
// Destructuring, default params, spread
const config = { host: 'localhost', port: 3000, debug: false };
const { host, port = 8080, ...rest } = config;

// Class with private field and static method
class EventEmitter {
    #listeners = new Map();

    on(event, fn) {
        const fns = this.#listeners.get(event) ?? [];
        this.#listeners.set(event, [...fns, fn]);
        return this;
    }

    emit(event, ...args) {
        this.#listeners.get(event)?.forEach(fn => fn(...args));
    }

    static create() { return new EventEmitter(); }
}

// Async / await with error handling
async function fetchJSON(url, signal) {
    try {
        const res = await fetch(url, { signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        if (err.name === 'AbortError') return null;
        throw err;
    }
}

// Generator
function* range(start, end, step = 1) {
    for (let i = start; i < end; i += step) yield i;
}

// Promise combinators
const results = await Promise.allSettled(
    [...range(1, 4)].map(n => fetchJSON(`/api/item/${n}`))
);
results.filter(r => r.status === 'fulfilled').map(r => r.value);
```

---

## TypeScript

```typescript
// Utility types, generics, conditional types
type Nullable<T> = T | null;
type Awaited<T> = T extends Promise<infer U> ? U : T;

interface Repository<T, Id = number> {
    findById(id: Id): Promise<Nullable<T>>;
    save(entity: T): Promise<T>;
    delete(id: Id): Promise<void>;
}

// Enum
const enum Direction { Up, Down, Left, Right }

// Generic class with constraint
class Cache<K extends string | number, V> {
    readonly #store = new Map<K, V>();
    #hits = 0;

    get(key: K): V | undefined {
        const val = this.#store.get(key);
        if (val !== undefined) this.#hits++;
        return val;
    }

    set(key: K, value: V): this {
        this.#store.set(key, value);
        return this;
    }

    get hitRate(): number {
        return this.#hits / (this.#store.size || 1);
    }
}

// Discriminated union
type Result<T, E extends Error = Error> =
    | { ok: true;  value: T }
    | { ok: false; error: E };

function divide(a: number, b: number): Result<number> {
    return b === 0
        ? { ok: false, error: new Error('Division by zero') }
        : { ok: true,  value: a / b };
}

// Type narrowing
const r = divide(10, 2);
if (r.ok) console.log(r.value.toFixed(2));
else      console.error(r.error.message);
```

---

## C

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Struct and typedef */
typedef struct Node {
    int           value;
    struct Node  *next;
} Node;

/* Function pointer type */
typedef int (*Comparator)(const void *, const void *);

/* Linked list prepend */
Node *prepend(Node *head, int val) {
    Node *n = malloc(sizeof(Node));
    if (!n) { perror("malloc"); exit(EXIT_FAILURE); }
    n->value = val;
    n->next  = head;
    return n;
}

/* Free list */
void free_list(Node *head) {
    while (head) {
        Node *tmp = head->next;
        free(head);
        head = tmp;
    }
}

int cmp_int(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int main(void) {
    /* Variadic array, qsort */
    int arr[] = {5, 3, 1, 4, 2};
    size_t n = sizeof arr / sizeof *arr;
    qsort(arr, n, sizeof *arr, cmp_int);

    /* Pointer arithmetic */
    for (int *p = arr; p < arr + n; p++)
        printf("%d ", *p);
    putchar('\n');

    /* Linked list */
    Node *list = NULL;
    for (int i = 0; i < 3; i++) list = prepend(list, i * 10);
    for (Node *c = list; c; c = c->next) printf("%d ", c->value);
    putchar('\n');
    free_list(list);

    return EXIT_SUCCESS;
}
```

---

## C++

```cpp
#include <algorithm>
#include <iostream>
#include <memory>
#include <ranges>
#include <string>
#include <vector>

// Concept (C++20)
template<typename T>
concept Printable = requires(T t) { std::cout << t; };

// RAII wrapper with move semantics
template<typename T>
class Box {
    std::unique_ptr<T> ptr_;
public:
    explicit Box(T val) : ptr_(std::make_unique<T>(std::move(val))) {}
    Box(Box&&) noexcept = default;
    Box& operator=(Box&&) noexcept = default;

    T&       get()       { return *ptr_; }
    const T& get() const { return *ptr_; }
};

// Variadic template
template<Printable... Args>
void println(Args&&... args) {
    ((std::cout << std::forward<Args>(args) << ' '), ...);
    std::cout << '\n';
}

int main() {
    // Structured bindings, ranges, lambdas
    std::vector<std::pair<std::string, int>> scores{
        {"Alice", 92}, {"Bob", 78}, {"Carol", 85}
    };

    auto top = scores
        | std::views::filter([](const auto& p) { return p.second >= 85; })
        | std::views::transform([](const auto& p) { return p.first; });

    for (const auto& name : top) println(name);

    // Box with move
    Box<std::string> b{"hello"};
    println(b.get());

    return 0;
}
```

---

## C\#

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// Record (immutable value type)
record Point(double X, double Y) {
    public double DistanceTo(Point other) =>
        Math.Sqrt(Math.Pow(X - other.X, 2) + Math.Pow(Y - other.Y, 2));
}

// Generic interface and implementation
interface IRepository<T> where T : class {
    Task<T?> FindAsync(int id);
    Task SaveAsync(T entity);
}

// Pattern matching and switch expression
static class ShapeArea {
    public static double Of(object shape) => shape switch {
        Point p                          => 0,
        (double r, _) when r > 0        => Math.PI * r * r,   // circle tuple
        IEnumerable<Point> { } pts       => 0, // polygon placeholder
        null                             => throw new ArgumentNullException(nameof(shape)),
        _                                => throw new NotSupportedException()
    };
}

class Program {
    // Async main, LINQ, nullable
    static async Task Main() {
        var points = new List<Point> {
            new(0, 0), new(3, 4), new(1, 1)
        };

        var distant = points
            .Where(p => p.DistanceTo(new Point(0, 0)) > 2)
            .OrderBy(p => p.X)
            .Select(p => $"({p.X}, {p.Y})");

        await Task.WhenAll(distant.Select(async d => {
            await Task.Delay(10);
            Console.WriteLine(d);
        }));
    }
}
```

---

## Java

```java
import java.util.*;
import java.util.stream.*;
import java.util.function.*;

// Sealed interface (Java 17+)
sealed interface Shape permits Circle, Rectangle {
    double area();
}

record Circle(double radius) implements Shape {
    public double area() { return Math.PI * radius * radius; }
}

record Rectangle(double w, double h) implements Shape {
    public double area() { return w * h; }
}

// Generic bounded type, functional interface
public class Main {
    static <T extends Comparable<T>> Optional<T> max(List<T> list) {
        return list.stream().max(Comparator.naturalOrder());
    }

    public static void main(String[] args) {
        // Pattern matching switch (Java 21)
        List<Shape> shapes = List.of(new Circle(3), new Rectangle(4, 5));
        shapes.forEach(s -> {
            String desc = switch (s) {
                case Circle c    -> "Circle r=%.1f".formatted(c.radius());
                case Rectangle r -> "Rect %sx%s".formatted(r.w(), r.h());
            };
            System.out.printf("%s area=%.2f%n", desc, s.area());
        });

        // Stream collectors, method reference
        Map<String, Long> freq = Stream.of("a", "b", "a", "c", "b", "a")
            .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        max(new ArrayList<>(freq.values())).ifPresent(System.out::println);
    }
}
```

---

## Go

```go
package main

import (
    "context"
    "errors"
    "fmt"
    "sync"
    "time"
)

// Interface and struct
type Worker interface {
    Do(ctx context.Context) error
}

type Task struct {
    ID    int
    Delay time.Duration
}

// Method with error return
func (t Task) Do(ctx context.Context) error {
    select {
    case <-ctx.Done():
        return fmt.Errorf("task %d: %w", t.ID, ctx.Err())
    case <-time.After(t.Delay):
        fmt.Printf("task %d done\n", t.ID)
        return nil
    }
}

// Generic function (Go 1.18+)
func Map[T, U any](s []T, fn func(T) U) []U {
    out := make([]U, len(s))
    for i, v := range s { out[i] = fn(v) }
    return out
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
    defer cancel()

    tasks := Map([]int{1, 2, 3}, func(i int) Worker {
        return Task{ID: i, Delay: time.Duration(i*50) * time.Millisecond}
    })

    var wg sync.WaitGroup
    errs := make([]error, len(tasks))
    for i, t := range tasks {
        wg.Add(1)
        go func(idx int, w Worker) {
            defer wg.Done()
            errs[idx] = w.Do(ctx)
        }(i, t)
    }
    wg.Wait()

    for _, err := range errs {
        if err != nil && !errors.Is(err, context.DeadlineExceeded) {
            fmt.Println("unexpected:", err)
        }
    }
}
```

---

## Rust

```rust
use std::{collections::HashMap, fmt};

// Trait with default method
trait Summary {
    fn summarize_author(&self) -> &str;
    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}

// Generic struct with lifetime
#[derive(Debug)]
struct Article<'a> {
    title:   &'a str,
    author:  &'a str,
    content: String,
}

impl<'a> Summary for Article<'a> {
    fn summarize_author(&self) -> &str { self.author }
    fn summarize(&self) -> String {
        format!("{}, by {} — {}", self.title, self.author, &self.content[..20])
    }
}

impl<'a> fmt::Display for Article<'a> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "[{}] {}", self.author, self.title)
    }
}

// Error handling with Result and ?
fn word_count(text: &str) -> Result<HashMap<&str, usize>, &'static str> {
    if text.is_empty() { return Err("empty input"); }
    let mut map = HashMap::new();
    for word in text.split_whitespace() {
        *map.entry(word).or_insert(0) += 1;
    }
    Ok(map)
}

fn main() {
    let article = Article {
        title:   "Rust in 2025",
        author:  "Alice",
        content: "Rust continues to grow in adoption...".into(),
    };

    println!("{}", article.summarize());

    // Pattern matching on Result
    match word_count(&article.content) {
        Ok(counts) => {
            let mut pairs: Vec<_> = counts.iter().collect();
            pairs.sort_by_key(|&(_, v)| std::cmp::Reverse(v));
            pairs.iter().take(3).for_each(|(w, c)| println!("{w}: {c}"));
        }
        Err(e) => eprintln!("Error: {e}"),
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Feature Test</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <!-- Semantic elements -->
  <header>
    <nav aria-label="Main">
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Hello <em>HTML</em></h1>

      <!-- Form with various input types -->
      <form method="post" action="/submit" novalidate>
        <label for="email">Email</label>
        <input id="email" type="email" name="email"
               placeholder="you@example.com" required />

        <select name="role">
          <option value="">— Select role —</option>
          <option value="admin">Admin</option>
          <option value="user" selected>User</option>
        </select>

        <textarea name="bio" rows="4" maxlength="500"></textarea>
        <button type="submit">Submit</button>
      </form>

      <!-- Table -->
      <table>
        <thead><tr><th scope="col">Name</th><th scope="col">Score</th></tr></thead>
        <tbody>
          <tr><td>Alice</td><td>92</td></tr>
          <tr><td>Bob</td>  <td>78</td></tr>
        </tbody>
      </table>
    </article>
  </main>

  <script src="app.js" defer></script>
</body>
</html>
```

---

## CSS

```css
/* Custom properties and reset */
:root {
  --color-primary: #007acc;
  --color-surface: #f9f9f9;
  --radius: 8px;
  --transition: 200ms ease;
}

*, *::before, *::after { box-sizing: border-box; }

/* Selector combinators and pseudo-classes */
body {
  font-family: system-ui, sans-serif;
  background: var(--color-surface);
  color: #333;
  margin: 0;
}

/* Nesting via :is() */
:is(h1, h2, h3) { color: var(--color-primary); }

/* Grid layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

/* Flexbox card */
.card {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  padding: 1rem;
  border-radius: var(--radius);
  box-shadow: 0 2px 8px rgb(0 0 0 / .08);
  transition: transform var(--transition);
}

.card:hover { transform: translateY(-2px); }

/* Animation */
@keyframes fade-in {
  from { opacity: 0; translate: 0 8px; }
  to   { opacity: 1; translate: 0 0;   }
}

.card { animation: fade-in .3s var(--transition) both; }

/* Media query */
@media (prefers-color-scheme: dark) {
  :root { --color-surface: #1a1a1a; }
  body  { color: #e0e0e0; }
}
```

---

## SCSS

```scss
// Variables and maps
$palette: (
  "primary":  #3498db,
  "success":  #2ecc71,
  "danger":   #e74c3c,
);

$breakpoints: (sm: 576px, md: 768px, lg: 1024px);

// Function
@function color($name) {
  @return map.get($palette, $name);
}

// Mixin with content block
@mixin respond-to($bp) {
  @media (min-width: map.get($breakpoints, $bp)) { @content; }
}

// Placeholder selector
%flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// Nesting, extend, interpolation
.btn {
  @extend %flex-center;
  padding: .5em 1.2em;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: filter 150ms ease;

  &:hover   { filter: brightness(1.1); }
  &:disabled { opacity: .5; cursor: not-allowed; }

  @each $name, $hex in $palette {
    &--#{$name} {
      background: $hex;
      color: #fff;
    }
  }

  @include respond-to(md) { padding: .6em 1.6em; }
}
```

---

## JSON

```json
{
  "name": "my-app",
  "version": "1.2.3",
  "private": true,
  "scripts": {
    "dev":   "vite",
    "build": "tsc && vite build",
    "test":  "vitest run"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "vite": "^5.2.0",
    "vitest": "^1.5.0"
  },
  "engines": { "node": ">=20" },
  "keywords": ["test", "highlight"],
  "license": "MIT"
}
```

---

## YAML

```yaml
# Docker Compose with multiple service types
version: '3.9'

x-logging: &default-logging
  driver: json-file
  options:
    max-size: "10m"
    max-file: "3"

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NODE_ENV: production
    image: my-app:latest
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: ${DATABASE_URL}
      JWT_SECRET:   ${JWT_SECRET}
    depends_on:
      db:
        condition: service_healthy
    logging: *default-logging
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_DB:       mydb
      POSTGRES_USER:     user
      POSTGRES_PASSWORD: secret
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "user"]
      interval: 10s
      retries: 5

volumes:
  pgdata:
```

---

## TOML

```toml
[package]
name    = "my-crate"
version = "0.3.1"
edition = "2021"
authors = ["Alice <alice@example.com>"]
description = "A minimal example crate"

[lib]
name = "my_crate"
crate-type = ["cdylib", "rlib"]

[dependencies]
serde       = { version = "1", features = ["derive"] }
tokio       = { version = "1", features = ["full"] }
anyhow      = "1"

[dev-dependencies]
criterion = "0.5"

[profile.release]
opt-level = 3
lto       = true
strip     = "symbols"

[features]
default  = ["json"]
json     = ["serde/json"]
full     = ["json", "yaml"]
```

---

## SQL

```sql
-- DDL: table with constraints
CREATE TABLE users (
    id         SERIAL       PRIMARY KEY,
    email      VARCHAR(255) NOT NULL UNIQUE,
    name       TEXT         NOT NULL,
    role       TEXT         NOT NULL DEFAULT 'user'
                           CHECK (role IN ('admin', 'user', 'guest')),
    created_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_email ON users (email);

-- CTE and window function
WITH ranked AS (
    SELECT
        u.id,
        u.name,
        COUNT(o.id)                                    AS order_count,
        SUM(o.total)                                   AS revenue,
        RANK() OVER (ORDER BY SUM(o.total) DESC)       AS revenue_rank
    FROM users  u
    JOIN orders o ON o.user_id = u.id
    WHERE o.created_at >= now() - INTERVAL '30 days'
    GROUP BY u.id, u.name
)
SELECT id, name, order_count, revenue
FROM   ranked
WHERE  revenue_rank <= 10
ORDER  BY revenue_rank;

-- Upsert
INSERT INTO users (email, name, role)
VALUES ('alice@example.com', 'Alice', 'admin')
ON CONFLICT (email)
DO UPDATE SET name = EXCLUDED.name,
              role = EXCLUDED.role;
```

---

## Dockerfile

```dockerfile
# syntax=docker/dockerfile:1

# ── Build stage ────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Cache dependency layer separately from source
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

# ── Runtime stage ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS runtime

ENV NODE_ENV=production \
    PORT=3000

# Non-root user
RUN addgroup -S app && adduser -S app -G app
USER app

WORKDIR /app
COPY --from=builder --chown=app:app /app/dist  ./dist
COPY --from=builder --chown=app:app /app/node_modules ./node_modules

EXPOSE $PORT

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget -qO- http://localhost:$PORT/health || exit 1

ENTRYPOINT ["node", "dist/index.js"]
```

---

## CMake

```cmake
cmake_minimum_required(VERSION 3.25)
project(MyApp VERSION 1.2.0 LANGUAGES CXX)

# Global settings
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

option(BUILD_TESTS "Build test suite" ON)

# Platform detection
if(WIN32)
    add_compile_definitions(PLATFORM_WINDOWS)
elseif(APPLE)
    add_compile_definitions(PLATFORM_MACOS)
else()
    add_compile_definitions(PLATFORM_LINUX)
endif()

# Library and executable
add_library(mylib STATIC src/mylib.cpp)
target_include_directories(mylib
    PUBLIC  $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
    PRIVATE src
)
target_compile_options(mylib PRIVATE
    $<$<CXX_COMPILER_ID:GNU,Clang>:-Wall -Wextra>
    $<$<CXX_COMPILER_ID:MSVC>:/W4>
)

add_executable(myapp main.cpp)
target_link_libraries(myapp PRIVATE mylib)

# Tests
if(BUILD_TESTS)
    enable_testing()
    add_subdirectory(tests)
endif()
```

---

## Makefile

```makefile
# Variables
BINARY  := myapp
SRC     := $(wildcard *.go)
VERSION := $(shell git describe --tags --always --dirty)
LDFLAGS := -ldflags "-X main.Version=$(VERSION)"

# Phony targets
.PHONY: all build test lint clean

all: lint test build

build: $(BINARY)

$(BINARY): $(SRC)
	go build $(LDFLAGS) -o $@ .

test:
	go test ./... -race -coverprofile=coverage.out
	go tool cover -func=coverage.out

lint:
	golangci-lint run ./...

clean:
	rm -f $(BINARY) coverage.out

# Pattern rule
%.pb.go: %.proto
	protoc --go_out=. $<
```

---

## Lua

```lua
-- Metatables and OOP
local Animal = {}
Animal.__index = Animal

function Animal.new(name, sound)
    return setmetatable({ name = name, sound = sound }, Animal)
end

function Animal:speak()
    return string.format("%s says %s", self.name, self.sound)
end

-- Inheritance
local Dog = setmetatable({}, { __index = Animal })
Dog.__index = Dog

function Dog.new(name)
    local self = Animal.new(name, "woof")
    return setmetatable(self, Dog)
end

function Dog:fetch(item)
    return string.format("%s fetches the %s!", self.name, item)
end

-- Coroutine
local function counter(max)
    return coroutine.wrap(function()
        for i = 1, max do coroutine.yield(i) end
    end)
end

-- Closures and varargs
local function sum(...)
    local total = 0
    for _, v in ipairs({...}) do total = total + v end
    return total
end

local dog = Dog.new("Rex")
print(dog:speak())
print(dog:fetch("ball"))

local gen = counter(3)
for v in gen do io.write(v .. " ") end
print()
print("sum:", sum(1, 2, 3, 4, 5))
```

---

## Swift

```swift
import Foundation

// Protocol with associated type
protocol Container {
    associatedtype Item
    var count: Int { get }
    mutating func append(_ item: Item)
    subscript(i: Int) -> Item { get }
}

// Generic struct conforming to protocol
struct Stack<T>: Container {
    private var items: [T] = []
    var count: Int { items.count }

    mutating func append(_ item: T) { items.append(item) }
    mutating func pop() -> T?       { items.popLast() }
    subscript(i: Int) -> T          { items[i] }
}

// Enum with associated values
enum Result<T, E: Error> {
    case success(T)
    case failure(E)

    func map<U>(_ transform: (T) -> U) -> Result<U, E> {
        switch self {
        case .success(let v): return .success(transform(v))
        case .failure(let e): return .failure(e)
        }
    }
}

// Error type and throwing function
struct ParseError: Error { let message: String }

func parseInt(_ s: String) throws -> Int {
    guard let n = Int(s) else { throw ParseError(message: "Invalid: \(s)") }
    return n
}

// Async / await
func fetchUser(id: Int) async throws -> String {
    try await Task.sleep(nanoseconds: 10_000_000)
    return "User \(id)"
}

var stack = Stack<Int>()
(1...3).forEach { stack.append($0) }
print(stack.pop() ?? -1)

let result = Result<Int, ParseError>.success(42).map { $0 * 2 }
if case .success(let v) = result { print(v) }
```

---

## Kotlin

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// Data class and sealed class
data class User(val id: Int, val name: String, val role: Role)

sealed class Role {
    object Admin  : Role()
    object Guest  : Role()
    data class Member(val level: Int) : Role()
}

// Extension function and operator overloading
operator fun User.plus(other: User) =
    listOf(this, other).sortedBy { it.id }

fun User.describe() = when (role) {
    is Role.Admin        -> "${name} is an admin"
    is Role.Guest        -> "${name} is a guest"
    is Role.Member       -> "${name} is member level ${(role as Role.Member).level}"
}

// Higher-order function with reified type
inline fun <reified T> List<*>.filterType(): List<T> =
    filterIsInstance<T>()

// Coroutine Flow
fun tickerFlow(count: Int): Flow<Int> = flow {
    repeat(count) { i ->
        delay(50)
        emit(i + 1)
    }
}

fun main() = runBlocking {
    val users = listOf(
        User(1, "Alice", Role.Admin),
        User(2, "Bob",   Role.Member(3)),
        User(3, "Carol", Role.Guest),
    )

    users.map(User::describe).forEach(::println)

    tickerFlow(3)
        .map { it * it }
        .collect { println("tick²: $it") }
}
```

---

## PHP

```php
<?php declare(strict_types=1);

// Enum (PHP 8.1+)
enum Status: string {
    case Active   = 'active';
    case Inactive = 'inactive';
    case Pending  = 'pending';

    public function label(): string {
        return match($this) {
            Status::Active   => 'Active',
            Status::Inactive => 'Inactive',
            Status::Pending  => 'Pending…',
        };
    }
}

// Interface and readonly properties (PHP 8.2+)
interface Serializable {
    public function toArray(): array;
}

class User implements Serializable {
    public function __construct(
        public readonly int    $id,
        public readonly string $name,
        public Status          $status = Status::Pending,
    ) {}

    public function toArray(): array {
        return ['id' => $this->id, 'name' => $this->name, 'status' => $this->status->value];
    }
}

// Named arguments, first-class callables, fibers
$users = array_map(
    fn(array $d) => new User(...$d),
    [['id' => 1, 'name' => 'Alice'], ['id' => 2, 'name' => 'Bob']]
);

$fiber = new Fiber(function (): void {
    $value = Fiber::suspend('first');
    echo "Resumed with: $value\n";
});

$first = $fiber->start();
echo $first . "\n";           // first
$fiber->resume('hello');       // Resumed with: hello

array_walk($users, fn($u) => print_r($u->toArray()));
```

---

## Perl

```perl
use strict;
use warnings;
use feature qw(say signatures);
no warnings 'experimental::signatures';

# Regular expressions
my $log = '2026-05-12 ERROR: connection timeout after 30s';
if ($log =~ /^(?<date>\d{4}-\d{2}-\d{2})\s+(?<level>\w+):\s+(?<msg>.+)$/) {
    say "Date:  $+{date}";
    say "Level: $+{level}";
    say "Msg:   $+{msg}";
}

# References and complex data structures
my %registry;

sub register($name, $handler) {
    $registry{$name} = $handler;
}

register('double', sub { $_[0] * 2 });
register('square', sub { $_[0] ** 2 });

for my $op (sort keys %registry) {
    printf "%s(5) = %d\n", $op, $registry{$op}->(5);
}

# Object via bless
package Counter;
sub new   { bless { count => 0 }, shift }
sub inc   { $_[0]->{count}++; $_[0] }
sub value { $_[0]->{count} }

package main;
my $c = Counter->new->inc->inc->inc;
say "Counter: " . $c->value;

# List manipulation
my @nums   = 1..10;
my @evens  = grep { $_ % 2 == 0 } @nums;
my @doubled = map  { $_ * 2 }     @evens;
say join ', ', @doubled;
```

---

## R

```r
# Vectors and vectorised operations
x <- c(2, 4, 6, 8, 10)
y <- x^2 + rnorm(length(x), sd = 5)

# Function with default arguments and error handling
safe_log <- function(x, base = exp(1)) {
  if (any(x <= 0)) stop("x must be positive")
  log(x, base)
}

# Apply family
result <- vapply(1:5, function(i) i^2, numeric(1))

# Data frame manipulation (base R)
df <- data.frame(
  name  = c("Alice", "Bob", "Carol"),
  score = c(92, 78, 85),
  pass  = c(TRUE, FALSE, TRUE)
)

passing <- df[df$pass, c("name", "score")]
passing$grade <- ifelse(passing$score >= 90, "A", "B")

# Simple linear model
fit <- lm(y ~ x)
cat(sprintf("R² = %.4f\n", summary(fit)$r.squared))

# List and environment
env <- new.env(parent = emptyenv())
env$counter <- 0L
increment <- function(e) { e$counter <- e$counter + 1L; invisible(e) }
increment(env)
cat("Counter:", env$counter, "\n")
```

---

## Haskell

```haskell
{-# LANGUAGE OverloadedStrings #-}
module Main where

import Data.List  (sortBy, group, sort)
import Data.Ord   (comparing, Down(..))
import Data.Maybe (mapMaybe)

-- Type alias and newtype
newtype Name = Name String deriving (Show, Eq, Ord)

-- Algebraic data type
data Shape
    = Circle    Double
    | Rectangle Double Double
    | Triangle  Double Double Double
    deriving (Show)

-- Type class instance
class HasArea a where
    area :: a -> Double

instance HasArea Shape where
    area (Circle r)      = pi * r * r
    area (Rectangle w h) = w * h
    area (Triangle a b c) =
        let s = (a + b + c) / 2
        in sqrt (s * (s-a) * (s-b) * (s-c))

-- Higher-order functions and function composition
describeShape :: Shape -> String
describeShape s = show s <> " has area " <> show (area s)

-- Word frequency using pointfree style
wordFreq :: String -> [(String, Int)]
wordFreq = take 5
         . sortBy (comparing (Down . snd))
         . map (\ws -> (head ws, length ws))
         . group
         . sort
         . words

-- Maybe chaining
safeDivide :: Double -> Double -> Maybe Double
safeDivide _ 0 = Nothing
safeDivide x y = Just (x / y)

main :: IO ()
main = do
    let shapes = [Circle 3, Rectangle 4 5, Triangle 3 4 5]
    mapM_ (putStrLn . describeShape) shapes

    let text = "the cat sat on the mat the cat"
    print $ wordFreq text

    print $ safeDivide 10 3 >>= safeDivide 100
```

---

## Lua (advanced)

```lua
-- Already covered above; this block tests long-form module pattern

local M = {}

-- Private state
local _cache = {}

-- Memoisation
function M.memoize(fn)
    return function(n)
        if _cache[n] == nil then
            _cache[n] = fn(n)
        end
        return _cache[n]
    end
end

local fib = M.memoize(function(n)
    if n < 2 then return n end
    -- Forward reference trick (upvalue)
    return fib(n - 1) + fib(n - 2)  ---@diagnostic disable-line
end)

-- Iterator factory
function M.range(from, to, step)
    step = step or 1
    return function(_, i)
        i = i + step
        if i <= to then return i end
    end, nil, from - step
end

for i in M.range(1, 5, 2) do io.write(i .. " ") end
print()

for i = 1, 8 do io.write(fib(i) .. " ") end
print()

return M
```

---

## Assembly (x86-64 NASM)

```asm
; x86-64 Linux syscall — write "Hello, World!\n" to stdout
; Assemble: nasm -f elf64 hello.asm && ld -o hello hello.o

section .data
    msg     db  "Hello, World!", 0x0A   ; string + newline
    msg_len equ $ - msg                 ; length computed at assemble time

section .bss
    buf     resb 64                     ; uninitialised buffer

section .text
    global _start

_start:
    ; write(1, msg, msg_len)
    mov     rax, 1          ; sys_write
    mov     rdi, 1          ; fd = stdout
    lea     rsi, [rel msg]  ; pointer to message (RIP-relative)
    mov     rdx, msg_len    ; byte count
    syscall

    ; Loop example: count down from 3 using r15 as counter
    mov     r15, 3
.loop:
    dec     r15
    jnz     .loop

    ; exit(0)
    mov     rax, 60         ; sys_exit
    xor     rdi, rdi        ; status = 0
    syscall
```

---

## Scheme

```scheme
;;; R7RS Scheme — closures, tail calls, macros, continuations

;; Higher-order functions
(define (compose . fns)
  (if (null? fns)
      (lambda (x) x)
      (let ((fn  (car fns))
            (rest (apply compose (cdr fns))))
        (lambda (x) (fn (rest x))))))

;; Tail-recursive Fibonacci
(define (fib n)
  (let loop ((i n) (a 0) (b 1))
    (if (= i 0) a
        (loop (- i 1) b (+ a b)))))

;; Association list as record
(define (make-point x y) (list (cons 'x x) (cons 'y y)))
(define (point-x p) (cdr (assq 'x p)))
(define (point-y p) (cdr (assq 'y p)))

;; Syntax-rules macro
(define-syntax swap!
  (syntax-rules ()
    ((_ a b)
     (let ((tmp a))
       (set! a b)
       (set! b tmp)))))

;; call/cc for early exit
(define (find-first pred lst)
  (call-with-current-continuation
    (lambda (return)
      (for-each (lambda (x)
                  (when (pred x) (return x)))
                lst)
      #f)))

;; Main
(display (map fib '(0 1 2 3 4 5 6 7 8)))
(newline)

(let ((p (make-point 3 4)))
  (display (point-x p))
  (display " ")
  (display (point-y p))
  (newline))

(display ((compose (lambda (x) (* x x))
                   (lambda (x) (+ x 1))) 4))
(newline)

(display (find-first even? '(1 3 5 6 7)))
(newline)
```
