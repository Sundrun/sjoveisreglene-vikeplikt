import React from 'react';

interface BoatProps {
  x: number;
  y: number;
  rotation: number;
  onDragStart?: (event: React.MouseEvent | React.TouchEvent) => void;
}

const Boat: React.FC<BoatProps> = ({ x, y, rotation, onDragStart }) => {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotation})`}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      style={{ cursor: 'grab' }}
      className="boat-handle"
    >
      <path
        d="M -6 2 L 6 2 L 4 -2 L -4 -2 Z"  // Simple boat shape
        fill="blue"
        stroke="none"
      />
      <path
        d="M -1 -2 L -1 -5 L 1 -5 L 1 -2"  // Small cabin/mast
        fill="blue"
        stroke="none"
      />
    </g>
  );
};

export default Boat;