import { createContext} from "react";
import runChat from "../config/gemini";
import { useState } from "react";




export const Context = createContext();

const ContextProvider =(props)=>{

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setloading] = useState("");
    const [resultData,setResultData] =useState("");

    // const delayPara = (index,nextWord)=>{
    //     setTimeout(function(){
    //         setResultData(prev=>prev+nextWord);

    //     },75*index)

    // }

    // // const delayPara = (index, nextWord) => {
    // //     setTimeout(function () {
    // //         setResultData(prev => prev + nextWord);
    // //     }, 75 * index);
    // // }
    


    // const onSent = async (prompt)=>{
    // setResultData("")
    // setloading(true)
    // setShowResult(true)
    // setRecentPrompt(input)
    // const response = await runChat(input)
    // let responseArray = response.split("**");
    // let newResponse = "";

    // for(let i =0;i<responseArray.length;i++){
    //     if(i==0||i%2 !==1){
    //         newResponse += responseArray[i];
    //     }
    //     else{
    //         newResponse +="<b>"+responseArray[i]+"</b>";
    //     }
    // }

    // let newResponse2 = newResponse.replace(/\*/g,"</br>");
    // let newResponseArray = newResponse2.split("");
    // for(let i=0; i<newResponseArray.length;i++){
    //     const nextWord =newResponseArray[i];
    //     delayPara(i,nextWord+" ")
    // }
    // setloading(false)
    //   setInput("")

    // }

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord); // ✅ Fix: No extra spaces
        }, 75 * index);
    }
    
    const newChat = ()=>{
        setloading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("");
        setloading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined){
            response = await runChat(prompt);
            setRecentPrompt(prompt);
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
        // setRecentPrompt(input);
        // setPrevPrompts(prev=>[...prev,input])
    
        // const response = await runChat(input);
        let responseArray = response.split("**");
        let newResponse = "";
    
        for (let i = 0; i < responseArray.length; i++) {
            if (i == 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
    
        // Fix: Replace "*" with "<br>" only when needed
        let newResponse2 = newResponse.replace(/\*/g, "<br>");  
    
        // ✅ Fix: Split by words instead of characters
        let newResponseArray = newResponse2.split(" ");  // Split by spaces (word-wise)
    
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i] + " "; // Add space after each word
            delayPara(i, nextWord);
        }
    
        setloading(false);
        setInput("");
    };
    

    // const newChat = ()=>{
    //     setInput("");
    //     SetRecentPrompt("")
    // }

  

    const contextValue ={

        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider

