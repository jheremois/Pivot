import React from 'react';
import { ViroARScene, ViroText, ViroBox, ViroMaterials, ViroARTrackingTargets, ViroARImageMarker, ViroNode } from '@viro-community/react-viro';

ViroARTrackingTargets.createTargets({
    "targetOne": {
      source: require('../public/Geekguys_Studio_logo.png'), // Ruta a la imagen que quieres detectar
      orientation: "Up",
      physicalWidth: 0.1 // Ancho físico del marcador en metros
    }
  });
  
  const Test = () => {
    return (
      <ViroARScene>
        <ViroARImageMarker target={"targetOne"}>
          <ViroNode position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]}>
            <ViroBox materials={["grid"]} />
          </ViroNode>
        </ViroARImageMarker>
      </ViroARScene>
    );
  };

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('../public/Geekguys_Studio_logo.png'),
  },
});

export default Test;
