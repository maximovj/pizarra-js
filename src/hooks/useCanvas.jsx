import { useContext } from "react";
import { CanvasContext } from "../context/CanvasProvider";

export const useCanvas = () => {
    return useContext(CanvasContext);
} 