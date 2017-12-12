'use strict';

// シーンの作成
var scene = new THREE.Scene();
// カメラの作成
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// レンダラーの作成（アンチエイリアス有効）
var renderer = new THREE.WebGLRenderer({ antialias: true });
// レンダラーが描画するキャンバスサイズの設定
renderer.setSize(window.innerWidth, window.innerHeight);
// キャンバスをDOMツリーに追加
document.body.appendChild(renderer.domElement);

// 環境光の作成
var light = new THREE.AmbientLight(0xffffff); // soft white light
// 環境光をシーンに追加
scene.add(light);

// TrackballControlsインスタンス作成
//var controls = new THREE.TrackballControls( camera );

// ジオメトリの作成
// PlaneGeometry(width, height, widthSegments, heightSegments)
// width: 横の長さ（x軸）
// height 縦の長さ（y軸）
// widthSegments: 横の分割数（デフォルト1）
// heightSegments: 縦の分割数（デフォルト1）
var geometry = new THREE.PlaneGeometry(4, 3, 32, 32);

// マテリアルの作成
var material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('./public/img/water.jpg'), color: 0xffffff });
// オブジェクトの作成
var plane = new THREE.Mesh(geometry, material);
// オブジェクトをシーンに追加
scene.add(plane);

// カメラ位置調整
camera.position.z = 2;

// 減衰率
var mu0 = 1;
// 減衰係数
var mu = 1.0;

function calcDisp(r, time) {
	return 0.2 * Math.sin(2 * Math.PI * (r * 2 - time));
}
function render() {
	// requestAnimationFrameで自分自身を呼び出し続けることでレンダリングを繰り返す
	requestAnimationFrame(render);

	var time = Date.now() * 0.0001;
	var data = [];
	var vertices = plane.geometry.vertices;

	// 	頂点情報のx、y座標から計算した中心からの距離と時間情報をもとにz軸上のずれを計算
	for (var i = 0; i < vertices.length; i++) {
		var pos = new THREE.Vector2(vertices[i].x, vertices[i].y);
		data[i] = mu * calcDisp(pos.length(), time);
	}

	// 減衰係数を減らしていくことで波紋の振幅を徐々に減衰させる
	mu *= mu0;

	// 計算結果を頂点情報に反映させる
	for (var i = 0; i < data.length; i++) {
		vertices[i].z = data[i];
	}
	plane.geometry.verticesNeedUpdate = true;

	// レンダリング（表示）
	renderer.render(scene, camera);
}
render();
//# sourceMappingURL=script.js.map