"use client";

import { useState } from "react";
import { HistoryItem, Tab } from "./types";
import FeatureGrid from "./components/FeatureGrid";
import Header from "./components/Header";
import HistoryPanel from "./components/HistoryPanel";
import tabs from "./data/tabs";
import CodeExplanation from "./components/CodeExplanation";
import CodeDebugging from "./components/CodeDebugging";
import CodeGeneration from "./components/CodeGeneration";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab["id"]>("explain");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addToHistory = (
    type:HistoryItem["type"]  , 
    input: string, 
    output: string
  ) => {
    const newItem: HistoryItem = {
      id: Date.now(),
      type,
      timeStamp: new Date().toLocaleString(),
      input,
      output,
    };
    setHistory((prev) => [newItem, ...prev.slice(0,9)]); // Keep only latest 10 items
    }

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-blue-500/30 relative">
      {/* Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <Header />

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Main Panel */}
          <div className="w-full lg:w-2/3">
            <div className="bg-gray-800/50 backdrop-blur-2xl shadow-2xl border-2 border-gray-700/50 rounded-2xl">
              
              {/* Tabs Navigation */}
              <div className="flex border-b border-gray-700/50 bg-gray-900/50 p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 rounded-lg font-semibold
                      transition-all duration-300 ease-in-out
                      ${
                        activeTab === tab.id
                          ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg shadow-purple-500/20`
                          : `text-gray-400 hover:bg-gray-700/50 hover:text-white`
                      }`}
                  >
                    <span className="text-xl mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content (INSIDE SAME BOX) */}
              <div className="p-6">
                {activeTab === "explain" && <CodeExplanation addToHistory={addToHistory} />}
                {activeTab === "debug" && <CodeDebugging addToHistory={addToHistory} />}
                {activeTab === "generate" && <CodeGeneration addToHistory={addToHistory}/>}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <HistoryPanel history={history} />
        </div>

        {/* Features Grid */}
        <FeatureGrid />
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-400">
        <p>Built with ❤️ by Tasneem Dewaswala with Next.js & TypeScript</p>
      </footer>
    </div>
  );
}
