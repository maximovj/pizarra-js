import { useCanvas } from "../../hooks/useCanvas";

/* 
-------------------------------------------------------------
# NOTA: 
# Este es el menú que aparece cuando isAsideOpen es true, 
# mostrando todas las herramientas en un formato más detallado.
------------------------------------------------------------
*/

const LayersToolBar = () => {
    const { layers, addLayer, activeLayer, exportLayers, changeLayer, toggleLayerVisibility, visibility } = useCanvas();
    return (
        <div className="flex flex-col gap-y-2 overflow-auto h-screen">
            <button onClick={exportLayers} className="bg-black">
                Exportar
            </button>
            <button onClick={addLayer} className="bg-black">
                +
            </button>
            <div className="flex flex-col gap-4 items-center">
                {layers.map((x, index) =>
                    <div key={index}>
                        <div onClick={() => changeLayer(index)} className={`border-2 ${index === activeLayer ? "border-green-500" : "border-gray-100"} rounded-md w-32 text-center p-4 ${index === activeLayer ? "bg-sky-700" : "bg-sky-400"} hover:bg-sky-500 hover:cursor-pointer`}>
                            <small className={`${index === activeLayer ? "text-white" : "text-black"}`}>Capa {index + 1}</small>
                        </div>
                        <small className="block cursor-pointer mt-2" onClick={() => toggleLayerVisibility(index)}>
                            {visibility[index] ? '🙈 Ocultar' : '🐵 Mostrar'}
                        </small>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LayersToolBar