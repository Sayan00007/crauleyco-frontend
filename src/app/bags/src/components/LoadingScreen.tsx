import { useEffect, useState } from "react";

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Check if document is already loaded
        const handleLoad = () => {
            setTimeout(() => {
                setIsFading(true);
                setTimeout(() => setIsLoading(false), 500);
            }, 1500); // Minimum 1.5s display
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            // Fallback timeout in case 'load' never fires for some reason
            setTimeout(handleLoad, 3000);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    if (!isLoading) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] text-white transition-opacity duration-500 ease-in-out ${isFading ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
        >
            <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6 drop-shadow-lg">
                    Crauley<span className="text-orange-500">Co.</span>
                </span>

                {/* Modern progressive loading bar */}
                <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full animate-[progress_1.5s_ease-in-out_infinite] w-full origin-left"
                        style={{ animation: 'progress 1.5s ease-in-out infinite' }}>
                        <style>
                            {`
                @keyframes progress {
                  0% { transform: translateX(-100%); }
                  50% { transform: translateX(0); }
                  100% { transform: translateX(100%); }
                }
              `}
                        </style>
                    </div>
                </div>
                <span className="mt-4 text-xs font-mono tracking-widest text-zinc-500 uppercase">
                    Loading Experience
                </span>
            </div>
        </div>
    );
}
