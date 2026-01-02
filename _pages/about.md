---
layout: about
title: about
permalink: /
subtitle: Undergraduate Student | United International University

profile:
  align: right
  # image: prof_pic.jpg
  image: tanvir.jpeg
  image_circular: false # crops the image to make it circular
  more_info: true # enables social icon buttons below profile picture

selected_papers: false # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: false # disabled because we're using custom news section below
  scrollable: true
  limit: 50

latest_posts:
  enabled: false
  scrollable: true
  limit: 3
---

I am an undergraduate student at **[United International University (UIU)](https://www.uiu.ac.bd/)** with a strong academic focus and a passion for research in **Video Understanding**, **Large Language Models (LLMs)**, **Human-Computer Interaction (HCI)**, and **AI Privacy**. Currently, I serve as a **Student Researcher** at **[TriModal AI Lab](https://trimodal-ai.github.io/)** and an **Undergraduate Teaching Assistant**. My work bridges the gap between algorithmic theory and real-world AI applications. Beyond research, I am fascinated by the elegance of Data Structures and Algorithms, having solved hundreds of problems across various online judges. 

<div style="clear: both;"></div>

<!-- News Section -->
<section id="news" class="scroll-section">
  <h2>News</h2>
  {% include news.liquid %}
</section>

<!-- Projects Section -->
<section id="projects" class="scroll-section">
  <h2>Projects</h2>
  <div class="projects">
    {% if site.data.resume.projects and site.data.resume.projects.size > 0 %}
      <div class="row">
        {% for project in site.data.resume.projects %}
          <div class="col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">{{ project.name }}</h5>
                <p class="card-text">{{ project.summary }}</p>
                {% if project.highlights and project.highlights.size > 0 %}
                  <ul class="small">
                    {% for highlight in project.highlights %}
                      <li>{{ highlight }}</li>
                    {% endfor %}
                  </ul>
                {% endif %}
                {% if project.url %}
                  <a href="{{ project.url }}" class="btn btn-sm btn-primary" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-github"></i> View Project
                  </a>
                {% endif %}
              </div>
              {% if project.startDate %}
                <div class="card-footer text-muted small">
                  {% assign startDate = project.startDate | date: "%b %Y" %}
                  {% if project.endDate and project.endDate != "" %}
                    {% assign endDate = project.endDate | date: "%b %Y" %}
                    {{ startDate }} - {{ endDate }}
                  {% else %}
                    {{ startDate }} - Present
                  {% endif %}
                </div>
              {% endif %}
            </div>
          </div>
        {% endfor %}
      </div>
    {% else %}
      <p class="text-muted">Coming soon...</p>
    {% endif %}
  </div>
</section>

<!-- Repositories Section -->
<section id="repositories" class="scroll-section">
  <h2>Repositories</h2>
  
  {% if site.data.repositories.github_repos %}
    <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
      {% for repo in site.data.repositories.github_repos %}
        {% include repository/repo.liquid repository=repo %}
      {% endfor %}
    </div>
  {% else %}
    <p class="text-muted">Coming soon...</p>
  {% endif %}
</section>

<!-- Publications Section -->
<section id="publications" class="scroll-section">
  <h2>Publications</h2>
  <div class="publications">
    {% capture bib_output %}{% bibliography %}{% endcapture %}
    {% if bib_output contains 'bibliography' or bib_output.size > 50 %}
      {% include bib_search.liquid %}
      {{ bib_output }}
    {% else %}
      <div class="publication-placeholder" style="padding: 1.5rem; background-color: var(--global-card-bg-color); border-left: 3px solid var(--global-theme-color); border-radius: 0.25rem;">
        <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">
          <strong>Multiple manuscripts in preparation</strong> regarding <em>Video Understanding</em> and <em>LLM Privacy</em>. Please check back soon for updates.
        </p>
      </div>
    {% endif %}
  </div>
</section>

<!-- Experiences Section -->
<section id="experiences" class="scroll-section">
  <h2>Experiences</h2>
  <div class="experiences-section">
    {% if site.data.resume.work and site.data.resume.work.size > 0 %}
      <ul class="card-text font-weight-light list-group list-group-flush">
        {% assign work_items = site.data.resume.work | sort: 'startDate' | reverse %}
        {% for content in work_items %}
          <li class="list-group-item">
            <div class="row">
              <div class="col-xs-2 cl-sm-2 col-md-2 text-center date-column">
                {% if content.startDate %}
                  {% assign startDate = content.startDate | split: '-' | slice: 0, 2 | join: '.' %}
                  {% assign endDate = content.endDate | split: '-' | slice: 0, 2 | join: '.' | default: 'Present' %}
                  {% assign date = startDate | append: ' - ' %}
                  {% assign date = date | append: endDate %}
                {% else %}
                  {% assign date = '' %}
                {% endif %}
                <table class="table-cv">
                  <tbody>
                    <tr>
                      <td>
                        <span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px"> {{ date }} </span>
                      </td>
                    </tr>
                    {% if content.location %}
                      <tr>
                        <td>
                          <p class="location">
                            <i class="fa-solid fa-location-dot iconlocation"></i>
                            {{ content.location }}
                          </p>
                        </td>
                      </tr>
                    {% endif %}
                  </tbody>
                </table>
              </div>
              <div class="col-xs-10 cl-sm-10 col-md-10 mt-2 mt-md-0">
                <h6 class="title font-weight-bold ml-1 ml-md-4">
                  <a href="{{ content.url }}">{{ content.position }}</a>
                </h6>
                <h6 class="ml-1 ml-md-4" style="font-size: 0.95rem">{{ content.name }}</h6>
                <h6 class="ml-1 ml-md-4" style="font-size: 0.95rem; font-style: italic">{{ content.summary }}</h6>
                <ul class="items">
                  {% for item in content.highlights %}
                    <li>
                      <span class="item">{{ item }}</span>
                    </li>
                  {% endfor %}
                </ul>
              </div>
            </div>
          </li>
        {% endfor %}
      </ul>
    {% else %}
      <p>No work experience available.</p>
    {% endif %}
  </div>
</section>

<!-- Education Section -->
<section id="education" class="scroll-section">
  <h2>Education</h2>
  <div class="education-section">
    {% if site.data.resume.education and site.data.resume.education.size > 0 %}
      <ul class="card-text font-weight-light list-group list-group-flush">
        {% assign education_items = site.data.resume.education | sort: 'startDate' | reverse %}
        {% for content in education_items %}
          <li class="list-group-item">
            <div class="row">
              <div class="col-xs-2 cl-sm-2 col-md-2 text-center date-column">
                {% if content.startDate and content.startDate != '' %}
                  {% assign startDate = content.startDate | split: '-' | slice: 0, 2 | join: '.' %}
                  {% assign endDate = content.endDate | split: '-' | slice: 0, 2 | join: '.' | default: 'Present' %}
                  {% assign date = startDate | append: ' - ' %}
                  {% assign date = date | append: endDate %}
                {% else %}
                  {% assign date = null %}
                {% endif %}
                <table class="table-cv">
                  <tbody>
                    <tr>
                      <td>
                        {% if date %}
                          <span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px"> {{ date }} </span>
                        {% endif %}
                      </td>
                    </tr>
                    {% if content.location %}
                      <tr>
                        <td>
                          <p class="location">
                            <i class="fa-solid fa-location-dot iconlocation"></i>
                            {{ content.location }}
                          </p>
                        </td>
                      </tr>
                    {% endif %}
                  </tbody>
                </table>
              </div>
              <div class="col-xs-10 cl-sm-10 col-md-10 mt-2 mt-md-0">
                <h6 class="title font-weight-bold ml-1 ml-md-4">
                  <a href="{{ content.url }}">{{ content.studyType }}</a>
                </h6>
                <h6 class="ml-1 ml-md-4" style="font-size: 0.95rem">{{ content.institution }}</h6>
                <h6 class="ml-1 ml-md-4" style="font-size: 0.95rem; font-style: italic">{{ content.area }}</h6>
                {% if content.score %}
                  <h6 class="ml-1 ml-md-4" style="font-size: 0.9rem">
                    <strong>CGPA:</strong> {{ content.score }}
                  </h6>
                {% endif %}
                {% if content.courses and content.courses.size > 0 %}
                  <ul class="items">
                    {% for item in content.courses %}
                      <li>
                        <span class="item">{{ item }}</span>
                      </li>
                    {% endfor %}
                  </ul>
                {% endif %}
              </div>
            </div>
          </li>
        {% endfor %}
      </ul>
    {% else %}
      <p>No education information available.</p>
    {% endif %}
  </div>
</section>

<!-- CV Section -->
<section id="cv" class="scroll-section">
  <h2>Curriculum Vitae</h2>
  <div class="cv-section">
    <p class="cv-download">
      <a href="{{ '/assets/pdf/CV_Tanvir.pdf' | relative_url }}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <i class="ti ti-download"></i> Download Full CV (PDF)
      </a>
    </p>
  </div>
</section>
