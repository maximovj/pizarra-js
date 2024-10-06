import { useRef, useState, useEffect } from 'react';

const Canvas = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState(null);

    const updateCanvasSize = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = window.innerWidth;
        const height = window.innerHeight * 0.6;

        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        setContext(ctx);
    };

    useEffect(() => {
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    const startDrawing = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) * window.devicePixelRatio;
        const y = (e.clientY - rect.top) * window.devicePixelRatio;

        context.beginPath();
        context.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) * window.devicePixelRatio;
        const y = (e.clientY - rect.top) * window.devicePixelRatio;

        context.lineWidth = 2;
        context.strokeStyle = '#000';
        context.lineTo(x, y);
        context.stroke();
    };

    const stopDrawing = () => {
        context.closePath();
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                className="border border-gray-400 w-full h-auto"
            />
            <div>
                <button onClick={clearCanvas}>Limpiar Canvas</button>
            </div>
        </div>
    );
};

export default Canvas;
