export default function detectFullscreenAvailable() {
  return (
    document.fullscreenEnabled ||
    document.mozFullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.msFullscreenEnabled
  );
}
