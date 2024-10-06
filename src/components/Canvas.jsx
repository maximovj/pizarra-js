import { useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';

const Canvas = () => {
    const {
        canvasRef,
        startDrawing,
        draw,
        stopDrawing,
        inputDevice,
        activeLayer,
        layers,
        changeLayer,
        toggleLayerVisibility,
        visibility,
        addLayer,
        exportLayers,
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
        <button onClick={addLayer} className="px-4 py-2 mx-1">Agregar Capa</button>
        <button onClick={exportLayers} className="px-4 py-2 mx-1">Exportar Capa</button>
        <div className="flex mb-2 overflow-auto w-[400px] md:w-[540px] lg:w-[970px]">
            {layers.map((_, index) => (
                <div key={index} className="flex items-center ml-2">
                    <div className="flex justify-start bg-zinc-700 rounded-md w-[118px] h-[38px]">
                        <button onClick={() => changeLayer(index)}
                            className={`px-4 py-2 text-white 
                            ${activeLayer === index ? 'bg-blue-400 rounded-l' : ''}
                            `}>
                            Capa {index + 1}
                        </button>
                        <button onClick={() => toggleLayerVisibility(index)} className="px-2 py-2 bg-red-900 rounded-r">
                            {visibility[index] ? '🙈' : '👁'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
        <div className="flex flex-1 justify-between">
            <span className="mr-2">
                {inputDevice === 'touch' ? '📱 Modo: táctil' : '💻 Modo: cursor'}
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
