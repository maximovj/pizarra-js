import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Circle, Line, Transformer } from 'react-konva';

const CanvasDraw = () => {
    const [shapes, setShapes] = useState([]);
    const [selectedShapeId, setSelectedShapeId] = useState(null);
    const [tool, setTool] = useState('select');
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);

    const handleMouseDown = (e) => {
        if (tool !== 'pencil') return;

        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { id: `line-${lines.length}`, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current || tool !== 'pencil') return;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];

        lastLine.points = lastLine.points.concat([point.x, point.y]);
        setLines([...lines.slice(0, lines.length - 1), lastLine]);
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    const addCircle = () => {
        const newCircle = {
            id: `circle-${shapes.length}`,
            type: 'circle',
            x: 150,
            y: 150,
            radius: 50,
            fill: 'red',
        };
        setShapes([...shapes, newCircle]);
    };

    const addSquare = () => {
        const newSquare = {
            id: `rect-${shapes.length}`,
            type: 'rect',
            x: 250,
            y: 250,
            width: 100,
            height: 100,
            fill: 'green',
        };
        setShapes([...shapes, newSquare]);
    };

    const handleSelect = (id) => {
        setSelectedShapeId(id);
    };

    const handleTransform = (newAttrs, id) => {
        const updatedShapes = shapes.map((shape) => {
            if (shape.id === id) {
                return { ...shape, ...newAttrs };
            }
            return shape;
        });
        setShapes(updatedShapes);

        const updatedLines = lines.map((line) => {
            if (line.id === id) {
                return { ...line, ...newAttrs };
            }
            return line;
        });
        setLines(updatedLines);
    };

    const moveToBack = () => {
        if (selectedShapeId) {
            setShapes((prevShapes) => {
                const shapeToMove = prevShapes.find(shape => shape.id === selectedShapeId);
                if (shapeToMove) {
                    return prevShapes.filter(shape => shape.id !== selectedShapeId).concat(shapeToMove);
                }
                return prevShapes;
            });
        }
    };

    const moveToFront = () => {
        if (selectedShapeId) {
            setShapes((prevShapes) => {
                const shapeToMove = prevShapes.find(shape => shape.id === selectedShapeId);
                if (shapeToMove) {
                    return [shapeToMove, ...prevShapes.filter(shape => shape.id !== selectedShapeId)];
                }
                return prevShapes;
            });
        }
    };

    return (
        <div>
            <button onClick={addCircle}>Add Circle</button>
            <button onClick={addSquare}>Add Square</button>
            <button onClick={() => setTool('pencil')}>Pencil</button>
            <button onClick={() => setTool('select')}>Select</button>
            <button onClick={moveToBack}>Send to Back</button> {/* Botón para enviar al fondo */}
            <button onClick={moveToFront}>Bring to Front</button> {/* Botón para traer al frente */}
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
            >
                <Layer>
                    {shapes.map((shape) =>
                        shape.type === 'circle' ? (
                            <CircleComponent
                                key={shape.id}
                                shapeProps={shape}
                                isSelected={shape.id === selectedShapeId}
                                onSelect={() => handleSelect(shape.id)}
                                onTransform={(newAttrs) => handleTransform(newAttrs, shape.id)}
                            />
                        ) : (
                            <RectComponent
                                key={shape.id}
                                shapeProps={shape}
                                isSelected={shape.id === selectedShapeId}
                                onSelect={() => handleSelect(shape.id)}
                                onTransform={(newAttrs) => handleTransform(newAttrs, shape.id)}
                            />
                        )
                    )}

                    {lines.map((line) => (
                        <LineComponent
                            key={line.id}
                            shapeProps={line}
                            isSelected={line.id === selectedShapeId}
                            onSelect={() => handleSelect(line.id)}
                            onTransform={(newAttrs) => handleTransform(newAttrs, line.id)}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
};

const LineComponent = ({ shapeProps, isSelected, onSelect, onTransform }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Line
                onClick={onSelect}
                ref={shapeRef}
                points={shapeProps.points}
                stroke="black"
                strokeWidth={3}
                tension={0.5}
                lineCap="round"
                draggable
                onTransformEnd={() => {
                    const node = shapeRef.current;
                    const newAttrs = {
                        x: node.x(),
                        y: node.y(),
                        scaleX: node.scaleX(),
                        scaleY: node.scaleY(),
                    };
                    onTransform(newAttrs);
                }}
            />
            {isSelected && <Transformer ref={trRef} />}
        </>
    );
};

const RectComponent = ({ shapeProps, isSelected, onSelect, onTransform }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Rect
                onClick={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onTransformEnd={() => {
                    const node = shapeRef.current;
                    const newAttrs = {
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * node.scaleX(),
                        height: node.height() * node.scaleY(),
                        scaleX: 1,
                        scaleY: 1,
                    };
                    onTransform(newAttrs);
                }}
            />
            {isSelected && <Transformer ref={trRef} />}
        </>
    );
};

const CircleComponent = ({ shapeProps, isSelected, onSelect, onTransform }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Circle
                onClick={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onTransformEnd={() => {
                    const node = shapeRef.current;
                    const newAttrs = {
                        x: node.x(),
                        y: node.y(),
                        radius: node.radius() * node.scaleX(),
                        scaleX: 1,
                        scaleY: 1,
                    };
                    onTransform(newAttrs);
                }}
            />
            {isSelected && <Transformer ref={trRef} />}
        </>
    );
};

export default CanvasDraw;
