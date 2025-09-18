---
title: "Mathematical Blockquotes Demo"
description: "Testing and demonstrating mathematical blockquote alerts with unified styling"
date: 2025-09-18
draft: false
weight: 1
categories: ["Testing"]
tags: ["mathematics", "blockquotes", "demo", "alerts"]
---

# Mathematical Blockquotes Demo

This page demonstrates the complete mathematical blockquote system with GitHub-style alert syntax using `{}` brackets.

## Basic Mathematical Alerts

> [!THEOREM]
> Every continuous function on a closed and bounded interval attains its maximum and minimum values.

> [!LEMMA]
> If f is continuous on [a,b] and f(a) < 0 < f(b), then there exists c ∈ (a,b) such that f(c) = 0.

> [!DEFINITION]
> A function f: R → R is said to be continuous at point a if for every ε > 0, there exists δ > 0 such that |x - a| < δ implies |f(x) - f(a)| < ε.

## Numbered Mathematical Results

> [!THEOREM]{1.1}
> (Intermediate Value Theorem) If f is continuous on [a,b] and k is between f(a) and f(b), then there exists c ∈ (a,b) such that f(c) = k.

> [!LEMMA]{2.3}
> Every bounded sequence in R has a convergent subsequence.

> [!COROLLARY]{1.2}
> A continuous function on a closed interval is uniformly continuous.

## Named Mathematical Results

> [!THEOREM]{3.1 Fundamental Theorem of Calculus}
> If f is continuous on [a,b], then the function F(x) = ∫ₐˣ f(t)dt is differentiable on (a,b) and F'(x) = f(x).

> [!DEFINITION]{Vector Space}
> A vector space V over a field F is a set equipped with two operations: vector addition and scalar multiplication, satisfying eight axioms.

> [!PROPOSITION]{4.2 Cauchy-Schwarz Inequality}
> For vectors u and v in an inner product space, |⟨u,v⟩| ≤ ‖u‖‖v‖.

## Short Form Syntax

> [!THM]{5.1}
> Every finite-dimensional normed vector space is complete.

> [!LEM]{6.2}
> If {xₙ} is a Cauchy sequence in a complete metric space, then it converges.

> [!DEF]{Metric Space}
> A metric space is a set M together with a function d: M × M → R satisfying the triangle inequality and other metric axioms.

## Proof and Examples

> [!PROOF]
> We proceed by contradiction. Assume that f is not continuous at some point c ∈ [a,b]. Then there exists ε > 0 such that for all δ > 0, there exists x with |x - c| < δ but |f(x) - f(c)| ≥ ε. This contradicts the uniform continuity of f on [a,b]. ∎

> [!EXAMPLE]{7.1}
> Consider the function f(x) = x² on the interval [-1,1]. This function achieves its minimum value 0 at x = 0 and its maximum value 1 at x = ±1.

> [!REMARK]
> The condition that the interval be closed and bounded is essential. The function f(x) = x on the open interval (0,1) does not attain its supremum.

## Mixed with Standard GitHub Alerts

> [!NOTE]
> This is a standard GitHub note alert for comparison.

> [!WARNING]
> Pay attention to the domain restrictions in the theorems above.

> [!IMPORTANT]
> All theorems assume the underlying space has the required topological properties.

> [!THEOREM]{Final Result}
> The mathematical blockquote system provides consistent styling across all alert types while maintaining semantic meaning.

## Complete Set of Mathematical Types

> [!THEOREM]{A.1}
> Theorem with blue styling and mathematical icon.

> [!LEMMA]{A.2}
> Lemma with green styling and search icon.

> [!DEFINITION]{A.3}
> Definition with purple styling and book icon.

> [!COROLLARY]{A.4}
> Corollary with red styling and arrow icon.

> [!PROPOSITION]{A.5}
> Proposition with orange styling and lightbulb icon.

> [!PROOF]
> Proof with gray styling, designed for mathematical proofs.

> [!EXAMPLE]{A.6}
> Example with teal styling for concrete illustrations.

> [!REMARK]
> Remark with purple styling for additional observations.