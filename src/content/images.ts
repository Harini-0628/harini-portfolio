import type { ProjectImage } from './types'

/** Shared by the page and the build step, so the preload hint always matches the real <img>. */
export const FIGURE_SIZES = '(max-width: 40rem) 760px, (max-width: 76rem) 92vw, 1100px'

export function figureSrcSet(image: ProjectImage): string | undefined {
  return image.srcSmall ? `${image.srcSmall} 900w, ${image.src} 1800w` : undefined
}
