export default function InputForm({placeholder, setField, value}){
    return (
        <input required placeholder={placeholder} value={value} onChange={e => setField(e.target.value)}></input>
    );
}   