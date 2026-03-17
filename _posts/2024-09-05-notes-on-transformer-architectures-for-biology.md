---
layout: blog-post
title: "Notes on Transformer Architectures for Biology"
subtitle: "What actually transfers from NLP, and where the analogies break down"
date: 2024-09-05
tags:
  - Deep Learning
  - Transformers
  - Genomics
---

When BERT arrived in 2018, it wasn't long before biologists started wondering: could the same architecture work on DNA sequences? By now we have dozens of "genomic foundation models" — DNABERT, Nucleotide Transformer, Hyena-DNA, Caduceus — and the answer is clearly yes, with caveats. But I think a lot of people are applying these models without fully appreciating where the analogy to language holds and where it breaks down.

Here are some honest notes after spending a year evaluating them.

## What Transfers Well

**Pre-training on unlabeled sequences works.** The core insight from NLP — that a model trained to predict masked tokens on a large corpus learns useful representations — transfers. Models pre-trained on large genomic databases consistently outperform task-specific models trained from scratch on small datasets. This is the main practical value of genomic foundation models right now.

**Attention patterns are interpretable.** Like in language models, attention maps in genomic transformers often capture biologically meaningful structure — motif positions, promoter-TSS distances, known regulatory interactions. This isn't guaranteed, but it's often true, and it's useful for interpretation.

**Tokenization matters.** In NLP, subword tokenization was a key insight. In genomics, the equivalent debate is k-mer size and overlapping vs. non-overlapping tokens. The choices interact with the biological scale of the features you care about.

## Where the Analogy Breaks Down

**Sequences are much longer.** The human genome is 3 billion base pairs. Even a single gene with its regulatory context can span hundreds of kilobases. Standard attention is O(n²) in sequence length, which becomes prohibitive fast. This has driven a cottage industry of efficient attention variants — but most come with tradeoffs that aren't always disclosed clearly.

**There is no "word" boundary.** In language, words have clear semantic units. In DNA, functional elements (TFBS, splice sites, promoters) overlap, are context-dependent, and occur at varying densities. The tokenization choices are less principled than in NLP.

**The training signal is different.** Masked language modeling works in NLP because predicting masked tokens requires understanding context. In DNA, predicting a masked base is often almost trivially predictable from flanking sequence (because of low-complexity regions) or conversely nearly impossible (in highly conserved regulatory elements). The signal-to-noise is much less favorable.

**Mutations are not like word substitutions.** In NLP fine-tuning, the model sees normal text. In variant effect prediction, we're asking about mutations — point changes, insertions, deletions — that may never appear in the training corpus. The distribution shift is significant.

## A Practical Recommendation

For most tasks, the right question is not "which foundation model is best?" but "do I need a foundation model at all?"

If your dataset is large (>10k labeled examples), task-specific architectures trained from scratch are often competitive and easier to reason about. Foundation models add the most value in data-limited regimes, which are common in genomics (rare diseases, specific cell types, etc.).

If you do use a foundation model, evaluate carefully on your specific task. The ranking of models changes substantially across tasks — there's no universal winner, despite what some benchmark papers suggest.

## What I'm Watching

The models I'm most excited about are those that incorporate *structure* beyond raw sequence: chromatin accessibility, 3D genome organization, evolutionary conservation. Pure sequence models are fundamentally limited by the fact that the same sequence can have very different functions in different cell types. Multi-modal models that integrate regulatory context are where I think the field is heading.

That's not to say sequence models aren't useful now — they absolutely are. But I expect the biggest gains in the next few years to come from better integration of modalities, not from scaling sequence models further.

More to say on this — the benchmark paper referenced on my research page goes into much more detail. Comments welcome.
