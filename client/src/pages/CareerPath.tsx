import { useRoute } from "wouter";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";
import {
  FlaskConical,
  BookOpen,
  Briefcase,
  Landmark,
  Building2,
  CheckCircle2,
  ArrowRight,
  Clock,
  Target,
  TrendingUp,
  MessageCircle,
  GraduationCap,
} from "lucide-react";

interface CareerPathData {
  slug: string;
  name: string;
  tagline: string;
  icon: any;
  color: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  overview: string;
  eligibility: string[];
  keyExams: { name: string; description: string }[];
  salaryRange: string;
  timeToAchieve: string;
  topRecruiters: string[];
  nextSteps: string[];
  pros: string[];
  cons: string[];
}

const CAREER_PATHS: Record<string, CareerPathData> = {
  research: {
    slug: "research",
    name: "Research Career",
    tagline: "Discover & Innovate in Agricultural Sciences",
    icon: FlaskConical,
    color: "emerald",
    seo: {
      title: "Research Career After BSc Agriculture - ICAR JRF, PhD Guide India",
      description: "Complete guide to research careers after BSc Agriculture. Learn about ICAR JRF exam, PhD in agriculture, research scientist jobs, salary, eligibility, and preparation strategy. Start your research journey today.",
      keywords: "ICAR JRF preparation, PhD agriculture India, research career BSc Agriculture, agricultural scientist jobs, ICAR JRF eligibility, research fellowship agriculture, SRF agriculture, ASRB NET exam",
    },
    overview: "A research career in agriculture involves conducting experiments, analyzing data, and developing new technologies to solve farming challenges. You'll work in laboratories, research stations, and field settings to advance agricultural science and help farmers improve productivity.",
    eligibility: [
      "BSc Agriculture or Horticulture (minimum 55% marks)",
      "MSc in relevant agricultural discipline",
      "Qualify ICAR JRF/SRF or ASRB NET exam",
      "Age limit: Generally up to 30-35 years",
    ],
    keyExams: [
      { name: "ICAR JRF", description: "Junior Research Fellowship for PhD admission with stipend (₹31,000/month)" },
      { name: "ICAR SRF", description: "Senior Research Fellowship for experienced researchers (₹35,000/month)" },
      { name: "ASRB NET", description: "National Eligibility Test for Scientist positions" },
      { name: "CSIR NET", description: "For life sciences research positions" },
    ],
    salaryRange: "₹31,000 - ₹1,50,000/month",
    timeToAchieve: "5-8 years (MSc 2 years + PhD 3-5 years)",
    topRecruiters: [
      "ICAR Research Institutes",
      "State Agricultural Universities",
      "ICRISAT, IRRI, CIMMYT",
      "Bayer, Syngenta, Corteva R&D",
      "ITC Agri Business",
    ],
    nextSteps: [
      "Complete MSc in your preferred subject cluster",
      "Start ICAR JRF preparation 8-10 months before exam",
      "Gain lab experience through internships",
      "Publish research papers during MSc",
      "Network with researchers at conferences",
    ],
    pros: [
      "Intellectual fulfillment and contribution to science",
      "Job security in government research positions",
      "International opportunities for collaboration",
      "Flexible work environment in later career stages",
    ],
    cons: [
      "Long academic commitment (5-8 years post BSc)",
      "Initial stipend is modest",
      "Highly competitive exam with ~5% selection rate",
      "Remote postings possible in field research",
    ],
  },
  academics: {
    slug: "academics",
    name: "Academic Career",
    tagline: "Teach & Shape Future Agricultural Leaders",
    icon: BookOpen,
    color: "cyan",
    seo: {
      title: "Academic Career After BSc Agriculture - NET, Teaching Jobs India",
      description: "Complete guide to academic and teaching careers after BSc Agriculture. Learn about NET exam, professor jobs in agricultural universities, salary, eligibility, and career path. Become an agriculture educator.",
      keywords: "NET agriculture exam, professor jobs agriculture, teaching career BSc Agriculture, agricultural university jobs, ASRB NET preparation, lecturer agriculture, academic career farming, agriculture faculty jobs",
    },
    overview: "An academic career in agriculture involves teaching students, conducting research, and contributing to curriculum development at agricultural universities and colleges. You'll shape the next generation of agricultural professionals while advancing knowledge in your field.",
    eligibility: [
      "BSc + MSc in Agriculture or Horticulture",
      "PhD for permanent professor positions",
      "Qualify ASRB NET or ICAR NET exam",
      "Age limit varies by institution",
    ],
    keyExams: [
      { name: "ASRB NET", description: "For Assistant Professor and Scientist positions" },
      { name: "ICAR AIEEA PG", description: "For MSc admission to ICAR universities" },
      { name: "State PSC", description: "For state agricultural university positions" },
      { name: "UGC NET", description: "For general university teaching positions" },
    ],
    salaryRange: "₹57,000 - ₹2,00,000/month (7th Pay Commission)",
    timeToAchieve: "6-10 years (MSc 2 years + PhD 3-5 years + NET)",
    topRecruiters: [
      "ICAR Universities (IARI, NDRI, IVRI)",
      "State Agricultural Universities",
      "Central Universities with Agri Departments",
      "Private Agricultural Colleges",
      "Krishi Vigyan Kendras (KVKs)",
    ],
    nextSteps: [
      "Secure admission in top MSc program (ICAR universities preferred)",
      "Clear NET during MSc or PhD",
      "Pursue PhD from reputed institution",
      "Publish research papers and build academic profile",
      "Apply for Assistant Professor positions",
    ],
    pros: [
      "High job security and respect in society",
      "Excellent salary with 7th Pay Commission benefits",
      "Academic freedom and summer vacations",
      "Opportunity to guide young minds",
    ],
    cons: [
      "Very long path (6-10 years minimum)",
      "Limited positions and high competition",
      "Administrative burden in senior positions",
      "Location may be in smaller towns",
    ],
  },
  agribusiness: {
    slug: "agribusiness",
    name: "Agribusiness Management",
    tagline: "Lead Business Innovation in Agriculture",
    icon: Briefcase,
    color: "violet",
    seo: {
      title: "Agribusiness MBA After BSc Agriculture - CAT, Career Guide India",
      description: "Complete guide to agribusiness and MBA careers after BSc Agriculture. Learn about CAT exam, agribusiness management programs, corporate jobs, salary packages, and top recruiters. Launch your business career.",
      keywords: "MBA agribusiness after BSc Agriculture, CAT preparation agriculture students, agribusiness management career, IIM FABM, agri MBA India, corporate jobs agriculture, agribusiness salary, food industry jobs",
    },
    overview: "Agribusiness management combines agricultural knowledge with business acumen. You'll work in corporate roles managing supply chains, marketing agricultural products, running agri-startups, or consulting for agricultural companies. This path offers the highest earning potential.",
    eligibility: [
      "BSc Agriculture or any graduation",
      "CAT/XAT/GMAT score for MBA admission",
      "Strong analytical and communication skills",
      "No age limit for MBA programs",
    ],
    keyExams: [
      { name: "CAT", description: "For IIMs and top B-schools (IIM Ahmedabad FABM)" },
      { name: "XAT", description: "For XLRI and other top B-schools" },
      { name: "IIFT", description: "For international trade focus" },
      { name: "CMAT", description: "For state-level B-schools" },
    ],
    salaryRange: "₹8 LPA - ₹35 LPA (varies by B-school tier)",
    timeToAchieve: "2-3 years (MBA program)",
    topRecruiters: [
      "ITC Agri Business",
      "Cargill India",
      "Bayer Crop Science",
      "Mahindra Agri Solutions",
      "BigBasket, Ninjacart, DeHaat",
      "UPL, PI Industries",
    ],
    nextSteps: [
      "Start CAT preparation in 3rd/4th year",
      "Build strong academic profile and extracurriculars",
      "Gain internship experience in agri-companies",
      "Prepare for WAT-PI rounds with agri knowledge",
      "Target IIM Ahmedabad FABM or top B-schools",
    ],
    pros: [
      "Highest earning potential among all paths",
      "Fast career growth and diverse opportunities",
      "Work in modern corporate environment",
      "Can start agri-startup with MBA network",
    ],
    cons: [
      "High competition in CAT exam",
      "MBA fees can be ₹15-25 lakhs",
      "Corporate pressure and long working hours",
      "May feel disconnected from farming roots",
    ],
  },
  banking: {
    slug: "banking",
    name: "Government Banking & Finance",
    tagline: "Serve Rural India Through Banking",
    icon: Landmark,
    color: "amber",
    seo: {
      title: "IBPS AFO Career After BSc Agriculture - Banking Jobs Guide India",
      description: "Complete guide to banking careers after BSc Agriculture. Learn about IBPS AFO exam, NABARD, RBI, agricultural officer jobs, salary, eligibility, and preparation strategy. Secure your banking career.",
      keywords: "IBPS AFO preparation, banking jobs BSc Agriculture, agricultural field officer, NABARD careers, RBI agriculture jobs, bank PO agriculture, rural banking career, IBPS SO agriculture",
    },
    overview: "Banking careers for agriculture graduates involve serving as Agricultural Field Officers (AFO) in public sector banks, helping farmers with loans, advising on schemes, and contributing to rural development. It offers job security with the prestige of government banking.",
    eligibility: [
      "BSc Agriculture or Horticulture (4-year degree)",
      "Age: 20-30 years (relaxation for reserved categories)",
      "Valid IBPS SO score",
      "No experience required for most positions",
    ],
    keyExams: [
      { name: "IBPS SO-AFO", description: "Agricultural Field Officer in public sector banks" },
      { name: "NABARD Grade A/B", description: "National Bank for Agriculture and Rural Development" },
      { name: "IBPS RRB", description: "Regional Rural Bank officer positions" },
      { name: "RBI Grade B", description: "Reserve Bank of India (agriculture background helps)" },
    ],
    salaryRange: "₹40,000 - ₹80,000/month + allowances",
    timeToAchieve: "1-2 years of focused preparation",
    topRecruiters: [
      "SBI, PNB, Bank of Baroda",
      "Canara Bank, Union Bank",
      "NABARD",
      "Regional Rural Banks",
      "SIDBI, EXIM Bank",
    ],
    nextSteps: [
      "Start preparation in final year of BSc",
      "Focus on Professional Knowledge (Agriculture)",
      "Practice Quantitative Aptitude and Reasoning daily",
      "Stay updated with banking and agri current affairs",
      "Attempt mock tests regularly",
    ],
    pros: [
      "High job security with government benefits",
      "Good work-life balance",
      "Respectable salary with regular increments",
      "Serve farmers and contribute to rural development",
    ],
    cons: [
      "Transfers to rural areas are common",
      "Target pressure for loan disbursement",
      "Slower career growth compared to private sector",
      "Repetitive work can become monotonous",
    ],
  },
  "govt-jobs": {
    slug: "govt-jobs",
    name: "Other Government Jobs",
    tagline: "Serve the Nation Through Public Service",
    icon: Building2,
    color: "rose",
    seo: {
      title: "Government Jobs After BSc Agriculture - SSC, PSC, FCI Guide India",
      description: "Complete guide to government jobs after BSc Agriculture. Learn about SSC, State PSC, FCI, NHB, APEDA exams, eligibility, salary, and preparation. Explore diverse government career opportunities.",
      keywords: "government jobs BSc Agriculture, SSC agriculture jobs, state PSC agriculture officer, FCI recruitment, NHB careers, APEDA jobs, agriculture development officer, horticulture officer jobs",
    },
    overview: "Government jobs beyond banking include positions as Agriculture Development Officers, Horticulture Officers, Food Inspectors, and roles in organizations like FCI, APEDA, and NHB. These offer stability, social impact, and the opportunity to implement agricultural policies.",
    eligibility: [
      "BSc Agriculture or Horticulture",
      "Age limits vary (usually 21-35 years)",
      "State residency for state PSC exams",
      "Physical fitness for field positions",
    ],
    keyExams: [
      { name: "State PSC", description: "Agriculture/Horticulture Development Officers" },
      { name: "SSC CGL", description: "Various central government positions" },
      { name: "FCI", description: "Food Corporation of India - Technical positions" },
      { name: "ASRB", description: "Technical Officer positions in ICAR" },
    ],
    salaryRange: "₹35,000 - ₹1,20,000/month (varies by position)",
    timeToAchieve: "6 months - 2 years of preparation",
    topRecruiters: [
      "State Agriculture Departments",
      "Food Corporation of India (FCI)",
      "APEDA, NHB, SFAC",
      "Ministry of Agriculture",
      "State Horticulture Departments",
    ],
    nextSteps: [
      "Identify target exams based on your state",
      "Study General Agriculture thoroughly",
      "Keep track of recruitment notifications",
      "Practice previous year papers",
      "Prepare for interviews focusing on schemes and policies",
    ],
    pros: [
      "High job security and pension benefits",
      "Direct impact on farmers' lives",
      "Regular working hours",
      "Multiple exam opportunities each year",
    ],
    cons: [
      "Bureaucratic work environment",
      "Postings in remote areas possible",
      "Political interference in some roles",
      "Slow promotion and career growth",
    ],
  },
};

export default function CareerPath() {
  const [, params] = useRoute("/careers/:path");
  const pathSlug = params?.path || "research";
  const pathData = CAREER_PATHS[pathSlug];

  if (!pathData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Career Path Not Found</h1>
          <Link href="/career-quiz">
            <Button>Take Career Quiz</Button>
          </Link>
        </div>
      </div>
    );
  }

  useSEO({
    title: pathData.seo.title,
    description: pathData.seo.description,
    keywords: pathData.seo.keywords,
    canonicalPath: `/careers/${pathData.slug}`,
  });

  const PathIcon = pathData.icon;
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30" },
    cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
    violet: { bg: "bg-violet-500/20", text: "text-violet-400", border: "border-violet-500/30" },
    amber: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" },
    rose: { bg: "bg-rose-500/20", text: "text-rose-400", border: "border-rose-500/30" },
  };
  const colors = colorMap[pathData.color] || colorMap.emerald;

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${pathData.name} path after BSc Agriculture. I would like detailed guidance and counselling from alumni who succeeded in this field.`
  );
  const whatsappLink = `https://wa.me/918250904021?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-10 text-center">
          <div className={`inline-flex items-center justify-center h-20 w-20 rounded-full ${colors.bg} ${colors.text} mb-4`}>
            <PathIcon className="h-10 w-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-career-title">
            {pathData.name}
          </h1>
          <p className="text-xl text-slate-300" data-testid="text-career-tagline">
            {pathData.tagline}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Clock className="h-4 w-4" />
              <span>{pathData.timeToAchieve}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <TrendingUp className="h-4 w-4" />
              <span>{pathData.salaryRange}</span>
            </div>
          </div>
        </header>

        <Card className={`bg-slate-800/50 ${colors.border} border p-6 mb-6`}>
          <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
            <Target className={`h-5 w-5 ${colors.text}`} />
            Overview
          </h2>
          <p className="text-slate-300 leading-relaxed">{pathData.overview}</p>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-cyan-400" />
              Eligibility
            </h2>
            <ul className="space-y-2">
              {pathData.eligibility.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-400" />
              Key Exams
            </h2>
            <ul className="space-y-3">
              {pathData.keyExams.map((exam, i) => (
                <li key={i} className="text-sm">
                  <span className="font-medium text-white">{exam.name}</span>
                  <p className="text-slate-400 text-xs mt-0.5">{exam.description}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-emerald-400" />
            Next Steps to Get Started
          </h2>
          <div className="space-y-3">
            {pathData.nextSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center text-xs font-bold`}>
                  {i + 1}
                </span>
                <span className="text-slate-300 text-sm">{step}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-emerald-500/10 border-emerald-500/30 p-6">
            <h2 className="text-lg font-semibold text-emerald-400 mb-4">Pros</h2>
            <ul className="space-y-2">
              {pathData.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-rose-500/10 border-rose-500/30 p-6">
            <h2 className="text-lg font-semibold text-rose-400 mb-4">Considerations</h2>
            <ul className="space-y-2">
              {pathData.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0">!</span>
                  {con}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-violet-400" />
            Top Recruiters
          </h2>
          <div className="flex flex-wrap gap-2">
            {pathData.topRecruiters.map((recruiter, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-slate-700 text-slate-300 text-sm">
                {recruiter}
              </span>
            ))}
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/40 p-6 text-center mb-6">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-500/20 text-green-400 mb-4">
            <MessageCircle className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Get Personalized Guidance</h3>
          <p className="text-slate-300 mb-4">Connect with alumni who succeeded in the {pathData.name} path</p>
          <Button 
            asChild 
            size="lg"
            className="bg-green-500 hover:bg-green-400 text-white shadow-lg"
            data-testid="button-whatsapp-cta"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat on WhatsApp for Free Counselling
            </a>
          </Button>
        </Card>

        <div className="text-center">
          <p className="text-slate-400 mb-4">Not sure if this is the right path for you?</p>
          <Link href="/career-quiz">
            <Button variant="outline" data-testid="button-take-quiz">
              Take the Career Quiz
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
