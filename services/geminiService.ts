
import { GoogleGenAI, Type } from "@google/genai";
import type { BusinessData, BusinessReport } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        executiveSummary: {
            type: Type.STRING,
            description: "A brief, high-level summary of the entire business improvement plan."
        },
        swotAnalysis: {
            type: Type.OBJECT,
            description: "A SWOT analysis for the business.",
            properties: {
                strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Internal positive attributes." },
                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Internal negative attributes." },
                opportunities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "External factors that could be exploited." },
                threats: { type: Type.ARRAY, items: { type: Type.STRING }, description: "External factors that could harm the business." }
            },
             required: ["strengths", "weaknesses", "opportunities", "threats"]
        },
        growthAreas: {
            type: Type.OBJECT,
            description: "Key areas with high potential for business growth.",
            properties: {
                title: { type: Type.STRING, description: "Title for this section, e.g., 'Key Growth Areas'" },
                content: { type: Type.STRING, description: "Introductory paragraph for this section." },
                points: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Bulleted list of specific growth areas." }
            },
            required: ["title", "content", "points"]
        },
        marketingStrategies: {
            type: Type.OBJECT,
            description: "Actionable marketing strategies.",
            properties: {
                title: { type: Type.STRING, description: "Title for this section, e.g., 'Actionable Marketing Strategies'" },
                content: { type: Type.STRING, description: "Introductory paragraph for this section." },
                points: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Bulleted list of specific marketing strategies." }
            },
            required: ["title", "content", "points"]
        },
        operationalImprovements: {
            type: Type.OBJECT,
            description: "Suggestions for improving business operations.",
            properties: {
                title: { type: Type.STRING, description: "Title for this section, e.g., 'Operational Improvements'" },
                content: { type: Type.STRING, description: "Introductory paragraph for this section." },
                points: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Bulleted list of specific operational improvements." }
            },
            required: ["title", "content", "points"]
        }
    },
    required: ["executiveSummary", "swotAnalysis", "growthAreas", "marketingStrategies", "operationalImprovements"]
};

export const generateBusinessReport = async (data: BusinessData): Promise<BusinessReport> => {
    const { name, category, location, details } = data;

    const prompt = `
        You are a world-class business consultant and strategist. 
        Analyze the following business information and generate a comprehensive, actionable business improvement plan.
        Provide the output in the specified JSON format.

        Business Information:
        - Business Name: "${name}"
        - Business Category/Field: "${category}"
        - Location of Service: "${location}"
        - Additional Details: "${details}"

        Your report should be insightful, professional, and provide concrete, actionable advice.
        Focus on creating a clear roadmap for growth and improvement.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.5,
            },
        });

        const jsonText = response.text.trim();
        const reportData = JSON.parse(jsonText);
        
        return reportData as BusinessReport;

    } catch (error) {
        console.error("Error generating business report:", error);
        throw new Error("Failed to generate business report. The model may be unavailable or the request may have timed out.");
    }
};
