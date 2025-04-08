import * as THREE from "three";
import * as CANNON from "cannon";
import { MeshWithPhysics } from "./types";
import { setUpdateWithPhysics } from "./utils";

export const createPlane = (world: CANNON.World, scene: THREE.Scene): MeshWithPhysics  => {
  const planeSize = 40;

  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    "./assets/floor-texture.png"
  );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  const repeats = planeSize / 2;
  texture.repeat.set(repeats, repeats);

  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.rotation.x = Math.PI * -0.5;
  mesh.receiveShadow = true;

  const body = new CANNON.Body({
    mass: 0, // mass == 0 makes the body static
  });
  const groundShape = new CANNON.Plane();
  body.addShape(groundShape);
  world.addBody(body);
  scene.add(mesh);

  body.position.x = mesh.position.x;
  body.position.y = mesh.position.y;
  body.position.z = mesh.position.z;
  body.quaternion.x = mesh.quaternion.x;
  body.quaternion.y = mesh.quaternion.y;
  body.quaternion.z = mesh.quaternion.z;
  body.quaternion.w = mesh.quaternion.w;

  return setUpdateWithPhysics({ mesh, body });
};
