import { GoogleGenerativeAI } from "@google/generative-ai";
import {NextRequest , NextResponse} from "next/server";
import {ExplainRequest} from "@/app/types";


const apiKey = process.env.GEMINI_API_KEY;
if(!apiKey ){
    throw new Error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const POST = async(req: NextRequest) => {
       try {
        const {code} : ExplainRequest = await req.json();
        
        if(!code) {
            return NextResponse.json({error : "Code is required"},{status:400});

        }

        const model = genAI.getGenerativeModel({model:"gemini-2.5-flash"});

        const prompt = `Explain the following code in detail:\n\n${code}\n\nExplanation:`;
        
        const result = await model.generateContent(prompt)
        
        const response = await result.response;

        const explanation = response.text(); // Extract explaination in text format

        return NextResponse.json({data:{explanation}} , {status : 200}); // Return explanation to client in JSON response


    } catch(error) {

        console.error("Error:",error);
        return NextResponse.json({error:"Failed to generate explanation"},{status : 500}) // Return error response to client

       }
};