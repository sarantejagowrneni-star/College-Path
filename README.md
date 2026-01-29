🎓 College Path:
Link: https://college-path-self.vercel.app/register
 Navigate Your FutureCollege Path is a comprehensive web platform designed for students in Andhra Pradesh (AP) and Telangana (TG) who have completed their Intermediate education. It simplifies the transition to higher education by matching students with the best-fit colleges and scholarships based on their marks, entrance ranks (EAPCET/EAMCET/JEE), and socioeconomic status.

✨ Key FeaturesSecure Onboarding: OTP-verified registration via email and phone.3-Stage Profile Builder: 1.  Identity: Basic personal and 10th-grade data.2.  Academic: Stream-specific data (MPC, BiPC, MEC, HEC).3.  Entrance & Socio: Integration of JEE, AP EAPCET, and TS EAMCET ranks, plus scholarship eligibility tracking.Intelligent Dashboard: * Profile Bar: Manage and edit your data anytime.College Explorer: Filter colleges by State and District with full contact details and direct links.Scholarship Engine: Real-time matching for government and merit-based aid.AI-Driven Recommendations: Powered by GPT-4o to provide personalized college suggestions based on complex rank cut-offs.Bookmark System: Save colleges to your "Marked List" for easy comparison later.

🛠️ Tech StackLayerTechnologyFrontendReact.js, Tailwind CSS, Framer Motion (Animations)BackendNode.js, Express.jsDatabaseMySQL (Relational data for Colleges & Users)AI IntegrationOpenAI API (GPT-4o)AuthenticationFirebase Auth / Twilio (OTP Services)

🚀 Getting Started1. PrerequisitesNode.js (v18+)MySQL ServerOpenAI API Key2. InstallationBash# Clone the repository
git clone https://github.com/your-username/college-path.git

# Install dependencies
cd college-path
npm install

# Setup environment variables
cp .env.example .env
# Add your DATABASE_URL and OPENAI_API_KEY to .env
3. Database SetupImport the provided schema.sql into your MySQL instance to populate the college list for AP and TG.📂 Project StructurePlaintext├── client/                # React Frontend
│   ├── src/components/    # Reusable UI components (The 3 Bars)
│   └── src/pages/         # 3-Stage Registration & Dashboard
├── server/                # Node.js Backend
│   ├── routes/            # API endpoints
│   └── services/          # OpenAI & MySQL logic
└── database/              # SQL Scripts & Seed Data


🗺️ Roadmap[ ] Integration with real-time APSCHE/TSCHE seat vacancy data.[ ] Direct "Apply Now" buttons for specific private universities.[ ] Multilingual support (Telugu and English).[ ] AI Chatbot for 24/7 student counseling.

🤝 ContributingContributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.Fork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)Commit your Changes (git commit -m 'Add some AmazingFeature')Push to the Branch (git push origin feature/AmazingFeature)Open a Pull Request

📄 LicenseDistributed under the MIT License.
 See LICENSE for more information.
 Developed with ❤️ for the students of AP & TG.