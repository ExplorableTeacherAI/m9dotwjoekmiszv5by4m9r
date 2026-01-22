import { useState } from "react";
import { Section } from "@/components/templates";
import { Mafs, Circle, Text } from "mafs";
import { Slider } from "@/components/atoms/ui/slider";

/**
 * Section 5: Real-World Examples
 * Pizza comparison, circular objects, and practice calculator
 */
export const RealWorldExamplesSection = () => {
  const [customRadius, setCustomRadius] = useState(5);

  // Pizza sizes (in inches diameter)
  const pizzas = [
    { name: "Small", diameter: 10, color: "hsl(45, 100%, 51%)" },
    { name: "Medium", diameter: 12, color: "hsl(25, 95%, 53%)" },
    { name: "Large", diameter: 14, color: "hsl(340, 82%, 52%)" },
  ];

  const calculateArea = (diameter: number) => {
    const radius = diameter / 2;
    return Math.PI * radius * radius;
  };

  const customArea = Math.PI * customRadius * customRadius;

  return (
    <Section id="real-world-examples">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Real-World Examples
        </h2>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Circles are everywhere! Let's see how understanding area helps us in real life.
        </p>

        {/* Pizza Comparison */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Pizza Size Comparison
          </h3>
          <p className="text-muted-foreground mb-6">
            Which pizza gives you the most food for your money? Let's compare using area!
          </p>

          {/* Pizza Visualization */}
          <div className="bg-muted/30 rounded-xl p-4 mb-6">
            <Mafs
              height={200}
              viewBox={{ x: [-10, 10], y: [-4, 4] }}
            >
              {pizzas.map((pizza, index) => {
                const xPos = -6 + index * 6;
                const visualRadius = pizza.diameter / 8; // Scale for visualization
                return (
                  <g key={pizza.name}>
                    <Circle
                      center={[xPos, 0]}
                      radius={visualRadius}
                      color={pizza.color}
                      fillOpacity={0.7}
                      strokeWidth={2}
                    />
                    <Text x={xPos} y={-2.8} size={12}>
                      {pizza.name}
                    </Text>
                  </g>
                );
              })}
            </Mafs>
          </div>

          {/* Pizza Stats */}
          <div className="grid grid-cols-3 gap-4">
            {pizzas.map((pizza) => {
              const area = calculateArea(pizza.diameter);
              return (
                <div
                  key={pizza.name}
                  className="bg-background rounded-lg p-4 text-center border border-border"
                >
                  <div
                    className="text-lg font-bold mb-1"
                    style={{ color: pizza.color }}
                  >
                    {pizza.name}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {pizza.diameter}" diameter
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {area.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    square inches
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Did you know?</strong> A 14" large pizza has{" "}
              <strong>
                {((calculateArea(14) / calculateArea(10) - 1) * 100).toFixed(0)}% more
              </strong>{" "}
              food than a 10" small pizza — almost double the area!
            </p>
          </div>
        </div>

        {/* Circular Objects Around Us */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Circles Around Us
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <div className="text-4xl mb-2">🕐</div>
              <div className="font-semibold text-foreground">Clock</div>
              <div className="text-sm text-muted-foreground">
                The hands sweep around in a circle
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <div className="text-4xl mb-2">🚗</div>
              <div className="font-semibold text-foreground">Wheels</div>
              <div className="text-sm text-muted-foreground">
                Cars, bikes, and buses all use circular wheels
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <div className="text-4xl mb-2">🪙</div>
              <div className="font-semibold text-foreground">Coins</div>
              <div className="text-sm text-muted-foreground">
                Most coins are circular in shape
              </div>
            </div>
          </div>
        </div>

        {/* Area Calculator */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Try It Yourself!
          </h3>
          <p className="text-muted-foreground mb-6">
            Use the slider to set a radius and calculate the area of any circle.
          </p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-muted-foreground w-20">Radius:</span>
            <Slider
              value={[customRadius]}
              onValueChange={(value) => setCustomRadius(value[0])}
              min={1}
              max={15}
              step={0.5}
              className="flex-1"
            />
            <span className="text-lg font-bold text-primary w-20 text-right">
              {customRadius} cm
            </span>
          </div>

          <div className="bg-muted/30 rounded-xl p-6">
            <div className="flex justify-center items-center gap-3 flex-wrap text-lg mb-4">
              <span className="font-bold" style={{ color: "hsl(220, 90%, 56%)" }}>Area</span>
              <span className="text-muted-foreground">=</span>
              <span style={{ color: "hsl(25, 95%, 53%)" }}>π</span>
              <span className="text-muted-foreground">×</span>
              <span style={{ color: "hsl(142, 76%, 36%)" }}>{customRadius}²</span>
              <span className="text-muted-foreground">=</span>
              <span style={{ color: "hsl(25, 95%, 53%)" }}>3.14159</span>
              <span className="text-muted-foreground">×</span>
              <span style={{ color: "hsl(142, 76%, 36%)" }}>{(customRadius * customRadius).toFixed(1)}</span>
            </div>

            <div className="text-center">
              <div
                className="text-4xl font-bold"
                style={{ color: "hsl(220, 90%, 56%)" }}
              >
                {customArea.toFixed(2)} cm²
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                That's the area of your circle!
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-muted/50 rounded-xl p-6 border border-border mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            What You've Learned
          </h3>
          <ul className="text-muted-foreground space-y-2 list-disc list-inside">
            <li>A <strong>circle</strong> is a shape where all points are the same distance from the center</li>
            <li>The <strong>radius</strong> is the distance from center to edge; the <strong>diameter</strong> is twice that</li>
            <li><strong>Pi (π ≈ 3.14159)</strong> is the ratio of circumference to diameter — always the same!</li>
            <li>The <strong>area formula</strong> is A = πr² — now you can calculate the area of any circle</li>
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default RealWorldExamplesSection;
