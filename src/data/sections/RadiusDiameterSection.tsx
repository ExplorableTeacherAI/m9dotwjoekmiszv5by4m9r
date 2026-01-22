import { useState } from "react";
import { Section } from "@/components/templates";
import { Mafs, Circle, Point, Line, Text, vec } from "mafs";
import { Slider } from "@/components/atoms/ui/slider";
import { Glossary } from "@/components/annotations";

/**
 * Section 2: Radius and Diameter
 * Interactive visualization showing the relationship between radius and diameter
 */
export const RadiusDiameterSection = () => {
  const [radius, setRadius] = useState(2);
  const center: vec.Vector2 = [0, 0];
  const diameter = radius * 2;

  // Points for the diameter line
  const leftPoint: vec.Vector2 = [-radius, 0];
  const rightPoint: vec.Vector2 = [radius, 0];

  return (
    <Section id="radius-diameter">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Radius and Diameter
        </h2>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          The{" "}
          <Glossary
            term="diameter"
            definition="A straight line passing through the center of a circle, connecting two points on the edge. It is always twice the radius."
            relatedTerms={["radius", "center"]}
            color="hsl(262, 83%, 58%)"
            bgColor="hsl(262, 83%, 95%)"
          />{" "}
          is a line that goes all the way across the circle, passing through the center.
          It's always <strong>twice as long</strong> as the radius. Try moving the slider below
          to see how the radius and diameter change together!
        </p>

        {/* Interactive Visualization */}
        <div className="bg-card rounded-2xl p-4 shadow-lg border border-border mb-6">
          <Mafs
            height={350}
            viewBox={{ x: [-5, 5], y: [-4, 4] }}
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

            {/* Diameter line (purple) */}
            <Line.Segment
              point1={leftPoint}
              point2={rightPoint}
              color="hsl(262, 83%, 58%)"
              weight={4}
            />

            {/* Radius line (green) - from center to right edge */}
            <Line.Segment
              point1={center}
              point2={[0, radius]}
              color="hsl(142, 76%, 36%)"
              weight={3}
            />

            {/* Center point */}
            <Point
              x={center[0]}
              y={center[1]}
              color="hsl(45, 100%, 51%)"
            />

            {/* Diameter endpoints */}
            <Point x={leftPoint[0]} y={leftPoint[1]} color="hsl(262, 83%, 58%)" />
            <Point x={rightPoint[0]} y={rightPoint[1]} color="hsl(262, 83%, 58%)" />

            {/* Radius endpoint */}
            <Point x={0} y={radius} color="hsl(142, 76%, 36%)" />

            {/* Labels */}
            <Text x={0} y={-0.5} size={14}>
              Center
            </Text>

            <Text
              x={0}
              y={-1.2}
              size={16}
              color="hsl(262, 83%, 58%)"
            >
              diameter = {diameter.toFixed(1)}
            </Text>

            <Text
              x={0.4}
              y={radius / 2}
              size={14}
              color="hsl(142, 76%, 36%)"
            >
              r = {radius.toFixed(1)}
            </Text>
          </Mafs>
        </div>

        {/* Slider Control */}
        <div className="bg-muted/30 rounded-xl p-6 border border-border mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium text-muted-foreground w-20">Radius:</span>
            <Slider
              value={[radius]}
              onValueChange={(value) => setRadius(value[0])}
              min={0.5}
              max={3.5}
              step={0.1}
              className="flex-1"
            />
            <span className="text-lg font-bold text-primary w-16 text-right">
              {radius.toFixed(1)}
            </span>
          </div>

          {/* Display the relationship */}
          <div className="flex justify-center gap-8 mt-6 p-4 bg-background rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "hsl(142, 76%, 36%)" }}>
                {radius.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Radius (r)</div>
            </div>
            <div className="text-center text-2xl font-bold text-muted-foreground self-center">
              × 2 =
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "hsl(262, 83%, 58%)" }}>
                {diameter.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Diameter (d)</div>
            </div>
          </div>
        </div>

        {/* Key formula */}
        <div className="bg-muted/50 rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            The Formula
          </h3>
          <div className="text-center text-2xl font-mono py-4">
            <span style={{ color: "hsl(262, 83%, 58%)" }}>d</span> = 2 × <span style={{ color: "hsl(142, 76%, 36%)" }}>r</span>
          </div>
          <p className="text-muted-foreground text-center">
            The diameter is always <strong>twice</strong> the radius, or the radius is <strong>half</strong> the diameter.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default RadiusDiameterSection;
