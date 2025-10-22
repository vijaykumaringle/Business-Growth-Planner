import React, { useState } from 'react';
import type { BusinessData } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface BusinessFormProps {
    onAnalyze: (data: BusinessData) => void;
    isLoading: boolean;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ onAnalyze, isLoading }) => {
    const [formData, setFormData] = useState<BusinessData>({
        name: '',
        category: '',
        location: '',
        details: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAnalyze(formData);
    };
    
    const isFormValid = formData.name && formData.category && formData.location && formData.details;

    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Describe Your Business</h2>
            <p className="text-gray-600 mb-6">Provide the details below to generate your growth plan.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">Business Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white text-gray-900 placeholder:text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="e.g., Artisan Coffee Roasters"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-800 mb-1">Business Category / Field</label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white text-gray-900 placeholder:text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="e.g., Food & Beverage, Retail"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-800 mb-1">Location of Service</label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white text-gray-900 placeholder:text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="e.g., San Francisco, CA or Online"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="details" className="block text-sm font-medium text-gray-800 mb-1">
                        Additional Details
                    </label>
                    <textarea
                        name="details"
                        id="details"
                        rows={6}
                        value={formData.details}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white text-gray-900 placeholder:text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="Describe your business, target audience, main products/services, and any current challenges or goals."
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={isLoading || !isFormValid}
                        className="w-full flex justify-center items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner />
                                Analyzing...
                            </>
                        ) : (
                            'Generate Growth Plan'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BusinessForm;