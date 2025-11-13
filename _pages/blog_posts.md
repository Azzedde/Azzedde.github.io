---
layout: single
title: "Blog Posts"
permalink: /blog-posts/
---


<div class="posts-grid">
  {% for post in site.posts %}
    <article class="post-card">
      <h2 class="post-title">
        {% if post.external_url %}
          <a href="{{ post.external_url }}" target="_blank" rel="noopener">
            {{ post.title }}
          </a>
        {% else %}
          <a href="{{ post.url }}">
            {{ post.title }}
          </a>
        {% endif %}
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


