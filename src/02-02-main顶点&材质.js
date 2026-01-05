import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

// 创建场景
const scene = new THREE.Scene();

//  创建相机
const camera = new THREE.PerspectiveCamera(
  45, // 视角
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
)

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)

// 创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cubeMateria2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cubeMateria3 = new THREE.MeshBasicMaterial({ color: 0x0ff000 });
const cubeMateria4 = new THREE.MeshBasicMaterial({ color: 0xfff000 });
const cubeMateria5 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cubeMateria6 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// 创建网格
// let parentCube = new THREE.Mesh(cubeGeometry, parentMaterial)
const cube = new THREE.Mesh(cubeGeometry, [cubeMaterial, cubeMateria2, cubeMateria3, cubeMateria4, cubeMateria5, cubeMateria6])
console.log(cubeGeometry)
// parentCube.add(cube)
// parentCube.position.set(0, 0, 0)
// parentCube.scale.set(2,2,2)
cube.position.set(3, 0, 0)

// parentCube.rotation.x = Math.PI / 4
// cube.rotation.x = Math.PI / 4
// 设置立方体的放大
// cube.scale.set(2,2,2)

// 将网格添加到场景中
scene.add(cube);

// 创建几何体 - 三角形
const geometry = new THREE.BufferGeometry();
// 创建顶点数组数据，每个顶点由3个坐标值组成，逆时针为正面，顺时针为反面
// const vertices = new Float32Array([
//   -1.0,-1.0,0.0,  1.0,-1.0,0.0,  1.0,1.0,0.0,
//   1.0,1.0,0.0, -1.0,1.0,0.0, -1.0,-1.0,0.0
// ])
// 创建顶点属性
// geometry.setAttribute('position',new THREE.BufferAttribute(vertices,3))
// 使用索引绘制
const vertices = new Float32Array([
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0
])
// 创建顶点属性
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
// 创建索引数组数据，每个索引值表示一个三角形的三个顶点
const indices = new Uint16Array([
  0, 1, 2, 2, 3, 0
])
// 创建索引属性
geometry.setIndex(new THREE.BufferAttribute(indices, 1))
console.log(geometry)

// 设置顶点组
geometry.addGroup(0, 3, 0)
geometry.addGroup(3, 3, 1)

// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  // size:THREE.DoubleSide
  wireframe: true
})
const material1 = new THREE.MeshBasicMaterial({
  color: 0xff0000
})

const plane = new THREE.Mesh(geometry, [material, material1])
// 将网格添加到场景中
scene.add(plane);

// 设置相机位置
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;
camera.lookAt(0, 0, 0)

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置带阻尼的惯性
controls.enableDamping = true;
// 设置阻尼系数
controls.dampingFactor = 0.01;
// 设置旋转速度
controls.autoRotate = true;

// 渲染函数
function animate() {
  requestAnimationFrame(animate);
  // 旋转
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
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

// var btn = document.createElement('button')
// btn.innerText = '点击全屏'
// btn.style.position = 'absolute'
// btn.style.top = '10px'
// btn.style.left = '10px'
// btn.style.zIndex = '999'
// btn.onclick = function(){
//   // 全屏
//   document.body.requestFullscreen() 
// }
// document.body.appendChild(btn)

// // 退出全屏
// var exitBtn = document.createElement('button')
// exitBtn.innerText = '退出全屏'
// exitBtn.style.position = 'absolute'
// exitBtn.style.top = '10px'
// exitBtn.style.left = '100px'
// exitBtn.style.zIndex = '999'
// exitBtn.onclick = function(){
//   // 退出全屏
//   document.exitFullscreen()
// }
// document.body.appendChild(exitBtn)

let eventObj = {
  // 点击全屏
  clickFullscreen: function () {
    document.body.requestFullscreen()
  },
  // 退出全屏
  exitFullscreen: function () {
    document.exitFullscreen()
  }
}

// 创建 GUI
const gui = new GUI()
// 添加按钮
gui.add(eventObj, 'clickFullscreen')
gui.add(eventObj, 'exitFullscreen')
// 控制立方体位置
// gui.add(cube.position,'x',-5,5).name('立方体X轴位置')
// let folder = gui.addFolder('立方体位置')
// folder.add(cube.position, 'x').min(-5).max(5).step(1).name('立方体X轴位置').onChange(val => {
//   console.log('立方体X轴位置，正在变化中………………', val)
// }).onFinishChange(val => {
//   console.log('立方体X轴位置，变化完成………………', val)
// })
// folder.add(cube.position, 'y').min(-5).max(5).step(1).name('立方体Y轴位置').onFinishChange(val => {
//   console.log('立方体YYY轴位置，变化完成………………', val)
// })
// folder.add(cube.position, 'z').min(-5).max(5).step(1).name('立方体Z轴位置')
// gui.add(parentMaterial, 'wireframe').name('父元素线框模式')
// let colorParams = {
//   cubeColor: '#00ff00'
// }
// gui.addColor(colorParams, 'cubeColor').name('立方体颜色').onChange(val => {
//   cube.material.color.set(val)
// })
