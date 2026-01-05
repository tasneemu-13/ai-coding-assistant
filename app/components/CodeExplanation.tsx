import React, { useState } from 'react';
import { HistoryItem } from '../types';
import { sampleCode } from '../data/examples';
import { Loader2, RotateCcw, Sparkles } from 'lucide-react'; // Added icons for UI

interface CodeExplanationProps {
    addToHistory: (
        type: HistoryItem["type"],
        input: string,
        output: string
    ) => void;
}

const CodeExplanation = ({ addToHistory }: CodeExplanationProps) => {
    const [code, setCode] = useState<string>("");
    const [explanation, setExplanation] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleExplain = async () => {
        if (!code.trim()) return;
        setLoading(true);

        try {
            const response = await fetch('/api/explain', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
               console.log("SERVER RESPONSE:", JSON.stringify(data, null, 2));
                const explanationText =
                    data.data?.explanation || "No explanation available.";
                setExplanation(explanationText);
                addToHistory("explain", code, explanationText);
            } else {
                setExplanation(`Error: ${data.error}`);
            }
        } catch (error) {
            console.log(error);
            setExplanation("Failed this explanation. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const insertSample = () => {
        setCode(sampleCode);
    };

    // New: Reset Feature
    const clearCanvas = () => {
        setCode("");
        setExplanation("");
    };

    return (
        <div className="space-y-6">
            {/* Header Section with Reset & Sample buttons */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                    Explain Code
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={clearCanvas}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white border border-gray-700 rounded-lg transition-all duration-200 text-sm font-medium flex items-center gap-2"
                        title="Clear Editor"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </button>
                    <button
                        onClick={insertSample}
                        className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                        Try Sample
                    </button>
                </div>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-400 mb-2">
                        Paste your code
                    </label>
                    <div className="relative group">
                        {/* Glow effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                        
                        <textarea
                            id="code"
                            rows={10}
                            className="relative w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none placeholder-gray-600 transition-all"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="// Paste your code here to get a detailed explanation..."
                        />
                        <div className="absolute top-3 right-3 text-xs text-gray-500 font-mono">
                            {code.length} chars
                        </div>
                    </div>
                </div>

                {/* THE MAIN BUTTON (Updated to match video/screenshot exactly) */}
                <button
                    onClick={handleExplain}
                    disabled={loading || !code.trim()}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            {/* Custom Spinner from Video */}
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Analyzing Code...</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            <span>Explain Code</span>
                        </div>
                    )}
                </button>
            </div>

            {/* Result Section */}
            {explanation && (
                <div className="mt-8 p-6 bg-gray-900/50 border border-gray-700 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <span className="text-blue-400">⚡</span> Explanation
                    </h3>
                    <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">
                        {explanation}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodeExplanation;