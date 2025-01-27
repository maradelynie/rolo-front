import { useEffect, useState } from "react";
import { distanciaPadrao, totalDist } from "./@variables/constants";

export default function Progress({
  progress,
  speed,
}: {
  progress: number;
  speed: number;
}) {
  const height = progress * 100;

  return (
    <div className="player-progress-bar">
      <h3>{speed.toFixed(1)} km/h</h3>
      <div
        className={progress >= totalDist ? "victory" : ""}
        style={{ height: height + "%" }}
      ></div>
    </div>
  );
}
