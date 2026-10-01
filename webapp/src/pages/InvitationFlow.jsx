import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hexagon, Loader2, Key, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
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

const LevelMap = ({ guestUser, onStartPhase1, onStartPhase2, onStartPhase3, completedLevels }) => {
  const levels = [
    { id: 1, title: 'Origen', status: 'active' },
    { id: 2, title: 'Evolución', status: completedLevels.includes(1) ? 'active' : 'locked' },
    { id: 3, title: 'Legado', status: completedLevels.includes(2) ? 'active' : 'locked' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="flex flex-col min-h-screen bg-dark-bg p-6 relative overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-wine/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-olive/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Game Lobby Player Badge */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="relative z-10 w-full max-w-md mx-auto mt-10 mb-12 flex flex-col items-center"
      >
        {/* Avatar */}
        <div className="relative flex items-center justify-center w-16 h-16 mb-4">
          <Hexagon className="absolute inset-0 w-full h-full text-white/10 stroke-[0.5]" />
          <span className="text-2xl text-primary font-light uppercase">
            {guestUser?.name?.charAt(0) || 'L'}
          </span>
        </div>
        
        {/* Name */}
        <h1 className="text-white text-sm sm:text-base font-light tracking-widest uppercase text-center mb-4">
          {guestUser?.name}
        </h1>
        
        {/* Role Pill */}
        <div className="flex items-center gap-2 border border-primary/30 px-5 py-1.5 rounded-full bg-primary/10 backdrop-blur-sm shadow-[0_0_15px_rgba(239,239,201,0.1)]">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_5px_rgba(239,239,201,0.8)]" />
          <span className="text-primary text-[9px] font-medium tracking-[0.3em] uppercase">
            {guestUser?.role}
          </span>
        </div>
      </motion.div>

      {/* Map Tree */}
      <div className="relative z-10 flex-1 w-full max-w-md mx-auto flex flex-col items-center justify-center pb-12">
        <h2 className="text-center text-[10px] text-silver/60 tracking-[0.4em] uppercase mb-10">
          Protocolo Legado 3.0
        </h2>

        <div className="relative w-full flex flex-col items-center space-y-10 mb-8">
          {/* Vertical Connecting Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 -translate-x-1/2" />
          
          {/* Progress Line (Lights up according to progress) */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: completedLevels.length === 0 ? "33%" : completedLevels.length === 1 ? "66%" : "100%" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute top-0 left-1/2 w-[1px] bg-gradient-to-b from-primary via-primary/50 to-transparent -translate-x-1/2" 
          />

          {levels.map((level, index) => {
            const isActive = level.status === 'active' || completedLevels.includes(level.id);
            return (
              <motion.div 
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index + 0.5, duration: 0.4 }}
                className="relative flex items-center justify-center group w-full"
              >
                {/* Horizontal Pill (with bg-dark-bg to mask the line behind it) */}
                <div 
                  className={`relative flex items-center w-64 rounded-full p-2 border transition-all duration-500 z-10 bg-dark-bg
                    ${isActive 
                      ? 'border-primary shadow-[0_0_20px_rgba(239,239,201,0.15)]' 
                      : 'border-white/5 opacity-60'
                    }`}
                >
                  {/* Left: Icon Circle */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-primary/10' : 'bg-white/5'}`}>
                    {isActive ? (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Hexagon className="w-5 h-5 text-primary" />
                      </motion.div>
                    ) : (
                      <Lock className="w-4 h-4 text-silver/40" />
                    )}
                  </div>

                  {/* Right: Text */}
                  <div className="ml-4 flex flex-col justify-center">
                    <p className={`text-[8px] tracking-widest uppercase mb-0.5 ${isActive ? 'text-primary' : 'text-silver/40'}`}>
                      Fase 0{level.id}
                    </p>
                    <h3 className={`text-xs font-light tracking-[0.2em] uppercase ${isActive ? 'text-white' : 'text-silver/40'}`}>
                      {level.title}
                    </h3>
                  </div>

                  {/* Interactive overlay */}
                  {isActive && !completedLevels.includes(level.id) && (
                    <button 
                      className="absolute inset-0 w-full h-full cursor-pointer z-20 outline-none rounded-full" 
                      aria-label={`Jugar Fase ${level.title}`}
                      onClick={() => {
                        if (level.id === 1) onStartPhase1();
                        if (level.id === 2) onStartPhase2();
                        if (level.id === 3) onStartPhase3();
                      }}
                    />
                  )}
                  {completedLevels.includes(level.id) && (
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20 pointer-events-none">
                      <CheckCircle2 className="w-4 h-4 text-primary opacity-50" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Final Action */}
        <AnimatePresence>
          {completedLevels.length === 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <button 
                onClick={() => console.log('Final QR')}
                className="relative overflow-hidden px-8 py-3 rounded-full border border-primary text-primary font-light tracking-[0.3em] text-[10px] uppercase hover:bg-primary/10 transition-all duration-300 flex justify-center items-center gap-3 shadow-[0_0_20px_rgba(239,239,201,0.2)]"
              >
                Descifrar Credencial
                <Key className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const PhaseQuestion = ({ 
  phaseNumber, 
  narrative, 
  question, 
  options, 
  isTextBox, 
  onAbort, 
  onTransmit 
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [textVal, setTextVal] = useState("");

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col min-h-screen bg-dark-bg p-4 sm:p-6 items-center justify-center relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-wine/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10 flex flex-col h-full justify-center">
        <div className="w-full flex justify-between items-center mb-6 px-2">
          <button 
            onClick={onAbort}
            className="text-silver/50 hover:text-white text-[9px] tracking-widest uppercase transition-colors flex items-center gap-2"
          >
            <span className="text-lg leading-none">&lsaquo;</span> Abortar
          </button>
          <h2 className="text-silver/30 tracking-[0.4em] text-[8px] uppercase font-light">
            Archivo 0{phaseNumber}/03
          </h2>
        </div>

        <p className="text-silver/80 text-[11px] sm:text-[12px] font-light leading-relaxed mb-6 italic text-center px-4">
          "{narrative}"
        </p>
        
        <div className="p-5 sm:p-6 border border-white/5 bg-[#0A0A0A]/80 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)] text-left relative group">
          <div className="absolute top-0 left-6 w-12 h-[1px] bg-primary/50" />
          
          <h3 className="text-white text-[13px] font-light mb-5 leading-relaxed">
            {question}
          </h3>
          
          {!isTextBox ? (
            <div className="space-y-2">
              {options.map((opt, i) => {
                const isSelected = selectedOption === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(i)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-center justify-between group
                      ${isSelected 
                        ? 'bg-primary/10 border-primary/50 text-white shadow-[0_0_15px_rgba(239,239,201,0.15)]' 
                        : 'bg-black/50 border-white/5 text-silver/60 hover:bg-white/5 hover:border-white/10'
                      }`}
                  >
                    <span className="text-[11px] font-light leading-relaxed pr-4">{opt}</span>
                    <div className={`w-3 h-3 rounded-full border flex-shrink-0 transition-colors
                      ${isSelected ? 'border-primary bg-primary shadow-[0_0_8px_rgba(239,239,201,0.8)]' : 'border-silver/30 group-hover:border-silver/50'}`} 
                    />
                  </button>
                );
              })}
            </div>
          ) : (
            <textarea 
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 text-white font-light text-sm focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-silver/30 pb-2"
              rows={4}
              placeholder="Escriba su mensaje aquí..."
            />
          )}
          
          <div className="mt-6 flex justify-end">
            <button 
              disabled={!isTextBox ? selectedOption === null : textVal.trim() === ""}
              onClick={() => onTransmit(isTextBox ? textVal : options[selectedOption])}
              className="flex items-center gap-2 border border-primary text-primary px-5 py-2 rounded-full text-[9px] tracking-[0.3em] uppercase hover:bg-primary/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              Transmitir
              <Hexagon className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const phase1Data = {
  narrative: "Toda gran estructura nace de un cimiento. Los archivos fundacionales han sido revelados. Para restaurar la memoria histórica, analice y responda a la siguiente interrogante...",
  question: "¿Cuál consideras que es el pilar fundamental que garantiza la supervivencia de una empresa familiar en su primera generación?",
  options: [
    "La creación de un protocolo familiar sólido y temprano.",
    "Separar estrictamente las emociones de las decisiones de negocio.",
    "El liderazgo carismático y la visión del fundador original.",
    "La profesionalización rápida con talento externo a la familia."
  ]
};

const phase2Data = {
  narrative: "Las tormentas forjan el acero. Al crecer la empresa, la familia también se expande, multiplicando las variables. Analice este punto crítico...",
  question: "¿Cuál ha sido el mayor desafío superado en la transición hacia la segunda generación?",
  options: [
    "La delegación del control operativo sin perder la identidad.",
    "Modernizar los sistemas frente a la resistencia al cambio.",
    "Mantener la unidad familiar en tiempos de crisis.",
    "La expansión agresiva hacia mercados no explorados."
  ]
};

const phase3Data = {
  narrative: "La última bóveda. El presente es efímero, pero las palabras trascienden. Su visión completará la matriz de datos del Legado 3.0...",
  question: "El futuro se escribe hoy. Deje un breve mensaje, visión o consejo para las futuras generaciones de líderes:"
};

export default function InvitationFlow() {
  const [step, setStep] = useState(0);
  const [guestUser, setGuestUser] = useState(null);
  const [completedLevels, setCompletedLevels] = useState([]);

  const handleVerificationSuccess = (user) => {
    setGuestUser(user);
    setStep(2);
  };

  return (
    <AnimatePresence mode="wait">
      {step === 0 && <Splash key="splash" onNext={() => setStep(1)} />}
      {step === 1 && <Register key="register" onNext={handleVerificationSuccess} />}
      {step === 2 && (
        <LevelMap 
          key="map" 
          guestUser={guestUser} 
          completedLevels={completedLevels}
          onStartPhase1={() => setStep(3)} 
          onStartPhase2={() => setStep(4)} 
          onStartPhase3={() => setStep(5)} 
        />
      )}
      {step === 3 && (
        <PhaseQuestion 
          key="phase1"
          phaseNumber={1}
          narrative={phase1Data.narrative}
          question={phase1Data.question}
          options={phase1Data.options}
          onAbort={() => setStep(2)}
          onTransmit={async (answer) => {
            // TODO: Save answer to Supabase here
            if (!completedLevels.includes(1)) {
              setCompletedLevels([...completedLevels, 1]);
            }
            setStep(2);
          }}
        />
      )}
      {step === 4 && (
        <PhaseQuestion 
          key="phase2"
          phaseNumber={2}
          narrative={phase2Data.narrative}
          question={phase2Data.question}
          options={phase2Data.options}
          onAbort={() => setStep(2)}
          onTransmit={async (answer) => {
            // TODO: Save answer to Supabase here
            if (!completedLevels.includes(2)) {
              setCompletedLevels([...completedLevels, 2]);
            }
            setStep(2);
          }}
        />
      )}
      {step === 5 && (
        <PhaseQuestion 
          key="phase3"
          phaseNumber={3}
          narrative={phase3Data.narrative}
          question={phase3Data.question}
          isTextBox={true}
          onAbort={() => setStep(2)}
          onTransmit={async (answer) => {
            // TODO: Save answer to Supabase here
            if (!completedLevels.includes(3)) {
              setCompletedLevels([...completedLevels, 3]);
            }
            // All phases done, unlock credentials button in map
            setStep(2);
          }}
        />
      )}
    </AnimatePresence>
  );
}
