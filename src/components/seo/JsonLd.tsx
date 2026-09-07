import React from "react";

interface JsonLdProps {
  siteUrl?: string;
}

export default function JsonLd({
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL ||
    "https://aq-blood-life.vercel.app",
}: JsonLdProps) {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalOrganization",
        "@id": `${siteUrl}/#organization`,
        name: "Blood-Life",
        alternateName: [
          "BloodLife",
          "Blood-Life Network",
          "Blood Life Emergency Blood Donor Network",
        ],
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        image: `${siteUrl}/og-image.jpg`,
        description:
          "Community-driven blood donation management network connecting urgent blood recipients and hospitals with voluntary donors in real-time.",
        email: "support@bloodlife.org",
        telephone: "+1-800-BLOOD-HELP",
        medicalSpecialty: ["Hematology", "Emergency"],
        serviceType: [
          "Blood Donor Matching",
          "Emergency Blood Request Dispatch",
          "Voluntary Blood Donor Registration",
          "Blood Availability Directory",
        ],
        founder: {
          "@type": "Person",
          name: "Abdullah Qureshi",
          url: "https://abdullah-qureshi.vercel.app",
          sameAs: [
            "https://www.linkedin.com/in/abdullahqureshi27",
            "https://github.com/abdullahqureshi27",
          ],
        },
        sameAs: [
          "https://github.com/abdullahqureshi27/blood-life",
          "https://www.linkedin.com/in/abdullahqureshi27",
          "https://abdullah-qureshi.vercel.app",
        ],
        knowsAbout: [
          "Blood Donation",
          "ABO Blood Group System",
          "Rh Blood Group System",
          "O Negative Universal Donor",
          "AB Positive Universal Recipient",
          "Emergency Blood Transfusion",
          "Voluntary Blood Donor Network",
        ],
        areaServed: {
          "@type": "Country",
          name: "Pakistan",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Blood-Life | Emergency Blood Donor Network & Matching Portal",
        description:
          "Official online platform for finding voluntary blood donors and requesting emergency blood units.",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/search?bloodGroup={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How can I find an emergency blood donor near me?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can find blood donors instantly on Blood-Life by visiting the Donor Search page. Filter by blood group (A+, A-, B+, B-, AB+, AB-, O+, O-), province, and district to find active donors ready to help, or post an urgent blood request directly to our network.",
            },
          },
          {
            "@type": "Question",
            name: "Who is eligible to donate blood through Blood-Life?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Voluntary donors must generally be in good overall health, aged 18 to 65, weigh at least 50 kg (110 lbs), and maintain a minimum interval of 3 months (90 days) since their last blood donation.",
            },
          },
          {
            "@type": "Question",
            name: "Which blood types are universal donors and universal recipients?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O-negative (O-) is the universal red blood cell donor type compatible with all blood types. AB-positive (AB+) individuals are universal red blood cell recipients capable of receiving blood from any blood group.",
            },
          },
          {
            "@type": "Question",
            name: "How do I register as a voluntary blood donor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Navigate to the Register page, sign in or create an account, enter your personal details, blood group, and location, and set your availability toggle to active so patients in need can reach you.",
            },
          },
          {
            "@type": "Question",
            name: "Is Blood-Life free to use for patients and donors?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, Blood-Life is a 100% free, non-profit community initiative engineered to connect blood donors and recipients without any intermediary fees.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
