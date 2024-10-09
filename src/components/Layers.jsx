import "./Layers.css";
import LayersToolBar from "./Layers/LayersToolBar";

const Layers = ({ handleAnimationEnd, isAsideOpen }) => {
    return (
        <>
            {!isAsideOpen && (<>
                <aside
                    className={`bg-zinc-700 w-44 p-4 relative text-white md:block ${!isAsideOpen ? 'slide-in-layers' : 'slide-out-layers'}`}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <LayersToolBar />
                </aside>
            </>)}
        </>
    )
}

export default Layers