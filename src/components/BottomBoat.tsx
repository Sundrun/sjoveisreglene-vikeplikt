import React from 'react';
import DraggableBoat from './DraggableBoat';

interface BottomBoatProps {
  activeTriangle: 'top' | 'bottom' | 'boat-top' | 'boat-bottom' | null;
  onActiveTriangleChange: (triangle: 'top' | 'bottom' | 'boat-top' | 'boat-bottom' | null) => void;
}

const BottomBoat: React.FC<BottomBoatProps> = ({ activeTriangle, onActiveTriangleChange }) => {
  return (
    <DraggableBoat
      position="bottom"
      activeTriangle={activeTriangle}
      onActiveTriangleChange={onActiveTriangleChange}
    />
  );
};

export default BottomBoat;