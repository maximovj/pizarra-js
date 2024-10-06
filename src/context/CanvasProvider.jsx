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

    // Estados para capas
    const [layers, setLayers] = useState([[]]);
    const [visibility, setVisibility] = useState([true]);
    const [activeLayer, setActiveLayer] = useState(0);

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

    const addLayer = () => {
        setLayers(prevLayers => [...prevLayers, []]);
        setVisibility(prevVisibility => [...prevVisibility, true]);
        setActiveLayer(layers.length);
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
        layers,
        setLayers,
        visibility,
        setVisibility,
        activeLayer,
        setActiveLayer,
        addLayer,
        changeLayer,
        toggleLayerVisibility,
        exportLayers,
        importLayers,
    };

    return (
        <CanvasContext.Provider value={value}>
            {children}
        </CanvasContext.Provider>
    )
}
