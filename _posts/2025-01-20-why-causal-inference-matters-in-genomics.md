---
layout: blog-post
title: "Why Causal Inference Matters in Genomics"
subtitle: "Moving beyond correlation to understand what genes actually do"
date: 2025-01-20
tags:
  - Causal Inference
  - Genomics
  - Methods
---

For decades, genomics has been a science of correlation. We measure which genes are expressed together, which variants co-occur with disease, which regulatory elements are accessible in specific cell types. These correlations have been enormously productive — they've generated thousands of associations and pointed to biological processes worth investigating. But correlation is not causation, and the limits of purely correlational genomics are becoming apparent.

## The Problem With Correlation

Consider a classic example: gene A and gene B are highly co-expressed across many cell types and conditions. Does A regulate B, does B regulate A, are they co-regulated by a third factor C, or are they simply expressed in the same cell types for independent reasons? A co-expression analysis cannot distinguish between these scenarios.

This matters enormously when we want to:

- **Understand disease mechanisms.** If variant X is associated with disease Y, is there a causal path from X to Y, or are they linked through population structure, confounding, or reverse causation?
- **Predict intervention effects.** If we inhibit gene A, what happens? A model trained purely on observational data will fail to predict the effects of perturbations it has never seen.
- **Design therapies.** Drug targets need causal support — we need to know that modulating the target will change the outcome, not just that they are correlated.

## What Makes a Causal Framework Different?

A causal framework asks a different question: *what would happen if we intervened?* This is formalized by Pearl's do-calculus and structural causal models. Instead of asking "given that we observe gene A is highly expressed, what do we expect gene B to be?", we ask "if we force gene A to be expressed at level x, what does gene B do?"

These questions have different answers, and the difference can be dramatic.

> "The fundamental problem of causal inference is that we can never observe the same unit under two different treatments simultaneously."
> — Holland, 1986

The solution in genomics has increasingly been **perturbation experiments**: CRISPR screens, overexpression studies, RNA interference. These directly intervene on the system, giving us observational access to something closer to causal effects.

## Instrumental Variables in Gene Regulation

One powerful approach that doesn't require direct perturbation is **instrumental variable (IV) estimation**, borrowed from econometrics. The idea: find a variable that affects gene A but has no direct effect on gene B except through A. Natural candidates in genomics are **cis-eQTLs** — genetic variants that affect the expression of a nearby gene.

The IV approach gives us:

1. A genetic variant Z that shifts expression of gene A (relevance)
2. Z affects gene B only through A, not through other paths (exclusion restriction)
3. Z is independent of confounders (independence)

Under these assumptions, we can estimate the causal effect of A on B using the genetic variant as an instrument. This is the basis of **Mendelian randomization**, which has become a workhorse of causal epidemiology.

## Challenges and Open Problems

Of course, it's never quite this clean. Pleiotropy — a variant affecting multiple traits — violates the exclusion restriction. Weak instruments (variants with small effects on expression) give noisy estimates. And the linear assumptions baked into standard IV models may not hold for gene regulation, which is highly nonlinear and context-dependent.

My own work has been trying to address some of these problems by combining IV estimation with the rich perturbation datasets now available (e.g., the Replogle et al. Perturb-seq dataset with ~10,000 gene knockdowns). The perturbation data lets us validate causal claims and relax some of the linearity assumptions.

## Looking Forward

The field is converging on a synthesis: use perturbation experiments to generate causal training data, use observational data (and genetic instruments) to extend causal claims beyond the perturbations we've performed, and use machine learning to handle the scale and nonlinearity that classical causal methods struggle with.

I think this is genuinely one of the most exciting methodological frontiers in computational biology right now. The datasets are getting good enough, the methods are maturing, and the biological questions that demand causal answers are pressing.

If you're interested in the technical details, the paper is linked on my research page. Happy to discuss further — feel free to reach out.
