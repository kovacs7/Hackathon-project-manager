import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Brush, SquareX } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

const Canvas = () => {
  const [projectInfo, setProjectInfo] = useState({});
  const { projectId } = useParams();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [brushColor, setBrushColor] = useState("#6366f1");
  const [brushSize, setBrushSize] = useState(5);

  const fetchDataByProjectId = async () => {
    try {
      const res = await axios.get(`/app-dashboard/${projectId}/tasks`);
      setProjectInfo(res.data);
      if (res.data.error) {
        toast.error(res.data.error);
      }
    } catch (error) {
      toast.error("Error occurred while fetching data by projectId on client.");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataByProjectId();

    socket.emit("joinProject", projectId);

    // incoming drawing events
    socket.on("drawing", (drawingData) => {
      if (!context) return;
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0);
      };
      img.src = drawingData;
    });

    // existing canvas data
    socket.on("loadCanvas", (canvasData) => {
      if (!context) return;
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0);
      };
      img.src = canvasData;
    });

    // clear canvas event
    socket.on("clearCanvas", () => {
      if (!context) return;
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    });
  }, [projectId, context]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setContext(ctx);

    // Canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    if (!context) return;
    const { offsetX, offsetY } = nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!context || !isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.strokeStyle = brushColor;
    context.lineWidth = brushSize;
    context.stroke();

    const canvasData = canvasRef.current.toDataURL();
    socket.emit("drawing", { projectId, drawingData: canvasData });
  };

  const endDrawing = () => {
    if (!context) return;
    context.closePath();
    setIsDrawing(false);
  };

  const handleColorChange = (e) => {
    setBrushColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setBrushSize(e.target.value);
  };

  const clearCanvas = () => {
    if (!context) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    socket.emit("clearCanvas", { projectId });
  };

  return (
    <>
      <h2 className="text-md font-bold font-headerFonts sm:text-xl p-2 text-gray-600 border-b-2 border-gray-300 flex justify-between items-center bg-white">
        <p className="flex items-center gap-2">
          <Brush />
          Canvas For {projectInfo.title}
        </p>
      </h2>
      {/* canvas section */}
      <div className="bg-indigo-50 shadow-md max-h-custom m-4">
        <div>
          {/* canvas selection options */}
          <div className="flex flex-wrap justify-end gap-4 px-2.5 py-1.5">
            <div className="flex flex-row gap-1 items-center">
              <label className="text-sm" htmlFor="brushSize">
                Brush Size:{" "}
              </label>
              <input
                id="brushSize"
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={handleSizeChange}
              />
              <span className="text-sm">{brushSize}</span>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <label htmlFor="brushColor" className="text-sm">
                Brush Color:{" "}
              </label>
              <input
                id="brushColor"
                className=""
                type="color"
                value={brushColor}
                onChange={handleColorChange}
              />
            </div>
            <button
              className="bg-indigo-500 px-1.5 py-1 text-gray-100 text-sm rounded-md flex flex-row gap-1 items-center"
              onClick={clearCanvas}
            >
              <SquareX size={14} />
              <p>Clear Canvas</p>
            </button>
          </div>

          {/* canvas */}
          <div className="canvas-container max-h-canvas">
            <canvas
              className="bg-white canvas border border-indigo-300"
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Canvas;
