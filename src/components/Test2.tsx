import React, { useCallback, useState } from 'react';

import {
  ViroARScene,
  ViroARImageMarker,
  ViroNode,
  ViroBox,
  ViroMaterials,
  ViroARTrackingTargets,
  Viro3DObject
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

// Define los materiales
ViroMaterials.createMaterials({
  boxMaterial: {
    diffuseTexture: require('../public/Geekguys_Studio_logo.png'),
  },
});

// Tipos para los estados de marcadores
interface MarkerState {
  position: number[];
  rotation: number[];
}

interface MarkerStates {
  [key: string]: MarkerState;
}

const Test = () => {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [markerStates, setMarkerStates] = useState<MarkerStates>({});

  const interpolate = useCallback((start: number, end: number, factor: number): number => {
    return start + (end - start) * factor;
  }, []);

  const interpolatePosition = useCallback((start: number[], end: number[]): number[] => {
    return start.map((val, idx) => interpolate(val, end[idx], 0.05)); // Reducir el factor para una transición más suave
  }, [interpolate]);

  const onMarkerUpdated = useCallback((markerName: string, anchor: any): void => {
    setMarkerStates(prevStates => {
      const prevPosition = prevStates[markerName]?.position || [0, 0, 0];
      const newPosition = interpolatePosition(prevPosition, anchor.position);
      const newRotation = anchor.rotation;
      return { ...prevStates, [markerName]: { position: newPosition, rotation: newRotation } };
    });
  }, [interpolatePosition]);

  const onMarkerFound = useCallback((markerName: string): void => {
    setActiveMarker(markerName);
  }, []);


  const renderBoxForMarker = useCallback((markerName: any): JSX.Element => {
    const markerState: any = markerStates[markerName] || { position: [0, 0, 0], rotation: [0, 0, 0] };
    return (
      <Viro3DObject
        source={{ uri: 'http://yourdomain.com/path_to_your_model/object1.obj' }}
        resources={[
          { uri: 'http://yourdomain.com/path_to_your_model/object1.mtl' },
          { uri: 'http://yourdomain.com/path_to_your_model/Textura_Prueba1.png' },
        ]}
        position={markerState.position}
        rotation={markerState.rotation}
        scale={[0.1, 0.1, 0.1]} // Ajusta la escala según sea necesario
        type="OBJ" // O el tipo de archivo que estés utilizando
        visible={activeMarker === markerName}
      />
    );
  }, [activeMarker, markerStates]);

  return (
    <ViroARScene>
      <ViroARImageMarker target={"face1"} onAnchorFound={() => onMarkerFound("face1")} onAnchorUpdated={(anchor) => onMarkerUpdated("face1", anchor)}>
        <ViroNode>{renderBoxForMarker("face1")}</ViroNode>
      </ViroARImageMarker>
      <ViroARImageMarker target={"face2"} onAnchorFound={() => onMarkerFound("face2")} onAnchorUpdated={(anchor) => onMarkerUpdated("face2", anchor)}>
        <ViroNode>{renderBoxForMarker("face2")}</ViroNode>
      </ViroARImageMarker>
      <ViroARImageMarker target={"face3"} onAnchorFound={() => onMarkerFound("face3")} onAnchorUpdated={(anchor) => onMarkerUpdated("face3", anchor)}>
        <ViroNode>{renderBoxForMarker("face3")}</ViroNode>
      </ViroARImageMarker>
      <ViroARImageMarker target={"face4"} onAnchorFound={() => onMarkerFound("face4")} onAnchorUpdated={(anchor) => onMarkerUpdated("face4", anchor)}>
        <ViroNode>{renderBoxForMarker("face4")}</ViroNode>
      </ViroARImageMarker>
      <ViroARImageMarker target={"face5"} onAnchorFound={() => onMarkerFound("face5")} onAnchorUpdated={(anchor) => onMarkerUpdated("face5", anchor)}>
        <ViroNode>{renderBoxForMarker("face5")}</ViroNode>
      </ViroARImageMarker>
      <ViroARImageMarker target={"face6"} onAnchorFound={() => onMarkerFound("face6")} onAnchorUpdated={(anchor) => onMarkerUpdated("face6", anchor)}>
        <ViroNode>{renderBoxForMarker("face6")}</ViroNode>
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default Test;

