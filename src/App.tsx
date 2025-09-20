import React, { useState, useCallback } from "react";
import "./App.css";

function App() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);

  const calculateAngle = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    const svgElement = (event.currentTarget as SVGSVGElement);
    const rect = svgElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Get client coordinates based on event type
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

  const handleDragStart = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    setIsDragging(true);
    const angle = calculateAngle(event);
    setStartAngle(angle - rotation);
  }, [rotation, calculateAngle]);

  const handleDragMove = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const angle = calculateAngle(event);
    setRotation(angle - startAngle);
  }, [isDragging, startAngle, calculateAngle]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <main className="page">
      <svg
        className="svg-circle"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <g transform={`rotate(${rotation}, 50, 50)`}>
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          <path
            d="M 50 5 L 55 15 L 45 15 Z"
            fill="black"
            stroke="none"
          />
        </g>
      </svg>
    </main>
  );
}

export default App;
