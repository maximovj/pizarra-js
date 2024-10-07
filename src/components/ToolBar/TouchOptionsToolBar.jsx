import { useCanvas } from "../../hooks/useCanvas";

/* 
-------------------------------------------------------------
# NOTA: 
# Este es el menú que aparece para dispositivos táctiles (cuando inputDevice === 'touch'), 
# que incluye controles para herramientas como capas, texto y formas.
------------------------------------------------------------
*/

const TouchOptionsToolBar = () => {

    const {
        // Tools
        tool,
        // Input device
        inputDevice,
        // Tool layers
        activeLayer,
        layers,
        changeLayer,
        toggleLayerVisibility,
        visibility,
        addLayer,
        deleteLayer,
        exportLayers,
        // Tool Text
        text,
        setText,
        fontSize,
        setFontSize,
        fontColor,
        setFontColor,
        fontFamily,
        setFontFamily,
        // Tool Circle
        lineWidth,
        setLineWidth,
        lineColor,
        setLineColor,
        fillColor,
        setFillColor,
    } = useCanvas();

    return (
        <>
            {inputDevice === 'touch' && (
                <div className="bg-zinc-700 p-2 rounded-sm mb-4">
                    {/* Controles para herramienta capa */}
                    <h4 className="my-2 font-bold text-white">Más opciones:</h4>
                    {tool === 'layers' && (<div>
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
                            <label className="mr-2 text-white text-sm">Ingresar texto:</label>
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Escribe el texto aquí..."
                                className="border px-2 py-1 mr-2"
                            />
                            <label className="mr-2 text-white text-sm">Tamaño: {fontSize}</label>
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

                    {/* Controles de figuras circulo, triangulo, cuadrado */}
                    {(tool === 'circle' || tool === 'triangle' || tool === 'square') && (
                        <div className="mb-2">
                            <div className="flex mb-2">
                                <div className="flex items-center mb-2">
                                    <label className="mr-2 text-white text-sm">Grosor: {lineWidth}</label>
                                    <input type="range" min="1" max="60" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} className="w-1/2" />
                                </div>
                                <div className="flex items-center mr-4">
                                    <label className="mr-2 text-white text-sm">Color de línea:</label>
                                    <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} />
                                </div>
                                <div className="flex items-center">
                                    <label className="mr-2 text-white text-sm">Color de fondo:</label>
                                    <input type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Controles de herramienta lápiz y linea */}
                    {(tool === 'pencil' || tool === 'line') && (
                        <div className="mb-2">
                            <div className="flex mb-2">
                                <div className="flex items-center mb-2">
                                    <label className="mr-2 text-white text-sm">Grosor: {lineWidth}</label>
                                    <input type="range" min="1" max="60" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} className="w-1/2" />
                                </div>
                                <div className="flex items-center mr-4">
                                    <label className="mr-2 text-white text-sm">Color de línea:</label>
                                    <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Controles de herramienta borrador */}
                    {(tool === 'eraser') && (
                        <div className="mb-2">
                            <div className="flex mb-2">
                                <div className="flex items-center mb-2">
                                    <label className="mr-2 text-white text-sm">Grosor: {lineWidth}</label>
                                    <input type="range" min="1" max="60" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} className="w-1/2" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>)}
        </>
    )
}

export default TouchOptionsToolBar