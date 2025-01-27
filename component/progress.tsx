import { useEffect, useState } from "react";
import { distanciaPadrao, totalDist } from "./@variables/constants";

export default function Progress({
  progress,
  dt,
}: {
  progress: number;
  dt: number;
}) {
  const [vel, setVel] = useState(0);

  const height = (progress * 100) / totalDist;

  useEffect(() => {
    dt ? setVel(distanciaPadrao / dt) : setVel(0);
  }, [dt]);

  return (
    <div className="player-progress-bar">
      <h3>{vel.toFixed(1)} km/h</h3>
      <div
        className={progress >= totalDist ? "victory" : ""}
        style={{ height: height + "%" }}
      ></div>
    </div>
  );
}
