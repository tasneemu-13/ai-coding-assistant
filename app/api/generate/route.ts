import { GoogleGenerativeAI } from "@google/generative-ai";
import {NextRequest , NextResponse} from "next/server";
import { GenerateRequest} from "@/app/types";


const apiKey = process.env.GEMINI_API_KEY;
if(!apiKey ){
    throw new Error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const POST = async(req: NextRequest) => {
       try {
        const {description, language} : GenerateRequest = await req.json();
        
        if(!description) {
            return NextResponse.json({error : "Description is required"},{status:400});

        }

        const model = genAI.getGenerativeModel({model:"gemini-2.5-flash"});

        const prompt = `Generate ${language || "javascript"} code for : ${description} \n\nCode`; // Construct prompt for code generation in JS desfault
        
        const result = await model.generateContent(prompt)
        
        const response = await result.response;

        const generateCode = response.text(); // Extract generated code in text format

        return NextResponse.json({data:{generateCode}} , {status : 200}); // Return generated code to client in JSON response


    } catch(error) {

        console.error("Error:",error);
        return NextResponse.json({error:"Failed to generate code"},{status : 500}) // Return error response to client

       }
};