---
layout: single
title: "Random forests"
date: 2025-08-30 13:31:00 +0200
categories: technical
excerpt: >
  A deep investigation on Random forests
author_profile: true
read_time: true
classes: [wide, full-bleed]  # <- add this custom class
header:
  overlay_image: /assets/images/linkedin post cover.png
  overlay_filter: 0.25
  caption: "Photo: …"
---

I have read a lot of articles talking about machine learning models and (I feel that) most of them are written for the sake of writing, a quick summary of the scikit-learn documentation peppered with some code to copy-paste and to *try it by yourself*. They talk quickly, they cite the things everyone already knows, and they rarely leave you with a sense of genuine understanding, until everyone of us started prefering videos (like from the amazing [Statquest with Josh Starmer](https://www.youtube.com/@statquest)). However, I don't think this type of videos can make us retain the information on the long run, we need depth and practice !

This is my attempt to fix that. I'm thinkin about this post as a sort of manual I wish I had when I started. The mission is to create the most comprehensive, deep, intuitive, and practicable guide to Random Forests, deconstructing the subject completely and leaving no stone unturned. We’ll start from the ground up, assuming nothing more than curiosity, no advanced degree required. The approach is to simplify every concept without sacrificing an ounce of depth, covering the theory, the intuition, the practical code, and even the research that pushes the boundaries (yes, all of it).

Our journey begins with the smallest possible unit of decision, a single leaf. We will learn to grow it into a single, fragile Decision Tree. From there, we will cultivate an entire forest of them, learning how their collective strength overcomes individual weakness. We will learn to be its caretaker, mastering the parameters that shape its growth. We will come to understand its complex ecosystem, interpreting what it has learned from the data. We will explore its more exotic species (the advanced variants for specialized tasks), and finally, we will look towards the horizon to see its future.

So let's begin where everything starts, with the most fundamental question of all: How do we get a machine to make a decision?

# Decision trees

Let's start with the absolute basics. At its core, most of the machine learning you see in the real world is about one thing: predicting the value of a column in a table, based on the values in the other columns. We are given a dataset of past observations (the "training data"), and our goal is to build a model that can intelligently guess the outcome for new, unseen data.

Let's use a realistic example, something you might actually encounter. Imagine you work for a bank, and your task is to predict whether a new loan applicant is likely to default on their loan. Your historical data might look something like this:

| Annual Income ($) | Age | Loan Amount ($) | Credit History | Defaulted |
| :--- | :--- | :--- | :--- | :--- |
| 35,000 | 24 | 10,000 | Good | No |
| 75,000 | 45 | 50,000 | Good | No |
| 28,000 | 29 | 15,000 | Poor | Yes |
| 110,000 | 52 | 20,000 | Excellent | No |
| 42,000 | 31 | 30,000 | Poor | Yes |

The final column, *Defaulted*, is what we want to predict. The other columns are our *features*. The question is, how do we build a system that learns the patterns from this table to make a prediction for a new applicant?

One way to think about this is to simply start asking questions. A human analyst might look at this data and instinctively create rules. "It seems like people with a *Poor* credit history and a high loan amount tend to default." This is a natural, intuitive way to reason, and it is precisely the logic that a Decision Tree formalizes.

Unlike many other machine learning techniques that try to find a single, complex mathematical formula to separate the data (like a linear model finding a line, or a neural network learning intricate transformations), a Decision Tree takes a much simpler approach. It just carves up the data. At its most primitive level, a tree builds a hierarchical partition of the input space. Each question it asks splits the space into two parts, and the data in each resulting branch gets progressively more homogeneous (or "purer") with respect to the outcome we're trying to predict.

So, a Decision Tree is not really "asking questions" in an abstract sense. It is constructing a flowchart of simple, binary splits. Each split is made on a single feature at a time, which are known as *axis-aligned cuts*. Why this method? Because these simple cuts are easy to compute and interpret, and by recursively applying them, they can approximate even very irregular and complex decision boundaries. After enough splits, each leaf of the tree corresponds to a small region in our data space. Inside that region, the tree makes the simplest prediction possible: the majority class for all the data points that ended up there.

This process of *recursive partitioning* is essentially a greedy search for structure. At each step, the tree zooms into a subset of the data where the patterns might be clearer. But this raises the most important question of all. With all the possible features and all their possible split points, how on earth does the tree decide which question is the *best* one to ask first?