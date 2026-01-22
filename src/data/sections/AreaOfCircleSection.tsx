import { useState } from "react";
import { Section } from "@/components/templates";
import { Mafs, Circle, Polygon, Text, vec } from "mafs";
import { Slider } from "@/components/atoms/ui/slider";
import { Glossary } from "@/components/annotations";

/**
 * Section 4: Area of a Circle
 * Interactive visualization showing the area formula A = πr²
 * Includes a visual proof by rearranging wedges
 */
export const AreaOfCircleSection = () => {
  const [radius, setRadius] = useState(2);
  const [numWedges, setNumWedges] = useState(8);
  const [showRearranged, setShowRearranged] = useState(false);

  const center: vec.Vector2 = [0, 0];
  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;

  // Generate wedge polygons for the circle
  const generateWedges = () => {
    const wedges: vec.Vector2[][] = [];
    const angleStep = (2 * Math.PI) / numWedges;

    for (let i = 0; i < numWedges; i++) {
      const startAngle = i * angleStep;
      const endAngle = (i + 1) * angleStep;

      const wedge: vec.Vector2[] = [
        center,
        [Math.cos(startAngle) * radius, Math.sin(startAngle) * radius],
        [Math.cos(endAngle) * radius, Math.sin(endAngle) * radius],
      ];
      wedges.push(wedge);
    }
    return wedges;
  };

  // Generate rearranged wedges (parallelogram-like shape)
  const generateRearrangedWedges = () => {
    const wedges: vec.Vector2[][] = [];
    const angleStep = (2 * Math.PI) / numWedges;
    const wedgeWidth = (circumference / 2) / (numWedges / 2);

    for (let i = 0; i < numWedges; i++) {
      const isPointingUp = i % 2 === 0;
      const xOffset = Math.floor(i / 2) * wedgeWidth - (circumference / 4) + wedgeWidth / 2;

      if (isPointingUp) {
        // Wedge pointing up
        const wedge: vec.Vector2[] = [
          [xOffset, 0],
          [xOffset - wedgeWidth / 2, 0],
          [xOffset, radius],
        ];
        wedges.push(wedge);
      } else {
        // Wedge pointing down (inverted)
        const wedge: vec.Vector2[] = [
          [xOffset, 0],
          [xOffset + wedgeWidth / 2, 0],
          [xOffset, radius],
        ];
        wedges.push(wedge);
      }
    }
    return wedges;
  };

  const wedges = generateWedges();
  const colors = [
    "hsl(220, 90%, 56%)",
    "hsl(340, 82%, 52%)",
    "hsl(142, 76%, 36%)",
    "hsl(25, 95%, 53%)",
    "hsl(262, 83%, 58%)",
    "hsl(180, 70%, 45%)",
    "hsl(45, 100%, 51%)",
    "hsl(300, 70%, 50%)",
  ];

  return (
    <Section id="area-of-circle">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Area of a Circle
        </h2>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          The{" "}
          <Glossary
            term="area"
            definition="The amount of space inside a shape. For a circle, it tells us how much surface the circle covers."
            relatedTerms={["radius", "pi"]}
            color="hsl(220, 90%, 56%)"
            bgColor="hsl(220, 90%, 95%)"
          />{" "}
          of a circle tells us how much space is inside it. The formula is{" "}
          <strong>A = π × r²</strong>. But why does this formula work?
          Try increasing the number of slices below to see how a circle can be
          rearranged into a rectangle!
        </p>

        {/* Circle Visualization */}
        <div className="bg-card rounded-2xl p-4 shadow-lg border border-border mb-6">
          <Mafs
            height={300}
            viewBox={{ x: [-4, 4], y: [-3, 3] }}
          >
            {/* Draw wedges */}
            {wedges.map((wedge, i) => (
              <Polygon
                key={i}
                points={wedge}
                color={colors[i % colors.length]}
                fillOpacity={0.6}
                strokeStyle="solid"
                weight={1}
              />
            ))}

            {/* Center label */}
            <Text x={0} y={-radius - 0.5} size={14}>
              r = {radius.toFixed(1)}
            </Text>
          </Mafs>
        </div>

        {/* Controls */}
        <div className="bg-muted/30 rounded-xl p-6 border border-border mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium text-muted-foreground w-24">Radius:</span>
            <Slider
              value={[radius]}
              onValueChange={(value) => setRadius(value[0])}
              min={1}
              max={2.5}
              step={0.1}
              className="flex-1"
            />
            <span className="text-lg font-bold text-primary w-16 text-right">
              {radius.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground w-24">Slices:</span>
            <Slider
              value={[numWedges]}
              onValueChange={(value) => setNumWedges(value[0])}
              min={4}
              max={24}
              step={2}
              className="flex-1"
            />
            <span className="text-lg font-bold text-primary w-16 text-right">
              {numWedges}
            </span>
          </div>
        </div>

        {/* Area Calculation Display */}
        <div className="bg-background rounded-xl p-6 border border-border mb-6">
          <div className="text-center mb-4">
            <span className="text-sm text-muted-foreground">Calculating the Area</span>
          </div>

          <div className="flex justify-center items-center gap-3 flex-wrap text-xl">
            <span className="font-bold" style={{ color: "hsl(220, 90%, 56%)" }}>A</span>
            <span className="text-muted-foreground">=</span>
            <span style={{ color: "hsl(25, 95%, 53%)" }}>π</span>
            <span className="text-muted-foreground">×</span>
            <span style={{ color: "hsl(142, 76%, 36%)" }}>r²</span>
            <span className="text-muted-foreground">=</span>
            <span style={{ color: "hsl(25, 95%, 53%)" }}>3.14159</span>
            <span className="text-muted-foreground">×</span>
            <span style={{ color: "hsl(142, 76%, 36%)" }}>{radius.toFixed(1)}²</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-2xl font-bold" style={{ color: "hsl(220, 90%, 56%)" }}>
              {area.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Visual Proof Explanation */}
        <div className="bg-muted/50 rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Why Does This Formula Work?
          </h3>
          <p className="text-muted-foreground mb-4">
            Imagine cutting a circle into many thin slices (like a pizza). If you rearrange
            these slices by alternating them up and down, they form a shape that looks
            almost like a <strong>rectangle</strong>!
          </p>
          <ul className="text-muted-foreground space-y-2 list-disc list-inside">
            <li>
              The <strong>width</strong> of this rectangle equals half the circumference:
              <span className="font-mono ml-2">½ × 2πr = πr</span>
            </li>
            <li>
              The <strong>height</strong> equals the radius:
              <span className="font-mono ml-2">r</span>
            </li>
            <li>
              So the area = width × height = <span className="font-mono">πr × r = πr²</span>
            </li>
          </ul>
          <p className="text-muted-foreground mt-4 text-sm italic">
            Try increasing the number of slices above to 24 — the more slices, the more
            it looks like a perfect rectangle!
          </p>
        </div>
      </div>
    </Section>
  );
};

export default AreaOfCircleSection;
