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
        deleteLayer,
        exportLayers,
        // Tools
        tool,
        // Tool Text
        text,
        setText,
        fontSize,
        setFontSize,
        fontColor,
        setFontColor,
        fontFamily,
        setFontFamily,
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

        {/* Controles para herramienta capa */}
        {tool === 'layers' && (<div>
            <h4 className="my-1 font-bold">Más opciones:</h4>
            <div className="mb-2">
                <button onClick={addLayer} className="bg-emerald-800 text-xs text-white px-4 py-2 mx-1 rounded-md">+</button>
                <button onClick={deleteLayer} className="bg-red-800 text-xs text-white px-4 py-2 mx-1 rounded-md">-</button>
                <button onClick={exportLayers} className="bg-sky-900 text-xs text-white px-4 py-2 mx-1 rounded-md">Exportar</button>
            </div>
            <div className="flex overflow-auto w-[400px] md:w-[540px] lg:w-[970px] mb-2">
                {layers.map((_, index) => (
                    <div key={index} className="flex items-center ml-2">
                        <div className="flex justify-start bg-zinc-700 rounded-md w-max h-[38px]">
                            <button onClick={() => changeLayer(index)}
                                className={`px-4 py-2 text-white 
                            ${activeLayer === index ? 'bg-blue-400 rounded-l' : ''}
                            `}>
                                <small className="text-xs">Capa {index + 1}</small>
                            </button>
                            <button onClick={() => toggleLayerVisibility(index)} className="px-2 py-2 bg-red-900 rounded-r">
                                {visibility[index] ? '🙈' : '👁'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>)}

        {/* Controles de texto */}
        {tool === 'text' && (
            <div className="mb-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Escribe aquí..."
                    className="border px-2 py-1 mr-2"
                />
                <label className="mr-2">Tamaño: {fontSize}</label>
                <input
                    type="range"
                    min="10"
                    max="50"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="mr-2"
                />
                <input
                    type="color"
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    className="mr-2"
                />
                <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="mr-2"
                >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                </select>
            </div>
        )}

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
