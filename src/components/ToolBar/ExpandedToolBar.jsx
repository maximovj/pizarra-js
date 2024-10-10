import { useCanvas } from "../../hooks/useCanvas";
import { MdOutlineLinearScale } from "react-icons/md";
import { BsTriangle, BsEraser, BsPencil, BsTextareaT, BsCircle, BsSquare, BsHeart } from "react-icons/bs";

/* 
-------------------------------------------------------------
# NOTA: 
# Este es el menú que aparece cuando isAsideOpen es true, 
# mostrando todas las herramientas en un formato más detallado.
------------------------------------------------------------
*/

const ExpandedToolBar = () => {
    const { tool, handleToolChange, setShowTooltip, showTooltip } = useCanvas();
    return (
        <div className="flex flex-col gap-y-2">
            <button className={`rounded-md p-2 w-full ${tool === 'pencil' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('pencil', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <BsPencil className="block text-2xl"></BsPencil>
                    <span>Lápiz</span>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'line' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('line', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <MdOutlineLinearScale className="block text-2xl" />
                    <span>Linea</span>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'text' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('text', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <BsTextareaT className="block text-2xl" />
                    <span>Texto</span>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'circle' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('circle', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <BsCircle className="block text-2xl" />
                    <span>Circulo</span>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'triangle' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('triangle', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <BsTriangle className="block text-2xl" />
                    <span>Triangulo</span>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'square' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('square', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <BsSquare className="block text-2xl" />
                    <span>Cuadrado</span>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'heart' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('heart', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <BsHeart className="block text-2xl" />
                    <span>Corazón</span>
                </div>
            </button>

            <button
                className={`rounded-md p-2 w-full ${tool === 'eraser' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('eraser', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <BsEraser className="block text-2xl" />
                    <span>Borrador</span>
                </div>
            </button>

        </div>
    )
}

export default ExpandedToolBar