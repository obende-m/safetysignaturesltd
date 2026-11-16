/**
 * Guard tiers, training and welfare. Source: the company's 2018–2019 website (dossier §5, §12).
 * Specific eligibility rules (ages, ASIS certification) are deliberately left out until the
 * client confirms they are current. See CONTENT-STATUS.md.
 */

export const tiers = [
  {
    name: "Platinum Squad",
    role: "Command and front-of-house posts",
    drawnFrom: "Graduates and experienced former service personnel.",
    duties: ["Guard Force Commander", "Front desk and reception", "Inventory control"],
    suits: "Head offices, high-value sites and any post that needs a supervisor on site.",
  },
  {
    name: "Diamond Squad",
    role: "Access control and general duty",
    drawnFrom: "Officers with post-secondary qualifications or previous service.",
    duties: ["Access control", "General duty", "Inventory"],
    suits: "Commercial buildings, estate gates, schools and busy entrances.",
  },
  {
    name: "Standard Squad",
    role: "General guarding duties",
    drawnFrom: "Officers with a secondary school certificate, trained to our curriculum.",
    duties: ["General duties", "Gate and patrol", "Occurrence reporting"],
    suits: "Homes, small businesses and sites with routine needs.",
  },
] as const;

/** 12 of the 26 modules named on the company's website. The client should supply the full list. */
export const curriculum = [
  {
    theme: "Conduct and the law",
    modules: ["Professional ethics", "Vicarious liability", "Use of minimum force"],
  },
  {
    theme: "Prevention and control",
    modules: ["Crime prevention", "Access and egress control", "Crowd control"],
  },
  {
    theme: "Emergencies",
    modules: ["Fire safety", "First aid", "Crisis management", "Executive protection during crises"],
  },
  {
    theme: "Records and tools",
    modules: ["Report writing", "Basic computer literacy"],
  },
] as const;

export const curriculumModuleTotal = 26;

export const welfare = [
  { title: "Annual leave", body: "Annual leave once an officer completes a year of service." },
  { title: "Examination leave", body: "Time off for officers sitting examinations." },
  { title: "Staff loans", body: "Access to loans for officers in service." },
  { title: "Merit awards", body: "Awards and cash prizes for officers whose work stands out." },
  { title: "Institute membership", body: "Membership of a security institute sponsored for outstanding officers." },
] as const;

export const approachSteps = [
  {
    title: "Assess the site",
    body: "Before anyone is deployed we walk the site and record where it is exposed: entrances, perimeter, lighting, routines and people.",
  },
  {
    title: "Choose the tier",
    body: "The duties decide the officers. Command and reception posts get Platinum officers; access control Diamond; routine guarding Standard.",
  },
  {
    title: "Train for the post",
    body: "Officers are trained to our curriculum and briefed on the site's own rules, visitors and risks.",
  },
  {
    title: "Deploy and report",
    body: "Officers keep logs and write occurrence reports, and a Platinum officer can lead the post as Guard Force Commander.",
  },
] as const;

export const values = [
  { title: "Diligence", body: "Every round walked, every visitor logged, every report written." },
  { title: "Respect", body: "For clients, for visitors and for the officers who do the work." },
  { title: "Intelligence", body: "Security planned from an assessment of the site, not guessed." },
  { title: "Effectiveness", body: "Measured by the incidents that do not happen." },
] as const;
