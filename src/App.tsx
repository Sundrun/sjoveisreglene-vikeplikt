import React, { useState, useCallback } from "react";
import "./App.css";

function App() {
  const [topRotation, setTopRotation] = useState(0);
  const [bottomRotation, setBottomRotation] = useState(0);
  const [activeTriangle, setActiveTriangle] = useState<'top' | 'bottom' | null>(null);
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

  const handleDragStart = useCallback((triangle: 'top' | 'bottom') => (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveTriangle(triangle);
    const angle = calculateAngle(event);
    setStartAngle(angle - (triangle === 'top' ? topRotation : bottomRotation));
  }, [calculateAngle, topRotation, bottomRotation]);

  const handleDragMove = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!activeTriangle) return;
    const angle = calculateAngle(event);
    if (activeTriangle === 'top') {
      setTopRotation(angle - startAngle);
    } else {
      setBottomRotation(angle - startAngle);
    }
  }, [activeTriangle, startAngle, calculateAngle]);

  const handleDragEnd = useCallback(() => {
    setActiveTriangle(null);
  }, []);

  return (
    <main className="page">
      <svg
        className="svg-circle"
        viewBox="0 0 100 100"
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
        <g 
          transform={`rotate(${topRotation}, 50, 50)`}
          onMouseDown={handleDragStart('top')}
          onTouchStart={handleDragStart('top')}
          style={{ cursor: activeTriangle === 'top' ? 'grabbing' : 'grab' }}
          className="triangle-handle"
        >
          <path
            d="M 50 15 L 55 5 L 45 5 Z"
            fill="black"
            stroke="none"
          />
        </g>
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
      </svg>
    </main>
  );
}

export default App;
