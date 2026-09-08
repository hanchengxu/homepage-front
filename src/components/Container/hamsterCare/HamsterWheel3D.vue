<template>
    <div ref="stage" class="wheel-stage">
        <!-- WebGL 不可用时回退到原来的静态跑轮图 -->
        <img v-if="failed" class="wheel-fallback"
            src="https://raw.githubusercontent.com/hanchengxu/picture-host/master/hamster-wheel.png" alt="hamster wheel">
    </div>
</template>
<script>
// three 体积较大，这里用动态 import，让它单独成 chunk、不拖慢首屏

// 配色（仿亚克力跑轮）
const C = {
    acrylic: 0x9fd6e8, // 亚克力（柔天蓝）
    wood: 0xd8a468,    // 轴心木盘
    fur: 0xfdfaf6,     // 白色仓鼠
    pink: 0xf5b7b1,    // 耳朵/鼻子
    eye: 0x4a3b30      // 眼睛
};

export default {
    name: 'HamsterWheel3D',
    props: {
        // 仓鼠开关；需要时父组件传 :show-hamster="true"
        showHamster: { type: Boolean, default: true }
    },
    data() {
        return { failed: false };
    },
    mounted() {
        this._alive = true;
        this.init();
    },
    beforeUnmount() {
        this._alive = false;
        this.destroy();
    },
    methods: {
        async init() {
            const stage = this.$refs.stage;
            if (!stage) return;

            let THREE;
            try {
                THREE = await import('three');
            } catch (e) {
                console.error('[HamsterWheel3D] three 加载失败（检查异步 chunk 是否 404）', e);
                this.failed = true;
                return;
            }
            // 组件可能在 three 加载完成前就被卸载
            if (!this._alive) return;

            let renderer;
            try {
                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            } catch (e) {
                console.error('[HamsterWheel3D] WebGL 初始化失败，回退静态图', e);
                this.failed = true;
                return;
            }
            const w = stage.clientWidth || 256;
            const h = stage.clientHeight || 256;
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.setSize(w, h);
            if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) {
                renderer.outputColorSpace = THREE.SRGBColorSpace;
            }
            stage.appendChild(renderer.domElement);

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
            camera.position.set(1.8, 2.2, 3.4);
            camera.lookAt(0, -0.2, 0);

            // 整体略微下移，构图更靠下
            scene.position.y = -0.28;

            // ---- 环境反射（亚克力质感的关键） ----
            try {
                const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
                const pmrem = new THREE.PMREMGenerator(renderer);
                scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
                pmrem.dispose();
            } catch (e) { /* 没有环境贴图也能跑，只是反射弱一点 */ }

            // 柔和光照
            scene.add(new THREE.HemisphereLight(0xfdf6e3, 0xd3e9f2, 1.0));
            const key = new THREE.DirectionalLight(0xffffff, 1.4);
            key.position.set(2.2, 3.2, 4);
            scene.add(key);
            const fill = new THREE.DirectionalLight(0xbfe3d0, 0.5);
            fill.position.set(-3, -1, 2.5);
            scene.add(fill);

            // ---- 材质 ----
            // 透明亚克力
            const acrylic = (opacity) => new THREE.MeshPhysicalMaterial({
                color: C.acrylic,
                metalness: 0,
                roughness: 0.06,
                transparent: true,
                opacity: opacity,
                side: THREE.DoubleSide,
                clearcoat: 1,
                clearcoatRoughness: 0.08,
                envMapIntensity: 1.25,
                depthWrite: false
            });
            const woodMat = new THREE.MeshStandardMaterial({ color: C.wood, roughness: 0.5, metalness: 0.02 });

            // ---- 跑轮：透明亚克力圆筒 ----
            const wheel = new THREE.Group();
            const R = 1.15;    // 轮半径
            const W = 0.55;    // 轮宽
            const drum = new THREE.Mesh(
                new THREE.CylinderGeometry(R, R, W, 64, 1, true),
                acrylic(0.2)
            );
            drum.rotation.x = Math.PI / 2; // 轴向转到 Z，正对观众
            wheel.add(drum);

            // 一圈竖向防滑细条（转动时让旋转更明显）
            const strutMat = acrylic(0.4);
            const strutGeo = new THREE.BoxGeometry(0.022, 0.05, W);
            const STRUCTS = 24;
            for (let i = 0; i < STRUCTS; i++) {
                const a = (i / STRUCTS) * Math.PI * 2;
                const s = new THREE.Mesh(strutGeo, strutMat);
                s.position.set(Math.cos(a) * R, Math.sin(a) * R, 0);
                s.rotation.z = a;
                wheel.add(s);
            }
            // 一根对比色标记条，作为旋转指示（像指针）
            const markMat = new THREE.MeshPhysicalMaterial({
                color: 0xff9e80, metalness: 0, roughness: 0.3,
                transparent: true, opacity: 0.9, clearcoat: 1
            });
            const mark = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, W), markMat);
            mark.position.set(R, 0, 0);
            wheel.add(mark);

            // 前后两圈细边（亚克力板的卷边）
            [-W / 2, W / 2].forEach((z) => {
                const edge = new THREE.Mesh(new THREE.TorusGeometry(R, 0.02, 8, 72), acrylic(0.45));
                edge.position.z = z;
                wheel.add(edge);
            });

            // 木色轴心圆盘（带一点厚度，固定在轮心）
            const hubDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.09, 32), woodMat);
            hubDisc.rotation.x = Math.PI / 2;
            hubDisc.position.z = -0.05;
            wheel.add(hubDisc);
            // 木盘上的偏心小旋钮，转动可读
            const knob = new THREE.Mesh(
                new THREE.CylinderGeometry(0.05, 0.05, 0.12, 16),
                new THREE.MeshStandardMaterial({ color: 0xb07d3e, roughness: 0.5 })
            );
            knob.rotation.x = Math.PI / 2;
            knob.position.set(0.2, 0, 0.02);
            wheel.add(knob);
            scene.add(wheel);

            // ---- 透明立柱（穿过轮心后方） ----
            const post = new THREE.Mesh(new THREE.BoxGeometry(0.16, 2.25, 0.16), acrylic(0.3));
            post.position.set(0, -0.32, -0.45);
            scene.add(post);

            // 轴：连接立柱与轮心木盘
            const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.4, 16), acrylic(0.4));
            axle.rotation.x = Math.PI / 2;
            axle.position.set(0, 0, -0.27);
            scene.add(axle);

            // ---- 透明底座 ----
            const base = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.08, 0.72), acrylic(0.32));
            base.position.set(0, -1.46, -0.15);
            scene.add(base);

            // 地面投影
            const shadow = new THREE.Mesh(
                new THREE.CircleGeometry(0.95, 32),
                new THREE.MeshBasicMaterial({ color: 0x9fc7b8, transparent: true, opacity: 0.14 })
            );
            shadow.rotation.x = -Math.PI / 2;
            shadow.position.set(0, -1.5, -0.15);
            scene.add(shadow);

            // ---- 散落的松子与坚果（地面点缀） ----
            const nutsGroup = new THREE.Group();
            const shellMat = new THREE.MeshStandardMaterial({ color: 0x9c6b3f, roughness: 0.85 });
            const pineMat = new THREE.MeshStandardMaterial({ color: 0xc9a26b, roughness: 0.8 });
            const capMat = new THREE.MeshStandardMaterial({ color: 0x6e4a2a, roughness: 0.9 });
            const makePineNut = () => {
                const g = new THREE.Group();
                const body = new THREE.Mesh(new THREE.SphereGeometry(0.06, 14, 10), pineMat);
                body.scale.set(0.55, 1.25, 0.55);
                g.add(body);
                const tip = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.09, 12), pineMat);
                tip.position.y = 0.085;
                g.add(tip);
                return g;
            };
            const makeNut = () => {
                const g = new THREE.Group();
                const body = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), shellMat);
                body.scale.set(1, 0.82, 1);
                g.add(body);
                const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 0.04, 14), capMat);
                cap.position.y = 0.055;
                g.add(cap);
                const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.05, 8), capMat);
                stem.position.y = 0.085;
                g.add(stem);
                return g;
            };
            const NUTS = 11;
            for (let i = 0; i < NUTS; i++) {
                const n = Math.random() < 0.5 ? makePineNut() : makeNut();
                const ang = (i / NUTS) * Math.PI * 2 + Math.random() * 0.6;
                const rad = 0.55 + Math.random() * 0.45;
                n.position.set(Math.cos(ang) * rad, -1.43 + Math.random() * 0.02, Math.sin(ang) * rad * 0.6 + 0.15);
                n.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
                n.scale.setScalar(0.8 + Math.random() * 0.5);
                nutsGroup.add(n);
            }
            scene.add(nutsGroup);

            // ---- 透明线框小老鼠（默认在轮里跑） ----
            const ham = new THREE.Group();
            const faceMat = new THREE.MeshStandardMaterial({
                color: 0xbfe3f0, transparent: true, opacity: 0.3,
                roughness: 0.4, metalness: 0, side: THREE.DoubleSide, depthWrite: false
            });
            const lineMat = new THREE.LineBasicMaterial({ color: 0x2b6f8a });
            const addPart = (geo, x, y, z, sx = 1, sy = 1, sz = 1) => {
                const m = new THREE.Mesh(geo, faceMat);
                m.position.set(x, y, z);
                m.scale.set(sx, sy, sz);
                m.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), lineMat));
                ham.add(m);
                return m;
            };
            // 身体（细长椭圆，横躺沿 X）
            addPart(new THREE.SphereGeometry(0.22, 18, 14), 0, 0, 0, 1.8, 1, 1);
            // 头（前方 +X，略尖）
            addPart(new THREE.SphereGeometry(0.13, 16, 12), 0.38, 0.05, 0);
            // 鼻尖
            addPart(new THREE.SphereGeometry(0.05, 12, 8), 0.54, 0.0, 0);
            // 大耳朵（扁圆，在头后上方）
            addPart(new THREE.SphereGeometry(0.08, 12, 8), 0.34, 0.18, 0.09, 1, 1, 0.35);
            addPart(new THREE.SphereGeometry(0.08, 12, 8), 0.34, 0.18, -0.09, 1, 1, 0.35);
            // 眼睛（小结构点）
            const eyeMat = new THREE.MeshStandardMaterial({ color: 0x163b4a });
            [[0.5, 0.07, 0.07], [0.5, 0.07, -0.07]].forEach((p) => {
                const e = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 6), eyeMat);
                e.position.set(p[0], p[1], p[2]);
                ham.add(e);
            });
            // 四条腿（带 pivot 供跑步摆动）
            const legs = [];
            const legGeo = new THREE.CylinderGeometry(0.028, 0.022, 0.22, 10);
            const legPos = [
                [0.24, -0.18, 0.12], [0.24, -0.18, -0.12],
                [-0.2, -0.18, 0.12], [-0.2, -0.18, -0.12]
            ];
            legPos.forEach((p) => {
                const pivot = new THREE.Group();
                pivot.position.set(p[0], p[1] + 0.11, p[2]);
                const leg = new THREE.Mesh(legGeo, faceMat);
                leg.position.y = -0.11;
                leg.add(new THREE.LineSegments(new THREE.EdgesGeometry(legGeo, 25), lineMat));
                pivot.add(leg);
                ham.add(pivot);
                legs.push(pivot);
            });
            // 长尾巴（细长曲线，向后 -X）
            const tailCurve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-0.36, 0, 0),
                new THREE.Vector3(-0.6, 0.08, 0),
                new THREE.Vector3(-0.78, 0.28, 0)
            ]);
            const tailGeo = new THREE.TubeGeometry(tailCurve, 24, 0.02, 8, false);
            const tail = new THREE.Mesh(tailGeo, faceMat);
            tail.add(new THREE.LineSegments(new THREE.EdgesGeometry(tailGeo, 18), lineMat));
            ham.add(tail);

            ham.position.set(0, -0.78, 0.02);
            ham.scale.setScalar(0.85);
            ham.visible = this.showHamster;
            scene.add(ham);

            // ---- 交互 ----
            const pointer = { x: 0, y: 0 };
            let targetSpeed = 1.5;
            const onMove = (e) => {
                const rect = stage.getBoundingClientRect();
                pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
            };
            const onEnter = () => { targetSpeed = 3.2; };
            const onLeave = () => { targetSpeed = 1.5; pointer.x = 0; pointer.y = 0; };
            stage.addEventListener('pointermove', onMove);
            stage.addEventListener('pointerenter', onEnter);
            stage.addEventListener('pointerleave', onLeave);
            this._handlers = [
                ['pointermove', onMove],
                ['pointerenter', onEnter],
                ['pointerleave', onLeave]
            ];

            // ---- 自适应尺寸 ----
            const resize = () => {
                const nw = stage.clientWidth;
                const nh = stage.clientHeight;
                if (!nw || !nh) return;
                camera.aspect = nw / nh;
                camera.updateProjectionMatrix();
                renderer.setSize(nw, nh);
            };
            const ro = window.ResizeObserver ? new ResizeObserver(resize) : null;
            if (ro) ro.observe(stage);
            else window.addEventListener('resize', resize);

            // ---- 动画 ----
            const clock = new THREE.Clock();
            let cur = targetSpeed;
            const tick = () => {
                this._raf = requestAnimationFrame(tick);
                if (document.hidden) return;
                const dt = Math.min(clock.getDelta(), 0.05);
                const t = clock.elapsedTime;
                cur += (targetSpeed - cur) * Math.min(1, dt * 3);
                // 轮子顺时针转
                wheel.rotation.z -= cur * dt;
                // 老鼠在轮内跑：四腿交替摆动 + 身体上下颠
                if (ham.visible) {
                    const run = t * cur * 6;
                    legs.forEach((leg, i) => {
                        const dir = i < 2 ? 1 : -1; // 前腿与后腿反相
                        leg.rotation.x = Math.sin(run + (i % 2) * Math.PI) * 0.5 * dir;
                    });
                    ham.position.y = -0.78 + Math.abs(Math.sin(run)) * 0.03;
                    ham.rotation.z = Math.sin(t * cur * 1.5) * 0.04;
                }
                // 轻微跟随鼠标 + 缓慢摆动
                const sway = Math.sin(t * 0.35) * 0.14;
                scene.rotation.y += (pointer.x * 0.28 + sway - scene.rotation.y) * Math.min(1, dt * 4);
                scene.rotation.x += (-pointer.y * 0.12 - scene.rotation.x) * Math.min(1, dt * 4);
                renderer.render(scene, camera);
            };
            tick();

            this._three = { renderer, scene, camera, stage, ro, resize };
        },
        destroy() {
            if (this._raf) {
                cancelAnimationFrame(this._raf);
                this._raf = null;
            }
            const t = this._three;
            if (!t) return;
            if (t.ro) t.ro.disconnect();
            else window.removeEventListener('resize', t.resize);
            (this._handlers || []).forEach((p) => t.stage.removeEventListener(p[0], p[1]));
            this._handlers = null;
            t.scene.traverse((o) => {
                if (o.geometry) o.geometry.dispose();
                if (o.material) {
                    (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
                }
            });
            if (t.scene.environment) t.scene.environment.dispose();
            t.renderer.dispose();
            const el = t.renderer.domElement;
            if (el && el.parentNode) el.parentNode.removeChild(el);
            this._three = null;
        }
    }
}
</script>
<style scoped>
.wheel-stage{
    width: 100%;
    height: 100%;
    position: relative;
}
.wheel-stage canvas{
    display: block;
    width: 100% !important;
    height: 100% !important;
}
.wheel-fallback{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>
