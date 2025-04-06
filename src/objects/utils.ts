import * as THREE from "three";
import * as CANNON from "cannon";
import { MeshWithPhysics } from "./types";

export const setUpdateWithPhysics = ({
  mesh,
  body,
}: {
  mesh: MeshWithPhysics["mesh"];
  body: MeshWithPhysics["body"];
}) => ({
  mesh,
  body,
  updateWithPhysics: () => {
    mesh.position.x = body.position.x;
    mesh.position.y = body.position.y;
    mesh.position.z = body.position.z;
    mesh.quaternion.x = body.quaternion.x;
    mesh.quaternion.y = body.quaternion.y;
    mesh.quaternion.z = body.quaternion.z;
    mesh.quaternion.w = body.quaternion.w;
  },
});
