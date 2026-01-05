import { Bot } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Bot className="w-8 h-8 text-white" />
        </div>
      </div>
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 bg-[length:200%_auto] animate-gradient mb-4">

        Tasneem AI Coding Assistant
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Your intelligent coding companion. Explain, Debug, and Generate code
        with AI-powered Assistance.
      </p>
    </div>
  );
};
