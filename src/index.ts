import { greet } from "./import"
import * as THREE from "three";
import { startCameraAndControls } from "./three/camera"

const main = () => {


  const scene = new THREE.Scene()
  scene.background = new THREE.Color( 'black' )

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const {camera, controls} = startCameraAndControls(renderer.domElement);

{

		const planeSize = 40;

		const loader = new THREE.TextureLoader();
		const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		texture.colorSpace = THREE.SRGBColorSpace;
		const repeats = planeSize / 2;
		texture.repeat.set( repeats, repeats );

		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
		const planeMat = new THREE.MeshPhongMaterial( {
			map: texture,
			side: THREE.DoubleSide,
		} );
		const mesh = new THREE.Mesh( planeGeo, planeMat );
		mesh.rotation.x = Math.PI * - .5;
		scene.add( mesh );

	}

	{

		const cubeSize = 4;
		const cubeGeo = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
		const cubeMat = new THREE.MeshPhongMaterial( { color: '#8AC' } );
		const mesh = new THREE.Mesh( cubeGeo, cubeMat );
		mesh.position.set( cubeSize + 1, cubeSize / 2, 0 );
		scene.add( mesh );

	}

	{

		const sphereRadius = 3;
		const sphereWidthDivisions = 32;
		const sphereHeightDivisions = 16;
		const sphereGeo = new THREE.SphereGeometry( sphereRadius, sphereWidthDivisions, sphereHeightDivisions );
		const sphereMat = new THREE.MeshPhongMaterial( { color: '#CA8' } );
		const mesh = new THREE.Mesh( sphereGeo, sphereMat );
		mesh.position.set( - sphereRadius - 1, sphereRadius + 2, 0 );
		scene.add( mesh );

	}

	{

		const color = 0xFFFFFF;
		const intensity = 1;
		const light = new THREE.AmbientLight( color, intensity );
		scene.add( light );

	}

	const resizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {
			renderer.setSize( width, height, false );
		}

		return needResize;
	}

	function render() {
		if ( resizeRendererToDisplaySize( renderer ) ) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		renderer.render( scene, camera );
		requestAnimationFrame( render );
	}

	requestAnimationFrame(render);
}

main()
