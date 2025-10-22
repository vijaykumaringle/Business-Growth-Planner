import React, { useState, useCallback } from 'react';
import BusinessForm from './components/BusinessForm';
import ReportDisplay from './components/ReportDisplay';
import { generateBusinessReport } from './services/geminiService';
import type { BusinessData, BusinessReport } from './types';
import { LogoIcon } from './components/IconComponents';


const App: React.FC = () => {
    const [report, setReport] = useState<BusinessReport | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = useCallback(async (data: BusinessData) => {
        setIsLoading(true);
        setError(null);
        setReport(null);
        try {
            const generatedReport = await generateBusinessReport(data);
            setReport(generatedReport);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center gap-3">
                    <LogoIcon className="h-8 w-8 text-indigo-600" />
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AI Business Growth Planner</h1>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="lg:sticky lg:top-8">
                        <BusinessForm onAnalyze={handleAnalyze} isLoading={isLoading} />
                    </div>
                    <div>
                        <ReportDisplay report={report} isLoading={isLoading} error={error} />
                    </div>
                </div>
            </main>
            
            <footer className="text-center py-6 mt-8">
                <p className="text-sm text-gray-500 mb-1">Developed by Vijaykumar Ingle</p>
                <p className="text-sm text-gray-500">Powered by Gemini API</p>
            </footer>
        </div>
    );
};

export default App;