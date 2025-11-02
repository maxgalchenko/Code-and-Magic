# Code and Magic

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-Markup-orange?logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-Styles-blue?logo=css3)
![Gulp](https://img.shields.io/badge/Gulp-4.0-red?logo=gulp)
![PostCSS](https://img.shields.io/badge/PostCSS-Autoprefixer%20%7C%20cssnano-FF6D00)
![BrowserSync](https://img.shields.io/badge/Dev-Server%20%26%20Live%20Reload-00B4D8)
![Imagemin](https://img.shields.io/badge/Images-Optimized-2E7D32)

</div>

## Overview

A small browser game prototype with a character setup UI. Built as a learning project to practice DOM interactions, canvas, and a lightweight asset pipeline.

## Key Features

- Character customization (coat, eyes, fireball) and drag-and-drop artifacts
- Canvas mini-game area with interactive elements
- Gulp-based static build: CSS/HTML minification, image optimization and WebP

## Tech Stack

JavaScript (ES6), HTML5, CSS3, Gulp 4, PostCSS (Autoprefixer, cssnano), imagemin, BrowserSync

## Architecture

Static site compiled from `src/` to `docs/` via Gulp. CSS is processed with PostCSS; HTML is minified; images are optimized and converted to WebP; JavaScript files are served separately without bundling.

## Performance & Accessibility

- Performance: minified CSS/HTML, optimized images, WebP variants, dev live-reload
- Accessibility: semantic markup and keyboard-focusable controls where applicable

## Quality

- Linting: none • Formatting: Prettier
- Type safety: none
- Tests: none
- CI: none

## Prerequisites

- Node.js: `18.17.0`

## Installation

```bash
git clone https://github.com/maxgalchenko/Code-and-Magic.git
cd Code-and-Magic
npm install
```

## Quick Start

```bash
npx gulp dev
# Production
npx gulp build
```

Open http://localhost:3000

## Available Scripts

- `npm test` – placeholder; no tests configured

---

<div align="center">

Built with ❤️ by [Maksym Galchenko](https://github.com/maxgalchenko)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/galchenko-max/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-green?style=for-the-badge&logo=web)](https://portfolio-green-six-29.vercel.app/)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail)](mailto:galchenko.maksym@gmail.com)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

</div>
