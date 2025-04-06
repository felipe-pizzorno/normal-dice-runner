import * as THREE from "three";
import * as CANNON from "cannon";

export type MeshWithPhysics = {
  mesh: THREE.Mesh;
  body: CANNON.Body;
  updateWithPhysics: () => void;
};
