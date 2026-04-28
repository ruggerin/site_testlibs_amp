"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface ZoomImageProps {
  src: string;
  alt: string;
  className?: string;        // classes do CONTAINER (aspect ratio, etc.)
  overlayClassName?: string; // classes do overlay opcional
  children?: React.ReactNode; // conteúdo sobre a imagem (caption, badge, etc.)
}

export default function ZoomImage({
  src,
  alt,
  className = "",
  overlayClassName = "",
  children,
}: ZoomImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleEnter = () => {
    gsap.to(imgRef.current, {
      scale: 1.12,
      duration: 0.7,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.9,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ willChange: "transform" }}
    >
      {/* A imagem escala SEM estourar o container pois overflow: hidden está no pai */}
      <Image
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={imgRef as any}
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        style={{ transformOrigin: "center center" }}
        unoptimized
      />

      {/* Overlay escuro sutil — clareia um pouco no hover via transição CSS */}
      {overlayClassName && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${overlayClassName}`} />
      )}

      {/* Conteúdo opcional (caption, badge, etc.) */}
      {children && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-4">
          {children}
        </div>
      )}
    </div>
  );
}
