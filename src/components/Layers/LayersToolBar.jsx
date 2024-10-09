import { BsEyeFill, BsEyeSlashFill, BsFiletypeJson, BsUpload } from "react-icons/bs";
import { useCanvas } from "../../hooks/useCanvas";

/* 
-------------------------------------------------------------
# NOTA: 
# Este es el menú que aparece cuando isAsideOpen es true, 
# mostrando todas las herramientas en un formato más detallado.
------------------------------------------------------------
*/

const LayersToolBar = () => {

    const {
        layers,
        deleteLayer,
        addLayer,
        activeLayer,
        exportLayers,
        changeLayer,
        importLayers,
        toggleLayerVisibility,
        visibility
    } = useCanvas();

    return (
        <div className="flex flex-col gap-y-2 overflow-auto h-screen">
            <div className="flex gap-x-2 border-b-2 border-b-slate-600 pb-2 rounded-b-lg border-t-2 border-t-slate-600 pt-2 rounded-t-lg justify-center">
                <div className="relative flex items-center justify-center ">
                    <button onClick={addLayer} className="cursor-pointer rounded-lg text-xs text-center w-full py-[.4rem] px-[.69rem] bg-black text-white  hover:bg-gray-900 hover:border-white transition-all duration-300 ease-in-out transform hover:scale-105">
                        +
                    </button>
                </div>
                <div className="relative flex items-center justify-center ">
                    <button onClick={deleteLayer} className="cursor-pointer rounded-lg text-xs text-center w-full py-[.4rem] px-[.79rem] bg-black text-white  hover:bg-gray-900 hover:border-white transition-all duration-300 ease-in-out transform hover:scale-105">
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
                        className="cursor-pointer text-xs text-center rounded-lg w-full py-2 px-2 bg-zinc-300 text-black hover:bg-gray-900 hover:border-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-white"

                    >
                        <BsUpload />
                    </label>
                </div>
                <div className="relative flex items-center justify-center">
                    <label
                        onClick={exportLayers}
                        className="cursor-pointer text-xs text-center rounded-lg w-full py-2 px-2 bg-zinc-300 text-black hover:bg-gray-900 hover:border-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-white"

                    >
                        <BsFiletypeJson />
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-center">
                {layers.map((x, index) =>
                    <div key={index}>
                        <div onClick={() => changeLayer(index)} className={`border-2 ${index === activeLayer ? "border-green-500" : "border-gray-100"} rounded-md w-32 text-center p-4 ${index === activeLayer ? "bg-sky-700" : "bg-sky-400"} hover:bg-sky-500 hover:cursor-pointer`}>
                            <small className={`${index === activeLayer ? "text-white" : "text-black"}`}>Capa {index + 1}</small>
                        </div>
                        <small className="block cursor-pointer mt-1 rounded-sm w-max px-1 text-center bg-red-800" onClick={() => toggleLayerVisibility(index)}>
                            {visibility[index] ?
                                (<><BsEyeSlashFill className="inline"></BsEyeSlashFill><small>&nbsp;Ocultar</small> </>) :
                                (<><BsEyeFill className="inline"></BsEyeFill><small>&nbsp;Mostrar</small> </>)
                            }
                        </small>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LayersToolBar