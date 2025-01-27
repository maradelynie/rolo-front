import Button from "@/component/@core/button";
import {
  distPerPulse,
  distanciaPadrao,
  totalDist,
} from "@/component/@variables/constants";
import Progress from "@/component/progress";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const renderTimer = (timer: number) => {
  const sec = Math.floor(timer / 1000);
  const min = Math.floor(sec / 60);
  const millis = ((timer % 1000) / 10).toString().padStart(2, "0");
  const seconds = (sec % 60).toString().padStart(2, "0");
  const minutes = (min % 60).toString().padStart(2, "0");

  return (
    <>
      {minutes}:{seconds}:{millis}
    </>
  );
};

export default function JogoRapido() {
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(0);
  const [dt1, setDt1] = useState(0);
  const [dt2, setDt2] = useState(0);

  const timerIterator: any = useRef();
  const sensor1: any = useRef(0);
  const sensor2: any = useRef(0);

  const startTimer = () => {
    timerIterator.current = setInterval(myTimer, 50);
    setStart(true);
  };

  const myTimer = () => {
    setTimer((old) => old + 50);
  };

  const reset = () => {
    pause();

    setTimer(0);
    setStart(false);
    setName1("");
    setName2("");
    setProgress1(0);
    setProgress2(0);
    setDt1(0);
    setDt2(0);
  };

  const pause = () => {
    clearInterval(timerIterator.current);
    clearInterval(sensor1.current);
    clearInterval(sensor2.current);
  };

  useEffect(() => {
    if (progress1 >= totalDist || progress2 >= totalDist) {
      pause();
    }
  }, [progress1, progress2]);

  useEffect(() => {
    dt1 ? setProgress1((old) => old + distanciaPadrao) : setProgress1(0);
  }, [dt1]);

  useEffect(() => {
    dt2 ? setProgress2((old) => old + distanciaPadrao) : setProgress2(0);
  }, [dt2]);

  useEffect(() => {
    if (start) {
      sensor1.current = setInterval(
        () => setDt1(Math.random() * (0.8 - 0.3) + 0.3),
        49
      );
      sensor2.current = setInterval(
        () => setDt2(Math.random() * (0.8 - 0.3) + 0.3),
        53
      );
    } else {
      sensor1.current = 0;
      sensor2.current = 0;
    }
  }, [start]);

  return (
    <main className="jogo-rapido-main-wrapper">
      <div className="progress-data-wrapper">
        <div className="progress-bars-wrapper">
          <Progress progress={progress1} dt={dt1} />
          <Progress progress={progress2} dt={dt2} />
        </div>
        <div className="progress-timer-wrapper">
          <input
            type="text"
            disabled={timer > 0}
            onChange={(e) => setName1(e.target.value)}
            value={name1}
          />
          {renderTimer(timer)}
          <input
            type="text"
            disabled={timer > 0}
            onChange={(e) => setName2(e.target.value)}
            value={name2}
          />
        </div>
        <Button disabled={start || !(name1 && name2)} onClick={startTimer}>
          iniciar
        </Button>
        <Button onClick={reset} color="warning">
          zerar
        </Button>
        <Link href="/">
          <Button color="neutral">voltar</Button>
        </Link>
      </div>
    </main>
  );
}
