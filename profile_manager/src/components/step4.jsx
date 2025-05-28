import InputForm from "./InputForm";
import { useState } from "react";
import axios from "axios";

export default function Step4({ props }) {
    const [setStep, data, setData] = props;
    const [response, setResponse] = useState(null);
    const handleChange = (field) => (value) => {
        setData({
            ...data,
            [field]: value,
        });
    };
    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:5000/profile", data);
            setResponse(res.data?.message || "Profile submitted successfully!");
        } catch (err) {
            console.log("Error Occured: " + err);
            setResponse("Error occurred while submitting profile.");
        }
        setTimeout(() => {
            setResponse(null);
        }, 3000);
    };
    const handlePrev = () => {
        setStep(3);
    };
    return (
        <>
            <h1>Step 4: Acheivements</h1>
            <InputForm placeholder="Achievements(comma-seperated)" setField={handleChange("achievements")} value={data.achievements || ""}></InputForm>
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handleSubmit}>Submit</button>
            <p>{response}</p>
        </>
    );
}