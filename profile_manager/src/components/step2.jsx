import InputForm from "./InputForm";

export default function Step2({props}){
    const [setStep, data, setData] = props;
    const handleChange = (field)=>(value)=>{
        setData({
            ...data,
            education:{
                ...data.education,
                [field]: value,
            }
        });
    };
    const checkNull = ()=>{
        return !data.education.degree || !data.education.institution || !data.education.year;
    }
    const handleNext = ()=>{
        setStep(3);
        console.log(data);
    }
    const handlePrev =()=>{
        setStep(1);
    }
    return (
        <>
        <h1>Step 2: Education Info</h1>
        <InputForm placeholder="Degree" setField={handleChange("degree")} value={data.education.degree || ""}></InputForm>
        <InputForm placeholder="Institution" setField={handleChange("institution")} value={data.education.institution || ""}></InputForm>
        <InputForm placeholder="Year" setField={handleChange("year")} value={data.education.year || ""}></InputForm>
        <button onClick={handlePrev}>Previous</button>
        <button disabled={checkNull()} onClick={handleNext}>Next</button>
        </>
    );
}