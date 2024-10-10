import { useCanvas } from "../../hooks/useCanvas";
import { MdOutlineLinearScale } from "react-icons/md";
import { BsTriangle, BsEraser, BsPencil, BsLayers, BsTextareaT, BsCircle, BsSquare, BsHeart } from "react-icons/bs";

/* 
-------------------------------------------------------------
# NOTA: 
# Este es el menú que aparece cuando isAsideOpen es false, 
# mostrando solo íconos y nombres en un formato más compacto.
------------------------------------------------------------
*/

const CompactToolBar = () => {
    const { tool, setTool, handleToolChange, setShowTooltip, showTooltip, inputDevice } = useCanvas();
    return (
        <div className="flex flex-col">
            {inputDevice === 'touch' && (
                <button
                    className={`rounded-md p-2 w-full ${tool === 'layers' ? 'bg-slate-500' : ''}`}
                    onClick={() => setTool('layers')}>
                    <div className="flex flex-col items-center gap-y-1">
                        <BsLayers className="block text-xl" />
                        <small className="text-[9px]">Capas</small>
                    </div>
                </button>
            )}

            <button className={`rounded-md p-2 w-full ${tool === 'pencil' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('pencil', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col items-center gap-y-1">
                    <BsPencil className="block text-xl" />
                    <small className="text-[9px]">Lápiz</small>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'line' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('line', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col items-center gap-y-1">
                    <MdOutlineLinearScale className="block text-xl" />
                    <small className="text-[9px]">Linea</small>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'text' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('text', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col items-center gap-y-1">
                    <BsTextareaT className="block text-xl" />
                    <small className="text-[9px]">Texto</small>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'circle' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('circle', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col items-center gap-y-1">
                    <BsCircle className="block text-xl" />
                    <small className="text-[9px]">Circulo</small>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'triangle' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('triangle', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col items-center gap-y-1">
                    <BsTriangle className="block text-xl" />
                    <small className="text-[9px]">Triangulo</small>
                </div>
            </button>

            <button
                className={`rounded-md p-2 w-full ${tool === 'square' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('square', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col items-center gap-y-1">
                    <BsSquare className="block text-xl" />
                    <small className="text-[9px]">Cuadrado</small>
                </div>
            </button>

            <button
                className={`rounded-md p-2 w-full ${tool === 'heart' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('heart', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col items-center gap-y-1">
                    <BsHeart className="block text-xl" />
                    <small className="text-[9px]">Corazón</small>
                </div>
            </button>

            <button
                className={`rounded-md p-2 w-full ${tool === 'eraser' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('eraser', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col items-center gap-y-1">
                    <BsEraser className="block text-xl" />
                    <small className="text-[9px]">Borrador</small>
                </div>
            </button>

        </div>
    )
}

export default CompactToolBar