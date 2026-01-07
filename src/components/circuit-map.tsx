import clsx from 'clsx';

import { cn } from '@/lib/utils';

import { FragmentType, graphql, useFragment } from '@/types';

export const CircuitDetails = graphql(`
  fragment CircuitDetails on circuits {
    circuit_details
  }
`);
type ShoelaceArgs = {
  dx: number;
  dy: number;
  length: number;
  isClockwise: boolean;
};

type Point = { X: number; Y: number };

/**
 * Calculates the perpendicular direction vector pointing outside the circuit
 * using the shoelace formula to determine winding direction.
 *
 * The algorithm:
 * 1. Calculates a perpendicular vector rotated 90 degrees from the track direction
 * 2. Uses the circuit's winding direction (clockwise/counterclockwise) to determine
 *    which side is outside
 * 3. For clockwise tracks, outside is to the right; for counterclockwise, to the left
 *
 * @param dx - X component of the direction vector along the start/finish straight
 * @param dy - Y component of the direction vector along the start/finish straight
 * @param length - Magnitude of the direction vector (should be > 0)
 * @param isClockwise - Whether the circuit winds clockwise (from shoelace formula)
 * @returns Normalized perpendicular vector `{x, y}` pointing outside the circuit
 */
const getShoelacePerpendicular = ({
  dx,
  dy,
  length,
  isClockwise,
}: ShoelaceArgs) => {
  let perpX = -dy / length;
  let perpY = dx / length;

  if (!isClockwise) {
    perpX = -perpX;
    perpY = -perpY;
  }

  return { x: perpX, y: perpY };
};

export const CircuitMap = ({
  circuitData,
  className,
  small = false,
}: {
  circuitData?: FragmentType<typeof CircuitDetails>;
  small?: boolean;
  className?: string;
}) => {
  const data = useFragment(CircuitDetails, circuitData);
  if (!data?.circuit_details) return null;

  const { xy_values, rotation, corners } =
    data.circuit_details as CircuitDetails;

  // Find the minimum coordinates to use as the origin point
  const origin = xy_values.reduce(
    (acc, point) =>
      [Math.min(acc[0], point.X), Math.min(acc[1], point.Y)] as [
        number,
        number,
      ],
    [Infinity, Infinity],
  );
  const [originX, originY] = origin;

  // Prepare rotation transformation
  const rotationRadians = (rotation * Math.PI) / 180;
  const cos = Math.cos(rotationRadians);
  const sin = Math.sin(rotationRadians);

  // Transform points: normalize to origin, flip vertically, then rotate
  const transformed: Point[] = [];
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (const point of xy_values) {
    // Normalize to origin (translate to 0,0)
    const normalizedX = point.X - originX;
    const normalizedY = point.Y - originY;

    // Flip vertically (to match SVG coordinate system)
    const flippedY = -normalizedY;

    // Apply rotation transformation
    const rotatedX = normalizedX * cos - flippedY * sin;
    const rotatedY = normalizedX * sin + flippedY * cos;

    transformed.push({ X: rotatedX, Y: rotatedY });

    // Track bounding box of transformed points
    if (rotatedX < minX) minX = rotatedX;
    if (rotatedY < minY) minY = rotatedY;
    if (rotatedX > maxX) maxX = rotatedX;
    if (rotatedY > maxY) maxY = rotatedY;
  }

  // Calculate SVG dimensions with padding
  const PADDING = 350;
  const width = maxX - minX + PADDING * 2;
  const height = maxY - minY + PADDING * 2;
  const STROKE_WIDTH_SCALE = 0.025;
  const strokeWidth = Math.max(width, height) * STROKE_WIDTH_SCALE;

  // Arrow dimensions (calculated early so we can use them in offset calculation)
  const arrowLength = strokeWidth * 3;
  const arrowWidth = strokeWidth * 0.6;

  // Convert transformed points to SVG path coordinates
  const pathPoints = transformed.map(
    (point) => `${point.X - minX + PADDING},${point.Y - minY + PADDING}`,
  );
  // Close the loop by repeating the first point
  pathPoints.push(pathPoints[0]);
  const points = pathPoints.join(' ');

  // Calculate signed area to determine winding direction (clockwise/counterclockwise)
  // Using shoelace formula
  let signedArea = 0;
  for (let i = 0; i < transformed.length; i++) {
    const j = (i + 1) % transformed.length;
    signedArea += transformed[i].X * transformed[j].Y;
    signedArea -= transformed[j].X * transformed[i].Y;
  }
  signedArea /= 2;
  // Negative area = clockwise, positive = counterclockwise
  const isClockwise = signedArea < 0;

  // Calculate start/finish arrow position and direction
  let arrowX = 0;
  let arrowY = 0;
  let arrowRotation = 0;
  let arrowOffsetX = 0;
  let arrowOffsetY = 0;
  if (corners && corners.length >= 2) {
    const lastCorner = corners[corners.length - 1];
    const firstCorner = corners[0];

    // Transform last corner coordinates
    const lastNormalizedX = lastCorner.X - originX;
    const lastNormalizedY = lastCorner.Y - originY;
    const lastFlippedY = -lastNormalizedY;
    const lastRotatedX = lastNormalizedX * cos - lastFlippedY * sin;
    const lastRotatedY = lastNormalizedX * sin + lastFlippedY * cos;

    // Transform first corner coordinates
    const firstNormalizedX = firstCorner.X - originX;
    const firstNormalizedY = firstCorner.Y - originY;
    const firstFlippedY = -firstNormalizedY;
    const firstRotatedX = firstNormalizedX * cos - firstFlippedY * sin;
    const firstRotatedY = firstNormalizedX * sin + firstFlippedY * cos;

    // Calculate midpoint between last and first corner
    const midX = (lastRotatedX + firstRotatedX) / 2;
    const midY = (lastRotatedY + firstRotatedY) / 2;

    // Convert to SVG coordinates
    arrowX = midX - minX + PADDING;
    arrowY = midY - minY + PADDING;

    // Calculate the direction vector from last corner to first corner (normal direction)
    const dx = firstRotatedX - lastRotatedX;
    const dy = firstRotatedY - lastRotatedY;
    // Calculate the angle along the start/finish straight
    arrowRotation = Math.atan2(dy, dx);

    // Calculate perpendicular direction (90 degrees to the track direction) for offset
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length > 0) {
      const { x: perpX, y: perpY } = getShoelacePerpendicular({
        dx,
        dy,
        length,
        isClockwise,
      });

      // Offset by stroke width (accounting for both outer and inner lines) plus padding
      // Outer line stroke width + inner line stroke width + generous padding + half arrow width
      const totalStrokeWidth = strokeWidth + strokeWidth * 0.2; // outer + inner
      const offsetDistance =
        totalStrokeWidth / 2 + strokeWidth * 0.8 + arrowWidth / 2;
      arrowOffsetX = perpX * offsetDistance;
      arrowOffsetY = perpY * offsetDistance;
    }
  }

  const sizeClasses = clsx({
    'max-h-[75px] w-fit': small,
    'max-h-[75px] lg:max-h-[175px] lg:block': !small,
  });

  return (
    <svg
      className={cn('aspect-square py-2', sizeClasses, className)}
      aria-hidden='true'
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio='xMidYMid meet'
    >
      {/* Outer track outline */}
      <polyline
        points={points}
        className='stroke-accent origin-center'
        fill='none'
        strokeWidth={strokeWidth}
      />
      {/* Inner track outline */}
      <polyline
        points={points}
        className='stroke-foreground origin-center'
        fill='none'
        strokeWidth={strokeWidth * 0.2}
      />
      <rect
        x={pathPoints[0].split(',')[0]}
        y={pathPoints[0].split(',')[1]}
        width={arrowLength - arrowWidth * 2}
        height={arrowWidth * 2}
        className='fill-green-500'
      />
      {/* Start/finish arrow */}
      {corners && corners.length >= 2 && (
        <g
          transform={`translate(${arrowX + arrowOffsetX}, ${arrowY + arrowOffsetY}) rotate(${(arrowRotation * 180) / Math.PI}) translate(${-arrowLength / 2}, 0)`}
        >
          {/* Arrow shaft */}
          <rect
            x={0}
            y={-arrowWidth / 3}
            width={arrowLength - arrowWidth * 2}
            height={(arrowWidth * 2) / 3}
            className='fill-red-500'
          />
          {/* Arrowhead - wider and more prominent */}
          <path
            d={`M ${arrowLength - arrowWidth * 2},-${arrowWidth / 2} L ${arrowLength},0 L ${arrowLength - arrowWidth * 2},${arrowWidth / 2} Z`}
            className='fill-red-500'
          />
        </g>
      )}
    </svg>
  );
};
