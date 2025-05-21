import { lazy, Suspense, useState } from "react"
import { SyncLoader } from "react-spinners";

const LazyComp = lazy(() =>
    Promise.resolve({
        default: () => {
            const [hovered, setHovered] = useState(false);
            return (
                <div
                    style={{
                        position: "relative",
                        display: "inline-block",
                        height: 400,
                        width: 400,
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <img
                        src="https://wallpaperaccess.com/full/9819719.jpg"
                        alt="Lazy loaded"
                        style={{ height: 400, width: 400, display: "block" }}
                    />
                    {hovered && (
                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                background: "rgba(0,0,0,0.6)",
                                color: "#fff",
                                textAlign: "center",
                                padding: "10px 0",
                                fontSize: "1.2rem",
                            }}
                        >
                            Seol In-Ah
                        </div>
                    )}
                </div>
            );
        }
    })
);

export default function LazyAndSuspense(){
    return (
        <>
        <h1>17. Lazy Loading and Suspense</h1>
        <Suspense fallback={<SyncLoader color="white" />}>
            <LazyComp />
        </Suspense>
        <p>Try Reloading Page, you might see Loader</p>
        </>
    );
}