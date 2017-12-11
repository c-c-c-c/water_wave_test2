

let scene = new THREE.Scene();
let plane;
let plane_god;
let controls;
let geometry;
let geometry_god;
let renderer;
let camera;
let model = [];
let SEGX = 6;
let SEGY = 6;
let startTime = new Date();
let rotate_speed = 0;

let count = 1;
let target_v = 1;
//let model = {};


let vm = new Vue({
  el: '#mycounter',
  data: {
    count: 0
  },
  methods: {
    countUp: function() {
            this.count++;
            	changeRotateSpeed ();
      }
  }
});

let vm_stop = new Vue({
  el: '#mystop',
  methods: {
    hsStop: function() {
            Speed_0();
    }
  }
});

function renderFlag () {
  'use strict';
  let light;
  let ambient;
  let width = 1000;
  let height = 750;
	let modelPath ;

   //light
	 //light = new THREE.PointLight(0xffffff,2);
	 //light.position.set(100,0,300);
	 //scene.add(light);

  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(100, 0, 300);
  scene.add(light);
/*
  ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);
*/
	//camera
  //camera = new THREE.PerspectiveCamera(45, width /　height, 1 , 1000);
	camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 4000);
	camera.position.set(0,0,1000);
  camera.lookAt(new THREE.Vector3(0,0,0));

//  camera.position.set(0, 400, 300);
//  camera.lookAt(scene.position);

  // helper 現在は非表示
  let gridHelper = new THREE.GridHelper(200, 50);
  scene.add(gridHelper);
  let axisHelper = new THREE.AxisHelper(1000);
  scene.add(axisHelper);
  let lightHelper = new THREE.DirectionalLightHelper(light , 20)
  scene.add(lightHelper);

  //controls
  controls = new THREE.OrbitControls(camera);
  //cameraの自動回転
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5;

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true  });
  renderer.setSize(width, height);
  renderer.setClearColor(0xffffff);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('stage').appendChild(renderer.domElement);

	//var texture = new THREE.TextureLoader().load("./public/img/italy.jpg");
	//var texture = new THREE.TextureLoader().load("./public/img/dice.jpg");
	//テクスチャ読み込み
	let loader = new THREE.TextureLoader();
	//let texture=loader.load('./public/img/dice.jpg');
	// loader.load('./public/img/yoko.jpg', (texture) => {
	loader.load('./public/img/yoko.jpg', (texture) => {
		geometry = new THREE.PlaneGeometry(973, 703, SEGX, SEGY);
		//let geometry = new THREE.PlaneGeometry( 5, 20, 32 );

		texture.minFilter = THREE.LinearFilter;
		let material = new THREE.MeshBasicMaterial({map:texture, transparent:true} );
		//let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
		//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
		//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
		plane = new THREE.Mesh(geometry, material);
		let helper = new THREE.VertexNormalsHelper( plane, 2, 0xee0000, 1 );
		scene.add(helper);
		// let helper_wier = new THREE.WireframeGeometry( plane, 20, 0xee0000, 1 );
		// scene.add(helper_wier);

		let wireframe = new THREE.WireframeGeometry( geometry );
		let line = new THREE.LineSegments( wireframe );
		line.material.depthTest = false;
		line.material.opacity = 1;
		line.material.transparent = true;
		scene.add( new THREE.BoxHelper( line ) );
		scene.add( line );


		let fnh = new THREE.FaceNormalsHelper( plane, 5 );
		scene.add( fnh );



		scene.add(plane);


		let loader2 = new THREE.TextureLoader();
		loader.load('./public/img/flag_moyo.png', (texture) => {
			geometry_god = new THREE.PlaneGeometry(973, 703, SEGX, SEGY);
			let material_god = new THREE.MeshBasicMaterial({map:texture, transparent:true} );
			//let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
			//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
			//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
			plane_god = new THREE.Mesh(geometry_god, material_god);
			plane_god.scale.set(0.7, 0.7, 0.7);

			//scene.add(plane_god);
			render();
		});
	});
	//console.log(texture);
	//texture.needsUpdate = true;
	//var geometry = new THREE.PlaneGeometry(1300, 1228, SEGX, SEGY);
}

function render () {

	plane.geometry.verticesNeedUpdate=true;//これを忘れずに書く
	plane_god.geometry.verticesNeedUpdate=true;//これを忘れずに書く
	let time = (new Date() - startTime)/1000;


	//任意のバーテックスを変える
　count++;


	if (480 % count == 0 ){
		target_v++;
		console.log(target_v);
		let vertex =	plane.geometry.vertices[target_v];
		vertex.z = 50;
		let before_vertex =	plane.geometry.vertices[target_v - 1];
		before_vertex.z = 0;
	}

//  	for (let i=0;i<SEGX+1;i++) {
//  		for (let j=0;j<SEGY+1;j++) {
//  			//(i,j)のvertexを得る
//  			let index = j * (SEGX + 1) + i % (SEGX + 1);
//  			let vertex = plane.geometry.vertices[index];
// // //			let vertex_god = plane_god.geometry.vertices[index];
//  			//時間経過と頂点の位置によって波を作る
//  			let amp=100;//振幅
//  			//vertex.z = amp * Math.sin( -i/2 + time*10 );
//  			// vertex_god.z = amp * Math.sin( -i/2 + time*10) + 200;
//  		}
//  	}

	plane_god.rotation.z += rotate_speed;
  requestAnimationFrame(render);
	//controls.update();
  renderer.render(scene, camera);
}

renderFlag();

function changeRotateSpeed () {
  //controls.autoRotateSpeed = vm.count*10;
 	rotate_speed -= vm.count*0.01;
}

function Speed_0 () {
  vm.count = 0;
  rotate_speed = 0;
 	//addSpinner();
}
