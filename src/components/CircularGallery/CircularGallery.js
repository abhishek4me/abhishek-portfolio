import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef, useCallback, useState } from "react";
import "./CircularGallery.css";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createTextTexture(gl, text, font = "bold 30px monospace", color = "black") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  constructor({ gl, plane, renderer, text, textColor = "#545050", font = "30px sans-serif" }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    try {
      const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
      const geometry = new Plane(this.gl);
      const program = new Program(this.gl, {
        vertex: `
          attribute vec3 position;
          attribute vec2 uv;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragment: `
          precision highp float;
          uniform sampler2D tMap;
          varying vec2 vUv;
          void main() {
            vec4 color = texture2D(tMap, vUv);
            if (color.a < 0.1) discard;
            gl_FragColor = color;
          }
        `,
        uniforms: { tMap: { value: texture } },
        transparent: true,
      });
      this.mesh = new Mesh(this.gl, { geometry, program });
      const aspect = width / height;
      const textHeight = this.plane.scale.y * 0.15;
      const textWidth = textHeight * aspect;
      this.mesh.scale.set(textWidth, textHeight, 1);
      this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
      this.mesh.setParent(this.plane);
    } catch (error) {
      console.warn('Failed to create title mesh:', error);
    }
  }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
    onCertificateClick, // **NEW: Click handler**
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.onCertificateClick = onCertificateClick; // **NEW**
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    try {
      const texture = new Texture(this.gl, { generateMipmaps: false });
      this.program = new Program(this.gl, {
        depthTest: false,
        depthWrite: false,
        vertex: `
          precision highp float;
          attribute vec3 position;
          attribute vec2 uv;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          uniform float uTime;
          uniform float uSpeed;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 p = position;
            p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragment: `
          precision highp float;
          uniform vec2 uImageSizes;
          uniform vec2 uPlaneSizes;
          uniform sampler2D tMap;
          uniform float uBorderRadius;
          varying vec2 vUv;
          
          float roundedBoxSDF(vec2 p, vec2 b, float r) {
            vec2 d = abs(p) - b;
            return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
          }
          
          void main() {
            vec2 ratio = vec2(
              min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
              min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
            );
            vec2 uv = vec2(
              vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
              vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
            );
            vec4 color = texture2D(tMap, uv);
            
            float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
            if(d > 0.0) {
              discard;
            }
            
            gl_FragColor = vec4(color.rgb, 1.0);
          }
        `,
        uniforms: {
          tMap: { value: texture },
          uPlaneSizes: { value: [0, 0] },
          uImageSizes: { value: [0, 0] },
          uSpeed: { value: 0 },
          uTime: { value: 100 * Math.random() },
          uBorderRadius: { value: this.borderRadius },
        },
        transparent: true,
      });

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = this.image;
      img.onload = () => {
        texture.image = img;
        this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      };
      img.onerror = (error) => {
        console.warn('Failed to load image:', this.image, error);
      };
    } catch (error) {
      console.warn('Failed to create shader for media:', error);
    }
  }

  createMesh() {
    try {
      this.plane = new Mesh(this.gl, {
        geometry: this.geometry,
        program: this.program,
      });
      this.plane.setParent(this.scene);
      
      // **NEW: Store certificate data for click detection**
      this.plane.userData = {
        image: this.image,
        text: this.text,
        index: this.index
      };
    } catch (error) {
      console.warn('Failed to create mesh:', error);
    }
  }

  createTitle() {
    try {
      this.title = new Title({
        gl: this.gl,
        plane: this.plane,
        renderer: this.renderer,
        text: this.text,
        textColor: this.textColor,
        font: this.font,
      });
    } catch (error) {
      console.warn('Failed to create title:', error);
    }
  }

  update(scroll, direction) {
    if (!this.plane) return;
    
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    if (this.program && this.program.uniforms) {
      this.program.uniforms.uTime.value += 0.04;
      this.program.uniforms.uSpeed.value = this.speed;
    }

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane && this.plane.program && this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }
    
    this.scale = this.screen.height / 1200;
    
    const baseWidth = 900;
    const baseHeight = 600;
    
    if (this.plane) {
      this.plane.scale.x = (this.viewport.width * (baseWidth * this.scale)) / this.screen.width;
      this.plane.scale.y = (this.viewport.height * (baseHeight * this.scale)) / this.screen.height;
      
      const aspectRatio = baseWidth / baseHeight;
      if (this.plane.scale.x / this.plane.scale.y < aspectRatio) {
        this.plane.scale.y = this.plane.scale.x / aspectRatio;
      } else {
        this.plane.scale.x = this.plane.scale.y * aspectRatio;
      }
      
      if (this.plane.program && this.plane.program.uniforms.uPlaneSizes) {
        this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
      }
    }
    
    this.padding = 2;
    this.width = (this.plane ? this.plane.scale.x : 0) + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  constructor(
    container,
    {
      items,
      bend,
      textColor = "#ffffff",
      borderRadius = 0,
      font = "bold 30px Figtree",
      scrollSpeed = 2,
      scrollEase = 0.05,
      onCertificateClick, // **NEW: Click handler**
    } = {}
  ) {
    if (!container) {
      console.error('Container is required for CircularGallery');
      return;
    }

    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.onCertificateClick = onCertificateClick; // **NEW**
    
    try {
      this.createRenderer();
      this.createCamera();
      this.createScene();
      this.onResize();
      this.createGeometry();
      this.createMedias(items, bend, textColor, borderRadius, font);
      this.update();
      this.addEventListeners();
    } catch (error) {
      console.error('Failed to initialize CircularGallery:', error);
    }
  }

  createRenderer() {
    try {
      this.renderer = new Renderer({ alpha: true });
      this.gl = this.renderer.gl;
      this.gl.clearColor(0, 0, 0, 0);
      this.container.appendChild(this.gl.canvas);
      
      // **NEW: Make canvas clickable**
      this.gl.canvas.style.cursor = 'pointer';
    } catch (error) {
      console.error('Failed to create renderer:', error);
      throw error;
    }
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 40;
    this.camera.position.z = 18;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    try {
      this.planeGeometry = new Plane(this.gl, {
        heightSegments: 50,
        widthSegments: 100,
      });
    } catch (error) {
      console.error('Failed to create geometry:', error);
    }
  }

  createMedias(items, bend = 1, textColor, borderRadius, font) {
    const defaultItems = [
      { image: `https://picsum.photos/900/600?grayscale&random=1`, text: "Certificate 1" },
      { image: `https://picsum.photos/900/600?grayscale&random=2`, text: "Certificate 2" },
      { image: `https://picsum.photos/900/600?grayscale&random=3`, text: "Certificate 3" },
      { image: `https://picsum.photos/900/600?grayscale&random=4`, text: "Certificate 4" },
    ];
    
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = galleryItems.concat(galleryItems);
    
    try {
      this.medias = this.mediasImages.map((data, index) => {
        return new Media({
          geometry: this.planeGeometry,
          gl: this.gl,
          image: data.image,
          index,
          length: this.mediasImages.length,
          renderer: this.renderer,
          scene: this.scene,
          screen: this.screen,
          text: data.text,
          viewport: this.viewport,
          bend,
          textColor,
          borderRadius,
          font,
          onCertificateClick: this.onCertificateClick, // **NEW**
        });
      });
    } catch (error) {
      console.error('Failed to create medias:', error);
    }
  }

  // **NEW: Click detection method**
  onCanvasClick(e) {
    if (!this.medias || !this.onCertificateClick) return;

    const rect = this.gl.canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Simple click detection based on certificate positions
    const clickThreshold = 0.5;
    
    this.medias.forEach((media) => {
      if (!media.plane) return;
      
      const planeX = media.plane.position.x;
      const planeY = media.plane.position.y;
      
      // Convert world coordinates to screen coordinates (simplified)
      const screenX = (planeX / this.viewport.width) * 2;
      const screenY = (planeY / this.viewport.height) * 2;
      
      const distance = Math.sqrt((x - screenX) ** 2 + (y - screenY) ** 2);
      
      if (distance < clickThreshold) {
        this.onCertificateClick({
          image: media.image,
          text: media.text,
          index: media.index
        });
      }
    });
  }

  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
    this.dragDistance = 0; // **NEW: Track drag distance**
  }

  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.dragDistance = Math.abs(distance); // **NEW: Track drag distance**
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp(e) {
    this.isDown = false;
    
    // **NEW: Only trigger click if drag distance is small**
    if (this.dragDistance < 10) {
      this.onCanvasClick(e);
    }
    
    this.onCheck();
  }

  onWheel(e) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    if (!this.container) return;
    
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    
    if (this.renderer) {
      this.renderer.setSize(this.screen.width, this.screen.height);
    }
    
    if (this.camera) {
      this.camera.perspective({
        aspect: this.screen.width / this.screen.height,
      });
    }
    
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    
    if (this.medias) {
      this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  update() {
    if (!this.renderer || !this.scene || !this.camera) return;
    
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    
    try {
      this.renderer.render({ scene: this.scene, camera: this.camera });
    } catch (error) {
      console.warn('Render error:', error);
    }
    
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnCanvasClick = this.onCanvasClick.bind(this); // **NEW**
    
    window.addEventListener("resize", this.boundOnResize);
    window.addEventListener("mousewheel", this.boundOnWheel);
    window.addEventListener("wheel", this.boundOnWheel);
    window.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    window.addEventListener("touchstart", this.boundOnTouchDown);
    window.addEventListener("touchmove", this.boundOnTouchMove);
    window.addEventListener("touchend", this.boundOnTouchUp);
  }

  destroy() {
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
    }
    
    if (this.boundOnResize) window.removeEventListener("resize", this.boundOnResize);
    if (this.boundOnWheel) {
      window.removeEventListener("mousewheel", this.boundOnWheel);
      window.removeEventListener("wheel", this.boundOnWheel);
    }
    if (this.boundOnTouchDown) window.removeEventListener("mousedown", this.boundOnTouchDown);
    if (this.boundOnTouchMove) window.removeEventListener("mousemove", this.boundOnTouchMove);
    if (this.boundOnTouchUp) window.removeEventListener("mouseup", this.boundOnTouchUp);
    if (this.boundOnTouchDown) window.removeEventListener("touchstart", this.boundOnTouchDown);
    if (this.boundOnTouchMove) window.removeEventListener("touchmove", this.boundOnTouchMove);
    if (this.boundOnTouchUp) window.removeEventListener("touchend", this.boundOnTouchUp);
    
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

// **NEW: Certificate Modal Component**
const CertificateModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <div className="certificate-modal-overlay" onClick={onClose}>
      <div className="certificate-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="certificate-modal-close" onClick={onClose}>
          ×
        </button>
        <div className="certificate-modal-image-container">
          <img 
            src={certificate.image} 
            alt={certificate.text}
            className="certificate-modal-image"
          />
        </div>
        <div className="certificate-modal-info">
          <h3>{certificate.text}</h3>
        </div>
      </div>
    </div>
  );
};

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 24px Figtree",
  scrollSpeed = 2,
  scrollEase = 0.05,
}) {
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null); // **NEW: Modal state**
  
  // **NEW: Handle certificate click**
  const handleCertificateClick = useCallback((certificateData) => {
    setSelectedCertificate(certificateData);
  }, []);

  // **NEW: Handle modal close**
  const handleCloseModal = useCallback(() => {
    setSelectedCertificate(null);
  }, []);
  
  const initializeApp = useCallback(() => {
    if (!containerRef.current || appRef.current) return;
    
    try {
      appRef.current = new App(containerRef.current, { 
        items, 
        bend, 
        textColor, 
        borderRadius, 
        font, 
        scrollSpeed, 
        scrollEase,
        onCertificateClick: handleCertificateClick // **NEW: Pass click handler**
      });
    } catch (error) {
      console.error('Failed to initialize CircularGallery app:', error);
    }
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, handleCertificateClick]);

  const destroyApp = useCallback(() => {
    if (appRef.current) {
      appRef.current.destroy();
      appRef.current = null;
    }
  }, []);
  
  useEffect(() => {
    const timeoutId = setTimeout(initializeApp, 100);
    
    return () => {
      clearTimeout(timeoutId);
      destroyApp();
    };
  }, [initializeApp, destroyApp]);
  
  return (
    <>
      <div 
        className="circular-gallery" 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: '300px'
        }} 
      />
      
      {/* **NEW: Certificate Modal** */}
      <CertificateModal 
        certificate={selectedCertificate} 
        onClose={handleCloseModal} 
      />
    </>
  );
}
