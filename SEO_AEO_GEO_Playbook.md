# Complete SEO, AEO & GEO Implementation Playbook for Blood-Life

> **Project Target:** Blood-Life — Blood Donor Registration & Emergency Request Network  
> **Production Base URL:** `https://aq-blood-life.vercel.app` (or custom domain via `NEXT_PUBLIC_SITE_URL`)  
> **Maintainer / Creator:** [Abdullah Qureshi](https://abdullah-qureshi.vercel.app)  
> **Framework:** Next.js 14 (App Router) + TypeScript + Tailwind CSS

---

## 📋 Table of Contents
1. [Executive Summary & Strategy](#executive-summary--strategy)
2. [Phase 1: Google Search Console Verification](#phase-1-google-search-console-verification)
3. [Phase 2: Search Engine Directives (`robots.ts` & `sitemap.ts`)](#phase-2-search-engine-directives-robotsts--sitemapts)
4. [Phase 3: Next.js Metadata & OpenGraph Architecture](#phase-3-nextjs-metadata--opengraph-architecture)
5. [Phase 4: AEO & GEO Structured Data (Schema.org JSON-LD)](#phase-4-aeo--geo-structured-data-schemaorg-json-ld)
6. [Phase 5: High-Intent Keyword Matrix & AEO Query Engine](#phase-5-high-intent-keyword-matrix--aeo-query-engine)
7. [Phase 6: Bidirectional Entity Authority (Backlinks & Social Graph)](#phase-6-bidirectional-entity-authority-backlinks--social-graph)
8. [Phase 7: Live Audit & Verification Checklist](#phase-7-live-audit--verification-checklist)

---

## Executive Summary & Strategy

Blood-Life operates in a high-urgency medical domain where seconds matter. The optimization strategy combines three distinct pillars:

| Pillar | Focus | Target Engine | Desired Outcome |
|---|---|---|---|
| **SEO (Search Engine Optimization)** | Keyword rankings, technical crawlability, sitemaps, semantic tags | Google, Bing | Top 3 rank for "emergency blood donor near me", "urgent O- blood", "blood group matching" |
| **AEO (Answer Engine Optimization)** | Direct answer extraction, FAQ structured data, conversational queries | Perplexity, ChatGPT Search, Gemini | Direct citation in AI answer boxes when users ask "How can I find blood donors?" |
| **GEO (Generative Engine Optimization)** | Entity definition, knowledge graphs, medical consensus alignment | LLMs, Google AI Overviews | Recognition of Blood-Life as an authoritative voluntary blood donation network |

---

## Phase 1: Google Search Console Verification

### Objective
Establish domain ownership with Google to enable indexing, monitor search queries, and submit sitemaps.

### Verification Methods Implemented:

#### Method A: Meta Tag (Recommended for Vercel Deployments)
In `src/app/layout.tsx`, the verification tag is pre-configured:
```typescript
verification: {
  google: process.env.GOOGLE_SITE_VERIFICATION || "YOUR_GSC_CODE",
}
```
1. Open [Google Search Console](https://search.google.com/search-console).
2. Choose **URL Prefix** and enter `https://aq-blood-life.vercel.app`.
3. Select **HTML tag** verification method.
4. Copy the `content` code string (e.g., `google-site-verification=abc123xyz...`).
5. Add it to your Vercel Environment Variables as `GOOGLE_SITE_VERIFICATION`.

#### Method B: HTML File Verification
A verification file placeholder is available at `public/google-site-verification.html`.
Replace the content with the exact string provided by Google and deploy.

---

## Phase 2: Search Engine Directives (`robots.ts` & `sitemap.ts`)

### 1. `src/app/robots.ts`
Ensures search engines index public donor searching and request facilities while shielding private API endpoints and authenticated user dashboards.

```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://aq-blood-life.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard",
          "/dashboard/",
          "/authentication/",
          "/admin/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard",
          "/dashboard/",
          "/authentication/",
          "/admin/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

### 2. `src/app/sitemap.ts`
Prioritizes emergency request and donor search pages to ensure high crawl frequency by Googlebot.

```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://aq-blood-life.vercel.app";
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/request`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];
}
```

---

## Phase 3: Next.js Metadata & OpenGraph Architecture

Configured in `src/app/layout.tsx`:

- **Title Template:** `%s | Blood-Life`
- **Default Title:** `Blood-Life | Emergency Blood Donor Network & Blood Group Matching`
- **Description:** *"Connect with voluntary blood donors in real-time. Search by blood group (A+, B+, O+, AB+, O-), district, or submit emergency blood requests 24/7 to save lives."*
- **Canonical Alternates:** Automatic normalization to `https://aq-blood-life.vercel.app`.
- **OpenGraph Social Preview:** 1200x630 banner located at `public/og-image.jpg` with high-contrast emergency typography and medical iconography.
- **Twitter Card:** `summary_large_image` for WhatsApp, LinkedIn, X, and Facebook sharing previews.
- **Robots Directives:** Explicit `max-image-preview: "large"`, `max-snippet: -1` for Google Discover and rich search snippets.

---

## Phase 4: AEO & GEO Structured Data (Schema.org JSON-LD)

Implemented in `src/components/seo/JsonLd.tsx` and injected in `<head>` of `src/app/layout.tsx`.

The schema contains a connected `@graph` with three core entities:

### 1. `MedicalOrganization` / `NGO`
```json
{
  "@type": "MedicalOrganization",
  "@id": "https://aq-blood-life.vercel.app/#organization",
  "name": "Blood-Life",
  "alternateName": ["BloodLife", "Blood-Life Emergency Blood Donor Network"],
  "url": "https://aq-blood-life.vercel.app",
  "logo": "https://aq-blood-life.vercel.app/logo.png",
  "image": "https://aq-blood-life.vercel.app/og-image.jpg",
  "description": "Community-driven blood donation management network connecting urgent blood recipients and hospitals with voluntary donors in real-time.",
  "email": "support@bloodlife.org",
  "telephone": "+1-800-BLOOD-HELP",
  "medicalSpecialty": ["Hematology", "Emergency"],
  "serviceType": [
    "Blood Donor Matching",
    "Emergency Blood Request Dispatch",
    "Voluntary Blood Donor Registration",
    "Blood Availability Directory"
  ],
  "founder": {
    "@type": "Person",
    "name": "Abdullah Qureshi",
    "url": "https://abdullah-qureshi.vercel.app",
    "sameAs": [
      "https://www.linkedin.com/in/abdullahqureshi27",
      "https://github.com/abdullahqureshi27"
    ]
  },
  "areaServed": {
    "@type": "Country",
    "name": "Pakistan"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }
}
```

### 2. `WebSite` with Sitelinks Search Box
Enables search engines to present an embedded search field directly in search results:
```json
{
  "@type": "WebSite",
  "@id": "https://aq-blood-life.vercel.app/#website",
  "url": "https://aq-blood-life.vercel.app",
  "name": "Blood-Life | Emergency Blood Donor Network & Matching Portal",
  "publisher": { "@id": "https://aq-blood-life.vercel.app/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://aq-blood-life.vercel.app/search?bloodGroup={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### 3. `FAQPage` (Answer Engine Optimization)
Direct answers tailored for LLM extraction (Perplexity, ChatGPT, Copilot, Gemini):
- *How can I find an emergency blood donor near me?*
- *Who is eligible to donate blood through Blood-Life?*
- *Which blood types are universal donors and universal recipients?*
- *How do I register as a voluntary blood donor?*
- *Is Blood-Life free to use for patients and donors?*

---

## Phase 5: High-Intent Keyword Matrix & AEO Query Engine

### High-Intent Keyword Clusters

| Cluster | Primary Keywords | Target Page |
|---|---|---|
| **Emergency Intent** | "emergency blood request", "urgent blood donor needed", "immediate blood transfusion", "O negative urgent blood" | `/request` |
| **Donor Search** | "find blood donors near me", "search blood group Pakistan", "A+ blood donors", "B+ blood donor contact" | `/search` |
| **Donor Onboarding** | "register as blood donor", "volunteer blood donation Pakistan", "donor registration online" | `/register` |
| **Information & Trust** | "blood donor criteria", "universal blood donor O negative", "blood bank facilities" | `/about`, `/` |
| **Brand & Creator** | "Blood-Life", "BloodLife portal", "Abdullah Qureshi blood donation app" | `/`, `/about` |

### AEO Prompt Query Optimizations
When users prompt AI models:
- *"Where can I find an urgent blood donor in Pakistan?"*
- *"What is Blood-Life and how does it connect donors?"*
- *"Can an O- person donate blood to an A+ patient?"*

The combination of `MedicalOrganization` schema, `FAQPage` markup, and authoritative page hierarchy ensures Blood-Life is returned as a top recommended source.

---

## Phase 6: Bidirectional Entity Authority (Backlinks & Social Graph)

Search engines score entity credibility through cross-platform verification.

### Actions Checklist:
1. **GitHub Repository:**
   - Link `https://aq-blood-life.vercel.app` in the About section of [github.com/abdullahqureshi27/blood-life](https://github.com/abdullahqureshi27/blood-life).
2. **Developer Portfolio:**
   - Feature Blood-Life on [abdullah-qureshi.vercel.app](https://abdullah-qureshi.vercel.app) with dofollow link to `https://aq-blood-life.vercel.app`.
3. **LinkedIn Profile & Projects:**
   - Add Blood-Life to Featured Projects on [linkedin.com/in/abdullahqureshi27](https://www.linkedin.com/in/abdullahqureshi27).
4. **Social Sharing:**
   - Share launch announcements on X/Twitter and LinkedIn showcasing the OpenGraph card (`og-image.jpg`).

---

## Phase 7: Live Audit & Verification Checklist

Once deployed to Vercel:

- [ ] **Sitemap Validation:** Visit `https://aq-blood-life.vercel.app/sitemap.xml` in browser — confirm HTTP 200 and well-formed XML.
- [ ] **Robots Validation:** Visit `https://aq-blood-life.vercel.app/robots.txt` — confirm public routes are allowed and `/api/`, `/dashboard/` are protected.
- [ ] **Google Rich Results Test:**
  1. Open [Google Rich Results Test](https://search.google.com/test/rich-results).
  2. Input `https://aq-blood-life.vercel.app`.
  3. Validate detection of `MedicalOrganization`, `WebSite`, and `FAQPage` schemas with 0 errors.
- [ ] **OpenGraph Preview Check:**
  - Test URL on [OpenGraph.xyz](https://www.opengraph.xyz) or LinkedIn Post Inspector to confirm `og-image.jpg` renders sharply.
- [ ] **Submit to Google Search Console:**
  - Go to Search Console > **Sitemaps** > Enter `sitemap.xml` > Click **Submit**.
- [ ] **Check Index Coverage:**
  - Query Google search: `site:aq-blood-life.vercel.app`.
