import { useMemo } from 'react';

export function useImages() {
  // Import all images eagerly once
  const images = import.meta.glob('../data/images/*.{png,jpg,jpeg,svg,gif}', { eager: true });

  // Map filenames to URLs
  const imageMap = useMemo(() => {
    const map = {};
    Object.entries(images).forEach(([path, module]) => {
      const filename = path.split('/').pop();
      map[filename] = module.default;
    });
    return map;
  }, [images]);

  return imageMap;
}
