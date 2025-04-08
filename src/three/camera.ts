import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const startCameraAndControls = (canvas: HTMLCanvasElement) => {
  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    near,
    far
  );
  camera.position.set( 0, 10, 20 );

  const controls = new OrbitControls( camera, canvas );
  controls.target.set( 0, 5, 0 );
  controls.update();
  return {camera, controls}
}
