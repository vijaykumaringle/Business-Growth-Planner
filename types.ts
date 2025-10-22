
export interface BusinessData {
    name: string;
    category: string;
    location: string;
    details: string;
}

export interface SwotAnalysis {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
}

export interface ReportSection {
    title: string;
    content: string;
    points: string[];
}

export interface BusinessReport {
    executiveSummary: string;
    swotAnalysis: SwotAnalysis;
    growthAreas: ReportSection;
    marketingStrategies: ReportSection;
    operationalImprovements: ReportSection;
}
