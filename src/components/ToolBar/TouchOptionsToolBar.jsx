import { BsEyeFill, BsEyeSlashFill, BsFiletypeJson, BsUpload } from "react-icons/bs";
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
        importLayers,
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
        // Tool eraser 
        sizeEraser,
        setSizeEraser,
    } = useCanvas();

    return (
        <>
            {inputDevice === 'touch' && (
                <div className="bg-zinc-700 p-2 sm:p-4 rounded-lg mb-4 w-full" style={{ width: 'calc(100vw - 60px)' }}>
                    {/* Controles para herramienta capa */}
                    <h4 className="my-2 font-bold text-white">Más opciones:</h4>
                    {tool === 'layers' && (<div className="w-full">
                        <div className="flex gap-x-2 border-b-2 border-b-slate-600 pb-2 rounded-b-lg border-t-2 border-t-slate-600 pt-2 rounded-t-lg justify-start mb-2" >
                            <div className="relative flex items-center justify-center ml-2">
                                <button onClick={addLayer} className="cursor-pointer rounded-lg text-xs text-center w-full py-1 px-2 bg-black text-white  hover:bg-gray-900 hover:border-white transition-all duration-300 ease-in-out transform hover:scale-105">
                                    +
                                </button>
                            </div>
                            <div className="relative flex items-center justify-center ">
                                <button onClick={deleteLayer} className="cursor-pointer rounded-lg text-xs text-center w-full py-1 px-3 bg-black text-white  hover:bg-gray-900 hover:border-white transition-all duration-300 ease-in-out transform hover:scale-105">
                                    -
                                </button>
                            </div>
                            <div className="relative flex items-center justify-center ">
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={importLayers}
                                    id="fileInput"
                                    className="sr-only"
                                />
                                <label
                                    htmlFor="fileInput"
                                    className="cursor-pointer text-xs text-center rounded-lg w-full py-[0.36rem] px-[0.36rem] bg-zinc-300 text-white  hover:bg-gray-900 hover:border-white transition-all duration-300 ease-in-out transform hover:scale-105"

                                >
                                    <BsUpload />
                                </label>
                            </div>
                            <div className="relative flex items-center justify-center">
                                <label
                                    onClick={exportLayers}
                                    className="cursor-pointer text-xs text-center rounded-lg w-full py-[0.36rem] px-[0.36rem] bg-zinc-300 text-white  hover:bg-gray-900 hover:border-white transition-all duration-300 ease-in-out transform hover:scale-105"

                                >
                                    <BsFiletypeJson />
                                </label>
                            </div>
                        </div>
                        <div className="flex overflow-auto mb-2 w-full" >
                            {layers.map((_, index) => (
                                <div key={index} className="flex items-center">
                                    <div onClick={() => changeLayer(index)} className={`flex justify-start rounded-md w-max h-[38px]
                                        border-2 mr-2
                                        ${index === activeLayer ? "bg-sky-400" : "bg-sky-700"}
                                        ${index === activeLayer ? "border-green-500" : "border-gray-100"}
                                        hover:bg-sky-500 hover:cursor-pointer
                                    `}>
                                        <button onClick={() => changeLayer(index)}
                                            className={`px-4 py-2 text-white  text-center`}>
                                            <small className={`${index === activeLayer ? "text-white" : "text-black"}`}>Capa {index + 1}</small>
                                        </button>
                                        <button onClick={() => toggleLayerVisibility(index)} className="px-2 py-2 bg-red-800 rounded-r flex items-center justify-center">
                                            {visibility[index] ?
                                                (<><BsEyeSlashFill className="inline text-white"></BsEyeSlashFill></>) :
                                                (<><BsEyeFill className="inline text-white"></BsEyeFill></>)
                                            }
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
                                    <label className="mr-2 text-white text-sm">Grosor: {sizeEraser}</label>
                                    <input type="range" min="1" max="60" value={sizeEraser} onChange={(e) => setSizeEraser(e.target.value)} className="w-1/2" />
                                </div>
                            </div>
                        </div>
                    )}
                </div >)
            }
        </>
    )
}

export default TouchOptionsToolBar