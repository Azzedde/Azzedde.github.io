---
layout: single
title: "Linear regression"
date: 2025-09-27 11:16:00 +0200
categories: technical
excerpt: >
  A very, very deep research on linear regression and the wisdom behind it!
author_profile: true
read_time: true
classes: [wide, full-bleed]  # <- add this custom class
header:
  overlay_image: /assets/images/linear-regression-cover.jpg
  overlay_filter: 0.25
  caption: "Read pleaase, if you feel bored, your loss!"
---


The world is fascinating, and math is one of our best tools to make sense of it. Of course, we can never capture everything with perfect precision, there are always hidden factors we can’t measure or predict. But that doesn’t mean we need to stop trying.

What fascinates me is this very simple idea: if we know how a phenomenon has behaved in the past, and we have a historical record of it, then we can, with some confidence (never with absolute certainty), guess how it will behave under certain conditions. And sometimes, we don’t even need advanced statistics or machine learning, our minds alone are often capable of making these predictions.

We actually do this all the time in our daily lives. We use our own experience to deduce outcomes from specific factors we observe. For instance, if we are in the northern hemisphere of Earth and the sky is thick with clouds, we confidently expect rain. Or about the housing market: even without a formula, we can predict that rent in Paris will be high if an apartment is near luxury neighborhoods and has many rooms, while in smaller cities it will be far less expensive. People who work in real estate can often guess the price of a property with striking accuracy because they’ve absorbed patterns from seeing thousands of examples. Their intuition is built from exposure, from past data.

To make this more concrete, let’s take a playful summer example, imagine we run a small experiment: each day we note the average temperature, we ask a group of people how many ice creams they bought (then we calculate the quantity in cL of how much they consumed), and we measure their “sunburn index” on a scale from 0 to 10 (where 0 means no redness at all, and 10 means very strong sunburn, measured with a handheld erythema device). And we can see the results of our small experiment in the following table: 

| day | temperature (°C) | sunburn index (0–10) | ice creams (cl) |
| --: | ---------------: | -------------------: | ----------------: |
|   1 |             18.0 |                 0.50 |                28 |
|   2 |             20.0 |                 1.19 |                39 |
|   3 |             22.0 |                 2.52 |                45 |
|   4 |             24.0 |                 3.58 |                49 |
|   5 |             26.0 |                 4.10 |                61 |
|   6 |             28.0 |                 5.29 |                65 |
|   7 |             30.0 |                 6.63 |                79 |
|   8 |             31.0 |                 7.09 |                80 |
|   9 |             32.0 |                 7.70 |                83 |
|  10 |             33.0 |                 8.10 |                86 |
|  11 |             34.0 |                 8.96 |                96 |
|  12 |             35.0 |                 9.50 |                96 |

What we find is that both ice cream consumption and sunburn levels rise together. Of course seeing it in a table will be always difficult, that's why we very often plot our data and visualize each line in a data point where the two axis are the two columns we are interested in:

<figure class="align-center" style="width:90%">
<img src="/assets/images/sunburn_vs_icecream.png" alt="Our data plotted sunburn index vs ice screams bought">
</figure>

At first glance, it looks like eating ice cream somehow causes more sunburn, or that sunburned people crave ice cream! This is what we call correlation (in math it has a formal definition that you will discover if you continue reading ;) ), “when one is above its usual level, the other tends to be above its usual level too” (and when one is below, the other tends to be below). That “togetherness of wiggles” is what correlation measures.

You are probably starting to feel now that this concept of correlation is not just a curiosity—it’s actually very important if we want to predict one value from another. Think about it: if two variables really move together, then knowing one should give us some information about the other. In our toy dataset, we might want to predict how much ice cream is bought based on sunburn, or vice versa. But here’s the catch: in real datasets, not every column matters. Some features in the table will have nothing to do with the target we want to predict. So before we can even dream of fitting a “best line,” we need a way to measure, cleanly and mathematically, whether two variables really *do* move together. That’s the motivation behind correlation.

The first thing we need is a notion of what’s *typical*. For each variable, we take the **average**, the mean, over all days. This number is our baseline. 

For sunburn ((x)) and ice cream ((y)) we calculate:

$$\bar{x} = \frac{1}{n}\sum_{i=1}^n x_i = 5.43, \quad \bar{y} = \frac{1}{n}\sum_{i=1}^n y_i = 67.25$$


Now that we know the typical level, we can ask: how much does each day differ from it? For the first day (day 1 in the table, which is the first line):

$$x_1 - \bar{x} = 0.5 - 5.43 = -4.93, \quad y_1 - \bar{y} = 28 - 67.25 = −39.25$$


So both variables are *below* their usual level on day 1.


How can we know whether they are moving in the same direction? We multiply the deviations and simply check their sign:

$$(x_1 - \bar{x})(y_1 - \bar{y}) = (-4.93)(−39.25) = 193.5025$$

The product is **positive**, which means both were below their average together. If one had been above while the other below, the product would be negative.

Let’s check another day: day 12, where sunburn = (9.5) and ice cream = (96). Deviations:

$$9.5 - 5.43  = +4.07, \quad 96 - 67.25 = +28.75$$

Multiply:

$$(+4.07)(+28.75) = +117.0125$$


Again positive, so they are both above average that day.


Doing this multiplication for just one day or two is not meaningful. What we want is the **overall pattern**: do they tend to move together across the whole dataset? So we sum up all those products across days, and then average them:

$$\operatorname{Cov}(x,y) = \frac{1}{n-1}\sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})$$

This number is called the **covariance**. If it’s strongly positive, then when sunburn is above its average, ice cream is usually above its average too (and the same when they are both below). If it’s strongly negative, they tend to move in opposite directions. If it’s close to zero, they move independently, without a linear relationship.

Let's continue our previous calculations to have a clear image:
$$
\begin{aligned}
\text{Given }& n=12,\quad 
\bar{x}=\frac{1}{12}\sum_{i=1}^{12} x_i = 5.43,\quad 
\bar{y}=\frac{1}{12}\sum_{i=1}^{12} y_i = 67.25.\\[6pt]
\operatorname{Cov}(x,y) 
&= \frac{1}{n-1}\sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y})\\[4pt]
&= \frac{1}{11}\Big[
(0.50-5.43)(28-67.25)
+(1.19-5.43)(39-67.25)\\
&\qquad\quad
+(2.52-5.43)(45-67.25)
+(3.58-5.43)(49-67.25)\\
&\qquad\quad
+(4.10-5.43)(61-67.25)
+(5.29-5.43)(65-67.25)\\
&\qquad\quad
+(6.63-5.43)(79-67.25)
+(7.09-5.43)(80-67.25)\\
&\qquad\quad
+(7.70-5.43)(83-67.25)
+(8.10-5.43)(86-67.25)\\
&\qquad\quad
+(8.96-5.43)(96-67.25)
+(9.50-5.43)(96-67.25)
\Big]\\[6pt]
&= \frac{1}{11}\Big[
(-4.93)(-39.25)
+(-4.24)(-28.25)
+(-2.91)(-22.25)
+(-1.85)(-18.25)\\
&\qquad\quad
+(-1.33)(-6.25)
+(-0.14)(-2.25)
+(1.20)(11.75)
+(1.66)(12.75)\\
&\qquad\quad
+(2.27)(15.75)
+(2.67)(18.75)
+(3.53)(28.75)
+(4.07)(28.75)
\Big]\\[6pt]
&= \frac{1}{11}\Big[
193.5025
+119.78
+64.7475
+33.7625
+8.3125
+0.3150\\
&\qquad\quad
+14.10
+21.165
+35.7525
+50.0625
+101.4875
+117.0125
\Big]\\[6pt]
&= \frac{1}{11}\times 760.0000\\[4pt]
&= 69.0909 \;\;(\approx 69.09).
\end{aligned}
$$

Why do we divide by $$(n-1)$$ instead of just summing? Because we want an *average* measure, not one that grows just because we added more days. Dividing makes the quantity independent of the number of observations, so we can compare across datasets of different sizes. The (n-1) instead of (n) is a statistical adjustment: it corrects a small bias because we estimated the mean from the same data (this is called Bessel’s correction). In practice, just think of it as “we want the fair average co-movement per day.”

At this point, you might notice a problem. The covariance has strange units, what does the number 69.0909 mean ? Are we really just interested in its sign ? You're right to say this. In our case, the units of the result is **sunburn-index × centiliters of ice cream**. That unit doesn’t mean anything by itself, it’s not a physical quantity we can interpret. Even worse, if we change the units of measurement, the covariance changes its value dramatically. For instance, if we measured ice cream in **milliliters** instead of centiliters, all values of (y) would be multiplied by 10. That means every deviation $$(y_i - \bar y)$$ is multiplied by 10, and so is the covariance. Suddenly the covariance number is ten times bigger, even though the *pattern* of co-movement hasn’t changed at all.

This shows why covariance alone isn’t enough. It captures the direction and rough strength of the relationship, but it is scale-dependent and unit-dependent. What we really want is a pure number that tells us about the *strength of the relationship only*, free of units. This is exactly why we need **correlation**, which is just the normalized version of covariance.

