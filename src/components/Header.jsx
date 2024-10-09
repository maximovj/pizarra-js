import { BsAppIndicator, BsFillGridFill } from "react-icons/bs";
import { useCanvas } from "../hooks/useCanvas"

const Header = ({ toggleAside, isAsideOpen }) => {
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
                        {!isAsideOpen ? (<BsFillGridFill></BsFillGridFill>) : (<BsAppIndicator></BsAppIndicator>)}
                    </button>
                    <h1 className="text-sm font-bold sm:text-2xl md:text-2xl text-white">Pizarra JS</h1>
                </div>
            </div>
            <div className="border-0">
                <div className=" bg-stone-800 p-2 text-sm rounded-md">
                    <div className="flex justify-start items-center gap-x-1">
                        <span className="text-white font-bold text-base">Capa {activeLayer + 1}</span>
                        <div className="bg-slate-300 opacity-20 rounded-lg w-[0.1rem] h-[14px]"></div>
                        <button className="text-white text-xs" onClick={saveImage}>Exportar</button>
                        <select className="w-14 h-6 text-sm rounded-sm" onChange={(e) => setImageFormat(e.target.value)} >
                            <option value="png">PNG</option>
                            <option value="jpg">JPG</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header