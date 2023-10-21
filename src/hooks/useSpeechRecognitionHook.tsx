"use client";

import React from "react";
import QueryContext from "@/context/QueryContext/QueryContext";

let recognition: any = null;
if(typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
}

const useSpeechRecognition = () => {
    const [isListening, setIsListening] = React.useState(false);
    const queryContext = React.useContext(QueryContext);

    const speechRecognitionInit = () => {
        if(!recognition) { 
            setIsListening(false);
            return;
        }

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            stopListening(); // stop recording 
            const transcript = event.results[0][0].transcript;
            queryContext.setSpeechText(transcript); // set context speech text and close drawer
        };
    }

    React.useEffect(() => {
        speechRecognitionInit();
    }, [])

    const startListening = () => {
        setIsListening(true);
        recognition.start();
    }

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    }

    return {
        isListening,
        startListening,
        hasRecognitionSupport: !!recognition,
    }
};

export default useSpeechRecognition;