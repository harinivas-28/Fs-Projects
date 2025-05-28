import InputForm from "./InputForm";

export default function Step1({props}){
    const [setStep, data, setData] = props;
    const handleChange = (field)=>(value)=>{
        setData({
            ...data,
            personalinfo:{
                ...data.personalinfo,
                [field]: value,
            }
        });
    };
    const handleNext = ()=>{
        setStep(2);
        console.log(data);
    }
    const checkNull = () => {
        return !data.personalinfo.name || !data.personalinfo.email || !data.personalinfo.phone;
    }
    return (
        <>
        <h1>Step 1: Personal Info</h1>
        <InputForm placeholder="Name" setField={handleChange("name")} value={data.personalinfo.name || ""}></InputForm>
        <InputForm placeholder="Email" setField={handleChange("email")} value={data.personalinfo.email || ""}></InputForm>
        <InputForm placeholder="Phone" setField={handleChange("phone")} value={data.personalinfo.phone || ""}></InputForm>
        <button disabled>Previous</button>
        <button disabled={checkNull()} onClick={handleNext}>Next</button>
        </>
    );
}