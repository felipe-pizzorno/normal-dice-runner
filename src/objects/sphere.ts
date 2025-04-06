import * as THREE from "three";
import * as CANNON from "cannon";
import { MeshWithPhysics } from "./types";
import { setUpdateWithPhysics } from "./utils";

export const createSphere = (world: CANNON.World, scene: THREE.Scene): MeshWithPhysics => {
  const sphereRadius = 3;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereGeometry(
    sphereRadius,
    sphereWidthDivisions,
    sphereHeightDivisions
  );
  const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
  const mesh = new THREE.Mesh(sphereGeo, sphereMat);
  mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
  mesh.castShadow = true;
  scene.add(mesh);

  const body = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(
      mesh.position.x,
      mesh.position.y,
      mesh.position.z
    ),
    shape: new CANNON.Sphere(sphereRadius),
  });
  world.addBody(body);

  return setUpdateWithPhysics({ mesh, body });
};
