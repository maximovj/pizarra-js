import CompactToolBar from "./CompactToolBar";
import ExpandedToolBar from "./ExpandedToolBar";
import "./ToolBar.css";

const ToolBar = ({ isAsideOpen, isTransitioning, handleAnimationEnd }) => {
    return (
        <>
            {isAsideOpen && (<>
                <aside
                    className={`bg-zinc-700 w-44 p-4 relative text-white hidden md:block ${isAsideOpen ? 'slide-in' : 'slide-out'} ${!isAsideOpen && !isTransitioning ? 'hidden' : ''}`}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <ExpandedToolBar />
                </aside>
            </>)}

            {!isAsideOpen && (<>
                <aside
                    className={` bg-zinc-700 w-20 p-4 relative text-white ${!isAsideOpen ? 'slide-in' : 'slide-out'}`}
                >
                    <CompactToolBar />
                </aside>
            </>)}
        </>
    )
}

export default ToolBar