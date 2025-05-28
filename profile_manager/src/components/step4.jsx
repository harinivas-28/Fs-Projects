import InputForm from "./InputForm";

export default function Step4({props}){
    const [setStep, data, setData] = props;
    const handleChange = (field)=>(value)=>{
        setData({
            ...data,
            [field]: value,
        });
    };
    const handleSubmit = ()=>{
        console.log(data);
    }
    const handlePrev =()=>{
        setStep(3);
    }
    return (
        <>
        <h1>Step 4: Acheivements</h1>
        <InputForm placeholder="Achievements(comma-seperated)" setField={handleChange("achievements")} value={data.achievements || ""}></InputForm>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleSubmit}>Submit</button>
        </>
    );
}