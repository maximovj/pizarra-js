import { useCanvas } from "../../hooks/useCanvas";

/* 
-------------------------------------------------------------
# NOTA: 
# Este es el menú que aparece cuando isAsideOpen es false, 
# mostrando solo íconos y nombres en un formato más compacto.
------------------------------------------------------------
*/

const CompactToolBar = () => {
    const { tool, setTool, handleToolChange, setShowTooltip, showTooltip } = useCanvas();
    return (
        <div className="flex flex-col">
            <button className={`rounded-md p-2 w-full ${tool === 'pencil' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('pencil', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col gap-y-1">
                    <i className="block">🖊</i>
                    <small className="text-[9px]">Lápiz</small>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'line' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('line', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col gap-y-1">
                    <i className="block">🥖</i>
                    <small className="text-[9px]">Linea</small>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'text' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('text', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col gap-y-1">
                    <i className="block">🔡</i>
                    <small className="text-[9px]">Texto</small>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'circle' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('circle', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col gap-y-1">
                    <i className="block">⚽</i>
                    <small className="text-[9px]">Circulo</small>
                </div>
            </button>

            <button className={`rounded-md p-2 w-full ${tool === 'triangle' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('triangle', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col gap-y-1">
                    <i className="block">🍕</i>
                    <small className="text-[9px]">Triangulo</small>
                </div>
            </button>

            <button
                className={`rounded-md p-2 w-full ${tool === 'square' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('square', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col gap-y-1">
                    <i className="block">🔲</i>
                    <small className="text-[9px]">Cuadrado</small>
                </div>
            </button>

            <button
                className={`rounded-md p-2 w-full ${tool === 'eraser' ? 'bg-slate-500' : ''}`}
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseOver={(e) => handleToolChange('eraser', e)}
                style={{ touchAction: 'none' }}>
                <div className="flex flex-col gap-y-1">
                    <i className="block">🗑</i>
                    <small className="text-[9px]">Borrador</small>
                </div>
            </button>

            <button
                className={`rounded-md p-2 w-full ${tool === 'layers' ? 'bg-slate-500' : ''}`}
                onClick={() => setTool('layers')}>
                <div className="flex flex-col gap-y-1">
                    <i className="block">🧅</i>
                    <small className="text-[9px]">Capas</small>
                </div>
            </button>
        </div>
    )
}

export default CompactToolBar