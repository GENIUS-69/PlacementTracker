import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Save } from 'lucide-react';
import { StudyService } from '../services/api';

const TimerPage = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [category, setCategory] = useState('DSA');
  const timerRef = useRef(null);
  const audioRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'));

  const totalDurationSeconds = (hours * 3600) + (minutes * 60) + seconds;

  useEffect(() => {
    // Enable looping and request notification permission
    audioRef.current.loop = true;
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsRinging(true);
      clearInterval(timerRef.current);
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Time's Up!", {
          body: `Your ${category} study session has ended.`,
          icon: "/favicon.ico"
        });
      }
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, category]);

  // Update timeLeft when duration components change (only if timer is not running)
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(totalDurationSeconds);
    }
  }, [hours, minutes, seconds, isActive, totalDurationSeconds]);

  const toggleTimer = () => {
    if (totalDurationSeconds === 0) return alert('Please set a duration!');
    setIsActive(!isActive);
    stopAlarm();
  };

  const stopAlarm = () => {
    setIsRinging(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const resetTimer = () => {
    setIsActive(false);
    stopAlarm();
    setTimeLeft(totalDurationSeconds);
  };

  const formatTime = (totalSecs) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSave = async () => {
    const elapsedSeconds = totalDurationSeconds - timeLeft;
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    
    if (elapsedMinutes < 1) return alert('Session too short to save (min 1 min)!');
    
    try {
      await StudyService.logSession({
        category,
        duration: elapsedMinutes,
        date: new Date().toISOString().split('T')[0]
      });
      alert('Study session logged!');
      resetTimer();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] space-y-8 animate-in zoom-in duration-700 overflow-hidden">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-white mb-1">Study Focus Timer</h2>
        <p className="text-slate-400 text-sm">Set your goal and focus on {category}</p>
      </header>

      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Progress Ring */}
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="128" cy="128" r="110"
            className="stroke-slate-800 fill-none"
            strokeWidth="10"
          />
          <circle
            cx="128" cy="128" r="110"
            className={`stroke-primary fill-none transition-all duration-1000 ${isRinging ? 'animate-pulse' : ''}`}
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 110}
            strokeDashoffset={2 * Math.PI * 110 * (1 - (timeLeft / (Math.max(totalDurationSeconds, 1)) || 0))}
            strokeLinecap="round"
          />
        </svg>

        <div className={`font-mono font-bold text-white tracking-tighter ${hours > 0 ? 'text-5xl' : 'text-6xl'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-wrap justify-center items-end gap-3 scale-90">
          {/* Hours */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] text-slate-500 uppercase font-bold text-center">Hrs</label>
            <input 
              type="number" min="0" max="23"
              value={hours}
              onChange={(e) => setHours(Math.max(0, Math.min(23, Number(e.target.value))))}
              disabled={isActive}
              className="glass border-white/10 text-white rounded-xl px-2 py-2 w-16 text-center outline-none focus:border-primary/50 disabled:opacity-50"
            />
          </div>

          {/* Minutes */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] text-slate-500 uppercase font-bold text-center">Min</label>
            <input 
              type="number" min="0" max="59"
              value={minutes}
              onChange={(e) => setMinutes(Math.max(0, Math.min(59, Number(e.target.value))))}
              disabled={isActive}
              className="glass border-white/10 text-white rounded-xl px-2 py-2 w-16 text-center outline-none focus:border-primary/50 disabled:opacity-50"
            />
          </div>

          {/* Seconds */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] text-slate-500 uppercase font-bold text-center">Sec</label>
            <input 
              type="number" min="0" max="59"
              value={seconds}
              onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
              disabled={isActive}
              className="glass border-white/10 text-white rounded-xl px-2 py-2 w-16 text-center outline-none focus:border-primary/50 disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="glass border-white/10 text-white rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
            >
              <option value="DSA">DSA</option>
              <option value="DevOps">DevOps</option>
              <option value="System Design">System Design</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTimer}
            className="p-5 rounded-full bg-primary text-secondary hover:scale-110 transition-transform shadow-xl shadow-primary/20"
          >
            {isActive ? <Pause size={28} /> : <Play size={28} />}
          </button>

          <button 
            onClick={resetTimer}
            className="p-3 rounded-full glass text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw size={20} />
          </button>

          <button 
            onClick={handleSave}
            className="p-3 rounded-full glass text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
            title="Save Session"
          >
            <Save size={20} />
          </button>

          {isRinging && (
            <button 
              onClick={stopAlarm}
              className="px-6 py-3 rounded-full bg-rose-500 text-white font-bold animate-bounce flex items-center space-x-2"
            >
              <Pause size={18} />
              <span>Stop Alarm</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
