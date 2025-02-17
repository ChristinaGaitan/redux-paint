import { useEffect, MouseEvent, useCallback } from "react";
import { clearCanvas, drawStroke, setCanvasSize } from "./utils/canvasUtils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ColorPanel } from "./shared/ColorPanel";
import { EditPanel } from "./shared/EditPanel";
import {
  beginStroke,
  currentStrokeSelector,
  updateStroke,
} from "./modules/currentStroke/slice";
import { strokesSelector } from "./modules/strokes/slice";
import { useCanvas } from "./CanvasContext";
import { FilePanel } from "./shared/FilePanel";
import { endStroke } from "./modules/sharedActions";
import { historyIndexSelector } from "./modules/historyIndex/slice";
import { ModalLayer } from "./ModalLayer";

const WIDTH = 1024;
const HEIGHT = 768;

function App() {
  const canvasRef = useCanvas();

  const currentStroke = useSelector(currentStrokeSelector);
  const historyIndex = useSelector(historyIndexSelector);
  const strokes = useSelector(strokesSelector);

  const getCanvasWithContext = useCallback(
    (canvas = canvasRef.current) => {
      return { canvas, context: canvas?.getContext("2d") };
    },
    [canvasRef],
  );

  const isDrawing = !!currentStroke.points.length;

  const dispatch = useDispatch();

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();

    if (!canvas || !context) return;

    setCanvasSize(canvas, WIDTH, HEIGHT);

    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 5;
    context.strokeStyle = "black";

    clearCanvas(canvas);
  }, [getCanvasWithContext]);

  useEffect(() => {
    const { context } = getCanvasWithContext();

    if (!context) return;

    requestAnimationFrame(() =>
      drawStroke(context, currentStroke.points, currentStroke.color),
    );
  }, [currentStroke, getCanvasWithContext]);

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();

    if (!context || !canvas) return;

    requestAnimationFrame(() => {
      clearCanvas(canvas);

      strokes.slice(0, strokes.length - historyIndex).forEach((stroke) => {
        drawStroke(context, stroke.points, stroke.color);
      });
    });
  }, [getCanvasWithContext, historyIndex, strokes]);

  const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke({ x: offsetX, y: offsetY }));
  };

  const draw = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    dispatch(updateStroke({ x: offsetX, y: offsetY }));
  };

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({ historyIndex, stroke: currentStroke }));
    }
  };

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button arial-label="Close" />
        </div>
      </div>
      <EditPanel />
      <ColorPanel />
      <FilePanel />
      <ModalLayer />
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}

export default App;
