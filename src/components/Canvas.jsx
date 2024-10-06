import { useRef, useState, useEffect } from 'react';

const Canvas = () => {
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

    useEffect(() => {
        if (context) {
            context.lineWidth = lineWidth;
            redrawFigures();
        }
    }, [lineWidth, context]);

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

            if (tool === 'fill') {
                fillShape(endX, endY);
            } else if (tool === 'circle') {
                drawCircle(startPosition.x, startPosition.y, endX, endY);
            } else if (tool === 'square') {
                drawSquare(startPosition.x, startPosition.y, endX, endY);
            } else if (tool === 'triangle') {
                drawTriangle(startPosition.x, startPosition.y, endX, endY);
            } else if (tool === 'text') {
                drawText(startPosition.x, startPosition.y);
            } else if (tool === 'line') {
                drawLine(startPosition.x, startPosition.y, endX, endY);
            }

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

    const drawText = (x, y) => {
        context.font = `${fontSize}px ${fontFamily}`;
        context.fillStyle = fontColor;
        context.fillText(text, x, y);

        const newFigure = {
            tool: 'text',
            x,
            y,
            text,
            fontSize,
            fontColor,
            fontFamily,
            visible: true,
        };
        setFigures([...figures, newFigure]);
    };

    const drawCircle = (startX, startY, endX, endY, isPreview = false) => {
        const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        context.strokeStyle = lineColor;
        context.fillStyle = fillColor;
        context.lineWidth = lineWidth;
        if (isPreview) context.globalAlpha = 0.5;
        context.beginPath();
        context.arc(startX, startY, radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        if (isPreview) context.globalAlpha = 1.0;
    };

    const drawSquare = (startX, startY, endX, endY, isPreview = false) => {
        const size = Math.abs(endX - startX);
        context.strokeStyle = lineColor;
        context.fillStyle = fillColor;
        context.lineWidth = lineWidth;
        if (isPreview) context.globalAlpha = 0.5;
        context.beginPath();
        context.rect(startX, startY, size, size);
        context.fill();
        context.stroke();
        if (isPreview) context.globalAlpha = 1.0;
    };

    const drawTriangle = (startX, startY, endX, endY, isPreview = false) => {
        context.strokeStyle = lineColor;
        context.fillStyle = fillColor;
        context.lineWidth = lineWidth;
        if (isPreview) context.globalAlpha = 0.5;
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.lineTo(startX - (endX - startX), endY);
        context.closePath();
        context.fill();
        context.stroke();
        if (isPreview) context.globalAlpha = 1.0;
    };

    const drawLine = (startX, startY, endX, endY, isPreview = false) => {
        context.strokeStyle = lineColor;
        context.fillStyle = fillColor;
        context.lineWidth = lineWidth;
        if (isPreview) context.globalAlpha = 0.5;
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
        if (isPreview) context.globalAlpha = 1.0;
    };

    const redrawFigures = () => {
        clearCanvas();
        figures.forEach((figure) => {
            if (figure.visible) {
                if (figure.tool === 'circle') {
                    drawCircle(figure.startX, figure.startY, figure.endX, figure.endY);
                } else if (figure.tool === 'square') {
                    drawSquare(figure.startX, figure.startY, figure.endX, figure.endY);
                } else if (figure.tool === 'triangle') {
                    drawTriangle(figure.startX, figure.startY, figure.endX, figure.endY);
                } else if (figure.tool === 'line') {
                    drawLine(figure.startX, figure.startY, figure.endX, figure.endY);
                } else if (figure.tool === 'pencil') {
                    context.strokeStyle = figure.lineColor;
                    context.lineWidth = figure.lineWidth;
                    context.beginPath();
                    figure.points.forEach((point, index) => {
                        if (index === 0) {
                            context.moveTo(point.x, point.y);
                        } else {
                            context.lineTo(point.x, point.y);
                        }
                    });
                    context.stroke();
                }
            }
        });
    };

    const handleMouseDown = (e) => {
        const { x, y } = getCoordinates(e);
        startDrawing(x, y);
    };

    const handleMouseMove = (e) => {
        draw(e);
    };

    const handleMouseUp = (e) => {
        stopDrawing(e);
    };

    const handleTouchStart = (e) => {
        const { x, y } = getCoordinates(e.touches[0]);
        startDrawing(x, y);
    };

    const handleTouchMove = (e) => {
        const { x, y } = getCoordinates(e.touches[0]);
        draw({ nativeEvent: { offsetX: x, offsetY: y } });
    };

    const handleTouchEnd = (e) => {
        stopDrawing(e);
    };

    const setToolHandler = (newTool) => {
        setTool(newTool);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const getCoordinates = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    };

    const saveImage = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = `canvas-image.${imageFormat}`;
        link.href = canvas.toDataURL(`image/${imageFormat}`);
        link.click();
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="border border-gray-400 w-full h-screen bg-white"
                style={{ touchAction: 'none' }}
            />
        </div>
    );
};

export default Canvas;
