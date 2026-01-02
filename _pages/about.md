---
layout: about
title: about
permalink: /
subtitle: <a href='#'>Affiliations</a>. Address. Contacts. Motto. Etc.

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

Write your biography here. Tell the world about yourself. Link to your favorite [subreddit](http://reddit.com). You can put a picture in, too. The code is already in, just name your picture `prof_pic.jpg` and put it in the `img/` folder.

Put your address / P.O. box / other info right below your picture. You can also disable any of these elements by editing `profile` property of the YAML header of your `_pages/about.md`. Edit `_bibliography/papers.bib` and Jekyll will render your [publications page](/al-folio/publications/) automatically.

Link to your social media connections, too. This theme is set up to use [Font Awesome icons](https://fontawesome.com/) and [Academicons](https://jpswalsh.github.io/academicons/), like the ones below. Add your Facebook, Twitter, LinkedIn, Google Scholar, or just disable all of them.

<!-- News Section -->
<section id="news" class="scroll-section">
  <h2>News</h2>
  {% include news.liquid %}
</section>

<!-- Projects Section -->
<section id="projects" class="scroll-section">
  <h2>Projects</h2>
  <div class="projects">
    {% assign project_count = site.projects | size %}
    {% if project_count > 0 %}
      {% if site.enable_project_categories %}
        <!-- Display categorized projects -->
        {% assign project_categories = "work,fun" | split: "," %}
        {% for category in project_categories %}
          <a id="projects-{{ category }}" href=".#projects-{{ category }}">
            <h3 class="category">{{ category }}</h3>
          </a>
          {% assign categorized_projects = site.projects | where: "category", category %}
          {% assign sorted_projects = categorized_projects | sort: "importance" %}
          <div class="row row-cols-1 row-cols-md-3">
            {% for project in sorted_projects %}
              {% include projects.liquid %}
            {% endfor %}
          </div>
        {% endfor %}
      {% else %}
        <!-- Display projects without categories -->
        {% assign sorted_projects = site.projects | sort: "importance" %}
        <div class="row row-cols-1 row-cols-md-3">
          {% for project in sorted_projects %}
            {% include projects.liquid %}
          {% endfor %}
        </div>
      {% endif %}
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
      <p class="text-muted">Coming soon...</p>
    {% endif %}
  </div>
</section>

<!-- Experiences Section -->
<section id="experiences" class="scroll-section">
  <h2>Experiences</h2>
  <div class="experiences-section">
    {% assign work_entry = site.data.resume | where_exp: "item", "item[0] == 'work'" | first %}
    {% if work_entry and work_entry[1].size > 0 %}
      <ul class="card-text font-weight-light list-group list-group-flush">
        {% assign work_items = work_entry[1] | sort: 'startDate' | reverse %}
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
    {% assign education_entry = site.data.resume | where_exp: "item", "item[0] == 'education'" | first %}
    {% if education_entry and education_entry[1].size > 0 %}
      <ul class="card-text font-weight-light list-group list-group-flush">
        {% assign education_items = education_entry[1] | sort: 'startDate' | reverse %}
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
    <p>For a comprehensive overview of my academic background, research experience, publications, and skills, please download my full curriculum vitae above.</p>
  </div>
</section>

