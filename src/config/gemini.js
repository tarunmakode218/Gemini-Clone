
// import {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
// } from "@google/generative-ai";

// const MODEL_NAME = "gemini-1.0-pro";
// const API_KEY = "AIzaSyDW6DnBZJAoCLLTc97Gykd3pTSUD-Bvmdo";

// async function runChat(prompt) {
//     const genAI = new GoogleGenerativeAI(API_KEY);
//     const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//     const generationConfig = {
//         temperature: 0.9,
//         topK: 1,
//         topP: 1,
//         maxOutputTokens: 2048,
//     };

//     const safetySettings = [
//         {
//             category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//             threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//         },
//         {
//             category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//             threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
//         },
//         {
//             category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//             threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//         },
//     ];

//     // ✅ FIX: Create a chat session before sending a message
//     const chat = model.startChat({
//         generationConfig,
//         safetySettings,
//     });

//     const result = await chat.sendMessage(prompt);
//     console.log(result.response.text());
//     // return response.text();
// }

// export default runChat;
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyDW6DnBZJAoCLLTc97Gykd3pTSUD-Bvmdo";

async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    try {
        const chat = model.startChat({ generationConfig, safetySettings });
        const result = await chat.sendMessage(prompt);
        const response = result.response.text(); // Get text output
        return response; // Return response properly
    } catch (error) {
        console.error("Error in runChat:", error);
        return "Error generating response.";
    }
}

export default runChat;

