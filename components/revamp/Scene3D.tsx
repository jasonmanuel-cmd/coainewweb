"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export function Scene3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Brain-shaped orb ─────────────────────────────────────────────────────
    // Multiple overlapping noise frequencies create cortex-fold–like ridges
    const brainGeo = new THREE.IcosahedronGeometry(1.3, 80);
    const brainMat = new THREE.ShaderMaterial({
      uniforms: {
        time:          { value: 0 },
        lightPos:      { value: new THREE.Vector3(2, 2, 4) },
        baseColor:     { value: new THREE.Color("#00FF88") },
        glowColor:     { value: new THREE.Color("#00FFCC") },
      },
      vertexShader: `
        uniform float time;
        varying vec3 vNormal;
        varying float vDisplace;

        // 3-D simplex noise (Ashima / Stefan Gustavson)
        vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
        vec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
        vec4 permute(vec4 x){return mod289v4(((x*34.)+1.)*x);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
        float snoise(vec3 v){
          const vec2 C=vec2(1./6.,1./3.);
          const vec4 D=vec4(0.,.5,1.,2.);
          vec3 i=floor(v+dot(v,C.yyy));
          vec3 x0=v-i+dot(i,C.xxx);
          vec3 g=step(x0.yzx,x0.xyz);
          vec3 l=1.-g;
          vec3 i1=min(g.xyz,l.zxy);
          vec3 i2=max(g.xyz,l.zxy);
          vec3 x1=x0-i1+C.xxx;
          vec3 x2=x0-i2+C.yyy;
          vec3 x3=x0-D.yyy;
          i=mod289v3(i);
          vec4 p=permute(permute(permute(
            i.z+vec4(0.,i1.z,i2.z,1.))
            +i.y+vec4(0.,i1.y,i2.y,1.))
            +i.x+vec4(0.,i1.x,i2.x,1.));
          float n_=0.142857142857;
          vec3 ns=n_*D.wyz-D.xzx;
          vec4 j=p-49.*floor(p*ns.z*ns.z);
          vec4 x_=floor(j*ns.z);
          vec4 y_=floor(j-7.*x_);
          vec4 x=x_*ns.x+ns.yyyy;
          vec4 y=y_*ns.x+ns.yyyy;
          vec4 h=1.-abs(x)-abs(y);
          vec4 b0=vec4(x.xy,y.xy);
          vec4 b1=vec4(x.zw,y.zw);
          vec4 s0=floor(b0)*2.+1.;
          vec4 s1=floor(b1)*2.+1.;
          vec4 sh=-step(h,vec4(0.));
          vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
          vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
          vec3 p0=vec3(a0.xy,h.x);
          vec3 p1=vec3(a0.zw,h.y);
          vec3 p2=vec3(a1.xy,h.z);
          vec3 p3=vec3(a1.zw,h.w);
          vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
          p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
          vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
          m=m*m;
          return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        // 4 octaves of noise → deep cortex folds
        float brainNoise(vec3 p, float t){
          float n = 0.0;
          n += 0.50 * snoise(p * 1.8 + t * 0.12);   // large lobes
          n += 0.25 * snoise(p * 3.6 + t * 0.18);   // gyri / sulci
          n += 0.12 * snoise(p * 7.2 + t * 0.22);   // fine wrinkles
          n += 0.06 * snoise(p * 14.4 + t * 0.30);  // micro texture
          return n;
        }

        // Hemisphere bias: indent along Y to split left/right lobe
        float hemisphereBias(vec3 p){
          return 0.08 * smoothstep(-0.1, 0.1, p.x) * (1.0 - abs(p.x));
        }

        void main(){
          vNormal = normal;
          float d = brainNoise(position, time) * 0.38 - hemisphereBias(position);
          vDisplace = d;
          vec3 np = position + normal * d;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(np, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 lightPos;
        uniform vec3 baseColor;
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying float vDisplace;

        void main(){
          vec3 n  = normalize(vNormal);
          vec3 ld = normalize(lightPos);
          float diff = max(dot(n, ld), 0.0);

          // fresnel edge glow
          float fresnel = pow(1.0 - abs(dot(n, vec3(0.,0.,1.))), 2.5);

          // ridge highlights based on displacement
          float ridge = smoothstep(0.05, 0.18, vDisplace);

          vec3 col = mix(baseColor * 0.4, baseColor, diff)
                   + glowColor * fresnel * 0.7
                   + glowColor * ridge  * 0.3;

          float alpha = 0.55 + fresnel * 0.3;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      wireframe: true,
      transparent: true,
    });

    const brain = new THREE.Mesh(brainGeo, brainMat);
    // Slight Y elongation to match brain silhouette (taller than wide)
    brain.scale.set(0.92, 1.05, 0.82);
    scene.add(brain);

    // ── Outer glow membrane ──────────────────────────────────────────────────
    const glowGeo = new THREE.IcosahedronGeometry(1.55, 6);
    const glowMat = new THREE.MeshBasicMaterial({
      color: "#00FF88",
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // ── Circuit trace orbits ─────────────────────────────────────────────────
    function makeCircuitRing(radius: number, segments: number, color: string, opacity: number) {
      const pts: THREE.Vector3[] = [];
      // Random "stepped" circuit path around a sphere latitude
      let theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.6 + Math.PI * 0.2;
      for (let i = 0; i <= segments; i++) {
        theta += (Math.PI * 2) / segments + (Math.random() - 0.5) * 0.15;
        const r = radius + (Math.random() - 0.5) * 0.08;
        pts.push(new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) + (Math.random() - 0.5) * 0.05,
          r * Math.sin(phi) * Math.sin(theta)
        ));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      return new THREE.Line(geo, mat);
    }

    const circuitGroup = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      circuitGroup.add(makeCircuitRing(1.65 + i * 0.06, 24 + i * 4, "#00FF88", 0.18 - i * 0.015));
    }
    scene.add(circuitGroup);

    // ── Floating particles ───────────────────────────────────────────────────
    const pCount = 180;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 2.2 + Math.random() * 2.0;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      pPos[i*3]   = r * Math.sin(p) * Math.cos(t);
      pPos[i*3+1] = r * Math.sin(p) * Math.sin(t);
      pPos[i*3+2] = r * Math.cos(p);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: "#00FF88", size: 0.022, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Mouse tracking ───────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const target = { rx: 0, ry: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    // ── Animate ──────────────────────────────────────────────────────────────
    let frameId: number;
    const animate = (t: number) => {
      brainMat.uniforms.time.value = t * 0.0002;

      // Lazy follow mouse
      target.rx += (mouse.y * 0.3 - target.rx) * 0.05;
      target.ry += (mouse.x * 0.3 - target.ry) * 0.05;

      brain.rotation.x = target.rx;
      brain.rotation.y = target.ry + t * 0.00025;
      circuitGroup.rotation.y = t * 0.0003;
      circuitGroup.rotation.x = Math.sin(t * 0.0001) * 0.2;
      particles.rotation.y = t * 0.00015;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate(0);

    // ── Resize ───────────────────────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        // Offset brain to right-center so content on left stays readable
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    />
  );
}
