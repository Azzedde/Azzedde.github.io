---
layout: single
title: 📚 Reading List
permalink: /reading-list/
classes: [wide, full-bleed]
---


A curated collection of papers I'm reading, planning to read, or have completed. This table helps me track my progress and whether I've created detailed cards for each paper.

<div class="reading-list-container">
  <table class="reading-list-table">
    <thead>
      <tr>
        <th class="status-col">Status</th>
        <th class="title-col">Paper Title</th>
        <th class="card-col">Card Created</th>
        <th class="notes-col">Notes</th>
      </tr>
    </thead>
    <tbody>
      {% for paper in site.data.reading_list %}
        {% case paper.status %}
          {% when "not_started" or "not-started" %}
            {% assign status_class = "status-not-started" %}
            {% assign status_badge = "Not Started" %}
            {% assign status_badge_class = "not-started" %}
          {% when "currently_reading" or "currently-reading" %}
            {% assign status_class = "status-currently-reading" %}
            {% assign status_badge = "Reading" %}
            {% assign status_badge_class = "currently-reading" %}
          {% when "completed" %}
            {% assign status_class = "status-completed" %}
            {% assign status_badge = "Completed" %}
            {% assign status_badge_class = "completed" %}
        {% endcase %}
        
        {% if paper.card_created %}
          {% assign card_status = "✅ Yes" %}
          {% assign card_class = "has-card" %}
        {% else %}
          {% assign card_status = "❌ No" %}
          {% assign card_class = "no-card" %}
        {% endif %}
        
        <tr class="{{ status_class }}">
          <td class="status-cell">
            <span class="status-badge {{ status_badge_class }}">{{ status_badge }}</span>
          </td>
          <td class="title-cell">
            <a href="{{ paper.url }}" target="_blank" rel="noopener noreferrer">
              {{ paper.title }}
            </a>
          </td>
          <td class="card-cell">
            <span class="card-status {{ card_class }}">{{ card_status }}</span>
          </td>
          <td class="notes-cell">{{ paper.notes }}</td>
        </tr>
      {% endfor %}
    </tbody>
  </table>
</div>

<style>
.reading-list-container {
  margin: 2rem 0;
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.reading-list-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  font-size: 0.95rem;
}

.reading-list-table th {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  font-weight: 600;
  padding: 1rem 0.75rem;
  text-align: left;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #ecf0f1;
}

.reading-list-table td {
  padding: 1rem 0.75rem;
  border-bottom: 1px solid #ecf0f1;
  vertical-align: top;
}

.reading-list-table tr:last-child td {
  border-bottom: none;
}

.reading-list-table tr:hover {
  background-color: #f8f9fa;
  transition: background-color 0.2s ease;
}

/* Status badges */
.status-badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.not-started {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
}

.status-badge.currently-reading {
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  color: white;
}

.status-badge.completed {
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
}

/* Card status */
.card-status {
  font-weight: 600;
  font-size: 0.9rem;
}

.card-status.has-card {
  color: #27ae60;
}

.card-status.no-card {
  color: #e74c3c;
}

/* Column widths */
.status-col { width: 120px; }
.title-col { width: 50%; min-width: 400px; }
.card-col { width: 100px; }
.notes-col { width: 30%; min-width: 200px; }

/* Title links */
.title-cell a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.title-cell a:hover {
  color: #3498db;
  text-decoration: underline;
}

/* Responsive design */
@media (max-width: 1200px) {
  .reading-list-table {
    font-size: 0.9rem;
  }
  
  .reading-list-table th,
  .reading-list-table td {
    padding: 0.8rem 0.6rem;
  }
}

@media (max-width: 768px) {
  .reading-list-container {
    margin: 1rem -1rem;
    border-radius: 0;
  }
  
  .reading-list-table {
    font-size: 0.85rem;
  }
  
  .status-badge {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
  }
}

/* Row styling based on status */
.status-not-started {
  background-color: #fff5f5;
}

.status-currently-reading {
  background-color: #fffaf0;
}

.status-completed {
  background-color: #f0fff4;
}

.status-not-started:hover {
  background-color: #ffe5e5 !important;
}

.status-currently-reading:hover {
  background-color: #fff0d9 !important;
}

.status-completed:hover {
  background-color: #e6ffe6 !important;
}
</style>