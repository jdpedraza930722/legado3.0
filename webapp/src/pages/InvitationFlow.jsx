import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hexagon, Loader2, Key, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../supabase';

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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_100%)] z-10 pointer-events-none opacity-80" />
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
              className="h-full bg-gradient-to-r from-primary/50 to-primary shadow-[0_0_15px_rgba(239,239,201,0.5)] transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Register Component as VIP Access Key
const Register = ({ onNext }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAccess = async () => {
    if (!email) {
      setError("Ingrese su Llave de Acceso.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Formato de credencial inválido.");
      return;
    }
    
    setLoading(true);
    setError('');

    // Query Supabase for the guest
    const { data, error: fetchError } = await supabase
      .from('guests')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (fetchError || !data) {
      setLoading(false);
      setError("Credenciales no válidas. El acceso fue denegado.");
    } else {
      // Show success message and wait a bit before transitioning
      setSuccess("Acceso Autorizado.");
      setTimeout(() => {
        onNext(data);
      }, 1500);
    }
  };

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
        className="relative z-10 w-full max-w-sm bg-black/40 backdrop-blur-3xl border border-white/5 border-t-white/20 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {/* Subtle Watermark */}
        <Hexagon className="absolute -bottom-10 -right-10 w-64 h-64 text-white/[0.02] pointer-events-none" />

        <div className="text-center mb-8">
          <h2 className="text-base text-white font-light tracking-[0.3em] uppercase mb-2 whitespace-nowrap">
            Portal de Acceso
          </h2>
          <p className="text-silver/60 text-[9px] font-light tracking-widest uppercase">
            Autentifique su credencial
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="relative flex items-center border-b border-white/20 focus-within:border-primary transition-colors duration-300 pb-2">
            <Key className="w-4 h-4 text-silver/40 mr-3" />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || success}
              onKeyDown={(e) => e.key === 'Enter' && handleAccess()}
              className="w-full bg-transparent border-0 px-0 text-white focus:outline-none focus:ring-0 transition-all font-light text-sm placeholder:text-silver/40 placeholder:tracking-widest placeholder:uppercase placeholder:text-[10px] disabled:opacity-50" 
              placeholder="Correo Institucional"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }} 
                className="flex items-center justify-center gap-2 text-red-400 text-xs font-light tracking-wide bg-red-400/10 py-2 px-3 rounded-md border border-red-400/20"
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <p className="leading-tight text-center">{error}</p>
              </motion.div>
            )}
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }} 
                className="flex items-center justify-center gap-2 text-primary text-xs font-light tracking-wide bg-primary/10 py-2 px-3 rounded-md border border-primary/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <p className="leading-tight text-center">{success}</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button 
            onClick={handleAccess}
            disabled={loading || success}
            className="relative overflow-hidden w-full mt-8 py-3 rounded-full border border-primary/30 text-primary font-light tracking-[0.3em] text-[10px] uppercase hover:bg-wine/40 hover:border-wine hover:text-white transition-all duration-300 flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(100,0,23,0.5)]"
          >
            {/* Shimmer Effect */}
            <motion.div
              animate={{ x: ["-100%", "300%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1.5 }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
            />
            <span className="relative z-10 flex items-center gap-3">
              {loading && !success ? <Loader2 className="w-4 h-4 animate-spin" /> : "Iniciar Experiencia"}
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function InvitationFlow() {
  const [step, setStep] = useState(0);
  const [guestUser, setGuestUser] = useState(null);

  const handleVerificationSuccess = (user) => {
    setGuestUser(user);
    setStep(2);
  };

  return (
    <AnimatePresence mode="wait">
      {step === 0 && <Splash key="splash" onNext={() => setStep(1)} />}
      {step === 1 && <Register key="register" onNext={handleVerificationSuccess} />}
      {step === 2 && (
        <motion.div 
          key="map"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-screen bg-dark-bg p-10 text-center text-xl text-primary font-light tracking-widest uppercase"
        >
          <div className="mb-4">
            <span className="text-silver/60 text-sm block mb-2">Acceso Concedido:</span>
            {guestUser?.name} <br/> 
            <span className="text-sm opacity-50">({guestUser?.role})</span>
          </div>
          Mapa de niveles en construcción...
        </motion.div>
      )}
    </AnimatePresence>
  );
}
