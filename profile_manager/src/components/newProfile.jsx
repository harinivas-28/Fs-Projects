import { useState } from "react";
import Step1 from "./step1";
import Step2 from "./Step2";
import Step3 from "./step3";
import Step4 from "./step4";

export default function NewProfile(){
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        personalinfo:{},
        education:{},
    });
    return (
        <>
        {step===1 && <Step1 props={[setStep, data, setData]}></Step1>}
        {step==2 && <Step2 props={[setStep, data, setData]}></Step2>}
        {step===3 && <Step3 props={[setStep, data, setData]}></Step3>}
        {step===4 && <Step4 props={[setStep, data, setData]}></Step4>}
        </>
    );
}