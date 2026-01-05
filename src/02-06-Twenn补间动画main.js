import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { DRACOLoader } from 'three/examples/jsm/Addons.js';
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';

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
camera.position.z = 15;
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
  // 更新tween
  TWEEN.update();
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

// 创建 GUI
const gui = new GUI()

// 创建 1 个球
const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
// sphere1.position.set(-2, 1, 0)
sphere1.position.x = 0
scene.add(sphere1)

// 创建补间对象
const tween = new TWEEN.Tween(sphere1.position)
  .to({ x: 4 }, 1000).onUpdate(() => {
    // 每次补间更新时，都打印当前位置
    console.log(sphere1.position);
  }) // 1 秒内将 x 坐标移动到 4
  // .repeat(Infinity) // 无限循环
  // .yoyo(true) // 往返运动
  // .delay(3000) // 3 秒后开始
  .easing(TWEEN.Easing.Quadratic.InOut) // 缓动函数


const tween2 = new TWEEN.Tween(sphere1.position).to({ y: -4 }, 1000)

tween.chain(tween2)
tween2.chain(tween)

tween.start(); //启动补间动画

tween.onStart(() => {
  console.log('补间动画开始');
})
.onComplete(() => {
  console.log('补间动画完成');
})
.onStop(() => {
  console.log('补间动画停止');
})
.onUpdate(() => {
  console.log('补间动画更新');
})
let params = {
  stop: () => {
    tween.stop();
  }
}
gui.add(params, 'stop').name('停止补间动画');

