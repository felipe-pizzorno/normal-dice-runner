import * as THREE from "three";
import * as CANNON from "cannon";

export type MeshWithPhysics = {
  mesh: THREE.Mesh | THREE.Group<THREE.Object3DEventMap>;
  body: CANNON.Body;
  updateWithPhysics: () => void;
};
