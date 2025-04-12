import * as THREE from "three";
import { startCameraAndControls } from "./three/camera";
import * as CANNON from "cannon";
import { MeshWithPhysics } from "./objects/types";
import { createSphere } from "./objects/sphere";
import { createPlane } from "./objects/plane";
import { createCube } from "./objects/cube";
import { createDice } from "./objects/dice";

const main = async () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("rgb(109,221,239)");

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  const { camera, setTarget: cameraSetTarget } = startCameraAndControls(renderer.domElement);

  const world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);

  const lights = createLights(world, scene);

  const plane = createPlane(world, scene);
  //const cube = createCube(world, );
  //const sphere = createSphere(world, scene);
  const dice = await createDice(world, scene);
  const pyshicsElements: MeshWithPhysics[] = [dice]

  const resizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  };

  const fixedTimeStep = 1.0 / 60.0; // seconds
  const maxSubSteps = 3;

  let lastTime: number;
  const physicsSimulationLoop = (time: number) => {
    requestAnimationFrame(physicsSimulationLoop);
    if (lastTime !== undefined) {
      var dt = (time - lastTime) / 1000;
      world.step(fixedTimeStep, dt, maxSubSteps);
    }
    lastTime = time;
    pyshicsElements.forEach(({ updateWithPhysics }) => updateWithPhysics());
  };

  const render = () => {
    cameraSetTarget(dice.mesh)
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
  requestAnimationFrame(physicsSimulationLoop);
};

const createLights = (world: CANNON.World, scene: THREE.Scene) => {
  const ambientColor = 0xffffff;
  const ambientIntensity = 2;
  const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
  scene.add(ambientLight);

  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(10, 20, 10);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  const lightSize = 50;
  const maxTextureSize = 5000;

  light.shadow.camera.left = -lightSize;
  light.shadow.camera.right = lightSize;
  light.shadow.camera.top = lightSize;
  light.shadow.camera.bottom = -lightSize;
  light.shadow.mapSize.width = maxTextureSize;
  light.shadow.mapSize.height = maxTextureSize;

  scene.add(light);
  scene.add(light.target);

  // Gizmo for showing light
  // const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
  // scene.add(cameraHelper);
};

main();
