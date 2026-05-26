import HomeVisionMissionSection from "@/pages/index/components/HomeVisionMissionSection";
import { AboutData } from "../index";

interface Props { about: AboutData }

export default function OurStoryValues({ about }: Props) {
  return <HomeVisionMissionSection about={about} />;
}
