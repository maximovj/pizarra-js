import { useCanvas } from "../hooks/useCanvas"

const Header = ({ toggleAside }) => {
    const { saveImage, setImageFormat, activeLayer, resizeCanvas, setResizeCanvas } = useCanvas();
    const handleToggle = () => {
        toggleAside();
        setResizeCanvas(!resizeCanvas);
    }
    return (
        <header className="flex flex-1 justify-between items-center bg-blue-500 p-4 ">
            <div className="border-0">
                <div className="flex justify-start items-center gap-x-2">
                    <button
                        className="bg-white text-blue-500 p-2 rounded"
                        onClick={handleToggle}
                    >
                        🍔
                    </button>
                    <h1 className="text-2xl text-white">Pizarra JS</h1>
                </div>
            </div>
            <div className="border-0">
                <div className=" bg-stone-800 p-2 text-sm rounded-md">
                    <div className="flex justify-start items-center gap-x-1">
                        <span className="text-white">Capa {activeLayer + 1}</span>
                        <select className="w-14 h-6 text-sm rounded-sm" onChange={(e) => setImageFormat(e.target.value)} >
                            <option value="png">PNG</option>
                            <option value="jpg">JPG</option>
                        </select>
                        <button className="text-white" onClick={saveImage}>Exportar</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header