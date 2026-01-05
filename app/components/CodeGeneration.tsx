import React, { useState } from 'react';
import { HistoryItem } from '../types';
import { languages, samplePrompts } from '../data/examples'; 
import { Loader2, Sparkles, Copy, Check } from 'lucide-react'; 

interface CodeGenerationProps {
    addToHistory: (
        type: HistoryItem["type"],
        input: string,
        output: string
    ) => void;
}

const CodeGeneration = ({ addToHistory }: CodeGenerationProps) => {
    const [description, setDescription] = useState<string>("");
    const [language, setLanguage] = useState<string>("javascript");
    const [generatedCode, setGeneratedCode] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [copied, setCopied] = useState(false); 

    const handleGenerate = async () => {
        if (!description.trim()) return;
        setLoading(true);

        try {
            const response = await fetch('/api/generate', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ description, language }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("SERVER RESPONSE:", JSON.stringify(data, null, 2));
                
                // FIX: Check for 'generateCode' (from your logs) AND 'generatedCode'
                const codeText = data.data?.generateCode || data.generatedCode || data.data?.generatedCode || "No Code generated.";
                
                setGeneratedCode(codeText);
                addToHistory("generate", `${language}: ${description}`, codeText);
            } else {
                setGeneratedCode(`Error: ${data.error}`);
            }
        } catch (error) {
            console.log(error);
            setGeneratedCode("Failed to generate code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const insertSamplePrompt = (prompt: string) => {
        setDescription(prompt);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                    Generate Code
                </h2>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
                <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-400 mb-2">
                        Programming Language
                    </label>
                    <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                        {languages.map((lang) => (
                            <option key={lang || lang} value={lang || lang} className="bg-gray-900">
                                {lang || lang}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-400">
                            Describe what you want to code
                        </label>
                        <span className="text-xs text-gray-500">
                            {description.length} chars
                        </span>
                    </div>
                    <div className="relative group">
                         <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                        <textarea
                            id="description"
                            rows={5}
                            className="relative w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none placeholder-gray-600 transition-all"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe or paste the code you want to generate. Be as specific as possible..."
                        />
                    </div>
                </div>

                {/* Sample Prompts */}
                <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-300'>
                        Quick Prompts
                    </label>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        {samplePrompts.map((prompt, index) => (
                            <button
                                key={index}
                                onClick={() => insertSamplePrompt(prompt)}
                                className="px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-gray-300 text-sm font-medium transition-colors duration-300 text-left truncate"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Button */}
                <button
                    onClick={handleGenerate}
                    disabled={loading || !description.trim()}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Generating Code...</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            <span>Generate Code</span>
                        </div>
                    )}
                </button>
            </div>

            {/* Result Section */}
            {generatedCode && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                        <h3 className="text-xl font-semibold text-white">Generated Code</h3>
                    </div>

                    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
                            <span className="text-sm font-medium text-gray-300">
                                {language || "Code"}
                            </span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                        <pre className="p-6 overflow-x-auto text-green-400 font-mono text-sm">
                            <code>{generatedCode}</code>
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodeGeneration;