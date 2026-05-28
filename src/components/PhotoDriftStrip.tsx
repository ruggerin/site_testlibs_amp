"use client";

import ZoomImage from "@/components/ZoomImage";

export type PhotoDriftItem = { src: string; label: string };

/** Deslocamento vertical alternado — centro da fileira “flutua” para fora da margem. */
const Y_OFFSET = [
  "translate-y-6 md:translate-y-8",
  "-translate-y-10 md:-translate-y-14",
  "translate-y-4 md:translate-y-6",
  "-translate-y-8 md:-translate-y-11",
  "translate-y-7 md:translate-y-9",
] as const;

type PhotoDriftStripProps = {
  photos: PhotoDriftItem[];
};

function DriftRow({
  items,
  className,
  rowClassName,
}: {
  items: PhotoDriftItem[];
  className: string;
  rowClassName?: string;
}) {
  return (
    <div className={`${className} flex w-max gap-2.5 will-change-transform sm:gap-3 md:gap-4`}>
      {items.map((photo, i) => (
        <div
          key={photo.src}
          className={`shrink-0 w-[46vw] max-w-[300px] sm:w-[32vw] sm:max-w-[280px] md:w-[24vw] md:max-w-[320px] ${Y_OFFSET[i % Y_OFFSET.length]} ${rowClassName ?? ""}`}
        >
          <ZoomImage
            src={photo.src}
            alt={photo.label}
            className="w-full aspect-[4/5]"
            overlayClassName="bg-black/20"
          />
        </div>
      ))}
    </div>
  );
}

/** Duas faixas horizontais — animadas com GSAP xPercent na página (Horizontal Drift). */
export default function PhotoDriftStrip({ photos }: PhotoDriftStripProps) {
  const mid = Math.ceil(photos.length / 2);
  const rowTop = photos.slice(0, mid);
  const rowBottom = photos.slice(mid);

  return (
    <div
      className="photo-drift-gallery relative flex flex-col gap-3 sm:gap-4 md:gap-5"
      aria-label="Galeria de fotos da equipe"
    >
      <DriftRow
        items={rowTop}
        className="photo-drift-l"
        rowClassName="first:ml-0"
      />
      <DriftRow
        items={rowBottom}
        className="photo-drift-r ml-auto"
        rowClassName="last:mr-0"
      />
    </div>
  );
}
