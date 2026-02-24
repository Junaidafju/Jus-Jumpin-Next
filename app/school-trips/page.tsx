import type { Metadata } from "next";
import { AnimatedHeader } from "../components/AnimatedHeader";
import SchoolTripsClient from "./SchoolTripsClient";

export const metadata: Metadata = {
  title: "School Trips to Jus Jumpin | Safe & Active Educational Outings",
  description:
    "Plan school trips to Jus Jumpin indoor trampoline and play parks. Structured batches, movement-focused activities and strict safety for students and institutions.",
};

export default function SchoolTripsPage() {
  return <SchoolTripsClient />;
}

