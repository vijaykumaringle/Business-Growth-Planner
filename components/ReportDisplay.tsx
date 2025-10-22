
import React from 'react';
import type { BusinessReport, ReportSection, SwotAnalysis } from '../types';
import { ChartIcon, CheckCircleIcon, LightBulbIcon, PresentationChartLineIcon, ShieldExclamationIcon, ThumbDownIcon, ThumbUpIcon, TrendingUpIcon } from './IconComponents';

interface ReportDisplayProps {
    report: BusinessReport | null;
    isLoading: boolean;
    error: string | null;
}

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all hover:shadow-xl hover:border-indigo-200">
        <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-2 rounded-full">{icon}</div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        {children}
    </div>
);


const SwotCard: React.FC<{ title: string; items: string[]; icon: React.ReactNode, color: string }> = ({ title, items, icon, color }) => (
    <div className="bg-gray-50 p-4 rounded-lg border">
        <div className={`flex items-center gap-2 mb-2 font-semibold ${color}`}>
            {icon}
            {title}
        </div>
        <ul className="space-y-1.5 text-sm text-gray-700 list-inside">
            {items.map((item, index) => <li key={index} className="flex items-start"><span className="mr-2 mt-1">▪</span><span>{item}</span></li>)}
        </ul>
    </div>
);

const SwotAnalysisSection: React.FC<{ swot: SwotAnalysis }> = ({ swot }) => (
    <SectionCard title="SWOT Analysis" icon={<ChartIcon className="h-6 w-6 text-indigo-600" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SwotCard title="Strengths" items={swot.strengths} icon={<ThumbUpIcon className="h-5 w-5" />} color="text-green-600" />
            <SwotCard title="Weaknesses" items={swot.weaknesses} icon={<ThumbDownIcon className="h-5 w-5" />} color="text-red-600" />
            <SwotCard title="Opportunities" items={swot.opportunities} icon={<TrendingUpIcon className="h-5 w-5" />} color="text-blue-600" />
            <SwotCard title="Threats" items={swot.threats} icon={<ShieldExclamationIcon className="h-5 w-5" />} color="text-yellow-600" />
        </div>
    </SectionCard>
);

const ReportSectionDisplay: React.FC<{ section: ReportSection, icon: React.ReactNode }> = ({ section, icon }) => (
    <SectionCard title={section.title} icon={icon}>
        <p className="text-gray-600 mb-4">{section.content}</p>
        <ul className="space-y-2">
            {section.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{point}</span>
                </li>
            ))}
        </ul>
    </SectionCard>
);


const ReportDisplay: React.FC<ReportDisplayProps> = ({ report, isLoading, error }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl shadow-lg border border-gray-200">
                 <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-lg font-semibold text-gray-700">Generating your business plan...</p>
                <p className="text-gray-500">This might take a moment.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-red-800">
                <h3 className="font-bold text-lg mb-2">An Error Occurred</h3>
                <p>{error}</p>
            </div>
        );
    }
    
    if (!report) {
        return (
            <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl shadow-lg border border-gray-200 text-center p-8">
                 <PresentationChartLineIcon className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-800">Your Report Will Appear Here</h3>
                <p className="text-gray-500 mt-2 max-w-sm">Fill out the form to the left to get started and receive your AI-powered business analysis.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <SectionCard title="Executive Summary" icon={<LightBulbIcon className="h-6 w-6 text-indigo-600" />}>
                <p className="text-gray-600 leading-relaxed">{report.executiveSummary}</p>
            </SectionCard>

            <SwotAnalysisSection swot={report.swotAnalysis} />

            <ReportSectionDisplay 
                section={report.growthAreas} 
                icon={<TrendingUpIcon className="h-6 w-6 text-indigo-600" />} 
            />
            <ReportSectionDisplay 
                section={report.marketingStrategies}
                icon={<PresentationChartLineIcon className="h-6 w-6 text-indigo-600" />}
            />
            <ReportSectionDisplay 
                section={report.operationalImprovements} 
                icon={<CheckCircleIcon className="h-6 w-6 text-indigo-600" />}
            />
        </div>
    );
};

export default ReportDisplay;
