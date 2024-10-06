import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./LayoutApp.css";
import { CanvasProvider } from "../context/CanvasProvider";

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
                <header className="bg-blue-500 p-4 text-white">
                    <div className="flex justify-start items-center gap-x-2">
                        <button
                            className="bg-white text-blue-500 p-2 rounded"
                            onClick={toggleAside}
                        >
                            🍔
                        </button>
                        <h1 className="text-2xl">Pizarra JS</h1>
                    </div>
                </header>

                <div className="flex flex-1 overflow-hidden">
                    {/* El aside se oculta/ muestra con una animación personalizada */}
                    {isAsideOpen && (<>
                        <aside
                            className={`bg-zinc-700 w-44 p-4 relative text-white hidden md:block ${isAsideOpen ? 'slide-in' : 'slide-out'} ${!isAsideOpen && !isTransitioning ? 'hidden' : ''}`}
                            onAnimationEnd={handleAnimationEnd}
                        >
                            <nav>
                                <ul className="flex flex-col gap-8">
                                    <li>🖊 Lápiz</li>
                                    <li>🔲 Borrador</li>
                                </ul>
                            </nav>
                        </aside>
                    </>)}

                    {!isAsideOpen && (<>
                        <aside
                            className={` bg-zinc-700 w-20 p-4 relative text-white ${!isAsideOpen ? 'slide-in' : 'slide-out'}`}
                        >
                            <nav>
                                <ul className="flex flex-col items-center gap-8">
                                    <li className="text-center">
                                        <i className="block">🖊</i>
                                        <small>Lápiz</small>
                                    </li>
                                    <li className="text-center">
                                        <i className="block">🔲</i>
                                        <small>Borrador</small>
                                    </li>
                                </ul>
                            </nav>
                        </aside>
                    </>)}

                    <main className="flex-1 p-6 bg-white">
                        <Outlet />
                    </main>
                </div>

                <footer className="bg-blue-500 p-4 text-white text-center mt-auto">
                    <p>Dev by: Víctor J.</p>
                </footer>
            </CanvasProvider>
        </div>
    );
};

export default LayoutApp;
