import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  HelpCircle,
  BookOpen,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";

export default function Help() {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "getting-started",
  );

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Lightbulb className="w-5 h-5" />,
      content: `Welcome to DivePlan, a comprehensive guide for commercial offshore diving operations. This app helps you select the correct diving tables and understand decompression procedures.

Key Features:
• Diving Tables - Access all standard and special diving tables
• Table Selection - Use our decision tree to find the right table for your dive
• Table Use - Detailed procedures for normal use and emergencies
• Tools - Calculators and utilities for dive planning
• Safety Information - Critical limits and guidelines

Start by exploring the Tables section or use Table Selection to find your specific dive profile.`,
    },
    {
      id: "table-selection",
      title: "How to Select Your Table",
      icon: <BookOpen className="w-5 h-5" />,
      content: `The Table Selection tool guides you through a 4-step process:

Step 1: Choose Your Dive Technique
- No-Stop Diving (air only, no decompression)
- In-Water Decompression (standard air tables)
- Surface Oxygen Decompression (oxygen at surface)
- Nitrox Diving (enriched air for reduced decompression)

Step 2: Select Your Gas Type
- Air (only option for no-stop and in-water)
- NIA15 or NIB15 for nitrox dives
- Not applicable for surface oxygen

Step 3: Choose Depth Range
- Select the depth category your dive falls within

Step 4: Select Exact Depth & Bottom Time
- The system will show you compatible depths
- If your exact depth isn't available, use the next deeper depth
- Select your bottom time and get your recommended table

The system shows you the decompression table code (e.g., SIL15, SOX15) and the recommended depth to use.`,
    },
    {
      id: "table-guide",
      title: "Understanding the Tables",
      icon: <BookOpen className="w-5 h-5" />,
      content: `Each diving table contains decompression schedules organized by depth and bottom time.

Reading a Table:
1. Find your dive depth (left column)
2. Find your bottom time (top row)
3. Follow down and across to find the intersection point
4. This shows your decompression stops and times

Decompression Stops:
- Depth columns show where to stop (e.g., 12m, 9m, 6m, 3m)
- Time entries show how many minutes at each depth
- Follow stops in order from deepest to shallowest

Special Columns:
- Repetitive Group Letter - for planning sequential dives
- OTU (Oxygen Toxicity Units) - track cumulative oxygen exposure
- Pressure - depth in meters or feet depending on table

Color Coding:
- Blue borders: Standard Air Tables (SIL15)
- Orange borders: Surface/Oxygen Tables (SOX15)
- Green borders: Nitrox Tables (NIA15, NIB15)
- Purple borders: No-Stop Limits (ND15)
- Red borders: Treatment Tables (USN-5, USN-6, AIR series)
- Teal borders: COMEX Tables (CX-12, CX-30, AIR-4)`,
    },
    {
      id: "table-types",
      title: "Table Types Explained",
      icon: <Lightbulb className="w-5 h-5" />,
      content: `Standard Air Tables (SIL15):
- Used for normal in-water decompression
- Can plan repetitive dives with 12+ hour surface intervals
- Maximum 1 repetitive dive recommended

Surface/Oxygen Tables (SOX15):
- Allows surface decompression with oxygen
- Significantly reduces in-water decompression time
- Requires chamber or oxygen supply at surface
- Best for offshore operations

Nitrox Tables (NIA15, NIB15):
- NIA15: 40% O₂ / 60% N₂ - max PO₂ ~1.5 bar at 27m
- NIB15: 35% O₂ / 65% N₂ - max PO₂ 1.4 bar at 30m (IMCA limit)
- Requires EAD (Equivalent Air Depth) calculation
- Provides shorter decompression times than air

No-Stop Limits (ND15):
- Maximum dive times without decompression
- Use when planning dives that won't require stops
- Reference only - doesn't show decompression schedule

Extended No-Stop (LND15):
- Extended limits for longer intervals
- Used with specific gas mixtures
- Check oxygen limits carefully

Treatment Tables:
- Used for decompression sickness treatment
- USN-5: Mild symptoms and prevention
- USN-6: Serious symptoms, longest oxygen treatment
- AIR series: Emergency treatment without oxygen
- COMEX Tables: Special treatment protocols`,
    },
    {
      id: "safety",
      title: "Safety-Critical Information",
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `CRITICAL TIME LIMITS:
• Surface to Chamber: 3 minutes maximum
• Extended Clearing: 5 minutes maximum
• Ascent Rate: 5-10 m/min (never faster)

OXYGEN LIMITS:
• Maximum PO₂: 1.6 bar (operational)
• Recommended Limit: 1.5 bar (safety margin)
• IMCA Limit: 1.4 bar (conservative)
• Daily OTU Limit: 450 maximum
• Minimum Safe PO₂: 0.16 bar (hypoxia threshold)

DECOMPRESSION PROCEDURES:
• Always follow table instructions exactly
• Never exceed maximum bottom times without increasing depth stage
• If exceeding no-deco limits: immediately switch to in-water decompression
• For crash dives: pressurize chamber within 3 minutes of surfacing
• Remain near chamber for minimum standby period (2-4 hours)

REPETITIVE DIVING:
• Standard interval: 12 hours between dives
• Shorter intervals (2-4 hours) with "H2" or "H4" tables only
• Only one repetitive dive recommended after long decompression
• Classify all dives by group letter to track nitrogen loading

EMERGENCY PROCEDURES:
• DCS/Bends: Pressurize to first stop depth, treat per table
• Air Embolism: Immediate recompression (chamber within 3 min)
• Oxygen Toxicity: Cease oxygen breathing, switch to air, ascend slowly
• Shallow Water Blackout: Immediate rescue, oxygen administration`,
    },
    {
      id: "glossary",
      title: "Diving Terms & Glossary",
      icon: <HelpCircle className="w-5 h-5" />,
      content: `Ascent Rate - Speed of rising toward surface (standard: 5-10 m/min)

Bottom Time - Time spent at maximum depth of dive

Breathing Mix - Gas composition (e.g., Air, NIA15, NIB15)

Chamber Pressure - Depth equivalent for treatment tables

Decompression - Gradual pressure reduction to prevent DCS

DCS (Decompression Sickness) - "The Bends" - nitrogen bubble formation in tissues

EAD (Equivalent Air Depth) - Calculated depth for nitrox decompression planning

Hypoxia - Insufficient oxygen (PO₂ < 0.16 bar)

IMCA - International Marine Contractors Association (conservative standards)

Inert Gas - Nitrogen or helium in breathing mix

In-Water Decompression - Stops performed underwater

Nitrogen Narcosis - Intoxication effect from breathing nitrogen at depth

No-Stop Dive - Dive within limits; no decompression required

OTU (Oxygen Toxicity Units) - Measure of cumulative oxygen exposure

PO₂ (Partial Pressure of Oxygen) - Oxygen pressure component (bar or ATA)

Repetitive Dive - Second or subsequent dive within 12 hours

Residual Nitrogen - Nitrogen remaining in tissues from previous dive

Safety Stop - 3-5 minute stop at 3-5m (not required by tables but recommended)

Saturation - When tissue nitrogen equilibrates to ambient pressure

Surface Decompression - Final decompression stops performed on surface with oxygen

Standby Period - Time to remain near chamber after dive (2-4 hours)

Table Code - Identifier for specific table (e.g., SIL15, SOX15, NIA15)

Treatment Table - Recompression schedule for DCS or air embolism`,
    },
    {
      id: "faq",
      title: "Frequently Asked Questions",
      icon: <HelpCircle className="w-5 h-5" />,
      content: `Q: What's the difference between SIL15 and SOX15?
A: SIL15 is for in-water decompression. SOX15 allows you to decompress at the surface with oxygen, significantly reducing bottom time. SOX15 requires equipment (chamber or oxygen supply) at surface.

Q: Why do I need to use EAD for nitrox dives?
A: Nitrogen narcosis depends on nitrogen partial pressure, not depth. EAD calculates the equivalent depth on air that produces the same narcosis effect, ensuring accurate table selection.

Q: Can I use air tables for nitrox dives?
A: No. You must use nitrox-specific tables (NIA15 or NIB15) and calculate your EAD for proper decompression. Using air tables is unsafe with enriched air.

Q: What if my exact dive depth isn't on the table?
A: Always use the next DEEPER depth. Never use a shallower depth - this provides more conservative decompression.

Q: How do repetitive dives work?
A: Each dive receives a Group Letter based on remaining nitrogen. Your next dive uses this to plan additional decompression. Standard interval is 12 hours between dives.

Q: What should I do if I exceed my planned bottom time?
A: Immediately increase your decompression stops. Use the next deeper bottom time row on the table that's greater than your actual bottom time.

Q: Can I dive multiple times a day?
A: Yes, using repetitive tables (H2 = 2-4 hour interval, H4 = 4 hour interval). Standard is 12+ hours. Only one repetitive dive typically recommended after long decompression.

Q: What's the maximum oxygen I can breathe?
A: PO₂ (partial pressure) is limited to 1.6 bar operational, 1.5 bar recommended, 1.4 bar IMCA conservative. This depends on depth and O₂ percentage in your mix.

Q: What if I get decompression sickness symptoms?
A: Immediately pressurize to first in-water stop depth or deepest safe depth. Contact medical supervision. Use appropriate treatment table (USN-5 for mild, USN-6 for serious).

Q: How do I know if I'm within my oxygen limits?
A: Calculate daily OTU from tables and sum all oxygen breathing periods. Stay below 450 OTU per day. Tables show OTU values for each schedule.`,
    },
    {
      id: "tools",
      title: "Using the Tools",
      icon: <BookOpen className="w-5 h-5" />,
      content: `The Tools section includes utilities for dive planning:

PO₂ Calculator:
- Calculate partial pressure of oxygen at any depth
- Verify your mix is safe for your planned depth
- Input: Depth (m), O₂ percentage
- Output: PO₂ (bar)

EAD Calculator:
- Calculate equivalent air depth for nitrox dives
- Use result to select decompression table depth
- Input: Actual depth (m), O₂ percentage
- Output: EAD (m)

OTU Tracker:
- Track cumulative oxygen exposure across dives
- Ensure you stay within 450 OTU/day limit
- Input: Dive duration and oxygen percentage
- Output: OTU value

Use these tools during dive planning to verify your parameters are within safe limits.`,
    },
  ];

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Help & Guide</h1>
          </div>
          <p className="text-lg text-gray-600">
            Comprehensive guide to using DivePlan and understanding diving
            tables
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                expandedSection === section.id
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-blue-400"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-gray-600">{section.icon}</div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform ${
                    expandedSection === section.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedSection === section.id && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Ready to Plan Your Dive?
          </h3>
          <p className="text-blue-800 mb-4">
            Use the Table Selection tool to find the perfect table for your dive
            profile, or browse all available tables.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/table-selection"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Table Selection Tool
            </Link>
            <Link
              to="/tables"
              className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Browse All Tables
            </Link>
            <Link
              to="/table-use"
              className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Table Use Guide
            </Link>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="mt-8 p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-orange-900 mb-1">
                Safety Disclaimer
              </p>
              <p className="text-sm text-orange-800">
                This guide is for informational purposes. Always follow your
                organization's diving protocols and procedures. Consult with
                qualified diving supervisors and medical professionals before
                conducting any dive operation. Ensure full compliance with IMCA
                guidelines and local regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
