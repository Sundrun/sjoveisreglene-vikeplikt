import React, { useState, useCallback } from "react";
import "./App.css";
import MotorBoat from "./components/MotorBoat";
import TopBoat from "./components/TopBoat";

function App() {
  const [bottomRotation, setBottomRotation] = useState(0);
  const [activeTriangle, setActiveTriangle] = useState<'top' | 'bottom' | 'boat-top' | 'boat-bottom' | null>(null);
  const [startAngle, setStartAngle] = useState(0);

  const calculateAngle = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    const svgElement = (event.currentTarget as SVGSVGElement).closest('svg');
    if (!svgElement) return 0;
    
    const rect = svgElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    let clientX, clientY;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    return angle;
  }, []);

  const handleDragStart = useCallback((element: 'bottom' | 'boat-bottom') => (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveTriangle(element);
    const angle = calculateAngle(event);
    setStartAngle(angle - bottomRotation);
  }, [calculateAngle, bottomRotation]);

  const handleDragMove = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!activeTriangle || activeTriangle === 'top') return;
    const angle = calculateAngle(event);
    setBottomRotation(angle - startAngle);
  }, [activeTriangle, startAngle, calculateAngle]);

  const handleDragEnd = useCallback(() => {
    setActiveTriangle(null);
  }, []);

  return (
    <main className="page">
      <svg
        className="svg-circle"
        viewBox="-10 -10 120 120"
        preserveAspectRatio="xMidYMid meet"
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
        <TopBoat 
          activeTriangle={activeTriangle}
          onActiveTriangleChange={setActiveTriangle}
        />
        <g 
          transform={`rotate(${bottomRotation + 180}, 50, 50)`}
          onMouseDown={handleDragStart('bottom')}
          onTouchStart={handleDragStart('bottom')}
          style={{ cursor: activeTriangle === 'bottom' ? 'grabbing' : 'grab' }}
          className="triangle-handle"
        >
          <path
            d="M 50 15 L 55 5 L 45 5 Z"
            fill="black"
            stroke="none"
          />
        </g>
        {/* Bottom Boat */}
        <MotorBoat
          x={50 + 50 * Math.cos((bottomRotation + 90) * Math.PI / 180)}
          y={50 + 50 * Math.sin((bottomRotation + 90) * Math.PI / 180)}
          rotation={0}
          onDragStart={handleDragStart('boat-bottom')}
        />
      </svg>
    </main>
  );
}

export default App;
