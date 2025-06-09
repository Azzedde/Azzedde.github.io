---
layout: single
title: "Blog Posts"
permalink: /blog-posts/
---

<div class="posts-grid">
  {% for post in site.posts %}
    <article class="post-card">
      <h2 class="post-title">
        <a href="{{ post.url }}">{{ post.title }}</a>
      </h2>

      <p class="post-summary">
        {{ post.summary | default: post.excerpt }}

        {% if post.categories %}
          <span class="post-cats">
            {% for cat in post.categories %}
              <a href="{{ site.baseurl }}/categories/{{ cat | slugify }}/"
                 class="cat-pill">
                {{ cat }}
              </a>
            {% endfor %}
          </span>
        {% endif %}
      </p>
    </article>
  {% endfor %}
</div>

