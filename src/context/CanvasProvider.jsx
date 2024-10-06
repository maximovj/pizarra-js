import { useRef, useState, useEffect, createContext } from 'react';

export const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState(null);
    const [tool, setTool] = useState('pencil');
    const [startPosition, setStartPosition] = useState(null);
    const [lineWidth, setLineWidth] = useState(3);
    const [figures, setFigures] = useState([]);
    const [lineColor, setLineColor] = useState('#000000');
    const [fillColor, setFillColor] = useState('#ffffff');
    const [previewPosition, setPreviewPosition] = useState(null);
    const [imageFormat, setImageFormat] = useState('png');
    const [inputDevice, setInputDevice] = useState('mouse');
    const [text, setText] = useState('');
    const [fontSize, setFontSize] = useState(20);
    const [fontColor, setFontColor] = useState('#000000');
    const [fontFamily, setFontFamily] = useState('Arial');

    useEffect(() => {
        const isTouchDevice = () => {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        };

        setInputDevice(isTouchDevice() ? 'touch' : 'mouse');
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        setContext(ctx);
    }, []);

    const startDrawing = (x, y) => {
        context.beginPath();
        context.moveTo(x, y);
        setIsDrawing(true);
        setStartPosition({ x, y });
    };

    const draw = (e) => {
        if (!isDrawing && !startPosition) return;

        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        context.lineWidth = lineWidth;

        if (tool === 'pencil') {
            context.strokeStyle = lineColor;
            context.lineTo(x, y);
            context.stroke();

            const newFigure = {
                tool: 'pencil',
                points: [{ x: startPosition.x, y: startPosition.y }, { x, y }],
                lineColor,
                lineWidth,
                visible: true,
            };
            setFigures([...figures, newFigure]);
            setStartPosition({ x, y });
        } else if (tool === 'eraser') {
            context.strokeStyle = 'white';
            context.lineTo(x, y);
            context.stroke();
        } else if (startPosition) {
            setPreviewPosition({ x, y });
        }
    };

    const stopDrawing = (e) => {
        if (startPosition) {
            const endX = e.nativeEvent.offsetX;
            const endY = e.nativeEvent.offsetY;

            if (tool !== 'pencil') {
                const figure = {
                    tool,
                    startX: startPosition.x,
                    startY: startPosition.y,
                    endX,
                    endY,
                    lineColor,
                    fillColor,
                    lineWidth,
                    visible: true,
                };
                setFigures([...figures, figure]);
            }
        }

        context.closePath();
        setIsDrawing(false);
        setStartPosition(null);
        setPreviewPosition(null);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const saveImage = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = `canvas-image.${imageFormat}`;
        link.href = canvas.toDataURL(`image/${imageFormat}`);
        link.click();
    };

    const value = {
        canvasRef,
        isDrawing,
        context,
        tool,
        setTool,
        lineWidth,
        setLineWidth,
        lineColor,
        setLineColor,
        fillColor,
        setFillColor,
        figures,
        setFigures,
        startDrawing,
        draw,
        stopDrawing,
        clearCanvas,
        imageFormat,
        setImageFormat,
        saveImage,
    };

    return (
        <CanvasContext.Provider value={value}>
            {children}
        </CanvasContext.Provider>
    )
}
