# Personal Academic Website

A clean, elegant personal website for researchers and academics — built with Jekyll and hosted on GitHub Pages. Features in-browser PDF preview for research papers and CV, smooth animations, and a fully responsive design.

---

## Features

- **Effortless chic design** — warm neutral palette, Cormorant Garamond serif headings, Inter sans-serif body text
- **In-browser PDF preview** — view research papers and CV without downloading, via a smooth modal overlay
- **Research paper cards** — filterable grid with venue badge, status badge, abstract excerpt, and quick links
- **CV embed** — inline PDF viewer with macOS-style chrome + full-screen modal option
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

Open [http://localhost:4000](http://localhost:4000).

---

## Customisation Guide

All content lives in two YAML files — no HTML editing needed for most changes.

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

### 2. Add your research papers — `_data/research.yml`

Each paper is a YAML list item:

```yaml
- id: paper-2024-unique-id
  title: "Full Paper Title"
  authors: "Your Name, Co-Author A, Supervisor Name"
  venue: "Nature Methods"           # journal or conference
  year: 2024
  abstract: >
    Your abstract here. Can be multiple lines.
  tags:
    - "Deep Learning"
    - "Genomics"
  pdf_url: "/assets/pdfs/paper-2024-title.pdf"   # local PDF (optional)
  doi: "https://doi.org/10.1038/..."              # DOI link (optional)
  arxiv: "https://arxiv.org/abs/2401.XXXXX"       # arXiv link (optional)
  code: "https://github.com/you/repo"             # code link (optional)
  featured: true      # spans two columns in the grid
  status: "published" # "published" or "preprint"
```

**Your name** is automatically bolded in the author list. The template matches any entry containing `"Your Name"` — replace this with your actual name throughout `_data/research.yml`.

**To enable PDF preview:** upload PDF files to `assets/pdfs/` and set `pdf_url` to the path. If `pdf_url` is omitted, the preview modal shows a helpful placeholder.

### 3. Add your CV

Place your CV PDF at:

```
assets/pdfs/cv.pdf
```

Then update `cv_url` and `cv_updated` in `_data/profile.yml`.

### 4. Customise research interest tags

Edit the `interests-list` section in `index.html` around line 150:

```html
<span class="interest-tag">Your Interest</span>
```

### 5. Customise colours

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
├── _data/
│   ├── profile.yml        ← your personal info & social links
│   └── research.yml       ← your publications list
├── _layouts/
│   └── main.html          ← site-wide HTML shell (nav, modals, scripts)
├── assets/
│   ├── css/
│   │   └── portfolio.css  ← all styles (design system + components)
│   ├── js/
│   │   └── portfolio.js   ← interactions (modals, filter, counters, nav)
│   ├── images/
│   │   └── avatar.jpg     ← your photo (add this)
│   └── pdfs/
│       ├── cv.pdf          ← your CV (add this)
│       └── paper-*.pdf     ← paper PDFs (add these)
├── index.html             ← main page (Liquid template, reads from _data/)
├── _config.yml            ← Jekyll config
└── Gemfile                ← Ruby dependencies
```

---

## PDF Preview — How It Works

### Research papers
Each paper card has a **Preview** button. Clicking it opens a modal split into:
- **Left panel** — title, authors, abstract, tags, and external links
- **Right panel** — the PDF embedded in an `<iframe>` (browsers render PDFs natively)

If no local PDF is provided, the panel shows a friendly placeholder with instructions.

### CV
The CV section embeds an inline `<iframe>` viewer directly on the page (styled with a macOS-like chrome). An **Open Full Preview** button opens a full-screen modal version. A **Download PDF** button is available as a secondary option.

---

## Deployment (GitHub Pages)

1. Push this repository to GitHub as `username.github.io`
2. Go to **Settings → Pages** and set source to the `master` branch
3. Your site will be live at `https://username.github.io`

For a custom domain, add a `CNAME` file to the repo root containing your domain name, then configure DNS with your registrar.

---

## Local Build Without Ruby

If you prefer not to install Ruby, you can preview using Docker:

```bash
docker run --rm -v "$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll jekyll serve
```

---

## License

MIT — see [LICENSE.txt](LICENSE.txt).
