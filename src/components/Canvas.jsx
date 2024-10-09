import { useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import TouchOptionsToolBar from './ToolBar/TouchOptionsToolBar';
import MouseOptionsToolBar from './ToolBar/MouseOptionsToolBar';
import { BsFillLaptopFill, BsFillPhoneFill } from 'react-icons/bs';

const Canvas = () => {
    const {
        // Canvas
        canvasRef,
        startDrawing,
        draw,
        stopDrawing,
        // Input device
        inputDevice
    } = useCanvas();

    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        const { x, y } = getCoordinates(e);
        startDrawing(x, y);
    };

    const handleMouseMove = (e) => {
        draw(e);
        const { x, y } = getCoordinates(e);
        setCoordinates({ x, y });
    };

    const handleMouseUp = (e) => {
        stopDrawing(e);
    };

    const getCoordinates = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    };

    const handleTouchStart = (e) => {
        const { x, y } = getCoordinates(e.touches[0]);
        startDrawing(x, y);
    };

    const handleTouchMove = (e) => {
        const { x, y } = getCoordinates(e.touches[0]);
        draw({ nativeEvent: { offsetX: x, offsetY: y } });
        setCoordinates({ x, y });
    };

    const handleTouchEnd = (e) => {
        stopDrawing(e);
    };

    return (<div>

        {/* Cuadro de herramientas avanzadas */}
        {/* en dispositivo de touch / táctil */}
        <TouchOptionsToolBar />

        {/* Tooltip flotante para herramientas avanzadas */}
        {/* en dispositivo de cursos mouse */}
        <MouseOptionsToolBar />

        <div className="flex flex-1 justify-between">
            <span className="mr-2">
                {inputDevice === 'touch' ?
                    (<><BsFillPhoneFill className="inline text-slate-600 opacity-30" />&nbsp;<span className="text-xs ">Modo: táctil</span></>) :
                    (<><BsFillLaptopFill className="inline text-slate-600 opacity-30" />&nbsp;<span className="text-xs ">Modo: cursor</span></>)
                }
            </span>
            <span>
                Coordenadas: ({coordinates.x.toFixed(0)}, {coordinates.y.toFixed(0)})
            </span>
        </div>
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="border border-gray-400 w-full h-screen bg-white"
            style={{ touchAction: 'none' }}
        />
    </div>
    );
};

export default Canvas;
