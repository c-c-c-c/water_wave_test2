'use strict';

var scene = new THREE.Scene();
var plane = void 0;
var plane_god = void 0;
var controls = void 0;
var geometry = void 0;
var geometry_god = void 0;
var renderer = void 0;
var camera = void 0;
var model = [];
var SEGX = 11;
var SEGY = 11;
var startTime = new Date();
var rotate_speed = 0;

//let model = {};


var vm = new Vue({
		el: '#mycounter',
		data: {
				count: 0
		},
		methods: {
				countUp: function countUp() {
						this.count++;
						changeRotateSpeed();
				}
		}
});

var vm_stop = new Vue({
		el: '#mystop',
		methods: {
				hsStop: function hsStop() {
						Speed_0();
				}
		}
});

function renderFlag() {
		'use strict';

		var light = void 0;
		var ambient = void 0;
		var width = 1000;
		var height = 750;
		var modelPath = void 0;

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
		camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 14000);
		camera.position.set(0, 0, 1000);
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		//  camera.position.set(0, 400, 300);
		//  camera.lookAt(scene.position);

		// helper 現在は非表示
		var gridHelper = new THREE.GridHelper(200, 50);
		//  scene.add(gridHelper);
		var axisHelper = new THREE.AxisHelper(1000);
		//  scene.add(axisHelper);
		var lightHelper = new THREE.DirectionalLightHelper(light, 20);
		//  scene.add(lightHelper);

		//controls
		//controls = new THREE.OrbitControls(camera);
		//cameraの自動回転
		//  controls.autoRotate = true;
		//controls.autoRotateSpeed = 1.5;

		// renderer
		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(width, height);
		renderer.setClearColor(0xffffff);
		renderer.setPixelRatio(window.devicePixelRatio);
		document.getElementById('stage').appendChild(renderer.domElement);

		//var texture = new THREE.TextureLoader().load("./public/img/italy.jpg");
		//var texture = new THREE.TextureLoader().load("./public/img/dice.jpg");
		//テクスチャ読み込み
		var loader = new THREE.TextureLoader();
		//let texture=loader.load('./public/img/dice.jpg');
		loader.load('./public/img/bg_flag.png', function (texture) {
				geometry = new THREE.PlaneGeometry(973, 703, SEGX, SEGY);
				var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
				//let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
				//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
				//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
				plane = new THREE.Mesh(geometry, material);
				plane.scale.set(1.2, 1.2, 1.2);
				scene.add(plane);

				var loader2 = new THREE.TextureLoader();
				loader.load('./public/img/god.png', function (texture) {
						geometry_god = new THREE.PlaneGeometry(973, 703, SEGX, SEGY);
						var material_god = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
						//let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
						//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
						//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
						plane_god = new THREE.Mesh(geometry_god, material_god);
						plane_god.scale.set(0.7, 0.7, 0.7);

						scene.add(plane_god);
						render();
				});
		});

		//console.log(texture);
		//texture.needsUpdate = true;

		//	var geometry = new THREE.PlaneGeometry(1300, 1228, SEGX, SEGY);
}

function render() {

		plane.geometry.verticesNeedUpdate = true; //これを忘れずに書く
		plane_god.geometry.verticesNeedUpdate = true; //これを忘れずに書く
		var time = (new Date() - startTime) / 1000;

		for (var i = 0; i < SEGX + 1; i++) {
				for (var j = 0; j < SEGY + 1; j++) {
						//(i,j)のvertexを得る
						var index = j * (SEGX + 1) + i % (SEGX + 1);
						var vertex = plane.geometry.vertices[index];
						var vertex_god = plane_god.geometry.vertices[index];
						//時間経過と頂点の位置によって波を作る
						var amp = 100; //振幅
						vertex.z = amp * Math.sin(-i / 2 + time * 10);
						vertex_god.z = amp * Math.sin(-i / 2 + time * 10) + 200;
				}
		}

		plane_god.rotation.z += rotate_speed;

		requestAnimationFrame(render);
		//controls.update();
		renderer.render(scene, camera);
}

renderFlag();

function changeRotateSpeed() {
		//controls.autoRotateSpeed = vm.count*10;
		rotate_speed += vm.count * 0.01;
}

function Speed_0() {
		vm.count = 0;
		rotate_speed = 0;
		//addSpinner();
}
//# sourceMappingURL=script.js.map