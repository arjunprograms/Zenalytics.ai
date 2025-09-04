# 🧠 Zenalytics.ai - AI Health Analytics Platform

<div align="center">

![Zenalytics Banner](https://github.com/arjunprograms/Zenalytics.ai/raw/main/public/gradient-background.webp)

**Transform Your Health Data Into Actionable Insights with AI**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![AI Powered](https://img.shields.io/badge/AI-Powered-ff6b6b?style=for-the-badge)](https://github.com/arjunprograms/Zenalytics.ai)

[🚀 Live Demo](https://zenalytics-ai.vercel.app) • [📖 Documentation](./DOCUMENTATION.md) • [🐛 Report Bug](https://github.com/arjunprograms/Zenalytics.ai/issues) • [✨ Request Feature](https://github.com/arjunprograms/Zenalytics.ai/issues)

</div>

---

## 🌟 Overview

Zenalytics.ai is a cutting-edge health analytics platform that unifies disparate health data streams to provide a single, holistic view of your wellness. Using advanced AI algorithms, it transforms raw health numbers into actionable, personalized insights that help you understand the complex interplay between diet, exercise, sleep, and overall well-being.

### 🎯 Problem We Solve

Health-conscious individuals are drowning in data from disconnected sources:
- 📱 Wearables tracking sleep and activity
- 🍎 Apps logging nutrition and meals  
- ⚖️ Smart scales monitoring weight
- 🩺 Devices measuring blood pressure and vitals

**Our solution**: AI-powered platform that connects everything and reveals hidden patterns in your health data.

---

## ✨ Key Features

### 🤖 AI-Powered Intelligence
- **Correlation Discovery**: Find non-obvious relationships between health metrics
- **Predictive Analytics**: Forecast health trends and potential issues
- **Anomaly Detection**: Proactive identification of unusual patterns
- **Natural Language Queries**: Ask questions about your health in plain English

### 📊 Unified Health Dashboard
- **Multi-Source Integration**: Apple Health, Fitbit, Google Fit, MyFitnessPal
- **Real-time Synchronization**: Live updates from all connected devices
- **Interactive Visualizations**: Beautiful charts and health flow timelines
- **Comprehensive Health Story**: See how metrics influence each other

### 🔐 Privacy-First Approach
- **Local AI Processing**: GPT4All integration for privacy-focused analysis
- **No Data Sharing**: Your health data never leaves your device
- **Cache-based Storage**: Fast, secure local data management
- **End-to-end Encryption**: Enterprise-grade security

### 🎨 Modern User Experience
- **Glass Morphism Design**: Beautiful, modern interface
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Dark Theme**: Easy on the eyes for extended use
- **Smooth Animations**: Delightful interactions throughout

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arjunprograms/Zenalytics.ai.git
   cd Zenalytics.ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🎮 Try the Demo

Experience the full platform instantly with our demo mode:
1. Visit the homepage
2. Click "Try Demo" 
3. Explore all features with realistic sample data
4. No account required!

---

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **Charts**: Recharts for data visualization
- **AI Processing**: GPT4All for local AI inference
- **State Management**: React hooks with local storage
- **Authentication**: Custom auth system with cache storage

### Project Structure
```
Zenalytics.ai/
├── app/                    # Next.js App Router
│   ├── api/               # Backend API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── health/        # Health data & AI endpoints
│   ├── dashboard/         # Main application dashboard
│   ├── login/            # Authentication pages
│   └── register/
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── health/           # Health-specific components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
│   ├── auth.ts           # Authentication logic
│   ├── health-data.ts    # Health data management
│   └── api.ts            # API client functions
└── public/               # Static assets
```

---

## 🎯 Use Cases

### 🏃‍♂️ Fitness Enthusiasts
- Optimize training and recovery patterns
- Understand how sleep affects performance
- Track correlation between nutrition and energy levels
- Prevent overtraining with AI insights

### 🧘‍♀️ Health-Conscious Individuals  
- Make informed lifestyle choices based on personal data
- Discover hidden patterns in daily routines
- Get personalized recommendations for better health
- Track progress toward wellness goals

### 🩺 Chronic Condition Management
- Monitor multiple health metrics simultaneously
- Understand correlations between symptoms and lifestyle
- Get early warnings for potential health issues
- Share insights with healthcare providers

---

## 🤖 AI Capabilities

### Correlation Analysis
```
"Your heart rate variability improves by 15% when you get 7+ hours of sleep. 
This correlation is stronger on weekends when stress levels are lower."
```

### Predictive Insights
```
"Based on current training intensity, your VO2 max will likely reach 52.1 
within 6 weeks. Consider adding interval training twice weekly."
```

### Anomaly Detection
```
"Your resting heart rate has been 15% higher than usual for 3 consecutive days. 
This previously correlated with periods of high stress in your data."
```

### Personalized Recommendations
```
"Drinking 250ml water 45 minutes before workouts could improve your performance 
by 12% based on your sweat rate analysis."
```

---

## 📈 Example Insights

The AI discovers patterns like:
- Sleep quality impact on next-day workout performance
- Optimal exercise timing based on your circadian rhythm
- Correlation between hydration and energy levels
- Early indicators of illness or overtraining
- Nutrition effects on mood and cognitive function

---

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Setup
The application works out of the box with no additional environment variables required for local development.

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📱 Screenshots

<div align="center">

### 🏠 Landing Page
![Landing Page](https://via.placeholder.com/800x400/1a1a1a/00d4ff?text=Beautiful+Landing+Page)

### 📊 Health Dashboard
![Dashboard](https://via.placeholder.com/800x400/1a1a1a/00d4ff?text=AI+Health+Dashboard)

### 🤖 AI Chat Interface
![AI Chat](https://via.placeholder.com/800x400/1a1a1a/00d4ff?text=GPT4All+Health+Assistant)

</div>

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Other Platforms
- **Netlify**: Connect GitHub repo and deploy
- **Railway**: One-click deployment from GitHub
- **Docker**: Use included Dockerfile for containerization

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

### Areas for Contribution
- 🤖 AI model improvements
- 📊 New visualization types
- 🔌 Additional data source integrations
- 🎨 UI/UX enhancements
- 📱 Mobile app development
- 🧪 Testing and quality assurance

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenAI** for AI capabilities inspiration
- **Vercel** for Next.js framework
- **Shadcn** for beautiful UI components
- **GPT4All** for local AI processing
- **Health tech community** for valuable insights

---

## 📞 Support

- 📧 **Email**: support@zenalytics.ai
- 💬 **Discord**: [Join our community](https://discord.gg/zenalytics)
- 🐛 **Issues**: [GitHub Issues](https://github.com/arjunprograms/Zenalytics.ai/issues)
- 📖 **Docs**: [Full Documentation](./DOCUMENTATION.md)

---

<div align="center">

**Made with ❤️ by the Zenalytics Team**

⭐ **Star this repo if you find it helpful!** ⭐

[🌟 Give us a star](https://github.com/arjunprograms/Zenalytics.ai) • [🐦 Follow us on Twitter](https://twitter.com/zenalytics) • [💼 LinkedIn](https://linkedin.com/company/zenalytics)

</div>
