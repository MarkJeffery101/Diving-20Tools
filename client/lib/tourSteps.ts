import { TourStep } from '@/contexts/TourContext';

export const appTourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Dive Tables',
    description:
      'This interactive guide will walk you through the key features of the Dive Tables application. Click "Continue" to start learning about the main sections.',
    route: '/',
    highlight: false,
  },
  {
    id: 'dive-tables',
    title: 'Dive Tables',
    description:
      'Access comprehensive dive tables for different gas mixes (air, nitrox, surface oxygen) with detailed depth and decompression information. Click here to explore all available tables.',
    route: '/',
    targetElement: 'tour-dive-tables',
    highlight: true,
  },
  {
    id: 'table-selection',
    title: 'Table Selection Logic',
    description:
      'Not sure which table to use? This interactive decision tree helps you select the right table based on your dive parameters and gas mix.',
    route: '/',
    targetElement: 'tour-table-selection',
    highlight: true,
  },
  {
    id: 'supporting-info',
    title: 'Supporting Information',
    description:
      'Learn about safe limits, maximum depths, oxygen toxicity, and other critical information for safe diving operations.',
    route: '/',
    targetElement: 'tour-supporting-info',
    highlight: true,
  },
  {
    id: 'table-use',
    title: 'Table Use Guide',
    description:
      'Detailed procedures for using the tables correctly, including normal use, emergency procedures, and crash dive steps.',
    route: '/',
    highlight: false,
  },
  {
    id: 'diving-procedures',
    title: 'Emergency Procedures',
    description:
      'Learn critical emergency procedures including crash dive sequences, oxygen failure responses, and decompression irregularities.',
    route: '/',
    highlight: false,
  },
  {
    id: 'tools',
    title: 'Diving Calculator Tools',
    description:
      'Use professional diving calculators to compute decompression obligations, ESOT, and other important diving parameters.',
    route: '/tools',
    highlight: false,
  },
  {
    id: 'treatment-protocols',
    title: 'Treatment Protocols',
    description:
      'Access treatment tables and protocols for managing decompression sickness and other diving emergencies.',
    route: '/treatment-protocols',
    highlight: false,
  },
  {
    id: 'tour-complete',
    title: 'Tour Complete!',
    description:
      'You have successfully completed the application tour. Explore any section by clicking on the navigation menu, and remember to always verify with your operations manual and diving supervisor.',
    route: '/',
    highlight: false,
  },
];
