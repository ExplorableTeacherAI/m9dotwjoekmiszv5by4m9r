import { useState } from "react";
import { Section } from "@/components/templates";
import { Mafs, Circle, Point, Line, Text, vec } from "mafs";
import { Slider } from "@/components/atoms/ui/slider";
import { Glossary } from "@/components/annotations";

/**
 * Section 3: Discovering Pi (π)
 * Interactive visualization showing circumference ÷ diameter = π
 */
export const DiscoveringPiSection = () => {
  const [radius, setRadius] = useState(2);
  const center: vec.Vector2 = [0, 0];

  const diameter = radius * 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = circumference / diameter;

  return (
    <Section id="discovering-pi">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Discovering Pi (π)
        </h2>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Here's something magical about circles! If you measure the distance around a circle (called the{" "}
          <Glossary
            term="circumference"
            definition="The distance around the outside edge of a circle. Like wrapping a string around the circle and measuring how long that string is."
            relatedTerms={["diameter", "pi"]}
            color="hsl(340, 82%, 52%)"
            bgColor="hsl(340, 82%, 95%)"
          />
          ) and divide it by the diameter, you <strong>always</strong> get the same number — approximately <strong>3.14159...</strong>
          This special number is called{" "}
          <Glossary
            term="Pi (π)"
            definition="A mathematical constant (≈ 3.14159) that represents the ratio of a circle's circumference to its diameter. It's the same for ALL circles, no matter how big or small!"
            relatedTerms={["circumference", "diameter"]}
            color="hsl(25, 95%, 53%)"
            bgColor="hsl(25, 95%, 95%)"
          />
          .
        </p>

        {/* Interactive Visualization */}
        <div className="bg-card rounded-2xl p-4 shadow-lg border border-border mb-6">
          <Mafs
            height={320}
            viewBox={{ x: [-4.5, 4.5], y: [-3.5, 3.5] }}
            preserveAspectRatio={false}
          >
            {/* The circle with highlighted circumference */}
            <Circle
              center={center}
              radius={radius}
              strokeStyle="solid"
              strokeWidth={5}
              color="hsl(340, 82%, 52%)"
              fillOpacity={0.08}
            />

            {/* Diameter line */}
            <Line.Segment
              point1={[-radius, 0]}
              point2={[radius, 0]}
              color="hsl(262, 83%, 58%)"
              weight={3}
            />

            {/* Center point */}
            <Point x={center[0]} y={center[1]} color="hsl(45, 100%, 51%)" />

            {/* Diameter endpoints */}
            <Point x={-radius} y={0} color="hsl(262, 83%, 58%)" />
            <Point x={radius} y={0} color="hsl(262, 83%, 58%)" />

            {/* Labels */}
            <Text x={0} y={-0.6} size={12}>
              center
            </Text>

            <Text
              x={0}
              y={radius + 0.6}
              size={14}
              color="hsl(340, 82%, 52%)"
            >
              circumference = {circumference.toFixed(2)}
            </Text>

            <Text
              x={0}
              y={-radius - 0.6}
              size={14}
              color="hsl(262, 83%, 58%)"
            >
              diameter = {diameter.toFixed(1)}
            </Text>
          </Mafs>
        </div>

        {/* Slider Control */}
        <div className="bg-muted/30 rounded-xl p-6 border border-border mb-6">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-muted-foreground w-20">Size:</span>
            <Slider
              value={[radius]}
              onValueChange={(value) => setRadius(value[0])}
              min={0.8}
              max={3}
              step={0.1}
              className="flex-1"
            />
            <span className="text-lg font-bold text-primary w-20 text-right">
              r = {radius.toFixed(1)}
            </span>
          </div>

          {/* The magic ratio calculation */}
          <div className="bg-background rounded-xl p-6 border border-border">
            <div className="text-center mb-4">
              <span className="text-sm text-muted-foreground">The Magic Ratio</span>
            </div>

            <div className="flex justify-center items-center gap-4 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: "hsl(340, 82%, 52%)" }}>
                  {circumference.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">Circumference</div>
              </div>

              <div className="text-2xl font-bold text-muted-foreground">÷</div>

              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: "hsl(262, 83%, 58%)" }}>
                  {diameter.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">Diameter</div>
              </div>

              <div className="text-2xl font-bold text-muted-foreground">=</div>

              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "hsl(25, 95%, 53%)" }}>
                  {ratio.toFixed(5)}
                </div>
                <div className="text-xs text-muted-foreground">≈ π (Pi)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="bg-muted/50 rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            The Amazing Discovery
          </h3>
          <p className="text-muted-foreground mb-4">
            Try changing the size of the circle above. No matter how big or small the circle is,
            the ratio is <strong>always approximately 3.14159</strong>. This is true for every circle in the universe!
          </p>
          <div className="text-center py-4 text-xl font-mono bg-background rounded-lg">
            <span style={{ color: "hsl(340, 82%, 52%)" }}>Circumference</span>
            {" ÷ "}
            <span style={{ color: "hsl(262, 83%, 58%)" }}>Diameter</span>
            {" = "}
            <span style={{ color: "hsl(25, 95%, 53%)" }}>π ≈ 3.14159</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DiscoveringPiSection;
