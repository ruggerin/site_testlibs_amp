import Image from "next/image";
import { figmaAspect } from "@/lib/figma-scale";

/** sec2 — Figma 2:715 (2×945×940 + 1920×1080). */
export default function CaseDetailGallery({
  images,
}: {
  images: [string, string, string];
}) {
  const [left, right, full] = images;

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
          <div
            className="relative w-full bg-[#D9D9D9]"
            style={{ aspectRatio: figmaAspect(945, 940) }}
          >
            <Image src={left} alt="" fill className="object-cover" sizes="50vw" />
          </div>
          <div
            className="relative w-full bg-[#D9D9D9]"
            style={{ aspectRatio: figmaAspect(945, 940) }}
          >
            <Image src={right} alt="" fill className="object-cover" sizes="50vw" />
          </div>
        </div>
        <div
          className="relative w-full bg-[#D9D9D9]"
          style={{ aspectRatio: figmaAspect(1920, 1080) }}
        >
          <Image src={full} alt="" fill className="object-cover" sizes="100vw" />
        </div>
      </div>
    </section>
  );
}
