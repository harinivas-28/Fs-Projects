import InputForm from "./InputForm";

export default function Step3({props}){
    const [setStep, data, setData] = props;
    const handleChange = (field)=>(value)=>{
        setData({
            ...data,
            [field]: value,
        });
    };
    const checkNull = ()=>{
        return !data.interests;
    }
    const handleNext = ()=>{
        setStep(4);
        console.log(data);
    }
    const handlePrev =()=>{
        setStep(2);
    }
    return (
        <>
        <h1>Step 3: Interests</h1>
        <InputForm placeholder="Interesets(comma-seperated)" setField={handleChange("interests")} value={data.interests || ""}></InputForm>
        <button onClick={handlePrev}>Previous</button>
        <button disabled={checkNull()} onClick={handleNext}>Next</button>
        </>
    );
}