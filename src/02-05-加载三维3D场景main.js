import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { DRACOLoader } from 'three/examples/jsm/Addons.js';

// 创建场景
const scene = new THREE.Scene();

//  创建相机
const camera = new THREE.PerspectiveCamera(
  45, // 视角
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 设置相机位置
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;
camera.lookAt(0, 0, 0)

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置带阻尼的惯性
controls.enableDamping = true;
// 设置阻尼系数
controls.dampingFactor = 0.01;
// 设置旋转速度
// controls.autoRotate = true;

// 渲染函数
function animate() {
  // 更新轨道控制器
  controls.update();
  requestAnimationFrame(animate);
  // 渲染
  renderer.render(scene, camera)
}
animate()

// 监听窗口变化
window.addEventListener('resize', () => {
  // 重置渲染器宽高比
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 重置相机宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  //更新相机投影矩阵
  camera.updateProjectionMatrix()
})

let params = {};

// 创建 GUI
const gui = new GUI()

// 创建场景雾 fog
scene.fog = new THREE.Fog(0x999999, 0.1, 50)
// 创建场景指数雾 fog
// scene.fog = new THREE.FogExp2( 0x999999, 0.1 )
scene.background = new THREE.Color(0x999999)

// 实例化加载器 gltf
const gltfLoader = new GLTFLoader();
// 加载模型
gltfLoader.load(
  // 资源路径
  './model/Duck.glb',
  // 加载成功回调
  function (gltf) {
    console.log(gltf)
    scene.add(gltf.scene);
  },
  // 加载进度回调
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  // 加载失败回调
  function (error) {
    console.log('An error happened');
  }
);

// 实例化加载器 draco
const dracoLoader = new DRACOLoader();
// 设置 draco 路径
dracoLoader.setDecoderPath('./draco/');
// 设置 gltf 加载器 draco 解码器
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load(
  // 资源路径
  './model/city.glb',
  // 加载成功回调
  function (gltf) {
    console.log(gltf)
    scene.add(gltf.scene);
  },
  // 加载进度回调
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  // 加载失败回调
  function (error) {
    console.log('An error happened');
  }
);

// 加载环境贴图
let rgbeLoader = new RGBELoader();
rgbeLoader.load("./texture/Alex_Hart-Nature_Lab_Bones_2k.hdr", function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});