import React, { useState, useRef, useEffect } from "react";
import DashboardNavbar from "../../components/DashboardNavbar";
import "../../style/CalmMind.css";

const CalmMind = () => {
  const [breath, setBreath] = useState("Breathe In");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const startBreathing = () => {
    if (!running) {
      setRunning(true);
      setBreath("Breathe In");
      intervalRef.current = setInterval(() => {
        setBreath(prev => (prev === "Breathe In" ? "Breathe Out" : "Breathe In"));
        setSeconds(prev => prev + 5); // increase timer per cycle
      }, 5000);
    }
  };

  const stopBreathing = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetTimer = () => {
    setSeconds(0);
    setBreath("Breathe In");
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }

  return (
    <div className="calmMindPage">
      <DashboardNavbar />

      {/* Hero Section */}
      <section className="calmMindHero">
        <h1>Release Your Anxiety Here</h1>
        <p>"Take a moment to center yourself. Inhale peace, exhale stress, and embrace calm."</p>
      </section>

      {/* Main Section with note + breathing ball */}
      <section className="calmMindMain">
        {/* Left little note */}
        <div className="leftNote">
          💛 "Take a deep breath. Everything is going to be okay. Just let it flow..."
        </div>

        {/* Center breathing ball + timer + controls */}
        <div className="centerContent">
          <div className={`breathBall ${breath === "Breathe In" ? "in" : "out"}`}>
            <span className={breath === "Breathe Out" ? "whiteText" : ""}>
              {breath}
            </span>
          </div>

          {/* Timer */}
          <div className="timer">{formatTime(seconds)}</div>

          {/* Controls */}
          <div className="breathControls">
            {!running ? (
              <button className="startBtn" onClick={startBreathing}>▶ Start</button>
            ) : (
              <button className="stopBtn" onClick={stopBreathing}>⏹ Stop</button>
            )}
            <button className="resetBtn" onClick={resetTimer}>🔄 Reset</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalmMind;
