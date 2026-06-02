import Image from "next/image";

interface ZoomImageProps {
  src: string;
  alt: string;
  className?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
}

export default function ZoomImage({
  src,
  alt,
  className = "",
  overlayClassName = "",
  children,
}: ZoomImageProps) {
  return (
    <div className={`hover-zoom-media relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />

      {overlayClassName ? (
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${overlayClassName}`}
        />
      ) : null}

      {children ? (
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-4">
          {children}
        </div>
      ) : null}
    </div>
  );
}
