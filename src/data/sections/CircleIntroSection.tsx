import { useState, useEffect } from "react";
import { Section } from "@/components/templates";
import { Mafs, Circle, Point, Line, Text, vec, useMovablePoint } from "mafs";
import { Glossary } from "@/components/annotations";

/**
 * Section 1: What is a Circle?
 * Interactive visualization showing that a circle is all points equidistant from center
 */
export const CircleIntroSection = () => {
  const [angle, setAngle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const center: vec.Vector2 = [0, 0];

  // Draggable point to control radius
  const radiusPoint = useMovablePoint([2, 0], {
    color: "hsl(142, 76%, 36%)",
  });

  // Calculate radius from draggable point
  const radius = Math.max(0.5, Math.sqrt(radiusPoint.point[0] ** 2 + radiusPoint.point[1] ** 2));

  // Calculate animated point position on circle
  const pointOnCircle: vec.Vector2 = [
    Math.cos(angle) * radius,
    Math.sin(angle) * radius
  ];

  // Animation effect
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setAngle(prev => (prev + 0.03) % (2 * Math.PI));
    }, 30);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Keep the draggable point on the circle edge
  useEffect(() => {
    const currentRadius = Math.sqrt(radiusPoint.point[0] ** 2 + radiusPoint.point[1] ** 2);
    if (Math.abs(currentRadius - radius) > 0.01) {
      const angle = Math.atan2(radiusPoint.point[1], radiusPoint.point[0]);
      radiusPoint.setPoint([Math.cos(angle) * radius, Math.sin(angle) * radius]);
    }
  }, [radiusPoint.point]);

  return (
    <Section id="circle-intro">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-6">
          What is a Circle?
        </h1>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          A{" "}
          <Glossary
            term="circle"
            definition="A shape where every point on the edge is exactly the same distance from the center."
            relatedTerms={["radius", "diameter", "center"]}
          />{" "}
          is a special shape. Look at the moving point below — no matter where it goes
          around the circle, it's <strong>always the same distance</strong> from the{" "}
          <Glossary
            term="center"
            definition="The exact middle point of a circle. All points on the circle are equidistant from this point."
            color="hsl(45, 100%, 51%)"
            bgColor="hsl(45, 100%, 95%)"
          />
          . This distance is called the{" "}
          <Glossary
            term="radius"
            definition="The distance from the center of a circle to any point on its edge."
            relatedTerms={["diameter"]}
            color="hsl(142, 76%, 36%)"
            bgColor="hsl(142, 76%, 95%)"
          />
          .
        </p>

        {/* Interactive Visualization */}
        <div className="bg-card rounded-2xl p-4 shadow-lg border border-border mb-6">
          <Mafs
            height={350}
            viewBox={{ x: [-4, 4], y: [-3.5, 3.5] }}
          >
            {/* The circle */}
            <Circle
              center={center}
              radius={radius}
              strokeStyle="solid"
              strokeWidth={3}
              color="hsl(220, 90%, 56%)"
              fillOpacity={0.1}
            />

            {/* Center point */}
            <Point
              x={center[0]}
              y={center[1]}
              color="hsl(45, 100%, 51%)"
            />
            <Text
              x={center[0] + 0.3}
              y={center[1] - 0.4}
              attach="w"
              size={14}
            >
              Center
            </Text>

            {/* Radius line to animated point */}
            <Line.Segment
              point1={center}
              point2={pointOnCircle}
              color="hsl(142, 76%, 36%)"
              weight={3}
            />

            {/* Animated point on circle */}
            <Point
              x={pointOnCircle[0]}
              y={pointOnCircle[1]}
              color="hsl(142, 76%, 36%)"
            />

            {/* Distance label */}
            <Text
              x={(center[0] + pointOnCircle[0]) / 2 - 0.3}
              y={(center[1] + pointOnCircle[1]) / 2 + 0.4}
              attach="e"
              size={14}
              color="hsl(142, 76%, 36%)"
            >
              radius = {radius.toFixed(1)}
            </Text>

            {/* Draggable point to resize circle */}
            {radiusPoint.element}
          </Mafs>

          {/* Instruction hint */}
          <p className="text-center text-sm text-muted-foreground mt-3">
            Drag the green point to change the circle size
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            {isAnimating ? "⏸ Pause" : "▶ Play"}
          </button>
        </div>

        {/* Key insight */}
        <div className="bg-muted/50 rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Key Insight
          </h3>
          <p className="text-muted-foreground">
            The green line (radius) <strong>never changes length</strong> as the point moves around the circle.
            That's what makes a circle special — every point on the edge is exactly the same distance from the center!
          </p>
        </div>
      </div>
    </Section>
  );
};

export default CircleIntroSection;
