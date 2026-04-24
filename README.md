# Anandwan NGO Platform

A modern, responsive, and internationalized web platform built for **Anandwan**, a community of hope, rehabilitation, and sustainable living founded by Baba Amte. This platform empowers marginalized communities by spreading awareness, facilitating donations, showcasing handcrafted products, and providing multi-lingual access.

## ✨ Key Features

- **Next.js 15 App Router**: Built on the latest, modern React framework with Server Components and App Router architecture for lightning-fast performance.
- **Internationalization (i18n)**: Full support for multiple languages (**English, Hindi, Marathi**) using `react-i18next`, ensuring accessibility to diverse communities.
- **Premium Design & UI**: Styled with **Tailwind CSS** alongside custom scoped CSS (Glassmorphism, CSS grid layouts, smooth animations) providing a highly engaging, rich donor experience.
- **Donation & Receipts System**: Automated and robust email receipt generation powered by **Resend** and **Nodemailer**.
- **AI Chatbot**: Intelligent virtual assistant built with the **Groq SDK** to answer user queries and guide visitors through the platform.
- **Marketplace (Products)**: Beautifully designed product catalog showcasing items hand-crafted by Anandwan artisans, fully integrated into the App Router.
- **Database Persistence**: Integrated with **Supabase** for secure and scalable data storage.

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS + Custom CSS Modules
- **Internationalization**: `react-i18next` & `i18next-browser-languagedetector`
- **Database / Auth**: Supabase (`@supabase/supabase-js`)
- **Email Delivery**: Resend & Nodemailer
- **AI Integration**: Groq API (`groq-sdk`)
- **Icons**: `react-icons`

## 📂 Project Structure

```text
├── app/
│   ├── about/          # History, Mission, Vision, and Leadership 
│   ├── api/            # Next.js Serverless Route Handlers (Email, Supabase, Groq)
│   ├── awareness/      # Educational content on Leprosy and community impact
│   ├── contact/        # Contact forms and location details
│   ├── donate/         # Integrated donation & payment flow
│   ├── fundraiser/     # Active campaign tracking
│   ├── products/       # Anandwan marketplace grid and product details
│   ├── videos/         # Responsive YouTube video grids showcasing inspiring stories
│   ├── globals.css     # Global Tailwind directives & typography
│   └── layout.js       # Root Layout (Navbar, Footer, i18n Provider)
├── components/         # Reusable UI components (Navbar, Footer, Chatbot)
├── locales/            # i18n translation JSON files (en, hi, mr)
├── lib/                # Utility functions and API configuration
└── public/             # Static assets (images, icons)
```

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and `npm` installed.

### 1. Clone & Install
```bash
git clone https://github.com/your-username/anandwan-next.git
cd anandwan-next
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root of the project and add your API keys. You can use `.env.example` as a reference:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Groq (AI Chatbot)
GROQ_API_KEY=your_groq_api_key

# Resend / Email Config
RESEND_API_KEY=your_resend_api_key
```

### 3. Run Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.


## 🤝 Contributing
Contributions are always welcome. Whether it is improving the design, adding new localization keys, or integrating deeper analytics—feel free to fork this project and submit a Pull Request.

