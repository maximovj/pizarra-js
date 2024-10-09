import { useState } from "react";
import { Outlet } from "react-router-dom";
import { CanvasProvider } from "../context/CanvasProvider";
import Header from "./Header";
import ToolBar from "./ToolBar";
import Footer from "./Footer";
import Layers from "./Layers";

const LayoutApp = () => {
    const [isAsideOpen, setIsAsideOpen] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const toggleAside = () => {
        setIsTransitioning(true); // Iniciar la animación
        setIsAsideOpen(!isAsideOpen);
    };

    const handleAnimationEnd = () => {
        setIsTransitioning(false); // Terminar la animación
    };

    return (
        <div className="min-h-screen flex flex-col">
            <CanvasProvider>
                <Header toggleAside={toggleAside} isAsideOpen={isAsideOpen} />

                <div className="flex flex-1 overflow-hidden">
                    {/* El aside se oculta/ muestra con una animación personalizada */}
                    <ToolBar handleAnimationEnd={handleAnimationEnd} isAsideOpen={isAsideOpen} isTransitioning={isTransitioning} />

                    <main className="flex-1 p-6 bg-white">
                        <Outlet />
                    </main>

                    <Layers handleAnimationEnd={handleAnimationEnd} isAsideOpen={isAsideOpen} />
                </div>

                <Footer />
            </CanvasProvider>
        </div>
    );
};

export default LayoutApp;
