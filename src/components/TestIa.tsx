
import React, { useState, useEffect } from 'react';
import {
  ViroARScene,
  ViroARImageMarker,
  ViroNode,
  ViroBox,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroAnimations
} from '@viro-community/react-viro';

// Define los marcadores para cada cara del cubo
ViroARTrackingTargets.createTargets({
  "face1": { source: require('../public/cube/Side_1.png'), orientation: "Up", physicalWidth: 0.1 },
  "face2": { source: require('../public/cube/Side_2.png'), orientation: "Up", physicalWidth: 0.1 },
  "face3": { source: require('../public/cube/Side_3.png'), orientation: "Up", physicalWidth: 0.1 },
  "face4": { source: require('../public/cube/Side_4.png'), orientation: "Up", physicalWidth: 0.1 },
  "face5": { source: require('../public/cube/Side_5.png'), orientation: "Up", physicalWidth: 0.1 },
  "face6": { source: require('../public/cube/Side_6.png'), orientation: "Up", physicalWidth: 0.1 }
});

// Define los materiales y animaciones si son necesarios
ViroMaterials.createMaterials({
  customBoxMaterial: {
    diffuseTexture: require('../public/Geekguys_Studio_logo.png'),
  },
});

ViroAnimations.registerAnimations({
  // Aquí se pueden definir animaciones complejas si son necesarias
});

// Tipos para los estados de marcadores
interface MarkerState {
  position: number[];
  rotation: number[];
  found: boolean;
}

interface MarkerStates {
  [key: string]: MarkerState;
}

const Test = () => {
  const [cubeState, setCubeState]: any = useState({ position: [0, 0, 0], rotation: [0, 0, 0] });
  const [markerStates, setMarkerStates] = useState<MarkerStates>({});

  useEffect(() => {
    // Inicializar estados de los marcadores
    const initialStates: MarkerStates = {};
    for (let i = 1; i <= 6; i++) {
      initialStates['face' + i] = { position: [0, 0, 0], rotation: [0, 0, 0], found: false };
    }
    setMarkerStates(initialStates);
  }, []);

  const onMarkerUpdated = (markerName: string, anchor: any) => {
    setMarkerStates(prevStates => {
      const newState = { ...prevStates, [markerName]: { position: anchor.position, rotation: anchor.rotation, found: true } };
  
      // Lógica para calcular la posición y rotación promedio del cubo
      let totalPosition = [0, 0, 0];
      let totalRotation = [0, 0, 0];
      let count = 0;
  
      for (const key in newState) {
        if (newState[key].found) {
          totalPosition = totalPosition.map((val, idx) => val + newState[key].position[idx]);
          totalRotation = totalRotation.map((val, idx) => val + newState[key].rotation[idx]);
          count++;
        }
      }
  
      if (count > 0) {
        const avgPosition = totalPosition.map(val => val / count);
        const avgRotation = totalRotation.map(val => val / count);
        setCubeState({ position: avgPosition, rotation: avgRotation });
      }
  
      return newState;
    });
  };
  

  // Renderiza el objeto 3D (ViroBox) en la posición y rotación calculadas
  const renderCubeObject = () => {
    return (
      <ViroBox
        position={cubeState.position}
        rotation={cubeState.rotation}
        scale={[0.1, 0.1, 0.1]}
        materials={["customBoxMaterial"]}
      />
    );
  };

  return (
    <ViroARScene>
      {renderCubeObject()}
      {[1, 2, 3, 4, 5, 6].map(num => (
        <ViroARImageMarker
          key={'face' + num}
          target={'face' + num}
          onAnchorUpdated={(anchor) => onMarkerUpdated('face' + num, anchor)}
        />
      ))}
    </ViroARScene>
  );
};

export default Test;
