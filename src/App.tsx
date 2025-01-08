import { useEffect, useRef, MouseEvent } from "react";
import { clearCanvas, setCanvasSize } from "./utils/canvasUtils";
import { useSelector } from "react-redux";
import { RootState } from "./utils/types";
import { useDispatch } from "react-redux";
import { beginStroke, endStroke, updateStroke } from "./actions";

const WIDTH = 1024;
const HEIGHT = 768;

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext("2d") };
  };

  const isDrawing = useSelector<RootState>(
    (state) => !!state.currentStroke.points.length,
  );

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
  }, []);

  const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke(offsetX, offsetY));
  };

  const endDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    dispatch(updateStroke(offsetX, offsetY));
  };

  const draw = () => {
    if (isDrawing) {
      dispatch(endStroke());
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
