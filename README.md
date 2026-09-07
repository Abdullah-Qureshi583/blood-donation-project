# Blood-Life — Blood Donor Registration & Emergency Request Network

> **A community-driven blood donation management platform connecting urgent blood recipients with voluntary donors through real-time blood group matching, donor availability status, and automated request alerts.**

---

> **Created & Maintained by [Abdullah Qureshi](https://abdullah-qureshi.vercel.app)**  
> 🚀 **Live Application**: [aq-blood-life.vercel.app](https://aq-blood-life.vercel.app) • 🌐 **Portfolio**: [abdullah-qureshi.vercel.app](https://abdullah-qureshi.vercel.app) • 💼 **LinkedIn**: [abdullahqureshi27](https://www.linkedin.com/in/abdullahqureshi27) • 🐙 **GitHub**: [@abdullahqureshi27](https://github.com/abdullahqureshi27)

---

[![Live Demo](https://img.shields.io/badge/Live_App-aq--blood--life.vercel.app-red?style=for-the-badge&logo=vercel)](https://aq-blood-life.vercel.app)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![NextAuth](https://img.shields.io/badge/Auth-NextAuth.js-blueviolet?style=for-the-badge)](https://next-auth.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![SEO & AEO](https://img.shields.io/badge/SEO%20%26%20AEO-Optimized-success?style=for-the-badge&logo=google)](https://github.com/abdullahqureshi27/blood-life)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)](https://github.com/abdullahqureshi27/blood-life)

---

## 🌟 Key Features

- 🩸 **Blood Group Matching & Filtering**: Search prospective donors by blood type (A+, A-, B+, B-, AB+, AB-, O+, O-), city, district, and readiness status.
- 📋 **Donor Registration & Profile**: Donors can register, specify donation history, set availability toggles, and manage emergency contact info.
- 🚨 **Urgent Blood Requests**: Post emergency blood requirements with hospital location, required units, and urgency level.
- 🔍 **Complete SEO, AEO & GEO Architecture**: Pre-configured dynamic `sitemap.xml`, `robots.txt`, Schema.org JSON-LD structured data (`MedicalOrganization`, `WebSite`, `FAQPage`), high-CTR OpenGraph social card, and AI answer engine optimizations.
- 🔐 **Secure NextAuth Authentication**: Password encryption via bcryptjs and session persistence with MongoDB adapter.
- 📬 **Email Notification Dispatch**: Automated confirmation and inquiry routing via Nodemailer.
- 📱 **Mobile-Optimized UI**: Accessible forms, responsive tabs, date pickers, and alerts powered by Tailwind and Radix UI.

---

## 🛠️ Technology Stack

| Domain | Technology / Library | Purpose |
|---|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) | Server-side rendering, routing, API routes |
| **Database** | [MongoDB](https://mongodb.com/) + [Mongoose](https://mongoosejs.com/) | Donors, blood requests, and user models |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) | Session security and credential authentication |
| **Form Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Client and server schema validation |
| **Styling** | Tailwind CSS + Radix UI + Lucide Icons | Responsive modern design |
| **Alerts & Modals** | SweetAlert2 + Radix Dialog | Interactive user confirmations |

---

## 🚀 Local Quickstart Guide

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas or local MongoDB instance

### 1. Clone the Repository
```bash
git clone https://github.com/abdullahqureshi27/blood-life.git
cd blood-life
```

### 2. Configure Environment Variables
Create a `.env.local` file:
```env
MONGODB_URI=your_mongodb_connection_uri
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
EMAIL_SERVER_USER=your_email@gmail.com
EMAIL_SERVER_PASSWORD=your_email_password
```

### 3. Install & Run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👨‍💻 Author & Connect

**Abdullah Qureshi**  
*Full-Stack & AI Systems Engineer*

- 🌐 **Portfolio**: [https://abdullah-qureshi.vercel.app](https://abdullah-qureshi.vercel.app)
- 💼 **LinkedIn**: [https://www.linkedin.com/in/abdullahqureshi27](https://www.linkedin.com/in/abdullahqureshi27)
- 🐙 **GitHub**: [https://github.com/abdullahqureshi27](https://github.com/abdullahqureshi27)
- ✉️ **Contact**: [mabdullahqureshi583@gmail.com](mailto:mabdullahqureshi583@gmail.com)