import * as THREE from "three";
import * as CANNON from "cannon";
import { MeshWithPhysics } from "./types";
import { setUpdateWithPhysics } from "./utils";

export const createCube = (world: CANNON.World, scene: THREE.Scene): MeshWithPhysics => {
  const cubeSize = 4;
  const pointPosition = cubeSize / 2;
  const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
  const mesh = new THREE.Mesh(cubeGeo, cubeMat);
  mesh.position.set(cubeSize + 1, cubeSize + 10, 0);
  mesh.castShadow = true;
  scene.add(mesh);

  const body = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(
      mesh.position.x,
      mesh.position.y,
      mesh.position.z
    ),
    // shape: new CANNON.ConvexPolyhedron(
    //   [
    //     new CANNON.Vec3(-pointPosition, -pointPosition, -pointPosition),
    //     new CANNON.Vec3(-pointPosition, -pointPosition, pointPosition),
    //     new CANNON.Vec3(-pointPosition, pointPosition, -pointPosition),
    //     new CANNON.Vec3(-pointPosition, pointPosition, pointPosition),
    //     new CANNON.Vec3(pointPosition, -pointPosition, -pointPosition),
    //     new CANNON.Vec3(pointPosition, -pointPosition, pointPosition),
    //     new CANNON.Vec3(pointPosition, pointPosition, -pointPosition),
    //     new CANNON.Vec3(pointPosition, pointPosition, pointPosition),
    //   ],
    //   [
    //     [0, 6, 4],
    //     [0, 2, 6],
    //     [0, 3, 2],
    //     [0, 1, 3],
    //     [2, 7, 6],
    //     [2, 3, 7],
    //     [4, 6, 7],
    //     [4, 7, 5],
    //     [0, 4, 5],
    //     [0, 5, 1],
    //     [1, 5, 7],
    //     [1, 7, 3],
    //   ]
    // ),
    shape: new CANNON.Box(new CANNON.Vec3(cubeSize / 2, cubeSize / 2, cubeSize / 2)),
  });
  world.addBody(body);
  body.force = new CANNON.Vec3(-2000, 0, 0);

  return setUpdateWithPhysics({ mesh, body });
};