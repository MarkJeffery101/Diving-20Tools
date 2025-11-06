import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import {
  getTableRecommendation,
  getGasTypesForTechnique,
  validateDiveProfile,
  type DiveProfile,
  type RecommendationResult,
} from "@/lib/tableSelectionLogic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function TableSelection() {
  const navigate = useNavigate();
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [profile, setProfile] = useState<Partial<DiveProfile>>({
    bottomTime: 30,
  });
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);

  // Memoize available gas types based on current technique
  const availableGasTypes = useMemo(() => {
    if (!profile.technique) return [];
    return getGasTypesForTechnique(profile.technique);
  }, [profile.technique]);

  // Memoize depth range options based on selected depth
  const depthRanges = useMemo(
    () => [
      { range: "6-12m", label: "6-12m (shallow)", min: 6, max: 12 },
      { range: "12-18m", label: "12-18m (light diving)", min: 12, max: 18 },
      { range: "18-30m", label: "18-30m (moderate)", min: 18, max: 30 },
      { range: "30-40m", label: "30-40m (deep)", min: 30, max: 40 },
      { range: "40-50m", label: "40-50m (very deep)", min: 40, max: 50 },
      { range: "50+m", label: "50m+ (extreme)", min: 50, max: 100 },
    ],
    []
  );

  const handleTechniqueSelect = (technique: string) => {
    setProfile((prev) => ({
      ...prev,
      technique,
      gasType: undefined, // Reset gas type when technique changes
    }));
    setStep(1);
  };

  const handleGasTypeSelect = (gasType: string) => {
    setProfile((prev) => ({
      ...prev,
      gasType,
    }));
    setStep(2);
  };

  const handleDepthRangeSelect = (range: {
    range: string;
    label: string;
    min: number;
    max: number;
  }) => {
    // Use middle of range as default, but allow user to be specific
    setProfile((prev) => ({
      ...prev,
      plannedDepth: Math.floor((range.min + range.max) / 2),
    }));
    setStep(3);
  };

  const handleDepthInput = (depth: number) => {
    setProfile((prev) => ({
      ...prev,
      plannedDepth: depth,
    }));
  };

  const handleBottomTimeInput = (time: number) => {
    setProfile((prev) => ({
      ...prev,
      bottomTime: time,
    }));
  };

  const handleGetRecommendation = () => {
    // Validate profile
    const errors = validateDiveProfile(
      profile as DiveProfile
    );
    if (errors.length > 0) {
      alert("Profile validation errors:\n" + errors.join("\n"));
      return;
    }

    // Get recommendation
    const rec = getTableRecommendation(profile as DiveProfile);
    setRecommendation(rec);
    setStep(4);
  };

  const handleNavigateToTable = () => {
    if (recommendation) {
      // Navigate to table with code and depth
      navigate(
        `/tables/${recommendation.tableCode.toLowerCase()}-${recommendation.recommendedDepth}`
      );
    }
  };

  const handleReset = () => {
    setStep(0);
    setProfile({ bottomTime: 30 });
    setRecommendation(null);
  };

  // Question 1: Dive Technique
  const question1 = (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        1. What type of dive are you planning?
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Select your primary decompression strategy for this dive.
      </p>
      <div className="grid grid-cols-1 gap-3">
        {[
          {
            id: "no-stop",
            title: "No-Stop Diving",
            description: "No decompression required - within no-stop limits",
          },
          {
            id: "in-water",
            title: "In-Water Decompression",
            description: "Stop at depths underwater during ascent",
          },
          {
            id: "surface-oxygen",
            title: "Surface Oxygen Decompression",
            description: "Decompress in chamber with oxygen on surface",
          },
          {
            id: "nitrox",
            title: "Nitrox/Enriched Air",
            description: "Using oxygen-enriched breathing gas",
          },
        ].map((option) => (
          <button
            key={option.id}
            onClick={() => handleTechniqueSelect(option.id)}
            className="p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-blue-50 transition-all text-left"
          >
            <p className="font-semibold text-foreground">{option.title}</p>
            <p className="text-sm text-muted-foreground">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );

  // Question 2: Gas Type (if applicable)
  const question2 =
    availableGasTypes.length > 0 ? (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          2. What breathing gas will you use?
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Based on your dive technique, select your gas mix.
        </p>
        <div className="grid grid-cols-1 gap-3">
          {availableGasTypes.map((gasType) => {
            const gasOptions: Record<string, { title: string; desc: string }> = {
              air: {
                title: "Air",
                desc: "Standard compressed air (21% O₂, 79% N₂)",
              },
              "nitrox-nia": {
                title: "Nitrox NIA (40/60)",
                desc: "40% O₂, 60% N₂ - Reduced nitrogen loading",
              },
              "nitrox-nib": {
                title: "Nitrox NIB (35/65)",
                desc: "35% O₂, 65% N₂ - Conservative mix",
              },
            };
            const option = gasOptions[gasType] || {
              title: gasType,
              desc: "Selected gas type",
            };
            return (
              <button
                key={gasType}
                onClick={() => handleGasTypeSelect(gasType)}
                className="p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-blue-50 transition-all text-left"
              >
                <p className="font-semibold text-foreground">{option.title}</p>
                <p className="text-sm text-muted-foreground">{option.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    ) : null;

  // Question 3: Depth Range
  const question3 = (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        3. What is your planned depth range?
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Select a range, then specify your exact maximum depth on the next step.
      </p>
      <div className="grid grid-cols-1 gap-3">
        {depthRanges.map((range) => (
          <button
            key={range.range}
            onClick={() => handleDepthRangeSelect(range)}
            className="p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-blue-50 transition-all text-left"
          >
            <p className="font-semibold text-foreground">{range.label}</p>
          </button>
        ))}
      </div>
    </div>
  );

  // Question 4: Exact Depth & Bottom Time
  const question4 = (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        4. Refine your dive parameters
      </h2>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Maximum Depth (meters)
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="number"
            inputMode="numeric"
            min="6"
            max="100"
            value={profile.plannedDepth || 30}
            onChange={(e) => handleDepthInput(Math.max(6, parseInt(e.target.value) || 30))}
            className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base"
            placeholder="30"
          />
          <span className="text-sm text-muted-foreground whitespace-nowrap">m</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {profile.plannedDepth && profile.plannedDepth}m max depth
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Expected Bottom Time (minutes)
        </label>
        <div className="flex gap-3 items-end">
          <input
            type="number"
            min="5"
            max="300"
            value={profile.bottomTime || 30}
            onChange={(e) => handleBottomTimeInput(Math.max(5, parseInt(e.target.value) || 30))}
            className="flex-1 px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="30"
          />
          <span className="text-sm text-muted-foreground">min</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setStep(2)}
          className="flex-1"
        >
          ← Back
        </Button>
        <Button
          onClick={handleGetRecommendation}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          Get Recommendation
        </Button>
      </div>
    </div>
  );

  // Recommendation Results
  const recommendationView = recommendation && (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Your Table Recommendation
      </h2>

      {/* Dive Profile Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-base">Your Dive Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Technique:</span>
            <span className="font-semibold capitalize">
              {profile.technique?.replace("-", " ")}
            </span>
          </div>
          {profile.gasType && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gas:</span>
              <span className="font-semibold">
                {profile.gasType === "nitrox-nia"
                  ? "Nitrox NIA (40/60)"
                  : profile.gasType === "nitrox-nib"
                    ? "Nitrox NIB (35/65)"
                    : "Air"}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Max Depth:</span>
            <span className="font-semibold">{profile.plannedDepth}m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bottom Time:</span>
            <span className="font-semibold">{profile.bottomTime} min</span>
          </div>
        </CardContent>
      </Card>

      {/* Recommendation Card */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <CardTitle className="text-green-900">
                {recommendation.tableCode}
              </CardTitle>
              <CardDescription className="text-green-800 mt-1">
                {recommendation.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between bg-white p-3 rounded border border-green-200">
            <span className="text-sm font-semibold text-foreground">
              Recommended Depth:
            </span>
            <span className="text-lg font-bold text-green-700">
              {recommendation.recommendedDepth}m
            </span>
          </div>

          {recommendation.warnings && recommendation.warnings.length > 0 && (
            <Alert className="bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-700" />
              <AlertTitle className="text-amber-900">Considerations</AlertTitle>
              <AlertDescription className="text-amber-800 mt-2">
                <ul className="list-disc list-inside space-y-1">
                  {recommendation.warnings.map((warning, idx) => (
                    <li key={idx} className="text-sm">
                      {warning}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex-1"
        >
          Start Over
        </Button>
        <Button
          onClick={handleNavigateToTable}
          className="flex-1 bg-primary hover:bg-primary/90 gap-2"
        >
          View Table <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      <section className="py-12 px-4 bg-white border-b border-border">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Dive Table Decision Tree
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Answer a few questions to find the perfect decompression table for
            your commercial offshore dive.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Progress Bar */}
          {step < 4 && (
            <div className="mb-8 bg-white rounded-lg border border-border p-6">
              <div className="flex justify-between mb-4">
                <span className="text-sm font-semibold text-muted-foreground">
                  Step {step + 1} of 4
                </span>
                <span className="text-sm font-semibold text-primary">
                  {Math.round(((step + 1) / 4) * 100)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((step + 1) / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="bg-white rounded-lg border border-border p-8">
            {step === 0 && question1}
            {step === 1 && question2}
            {step === 2 && question3}
            {step === 3 && question4}
            {step === 4 && recommendationView}

            {/* Navigation Buttons */}
            {step > 0 && step < 3 && (
              <div className="mt-8 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => (s - 1) as 0 | 1 | 2 | 3)}
                  className="flex-1"
                >
                  ← Previous
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-4 bg-ocean-50 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            How This Tool Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: "1",
                title: "Answer Questions",
                description:
                  "Tell us about your dive technique, gas type, and depth to narrow down options.",
              },
              {
                number: "2",
                title: "Get Recommendation",
                description:
                  "Our decision tree matches your profile to the most suitable table code and depth.",
              },
              {
                number: "3",
                title: "Review & Verify",
                description:
                  "Check warnings and considerations, then navigate to the full decompression table.",
              },
            ].map((step) => (
              <Card key={step.number} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {step.number}
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
