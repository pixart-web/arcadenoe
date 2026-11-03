import type { Photo as PhotoData } from '@/data/images';

type Props = {
  photo: PhotoData;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Fotografia responsiva (WebP com fallback JPEG). A imagem principal carrega com prioridade; as restantes em lazy loading. */
export function Photo({ photo, alt, sizes, priority = false, className }: Props) {
  const set = (ext: string) => photo.widths.map((w) => `/images/${photo.src}-${w}.${ext} ${w}w`).join(', ');
  const fallback = `/images/${photo.src}-${photo.widths[photo.widths.length - 1]}.jpg`;
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={fallback}
        srcSet={set('jpg')}
        sizes={sizes}
        alt={alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  );
}
