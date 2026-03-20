import { Composition } from "remotion";
import { PortfolioDemo } from "./PortfolioDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PortfolioDemo"
      component={PortfolioDemo}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
