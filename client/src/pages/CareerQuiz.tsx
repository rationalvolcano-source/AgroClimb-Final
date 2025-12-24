import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Link } from "wouter";
import html2canvas from "html2canvas";
import Nav from "@/components/Nav";
import { useSEO } from "@/hooks/useSEO";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  FlaskConical,
  Briefcase,
  Landmark,
  Building2,
  Users,
  Sprout,
  Heart,
  Lightbulb,
  Clock,
  MapPin,
  TrendingUp,
  Shield,
  Globe,
  Award,
  Zap,
  BookOpen,
  Microscope,
  Factory,
  Wheat,
  Bug,
  Leaf,
  Cog,
  Dna,
  TestTubes,
  BarChart3,
  TreePine,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  Target,
  Rocket,
  ChevronRight,
  GripVertical,
  Send,
  Download,
  Camera,
  Instagram,
} from "lucide-react";

const COURSES = [
  { value: "B.Sc(Agri)", label: "B.Sc (Agriculture)", icon: Wheat },
  { value: "B.Sc(Horti)", label: "B.Sc (Horticulture)", icon: Leaf },
  { value: "B.Tech(Agri Engg.)", label: "B.Tech (Agri Engineering)", icon: Cog },
  { value: "B.Sc(Foresty)", label: "B.Sc (Forestry)", icon: TreePine },
  { value: "B.FSc(Fisheries)", label: "B.FSc (Fisheries)", icon: Sprout },
  { value: "B.V.Sc & AH", label: "B.V.Sc & AH (Veterinary)", icon: Heart },
  { value: "B.Tech(Dairy Technology)", label: "B.Tech (Dairy Technology)", icon: Factory },
  { value: "B.Sc(Agri-business)", label: "B.Sc (Agri-business)", icon: Briefcase },
  { value: "Others", label: "Other Agricultural Course", icon: GraduationCap },
];

const YEARS = [
  { value: 1, label: "1st Year", description: "Just started, exploring options" },
  { value: 2, label: "2nd Year", description: "Building profile, early prep" },
  { value: 3, label: "3rd Year", description: "Concrete planning phase" },
  { value: 4, label: "4th Year", description: "Final year, immediate decisions" },
];

const REASONS = [
  { value: "A", label: "I liked Biology in 12th", icon: Microscope, color: "emerald" },
  { value: "B", label: "I liked Chemistry in 12th", icon: TestTubes, color: "cyan" },
  { value: "C", label: "Someone told me Agri leads to faster employment", icon: Zap, color: "amber" },
  { value: "D", label: "Agri was my Plan B", icon: Target, color: "violet" },
];

const WORK_TYPES = [
  { value: 1, label: "Experimenting & discovering new solutions", icon: FlaskConical, description: "Lab work, data analysis, finding answers to unsolved problems" },
  { value: 2, label: "Explaining concepts & helping others grow", icon: BookOpen, description: "Sharing knowledge, mentoring, simplifying complex ideas" },
  { value: 3, label: "Strategizing & driving business growth", icon: Briefcase, description: "Problem-solving, fast-paced decisions, competitive environment" },
  { value: 4, label: "Working with numbers & financial planning", icon: Landmark, description: "Analyzing data, structured processes, helping with credit decisions" },
  { value: 5, label: "Serving communities & implementing policies", icon: Building2, description: "Public service, administrative processes, grassroots impact" },
];

const PRIORITIES = [
  { id: "Career Growth", icon: TrendingUp },
  { id: "Salary", icon: Award },
  { id: "Work Life Balance", icon: Clock },
  { id: "Flexibility of location", icon: MapPin },
  { id: "Job Security", icon: Shield },
  { id: "Innovative and Impactful work", icon: Lightbulb },
  { id: "Rural Development/Social Impact", icon: Heart },
  { id: "Prestige of Govt Job", icon: Building2 },
  { id: "Ease and pace of success", icon: Zap },
  { id: "Foreign placement opportunities", icon: Globe },
];

const SUBJECTS = [
  { id: "crop_production", label: "Crop Production", description: "Soil Science + Agronomy", icon: Wheat },
  { id: "crop_protection", label: "Crop Protection", description: "Entomology, Pathology, Nematology", icon: Bug },
  { id: "horticulture", label: "Horticulture", description: "Fruits, Vegetables, Flowers", icon: Leaf },
  { id: "agri_engineering", label: "Agri Engineering", description: "Farm Machinery, Irrigation", icon: Cog },
  { id: "genetics_breeding", label: "Genetics & Plant Breeding", description: "Crop improvement, GMOs", icon: Dna },
  { id: "biochem_biotech", label: "Biochemistry & Biotech", description: "Lab research, molecular biology", icon: TestTubes },
  { id: "economics_extension", label: "Economics & Extension", description: "Agri economics, rural development", icon: BarChart3 },
  { id: "statistics", label: "Statistics", description: "Data analysis, research methods", icon: Calculator },
  { id: "forestry", label: "Forestry", description: "Forest management, conservation", icon: TreePine },
  { id: "others", label: "Others", description: "Any other subjects you enjoy", icon: BookOpen },
];

const PRIORITY_PROFILES: Record<string, Record<string, number>> = {
  "Research": {
    "Career Growth": 1, "Salary": 3, "Work Life Balance": 2, "Flexibility of location": 1,
    "Job Security": 3, "Innovative and Impactful work": 3, "Rural Development/Social Impact": 1,
    "Prestige of Govt Job": 3, "Ease and pace of success": 1, "Foreign placement opportunities": 1
  },
  "Academics": {
    "Career Growth": 1, "Salary": 3, "Work Life Balance": 3, "Flexibility of location": 1,
    "Job Security": 3, "Innovative and Impactful work": 2, "Rural Development/Social Impact": 1,
    "Prestige of Govt Job": 3, "Ease and pace of success": 1, "Foreign placement opportunities": 1
  },
  "Agribusiness Management": {
    "Career Growth": 3, "Salary": 3, "Work Life Balance": 1, "Flexibility of location": 3,
    "Job Security": 1, "Innovative and Impactful work": 3, "Rural Development/Social Impact": 1,
    "Prestige of Govt Job": 1, "Ease and pace of success": 3, "Foreign placement opportunities": 3
  },
  "Govt Banking and Finance": {
    "Career Growth": 2, "Salary": 2, "Work Life Balance": 2, "Flexibility of location": 0,
    "Job Security": 3, "Innovative and Impactful work": 1, "Rural Development/Social Impact": 3,
    "Prestige of Govt Job": 3, "Ease and pace of success": 2, "Foreign placement opportunities": 1
  },
  "Other Govt Jobs": {
    "Career Growth": 2, "Salary": 3, "Work Life Balance": 2, "Flexibility of location": 1,
    "Job Security": 3, "Innovative and Impactful work": 2, "Rural Development/Social Impact": 3,
    "Prestige of Govt Job": 3, "Ease and pace of success": 2, "Foreign placement opportunities": 1
  }
};

const PATH_INFO: Record<string, { icon: typeof FlaskConical; color: string; description: string }> = {
  "Research": { icon: FlaskConical, color: "emerald", description: "Scientific research at ICAR institutes, biotech labs, R&D centers" },
  "Academics": { icon: BookOpen, color: "cyan", description: "College/university teaching, professor roles" },
  "Agribusiness Management": { icon: Briefcase, color: "violet", description: "Agri-business, consulting, analytics, private sector" },
  "Govt Banking and Finance": { icon: Landmark, color: "amber", description: "IBPS SO, NABARD, RRB, agri credit, rural banking" },
  "Other Govt Jobs": { icon: Building2, color: "teal", description: "SSC selection posts, Autonomous Bodies (NHB, APEDA, Coconut/Rubber Boards), State Admin jobs" },
};

const RISK_TOLERANCE = [
  { 
    value: "A", 
    label: "Steady income with predictable growth, even if slower", 
    icon: Shield, 
    color: "emerald",
    reinforces: ["Other Govt Jobs", "Academics", "Research"]
  },
  { 
    value: "B", 
    label: "Variable income with potential for big wins (or losses)", 
    icon: TrendingUp, 
    color: "amber",
    reinforces: ["Agribusiness Management"]
  },
  { 
    value: "C", 
    label: "I'd trade money for meaningful impact", 
    icon: Heart, 
    color: "violet",
    reinforces: ["Research", "Academics"]
  },
];

interface QuizAnswers {
  course: string;
  year_of_study: number;
  reason_for_course: string;
  preferred_work_type: number;
  priorities_ranked: string[];
  risk_tolerance: string;
  subject_liking: Record<string, number>;
}

interface QuizResult {
  recommended_path: {
    name: string;
    confidence_level: string;
    why_this_path: string;
    subject_clusters: string[];
    immediate_next_steps: string[];
    time_horizon_note: string;
  };
  key_warnings: string[];
  has_contradiction: boolean;
}

export default function CareerQuiz() {
  const { toast } = useToast();
  
  useSEO({
    title: "Free Career Quiz for BSc Agriculture & Horticulture Students",
    description: "Take the free AI-powered career quiz to find your best-fit path after BSc Agriculture or Horticulture. Discover if Research, Academics, Agribusiness, or Banking is right for you. Get personalized recommendations in minutes.",
    keywords: "BSc Agriculture career quiz, career test agriculture students, what to do after BSc Agriculture, BSc Horticulture career options quiz, agriculture career counselling free, ICAR JRF or MBA which is better",
    canonicalPath: "/career-quiz",
  });

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    priorities_ranked: PRIORITIES.map(p => p.id),
    subject_liking: Object.fromEntries(SUBJECTS.map(s => [s.id, 5])),
  });
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const downloadResultsAsImage = async () => {
    if (!resultsRef.current) {
      toast({
        title: "Error",
        description: "Unable to capture results. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    setIsDownloading(true);
    
    try {
      // Small delay to ensure all content is rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const element = resultsRef.current;
      
      const canvas = await html2canvas(element, {
        backgroundColor: '#0f172a',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        x: 0,
        y: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure cloned element is visible
          const clonedElement = clonedDoc.querySelector('[data-results-capture]');
          if (clonedElement) {
            (clonedElement as HTMLElement).style.transform = 'none';
            (clonedElement as HTMLElement).style.opacity = '1';
          }
        }
      });
      
      // Convert to blob with timeout safeguard
      const downloadPromise = new Promise<void>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Image generation timed out'));
        }, 5000);
        
        canvas.toBlob((blob) => {
          clearTimeout(timeoutId);
          try {
            if (!blob) {
              reject(new Error('Failed to generate blob'));
              return;
            }
            
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `AgroClimb-Career-Results-${new Date().toISOString().split('T')[0]}.jpg`;
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Cleanup
            URL.revokeObjectURL(url);
            
            toast({
              title: "Success!",
              description: "Your results have been saved. Share this image with our Telegram bot!",
            });
            
            resolve();
          } catch (err) {
            reject(err);
          }
        }, 'image/jpeg', 0.9);
      });
      
      await downloadPromise;
      
    } catch (error) {
      console.error('Failed to download results:', error);
      toast({
        title: "Download failed",
        description: "Please take a screenshot manually (use your device's screenshot feature).",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const isResearchAcademicsLikely = useCallback(() => {
    if (answers.year_of_study === 1) return false;
    if (!answers.priorities_ranked || !answers.preferred_work_type) return false;
    
    const scores: Record<string, number> = {};
    Object.keys(PRIORITY_PROFILES).forEach(path => {
      scores[path] = 0;
    });

    answers.priorities_ranked.forEach((priority, index) => {
      const weight = 10 - index;
      Object.keys(PRIORITY_PROFILES).forEach(path => {
        scores[path] += PRIORITY_PROFILES[path][priority] * weight;
      });
    });

    const workTypeBonus: Record<number, string[]> = {
      1: ["Research", "Academics"],
      2: ["Academics", "Research"],
      3: ["Agribusiness Management"],
      4: ["Govt Banking and Finance"],
      5: ["Other Govt Jobs"],
    };

    const bonusPaths = workTypeBonus[answers.preferred_work_type] || [];
    bonusPaths.forEach((path, i) => {
      scores[path] += (30 - i * 10);
    });

    const sortedPaths = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topTwo = sortedPaths.slice(0, 2).map(([path]) => path);
    
    return topTwo.includes("Research") || topTwo.includes("Academics");
  }, [answers.priorities_ranked, answers.preferred_work_type, answers.year_of_study]);

  const needsSubjectQuiz = isResearchAcademicsLikely();
  const totalSteps = needsSubjectQuiz ? 7 : 6;
  const progress = ((step + 1) / totalSteps) * 100;

  const canProceed = useCallback(() => {
    switch (step) {
      case 0: return !!answers.course;
      case 1: return !!answers.year_of_study;
      case 2: return !!answers.reason_for_course;
      case 3: return !!answers.preferred_work_type;
      case 4: return answers.priorities_ranked && answers.priorities_ranked.length === 10;
      case 5: return !!answers.risk_tolerance;
      case 6: return true;
      default: return false;
    }
  }, [step, answers]);

  const calculateResult = useCallback(() => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const fullAnswers = answers as QuizAnswers;
      
      // SCORING: Questions 4, 5, 6 carry MAXIMUM weightage for career pathway recommendation
      // Questions 1, 2, 3 only affect confidence level
      
      const scores: Record<string, number> = {};
      Object.keys(PRIORITY_PROFILES).forEach(path => {
        scores[path] = 0;
      });

      // Question 4: Priority ranking - MAXIMUM WEIGHT (base scoring)
      fullAnswers.priorities_ranked.forEach((priority, index) => {
        const weight = 10 - index;
        Object.keys(PRIORITY_PROFILES).forEach(path => {
          scores[path] += PRIORITY_PROFILES[path][priority] * weight;
        });
      });

      // Question 6: Risk tolerance - HIGH WEIGHT (20 points for reinforced paths)
      const riskToleranceBonus = RISK_TOLERANCE.find(r => r.value === fullAnswers.risk_tolerance);
      if (riskToleranceBonus) {
        riskToleranceBonus.reinforces.forEach(path => {
          scores[path] += 20;
        });
      }

      // Question 5 (subject liking) - HIGH WEIGHT for Research/Academics
      if (fullAnswers.subject_liking && fullAnswers.year_of_study !== 1) {
        const technicalSubjects = ["crop_production", "crop_protection", "horticulture", "agri_engineering", 
          "genetics_breeding", "biochem_biotech", "economics_extension", "statistics", "forestry"];
        
        const highScoreSubjects = technicalSubjects.filter(s => (fullAnswers.subject_liking[s] || 0) >= 8);
        const moderateScoreSubjects = technicalSubjects.filter(s => {
          const score = fullAnswers.subject_liking[s] || 0;
          return score >= 6 && score < 8;
        });
        
        // Strong subject interest adds significant points to Research/Academics
        scores["Research"] += highScoreSubjects.length * 8;
        scores["Academics"] += highScoreSubjects.length * 8;
        scores["Research"] += moderateScoreSubjects.length * 3;
        scores["Academics"] += moderateScoreSubjects.length * 3;
      }

      // NOTE: Question 3 (preferred_work_type) does NOT add to scores - only affects confidence
      // This ensures Questions 4, 5, 6 determine the pathway

      let bestPath = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
      const maxScore = scores[bestPath];
      const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const secondBest = sortedScores[1];
      
      // CONFIDENCE DETECTION: Based on Questions 1-3 alignment with recommended path
      const detectContradiction = (): boolean => {
        const riskAnswer = fullAnswers.risk_tolerance;
        const workType = fullAnswers.preferred_work_type;
        const topPriorities = fullAnswers.priorities_ranked.slice(0, 3);
        
        // KEY CONTRADICTION: User chose Agribusiness (3) or Banking (4) in Q3,
        // but Q4/Q5/Q6 indicate Research/Academics preference
        if ((workType === 3 || workType === 4) && (bestPath === "Research" || bestPath === "Academics")) {
          return true;
        }
        
        // User chose Research/Academics work (1 or 2) but ended up with business/banking path
        if ((workType === 1 || workType === 2) && (bestPath === "Agribusiness Management" || bestPath === "Govt Banking and Finance")) {
          return true;
        }
        
        // Risk tolerance contradictions
        if (riskAnswer === "A" && bestPath === "Agribusiness Management") return true;
        if (riskAnswer === "B" && (bestPath === "Other Govt Jobs" || bestPath === "Govt Banking and Finance")) return true;
        if (riskAnswer === "C" && topPriorities.includes("Salary") && topPriorities.indexOf("Salary") === 0) return true;
        
        // Reason for course contradictions
        if (fullAnswers.reason_for_course === "C" && (bestPath === "Research" || bestPath === "Academics")) {
          // Wanted faster employment but got research/academics
          return true;
        }
        
        return false;
      };
      
      const hasContradiction = detectContradiction();
      
      // Confidence based on score gap AND contradiction detection
      let confidence: string;
      if (hasContradiction) {
        confidence = "low";
      } else {
        const scoreGap = maxScore - secondBest[1];
        if (scoreGap > 25) {
          confidence = "high";
        } else if (scoreGap > 12) {
          confidence = "medium";
        } else {
          confidence = "low";
        }
      }

      let subjectClusters: string[] = [];
      if ((bestPath === "Research" || bestPath === "Academics") && fullAnswers.subject_liking && fullAnswers.year_of_study !== 1) {
        const clusterMap: Record<string, string> = {
          "crop_production": "Crop Production (Soil Science-Agronomy)",
          "crop_protection": "Crop Protection (Entomology, Pathology, Nematology)",
          "horticulture": "Horticulture",
          "agri_engineering": "Agri Engineering",
          "genetics_breeding": "Genetics and Plant Breeding",
          "biochem_biotech": "Biochem-Biotech",
          "economics_extension": "Economics and Extension",
          "statistics": "Statistics",
          "forestry": "Forestry",
        };
        
        const sortedSubjects = Object.entries(fullAnswers.subject_liking)
          .filter(([key]) => key !== "others")
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .filter(([, score]) => score >= 7);
        
        subjectClusters = sortedSubjects.map(([key]) => clusterMap[key]).filter(Boolean);
      }

      const yearTone = {
        1: "You have time to explore different paths. Use this year to build strong fundamentals.",
        2: "Start building your profile with small projects and early preparation.",
        3: "Time to create a concrete exam/course plan. Focus on your chosen direction.",
        4: "Final year decisions ahead. Plan your next 6-12 months carefully.",
      };

      const pathNextSteps: Record<string, string[]> = {
        "Research": [
          "Start preparing for ICAR JRF/SRF exam (June & December)",
          "Build lab skills - volunteer in department research projects",
          "Read research papers in your interest area weekly"
        ],
        "Academics": [
          "Aim for AIEEA-PG and secure seat at eminent agri universities",
          "In PG, focus on NET to become eligible for becoming professor",
          "Complete PhD for long-term academic career"
        ],
        "Agribusiness Management": [
          "Prepare for CAT exam",
          "Upskill yourself with relevant certifications",
          "Prepare for interviews",
          "Hustle in MBA colleges to secure placement!"
        ],
        "Govt Banking and Finance": [
          "List down exams you are interested in",
          "Most go for IBPS (AFO) - also explore IBPS RRB, NABARD",
          "Constant practice is the key to success"
        ],
        "Other Govt Jobs": [
          "Prepare for SSC, FCI, NABARD, state PSC exams",
          "Study general agriculture and current agri schemes thoroughly",
          "Check notifications for NHB, APEDA, state board recruitments"
        ]
      };

      const timeHorizons: Record<string, string> = {
        "Research": "Requires M.Sc + PhD (5-7 years post B.Sc). Patience and passion for science are essential.",
        "Academics": "Needs M.Sc + NET/JRF + possibly PhD (4-8 years). Long-term but stable career.",
        "Agribusiness Management": "Can start immediately after graduation. Growth depends on skills and networking.",
        "Govt Banking and Finance": "1-2 years preparation for IBPS SO/NABARD. Job placement within 2-3 years of focused prep.",
        "Other Govt Jobs": "6 months to 2 years focused preparation. Multiple exam options (SSC, PSC, Boards) increase chances."
      };

      const warnings: string[] = [];
      
      if (fullAnswers.reason_for_course === "C" && (bestPath === "Research" || bestPath === "Academics")) {
        warnings.push("You mentioned faster employment as your goal, but the recommended path requires longer academic commitment. Consider if you're ready for 4-7 more years of study.");
      }
      
      if (fullAnswers.reason_for_course === "D" && (bestPath === "Research" || bestPath === "Academics")) {
        warnings.push("Since Agri was your Plan B, ensure you're genuinely interested in deep academic pursuit before committing to this path.");
      }

      if (bestPath === "Research" || bestPath === "Academics") {
        warnings.push("JRF/NET exams are highly competitive with ~5% selection rate. Start preparation early and be consistent.");
      }

      if (bestPath === "Govt Banking and Finance" && fullAnswers.priorities_ranked.indexOf("Work Life Balance") < 3) {
        warnings.push("Banking jobs may involve transfers to rural areas. Work-life balance varies by posting location.");
      }

      let whyThisPath = `Based on your preferences, ${bestPath} aligns well with your priorities. `;
      
      if (fullAnswers.priorities_ranked[0]) {
        whyThisPath += `Your top priority "${fullAnswers.priorities_ranked[0]}" is ${PRIORITY_PROFILES[bestPath][fullAnswers.priorities_ranked[0]] >= 2 ? "strongly" : "moderately"} supported in this path. `;
      }
      
      if (fullAnswers.reason_for_course === "A") {
        whyThisPath += "Your love for Biology opens doors in life-science heavy directions. ";
      } else if (fullAnswers.reason_for_course === "B") {
        const biochemScore = fullAnswers.subject_liking?.biochem_biotech ?? 0;
        if (biochemScore >= 7) {
          whyThisPath += "Your chemistry background combined with strong biochem interest makes biochem/biotech and food-tech paths promising (though they require longer study). ";
        } else {
          whyThisPath += "Your chemistry background gives you analytical strengths useful across many agricultural roles. ";
        }
      }
      
      whyThisPath += yearTone[fullAnswers.year_of_study as 1 | 2 | 3 | 4];

      setResult({
        recommended_path: {
          name: bestPath,
          confidence_level: confidence,
          why_this_path: whyThisPath,
          subject_clusters: subjectClusters,
          immediate_next_steps: pathNextSteps[bestPath] || [],
          time_horizon_note: timeHorizons[bestPath] || ""
        },
        key_warnings: warnings,
        has_contradiction: hasContradiction
      });
      
      setIsCalculating(false);
    }, 2000);
  }, [answers]);

  const handleNext = () => {
    if (step === totalSteps - 1) {
      calculateResult();
    } else {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-400 mb-4">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">What course are you pursuing?</h2>
              <p className="text-slate-400">Select your current degree program</p>
            </div>
            
            <div className="grid gap-3">
              {COURSES.map((course) => {
                const Icon = course.icon;
                const isSelected = answers.course === course.value;
                return (
                  <button
                    key={course.value}
                    onClick={() => setAnswers(a => ({ ...a, course: course.value }))}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      isSelected 
                        ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/50" 
                        : "border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800"
                    }`}
                    data-testid={`option-course-${course.value}`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? "bg-emerald-500/20" : "bg-slate-700"}`}>
                      <Icon className={`h-5 w-5 ${isSelected ? "text-emerald-400" : "text-slate-400"}`} />
                    </div>
                    <span className={`font-medium ${isSelected ? "text-emerald-400" : "text-white"}`}>
                      {course.label}
                    </span>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-emerald-400 ml-auto" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-cyan-500/10 text-cyan-400 mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Which year are you in?</h2>
              <p className="text-slate-400">This helps us tailor advice to your stage</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {YEARS.map((year) => {
                const isSelected = answers.year_of_study === year.value;
                return (
                  <button
                    key={year.value}
                    onClick={() => setAnswers(a => ({ ...a, year_of_study: year.value }))}
                    className={`p-6 rounded-xl border text-center transition-all ${
                      isSelected 
                        ? "border-cyan-500 bg-cyan-500/10 ring-2 ring-cyan-500/50" 
                        : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                    }`}
                    data-testid={`option-year-${year.value}`}
                  >
                    <div className={`text-3xl font-bold mb-2 ${isSelected ? "text-cyan-400" : "text-white"}`}>
                      {year.value}
                    </div>
                    <div className={`text-sm font-medium ${isSelected ? "text-cyan-400" : "text-slate-300"}`}>
                      {year.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{year.description}</div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-violet-500/10 text-violet-400 mb-4">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Why did you choose this course?</h2>
              <p className="text-slate-400">Be honest - this helps us understand your motivation</p>
            </div>
            
            <div className="grid gap-4">
              {REASONS.map((reason) => {
                const Icon = reason.icon;
                const isSelected = answers.reason_for_course === reason.value;
                const colorMap: Record<string, { bg: string; ring: string; border: string; text: string }> = {
                  emerald: { bg: "bg-emerald-500/10", ring: "ring-emerald-500/50", border: "border-emerald-500", text: "text-emerald-400" },
                  cyan: { bg: "bg-cyan-500/10", ring: "ring-cyan-500/50", border: "border-cyan-500", text: "text-cyan-400" },
                  amber: { bg: "bg-amber-500/10", ring: "ring-amber-500/50", border: "border-amber-500", text: "text-amber-400" },
                  violet: { bg: "bg-violet-500/10", ring: "ring-violet-500/50", border: "border-violet-500", text: "text-violet-400" },
                };
                const colorClasses = colorMap[reason.color] || colorMap.emerald;
                
                return (
                  <button
                    key={reason.value}
                    onClick={() => setAnswers(a => ({ ...a, reason_for_course: reason.value }))}
                    className={`flex items-center gap-4 p-5 rounded-xl border transition-all ${
                      isSelected 
                        ? `${colorClasses.border} ${colorClasses.bg} ring-2 ${colorClasses.ring}` 
                        : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                    }`}
                    data-testid={`option-reason-${reason.value}`}
                  >
                    <div className={`p-3 rounded-xl ${isSelected ? colorClasses.bg : "bg-slate-700"}`}>
                      <Icon className={`h-6 w-6 ${isSelected ? colorClasses.text : "text-slate-400"}`} />
                    </div>
                    <span className={`font-medium text-left ${isSelected ? colorClasses.text : "text-white"}`}>
                      {reason.label}
                    </span>
                    {isSelected && <CheckCircle2 className={`h-5 w-5 ${colorClasses.text} ml-auto`} />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-amber-500/10 text-amber-400 mb-4">
                <Briefcase className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">What type of work excites you?</h2>
              <p className="text-slate-400">Choose what feels most appealing right now</p>
            </div>
            
            <div className="grid gap-3">
              {WORK_TYPES.map((type) => {
                const Icon = type.icon;
                const isSelected = answers.preferred_work_type === type.value;
                return (
                  <button
                    key={type.value}
                    onClick={() => setAnswers(a => ({ ...a, preferred_work_type: type.value }))}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all text-left ${
                      isSelected 
                        ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/50" 
                        : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                    }`}
                    data-testid={`option-work-${type.value}`}
                  >
                    <div className={`p-2 rounded-lg mt-0.5 ${isSelected ? "bg-amber-500/20" : "bg-slate-700"}`}>
                      <Icon className={`h-5 w-5 ${isSelected ? "text-amber-400" : "text-slate-400"}`} />
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${isSelected ? "text-amber-400" : "text-white"}`}>
                        {type.label}
                      </div>
                      <div className="text-sm text-slate-500 mt-0.5">{type.description}</div>
                    </div>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-amber-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-rose-500/10 text-rose-400 mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Rank your career priorities</h2>
              <p className="text-slate-400">Drag to reorder - most important at top</p>
            </div>
            
            <Reorder.Group 
              axis="y" 
              values={answers.priorities_ranked || []} 
              onReorder={(newOrder) => setAnswers(a => ({ ...a, priorities_ranked: newOrder }))}
              className="space-y-2"
            >
              {(answers.priorities_ranked || []).map((priority, index) => {
                const priorityData = PRIORITIES.find(p => p.id === priority);
                const Icon = priorityData?.icon || Target;
                const isTop3 = index < 3;
                
                return (
                  <Reorder.Item 
                    key={priority} 
                    value={priority}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-grab active:cursor-grabbing transition-colors ${
                      isTop3 
                        ? "border-emerald-500/50 bg-emerald-500/10" 
                        : "border-slate-700 bg-slate-800/50"
                    }`}
                    data-testid={`priority-item-${priority}`}
                  >
                    <GripVertical className="h-4 w-4 text-slate-500 flex-shrink-0" />
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      isTop3 ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-400"
                    }`}>
                      {index + 1}
                    </span>
                    <Icon className={`h-4 w-4 flex-shrink-0 ${isTop3 ? "text-emerald-400" : "text-slate-500"}`} />
                    <span className={`text-sm ${isTop3 ? "text-white font-medium" : "text-slate-400"}`}>
                      {priority}
                    </span>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
            
            <p className="text-center text-xs text-slate-500">
              Top 3 priorities have the strongest influence on your recommendation
            </p>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-rose-500/10 text-rose-400 mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">What matters more to you in a career?</h2>
              <p className="text-slate-400">Choose what feels most true to you</p>
            </div>
            
            <div className="grid gap-4">
              {RISK_TOLERANCE.map((option) => {
                const Icon = option.icon;
                const isSelected = answers.risk_tolerance === option.value;
                const colorMap: Record<string, { bg: string; ring: string; border: string; text: string }> = {
                  emerald: { bg: "bg-emerald-500/10", ring: "ring-emerald-500/50", border: "border-emerald-500", text: "text-emerald-400" },
                  amber: { bg: "bg-amber-500/10", ring: "ring-amber-500/50", border: "border-amber-500", text: "text-amber-400" },
                  violet: { bg: "bg-violet-500/10", ring: "ring-violet-500/50", border: "border-violet-500", text: "text-violet-400" },
                };
                const colorClasses = colorMap[option.color] || colorMap.emerald;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => setAnswers(a => ({ ...a, risk_tolerance: option.value }))}
                    className={`flex items-center gap-4 p-5 rounded-xl border transition-all ${
                      isSelected 
                        ? `${colorClasses.border} ${colorClasses.bg} ring-2 ${colorClasses.ring}` 
                        : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                    }`}
                    data-testid={`option-risk-${option.value}`}
                  >
                    <div className={`p-3 rounded-xl ${isSelected ? colorClasses.bg : "bg-slate-700"}`}>
                      <Icon className={`h-6 w-6 ${isSelected ? colorClasses.text : "text-slate-400"}`} />
                    </div>
                    <span className={`font-medium text-left ${isSelected ? colorClasses.text : "text-white"}`}>
                      {option.label}
                    </span>
                    {isSelected && <CheckCircle2 className={`h-5 w-5 ${colorClasses.text} ml-auto`} />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        );

      case 6:
        if (answers.year_of_study === 1) return null;
        
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-teal-500/10 text-teal-400 mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Rate your subject interest</h2>
              <p className="text-slate-400">1 = Not interested, 10 = Very interested</p>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {SUBJECTS.map((subject) => {
                const Icon = subject.icon;
                const value = answers.subject_liking?.[subject.id] || 5;
                const isHigh = value >= 7;
                
                return (
                  <div 
                    key={subject.id}
                    className={`p-4 rounded-xl border transition-colors ${
                      isHigh ? "border-teal-500/50 bg-teal-500/10" : "border-slate-700 bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`h-5 w-5 ${isHigh ? "text-teal-400" : "text-slate-500"}`} />
                      <div className="flex-1">
                        <div className={`font-medium ${isHigh ? "text-teal-400" : "text-white"}`}>
                          {subject.label}
                        </div>
                        <div className="text-xs text-slate-500">{subject.description}</div>
                      </div>
                      <span className={`text-lg font-bold ${isHigh ? "text-teal-400" : "text-slate-400"}`}>
                        {value}
                      </span>
                    </div>
                    <Slider
                      value={[value]}
                      onValueChange={([v]) => setAnswers(a => ({
                        ...a,
                        subject_liking: { ...a.subject_liking, [subject.id]: v }
                      }))}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                      data-testid={`slider-subject-${subject.id}`}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isCalculating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
        <Nav />
        <main className="max-w-2xl mx-auto px-4 py-20">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="relative inline-block mb-8">
              <div className="w-24 h-24 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin" />
              <Rocket className="absolute inset-0 m-auto h-10 w-10 text-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Answers...</h2>
            <p className="text-slate-400">Finding your best career fit from 5 paths</p>
            
            <div className="mt-8 space-y-2">
              {["Evaluating priorities", "Matching work preferences", "Calculating path scores"].map((text, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.5 }}
                  className="flex items-center justify-center gap-2 text-sm text-slate-400"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  if (result) {
    const pathInfo = PATH_INFO[result.recommended_path.name];
    const PathIcon = pathInfo?.icon || Target;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
        <Nav />
        <main className="max-w-3xl mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 border-emerald-500/40 p-5">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/30 flex items-center justify-center">
                    <Camera className="h-7 w-7 text-emerald-400" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-bold text-white mb-1">Save Your Results!</h3>
                  <p className="text-sm text-slate-300">
                    Download this screen as an image. You'll need to share this with our Telegram bot for personalized career guidance.
                  </p>
                </div>
                <Button
                  onClick={downloadResultsAsImage}
                  disabled={isDownloading}
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 flex-shrink-0"
                  data-testid="button-download-results"
                >
                  {isDownloading ? (
                    <>
                      <div className="h-5 w-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5 mr-2" />
                      Save as Image
                    </>
                  )}
                </Button>
              </div>
            </Card>

            <div ref={resultsRef} data-results-capture className="space-y-6 bg-slate-950 p-4 rounded-2xl">
            <div className="text-center mb-8">
              <motion.div 
                className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-500/20 text-emerald-400 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <PathIcon className="h-10 w-10" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" data-testid="text-result-path">
                {result.recommended_path.name}
              </h1>
              <p className="text-slate-400">{pathInfo?.description}</p>
              <div className={`inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-sm font-medium ${
                result.recommended_path.confidence_level === "high" 
                  ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                  : result.recommended_path.confidence_level === "medium"
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`} data-testid="badge-confidence">
                {result.recommended_path.confidence_level === "high" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : result.recommended_path.confidence_level === "medium" ? (
                  <HelpCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                {result.recommended_path.confidence_level === "high" 
                  ? "High Confidence Match" 
                  : result.recommended_path.confidence_level === "medium"
                  ? "Moderate Confidence Match"
                  : "Low Confidence Match"}
              </div>
            </div>

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-400" />
                Why This Path?
              </h3>
              <p className="text-slate-300 leading-relaxed" data-testid="text-why-path">
                {result.recommended_path.why_this_path}
              </p>
            </Card>

            {result.recommended_path.subject_clusters.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-teal-400" />
                  Recommended Subject Clusters
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.recommended_path.subject_clusters.map((cluster) => (
                    <span 
                      key={cluster}
                      className="px-3 py-1.5 rounded-full bg-teal-500/20 text-teal-400 text-sm font-medium"
                    >
                      {cluster}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Rocket className="h-5 w-5 text-emerald-400" />
                Immediate Next Steps
              </h3>
              <div className="space-y-3">
                {result.recommended_path.immediate_next_steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="text-slate-300">{step}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cyan-400" />
                Time Horizon
              </h3>
              <p className="text-slate-300">{result.recommended_path.time_horizon_note}</p>
            </Card>

            {result.key_warnings.length > 0 && (
              <Card className="bg-amber-500/10 border-amber-500/30 p-6">
                <h3 className="text-lg font-semibold text-amber-400 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Things to Consider
                </h3>
                <ul className="space-y-2">
                  {result.key_warnings.map((warning, i) => (
                    <li key={i} className="text-amber-200/80 text-sm flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {warning}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {result.has_contradiction && (
              <Card className="bg-rose-500/10 border-rose-500/30 p-6">
                <h3 className="text-lg font-semibold text-rose-400 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Important Notice
                </h3>
                <p className="text-rose-200/80 text-sm mb-4">
                  We noticed some mixed signals in your responses. Your career preferences and risk tolerance seem to point in different directions. 
                  <strong className="text-rose-300"> You may benefit from further counselling before choosing your career pathway.</strong>
                </p>
                <Button 
                  asChild 
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-400"
                  data-testid="button-counselling-telegram"
                >
                  <a 
                    href="https://t.me/+uQNpa83oEmIxOTA9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Get Free Counselling on Telegram
                  </a>
                </Button>
              </Card>
            )}

            <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/40 p-6 text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-500/20 text-blue-400 mb-4">
                <Send className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Get Detailed Career Pathway</h3>
              <p className="text-slate-300 mb-4">Free counselling from successful alumni who've walked this path</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-400/40 transition-shadow"
                  data-testid="button-contact"
                >
                  <a 
                    href="https://t.me/+uQNpa83oEmIxOTA9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Join Telegram
                  </a>
                </Button>
                <Button 
                  asChild 
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-400/40 transition-shadow"
                  data-testid="button-contact-instagram"
                >
                  <a 
                    href="https://www.instagram.com/agroclimb?igsh=MXBycTVwZTM0N3N6bw=="
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="h-5 w-5 mr-2" />
                    Follow on Instagram
                  </a>
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-3">Speak with alumni who succeeded in {result.recommended_path.name}</p>
            </Card>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setResult(null);
                  setStep(0);
                  setAnswers({
                    priorities_ranked: PRIORITIES.map(p => p.id),
                    subject_liking: Object.fromEntries(SUBJECTS.map(s => [s.id, 5])),
                  });
                }}
                className="text-sm text-slate-500 hover:text-slate-300 underline"
                data-testid="button-retake"
              >
                Retake Quiz
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Question {step + 1} of {totalSteps}</span>
            <span className="text-sm text-emerald-400 font-medium">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        <div className="flex gap-4 mt-8">
          <Button
            onClick={handleBack}
            variant="outline"
            disabled={step === 0}
            className="flex-1"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50"
            data-testid="button-next"
          >
            {step === totalSteps - 1 ? "Get My Results" : "Next"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
}
