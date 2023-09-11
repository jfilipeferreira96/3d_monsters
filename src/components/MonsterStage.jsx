import {
  CameraControls,
  Environment,
  useCursor,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MonsterCard } from "./MonsterCard";
import { Cactoro } from "./models/Cactoro";
import { DragonEvolved } from "./models/Dragon_Evolved";
import { Fish } from "./models/Fish";

export const MonsterStage = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);

  useCursor(hovered);
 
  useEffect(() => {
    //handling camera active
    if (active){
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
      setHovered(null);
    }
    else{
    //handling camera reset
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset"/>
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        minDistance={3} 
        maxDistance={8} 
      />
      
      <MonsterCard
        name="Fish King"
        color="#38adcf"
        texture={
          "textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"
        }
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Fish scale={0.6} position-y={-1} hovered={hovered === "Fish King"} />
      </MonsterCard>

      <MonsterCard
        texture={"textures/anime_art_style_lava_world.jpg"}
        name="Dragon"
        color={"#df8d52"}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <DragonEvolved
          scale={0.5}
          position-y={-1}
          hovered={hovered === "Dragon"}
        />
      </MonsterCard>

      <MonsterCard
        name="Cactoro"
        color="#739d3c"
        texture={"textures/anime_art_style_cactus_forest.jpg"}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Cactoro scale={0.45} position-y={-1} hovered={hovered === "Cactoro"} />
      </MonsterCard>
    </>
  );
};
