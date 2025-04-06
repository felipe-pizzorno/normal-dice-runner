import * as THREE from "three";
import * as CANNON from "cannon";

export const setUpdateWithPhysics = ({
  mesh,
  body,
}: {
  mesh: THREE.Mesh;
  body: CANNON.Body;
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
