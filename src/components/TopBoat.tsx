import React, { useState, useCallback } from 'react';
import MotorBoat from './MotorBoat';

interface TopBoatProps {
  activeTriangle: 'top' | 'bottom' | 'boat-top' | 'boat-bottom' | null;
  onActiveTriangleChange: (triangle: 'top' | 'bottom' | 'boat-top' | 'boat-bottom' | null) => void;
}

const TopBoat: React.FC<TopBoatProps> = ({ activeTriangle, onActiveTriangleChange }) => {
  const [topRotation, setTopRotation] = useState(0);
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

  const handleDragStart = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onActiveTriangleChange('top');
    const angle = calculateAngle(event);
    setStartAngle(angle - topRotation);
  }, [calculateAngle, topRotation, onActiveTriangleChange]);

  const handleDragMove = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (activeTriangle !== 'top') return;
    const angle = calculateAngle(event);
    setTopRotation(angle - startAngle);
  }, [activeTriangle, startAngle, calculateAngle]);

  const handleDragEnd = useCallback(() => {
    onActiveTriangleChange(null);
  }, [onActiveTriangleChange]);

  return (
    <>
      <g 
        transform={`rotate(${topRotation}, 50, 50)`}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{ cursor: activeTriangle === 'top' ? 'grabbing' : 'grab' }}
        className="triangle-handle"
      >
        <path
          d="M 50 15 L 55 5 L 45 5 Z"
          fill="black"
          stroke="none"
        />
      </g>
      <MotorBoat
        x={50 + 50 * Math.cos((topRotation - 90) * Math.PI / 180)}
        y={50 + 50 * Math.sin((topRotation - 90) * Math.PI / 180)}
        rotation={0}
        onDragStart={() => onActiveTriangleChange('boat-top')}
      />
    </>
  );
};

export default TopBoat;