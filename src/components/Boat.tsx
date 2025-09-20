import React from 'react';
import { ReactComponent as BoatIcon } from '../assets/motorboat.svg';

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
      <BoatIcon width={30} height={30} />
    </g>
  );
};

export default Boat;