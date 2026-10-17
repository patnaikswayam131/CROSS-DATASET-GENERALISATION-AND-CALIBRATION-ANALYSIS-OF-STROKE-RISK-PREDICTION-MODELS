/**
 * @fileoverview Site-level configuration for the Showcase website.
 *
 * Contains hero section content, navigation, stat pills, about/footer
 * copy, and paper citation data.  Separated from research data so that
 * layout components import only what they need.
 *
 * @module siteConfig
 */

// ────────────────────────────────────────────────────────────
//  Hero Section
// ────────────────────────────────────────────────────────────

/**
 * Content for the hero / landing section.
 * @type {Object}
 */
export const heroContent = {
  /** Small label above the title */
  smallLabel: 'Research Publication · Machine Learning · Clinical AI',

  /** Main heading */
  title:
    'Cross-Dataset Generalisation and Calibration Analysis of Stroke Risk Prediction Models',

  /** One-line hook below the title */
  subtitle:
    'What happens when clinical AI meets a population it has never seen?',

  /** Author attribution line */
  author:
    'Swayam Patnaik · B.Tech CSE (Data Science) · NIST University, Berhampur',

  /** Link to the project repository */
  githubUrl:
    'https://github.com/patnaikswayam131/CROSS-DATASET-GENERALISATION-AND-CALIBRATION-ANALYSIS-OF-STROKE-RISK-PREDICTION-MODELS.git',

  /** Paper availability status */
  paperStatus: 'Coming Soon',
};

// ────────────────────────────────────────────────────────────
//  Stat Pills (Hero)
// ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} StatPill
 * @property {string} text   -  Display text
 * @property {string} color  -  Colour key (danger | primary | neutral)
 */

/** @type {StatPill[]} */
export const statPills = [
  { text: '51–63% PR-AUC Collapse',   color: 'danger'  },
  { text: '3 Classifiers Evaluated',   color: 'primary' },
  { text: '2 Independent Datasets',    color: 'neutral' },
];

// ────────────────────────────────────────────────────────────
//  Hero Metric (animated counter)
// ────────────────────────────────────────────────────────────

/**
 * Primary hero metric for an animated counter component.
 * @type {{ value: number, label: string, unit: string }}
 */
export const heroMetric = {
  value: 63,
  label: 'Maximum PR-AUC Collapse',
  unit: '%',
};

// ────────────────────────────────────────────────────────────
//  Mini Bar Visual (Hero)
// ────────────────────────────────────────────────────────────

/**
 * Small in-hero bar comparison (Logistic Regression PR-AUC).
 * @type {{ inDomain: number, crossDomain: number, label: string }}
 */
export const heroMiniBar = {
  inDomain: 0.214,
  crossDomain: 0.079,
  label: 'Logistic Regression PR-AUC',
};

// ────────────────────────────────────────────────────────────
//  Navigation Links
// ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} NavLink
 * @property {string} label   -  Display text
 * @property {string} href    -  Anchor or path
 */

/** @type {NavLink[]} */
export const navLinks = [
  { label: 'Problem',     href: '#problem'     },
  { label: 'Results',     href: '#results'     },
  { label: 'Explorer',    href: '#explorer'    },
  { label: 'Methodology', href: '#methodology' },
  { label: 'About',       href: '#about'       },
];

// ────────────────────────────────────────────────────────────
//  About Section
// ────────────────────────────────────────────────────────────

/**
 * Author bio, paper status, and citation strings.
 * @type {{ bio: string, paperStatus: string, bibtex: string, apa: string }}
 */
export const aboutContent = {
  bio:
    'Swayam Patnaik is a second-year B.Tech CSE (Data Science) student at NIST University, Berhampur, India, with a CGPA of 9.1. This research investigates generalisation failure in clinical machine learning and was conducted as an independent academic study targeting Scopus-indexed publication.',

  paperStatus: 'Under Review',

  bibtex: `@article{patnaik2025stroke,
  title={Cross-Dataset Generalisation and Calibration Analysis of Stroke Risk Prediction Models},
  author={Patnaik, Swayam},
  year={2025},
  note={Under review}
}`,

  apa:
    'Patnaik, S. (2025). Cross-dataset generalisation and calibration analysis of stroke risk prediction models. Manuscript under review.',
};

// ────────────────────────────────────────────────────────────
//  Footer
// ────────────────────────────────────────────────────────────

/**
 * Footer content block.
 * @type {{ title: string, author: string, github: string, institution: string, note: string }}
 */
export const footerContent = {
  title:
    'Cross-Dataset Generalisation and Calibration Analysis of Stroke Risk Prediction Models',
  author: 'Swayam Patnaik',
  github:
    'https://github.com/patnaikswayam131/CROSS-DATASET-GENERALISATION-AND-CALIBRATION-ANALYSIS-OF-STROKE-RISK-PREDICTION-MODELS.git',
  institution: 'Research conducted at NIST University, 2025.',
  note: 'All results are reproducible. Code and data instructions available on GitHub.',
};
