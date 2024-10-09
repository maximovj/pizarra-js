import { useCanvas } from "../../hooks/useCanvas";

/* 
-------------------------------------------------------------
# NOTA: 
# Este es el menú que aparece cuando isAsideOpen es true, 
# mostrando todas las herramientas en un formato más detallado.
------------------------------------------------------------
*/

const ExpandedToolBar = () => {
    const { tool, setTool, handleToolChange, setShowTooltip, showTooltip } = useCanvas();
    return (
        <div className="flex flex-col gap-y-2">
            <button className={`rounded-md p-2 w-full ${tool === 'pencil' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('pencil', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <i className="block">🖊</i>
                    <span>Lápiz</span>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'line' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('line', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <i className="block">🥖</i>
                    <span>Linea</span>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'text' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('text', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <i className="block">🔡</i>
                    <span>Texto</span>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'circle' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('circle', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <i className="block">⚽</i>
                    <span>Circulo</span>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'triangle' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('triangle', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <i className="block">🍕</i>
                    <span>Triangulo</span>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'square' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('square', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <i className="block">🔲</i>
                    <span>Cuadrado</span>
                </div>
            </button>

            <button
                className={`rounded-md p-2 w-full ${tool === 'eraser' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('eraser', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-row gap-x-2">
                    <i className="block">🗑</i>
                    <span>Borrador</span>
                </div>
            </button>

        </div>
    )
}

export default ExpandedToolBar