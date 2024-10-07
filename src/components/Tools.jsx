import { useCanvas } from "../hooks/useCanvas";
import "./Tools.css";

const Tools = ({ isAsideOpen, isTransitioning, handleAnimationEnd }) => {

    const { tool, setTool } = useCanvas();

    return (
        <>
            {isAsideOpen && (<>
                <aside
                    className={`bg-zinc-700 w-44 p-4 relative text-white hidden md:block ${isAsideOpen ? 'slide-in' : 'slide-out'} ${!isAsideOpen && !isTransitioning ? 'hidden' : ''}`}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <div className="flex flex-col gap-y-2">
                        <button className={`rounded-md p-2 w-full ${tool === 'pencil' ? 'bg-slate-500' : ''}`}
                            onClick={() => setTool('pencil')}>
                            <div className="flex flex-row gap-x-2">
                                <i className="block">🖊</i>
                                <span>Lápiz</span>
                            </div>
                        </button>

                        <button className={`rounded-md p-2 w-full ${tool === 'text' ? 'bg-slate-500' : ''}`}
                            onClick={() => setTool('text')}>
                            <div className="flex flex-row gap-x-2">
                                <i className="block">🔡</i>
                                <span>Texto</span>
                            </div>
                        </button>

                        <button
                            className={`rounded-md p-2 w-full ${tool === 'eraser' ? 'bg-slate-500' : ''}`}
                            onClick={() => setTool('eraser')}>
                            <div className="flex flex-row gap-x-2">
                                <i className="block">🔲</i>
                                <span>Borrador</span>
                            </div>
                        </button>
                    </div>
                </aside>
            </>)}

            {!isAsideOpen && (<>
                <aside
                    className={` bg-zinc-700 w-20 p-4 relative text-white ${!isAsideOpen ? 'slide-in' : 'slide-out'}`}
                >
                    <div className="flex flex-col gap-y-4">
                        <button className={`rounded-md p-2 w-full ${tool === 'pencil' ? 'bg-slate-500' : ''}`}
                            onClick={() => setTool('pencil')}>
                            <div className="flex flex-col gap-y-1">
                                <i className="block">🖊</i>
                                <small className="text-[9px]">Lápiz</small>
                            </div>
                        </button>

                        <button className={`rounded-md p-2 w-full ${tool === 'text' ? 'bg-slate-500' : ''}`}
                            onClick={() => setTool('text')}>
                            <div className="flex flex-col gap-y-1">
                                <i className="block">🔡</i>
                                <span>Texto</span>
                            </div>
                        </button>

                        <button
                            className={`rounded-md p-2 w-full ${tool === 'eraser' ? 'bg-slate-500' : ''}`}
                            onClick={() => setTool('eraser')}>
                            <div className="flex flex-col gap-y-1">
                                <i className="block">🔲</i>
                                <small className="text-[9px]">Borrador</small>
                            </div>
                        </button>
                    </div>
                </aside>
            </>)}
        </>
    )
}

export default Tools