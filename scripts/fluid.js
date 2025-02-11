"use strict";const isFluidEnabled=localStorage.getItem("fluidEnabled")==="true";let canvas=document.createElement("canvas");canvas.style.display=isFluidEnabled?"block":"none",document.body.appendChild(canvas),resizeCanvas();let config={SIM_RESOLUTION:128,DYE_RESOLUTION:1024,CAPTURE_RESOLUTION:512,DENSITY_DISSIPATION:2.7,VELOCITY_DISSIPATION:.3,PRESSURE:.8,PRESSURE_ITERATIONS:20,CURL:0,SPLAT_RADIUS:.05,SPLAT_FORCE:6e3,SHADING:!0,COLORFUL:!1,FIXED_COLOR:{r:.2,g:.01,b:.4},COLOR_UPDATE_SPEED:10,PAUSED:!1,BACK_COLOR:{r:0,g:0,b:0},TRANSPARENT:!1,BLOOM:!0,BLOOM_ITERATIONS:5,BLOOM_RESOLUTION:256,BLOOM_INTENSITY:.05,BLOOM_THRESHOLD:1,BLOOM_SOFT_KNEE:.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:196,SUNRAYS_WEIGHT:.3};function pointerPrototype(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[30,0,300]}let pointers=[],splatStack=[];pointers.push(new pointerPrototype);const{gl,ext}=getWebGLContext(canvas);isMobile()&&(config.SPLAT_RADIUS=.15,config.DYE_RESOLUTION=384,config.SUNRAYS=!1,config.SHADING=!1,config.BLOOM=!1);function getWebGLContext(e){const r={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let t=e.getContext("webgl2",r);const i=!!t;i||(t=e.getContext("webgl",r)||e.getContext("experimental-webgl",r));let o,a;i?(t.getExtension("EXT_color_buffer_float"),a=t.getExtension("OES_texture_float_linear")):(o=t.getExtension("OES_texture_half_float"),a=t.getExtension("OES_texture_half_float_linear")),t.clearColor(0,0,0,1);const n=i?t.HALF_FLOAT:o.HALF_FLOAT_OES;let u,l,c;return i?(u=getSupportedFormat(t,t.RGBA16F,t.RGBA,n),l=getSupportedFormat(t,t.RG16F,t.RG,n),c=getSupportedFormat(t,t.R16F,t.RED,n)):(u=getSupportedFormat(t,t.RGBA,t.RGBA,n),l=getSupportedFormat(t,t.RGBA,t.RGBA,n),c=getSupportedFormat(t,t.RGBA,t.RGBA,n)),{gl:t,ext:{formatRGBA:u,formatRG:l,formatR:c,halfFloatTexType:n,supportLinearFiltering:a}}}function getSupportedFormat(e,r,t,i){if(!supportRenderTextureFormat(e,r,t,i))switch(r){case e.R16F:return getSupportedFormat(e,e.RG16F,e.RG,i);case e.RG16F:return getSupportedFormat(e,e.RGBA16F,e.RGBA,i);default:return null}return{internalFormat:r,format:t}}function supportRenderTextureFormat(e,r,t,i){let o=e.createTexture();e.bindTexture(e.TEXTURE_2D,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,t,i,null);let a=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}function isMobile(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0||/Mobi|Android/i.test(navigator.userAgent)}function captureScreenshot(){let e=getResolution(config.CAPTURE_RESOLUTION),r=createFBO(e.width,e.height,ext.formatRGBA.internalFormat,ext.formatRGBA.format,ext.halfFloatTexType,gl.NEAREST);render(r);let t=framebufferToTexture(r);t=normalizeTexture(t,r.width,r.height);let o=textureToCanvas(t,r.width,r.height).toDataURL();downloadURI("fluid.png",o),URL.revokeObjectURL(o)}function framebufferToTexture(e){gl.bindFramebuffer(gl.FRAMEBUFFER,e.fbo);let r=e.width*e.height*4,t=new Float32Array(r);return gl.readPixels(0,0,e.width,e.height,gl.RGBA,gl.FLOAT,t),t}function normalizeTexture(e,r,t){let i=new Uint8Array(e.length),o=0;for(let a=t-1;a>=0;a--)for(let n=0;n<r;n++){let u=a*r*4+n*4;i[u+0]=clamp01(e[o+0])*255,i[u+1]=clamp01(e[o+1])*255,i[u+2]=clamp01(e[o+2])*255,i[u+3]=clamp01(e[o+3])*255,o+=4}return i}function clamp01(e){return Math.min(Math.max(e,0),1)}function textureToCanvas(e,r,t){let i=document.createElement("canvas"),o=i.getContext("2d");i.width=r,i.height=t;let a=o.createImageData(r,t);return a.data.set(e),o.putImageData(a,0,0),i}function downloadURI(e,r){let t=document.createElement("a");t.download=e,t.href=r,document.body.appendChild(t),t.click(),document.body.removeChild(t)}class Material{constructor(r,t){this.vertexShader=r,this.fragmentShaderSource=t,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(r){let t=0;for(let o=0;o<r.length;o++)t+=hashCode(r[o]);let i=this.programs[t];if(i==null){let o=compileShader(gl.FRAGMENT_SHADER,this.fragmentShaderSource,r);i=createProgram(this.vertexShader,o),this.programs[t]=i}i!=this.activeProgram&&(this.uniforms=getUniforms(i),this.activeProgram=i)}bind(){gl.useProgram(this.activeProgram)}}class Program{constructor(r,t){this.uniforms={},this.program=createProgram(r,t),this.uniforms=getUniforms(this.program)}bind(){gl.useProgram(this.program)}}function createProgram(e,r){let t=gl.createProgram();return gl.attachShader(t,e),gl.attachShader(t,r),gl.linkProgram(t),gl.getProgramParameter(t,gl.LINK_STATUS)||console.trace(gl.getProgramInfoLog(t)),t}function getUniforms(e){let r=[],t=gl.getProgramParameter(e,gl.ACTIVE_UNIFORMS);for(let i=0;i<t;i++){let o=gl.getActiveUniform(e,i).name;r[o]=gl.getUniformLocation(e,o)}return r}function compileShader(e,r,t){r=addKeywords(r,t);const i=gl.createShader(e);return gl.shaderSource(i,r),gl.compileShader(i),gl.getShaderParameter(i,gl.COMPILE_STATUS)||console.trace(gl.getShaderInfoLog(i)),i}function addKeywords(e,r){if(r==null)return e;let t="";return r.forEach(i=>{t+="#define "+i+`
`}),t+e}const baseVertexShader=compileShader(gl.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),blurVertexShader=compileShader(gl.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),blurShader=compileShader(gl.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
        sum += texture2D(uTexture, vL) * 0.35294117;
        sum += texture2D(uTexture, vR) * 0.35294117;
        gl_FragColor = sum;
    }
`),copyShader=compileShader(gl.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`),clearShader=compileShader(gl.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`),colorShader=compileShader(gl.FRAGMENT_SHADER,`
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }
`),checkerboardShader=compileShader(gl.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;

    #define SCALE 25.0

    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`),displayShaderSource=`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;

    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
    #endif

    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif

    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif

    #ifdef BLOOM
        float noise = texture2D(uDithering, vUv * ditherScale).r;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`,bloomPrefilterShader=compileShader(gl.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`),bloomBlurShader=compileShader(gl.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`),bloomFinalShader=compileShader(gl.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`),sunraysMaskShader=compileShader(gl.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }
`),sunraysShader=compileShader(gl.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float weight;

    #define ITERATIONS 16

    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;

        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;

        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;

        float color = texture2D(uTexture, vUv).a;

        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }

        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
    }
`),splatShader=compileShader(gl.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`),advectionShader=compileShader(gl.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }`,ext.supportLinearFiltering?null:["MANUAL_FILTERING"]),divergenceShader=compileShader(gl.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`),curlShader=compileShader(gl.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`),vorticityShader=compileShader(gl.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`),pressureShader=compileShader(gl.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`),gradientSubtractShader=compileShader(gl.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`),blit=(gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer()),gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),gl.STATIC_DRAW),gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,gl.createBuffer()),gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),gl.STATIC_DRAW),gl.vertexAttribPointer(0,2,gl.FLOAT,!1,0,0),gl.enableVertexAttribArray(0),(e,r=!1)=>{e==null?(gl.viewport(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight),gl.bindFramebuffer(gl.FRAMEBUFFER,null)):(gl.viewport(0,0,e.width,e.height),gl.bindFramebuffer(gl.FRAMEBUFFER,e.fbo)),r&&(gl.clearColor(0,0,0,1),gl.clear(gl.COLOR_BUFFER_BIT)),gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)});function CHECK_FRAMEBUFFER_STATUS(){let e=gl.checkFramebufferStatus(gl.FRAMEBUFFER);e!=gl.FRAMEBUFFER_COMPLETE&&console.trace("Framebuffer error: "+e)}let dye,velocity,divergence,curl,pressure,bloom,bloomFramebuffers=[],sunrays,sunraysTemp,ditheringTexture=createTextureAsync("../assets/LDR_LLL1_0.png");const blurProgram=new Program(blurVertexShader,blurShader),copyProgram=new Program(baseVertexShader,copyShader),clearProgram=new Program(baseVertexShader,clearShader),colorProgram=new Program(baseVertexShader,colorShader),checkerboardProgram=new Program(baseVertexShader,checkerboardShader),bloomPrefilterProgram=new Program(baseVertexShader,bloomPrefilterShader),bloomBlurProgram=new Program(baseVertexShader,bloomBlurShader),bloomFinalProgram=new Program(baseVertexShader,bloomFinalShader),sunraysMaskProgram=new Program(baseVertexShader,sunraysMaskShader),sunraysProgram=new Program(baseVertexShader,sunraysShader),splatProgram=new Program(baseVertexShader,splatShader),advectionProgram=new Program(baseVertexShader,advectionShader),divergenceProgram=new Program(baseVertexShader,divergenceShader),curlProgram=new Program(baseVertexShader,curlShader),vorticityProgram=new Program(baseVertexShader,vorticityShader),pressureProgram=new Program(baseVertexShader,pressureShader),gradienSubtractProgram=new Program(baseVertexShader,gradientSubtractShader),displayMaterial=new Material(baseVertexShader,displayShaderSource);function initFramebuffers(){let e=getResolution(config.SIM_RESOLUTION),r=getResolution(config.DYE_RESOLUTION);const t=ext.halfFloatTexType,i=ext.formatRGBA,o=ext.formatRG,a=ext.formatR,n=ext.supportLinearFiltering?gl.LINEAR:gl.NEAREST;gl.disable(gl.BLEND),dye==null?dye=createDoubleFBO(r.width,r.height,i.internalFormat,i.format,t,n):dye=resizeDoubleFBO(dye,r.width,r.height,i.internalFormat,i.format,t,n),velocity==null?velocity=createDoubleFBO(e.width,e.height,o.internalFormat,o.format,t,n):velocity=resizeDoubleFBO(velocity,e.width,e.height,o.internalFormat,o.format,t,n),divergence=createFBO(e.width,e.height,a.internalFormat,a.format,t,gl.NEAREST),curl=createFBO(e.width,e.height,a.internalFormat,a.format,t,gl.NEAREST),pressure=createDoubleFBO(e.width,e.height,a.internalFormat,a.format,t,gl.NEAREST),initBloomFramebuffers(),initSunraysFramebuffers()}function initBloomFramebuffers(){let e=getResolution(config.BLOOM_RESOLUTION);const r=ext.halfFloatTexType,t=ext.formatRGBA,i=ext.supportLinearFiltering?gl.LINEAR:gl.NEAREST;bloom=createFBO(e.width,e.height,t.internalFormat,t.format,r,i),bloomFramebuffers.length=0;for(let o=0;o<config.BLOOM_ITERATIONS;o++){let a=e.width>>o+1,n=e.height>>o+1;if(a<2||n<2)break;let u=createFBO(a,n,t.internalFormat,t.format,r,i);bloomFramebuffers.push(u)}}function initSunraysFramebuffers(){let e=getResolution(config.SUNRAYS_RESOLUTION);const r=ext.halfFloatTexType,t=ext.formatR,i=ext.supportLinearFiltering?gl.LINEAR:gl.NEAREST;sunrays=createFBO(e.width,e.height,t.internalFormat,t.format,r,i),sunraysTemp=createFBO(e.width,e.height,t.internalFormat,t.format,r,i)}function createFBO(e,r,t,i,o,a){gl.activeTexture(gl.TEXTURE0);let n=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,n),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,a),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,a),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE),gl.texImage2D(gl.TEXTURE_2D,0,t,e,r,0,i,o,null);let u=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,u),gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,n,0),gl.viewport(0,0,e,r),gl.clear(gl.COLOR_BUFFER_BIT);let l=1/e,c=1/r;return{texture:n,fbo:u,width:e,height:r,texelSizeX:l,texelSizeY:c,attach(f){return gl.activeTexture(gl.TEXTURE0+f),gl.bindTexture(gl.TEXTURE_2D,n),f}}}function createDoubleFBO(e,r,t,i,o,a){let n=createFBO(e,r,t,i,o,a),u=createFBO(e,r,t,i,o,a);return{width:e,height:r,texelSizeX:n.texelSizeX,texelSizeY:n.texelSizeY,get read(){return n},set read(l){n=l},get write(){return u},set write(l){u=l},swap(){let l=n;n=u,u=l}}}function resizeFBO(e,r,t,i,o,a,n){let u=createFBO(r,t,i,o,a,n);return copyProgram.bind(),gl.uniform1i(copyProgram.uniforms.uTexture,e.attach(0)),blit(u),u}function resizeDoubleFBO(e,r,t,i,o,a,n){return e.width==r&&e.height==t||(e.read=resizeFBO(e.read,r,t,i,o,a,n),e.write=createFBO(r,t,i,o,a,n),e.width=r,e.height=t,e.texelSizeX=1/r,e.texelSizeY=1/t),e}function createTextureAsync(e){let r=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,r),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT),gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,1,1,0,gl.RGB,gl.UNSIGNED_BYTE,new Uint8Array([255,255,255]));let t={texture:r,width:1,height:1,attach(o){return gl.activeTexture(gl.TEXTURE0+o),gl.bindTexture(gl.TEXTURE_2D,r),o}},i=new Image;return i.onload=()=>{t.width=i.width,t.height=i.height,gl.bindTexture(gl.TEXTURE_2D,r),gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,i)},i.src=e,t}function updateKeywords(){let e=[];config.SHADING&&e.push("SHADING"),config.BLOOM&&e.push("BLOOM"),config.SUNRAYS&&e.push("SUNRAYS"),displayMaterial.setKeywords(e)}updateKeywords(),initFramebuffers(),multipleSplats(parseInt(Math.random()*20)+5);let lastUpdateTime=Date.now(),colorUpdateTimer=0;update();function update(){const e=calcDeltaTime();resizeCanvas()&&initFramebuffers(),updateColors(e),applyInputs(),config.PAUSED||step(e),render(null),requestAnimationFrame(update)}function calcDeltaTime(){let e=Date.now(),r=(e-lastUpdateTime)/1e3;return r=Math.min(r,.016666),lastUpdateTime=e,r}function resizeCanvas(){if(!canvas)return;let e=scaleByPixelRatio(canvas.clientWidth),r=scaleByPixelRatio(canvas.clientHeight);return canvas.width!=e||canvas.height!=r?(canvas.width=e,canvas.height=r,!0):!1}function updateColors(e){config.COLORFUL&&(colorUpdateTimer+=e*config.COLOR_UPDATE_SPEED,colorUpdateTimer>=1&&(colorUpdateTimer=wrap(colorUpdateTimer,0,1),pointers.forEach(r=>{r.color=generateColor()})))}function applyInputs(){splatStack.length>0&&multipleSplats(splatStack.pop()),pointers.forEach(e=>{e.moved&&(e.moved=!1,splatPointer(e))})}function step(e){gl.disable(gl.BLEND),curlProgram.bind(),gl.uniform2f(curlProgram.uniforms.texelSize,velocity.texelSizeX,velocity.texelSizeY),gl.uniform1i(curlProgram.uniforms.uVelocity,velocity.read.attach(0)),blit(curl),vorticityProgram.bind(),gl.uniform2f(vorticityProgram.uniforms.texelSize,velocity.texelSizeX,velocity.texelSizeY),gl.uniform1i(vorticityProgram.uniforms.uVelocity,velocity.read.attach(0)),gl.uniform1i(vorticityProgram.uniforms.uCurl,curl.attach(1)),gl.uniform1f(vorticityProgram.uniforms.curl,config.CURL),gl.uniform1f(vorticityProgram.uniforms.dt,e),blit(velocity.write),velocity.swap(),divergenceProgram.bind(),gl.uniform2f(divergenceProgram.uniforms.texelSize,velocity.texelSizeX,velocity.texelSizeY),gl.uniform1i(divergenceProgram.uniforms.uVelocity,velocity.read.attach(0)),blit(divergence),clearProgram.bind(),gl.uniform1i(clearProgram.uniforms.uTexture,pressure.read.attach(0)),gl.uniform1f(clearProgram.uniforms.value,config.PRESSURE),blit(pressure.write),pressure.swap(),pressureProgram.bind(),gl.uniform2f(pressureProgram.uniforms.texelSize,velocity.texelSizeX,velocity.texelSizeY),gl.uniform1i(pressureProgram.uniforms.uDivergence,divergence.attach(0));for(let t=0;t<config.PRESSURE_ITERATIONS;t++)gl.uniform1i(pressureProgram.uniforms.uPressure,pressure.read.attach(1)),blit(pressure.write),pressure.swap();gradienSubtractProgram.bind(),gl.uniform2f(gradienSubtractProgram.uniforms.texelSize,velocity.texelSizeX,velocity.texelSizeY),gl.uniform1i(gradienSubtractProgram.uniforms.uPressure,pressure.read.attach(0)),gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity,velocity.read.attach(1)),blit(velocity.write),velocity.swap(),advectionProgram.bind(),gl.uniform2f(advectionProgram.uniforms.texelSize,velocity.texelSizeX,velocity.texelSizeY),ext.supportLinearFiltering||gl.uniform2f(advectionProgram.uniforms.dyeTexelSize,velocity.texelSizeX,velocity.texelSizeY);let r=velocity.read.attach(0);gl.uniform1i(advectionProgram.uniforms.uVelocity,r),gl.uniform1i(advectionProgram.uniforms.uSource,r),gl.uniform1f(advectionProgram.uniforms.dt,e),gl.uniform1f(advectionProgram.uniforms.dissipation,config.VELOCITY_DISSIPATION),blit(velocity.write),velocity.swap(),ext.supportLinearFiltering||gl.uniform2f(advectionProgram.uniforms.dyeTexelSize,dye.texelSizeX,dye.texelSizeY),gl.uniform1i(advectionProgram.uniforms.uVelocity,velocity.read.attach(0)),gl.uniform1i(advectionProgram.uniforms.uSource,dye.read.attach(1)),gl.uniform1f(advectionProgram.uniforms.dissipation,config.DENSITY_DISSIPATION),blit(dye.write),dye.swap()}function render(e){config.BLOOM&&applyBloom(dye.read,bloom),config.SUNRAYS&&(applySunrays(dye.read,dye.write,sunrays),blur(sunrays,sunraysTemp,1)),e==null||!config.TRANSPARENT?(gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA),gl.enable(gl.BLEND)):gl.disable(gl.BLEND),config.TRANSPARENT||drawColor(e,normalizeColor(config.BACK_COLOR)),e==null&&config.TRANSPARENT&&drawCheckerboard(e),drawDisplay(e)}function drawColor(e,r){colorProgram.bind(),gl.uniform4f(colorProgram.uniforms.color,r.r,r.g,r.b,1),blit(e)}function drawCheckerboard(e){checkerboardProgram.bind(),gl.uniform1f(checkerboardProgram.uniforms.aspectRatio,canvas.width/canvas.height),blit(e)}function drawDisplay(e){let r=e==null?gl.drawingBufferWidth:e.width,t=e==null?gl.drawingBufferHeight:e.height;if(displayMaterial.bind(),config.SHADING&&gl.uniform2f(displayMaterial.uniforms.texelSize,1/r,1/t),gl.uniform1i(displayMaterial.uniforms.uTexture,dye.read.attach(0)),config.BLOOM){gl.uniform1i(displayMaterial.uniforms.uBloom,bloom.attach(1)),gl.uniform1i(displayMaterial.uniforms.uDithering,ditheringTexture.attach(2));let i=getTextureScale(ditheringTexture,r,t);gl.uniform2f(displayMaterial.uniforms.ditherScale,i.x,i.y)}config.SUNRAYS&&gl.uniform1i(displayMaterial.uniforms.uSunrays,sunrays.attach(3)),blit(e)}function applyBloom(e,r){if(bloomFramebuffers.length<2)return;let t=r;gl.disable(gl.BLEND),bloomPrefilterProgram.bind();let i=config.BLOOM_THRESHOLD*config.BLOOM_SOFT_KNEE+1e-4,o=config.BLOOM_THRESHOLD-i,a=i*2,n=.25/i;gl.uniform3f(bloomPrefilterProgram.uniforms.curve,o,a,n),gl.uniform1f(bloomPrefilterProgram.uniforms.threshold,config.BLOOM_THRESHOLD),gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture,e.attach(0)),blit(t),bloomBlurProgram.bind();for(let u=0;u<bloomFramebuffers.length;u++){let l=bloomFramebuffers[u];gl.uniform2f(bloomBlurProgram.uniforms.texelSize,t.texelSizeX,t.texelSizeY),gl.uniform1i(bloomBlurProgram.uniforms.uTexture,t.attach(0)),blit(l),t=l}gl.blendFunc(gl.ONE,gl.ONE),gl.enable(gl.BLEND);for(let u=bloomFramebuffers.length-2;u>=0;u--){let l=bloomFramebuffers[u];gl.uniform2f(bloomBlurProgram.uniforms.texelSize,t.texelSizeX,t.texelSizeY),gl.uniform1i(bloomBlurProgram.uniforms.uTexture,t.attach(0)),gl.viewport(0,0,l.width,l.height),blit(l),t=l}gl.disable(gl.BLEND),bloomFinalProgram.bind(),gl.uniform2f(bloomFinalProgram.uniforms.texelSize,t.texelSizeX,t.texelSizeY),gl.uniform1i(bloomFinalProgram.uniforms.uTexture,t.attach(0)),gl.uniform1f(bloomFinalProgram.uniforms.intensity,config.BLOOM_INTENSITY),blit(r)}function applySunrays(e,r,t){gl.disable(gl.BLEND),sunraysMaskProgram.bind(),gl.uniform1i(sunraysMaskProgram.uniforms.uTexture,e.attach(0)),blit(r),sunraysProgram.bind(),gl.uniform1f(sunraysProgram.uniforms.weight,config.SUNRAYS_WEIGHT),gl.uniform1i(sunraysProgram.uniforms.uTexture,r.attach(0)),blit(t)}function blur(e,r,t){blurProgram.bind();for(let i=0;i<t;i++)gl.uniform2f(blurProgram.uniforms.texelSize,e.texelSizeX,0),gl.uniform1i(blurProgram.uniforms.uTexture,e.attach(0)),blit(r),gl.uniform2f(blurProgram.uniforms.texelSize,0,e.texelSizeY),gl.uniform1i(blurProgram.uniforms.uTexture,r.attach(0)),blit(e)}function splatPointer(e){let r=e.deltaX*config.SPLAT_FORCE,t=e.deltaY*config.SPLAT_FORCE;splat(e.texcoordX,e.texcoordY,r,t,e.color)}function multipleSplats(e){for(let r=0;r<e;r++){const t=generateColor();t.r*=10,t.g*=10,t.b*=10;const i=Math.random(),o=Math.random(),a=1e3*(Math.random()-.5),n=1e3*(Math.random()-.5);splat(i,o,a,n,t)}}function splat(e,r,t,i,o){splatProgram.bind(),gl.uniform1i(splatProgram.uniforms.uTarget,velocity.read.attach(0)),gl.uniform1f(splatProgram.uniforms.aspectRatio,canvas.width/canvas.height),gl.uniform2f(splatProgram.uniforms.point,e,r),gl.uniform3f(splatProgram.uniforms.color,t,i,0),gl.uniform1f(splatProgram.uniforms.radius,correctRadius(config.SPLAT_RADIUS/100)),blit(velocity.write),velocity.swap(),gl.uniform1i(splatProgram.uniforms.uTarget,dye.read.attach(0)),gl.uniform3f(splatProgram.uniforms.color,o.r,o.g,o.b),blit(dye.write),dye.swap()}function correctRadius(e){let r=canvas.width/canvas.height;return r>1&&(e*=r),e}canvas.addEventListener("mousedown",e=>{let r=scaleByPixelRatio(e.offsetX),t=scaleByPixelRatio(e.offsetY),i=pointers.find(o=>o.id==-1);i==null&&(i=new pointerPrototype,pointers.push(i)),updatePointerDownData(i,-1,r,t)}),window.addEventListener("mousemove",e=>{let r=scaleByPixelRatio(e.clientX),t=scaleByPixelRatio(e.clientY),i=pointers[0];i||(i=new pointerPrototype,pointers.push(i)),updatePointerMoveData(i,r,t)}),window.addEventListener("mouseup",()=>{updatePointerUpData(pointers[0])}),window.addEventListener("touchstart",e=>{e.target===canvas&&e.preventDefault();const r=e.targetTouches;for(;r.length>=pointers.length;)pointers.push(new pointerPrototype);for(let t=0;t<r.length;t++){let i=scaleByPixelRatio(r[t].pageX),o=scaleByPixelRatio(r[t].pageY-window.scrollY);updatePointerDownData(pointers[t+1],r[t].identifier,i,o)}},{passive:!1}),window.addEventListener("touchmove",e=>{e.target===canvas&&e.preventDefault();const r=e.targetTouches;for(let t=0;t<r.length;t++){let i=pointers[t+1];if(!i.down)continue;let o=scaleByPixelRatio(r[t].pageX),a=scaleByPixelRatio(r[t].pageY-window.scrollY);updatePointerMoveData(i,o,a)}},{passive:!1}),window.addEventListener("touchend",e=>{const r=e.changedTouches;for(let t=0;t<r.length;t++){let i=pointers.find(o=>o.id==r[t].identifier);i!=null&&updatePointerUpData(i)}});function updatePointerDownData(e,r,t,i){e.id=r,e.down=!0,e.moved=!1,e.texcoordX=t/canvas.width,e.texcoordY=1-i/canvas.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=generateColor()}function updatePointerMoveData(e,r,t){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=r/canvas.width,e.texcoordY=1-t/canvas.height,e.deltaX=correctDeltaX(e.texcoordX-e.prevTexcoordX),e.deltaY=correctDeltaY(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.moved&&(e.color=generateColor())}function updatePointerUpData(e){e.down=!1}function correctDeltaX(e){let r=canvas.width/canvas.height;return r<1&&(e*=r),e}function correctDeltaY(e){let r=canvas.width/canvas.height;return r>1&&(e/=r),e}function generateColor(){if(!config.COLORFUL)return{r:config.FIXED_COLOR.r,g:config.FIXED_COLOR.g,b:config.FIXED_COLOR.b};let e=HSVtoRGB(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}function HSVtoRGB(e,r,t){let i,o,a,n,u,l,c,f;switch(n=Math.floor(e*6),u=e*6-n,l=t*(1-r),c=t*(1-u*r),f=t*(1-(1-u)*r),n%6){case 0:i=t,o=f,a=l;break;case 1:i=c,o=t,a=l;break;case 2:i=l,o=t,a=f;break;case 3:i=l,o=c,a=t;break;case 4:i=f,o=l,a=t;break;case 5:i=t,o=l,a=c;break}return{r:i,g:o,b:a}}function normalizeColor(e){return{r:e.r/255,g:e.g/255,b:e.b/255}}function wrap(e,r,t){let i=t-r;return i==0?r:(e-r)%i+r}function getResolution(e){let r=gl.drawingBufferWidth/gl.drawingBufferHeight;r<1&&(r=1/r);let t=Math.round(e),i=Math.round(e*r);return gl.drawingBufferWidth>gl.drawingBufferHeight?{width:i,height:t}:{width:t,height:i}}function getTextureScale(e,r,t){return{x:r/e.width,y:t/e.height}}function scaleByPixelRatio(e){let r=window.devicePixelRatio||1;return Math.floor(e*r)}function hashCode(e){if(e.length==0)return 0;let r=0;for(let t=0;t<e.length;t++)r=(r<<5)-r+e.charCodeAt(t),r|=0;return r}
