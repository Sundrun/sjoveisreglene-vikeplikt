import React from 'react';
import { ReactComponent as BoatIcon } from '../assets/motorboat.svg';

interface MotorBoatProps {
  x: number;
  y: number;
  rotation: number;
  onDragStart?: (event: React.MouseEvent | React.TouchEvent) => void;
}

const MotorBoat: React.FC<MotorBoatProps> = ({ x, y, rotation, onDragStart }) => {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotation})`}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      style={{ cursor: 'grab' }}
      className="boat-handle"
    >
      <BoatIcon width={10} height={10} />
    </g>
  );
};

export default MotorBoat;