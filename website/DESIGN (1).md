# Design Specification  -  Cross-Dataset Stroke-Risk Research Showcase

> **Purpose:** This document is the design and content contract for building a polished, publication-minded portfolio site around the project *Cross-Dataset Generalisation and Calibration Analysis of Stroke Risk Prediction Models*.
>
> **Primary audience:** ML researchers, academic supervisors, internship reviewers, and technically literate portfolio visitors.
>
> **Core principle:** Make the evidence the visual identity. The site should feel like a carefully art-directed research note - not a SaaS landing page, generic AI portfolio, or clinical product website.

---

## 1. Product intent

The website should answer five questions quickly:

1. **What did you investigate?** Whether models trained on the Kaggle Stroke Prediction dataset retain performance when evaluated on a harmonised NHANES population.
2. **Why does it matter?** In-domain discrimination is not sufficient evidence that a risk model will generalise across datasets or populations.
3. **What did you do?** Harmonisation, model training, in-domain evaluation, external evaluation, dataset-shift analysis, and calibration analysis.
4. **What did you find?** The reported Logistic Regression ROC-AUC falls from 0.838 in-domain to 0.713 on the external dataset; PR-AUC falls from 0.214 to 0.079. A domain-classifier AUC of 0.858 suggests that the datasets are distinguishable from their measured features.
5. **What are the limits?** Differences in coding, measurement, missingness, prevalence, and cohort construction can affect the result. This is a retrospective cross-dataset analysis, not proof of clinical utility or prospective safety.

The site should foreground the research question and result, then support them with transparent methods, plots, limitations, and reproducibility links.

### A one-sentence thesis

**A model that performs well on one dataset may not transfer cleanly to another population.**

Treat this as the research question being tested, not a universal conclusion about all stroke-risk models.

### Tone of voice

- Precise, restrained, analytical, and readable.
- Use first person only where it clarifies ownership of a decision or experiment.
- Prefer “we evaluated”, “the observed score decreased”, and “this suggests” over “we proved”, “revolutionary”, or “game-changing”.
- Distinguish observations from interpretations and hypotheses.
- Never claim that the model is clinically ready, diagnostic, or suitable for patient care.

---

## 2. Art direction

### Creative direction: an editorial research note

Use a warm, low-glare paper background, dark evergreen text, restrained rust accents, typographic hierarchy, thin rules, and real research figures. The character comes from asymmetrical composition and evidence-led layouts - not decoration.

The aesthetic should sit between a contemporary academic journal page and a well-designed independent research publication. It should be calm and memorable without looking rustic, luxury-branded, or like a generic university template.

### Visual principles

- **One clear visual idea:** editorial typography + real plots + fine structural rules.
- **Whitespace is structure:** use spacing and alignment instead of enclosing every section in a card.
- **Evidence over atmosphere:** no abstract blobs, gradient fog, random particles, floating 3D objects, or irrelevant stock photography.
- **Asymmetry with discipline:** use split compositions, variable column widths, and occasional full-width figures, all aligned to a consistent grid.
- **Color with meaning:** green/teal consistently represents the source/in-domain series; rust consistently represents the external target series. Do not swap their meanings between plots.
- **Real content creates distinction:** dataset names, methods, metric definitions, actual charts, and limitations should do the branding work.

---

## 3. Design system

### 3.1 Colour tokens

| Token | Hex | Intended use |
|---|---|---|
| `--paper` | `#F5F3EB` | Main page background |
| `--surface` | `#FCFBF7` | Small number of reading surfaces, figure backgrounds, or code blocks |
| `--ink` | `#172B29` | Main body text and primary headings |
| `--muted-ink` | `#4D5D57` | Secondary copy, metadata, descriptions |
| `--source-green` | `#23645A` | Kaggle / in-domain series, links, selected states |
| `--target-rust` | `#994524` | NHANES / external series, emphasis, key contrast in charts |
| `--line` | `#C9D0C6` | Dividers, axes, table lines |
| `--soft-green` | `#E6ECE4` | Rare, quiet highlight surface for source-related elements |
| `--soft-rust` | `#F3E6DE` | Rare, quiet highlight surface for external-evaluation notes |
| `--focus` | `#1D6ED8` | Visible keyboard focus ring; may be adjusted only after contrast verification |
| `--chart-neutral` | `#858E88` | Axes, reference diagonals, and non-semantic chart context |

**Rules:**

- Do not introduce an unrelated purple-to-blue gradient or multiple accent colors.
- Avoid using the muted text token for tiny text on coloured surfaces unless contrast has been tested.
- Do not encode source/target, positive/negative, or model identity by color alone. Add direct labels, line patterns, markers, or a legend.
- Keep state colors separate from research-series colors. Red/green should not be the only way to distinguish model quality.
- The core combinations above have been selected to be high-contrast on `--paper`; re-test all actual text/background pairs in the built site. WCAG AA requires at least 4.5:1 for normal text and 3:1 for large text. See the [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

### 3.2 Typography

Use a deliberate pairing rather than the default one-font-everywhere treatment:

- **Display / research headline:** `Newsreader` (or `Literata` if Newsreader is unavailable). Use a restrained editorial serif for large headings and selected pull quotes.
- **Body / interface:** `IBM Plex Sans`. Use for paragraphs, navigation, buttons, tables, captions, and section headings where clarity matters.
- **Technical labels / metric values:** `IBM Plex Mono`. Use sparingly for metric values, dataset IDs, code-adjacent metadata, and short technical labels.

Suggested font loading: self-host if practical; otherwise use a reliable font provider, ensure `font-display: swap`, and provide system fallbacks.

Fallback stacks:

```css
--font-display: "Newsreader", Georgia, "Times New Roman", serif;
--font-body: "IBM Plex Sans", Arial, sans-serif;
--font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
```

Suggested responsive type scale:

| Element | Desktop | Mobile |
|---|---:|---:|
| Hero H1 | `clamp(3.25rem, 5.5vw, 5.75rem)` | `clamp(2.6rem, 11vw, 3.8rem)` |
| Section H2 | `clamp(2.25rem, 3vw, 3.5rem)` | `clamp(1.9rem, 8vw, 2.8rem)` |
| Section H3 | `1.35–1.65rem` | `1.2–1.4rem` |
| Body | `1.05–1.15rem` | `1rem–1.075rem` |
| Figure caption | `0.9–0.98rem` | `0.9rem` |
| Metadata | `0.72–0.8rem` | `0.72–0.8rem` |

Body copy should usually remain between 55 and 75 characters per line on desktop. Do not set body text to a very light weight or use thin, low-contrast captions.

### 3.3 Layout and spacing

- Maximum content width: approximately `1320px`; use `min(100% - 2 * 5vw, 1320px)` with comfortable responsive gutters.
- Desktop grid: 12 columns with a consistent 20–28px gap.
- Tablet: 8-column equivalent or simplified split layouts.
- Mobile: one column; preserve the reading order and avoid horizontal overflow.
- Base spacing unit: 8px. Use a consistent scale such as 8, 16, 24, 32, 48, 64, 96, and 128px.
- Section vertical padding: roughly 88–128px desktop and 60–80px mobile, tuned to page length.
- Use one-pixel horizontal rules to separate chapters and establish editorial rhythm.
- Keep most elements square-edged or only slightly rounded (0–8px). A figure may have a small radius if the plot itself benefits from it; do not place every block inside a rounded container.
- Shadows should be absent by default. If one is genuinely needed to identify an overlay, use a subtle, short shadow once - not on every surface.

### 3.4 Graphic language

Use:
- actual ROC curves, precision–recall curves, calibration/reliability plots, missingness summaries, and source/target distribution comparisons exported from the analysis;
- thin rules and understated annotations;
- inline labels with units and clear axis titles;
- occasional serif pull-quote styling for the research question, not every paragraph;
- simple line diagrams for the study pipeline.

Do not use:
- stock photographs of doctors, patients, laboratories, or people at laptops;
- AI-generated scientific plots or synthetic charts presented as real evidence;
- random medical icons, brain-network stock art, glowing neural-network illustrations, or decorative ECG lines;
- invented institutional logos, affiliations, badges, citations, testimonials, or publication status.

---

## 4. Page architecture and exact content direction

Build this as a **single long-form research page**, with optional separate pages for a full technical report and supplementary materials only if actual materials are available.

### 4.1 Header / navigation

**Desktop:** compact header on the paper background, a thin lower rule, and understated anchor links aligned right.

Left label:

`RESEARCH NOTE / 01`

Right navigation:

- Question
- Study design
- Evidence
- Dataset shift
- Calibration
- Limitations
- Code & data

A compact “Paper / PDF” item should appear only if a real paper or PDF exists. Do not show fake external-link icons or buttons with no destination.

**Behavior:**
- Header may become sticky after a small scroll, but should not obscure anchor targets.
- Use a subtle active-section indicator, not a large animated pill.
- Mobile uses a real accessible menu button or a simple compact anchor list. Avoid an animated full-screen menu unless the site genuinely needs it.

### 4.2 Hero: establish the question and show evidence

**Layout:** asymmetric split, approximately 54% text / 46% evidence on wide desktop. Left side is left-aligned; right side contains an actual plot panel or figure pair. Do not center the whole hero.

**Eyebrow:**

`MACHINE LEARNING · EXTERNAL VALIDATION`

**H1:**

`A model that works here may not travel there.`

**Deck:**

`Testing cross-dataset generalisation, discrimination, and calibration in stroke-risk prediction.`

**Metadata row:**

- `SOURCE → TARGET` / `Kaggle → NHANES 2021–2023`
- `MODELS` / `Logistic Regression · Random Forest · XGBoost`
- `WORK` / `Undergraduate research project`

Do not add made-up dates, affiliations, supervisor names, publication status, or a “featured in” strip.

**Right visual:**
- Best option: a two-panel figure comparing in-domain and external ROC curves, exported from the actual notebook.
- Alternative: a carefully annotated performance-shift plot with a direct comparison of ROC-AUC and PR-AUC.
- Every curve must have the correct split, evaluation cohort, thresholding details where relevant, and confidence interval if computed.
- Include a concise figure number and caption. On mobile, stack the panels vertically and keep labels readable.

**Hero actions:**
- Primary text link: `Explore the findings ↓`
- Secondary link: `View code ↗` only when it resolves to the real repository.

No fake dashboard buttons, “Get started”, “Book a demo”, or “Try for free”.

### 4.3 Evidence strip: communicate the strongest result

Place one quiet ruled strip under the hero. It may contain three measurements, but should not become three identical floating cards.

Use these current reported values, after verifying them against the final notebook:

| Measure | In-domain / source | External / target | Caption |
|---|---:|---:|---|
| Logistic Regression ROC-AUC | `0.838` | `0.713` | Discrimination decreases under external evaluation |
| PR-AUC | `0.214` | `0.079` | Precision–recall performance also drops; interpret in context of prevalence |
| Domain-classifier AUC |  -  | `0.858` | Features contain information that distinguishes the two datasets |

For each metric, specify the dataset and split in its caption or accessible description. Do not style the values as a trophy wall. The design should help the reader understand the change, not suggest the metrics are accomplishments in isolation.

### 4.4 Section: The question

**Section label:** `01 / THE QUESTION`

**Headline direction:**

`The question is not whether the score is high. It is whether it holds up.`

**Body copy draft:**

`Models for stroke-risk prediction are often evaluated on the dataset used to train them. A strong score on that dataset does not establish that the same model will behave similarly when the population, measurements, missingness patterns, or data-collection process changes. This project examines the gap between in-domain evaluation and deployment on a separately collected, harmonised dataset.`

A short sidebar or inline note can state:

`Same model. Different data-generating process. A more demanding test.`

Do not phrase this as a claim that all published models fail to generalise.

### 4.5 Section: Study design

**Section label:** `02 / STUDY DESIGN`

**Layout:** a single connected flow, not a grid of six same-shaped cards.

Stages:

1. **Source dataset**  -  Kaggle Stroke Prediction dataset; document the exact downloaded version and the cohort definition used.
2. **Target dataset**  -  NHANES 2021–2023 files; document survey cycles, eligibility criteria, outcome definition, and the resulting cohort count.
3. **Harmonisation**  -  align feature definitions, category levels, coding, units, and missing-value semantics. Mark features that could only be approximately matched.
4. **Training and validation**  -  record split strategy, random seed, preprocessing fitted only on training data, class-imbalance handling, and hyperparameter selection.
5. **External evaluation**  -  apply the frozen pipeline to the harmonised target cohort without silently retuning to the target labels.
6. **Shift and calibration analysis**  -  summarise covariate differences, domain-classifier results, discrimination, precision–recall performance, and calibration.

Use a vertical line or a modest connected path with numbered editorial annotations. It should still read naturally without animation.

**Method box / note:**
- Make explicit which features are shared and which were excluded or approximated.
- State whether any preprocessing, feature selection, threshold selection, calibration, or model selection used target-domain labels. If it did, describe it transparently; do not call the process untouched external validation.
- Make class-imbalance treatment explicit rather than implying that it automatically solves imbalance.

### 4.6 Section: Datasets and harmonisation

**Section label:** `03 / TWO DATA SOURCES`

**Layout:** comparison table plus one visual showing coverage or missingness. Avoid two generic dataset cards.

Recommended table fields:

| Field | Source | Target |
|---|---|---|
| Dataset | Kaggle Stroke Prediction | NHANES 2021–2023 |
| Role | Training and in-domain evaluation | External evaluation |
| Population / sampling | Describe from the dataset documentation | Describe survey sampling and inclusion criteria |
| Outcome | State the exact stroke label definition | State the exact target outcome and coding |
| Shared features | List harmonised features or link to appendix | Same feature list after harmonisation |
| Known differences | Coding, selection, or missingness limitations | Measurement, category, or survey-design differences |

Display sample counts only after checking the final cohort script and manuscript. Do not use `~5,110` as a substitute for the number of rows remaining after filtering. If survey weights, strata, or primary sampling units are not used, disclose that design choice where relevant; do not suggest that the dataset is a representative clinical cohort without justification.

**Harmonisation issues to document explicitly:**
- differences in glucose measurement or representation;
- smoking-category alignment;
- BMI missingness and any imputation/exclusion choices;
- how features available in only one dataset were handled;
- all mapping rules for category recoding and unit conversion.

Link to a real data dictionary or appendix if available. A small “mapping detail” disclosure can expand inline; do not make critical methods information hover-only.

### 4.7 Section: Results

**Section label:** `04 / EVIDENCE`

This is the visual centre of the site. Use real exported figures from analysis; never recreate illustrative data by eye.

#### Figure A  -  Discrimination under external evaluation

- Display source and target ROC curves side by side or as small multiples with identical axis ranges.
- Include the 45-degree reference line, exact AUC values, model names, cohort sizes, and a caption.
- Keep model colors consistent across all plots.
- Explain in the text that ROC-AUC is a ranking/discrimination metric, not a measure of calibration or clinical benefit.

#### Figure B  -  Precision–recall performance

- Show PR curves and the target prevalence/baseline where applicable.
- State that PR-AUC depends on prevalence and is especially informative under rare outcomes, but cross-dataset comparisons require prevalence context.
- Do not label a lower PR-AUC as evidence of a specific mechanism without further analysis.

#### Figure C  -  Performance-change comparison

- Compare in-domain and external metrics for each model with paired marks and a clear connector.
- Include uncertainty intervals only if they are computed using a defensible method, ideally with the sampling unit and bootstrap procedure documented.
- Never use cropped axes or different scales that exaggerate a difference.

#### Results narrative pattern

For each result, use four short parts:
1. **Observation:** the measured value or visible pattern.
2. **Context:** what metric and cohort are being described.
3. **Interpretation:** what the pattern may suggest.
4. **Limit:** what it does not establish.

Example: `Logistic Regression ROC-AUC decreased from 0.838 in the Kaggle evaluation to 0.713 on NHANES. This is consistent with weaker discrimination under external evaluation, although the comparison reflects both population and dataset-construction differences and does not isolate a single cause.`

Avoid a giant animated number counter. Metrics should render immediately, remain selectable, and be available to assistive technology.

### 4.8 Section: Dataset shift

**Section label:** `05 / DATASET SHIFT`

**Opening:**

`A performance difference tells us that model behaviour changed. Shift analysis helps characterise how the input data differ; by itself, it does not prove why performance changed.`

Recommended content:
- a concise summary of KS tests and PSI, with the variable, statistic, and interpretation defined;
- a plot of the strongest distribution differences, with axes, sample definitions, and missingness context;
- domain-classifier AUC `0.858`, with the classifier design and validation procedure described;
- a short paragraph explaining that a high domain-classifier AUC indicates distinguishable observed feature distributions, not that every feature shifted equally or that covariate shift is the sole cause of performance loss.

Do not present every test as a decorative dashboard tile. Use one readable summary figure and a compact table for the variables that matter.

### 4.9 Section: Calibration

**Section label:** `06 / CALIBRATION`

Explain clearly that discrimination and calibration answer different questions. A model may rank cases reasonably well while producing probabilities that are systematically too high or too low.

If calibration results are included, provide:
- a reliability diagram for each model and evaluation cohort;
- binning method and number of bins;
- sample counts and outcome prevalence;
- ECE definition and bin weighting;
- Brier score or another proper scoring rule if calculated;
- calibration intercept/slope if fitted and relevant;
- any recalibration method, and whether target labels were used to fit it.

Previously noted ECE values (`0.0193` for Logistic Regression, `0.0430` for Random Forest, `0.0529` for XGBoost) must not be displayed until the analysis confirms which cohort/split they refer to and that the values were computed comparably. ECE is sensitive to binning and data distribution; a single scalar must not replace a reliability plot.

Do not claim that a model is “well calibrated” based only on one low ECE value. Keep the limitation visible in the prose.

### 4.10 Section: What did not transfer cleanly?

**Section label:** `07 / INTERPRETATION`

Use a reading-led section with three distinct subheadings rather than three equal cards:

- **The dataset boundary matters.** The external result is weaker than the in-domain result, which is a practical warning against relying only on random held-out splits from the source dataset.
- **Harmonisation is part of the model.** Feature definitions, coding, missingness, and measurement protocols affect what the model actually receives.
- **A shift score is not a causal explanation.** Distributional differences can help diagnose the problem, but further analysis is needed to connect a particular shift to the performance decline.

Keep each interpretation linked to an observed result. Avoid implying that glucose, smoking, BMI, or any single feature caused the AUC drop unless a robust analysis establishes that claim.

### 4.11 Section: Limitations

**Section label:** `08 / LIMITATIONS`

Do not hide limitations in a tiny footer. Use a calm, readable section with short paragraphs or a compact list.

Discuss, as applicable and accurately:
- the size, outcome imbalance, and data-generating process of the Kaggle dataset;
- differences in collection protocols, measurement, encoding, prevalence, and selection between datasets;
- approximate feature harmonisation and excluded variables;
- missing-data assumptions and how missingness indicators/imputation were handled;
- uncertainty caused by a limited number of positive outcomes;
- use of survey weights and NHANES complex sampling design, including whether these were incorporated;
- possible leakage through preprocessing, feature selection, tuning, or calibration if safeguards were incomplete;
- the distinction between external evaluation on a public survey dataset and prospective clinical validation.

Required plain-language boundary statement:

`This project is a retrospective machine-learning study. Its outputs are not a clinical risk calculator and should not be used to make medical decisions.`

### 4.12 Section: Reproducibility / code and data

**Section label:** `09 / REPRODUCIBILITY`

Show only links that exist and work:
- source-code repository;
- notebook(s) or scripts;
- environment / dependency file;
- data-processing and harmonisation documentation;
- a model card or experiment log if available;
- paper/preprint/PDF if one exists and its status is stated accurately.

A repository panel should be plain and useful, not a row of fake badges. Include the commit/tag or experiment version if the reported metrics are tied to a particular state of the code. Explain that dataset access and terms remain governed by the original sources; do not re-host restricted material.

If a public repository is not ready, replace the button with a truthful status note rather than a nonfunctional “View on GitHub” button.

### 4.13 Footer

Small, restrained footer with:
- project title;
- name/role only as the owner chooses to publish them;
- real repository or paper links;
- last-updated date if maintained;
- a note that metric values refer to the described experiment version.

Avoid social icon rows, giant logo marks, generic “Made with passion” copy, and a second full navigation menu.

---

## 5. Interaction and motion

The site should feel smooth because the interface is stable, intentional, and responsive - not because every element moves.

### Approved motion

- Native smooth scrolling for anchor navigation where supported.
- Short opacity/position entrance for a small number of major sections, only when it improves orientation.
- Underline or color transition for actual links.
- Small chart tooltip or legend interactions if the chart remains understandable without them.
- A modest sticky-header transition if it is not distracting.

### Motion limits

- Most transitions: roughly `160–240ms`, with a restrained ease-out curve.
- Do not animate every paragraph, every card, or each individual number on scroll.
- No scroll hijacking, scroll-jacking, horizontal-scroll storytelling on desktop, perpetual floating, cursor trails, magnetic buttons, animated text scrambling, parallax layers on every section, or auto-advancing carousels.
- Do not delay access to the first contentful view behind an elaborate intro.
- Do not make information appear only when a cursor hovers.
- Respect `prefers-reduced-motion`; disable non-essential transforms, parallax, reveal effects, and smooth scrolling when reduced motion is requested. The [W3C technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html) describes this mechanism.

Example implementation:

```css
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

If JavaScript animation is used, apply the same preference in that logic. Avoid `!important` overrides that accidentally suppress essential focus or validation feedback.

---

## 6. The anti-slop checklist

Recent design critiques repeatedly identify a cluster of default AI-built website patterns: centered gradient hero, purple/blue color wash, glowing blur blobs, glass cards, identical three-up feature grids, pill-shaped controls everywhere, uniform icon tiles, excessive shadows, repetitive scroll reveal, and vague “modern/innovative” copy. These patterns are not automatically wrong individually; they become generic when they have no relation to the specific content. See the design-practice critiques in [SmoothUI](https://smoothui.dev/blog/ai-design-slop), [AI with Adele](https://www.aiwithadele.com/guides/stop-ai-website-slop), and the [Design Slop symptom catalogue](https://github.com/wpgaurav/design-slop/blob/main/references/slop-patterns.md).

### Hard no by default

- [ ] No purple-to-blue gradient hero or neon gradient text.
- [ ] No blurred glowing orbs, decorative mesh backgrounds, or random particles.
- [ ] No glassmorphism on navigation, every card, and every modal.
- [ ] No row of three identical icon cards used as the default for every concept.
- [ ] No card around every paragraph or section; use a clear page canvas and dividers.
- [ ] No huge generic icons above headings and no emoji in navigation.
- [ ] No arbitrary all-caps headings; micro-labels may use small uppercase type sparingly.
- [ ] No unnecessary badges such as “AI-powered”, “state of the art”, “next-generation”, or “clinically validated”.
- [ ] No generic stock images of doctors, teams, brain scans, server racks, or glowing brains.
- [ ] No pretend data, lorem ipsum, fake logos, invented citations, testimonials, or invented paper status.
- [ ] No charts with unlabeled axes, truncated scales, unexplained metrics, or unlabeled source/target curves.
- [ ] No animated counters that imply the data is live when it is not.
- [ ] No hover effects on static content and no buttons that do nothing.
- [ ] No tiny low-contrast copy, thin body type, or colored text whose contrast has not been checked.
- [ ] No use of smooth scroll or reveal animation that ignores reduced-motion settings.
- [ ] No decorative cursor effects, auto-playing media, scroll hijacking, or forced horizontal scrolling.

### Design review test

For every visual effect, card, icon, accent, and animation, ask:

**“What research task or reading task does this help the visitor complete?”**

If there is no specific answer, remove it.

---

## 7. Charts and data communication rules

Charts are not illustrations; they are evidence and must be sourced from the actual analysis.

- Export vector SVG or high-resolution raster plots from the same scripts/notebooks that produce the reported results.
- Store plotting code and input summary tables with the project, where possible.
- Keep colors consistent across ROC, PR, calibration, and shift plots.
- Label units and axes. Use direct labels when a legend would be difficult to scan.
- Include a text caption, figure number, data source, cohort, sample count, and important caveat.
- Supply a concise textual interpretation near the figure so readers do not need to infer the whole result visually.
- Do not use 3D charts, decorative chart backgrounds, heavy gridlines, gradients, chartjunk, or oversized legends.
- Use confidence intervals and statistical tests only when calculated with an appropriate method; never invent uncertainty ranges.
- Provide a table or downloadable data for essential values, not just a canvas rendered by JavaScript.
- Ensure the information survives grayscale viewing and common color-vision deficiencies through line style, markers, labels, and contrast.
- If figures are interactive, keyboard navigation and static fallback images must remain available.

### Scientific integrity gate

Before each metric is published, record:

`metric | model | cohort | split | sample count | outcome prevalence | computation method | experiment version`

If any of these details are unknown, either investigate or omit the figure/value until they are verified. Never treat a generated mockup as a source of experimental data.

---

## 8. Accessibility and usability requirements

Target WCAG 2.2 AA practices where applicable.

- Text contrast: at least 4.5:1 for normal text and 3:1 for large text. Verify actual combinations with a contrast checker rather than judging them by eye.
- Meaningful UI boundaries and chart graphics: maintain sufficient non-text contrast.
- All interactive elements need clear keyboard focus that is not clipped or hidden beneath the sticky header.
- Semantic heading order (`h1`, then `h2`, then `h3`) and semantic landmarks (`header`, `nav`, `main`, `section`, `footer`).
- Use descriptive link text; avoid repeated “Learn more” links with no context.
- Add alt text for meaningful figures. For dense charts, give a short alt description and a full adjacent caption or data table.
- Do not convey meaning solely with color.
- Respect system-level reduced motion.
- Touch targets and mobile spacing should be comfortable; avoid tightly packed inline links.
- Test at 320px width, keyboard-only, zoom to 200%, and with reduced motion enabled.
- Keep focus order logical and ensure anchor links account for sticky navigation (`scroll-margin-top`).

Accessibility references: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), [W3C contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), and [WebAIM contrast guidance](https://webaim.org/articles/contrast/).

---

## 9. Responsive behavior

### Desktop (> 1000px)
- Asymmetric split hero with real figure on the right.
- Evidence strip runs across the width, separated by rules rather than individual cards.
- Multi-column methods and figure layouts are allowed when axes and captions remain readable.

### Tablet (700–1000px)
- Hero becomes approximately 50/50 or stacks if the plot cannot retain readable labels.
- Reduce heading size and section padding without compressing the body text.
- Navigation may collapse to a compact menu, but primary research anchors must remain reachable.

### Mobile (< 700px)
- One-column reading sequence: headline, deck, metadata, visual, evidence, then sections.
- Stack paired charts; never shrink a complex plot until labels become illegible.
- Keep tables usable: transform to labeled rows or allow intentional table overflow within a clearly indicated region, not page-level horizontal scrolling.
- No oversized fixed header; no sticky elements covering content.
- Ensure buttons/links are easy to tap, and charts have text/table equivalents.

---

## 10. Implementation guidance

The design is framework-agnostic. React/Vite, Next.js, Astro, or a well-structured static site can implement it. Choose the simplest stack that fits deployment; do not add a large animation or charting library without a real need.

### Suggested component boundaries

- `SiteHeader`
- `HeroResearchSummary`
- `EvidenceStrip`
- `QuestionSection`
- `StudyDesignFlow`
- `DatasetComparison`
- `ResultsFigure`
- `ShiftAnalysis`
- `CalibrationSection`
- `LimitationsSection`
- `ReproducibilityLinks`
- `SiteFooter`

### Implementation rules

- Keep content and metric values in data objects or markdown content, not duplicated across components.
- Prefer CSS Grid and Flexbox over brittle absolute positioning.
- Use CSS custom properties for every core design token.
- Use IntersectionObserver only for subtle, optional reveal behavior; content must be visible when JavaScript fails or animations are disabled.
- Reserve lazy loading for below-the-fold images; avoid delaying the hero figure unnecessarily.
- Prevent layout shift by reserving figure dimensions/aspect ratios before images load.
- Use semantic HTML and accessible chart fallbacks.
- Do not add a dark mode automatically. If a dark theme is later requested, design and test a deliberate separate palette rather than inverting every color.
- Avoid collecting analytics or adding cookie banners unless analytics are actually used and applicable obligations require it.

### Performance expectations

- Responsive images and optimized SVGs.
- Minimal JavaScript for a content-first page.
- No autoplay video, large WebGL scenes, or continuous animation loops.
- Stable font loading and reserved figure sizes.
- Test actual performance after implementation rather than claiming it is fast without measurements.

---

## 11. Content integrity and writing rules

### Avoid generic AI copy

Do not use filler such as:
- “Unlocking the power of AI”
- “Revolutionizing healthcare through innovation”
- “Cutting-edge insights for a better tomorrow”
- “Seamlessly bridging the gap”
- “In today's rapidly evolving landscape”
- “Harnessing the full potential of machine learning”
- “Transforming data into actionable insights”

Replace vague claims with a specific method, observation, or limitation. For example, say “We evaluated three classifiers on a harmonised NHANES cohort” rather than “We harnessed powerful ML to uncover transformative insights”.

### Avoid accidental overclaiming

- “External evaluation” is appropriate; “clinical validation” is not unless prospective or clinically appropriate validation was actually performed.
- “Suggests dataset shift” is appropriate where supported; “proves the feature shift caused the performance drop” is not.
- “Stroke-risk prediction task” is safer than “stroke diagnosis”.
- “Calibration metric” is not synonymous with “clinical reliability”.
- “Public dataset” does not imply “representative population” or “deployment ready”.
- Do not describe the model as unbiased, safe, robust, or generalisable without a defined evaluation and evidence.

### Publication-status rule

If the associated manuscript is under review, say exactly that only if still current and if the user wishes to disclose it. Never silently upgrade “under review” to “published” or use a journal logo as a credibility prop.

---

## 12. Quality-assurance checklist before release

### Visual
- [ ] The site is recognizable without gradients, decorative blobs, icon tiles, or a card grid.
- [ ] The layout feels editorial and research-specific, not like a SaaS landing page.
- [ ] Headings, body text, captions, and metadata have clear hierarchy.
- [ ] The page has rhythm without giving every section a different background color.
- [ ] Mobile layouts preserve readable figures and a coherent reading order.

### Scientific
- [ ] Every result matches the final notebook or experiment log.
- [ ] Source and target labels are consistent across page text and all figures.
- [ ] Metric definitions, cohorts, sample counts, prevalence, and splits are clear.
- [ ] No synthetic plot from the visual mockup is represented as an experimental result.
- [ ] Limitations and the non-clinical-use disclaimer are visible.
- [ ] Code, PDF, and data links are real and tested.

### Motion and accessibility
- [ ] Keyboard-only navigation works.
- [ ] Focus states are visible and not covered by the sticky header.
- [ ] Reduced motion disables non-essential movement.
- [ ] Normal text meets 4.5:1 contrast and large text meets 3:1.
- [ ] Charts do not rely on color alone and have text equivalents.
- [ ] The page works at 320px, 200% zoom, and without JavaScript-enhanced reveals.

### Functionality and performance
- [ ] No placeholder buttons, dead links, console errors, or horizontal page overflow.
- [ ] Figures have reserved dimensions and do not cause layout shifts.
- [ ] The initial content appears without an intro animation or waiting screen.
- [ ] Animations are brief, purposeful, and not repeated on every element.

---

## 13. Final acceptance criterion

The website is finished when a research reviewer can understand the question, see the main external-evaluation result, follow the methods, inspect the evidence, identify the limitations, and find the code - all without navigating through decorative marketing content.

**Priority order:** scientific correctness → legibility → clear information hierarchy → distinctive art direction → subtle interaction.

Do not sacrifice any earlier item for a later one.

---

## 14. Research and design references

These sources serve different roles. The “AI slop” articles are practitioner critiques and pattern catalogues, not formal usability standards; use them as diagnostic heuristics rather than proof that any one visual pattern is inherently bad. Accessibility requirements should be judged against the normative WCAG guidance.

1. SmoothUI, “AI Design Slop: Why AI-Generated UI Looks Generic  -  and the Fix” (24 June 2026). Discusses repeated gradients, glassmorphism, identical card grids, and motion clichés. https://smoothui.dev/blog/ai-design-slop
2. AI with Adele, “Why AI-built websites all look the same (and how to fix it)”. Recommends making the visual direction explicit in a design specification instead of relying on generic defaults. https://www.aiwithadele.com/guides/stop-ai-website-slop
3. Gaurav / `design-slop`, “Design Slop Symptom Catalog”. A practitioner checklist covering cards, borders, color/effects, imagery, and information hierarchy. https://github.com/wpgaurav/design-slop/blob/main/references/slop-patterns.md
4. W3C, “Web Content Accessibility Guidelines (WCAG) 2.2”. Normative accessibility standard. https://www.w3.org/TR/WCAG22/
5. W3C WAI, “Understanding Success Criterion 1.4.3: Contrast (Minimum)”. Defines contrast thresholds for normal and large text. https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
6. W3C WAI, “Technique C39: Using the CSS `prefers-reduced-motion` query to prevent motion”. https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html
7. WebAIM, “Contrast and Color Accessibility”. Practical explanation of contrast-ratio requirements and checking. https://webaim.org/articles/contrast/

**Research caveat:** generic-design critiques are subjective and evolving. The goal is not to ban every contemporary pattern; it is to make each design decision specific to this research project and to preserve accessibility and evidence integrity.
