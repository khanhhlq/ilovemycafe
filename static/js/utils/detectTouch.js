export default function detectTouch() {
  return "ontouchend" in document;
}
