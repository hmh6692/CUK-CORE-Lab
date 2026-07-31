const eutilsBase = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const eutilsParams = "tool=park_heor_lab_site&email=sk.park%40catholic.ac.kr";
const crossrefBase = "https://api.crossref.org/works";
const crossrefParams = "mailto=sk.park@catholic.ac.kr";
const orcidBase = "https://pub.orcid.org/v3.0";

const defaultContent = {
  site: {
    brand: {
      mark: "SP",
      logo: "logo.png",
      name: "CUK-CORE Lab",
      tagline: "Cross-disciplinary Outcomes Research for Evidence",
    },
    meta: {
      title: "박선경 교수 연구실 | 가톨릭대학교 사회약학 · CUK-CORE Lab",
      description:
        "가톨릭대학교 사회약학 박선경 교수 연구실 CUK-CORE Lab입니다. 보건사회약학, 약물경제성평가, 건강성과연구, 근거합성 및 보건의료 빅데이터 연구를 수행합니다.",
    },
    hero: {
      kicker: "Cross-disciplinary Outcomes Research for Evidence",
      title: "CUK-CORE Lab",
      lede: "We study how medicines, vaccines, and health interventions create value in real-world care, using health economics, evidence synthesis, and pharmacoepidemiology.",
      localLabel: "가톨릭대학교 사회약학 · 박선경 교수 연구실",
      primaryButtonText: "Explore Research",
      secondaryButtonText: "Latest Publications",
    },
    about: {
      kicker: "About the Lab",
      title: "Evidence for better pharmaceutical decisions",
      paragraphs: [
        "Led by Prof. Sun-Kyeong Park, the lab focuses on pharmaceutical outcomes and policy research. Our work connects economic evaluation, systematic review, Bayesian network meta-analysis, big-data analysis, healthcare cost analysis, and pharmacoepidemiology.",
        "The lab combines focused mentorship with methodologically rigorous work across cancer, heart failure, vaccines, and other high-impact disease areas.",
      ],
      localContext:
        "CUK-CORE Lab은 가톨릭대학교 약학대학 박선경 교수가 이끄는 보건사회약학 연구실로, 약물경제성평가와 빅데이터 기반 건강성과연구를 수행합니다.",
    },
    contact: {
      kicker: "Contact",
      title: "Connect with the lab",
      address: "College of Pharmacy, The Catholic University of Korea\n43 Jibong-ro, Bucheon, 14662, South Korea",
      email: "sk.park@catholic.ac.kr",
    },
    footer: {
      name: "CUK-CORE Lab",
      tagline: "Cross-disciplinary Outcomes Research for Evidence - College of Pharmacy",
    },
  },
  research: {
    kicker: "Research",
    title: "Methods that connect evidence, cost, and outcomes",
    cards: [
      {
        icon: "line-chart",
        title: "Economic Evaluation",
        description:
          "Cost-effectiveness and value assessment of medicines, vaccines, and health interventions in Korean and global decision settings.",
      },
      {
        icon: "network",
        title: "Evidence Synthesis",
        description:
          "Systematic reviews and Bayesian network meta-analysis to compare treatment options when direct evidence is limited.",
      },
      {
        icon: "database",
        title: "Real-World Data",
        description:
          "Big-data analysis and pharmacoepidemiologic studies that examine utilization, outcomes, safety, and costs in routine care.",
      },
      {
        icon: "heart-pulse",
        title: "Disease Areas",
        description:
          "Applications include breast cancer, non-small cell lung cancer, colorectal cancer, heart failure, and vaccine policy.",
      },
    ],
    methodTags: [
      "Pharmaceutical outcomes",
      "Policy research",
      "Cost analysis",
      "Systematic review",
      "Bayesian NMA",
      "Real-world evidence",
    ],
  },
  people: {
    kicker: "People",
    title: "Cultivating researchers for evidence-driven healthcare",
    principalInvestigator: {
      name: "Sun-Kyeong Park, Ph.D.",
      role: "Principal Investigator",
      initials: "SP",
      title: "Assistant Professor, College of Pharmacy, The Catholic University of Korea.",
      localName: "박선경 교수",
      localAffiliation: "가톨릭대학교 약학대학 · 보건사회약학",
      photo: "PI_profile.jpg",
      profileLinks: [
        { label: "ORCID", url: "https://orcid.org/0000-0003-4421-4513", icon: "badge-check" },
        {
          label: "Google Scholar",
          url: "https://scholar.google.co.kr/citations?hl=en&user=-3ZiVL4AAAAJ&view_op=list_works&sortby=pubdate",
          icon: "graduation-cap",
        },
        {
          label: "University Profile",
          url: "https://pharm.catholic.ac.kr/pharmacy/faculty/faculty.do?mode=view&persNo=212010916",
          icon: "building-2",
        },
        { label: "Email", url: "mailto:sk.park@catholic.ac.kr", icon: "mail" },
      ],
      education: [
        { degree: "Ph.D.", details: "Health and Social Pharmacy, Sungkyunkwan University" },
        { degree: "B.S.", details: "Pharmacy, Sookmyung Women's University" },
      ],
      experience: [
        {
          period: "Aug. 2020-Present",
          role: "Assistant Professor",
          institution: "College of Pharmacy, The Catholic University of Korea",
        },
        {
          period: "Apr. 2019-May 2020",
          role: "Postdoctoral Research Associate",
          institution: "School of Pharmacy, Northeastern University",
        },
        {
          period: "Apr. 2018-Mar. 2019",
          role: "External Researcher",
          institution: "National Evidence-based Healthcare Collaborating Agency (NECA)",
        },
        {
          period: "Mar. 2017-Feb. 2019",
          role: "Postdoctoral Researcher",
          institution: "Research Institute of Pharmaceutical Sciences, Sungkyunkwan University",
        },
      ],
    },
    members: [],
    teamNotes: [
      {
        title: "Graduate Researchers",
        description:
          "Current students work on health economics, outcomes research, evidence synthesis, and real-world data projects.",
      },
      {
        title: "Alumni",
        description:
          "Former graduate students have contributed to applied pharmaceutical policy and economic evaluation studies.",
      },
      {
        title: "Prospective Members",
        description:
          "Students interested in quantitative health research, pharmacy policy, and evidence synthesis are welcome to get in touch.",
      },
    ],
  },
  publications: {
    kicker: "Publications",
    title: "Recent and complete publications",
    scholarUrl: "https://scholar.google.co.kr/citations?hl=en&user=-3ZiVL4AAAAJ&view_op=list_works&sortby=pubdate",
    recentLimit: 5,
    archiveLimit: 100,
    pubmedQueries: [{ name: "Sun-Kyeong Park", term: "sk.park@catholic.ac.kr[Affiliation]" }],
    orcidProfiles: [],
    crossrefQueries: [],
    crossrefDois: [
      "10.1186/s12889-026-27078-w",
      "10.1016/j.vaccine.2024.05.048",
      "10.1016/j.ijcard.2024.131786",
      "10.1016/j.vaccine.2024.01.031",
      "10.1007/s40261-023-01283-6",
    ],
    fallbackPublications: [
      {
        uid: "41896839",
        title: "Economic evaluation of diversion programs for people with drug-related legal involvement: a systematic review.",
        authors: ["Nam KA", "Ha MK", "Kang DW", "Park SK"],
        source: "BMC Public Health",
        pubdate: "2026 Mar 27",
        doi: "10.1186/s12889-026-27078-w",
      },
      {
        uid: "38845302",
        title:
          "Cost-effectiveness analysis of the 20-valent pneumococcal conjugate vaccine for the pediatric population in South Korea.",
        authors: ["Kang DW", "June Choe Y", "Lee JY", "Suk IA", "Kim YS", "Kim HY", "Byun BK", "Park SK"],
        source: "Vaccine",
        pubdate: "2024 Sep 17",
        doi: "10.1016/j.vaccine.2024.05.048",
      },
      {
        uid: "38242507",
        title:
          "Comparative efficacy of vericiguat to sacubitril/valsartan for patients with heart failure reduced ejection fraction: Systematic review and network meta-analysis.",
        authors: ["Kang DW", "Kang SH", "Lee K", "Nam K", "Kim ES", "Youn JC", "Park SK"],
        source: "International Journal of Cardiology",
        pubdate: "2024 Apr 1",
        doi: "10.1016/j.ijcard.2024.131786",
      },
      {
        uid: "38225184",
        title:
          "Cost-effectiveness of the 20-valent pneumococcal conjugate vaccine versus the 23-valent pneumococcal polysaccharide vaccine for older adults in South Korea.",
        authors: ["Kang DW", "Kim CR", "Song JY", "Park SK"],
        source: "Vaccine",
        pubdate: "2024 Feb 6",
        doi: "10.1016/j.vaccine.2024.01.031",
      },
      {
        uid: "37365452",
        title:
          "Systematic Review of the Economic Evaluation of Sodium-Glucose Cotransporter-2 Inhibitors Used as Treatment in Patients with Heart Failure.",
        authors: ["Nam K", "Cho DS", "Kim H", "Kwon B", "Yoon Y", "Park C", "Kim ES", "Youn JC", "Park SK"],
        source: "Clinical Drug Investigation",
        pubdate: "2023 Jul",
        doi: "10.1007/s40261-023-01283-6",
      },
    ],
  },
};

const publicationList = document.querySelector("[data-publication-list]");
const publicationStatus = document.querySelector("[data-publication-status]");
const publicationQuery = document.querySelector("[data-publication-query]");
const pubmedLink = document.querySelector("[data-pubmed-link]");
const scholarLink = document.querySelector("[data-scholar-link]");
const refreshButton = document.querySelector("[data-refresh-publications]");
const publicationViewButtons = document.querySelectorAll("[data-publication-view]");
const publicationCount = document.querySelector("[data-publication-count]");
const publicationSummary = document.querySelector("[data-publication-summary]");
const publicationFilters = document.querySelector("[data-publication-filters]");
const publicationSearch = document.querySelector("[data-publication-search]");
const publicationYearFilter = document.querySelector("[data-publication-year]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

let activePublicationSettings = defaultContent.publications;
let publicationState = {
  records: [],
  sourceMode: "live",
  view: "recent",
  query: "",
  year: "all",
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && value !== undefined && value !== null) element.textContent = value;
}

function setHtml(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = value;
}

function safeUrl(value = "") {
  const text = String(value).trim();
  if (!text) return "";
  if (
    text.startsWith("/") ||
    text.startsWith("assets/") ||
    text.startsWith("http://") ||
    text.startsWith("https://") ||
    /^[A-Za-z0-9._/-]+\.(png|jpe?g|webp|gif|svg)$/i.test(text)
  ) {
    return text;
  }
  return "";
}

function safeProfileUrl(value = "") {
  const text = String(value).trim();
  return /^(https?:\/\/|mailto:)/i.test(text) ? text : "";
}

function boundedNumber(value, fallback, min, max) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.round(parsed)));
}

function recentPublicationLimit(settings = activePublicationSettings) {
  return boundedNumber(settings.recentLimit, 5, 1, 12);
}

function archivePublicationLimit(settings = activePublicationSettings) {
  return boundedNumber(settings.archiveLimit, 100, 5, 250);
}

function multilineHtml(value = "") {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

async function fetchJson(path, fallback) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load ${path}`);
    return await response.json();
  } catch (error) {
    return fallback;
  }
}

function createIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function renderSite(site) {
  const title = site.meta?.title || defaultContent.site.meta.title;
  const metaDescription = site.meta?.description || defaultContent.site.meta.description;
  document.title = title;
  const description = document.querySelector("[data-meta-description]");
  if (description) description.setAttribute("content", metaDescription);
  document.querySelector("[data-og-title]")?.setAttribute("content", title);
  document.querySelector("[data-og-description]")?.setAttribute("content", metaDescription);
  document.querySelector("[data-twitter-title]")?.setAttribute("content", title);
  document.querySelector("[data-twitter-description]")?.setAttribute("content", metaDescription);

  setText("[data-brand-mark]", site.brand?.mark);
  setText("[data-brand-name]", site.brand?.name);
  setText("[data-brand-tagline]", site.brand?.tagline);
  const brandLogo = document.querySelector("[data-brand-logo]");
  const brandMark = document.querySelector("[data-brand-mark]");
  const logo = safeUrl(site.brand?.logo);
  if (brandLogo && brandMark) {
    if (logo) {
      brandLogo.src = logo;
      brandLogo.alt = site.brand?.name || "Lab logo";
      brandLogo.hidden = false;
      brandMark.hidden = true;
    } else {
      brandLogo.hidden = true;
      brandMark.hidden = false;
    }
  }
  const brandHome = document.querySelector("[data-brand-home]");
  if (brandHome && site.hero?.title) brandHome.setAttribute("aria-label", `${site.hero.title} home`);

  setText("[data-hero-kicker]", site.hero?.kicker);
  setText("[data-hero-title]", site.hero?.title);
  setText("[data-hero-lede]", site.hero?.lede);
  setText("[data-hero-local]", site.hero?.localLabel);
  setText("[data-hero-primary]", site.hero?.primaryButtonText);
  setText("[data-hero-secondary]", site.hero?.secondaryButtonText);

  setText("[data-about-kicker]", site.about?.kicker);
  setText("[data-about-title]", site.about?.title);
  const paragraphs = site.about?.paragraphs || [];
  setHtml("[data-about-paragraphs]", paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join(""));
  const aboutLocal = document.querySelector("[data-about-local]");
  if (aboutLocal) {
    aboutLocal.textContent = site.about?.localContext || "";
    aboutLocal.hidden = !site.about?.localContext;
  }

  setText("[data-contact-kicker]", site.contact?.kicker);
  setText("[data-contact-title]", site.contact?.title);
  setHtml("[data-contact-address]", multilineHtml(site.contact?.address));
  const contactEmail = document.querySelector("[data-contact-email]");
  if (contactEmail && site.contact?.email) {
    contactEmail.href = `mailto:${site.contact.email}`;
    contactEmail.innerHTML = `<i data-lucide="mail" aria-hidden="true"></i>${escapeHtml(site.contact.email)}`;
  }

  setText("[data-footer-name]", site.footer?.name);
  setText("[data-footer-tagline]", site.footer?.tagline);
}

function renderResearch(research) {
  setText("[data-research-kicker]", research.kicker);
  setText("[data-research-title]", research.title);
  setHtml(
    "[data-research-cards]",
    (research.cards || [])
      .map(
        (card) => `
          <article class="research-card">
            <i data-lucide="${escapeHtml(card.icon || "circle")}" aria-hidden="true"></i>
            <h3>${escapeHtml(card.title)}</h3>
            <p>${escapeHtml(card.description)}</p>
          </article>
        `,
      )
      .join(""),
  );
  setHtml("[data-method-tags]", (research.methodTags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join(""));
}

function personVisual(person) {
  const photo = safeUrl(person.photo);
  if (photo) {
    return `
      <span class="person-photo-frame">
        <img class="person-photo" src="${escapeHtml(photo)}" alt="${escapeHtml(person.name)}" loading="lazy" />
      </span>
    `;
  }
  return `<div class="initials" aria-hidden="true">${escapeHtml(person.initials || initialsFromName(person.name))}</div>`;
}

function initialsFromName(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function educationHtml(education = []) {
  if (!education.length) return "";
  return `
    <h4 class="profile-subheading">Education</h4>
    <dl class="mini-cv">
      ${education
        .map(
          (item) => `
            <div>
              <dt>${escapeHtml(item.degree)}</dt>
              <dd>${escapeHtml(item.details)}</dd>
            </div>
          `,
        )
        .join("")}
    </dl>
  `;
}

function experienceHtml(experience = []) {
  if (!experience.length) return "";
  return `
    <details class="experience-disclosure">
      <summary>
        <span>Academic Experience</span>
        <i data-lucide="chevron-down" aria-hidden="true"></i>
      </summary>
      <ol class="experience-list">
        ${experience
          .map(
            (item) => `
              <li>
                <span>${escapeHtml(item.period)}</span>
                <strong>${escapeHtml(item.role)}</strong>
                <em>${escapeHtml(item.institution)}</em>
              </li>
            `,
          )
          .join("")}
      </ol>
    </details>
  `;
}

function profileLinksHtml(links = []) {
  const visibleLinks = links
    .map((link) => ({ ...link, url: safeProfileUrl(link.url) }))
    .filter((link) => link.label && link.url);
  if (!visibleLinks.length) return "";

  return `
    <div class="profile-links" aria-label="Researcher profiles">
      ${visibleLinks
        .map((link) => {
          const externalAttributes = link.url.startsWith("mailto:") ? "" : ' target="_blank" rel="noreferrer"';
          return `
            <a class="profile-link" href="${escapeHtml(link.url)}"${externalAttributes}>
              <i data-lucide="${escapeHtml(link.icon || "external-link")}" aria-hidden="true"></i>
              ${escapeHtml(link.label)}
            </a>
          `;
        })
        .join("")}
    </div>
  `;
}

function memberCardHtml(member) {
  return `
    <article class="member-card">
      ${personVisual(member)}
      <div>
        <p class="role">${escapeHtml(member.role || member.category || "Lab Member")}</p>
        <h3>${escapeHtml(member.name)}</h3>
        ${member.title ? `<p>${escapeHtml(member.title)}</p>` : ""}
        ${member.bio ? `<p>${escapeHtml(member.bio)}</p>` : ""}
      </div>
    </article>
  `;
}

function memberGroupHtml(title, members) {
  if (!members.length) return "";
  return `
    <section class="member-group" aria-label="${escapeHtml(title)}">
      <div class="member-group-heading">
        <h3>${escapeHtml(title)}</h3>
        <span>${members.length}</span>
      </div>
      <div class="member-grid">
        ${members.map(memberCardHtml).join("")}
      </div>
    </section>
  `;
}

function renderPeople(people) {
  setText("[data-people-kicker]", people.kicker);
  setText("[data-people-title]", people.title);

  const pi = people.principalInvestigator || {};
  setHtml(
    "[data-pi-card]",
    `
      ${personVisual(pi)}
      <div>
        <p class="role">${escapeHtml(pi.role)}</p>
        <h3>${escapeHtml(pi.name)}</h3>
        <p>${escapeHtml(pi.title)}</p>
        ${
          pi.localName || pi.localAffiliation
            ? `<p class="profile-local" lang="ko">
                ${pi.localName ? `<strong>${escapeHtml(pi.localName)}</strong>` : ""}
                ${pi.localAffiliation ? `<span>${escapeHtml(pi.localAffiliation)}</span>` : ""}
              </p>`
            : ""
        }
        ${profileLinksHtml(pi.profileLinks)}
        ${educationHtml(pi.education)}
        ${experienceHtml(pi.experience)}
      </div>
    `,
  );

  const visibleMembers = (people.members || []).filter((member) => member.name);
  const notes = (people.teamNotes || []).filter((note) => {
    if (!visibleMembers.length) return true;
    return /prospective|join|contact/i.test(note.title || "");
  });
  const teamNotes = document.querySelector("[data-team-notes]");
  if (teamNotes) teamNotes.hidden = notes.length === 0;
  setHtml(
    "[data-team-notes]",
    notes
      .map(
        (note) => `
          <article>
            <h3>${escapeHtml(note.title)}</h3>
            <p>${escapeHtml(note.description)}</p>
          </article>
        `,
      )
      .join(""),
  );

  const memberGrid = document.querySelector("[data-member-grid]");
  if (!memberGrid) return;
  memberGrid.hidden = visibleMembers.length === 0;
  const alumni = visibleMembers.filter((member) => member.category === "Alumni");
  const currentMembers = visibleMembers.filter((member) => member.category !== "Alumni");
  memberGrid.innerHTML = [
    memberGroupHtml("Current Researchers", currentMembers),
    memberGroupHtml("Alumni", alumni),
  ].join("");
}

function buildPubmedQuery(queries = []) {
  return queries
    .map(({ term }) => String(term || "").trim())
    .filter(Boolean)
    .map((term) => `(${term})`)
    .join(" OR ");
}

function buildPubmedLabel(queries = []) {
  return queries
    .map(({ name }) => String(name || "").trim())
    .filter(Boolean)
    .join(", ");
}

function configuredSources(settings) {
  const sources = [];
  if ((settings.pubmedQueries || []).some((query) => query.term)) sources.push("PubMed");
  if ((settings.orcidProfiles || []).some((profile) => profile.orcid)) sources.push("ORCID");
  if (
    (settings.crossrefQueries || []).some((query) => query.orcid || query.query) ||
    (settings.crossrefDois || []).some(Boolean)
  ) {
    sources.push("Crossref");
  }
  return sources;
}

function renderPublicationSettings(settings) {
  activePublicationSettings = settings;
  setText("[data-publications-kicker]", settings.kicker);
  setText("[data-publications-title]", settings.title);
  const recentButton = document.querySelector('[data-publication-view="recent"]');
  if (recentButton) recentButton.textContent = `Recent ${recentPublicationLimit(settings)}`;

  const query = buildPubmedQuery(settings.pubmedQueries);
  const label = buildPubmedLabel(settings.pubmedQueries) || "configured lab researchers";
  const sourceLabel = configuredSources(settings).join(", ") || "saved records";
  if (publicationQuery) publicationQuery.textContent = `Publication sources: ${sourceLabel} (${label})`;
  if (pubmedLink && query) pubmedLink.href = `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`;
  if (scholarLink && settings.scholarUrl) scholarLink.href = settings.scholarUrl;
}

function compactDateParts(parts = []) {
  const [year, month, day] = parts;
  return [year, month, day].filter(Boolean).join("-");
}

function crossrefDate(item = {}) {
  const published =
    item.published ||
    item["published-print"] ||
    item["published-online"] ||
    item.issued ||
    item.created ||
    item.deposited;
  return compactDateParts(published?.["date-parts"]?.[0] || []);
}

function orcidDate(summary = {}) {
  const date = summary["publication-date"] || {};
  return [date.year?.value, date.month?.value, date.day?.value].filter(Boolean).join("-");
}

function sortDateValue(value = "") {
  const parsed = Date.parse(value);
  if (!Number.isNaN(parsed)) return parsed;
  const year = String(value).match(/\b(19|20)\d{2}\b/)?.[0];
  return year ? Date.parse(`${year}-01-01`) : 0;
}

function normalizeDoi(doi = "") {
  return String(doi).trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").toLowerCase();
}

function normalizePublicationTitle(title = "") {
  return String(title)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function formatAuthors(authors = []) {
  const names = authors.map((author) => (typeof author === "string" ? author : author.name)).filter(Boolean);
  if (names.length <= 6) return names.join(", ");
  return `${names.slice(0, 6).join(", ")} et al.`;
}

function getDoi(publication) {
  if (publication.doi) return publication.doi;
  const doiRecord = publication.articleids?.find((record) => record.idtype === "doi");
  return doiRecord?.value || "";
}

function normalizePubmedPublication(publication) {
  const doi = getDoi(publication);
  return {
    id: publication.uid ? `pmid:${publication.uid}` : "",
    provider: "PubMed",
    uid: publication.uid,
    title: publication.title || "",
    authors: publication.authors || [],
    source: publication.source || publication.fulljournalname || "",
    pubdate: publication.pubdate || publication.sortpubdate || "",
    doi,
    url: publication.uid ? `https://pubmed.ncbi.nlm.nih.gov/${publication.uid}/` : "",
    sortDate: publication.sortpubdate || publication.pubdate || "",
  };
}

function normalizeSavedPublication(publication) {
  const doi = getDoi(publication);
  return {
    id: publication.id || (doi ? `doi:${normalizeDoi(doi)}` : `saved:${normalizePublicationTitle(publication.title)}`),
    provider: publication.provider || "Google Scholar",
    uid: publication.uid || "",
    title: publication.title || "",
    authors: publication.authors || [],
    source: publication.source || "",
    pubdate: publication.pubdate || publication.year || "",
    doi,
    url: publication.url || (publication.uid ? `https://pubmed.ncbi.nlm.nih.gov/${publication.uid}/` : doi ? `https://doi.org/${doi}` : ""),
    sortDate: publication.sortDate || publication.pubdate || publication.year || "",
  };
}

function normalizeCrossrefPublication(item, provider = "Crossref") {
  const doi = item.DOI || item.doi || "";
  const title = Array.isArray(item.title) ? item.title[0] : item.title;
  const journal = Array.isArray(item["container-title"]) ? item["container-title"][0] : item["container-title"];
  const authors = (item.author || []).map((author) => [author.given, author.family].filter(Boolean).join(" "));
  const pubdate = crossrefDate(item);
  return {
    id: doi ? `doi:${normalizeDoi(doi)}` : `crossref:${title}`,
    provider,
    uid: "",
    title: title || "",
    authors,
    source: journal || item.publisher || "",
    pubdate,
    doi,
    url: item.URL || (doi ? `https://doi.org/${doi}` : ""),
    sortDate: pubdate,
  };
}

function externalIdValue(externalIds = [], type) {
  const match = externalIds.find((item) => String(item["external-id-type"]).toLowerCase() === type);
  return match?.["external-id-normalized"]?.value || match?.["external-id-value"] || "";
}

function normalizeOrcidPublication(summary, profile) {
  const externalIds = summary["external-ids"]?.["external-id"] || [];
  const groupExternalIds = summary.groupExternalIds || [];
  const doi = externalIdValue(externalIds, "doi") || externalIdValue(groupExternalIds, "doi");
  const title = summary.title?.title?.value || "";
  const pubdate = orcidDate(summary);
  return {
    id: doi ? `doi:${normalizeDoi(doi)}` : `orcid:${profile.orcid}:${summary["put-code"]}`,
    provider: "ORCID",
    uid: "",
    title,
    authors: profile.name ? [profile.name] : [],
    source: summary["journal-title"]?.value || "ORCID record",
    pubdate,
    doi,
    url: summary.url?.value || (doi ? `https://doi.org/${doi}` : `https://orcid.org/${profile.orcid}`),
    sortDate: pubdate,
  };
}

function publicationKeys(publication) {
  const keys = [];
  const doi = normalizeDoi(publication.doi);
  const title = normalizePublicationTitle(publication.title);
  if (doi) keys.push(`doi:${doi}`);
  if (publication.uid) keys.push(`uid:${publication.uid}`);
  if (publication.id) keys.push(`id:${publication.id}`);
  if (title) keys.push(`title:${title}`);
  return keys;
}

function isEnrichmentProvider(provider = "") {
  return ["PubMed", "Crossref", "ORCID"].includes(provider);
}

function mergePublications(publications, limit = archivePublicationLimit()) {
  const merged = new Map();
  const aliases = new Map();
  for (const publication of publications.filter((item) => item?.title)) {
    const keys = publicationKeys(publication);
    if (!keys.length) continue;
    const key = keys.map((candidate) => aliases.get(candidate)).find(Boolean) || keys[0];
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, {
        ...publication,
        providers: [publication.provider].filter(Boolean),
      });
      keys.forEach((candidate) => aliases.set(candidate, key));
      continue;
    }

    const next = { ...existing };
    const shouldPreferIncoming = isEnrichmentProvider(publication.provider);
    for (const field of ["uid", "title", "source", "pubdate", "doi", "url", "sortDate"]) {
      if (!next[field] && publication[field]) next[field] = publication[field];
      if (shouldPreferIncoming && ["uid", "source", "pubdate", "doi", "url", "sortDate"].includes(field) && publication[field]) {
        next[field] = publication[field];
      }
    }
    if ((!next.authors || !next.authors.length) && publication.authors?.length) next.authors = publication.authors;
    next.providers = [...new Set([...(next.providers || []), publication.provider].filter(Boolean))];
    merged.set(key, next);
    keys.forEach((candidate) => aliases.set(candidate, key));
  }

  return [...merged.values()]
    .sort((a, b) => sortDateValue(b.sortDate || b.pubdate) - sortDateValue(a.sortDate || a.pubdate))
    .slice(0, limit);
}

async function fetchPubmedPublications(settings) {
  const query = buildPubmedQuery(settings.pubmedQueries);
  if (!query) return [];
  const searchUrl = `${eutilsBase}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(
    query,
  )}&retmode=json&retmax=${archivePublicationLimit(settings)}&sort=pub+date&${eutilsParams}`;
  const searchResponse = await fetch(searchUrl);
  if (!searchResponse.ok) throw new Error("PubMed search failed");
  const searchData = await searchResponse.json();
  const ids = searchData.esearchresult?.idlist || [];
  if (!ids.length) return [];

  const summaryUrl = `${eutilsBase}/esummary.fcgi?db=pubmed&id=${ids.join(",")}&retmode=json&${eutilsParams}`;
  const summaryResponse = await fetch(summaryUrl);
  if (!summaryResponse.ok) throw new Error("PubMed summary failed");
  const summaryData = await summaryResponse.json();
  return summaryData.result.uids.map((uid) => normalizePubmedPublication(summaryData.result[uid]));
}

async function fetchOrcidPublications(settings) {
  const profiles = (settings.orcidProfiles || []).filter((profile) => profile.orcid);
  if (!profiles.length) return [];

  const groupsByProfile = await Promise.all(
    profiles.map(async (profile) => {
      const response = await fetch(`${orcidBase}/${encodeURIComponent(profile.orcid)}/works`, {
        headers: { Accept: "application/vnd.orcid+json" },
      });
      if (!response.ok) throw new Error(`ORCID works failed for ${profile.orcid}`);
      const data = await response.json();
      const summaries = (data.group || []).flatMap((group) =>
        (group["work-summary"] || []).map((summary) => ({
          ...summary,
          groupExternalIds: group["external-ids"]?.["external-id"] || [],
        })),
      );
      const maxWorks = boundedNumber(profile.maxWorks, archivePublicationLimit(settings), 1, archivePublicationLimit(settings));
      return summaries.slice(0, maxWorks).map((summary) => normalizeOrcidPublication(summary, profile));
    }),
  );

  return groupsByProfile.flat();
}

async function fetchCrossrefDoiPublications(settings) {
  const dois = (settings.crossrefDois || []).map(normalizeDoi).filter(Boolean);
  if (!dois.length) return [];

  const items = await Promise.all(
    dois.map(async (doi) => {
      const response = await fetch(`${crossrefBase}/${encodeURIComponent(doi)}?${crossrefParams}`);
      if (!response.ok) throw new Error(`Crossref DOI lookup failed for ${doi}`);
      const data = await response.json();
      return normalizeCrossrefPublication(data.message, "Crossref");
    }),
  );
  return items;
}

async function fetchCrossrefQueryPublications(settings) {
  const queries = (settings.crossrefQueries || []).filter((query) => query.orcid || query.query);
  if (!queries.length) return [];

  const groups = await Promise.all(
    queries.map(async (query) => {
      const params = new URLSearchParams({
        rows: String(boundedNumber(query.rows, archivePublicationLimit(settings), 1, archivePublicationLimit(settings))),
        sort: "published",
        order: "desc",
        mailto: "sk.park@catholic.ac.kr",
      });
      if (query.orcid) params.set("filter", `orcid:${query.orcid}`);
      if (query.query) params.set("query.bibliographic", query.query);
      const response = await fetch(`${crossrefBase}?${params.toString()}`);
      if (!response.ok) throw new Error(`Crossref query failed for ${query.name || query.orcid || query.query}`);
      const data = await response.json();
      return (data.message?.items || []).map((item) => normalizeCrossrefPublication(item, "Crossref"));
    }),
  );

  return groups.flat();
}

function publicationLinks(publication) {
  const doi = getDoi(publication);
  return {
    doi,
    doiUrl: doi ? `https://doi.org/${doi}` : "",
    publicationUrl: publication.url || (publication.uid ? `https://pubmed.ncbi.nlm.nih.gov/${publication.uid}/` : ""),
  };
}

function renderPublicationCard(publication, mode = "live") {
  const { doi, doiUrl, publicationUrl } = publicationLinks(publication);
  const title = escapeHtml(publication.title);
  return `
    <article class="publication-card">
      <p class="source-line">${escapeHtml((publication.providers || [publication.provider || mode]).join(" + "))}</p>
      <h3>${
        publicationUrl
          ? `<a href="${publicationUrl}" target="_blank" rel="noreferrer">${title}</a>`
          : title
      }</h3>
      <p class="journal-line">
        <span>${escapeHtml(publication.source || "Journal")}</span>
        <span>${escapeHtml(publication.pubdate || "")}</span>
      </p>
      <p>${escapeHtml(formatAuthors(publication.authors))}</p>
      ${
        doi
          ? `<p class="doi"><a href="${doiUrl}" target="_blank" rel="noreferrer">doi: ${escapeHtml(doi)}</a></p>`
          : ""
      }
    </article>
  `;
}

function publicationYear(publication) {
  return String(publication.sortDate || publication.pubdate || "").match(/\b(19|20)\d{2}\b/)?.[0] || "In press";
}

function renderPublicationArchiveItem(publication, mode = "live") {
  const { doi, doiUrl, publicationUrl } = publicationLinks(publication);
  const title = escapeHtml(publication.title);
  return `
    <article class="publication-row">
      <div class="publication-row-main">
        <p class="source-line">${escapeHtml((publication.providers || [publication.provider || mode]).join(" + "))}</p>
        <h3>${
          publicationUrl
            ? `<a href="${publicationUrl}" target="_blank" rel="noreferrer">${title}</a>`
            : title
        }</h3>
        <p class="journal-line">
          <span>${escapeHtml(publication.source || "Journal")}</span>
          <span>${escapeHtml(publication.pubdate || "")}</span>
        </p>
        <p>${escapeHtml(formatAuthors(publication.authors))}</p>
      </div>
      ${
        doi
          ? `<a class="publication-doi-chip" href="${doiUrl}" target="_blank" rel="noreferrer">DOI</a>`
          : ""
      }
    </article>
  `;
}

function renderPublicationArchive(publications, mode = "live") {
  const groups = publications.reduce((acc, publication) => {
    const year = publicationYear(publication);
    if (!acc.has(year)) acc.set(year, []);
    acc.get(year).push(publication);
    return acc;
  }, new Map());

  return `
    <div class="publication-archive">
      ${[...groups.entries()]
        .map(
          ([year, items]) => `
            <section class="publication-year-group" aria-label="${escapeHtml(year)} publications">
              <div class="publication-year">${escapeHtml(year)}</div>
              <div class="publication-year-items">
                ${items.map((item) => renderPublicationArchiveItem(item, mode)).join("")}
              </div>
            </section>
          `,
        )
        .join("")}
    </div>
  `;
}

function publicationSearchText(publication) {
  return [
    publication.title,
    publication.source,
    publication.pubdate,
    ...(publication.authors || []).map((author) => (typeof author === "string" ? author : author?.name)),
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase();
}

function filteredArchivePublications() {
  const query = publicationState.query.trim().toLocaleLowerCase();
  return publicationState.records.filter((publication) => {
    const matchesYear = publicationState.year === "all" || publicationYear(publication) === publicationState.year;
    const matchesQuery = !query || publicationSearchText(publication).includes(query);
    return matchesYear && matchesQuery;
  });
}

function updatePublicationFilterOptions() {
  if (!publicationYearFilter) return;
  const currentYear = publicationState.year;
  const years = [...new Set(publicationState.records.map(publicationYear))].sort((a, b) => {
    if (a === "In press") return -1;
    if (b === "In press") return 1;
    return Number(b) - Number(a);
  });
  publicationYearFilter.innerHTML = [
    '<option value="all">All years</option>',
    ...years.map((year) => `<option value="${escapeHtml(year)}">${escapeHtml(year)}</option>`),
  ].join("");
  const availableYears = new Set(["all", ...years]);
  publicationState.year = availableYears.has(currentYear) ? currentYear : "all";
  publicationYearFilter.value = publicationState.year;
}

function updatePublicationChrome() {
  const total = publicationState.records.length;
  const recentLimit = recentPublicationLimit();
  const filteredCount = filteredArchivePublications().length;
  const visibleCount = publicationState.view === "all" ? filteredCount : Math.min(recentLimit, total);
  const stamp = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  publicationViewButtons.forEach((button) => {
    const isActive = button.dataset.publicationView === publicationState.view;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  if (publicationFilters) publicationFilters.hidden = publicationState.view !== "all";
  if (publicationCount) publicationCount.textContent = total ? String(total) : "";
  if (publicationSummary) {
    const isFiltered = publicationState.query.trim() || publicationState.year !== "all";
    publicationSummary.textContent = isFiltered
      ? `${visibleCount} matching - ${total} total`
      : `${visibleCount} shown - ${total} total`;
  }
  if (publicationStatus) {
    publicationStatus.textContent =
      publicationState.sourceMode === "live"
        ? `${visibleCount} shown from configured sources - ${stamp}`
        : `${visibleCount} shown from saved publication records - ${stamp}`;
  }
}

function renderPublicationView() {
  if (!publicationList) return;
  const { records, sourceMode, view } = publicationState;
  const recentLimit = recentPublicationLimit();
  const visiblePublications = view === "all" ? filteredArchivePublications() : records.slice(0, recentLimit);

  publicationList.classList.toggle("is-archive", view === "all");
  if (!visiblePublications.length && view === "all") {
    publicationList.innerHTML = `
      <div class="publication-empty">
        <i data-lucide="search-x" aria-hidden="true"></i>
        <p>No publications match these filters.</p>
      </div>
    `;
  } else {
    publicationList.innerHTML =
      view === "all"
        ? renderPublicationArchive(visiblePublications, sourceMode)
        : visiblePublications.map((publication) => renderPublicationCard(publication, sourceMode)).join("");
  }

  updatePublicationChrome();
  createIcons();
}

function renderPublications(publications, mode = "live") {
  if (!publicationList || !publicationStatus) return;
  publicationState = {
    ...publicationState,
    records: publications,
    sourceMode: mode,
  };
  updatePublicationFilterOptions();
  renderPublicationView();
}

async function loadPublications(settings = activePublicationSettings) {
  if (!publicationList || !publicationStatus) return;
  publicationStatus.textContent = "Loading publication records...";
  if (publicationSummary) publicationSummary.textContent = "";
  if (refreshButton) refreshButton.disabled = true;
  const savedPublications = (settings.fallbackPublications || []).map(normalizeSavedPublication);

  try {
    const results = await Promise.allSettled([
      fetchPubmedPublications(settings),
      fetchOrcidPublications(settings),
      fetchCrossrefDoiPublications(settings),
      fetchCrossrefQueryPublications(settings),
    ]);
    const publications = mergePublications(
      [...savedPublications, ...results.flatMap((result) => (result.status === "fulfilled" ? result.value : []))],
      archivePublicationLimit(settings),
    );
    if (!publications.length) throw new Error("No publication records found");
    renderPublications(publications, "live");
  } catch (error) {
    renderPublications(
      mergePublications(savedPublications, archivePublicationLimit(settings)),
      "fallback",
    );
  } finally {
    if (refreshButton) refreshButton.disabled = false;
  }
}

function setupPublicationViews() {
  publicationViewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      publicationState.view = button.dataset.publicationView === "all" ? "all" : "recent";
      renderPublicationView();
    });
  });

  publicationSearch?.addEventListener("input", () => {
    publicationState.query = publicationSearch.value;
    renderPublicationView();
  });

  publicationYearFilter?.addEventListener("change", () => {
    publicationState.year = publicationYearFilter.value;
    renderPublicationView();
  });
}

function setupNavigation() {
  if (!nav || !navToggle) return;

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    const icon = navToggle.querySelector("svg");
    if (icon) {
      icon.outerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}" aria-hidden="true"></i>`;
      createIcons();
    }
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      const icon = navToggle.querySelector("svg");
      if (icon) icon.outerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
      createIcons();
    }
  });
}

function setupNetlifyIdentityRedirect() {
  if (!window.netlifyIdentity) return;
  window.netlifyIdentity.on("init", (user) => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

async function init() {
  if (document.body.matches("[data-static-page]")) {
    const year = document.querySelector("[data-year]");
    if (year) year.textContent = new Date().getFullYear();
    setupNavigation();
    createIcons();
    return;
  }

  const [site, research, people, publications] = await Promise.all([
    fetchJson("data/site.json", defaultContent.site),
    fetchJson("data/research.json", defaultContent.research),
    fetchJson("data/people.json", defaultContent.people),
    fetchJson("data/publications.json", defaultContent.publications),
  ]);

  document.querySelector("[data-year]").textContent = new Date().getFullYear();
  renderSite(site);
  renderResearch(research);
  renderPeople(people);
  renderPublicationSettings(publications);
  setupNavigation();
  setupPublicationViews();
  setupNetlifyIdentityRedirect();
  refreshButton?.addEventListener("click", () => loadPublications(activePublicationSettings));
  await loadPublications(publications);
  createIcons();
}

init();
