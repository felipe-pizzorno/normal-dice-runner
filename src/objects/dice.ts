import * as THREE from "three";
import * as CANNON from "cannon";
import { MeshWithPhysics } from "./types";
import { setUpdateWithPhysics } from "./utils";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
export const createDice = async (
  world: CANNON.World,
  scene: THREE.Scene
): Promise<any> => {
  const cubeSize = 4;
  const loader = new GLTFLoader();

  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
  loader.setDRACOLoader( dracoLoader );

  // load a resource
  // const { scene: model } = await loader.loadAsync(
  //   // resource URL
  //   "d202/scene.gltf",
  //   // called when resource is loaded
  //   function (xhr) {
  //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  //   }
  // );
  // model.position.set(0, 0, 0)
  // model.scale.set(0.01, 0.01, 0.01);
  // model.position.set(0, 5, 5)
  // model.castShadow = true
  // model.traverse(child => child.castShadow = true)
  // scene.add(model)

  const objLoader = new OBJLoader()
  const model = await objLoader.loadAsync(
    // resource URL
    "./assets/dice.obj",
    // called when resource is loaded
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    }
  );
  //model.scale.set(0.01, 0.01, 0.01);
  model.position.set(15, 5, -2)
  model.castShadow = true
  model.traverse(child => child.castShadow = true)
  scene.add(model)


  const body = new CANNON.Body({
    mass: 20,
    position: new CANNON.Vec3(
      model.position.x,
      model.position.y,
      model.position.z
    ),
    shape: new CANNON.ConvexPolyhedron(
      vertices.map(([x, y, z]) => new CANNON.Vec3(x, y, z)),
      faces
    ),
    // shape: new CANNON.Box(
    //   new CANNON.Vec3(cubeSize / 2, cubeSize / 2, cubeSize / 2)
    // ),
  });
  world.addBody(body);
  body.force = new CANNON.Vec3(-5500, -4000, 600);

  const rot = (Math.random() * 2) - 1
  body.applyLocalForce(new CANNON.Vec3(-1750), new CANNON.Vec3(3, 3, rot))

  return setUpdateWithPhysics({ mesh: model, body });
};

const vertices = [
  [0.000000, -0.525731, 0.850651],
  [0.850651, 0.000000, 0.525731],
  [0.850651, 0.000000, -0.525731],
  [-0.850651, 0.000000, -0.525731],
  [-0.850651, 0.000000, 0.525731],
  [-0.525731, 0.850651, 0.000000],
  [0.525731, 0.850651, 0.000000],
  [0.525731, -0.850651, 0.000000],
  [-0.525731, -0.850651, 0.000000],
  [0.000000, -0.525731, -0.850651],
  [0.000000, 0.525731, -0.850651],
  [0.000000, 0.525731, 0.850651]
];

const faces = [
  [1, 2, 6],
  [1, 7, 2],
  [3, 4, 5],
  [4, 3, 8],
  [6, 5, 11],
  [5, 6, 10],
  [9, 10, 2],
  [10, 9, 3],
  [7, 8, 9],
  [8, 7, 0],
  [11, 0, 1],
  [0, 11, 4],
  [6, 2, 10],
  [1, 6, 11],
  [3, 5, 10],
  [5, 4, 11],
  [2, 7, 9],
  [7, 1, 0],
  [3, 9, 8],
  [4, 8, 0],
];