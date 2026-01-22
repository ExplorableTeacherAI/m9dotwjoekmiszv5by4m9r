import { type ReactElement } from "react";
import { FullWidthLayout } from "@/components/layouts";
import { CircleIntroSection } from "./sections/CircleIntroSection";

/**
 * Understanding the Circle and Its Area
 * An interactive lesson for middle school students
 */

export const sections: ReactElement[] = [
  // Section 1: What is a Circle?
  <FullWidthLayout key="circle-intro" maxWidth="xl">
    <CircleIntroSection />
  </FullWidthLayout>,
];
