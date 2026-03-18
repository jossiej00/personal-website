# Personal Academic Website

A clean, elegant personal website for researchers and academics — built with Jekyll and hosted on GitHub Pages. Features in-browser PDF preview for research papers, slides, and CV, BibTeX export, a blog, and a fully responsive design.

---

## Features

- **Effortless chic design** — warm neutral palette, Cormorant Garamond serif headings, Inter sans-serif body text
- **Research paper cards** — filterable grid with venue badge, status badge, abstract excerpt, and quick links
- **In-browser PDF preview** — view papers, slides, and CV without downloading, via a smooth modal overlay
- **BibTeX export** — download a clean `.bib` file for any paper with one click
- **CV embed** — inline PDF viewer with macOS-style chrome + full-screen modal option
- **Blog** — publish long-form posts in Markdown; drafts excluded from production builds
- **Animated counters** — publication stats that count up on scroll
- **Scroll-reveal animations** — elements fade in as you scroll down
- **Active nav highlighting** — nav links highlight as you scroll through sections
- **Responsive** — works on mobile, tablet, and desktop
- **Zero JavaScript frameworks** — vanilla JS only, fast load times

---

## Quick Start

### Prerequisites

- Ruby 3.x
- Bundler (`gem install bundler`)

### Local development

```bash
git clone https://github.com/YOUR_USERNAME/personal-website.git
cd personal-website
bundle install
bundle exec jekyll serve
```

Open [http://localhost:4000/personal-website/](http://localhost:4000/personal-website/).

To preview draft blog posts locally:

```bash
bundle exec jekyll serve --drafts
```

---

## Customisation Guide

### 1. Update your profile — `_data/profile.yml`

```yaml
name: "Your Full Name"
title: "PhD Researcher · Your Field"
tagline: "A one-sentence description of your research focus."
institution: "Department, University Name"
location: "City, Country"
email: "you@university.edu"
avatar: "/assets/images/avatar.jpg"   # place your photo here

bio: >
  Write 2–3 sentences about yourself here.

social:
  google_scholar: "https://scholar.google.com/..."
  orcid: "https://orcid.org/0000-..."
  linkedin: "https://linkedin.com/in/..."
  twitter: "https://twitter.com/..."
  github: "https://github.com/..."

cv_url: "/assets/pdfs/cv.pdf"
cv_updated: "January 2025"

stats:
  - label: "Publications"
    value: "8"
  - label: "Citations"
    value: "142"
  - label: "h-index"
    value: "5"
  - label: "Years Active"
    value: "4"
```

**To add your photo:** place a square JPG/PNG at `assets/images/avatar.jpg`.

### 2. Add research papers — `_bibliography/publications.bib`

Papers are read from a standard BibTeX file. Add one entry per paper:

```bibtex
@inproceedings{yourkey2024,
  title        = {Your Paper Title},
  author       = {Last, First and Coauthor, Name},
  booktitle    = {Conference Name},
  year         = {2024},
  abstract     = {Your abstract here.},
  keywords     = {Tag One, Tag Two},
  status       = {published},    % "published" or "preprint"
  featured     = {true},         % spans two columns (optional)
  doi          = {10.xxxx/xxx},  % DOI without https://doi.org/ prefix (optional)
  arxiv        = {2401.XXXXX},   % arXiv ID without URL prefix (optional)
  pdf          = {/assets/pdfs/yourkey2024.pdf},   % local PDF path (optional)
  code         = {https://github.com/you/repo},    % code link (optional)
  slides       = {/assets/pdfs/yourkey2024-slides.pdf},  % slides PDF (optional)
}
```

**Your name** is automatically bolded in the author list based on the `name` field in `profile.yml`.

**PDF preview:** upload PDF files to `assets/pdfs/` and set the `pdf` field. If omitted, the preview modal shows a placeholder.

**Slides preview:** set the `slides` field to a PDF path. The Slides button opens it in the same modal as the paper preview.

**BibTeX export:** the Export BibTeX button downloads a `.bib` file for the paper. Custom fields (`status`, `pdf`, `slides`, `code`, `featured`) are excluded from the export automatically.

### 3. Add your CV

Place your CV PDF at `assets/pdfs/cv.pdf`, then update `cv_url` and `cv_updated` in `_data/profile.yml`.

### 4. Write blog posts

**Published posts** go in `_posts/` with the filename format `YYYY-MM-DD-title.md`:

```markdown
---
title: "Your Post Title"
subtitle: "Optional subtitle"
date: 2025-01-01
tags: [Tag One, Tag Two]
---

Your content here in Markdown.
```

**Draft posts** go in `_drafts/` (same format, no date in filename). They are excluded from production builds and only visible when running `jekyll serve --drafts`.

### 5. Customise research interest tags

Edit the `interests-list` section in `index.html`:

```html
<span class="interest-tag">Your Interest</span>
```

### 6. Customise colours

All colours are CSS custom properties in `assets/css/portfolio.css`:

```css
:root {
  --accent: #1B3A5C;    /* deep navy — primary brand colour */
  --gold:   #B8813A;    /* warm amber — accent highlights */
  --bg:     #F8F7F4;    /* warm off-white background */
  /* ... */
}
```

---

## File Structure

```
personal-website/
├── _bibliography/
│   └── publications.bib   ← your research papers (BibTeX)
├── _data/
│   └── profile.yml        ← your personal info & social links
├── _drafts/               ← unpublished blog posts
├── _layouts/
│   ├── main.html          ← homepage shell (nav, modals, scripts)
│   ├── blog-list.html     ← blog index layout
│   └── blog-post.html     ← individual post layout
├── _plugins/
│   └── bibtex_reader.rb   ← reads publications.bib → site.data.research
├── _posts/                ← published blog posts (YYYY-MM-DD-title.md)
├── assets/
│   ├── css/
│   │   └── portfolio.css  ← all styles (design system + components)
│   ├── js/
│   │   └── portfolio.js   ← interactions (modals, filter, counters, nav)
│   ├── images/
│   │   └── avatar.jpg     ← your photo (add this)
│   └── pdfs/
│       ├── cv.pdf          ← your CV (add this)
│       └── *.pdf           ← paper and slides PDFs (add these)
├── blog/
│   └── index.html         ← blog listing page
├── index.html             ← main page (Liquid template)
├── _config.yml            ← Jekyll config (url, baseurl, plugins)
└── Gemfile                ← Ruby dependencies
```

---

## Deployment (GitHub Pages)

This site uses a GitHub Actions workflow for deployment. On every push to `master`, Jekyll is built and deployed automatically.

1. Push the repository to GitHub
2. Go to **Settings → Pages** and set the source to **GitHub Actions**
3. Your site will be live at `https://username.github.io/personal-website/`

> **Note:** The `baseurl` in `_config.yml` is set to `/personal-website`. If you rename the repository, update `baseurl` and `url` to match.

---

## License

MIT — see [LICENSE.txt](LICENSE.txt).
