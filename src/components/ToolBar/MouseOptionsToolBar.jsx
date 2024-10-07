import { useCanvas } from "../../hooks/useCanvas";

/* 
-------------------------------------------------------------
# NOTA: 
# Este es el menú que aparece para dispositivos con mouse (cuando showTooltip && inputDevice === 'mouse'), 
# que muestra controles adicionales basados en la herramienta seleccionada.
------------------------------------------------------------
*/

const MouseOptionsToolBar = () => {

    const {
        // Tools
        tool,
        // Input device
        inputDevice,
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
        // Tooltip 
        tooltipPosition,
        showTooltip,
        setShowTooltip,
    } = useCanvas();

    return (
        <>
            {(showTooltip && inputDevice === 'mouse') && (
                <div
                    onMouseLeave={() => setShowTooltip(false)}
                    className="absolute bg-zinc-800 p-3 rounded-e-lg rounded-bl-lg shadow-lg text-white z-50"
                    style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
                >
                    {/* Controles de grosor y colores */}
                    <div className="mb-2">
                        <div className="flex items-center mb-2">
                            <label className="mr-2 text-sm font-bold">Herramienta: {tool}</label>
                        </div>
                        {(tool === "pencil" || tool === "line" || tool === "triangle" || tool === "square" || tool === "circle" || tool === "eraser") && (<>
                            <div className="flex items-center mb-2">
                                <label className="mr-2 text-sm">Grosor: {lineWidth}</label>
                                <input
                                    type="range"
                                    value={lineWidth}
                                    onChange={(e) => setLineWidth(e.target.value)}
                                    className="w-1/2"
                                />
                            </div>
                        </>)}

                        {(tool === "text") && (<>
                            <div className="flex items-center mb-2">
                                <label className="mr-2 text-sm">Texto: </label>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Escribe el texto aquí..."
                                    onFocus={true}
                                    className="w-full text-black py-1 px-2 rounded-md text-xs"
                                />
                            </div>
                            <div className="flex items-center mb-2">
                                <label className="mr-2 text-sm">Tamaño:</label>
                                <input
                                    type="number"
                                    min="10"
                                    max="50"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(e.target.value)}
                                    className="w-full text-black py-1 px-2 rounded-md text-xs"
                                />
                            </div>
                            <div className="flex items-center mb-2">
                                <label className="mr-2 text-sm">Color:</label>
                                <input
                                    type="color"
                                    value={fontColor}
                                    onChange={(e) => setFontColor(e.target.value)}
                                    className="text-black text-xs"
                                />
                            </div>
                            <div className="flex items-center mb-2">
                                <label className="mr-2 text-sm">Fuente:</label>
                                <select
                                    value={fontFamily}
                                    onChange={(e) => setFontFamily(e.target.value)}
                                    className="text-black py-1 px-2 rounded-md text-xs"
                                >
                                    <option value="Arial">Arial</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Courier New">Courier New</option>
                                </select>
                            </div>
                        </>)}

                        {(tool === "pencil" || tool === "line" || tool === "triangle" || tool === "square" || tool === "circle") && (<>
                            <div className="flex items-center mb-2">
                                <label className="mr-2 text-sm">Color de línea:</label>
                                <input
                                    type="color"
                                    value={lineColor}
                                    onChange={(e) => setLineColor(e.target.value)}
                                />
                            </div>
                        </>)}
                        {(tool === "triangle" || tool === "square" || tool === "circle") && (<>
                            <div className="flex items-center">
                                <label className="mr-2 text-sm">Color de fondo:</label>
                                <input
                                    type="color"
                                    value={fillColor}
                                    onChange={(e) => setFillColor(e.target.value)}
                                />
                            </div>
                        </>)}
                    </div>
                </div>
            )}
        </>
    )
}

export default MouseOptionsToolBar