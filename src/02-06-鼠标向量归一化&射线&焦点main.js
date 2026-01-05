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

// 创建三个球
const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
// sphere1.position.set(-2, 1, 0)
sphere1.position.x = 0
scene.add(sphere1)

const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
// sphere2.position.set(2, 1, 0)
sphere2.position.x = -4
scene.add(sphere2)

const sphere3 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
// sphere3.position.set(0, -1, 0)
sphere3.position.x = 4
scene.add(sphere3)

// 创建射线
const raycaster = new THREE.Raycaster();
// 创建鼠标向量
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  // console.log(event.clientX, event.clientY)
  // 鼠标位置归一化到[-1, 1]
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // console.log(mouse.x, mouse.y)

  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera);

  // 计算物体和射线的焦点
  const intersects = raycaster.intersectObjects([sphere1, sphere2, sphere3]);
  console.log(intersects)

  if (intersects.length > 0) {
    //  console.log(intersects[0].object)
    // 第一个交点的物体
    if (intersects[0].object._isSelect) {
      intersects[0].object.material.color.set(intersects[0].object._originColor)
      intersects[0].object._isSelect = false
      return;
    }
    intersects[0].object._isSelect = true
    intersects[0].object._originColor = intersects[0].object.material.color.getHex();
    intersects[0].object.material.color.set(0xff0000)

  }
});