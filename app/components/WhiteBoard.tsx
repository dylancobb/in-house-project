'use client';

import React, { useRef, useEffect, useState, MouseEvent } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Style {
  color: string;
  lineWidth: number;
}

interface DrawingAction {
  path: Point[];
  style: Style;
}

const colorsPalette = [
  '#000000',
  '#ff4242',
  '#ffa142',
  '#ffe042',
  '#42ff42',
  '#4281ff',
  '#c042ff',
];

interface WhiteBoardProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}
const WhiteBoard: React.FC<WhiteBoardProps> = ({ canvasRef }) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState<string>('black');
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [drawingActions, setDrawingActions] = useState<DrawingAction[]>([]);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const [currentStyle, setCurrentStyle] = useState<Style>({
    color: 'black',
    lineWidth: 3,
  });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 900;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');
      setContext(ctx);
      reDrawPreviousData(ctx);
    }
  }, []);

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    if (context) {
      context.beginPath();
      context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      setDrawing(true);
    }
  };

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    if (context) {
      context.strokeStyle = currentStyle.color;
      context.lineWidth = currentStyle.lineWidth;
      context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      context.stroke();
      setCurrentPath([
        ...currentPath,
        { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY },
      ]);
    }
  };

  const endDrawing = () => {
    setDrawing(false);
    context && context.closePath();
    if (currentPath.length > 0) {
      setDrawingActions([
        ...drawingActions,
        { path: currentPath, style: currentStyle },
      ]);
    }
  };

  const changeColor = (color: string) => {
    setCurrentColor(color);
    setCurrentStyle({ ...currentStyle, color });
  };

  const changeWidth = (width: string) => {
    setLineWidth(Number(width));
    setCurrentStyle({ ...currentStyle, lineWidth: Number(width) });
  };

  const undoDrawing = () => {
    if (drawingActions.length > 0) {
      const newContext = canvasRef.current!.getContext('2d');
      newContext!.clearRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
      drawingActions.pop();

      drawingActions.forEach(({ path, style }) => {
        newContext!.beginPath();
        newContext!.strokeStyle = style.color;
        newContext!.lineWidth = style.lineWidth;
        newContext!.moveTo(path[0].x, path[0].y);
        path.forEach((point) => {
          newContext!.lineTo(point.x, point.y);
        });
        newContext!.stroke();
      });
    }
  };

  const clearDrawing = () => {
    setDrawingActions([]);
    setCurrentPath([]);
    const newContext = canvasRef.current!.getContext('2d');
    newContext!.clearRect(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
  };

  const reDrawPreviousData = (ctx: CanvasRenderingContext2D | null) => {
    drawingActions.forEach(({ path, style }) => {
      if (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = style.color;
        ctx.lineWidth = style.lineWidth;
        ctx.moveTo(path[0].x, path[0].y);
        path.forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
      }
    });
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        className="border border-gray-400 bg-white"
      ></canvas>
      <div className="flex my-4">
        <div className="flex justify-center space-x-4">
          {colorsPalette.map((color) => (
            <div
              key={color}
              className={`w-8 h-8 rounded-full cursor-pointer ${
                currentColor === color
                  ? `${color === 'black' ? 'bg-white' : `bg-${color}-700`}`
                  : `${color === 'black' ? 'bg-black' : `bg-${color}-500`}`
              }`}
              style={{ backgroundColor: color }}
              onClick={() => changeColor(color)}
            ></div>
          ))}
        </div>
        <div className="flex-grow">
          <input
            type="range"
            min="1"
            max="10"
            value={lineWidth}
            onChange={(e) => changeWidth(e.target.value)}
          />
        </div>
        <div className="flex justify-center my-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 mr-2"
            onClick={undoDrawing}
          >
            Undo
          </button>
        </div>
        <div className="flex justify-center my-4">
          <button
            className="bg-red-500 text-white px-4 py-2 mr-2"
            onClick={clearDrawing}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhiteBoard;
