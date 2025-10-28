import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function TableSelection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: "diveType",
      question: "What type of dive are you planning?",
      options: [
        { value: "recreational", label: "Recreational" },
        { value: "commercial", label: "Commercial" },
        { value: "technical", label: "Technical" },
      ],
    },
    {
      id: "gasType",
      question: "What breathing gas will you use?",
      options: [
        { value: "air", label: "Air" },
        { value: "nitrox", label: "Nitrox (enriched air)" },
        { value: "mixed", label: "Mixed gas / Trimix" },
      ],
    },
    {
      id: "depth",
      question: "What is your planned maximum depth?",
      options: [
        { value: "0-18m", label: "0-18m (shallow)" },
        { value: "18-30m", label: "18-30m (moderate)" },
        { value: "30-40m", label: "30-40m (deep)" },
        { value: "40plus", label: "40m+ (very deep)" },
      ],
    },
    {
      id: "duration",
      question: "Expected bottom time?",
      options: [
        { value: "short", label: "Under 20 minutes" },
        { value: "medium", label: "20-40 minutes" },
        { value: "long", label: "Over 40 minutes" },
      ],
    },
  ];

  const recommendations: Record<string, string> = {
    "recreational-air-0-18m-short": "Air Table 1 - Recreational No-Stop Limits",
    "recreational-air-0-18m-medium":
      "Air Table 1 - Recreational No-Stop Limits",
    "recreational-air-18-30m-short":
      "Air Table 2 - Recreational Decompression",
    "recreational-nitrox-0-18m-short": "Nitrox 32% Table 1 - No-Stop Limits",
    "commercial-air-30-40m-medium": "NMDC Table 1 - No-Decompression Limits",
    "commercial-air-40plus-long": "NMDC Table 3 - Deep Air Decompression",
  };

  const handleAnswer = (value: string) => {
    const newAnswers = {
      ...answers,
      [questions[step].id]: value,
    };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
  };

  const recommendedTable =
    recommendations[
      Object.values(answers).join("-").toLowerCase() as string
    ] ||
    "NMDC Table 1 - No-Decompression Stop Limits (default)";

  const isComplete = step === questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      <section className="py-12 px-4 bg-white border-b border-border">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Table Selection Logic Tree
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Answer a few questions to find the right dive table for your dive
            profile.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-lg border border-border p-8">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <span className="text-sm font-semibold text-muted-foreground">
                  Question {step + 1} of {questions.length}
                </span>
                <span className="text-sm font-semibold text-primary">
                  {Math.round(((step + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((step + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {!isComplete ? (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  {questions[step].question}
                </h2>

                <div className="space-y-3 mb-8">
                  {questions[step].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full p-4 text-left rounded-lg border-2 border-border hover:border-primary hover:bg-ocean-50 transition-all font-medium text-foreground"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-primary hover:opacity-80 font-medium"
                  >
                    ← Previous Question
                  </button>
                )}
              </>
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Recommended Table
                  </h2>
                </div>

                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-700 mb-2">
                    {recommendedTable}
                  </h3>
                  <p className="text-sm text-green-600">
                    Based on your dive profile answers, this table is
                    recommended for your dive plan.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded flex gap-4">
                  <AlertCircle className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">
                      Always verify the table details
                    </h4>
                    <p className="text-blue-800 text-sm">
                      Review the full table documentation and supporting
                      information before your dive. Consider all factors
                      specific to your situation.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                    to="/tables"
                    className="p-4 rounded-lg border border-border hover:border-primary hover:bg-ocean-50 transition-all text-center font-medium text-primary"
                  >
                    View All Tables
                  </Link>

                  <Link
                    to="/supporting-info"
                    className="p-4 rounded-lg border border-border hover:border-primary hover:bg-ocean-50 transition-all text-center font-medium text-primary"
                  >
                    Supporting Info
                  </Link>

                  <button
                    onClick={handleReset}
                    className="p-4 rounded-lg border border-border hover:border-primary hover:bg-ocean-50 transition-all text-center font-medium text-primary"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-4 bg-white border-t border-border mt-12">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            How This Tool Works
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">
                  Answer Dive Profile Questions
                </h3>
                <p className="text-muted-foreground">
                  Provide information about your dive type, gas mixture, depth,
                  and duration.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">
                  Get Personalized Recommendation
                </h3>
                <p className="text-muted-foreground">
                  The system identifies tables matching your dive parameters
                  based on professional standards.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">
                  Review and Verify
                </h3>
                <p className="text-muted-foreground">
                  Always review complete table details and supporting
                  information before your dive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
