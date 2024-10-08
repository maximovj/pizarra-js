import "./Layers.css";
import LayersToolBar from "./Layers/LayersToolBar";

const Layers = ({ handleAnimationEnd }) => {
    return (
        <>
            {(<>
                <aside
                    className={`bg-zinc-700 w-44 p-4 relative text-white hidden md:block slide-in-layers`}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <LayersToolBar />
                </aside>
            </>)}
        </>
    )
}

export default Layers