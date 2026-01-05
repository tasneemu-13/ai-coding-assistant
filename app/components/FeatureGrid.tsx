import React from "react";
import features from "../data/features";
const FeatureGrid = () => {
    return(
        <div className = "mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature , index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:shadow-xl border border-gray-700 transition-all duration-300 group text-center">
                    <div className="w-12 h-12 bg-graident-to-r from-purple-500 to-pink-500 round-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className = "text-2xl">{feature.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                </div>
            ))}
        </div>
    );
};
export default FeatureGrid;