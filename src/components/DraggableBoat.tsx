import React, { useState, useCallback } from 'react';
import MotorBoat from './MotorBoat';

interface DraggableBoatProps {
  position: 'top' | 'bottom';
  activeTriangle: 'top' | 'bottom' | 'boat-top' | 'boat-bottom' | null;
  onActiveTriangleChange: (triangle: 'top' | 'bottom' | 'boat-top' | 'boat-bottom' | null) => void;
}

const DraggableBoat: React.FC<DraggableBoatProps> = ({ position, activeTriangle, onActiveTriangleChange }) => {
  const [rotation, setRotation] = useState(0);
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
    onActiveTriangleChange(position);
    const angle = calculateAngle(event);
    setStartAngle(angle - rotation);
  }, [calculateAngle, rotation, onActiveTriangleChange, position]);

  const handleDragMove = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (activeTriangle !== position) return;
    const angle = calculateAngle(event);
    setRotation(angle - startAngle);
  }, [activeTriangle, position, startAngle, calculateAngle]);

  const handleDragEnd = useCallback(() => {
    onActiveTriangleChange(null);
  }, [onActiveTriangleChange]);

  // Calculate the triangle position based on whether it's top or bottom
  const triangleY = position === 'top' ? 15 : 85;
  const trianglePoints = position === 'top' 
    ? 'M 50 15 L 55 5 L 45 5 Z'
    : 'M 50 85 L 55 95 L 45 95 Z';

  // Calculate the boat position
  const boatRotationOffset = position === 'top' ? -90 : 90;
  const boatX = 50 + 50 * Math.cos((rotation + boatRotationOffset) * Math.PI / 180);
  const boatY = 50 + 50 * Math.sin((rotation + boatRotationOffset) * Math.PI / 180);

  return (
    <>
      <g 
        transform={`rotate(${rotation}, 50, 50)`}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{ cursor: activeTriangle === position ? 'grabbing' : 'grab' }}
        className="triangle-handle"
      >
        <path
          d={trianglePoints}
          fill="black"
          stroke="none"
        />
      </g>
      <MotorBoat
        x={boatX}
        y={boatY}
        rotation={0}
        onDragStart={() => onActiveTriangleChange(`boat-${position}`)}
      />
    </>
  );
};

export default DraggableBoat;