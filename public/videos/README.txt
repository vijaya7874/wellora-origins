Drop your hero background video here:

  public/videos/hero-bg.mp4

Optional poster image (shown before the video loads):

  public/videos/hero-bg-poster.jpg

Files in `public/` are served from the site root — so
public/videos/hero-bg.mp4 becomes available at /videos/hero-bg.mp4,
which is exactly what hero.component.html references.

Recommended: MP4 (H.264), under ~8-10MB, 1920x1080 or smaller, no audio
track needed (it plays muted regardless). Keep it short and loop-able
(5-15s) since it plays on repeat behind the hero content.
