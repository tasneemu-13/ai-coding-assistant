import { Tab } from "../types";

const tabs : Tab[] = [
    {
        id: "explain",
        label : "Explain Code",
        icon : "💡" ,
        gradient : "from-purple-500 to-pink-500",
    } , 
    {
        id : "debug",
        label : "Debug Code",
        icon : "🐛",
        gradient :  "from-yellow-400 to-red-500",
    } ,
    {
        id : "generate",
        label : "Generate Code",
        icon : "⚙️",
        gradient :"from-green-400 to-blue-500",
    } ,
];

export default tabs;