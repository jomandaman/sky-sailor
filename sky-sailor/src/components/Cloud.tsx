import * as THREE from 'three';
import React, { useRef } from 'react';

const Cloud = () => {
    const canvasRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={canvasRef}></div>
    );
};

export default Cloud;
  