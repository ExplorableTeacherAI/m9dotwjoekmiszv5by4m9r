import { type ReactElement } from "react";
import { FullWidthLayout } from "@/components/layouts";
import { CircleIntroSection } from "./sections/CircleIntroSection";
import { RadiusDiameterSection } from "./sections/RadiusDiameterSection";
import { DiscoveringPiSection } from "./sections/DiscoveringPiSection";
import { AreaOfCircleSection } from "./sections/AreaOfCircleSection";

/**
 * Understanding the Circle and Its Area
 * An interactive lesson for middle school students
 */

export const sections: ReactElement[] = [
  // Section 1: What is a Circle?
  <FullWidthLayout key="circle-intro" maxWidth="xl">
    <CircleIntroSection />
  </FullWidthLayout>,

  // Section 2: Radius and Diameter
  <FullWidthLayout key="radius-diameter" maxWidth="xl">
    <RadiusDiameterSection />
  </FullWidthLayout>,

  // Section 3: Discovering Pi
  <FullWidthLayout key="discovering-pi" maxWidth="xl">
    <DiscoveringPiSection />
  </FullWidthLayout>,

  // Section 4: Area of a Circle
  <FullWidthLayout key="area-of-circle" maxWidth="xl">
    <AreaOfCircleSection />
  </FullWidthLayout>,
];
