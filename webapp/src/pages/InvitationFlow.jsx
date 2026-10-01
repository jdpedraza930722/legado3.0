import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hexagon } from 'lucide-react';

// Splash Screen Component
const Splash = ({ onNext }) => {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      if (duration > 0) {
        const percentage = (currentTime / duration) * 100;
        setProgress(percentage);
      }
    }
  };

  const handleVideoEnded = () => {
    setProgress(100);
    // Trigger immediately for zero perceived lag
    onNext();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeOut" } }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center min-h-screen bg-dark-bg overflow-hidden"
    >
      {/* Video Background with Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#2F1B1A_100%)] z-10 pointer-events-none opacity-80" />
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
        src="/splash.mp4"
      />

      {/* Central Emblem */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        className="z-20 flex flex-col items-center justify-center"
      >
        <div className="relative flex items-center justify-center w-32 h-32 mb-8">
          {/* Abstract geometric ring */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[1px] border-primary/30 border-t-primary/80"
          />
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-[1px] border-primary/10 border-b-primary/60"
          />
          {/* Hexagon & L3 Monogram */}
          <div className="absolute inset-0 flex items-center justify-center text-primary">
            <Hexagon className="w-16 h-16 absolute stroke-[0.5] opacity-50" />
            <span className="text-3xl font-light tracking-widest mt-1">L3</span>
          </div>
        </div>
      </motion.div>

      {/* Pill Loader at the bottom */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 w-10/12 max-w-xs"
      >
        <div className="bg-[#000000]/60 backdrop-blur-xl border border-white/10 border-t-white/20 rounded-full p-4 flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between w-full px-2 mb-2 items-center">
            <span className="text-silver/80 text-[9px] sm:text-[10px] font-medium tracking-[0.3em] uppercase flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-primary animate-pulse" />
              Cargando Legado 3.0...
            </span>
            <span className="text-primary text-[10px] sm:text-xs font-light tracking-widest">
              {Math.min(100, Math.floor(progress))}%
            </span>
          </div>
          <div className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary/50 to-primary shadow-[0_0_15px_rgba(212,175,55,1)] transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Register Component with Luxury Minimalist Design
const Register = ({ onNext }) => {
  const [role, setRole] = useState('');

  const roles = ["Catedrático", "Directivo", "Estudiante", "Invitado"];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center min-h-screen bg-dark-bg p-6 relative overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-olive/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-wine/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Luxury Card */}
      <motion.div 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-3xl border border-white/5 border-t-white/20 rounded-3xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <div className="text-center mb-10">
          <h2 className="text-xl text-white font-light tracking-[0.3em] uppercase mb-3">
            Identidad
          </h2>
          <p className="text-silver/60 text-xs font-light tracking-wide">
            Por favor, confirme su registro para acceder a la experiencia inmersiva.
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Minimalist Input: Bottom Border Only */}
          <div className="relative group">
            <input 
              type="text" 
              required
              className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-primary focus:ring-0 transition-all font-light text-lg peer placeholder-transparent" 
              placeholder="Nombre Completo"
            />
            <label className="absolute left-0 -top-4 text-[10px] text-silver/60 tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary pointer-events-none">
              Nombre Completo
            </label>
          </div>

          <div className="relative group">
            <input 
              type="email" 
              required
              className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-primary focus:ring-0 transition-all font-light text-lg peer placeholder-transparent" 
              placeholder="Correo Institucional"
            />
            <label className="absolute left-0 -top-4 text-[10px] text-silver/60 tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary pointer-events-none">
              Correo Institucional
            </label>
          </div>

          {/* Pill-based Selection instead of Select */}
          <div className="pt-2">
            <label className="block text-silver/60 text-[10px] uppercase tracking-widest mb-4">
              Rol en el Evento
            </label>
            <div className="flex flex-wrap gap-3">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-4 py-2 rounded-full text-xs font-light tracking-wider transition-all duration-200 ${
                    role === r 
                      ? 'bg-wine/30 border-wine text-primary border shadow-[0_0_15px_rgba(100,0,23,0.5)]' 
                      : 'bg-white/5 border-white/10 text-silver/60 border hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={onNext}
            className="w-full mt-8 pt-10 pb-4 relative group overflow-hidden flex justify-center"
          >
            <div className="absolute inset-0 w-full h-[1px] top-8 bg-gradient-to-r from-transparent via-primary/50 to-transparent group-hover:via-primary transition-all duration-300" />
            <span className="text-primary font-light tracking-[0.4em] text-xs uppercase group-hover:text-white transition-colors duration-200">
              Desbloquear Acceso
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function InvitationFlow() {
  const [step, setStep] = useState(0);

  return (
    <AnimatePresence mode="wait">
      {step === 0 && <Splash key="splash" onNext={() => setStep(1)} />}
      {step === 1 && <Register key="register" onNext={() => setStep(2)} />}
      {step === 2 && (
        <motion.div 
          key="map"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-screen bg-dark-bg p-10 text-center text-xl text-primary font-light tracking-widest uppercase"
        >
          Mapa de niveles en construcción...
        </motion.div>
      )}
    </AnimatePresence>
  );
}
