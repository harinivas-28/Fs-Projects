import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle(){
    const {theme, toggleTheme} = useTheme();
    return (
        <button onClick={toggleTheme}>
            Switch to {theme==="light"?"🌙 Dark Theme":"🌞 Light Theme"}
        </button>
    );
}