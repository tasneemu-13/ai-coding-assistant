import { GoogleGenerativeAI } from "@google/generative-ai";
import {NextRequest , NextResponse} from "next/server";
import {DebugRequest} from "@/app/types";


const apiKey = process.env.GEMINI_API_KEY;
if(!apiKey ){
    throw new Error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const POST = async(req: NextRequest) => {
       try {
        const {code, error: errorMessage} : DebugRequest = await req.json();
        
        if(!code) {
            return NextResponse.json({error : "Code is required"},{status:400});

        }

        const model = genAI.getGenerativeModel({model:"gemini-2.5-flash"});

        let prompt = `Please Debug the following code :\n\n${code}\n\n`;
        if(errorMessage) {
            prompt+= `The error I am getting is : ${errorMessage}\n\n`;
        }
        prompt+= `Debugging Suggestion : `;
        const result = await model.generateContent(prompt)
        
        const response = await result.response;

        const debugging = response.text(); // Extract explaination in text format

        return NextResponse.json({data:{debugging}} , {status : 200}); // Return explanation to client in JSON response


    } catch(error) {

        console.error("Error:",error);
        return NextResponse.json({error:"Failed to debugging suggestion"},{status : 500}) // Return error response to client

       }
};