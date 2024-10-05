import { useRef, useState, useEffect } from 'react';

const Canvas = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Establecer el tamaño del canvas
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        setContext(ctx);
    }, []);

    const startDrawing = (e) => {
        context.beginPath();
        context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        context.stroke();
    };

    const stopDrawing = () => {
        context.closePath();
        setIsDrawing(false);
    };

    return (
        <div className="w-full h-full">
            <canvas
                ref={canvasRef}
                className="border border-gray-300 w-full h-screen"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
        </div>
    );
};

export default Canvas;
