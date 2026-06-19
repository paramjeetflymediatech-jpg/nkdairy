'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Center } from '@react-three/drei';
import { Loader2 } from 'lucide-react';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// Fallback spinner inside the Canvas (using standard HTML overlay absolute positioning)
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/10 backdrop-blur-sm rounded-2xl z-10">
      <Loader2 className="animate-spin text-[#323373] mb-3" size={36} />
      <p className="text-sm font-semibold text-[#323373]">Loading 3D Machinery Model...</p>
      <p className="text-xs text-gray-500 mt-1">Please wait while downloading assets</p>
    </div>
  );
}

export default function Product3DViewer({ modelUrl }: { modelUrl: string }) {
  if (!modelUrl) return null;

  return (
    <div className="relative w-full h-full min-h-[350px] md:min-h-[450px] bg-slate-50 border border-gray-100 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
      
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          shadows 
          camera={{ position: [0, 0, 10], fov: 45 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Ambient & directional background lighting */}
          <ambientLight intensity={0.6} />
          
          {/* Stage automatically centers, scales, and handles professional studio lighting & shadows */}
          <Stage 
            intensity={1.2} 
            environment="studio" 
            shadows={{ type: 'contact', opacity: 0.6, blur: 1.5 }}
            adjustCamera
          >
            <Center>
              <Model url={modelUrl} />
            </Center>
          </Stage>

          {/* Orbit controls with limits to keep viewport clean */}
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            minDistance={2} 
            maxDistance={25}
            maxPolarAngle={Math.PI / 1.8} // prevent looking too far below the floor
            makeDefault 
          />
        </Canvas>
      </Suspense>

      {/* Control Tips overlay */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-gray-100 text-[10px] text-[#323373] font-bold uppercase tracking-wider flex items-center gap-2 pointer-events-none select-none shadow-sm">
        <span>🖱️ Drag to Rotate</span>
        <span className="text-gray-300">|</span>
        <span>⚙️ Scroll to Zoom</span>
      </div>
    </div>
  );
}
