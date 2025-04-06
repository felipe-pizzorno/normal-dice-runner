
import * as THREE from "three";
import * as CANNON from "cannon";
import { MeshWithPhysics } from "./types";
import { setUpdateWithPhysics } from "./utils";

export const createCube = (world: CANNON.World, scene: THREE.Scene): MeshWithPhysics => {
  const cubeSize = 4;
  const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
  const mesh = new THREE.Mesh(cubeGeo, cubeMat);
  mesh.position.set(cubeSize + 1, cubeSize + 10, 0);
  mesh.castShadow = true;
  scene.add(mesh);

  const body = new CANNON.Body({
    mass: 5, // kg
    position: new CANNON.Vec3(mesh.position.x, mesh.position.y, mesh.position.z), // m
    shape: new CANNON.Box(new CANNON.Vec3(cubeSize / 2, cubeSize / 2, cubeSize / 2)),
  });
  world.addBody(body);
  body.force = new CANNON.Vec3(-1000, 0, 0);

  return setUpdateWithPhysics({ mesh, body });
};