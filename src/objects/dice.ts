import * as THREE from "three";
import * as CANNON from "cannon";
import { MeshWithPhysics } from "./types";
import { setUpdateWithPhysics } from "./utils";
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'

export const createDice = async (
  world: CANNON.World,
  scene: THREE.Scene
): Promise<MeshWithPhysics> => {
  const cubeSize = 4;
  const loader = new OBJLoader();
  const diceMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
  // load a resource
  const model = await loader.loadAsync(
    // resource URL
    "dice.obj",
    // called when resource is loaded
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    }
  );

  model.position.set(0, 20, 0);

  const body = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(
      model.position.x,
      model.position.y,
      model.position.z
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
    shape: new CANNON.Box(
      new CANNON.Vec3(cubeSize / 2, cubeSize / 2, cubeSize / 2)
    ),
  });
  world.addBody(body);
  body.force = new CANNON.Vec3(-2000, 0, 0);

  return setUpdateWithPhysics({ mesh: model, body });
};