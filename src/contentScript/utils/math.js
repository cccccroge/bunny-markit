export function calculateAngle(dx, dy) {
  // Calculate angle using Math.atan2()
  let angle = Math.atan2(dx, dy);

  // Convert radians to degrees
  let angleDegrees = angle * (180 / Math.PI);

  // Ensure angle is between 0-360 degrees
  if (angleDegrees < 0) {
    angleDegrees += 360;
  }

  return angleDegrees;
}
