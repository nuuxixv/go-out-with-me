
/**
 * Calculates a random position for the button within the viewport,
 * ensuring it stays within safe bounds (padding).
 */
export const getRandomPosition = (
  containerWidth: number,
  containerHeight: number,
  elementWidth: number,
  elementHeight: number,
  padding: number = 20
) => {
  const safeWidth = containerWidth - elementWidth - padding * 2;
  const safeHeight = containerHeight - elementHeight - padding * 2;

  const randomX = Math.floor(Math.random() * safeWidth) + padding;
  const randomY = Math.floor(Math.random() * safeHeight) + padding;

  return { x: randomX, y: randomY };
};
