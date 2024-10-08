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
    const [pencil, setPencil] = useState(null);

    // Tool Text
    const [text, setText] = useState('');
    const [fontSize, setFontSize] = useState(20);
    const [fontColor, setFontColor] = useState('#000000');
    const [fontFamily, setFontFamily] = useState('Arial');

    // Estados para capas
    const [layers, setLayers] = useState([[]]);
    const [visibility, setVisibility] = useState([true]);
    const [activeLayer, setActiveLayer] = useState(0);

    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    const handleToolChange = (selectedTool, event) => {
        setTool(selectedTool);
        const buttonRect = event.target.getBoundingClientRect();
        setTooltipPosition({
            top: buttonRect.top + window.scrollY - 10,
            left: buttonRect.left + buttonRect.width + 10,
        });
        setShowTooltip(true);
    };

    // Verifica que dispositivo tiene el usuario: 
    // móvil táctil o en un pc  con mouse
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
    }, [layers, visibility]);

    // Crea una vista previa para cada dibujo realizado con el mouse
    useEffect(() => {
        if (previewPosition && startPosition) {
            clearCanvas();
            redrawFigures();

            if (tool === 'circle') {
                drawCircle(startPosition.x, startPosition.y, previewPosition.x, previewPosition.y, true);
            } else if (tool === 'line') {
                drawLine(startPosition.x, startPosition.y, previewPosition.x, previewPosition.y, true);
            } else if (tool === 'square') {
                drawSquare(startPosition.x, startPosition.y, previewPosition.x, previewPosition.y, true);
            } else if (tool === 'triangle') {
                drawTriangle(startPosition.x, startPosition.y, previewPosition.x, previewPosition.y, true);
            } else if (tool === 'pencil') {
                drawPencil(pencil?.points, startPosition.x, startPosition.y, previewPosition.x, previewPosition.y, true);
            }
        }
    }, [previewPosition]);

    // Se llama cada vez que el usuario presiona el mouse o touch táctil
    const startDrawing = (x, y) => {
        context.beginPath();
        context.moveTo(x, y);
        setIsDrawing(true);
        setStartPosition({ x, y });
        setPreviewPosition({ x, y });

        console.log("TEST 0.1 | pencil => ", pencil);
        console.log("TEST 0.2 | figures => ", figures);
        console.log("TEST 0.3 | startPosition => ", startPosition);
        console.log("TEST 0.4 | previewPosition => ", previewPosition);

        if (tool === 'pencil') {
            const points = [{ x: x, y: y }, { x, y }];
            context.strokeStyle = lineColor;
            context.lineTo(x, y);
            context.stroke();

            const newFigure = {
                tool,
                startX: x,
                startY: y,
                points: [{ x: x, y: y }, { x, y }],
                lineColor,
                fillColor,
                lineWidth,
                text,
                fontSize,
                fontColor,
                fontFamily,
                visible: true,
            };

            if (!pencil?.points) {
                setPencil(newFigure);
            } else {
                setPencil({
                    ...pencil,
                    points: [
                        ...pencil.points,
                        ...points
                    ]
                })
            }

            setStartPosition({ x, y });
            setPreviewPosition({ x, y });
        }
    };

    // Se llama cada vez que el usuario mueve el mouse o touch táctil
    const draw = (e) => {
        if (!isDrawing && !startPosition) return;

        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        context.lineWidth = lineWidth;

        if (tool === 'pencil') {
            const points = [{ x: startPosition.x, y: startPosition.y }, { x, y }];
            context.strokeStyle = lineColor;
            context.lineTo(x, y);
            context.stroke();
            setPencil({
                ...pencil,
                points: [
                    ...pencil.points,
                    ...points
                ]
            });
            setStartPosition({ x, y });
            setPreviewPosition({ x, y });
        } else if (tool === 'eraser') {
            context.strokeStyle = 'white';
            context.lineTo(x, y);
            context.stroke();
        } else if (startPosition) {
            setPreviewPosition({ x, y });
        }
        console.log("TEST 1.1 | pencil => ", pencil);
        console.log("TEST 1.2 | figures => ", figures);
        console.log("TEST 1.3 | startPosition => ", startPosition);
        console.log("TEST 1.4 | previewPosition => ", previewPosition);
    };

    // Se llama cada vez que el usuario suelta el mouse o touch táctil
    const stopDrawing = (e) => {
        console.log('TEST 2 | pencil?.points?.length => ', pencil?.points?.length);
        console.log("TEST 3 | pencil =>", pencil);
        if (startPosition) {
            const endX = e.nativeEvent.offsetX;
            const endY = e.nativeEvent.offsetY;

            const figure = {
                tool,
                startX: startPosition.x,
                startY: startPosition.y,
                points: pencil?.points || [],
                endX,
                endY,
                lineColor,
                fillColor,
                lineWidth,
                text,
                fontSize,
                fontColor,
                fontFamily,
                visible: true,
            };

            if (tool === 'pencil') {
                setPencil({ ...pencil, endX, endY });
                setFigures([...figures, pencil]);
                drawPencil(pencil.points, startPosition.x, startPosition.y, endX, endY);
                setFigures([...figures, figure]);
            } else if (tool === 'text') {
                if (text) {
                    drawText(text, startPosition.x, startPosition.y, fontFamily, fontSize, fontColor);
                    setFigures([...figures, figure]);
                }
            } else if (tool === 'circle') {
                drawCircle(startPosition.x, startPosition.y, endX, endY);
                setFigures([...figures, figure]);
            } else if (tool === 'triangle') {
                drawTriangle(startPosition.x, startPosition.y, endX, endY);
                setFigures([...figures, figure]);
            } else if (tool === 'square') {
                drawSquare(startPosition.x, startPosition.y, endX, endY);
                setFigures([...figures, figure]);
            } else if (tool === 'line') {
                drawLine(startPosition.x, startPosition.y, endX, endY);
                setFigures([...figures, figure]);
            }

        }

        console.log("TEST 4 | figures => ", figures);
        context.closePath();
        setIsDrawing(false);
        setStartPosition(null);
        setPreviewPosition(null);
        setPencil(null);
    };

    // Se vuelve recrear todas los lienzos dentro del canvas
    // después de mostrar la vista previa
    const redrawFigures = () => {
        clearCanvas();
        figures.forEach((figure) => {
            if (figure.visible) {
                if (figure.tool === 'text') {
                    drawText(figure.text, figure.startX, figure.startY, figure.fontFamily, figure.fontSize, figure.fontColor);
                } else if (figure.tool === 'circle') {
                    drawCircle(figure.startX, figure.startY, figure.endX, figure.endY, false, figure.lineColor, figure.fillColor, figure.lineWidth);
                } else if (figure.tool === 'line') {
                    drawLine(figure.startX, figure.startY, figure.endX, figure.endY, false, figure.lineColor, figure.fillColor, figure.lineWidth);
                } else if (figure.tool === 'square') {
                    drawSquare(figure.startX, figure.startY, figure.endX, figure.endY, false, figure.lineColor, figure.fillColor, figure.lineWidth);
                } else if (figure.tool === 'triangle') {
                    drawTriangle(figure.startX, figure.startY, figure.endX, figure.endY, false, figure.lineColor, figure.fillColor, figure.lineWidth);
                } else if (figure.tool === 'pencil') {
                    drawPencil(figure.points, figure.startX, figure.startY, figure.endX, figure.endY, false, figure.lineColor, figure.fillColor, figure.lineWidth);
                }
            }
        });
    };

    // * figuras
    const drawText = (text, startX, startY, customFontFamily = "Arial", customFontSize = 20, customFontColor = "#000000") => {
        context.font = `${customFontSize || fontSize}px ${customFontFamily || fontFamily}`;
        context.fillStyle = customFontColor || fontColor;
        context.globalAlpha = 1.0;
        context.fillText(text, startX, startY);
        context.globalAlpha = 1.0;
    };

    const drawSquare = (startX, startY, endX, endY, isPreview = false, customLineColor = null, customFillColor = null, customLineWidth = null) => {
        const size = Math.abs(endX - startX);
        context.strokeStyle = customLineColor || lineColor;
        context.fillStyle = customFillColor || fillColor;
        context.lineWidth = customLineWidth || lineWidth;
        if (isPreview) context.globalAlpha = 0.5;
        context.beginPath();
        context.rect(startX, startY, size, size);
        context.fill();
        context.stroke();
        if (isPreview) context.globalAlpha = 1.0;
    };

    const drawCircle = (startX, startY, endX, endY, isPreview = false, customLineColor = null, customFillColor = null, customLineWidth = null) => {
        const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        context.strokeStyle = customLineColor || lineColor;
        context.fillStyle = customFillColor || fillColor;
        context.lineWidth = customLineWidth || lineWidth;
        if (isPreview) context.globalAlpha = 0.5;
        context.beginPath();
        context.arc(startX, startY, radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        if (isPreview) context.globalAlpha = 1.0;
    };

    const drawTriangle = (startX, startY, endX, endY, isPreview = false, customLineColor = null, customFillColor = null, customLineWidth = null) => {
        context.strokeStyle = customLineColor || lineColor;
        context.fillStyle = customFillColor || fillColor;
        context.lineWidth = customLineWidth || lineWidth;
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

    const drawLine = (startX, startY, endX, endY, isPreview = false, customLineColor = null, customFillColor = null, customLineWidth = null) => {
        context.strokeStyle = customLineColor || lineColor;
        context.fillStyle = customFillColor || fillColor;
        context.lineWidth = customLineWidth || lineWidth;
        if (isPreview) context.globalAlpha = 0.5;
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
        if (isPreview) context.globalAlpha = 1.0;
    };

    const drawPencil = (points, startX, startY, endX, endY, isPreview = false, customLineColor = null, customFillColor = null, customLineWidth = null) => {
        context.strokeStyle = customLineColor || lineColor;
        context.fillStyle = customFillColor || fillColor;
        context.lineWidth = customLineWidth || lineWidth;
        if (isPreview) context.globalAlpha = 0.5;
        context.beginPath();
        if (points?.length > 0) {
            points.forEach((point, index) => {
                if (index === 0) {
                    context.moveTo(point.x, point.y);
                } else {
                    context.lineTo(point.x, point.y);
                }
            });
        }
        context.stroke();
        if (!isPreview) context.closePath();
        if (isPreview) context.globalAlpha = 1.0;
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

    const addLayer = () => {
        setLayers(prevLayers => [...prevLayers, []]);
        setVisibility(prevVisibility => [...prevVisibility, true]);
        setActiveLayer(layers.length);
    };

    const deleteLayer = () => {
        // Verificar si el índice es válido
        if (activeLayer >= 1 && activeLayer < layers.length) {
            setLayers(prevLayers => {
                const newLayers = [...prevLayers]; // Hacemos una copia del array original
                newLayers.splice(activeLayer, 1); // Eliminamos el elemento en el índice activeLayer
                return newLayers; // Devolvemos la nueva lista de capas
            });

            // También podrías querer actualizar activeLayer para evitar errores
            setActiveLayer(prevLayer => (prevLayer > 0 ? prevLayer - 1 : 0));
        } else {
            console.log("Índice de capa no válido");
        }
    };

    const changeLayer = (index) => {
        setActiveLayer(index);
    };

    const toggleLayerVisibility = (index) => {
        setVisibility(prevVisibility => {
            const newVisibility = [...prevVisibility];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };

    const exportLayers = () => {
        const json = JSON.stringify(layers);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'layers.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const importLayers = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const json = e.target.result;
            const importedLayers = JSON.parse(json);
            setLayers(importedLayers);
        };

        if (file) {
            reader.readAsText(file);
        }
    };

    const value = {
        canvasRef,
        isDrawing,
        context,
        tool,
        setTool,

        figures,
        setFigures,
        startDrawing,
        draw,
        stopDrawing,
        clearCanvas,
        // Export imagen
        imageFormat,
        setImageFormat,
        saveImage,
        // Layers
        layers,
        setLayers,
        visibility,
        setVisibility,
        activeLayer,
        setActiveLayer,
        addLayer,
        deleteLayer,
        changeLayer,
        toggleLayerVisibility,
        exportLayers,
        importLayers,
        // Tool Text
        text,
        setText,
        fontSize,
        setFontSize,
        fontColor,
        setFontColor,
        fontFamily,
        setFontFamily,
        /// Tool Circle
        lineWidth,
        setLineWidth,
        lineColor,
        setLineColor,
        fillColor,
        setFillColor,
        //  Tooltip Tool
        showTooltip,
        setShowTooltip,
        tooltipPosition,
        setTooltipPosition,
        handleToolChange,
        // Input device 
        inputDevice,
    };

    return (
        <CanvasContext.Provider value={value}>
            {children}
        </CanvasContext.Provider>
    )
}
