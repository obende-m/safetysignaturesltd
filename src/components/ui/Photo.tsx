import Image from "next/image";
import { images, type ImageKey } from "@/content/images";

/** A photograph that fills its frame without distortion, cropped around its focal point. */
export function Photo({
  name,
  sizes,
  priority = false,
  className = "",
  quality = 80,
}: {
  name: ImageKey;
  sizes: string;
  priority?: boolean;
  className?: string;
  quality?: 70 | 80 | 90;
}) {
  const img = images[name];
  return (
    <Image
      src={img.src}
      alt={img.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      placeholder="blur"
      className={`object-cover ${className}`}
      style={{ objectPosition: img.focus ?? "50% 50%" }}
    />
  );
}
