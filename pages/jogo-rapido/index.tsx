import Button from "@/component/@core/button";
import { APIURLSOCKET } from "@/component/@variables/constants";
import Progress from "@/component/progress";
import { apiSocket } from "@/services/api";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface WSData {
  bikes: { 0: BikeData; 1: BikeData };
  order: number;
}
interface BikeData {
  speed: number;
  progress: number;
}

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
  const [socket, setSocket] = useState<any>();
  const [progress1, setProgress1] = useState(0);
  const [speed1, setSpeed1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [speed2, setSpeed2] = useState(0);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(0);

  const timerIterator: any = useRef();
  const lastOrder: any = useRef(0);

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
    lastOrder.current = 0;
  };

  const pause = () => {
    clearInterval(timerIterator.current);
  };

  useEffect(() => {
    const socket = new WebSocket(APIURLSOCKET);

    socket.onopen = (a) => {
      console.log("open");
      console.log(a);
    };

    socket.onerror = (a) => {
      console.error(a);
    };

    socket.onmessage = (e) => {
      const { bikes, order } = JSON.parse(e.data);
      if (+order > lastOrder.current) {
        setProgress1(+bikes[0].progress);
        setSpeed1(+bikes[0].speed);
        setProgress2(+bikes[1].progress);
        setSpeed2(+bikes[1].speed);

        lastOrder.current = +order;
      }
    };

    socket.onclose = (e) => {
      console.log("close");
      console.log(e);
    };

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (progress1 >= 1 || progress2 >= 1) {
      pause();
    }
  }, [progress1, progress2]);

  useEffect(() => {
    if (start) {
      apiSocket.get("/start");
    } else {
      apiSocket.get("/stop");
    }
  }, [start]);

  useEffect(() => {
    console.log("socket");
    console.log(socket);
  }, [socket]);

  return (
    <main className="jogo-rapido-main-wrapper">
      <div className="progress-data-wrapper">
        <div className="progress-bars-wrapper">
          <Progress progress={progress1} speed={speed1} />
          <Progress progress={progress2} speed={speed2} />
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
