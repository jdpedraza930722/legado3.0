import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Sparkles, Hexagon, Loader2, Key, AlertCircle, CheckCircle2, Lock, Download } from 'lucide-react';
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
      className="relative flex flex-col items-center justify-center min-h-dvh bg-dark-bg overflow-hidden pb-8 sm:pb-0"
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

;

const LevelMap = ({ guestUser, onStartPhase1, onStartPhase2, onStartPhase3, onFinalQR, completedLevels }) => {
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
      className="flex flex-col min-h-dvh bg-dark-bg p-6 pb-12 relative overflow-hidden"
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
      <div className="relative z-10 flex-1 w-full max-w-md mx-auto flex flex-col items-center justify-center pb-12 mt-4">
        <div className="flex items-center gap-2 sm:gap-4 mb-10 opacity-70">
          <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-primary/50" />
          <h2 className="text-center text-[9px] sm:text-[11px] text-silver tracking-[0.3em] sm:tracking-[0.5em] uppercase font-medium whitespace-nowrap">
            Protocolo Legado
          </h2>
          <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        <div className="relative w-full flex flex-col items-center space-y-12">
          {/* Vertical Connecting Line */}
          <div className="absolute top-0 bottom-8 left-1/2 w-[1px] bg-white/10 -translate-x-1/2" />
          
          {/* Progress Line (Lights up according to progress) */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: completedLevels.length === 0 ? "25%" : completedLevels.length === 1 ? "50%" : completedLevels.length === 2 ? "75%" : "100%" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute top-0 left-1/2 w-[1px] bg-gradient-to-b from-primary via-primary/80 to-transparent -translate-x-1/2" 
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
          {/* Final Action */}
          <AnimatePresence>
            {completedLevels.length === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 pt-4 bg-dark-bg"
              >
                <button 
                  onClick={onFinalQR}
                  className="relative overflow-hidden px-6 sm:px-10 py-3 sm:py-4 rounded-full border-2 border-primary bg-primary/10 text-primary font-medium tracking-[0.2em] sm:tracking-[0.4em] text-[10px] sm:text-xs uppercase hover:bg-primary/20 hover:scale-105 transition-all duration-300 flex justify-center items-center gap-2 sm:gap-3 shadow-[0_0_30px_rgba(239,239,201,0.3)] group whitespace-nowrap"
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1.5 }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                  />
                  Descifrar Credencial
                  <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
      className="flex flex-col min-h-dvh bg-dark-bg p-4 pb-12 sm:p-6 items-center justify-center relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-wine/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10 flex flex-col h-full justify-center">
        <div className="w-full flex justify-between items-center mb-6 px-2">
          <button 
            onClick={onAbort}
            className="text-silver/80 hover:text-white text-[10px] sm:text-xs tracking-widest uppercase transition-colors flex items-center gap-2 font-medium"
          >
            <span className="text-xl leading-none -mt-1">&lsaquo;</span> Abortar
          </button>
          <h2 className="text-silver/70 tracking-[0.4em] text-[9px] sm:text-[10px] uppercase font-medium">
            Archivo 0{phaseNumber}/03
          </h2>
        </div>

        <p className="text-silver/90 text-xs sm:text-sm font-normal leading-relaxed mb-6 italic text-center px-4">
          "{narrative}"
        </p>
        
        <div className="p-5 sm:p-6 border border-white/5 bg-[#0A0A0A]/80 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)] text-left relative group">
          <div className="absolute top-0 left-6 w-12 h-[1px] bg-primary/50" />
          
          <h3 className="text-white text-sm sm:text-base font-normal mb-5 leading-relaxed">
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
                        : 'bg-black/50 border-white/5 text-silver/80 hover:bg-white/5 hover:border-white/10 hover:text-white'
                      }`}
                  >
                    <span className="text-xs sm:text-sm font-normal leading-relaxed pr-4 transition-colors">{opt}</span>
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
              className="w-full bg-transparent border-b border-white/30 text-white font-normal text-sm sm:text-base focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-silver/50 pb-2"
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

const getPhaseData = (phaseNumber, role) => {
  const isStudent = role?.toLowerCase().includes("estudiante");

  if (phaseNumber === 1) {
    if (isStudent) {
      return {
        narrative: "Toda gran estructura nace de un cimiento. Los archivos fundacionales han sido revelados. Para restaurar la memoria histórica, analiza y responde a la siguiente interrogante...",
        question: "¿Qué valor de una empresa familiar te comprometerías a preservar, incluso cuando llegue el momento de transformarla?",
        options: [
          "La visión a largo plazo y el compromiso con la familia.",
          "La cercanía y trato humano con los colaboradores.",
          "La honestidad y transparencia en cada decisión.",
          "La pasión y el espíritu emprendedor del fundador."
        ]
      };
    } else {
      return {
        narrative: "Toda gran estructura nace de un cimiento. Los archivos fundacionales han sido revelados. Para restaurar la memoria histórica, analice y responda a la siguiente interrogante...",
        question: "¿Qué valor considera indispensable preservar para que una empresa familiar pueda crecer sin perder su esencia?",
        options: [
          "La confianza y unidad familiar por encima de todo.",
          "La humildad para aprender y adaptarse al mercado.",
          "La integridad y ética en los negocios.",
          "El espíritu de servicio y cercanía con la gente."
        ]
      };
    }
  }

  if (phaseNumber === 2) {
    if (isStudent) {
      return {
        narrative: "Las tormentas forjan el acero. Al crecer la empresa, la familia también se expande, multiplicando las variables. Analiza este punto crítico...",
        question: "Si mañana asumieras la dirección de una empresa familiar, ¿qué sería lo primero que transformarías para asegurar su futuro?",
        options: [
          "Implementaría nuevas tecnologías e innovación digital.",
          "Estructuraría procesos y crearía un gobierno corporativo claro.",
          "Diversificaría los negocios y exploraría nuevos mercados.",
          "Profesionalizaría al equipo integrando talento externo."
        ]
      };
    } else {
      return {
        narrative: "Las tormentas forjan el acero. Al crecer la empresa, la familia también se expande, multiplicando las variables. Analice este punto crítico...",
        question: "¿Cuál es el cambio más importante que debe impulsar la siguiente generación para profesionalizar una empresa familiar?",
        options: [
          "Implementar un gobierno corporativo sólido.",
          "Separar las decisiones emocionales del negocio.",
          "Atraer talento externo especializado para puestos clave.",
          "Adoptar nuevas tecnologías y digitalizar la operación."
        ]
      };
    }
  }

  if (phaseNumber === 3) {
    if (isStudent) {
      return {
        narrative: "La última bóveda. El presente es efímero, pero las palabras trascienden. Tu visión completará la matriz de datos del Legado 3.0...",
        question: "Cuando termine tu trayectoria como director o empresario, ¿por qué te gustaría que las próximas generaciones te recordaran?",
        isTextBox: true
      };
    } else {
      return {
        narrative: "La última bóveda. El presente es efímero, pero las palabras trascienden. Su visión completará la matriz de datos del Legado 3.0...",
        question: "Si pudiera transmitir una sola enseñanza a las próximas generaciones de empresarios familiares, ¿cuál le gustaría que perdurara?",
        isTextBox: true
      };
    }
  }
};

const FinalTicket = ({ guestUser }) => {
  const [downloading, setDownloading] = useState(false);

  const downloadQR = () => {
    setDownloading(true);
    const svg = document.getElementById("qr-code");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      // Add padding around QR
      const padding = 40;
      canvas.width = img.width + (padding * 2);
      canvas.height = img.height + (padding * 2) + 60; // Extra room for text at bottom
      
      // Draw background
      ctx.fillStyle = "#0A0A0A"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw QR border
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(padding - 10, padding - 10, img.width + 20, img.height + 20);

      // Draw QR
      ctx.drawImage(img, padding, padding);
      
      // Draw Text
      ctx.fillStyle = "#EFEFC9"; // primary color
      ctx.font = "bold 24px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`ID: ${guestUser?.access_code || "0000"}`, canvas.width / 2, canvas.height - 30);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `Legado3_Acceso_${guestUser?.access_code || "0000"}.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
      setDownloading(false);
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col min-h-dvh bg-dark-bg p-4 pb-10 sm:p-6 items-center justify-center relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-silver/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-sm w-full relative z-10 flex flex-col h-full justify-center py-4">
        
        {/* Ticket Header (Name & Role) */}
        <div className="text-center mb-4">
          <h1 className="text-white text-sm font-light tracking-widest uppercase mb-2">
            {guestUser?.name || "Invitado"}
          </h1>
          <div className="inline-flex items-center gap-2 border border-primary/30 px-3 py-1 rounded-full bg-primary/10">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-[8px] font-medium tracking-[0.3em] uppercase">
              {guestUser?.role || "VIP"}
            </span>
          </div>
        </div>

        {/* The Black Card */}
        <motion.div 
          initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="p-6 sm:p-8 border border-white/10 bg-black rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
            
            {/* Ticket Punch Holes */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-dark-bg rounded-full border-r border-white/10 shadow-[inset_-5px_0_10px_rgba(0,0,0,0.5)]" />
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-dark-bg rounded-full border-l border-white/10 shadow-[inset_5px_0_10px_rgba(0,0,0,0.5)]" />
            
            {/* Perforated Line */}
            <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 border-t-[1.5px] border-dashed border-white/10" />

            {/* Top Half */}
            <div className="pb-6">
              <h2 className="text-primary text-xl font-light tracking-[0.4em] uppercase mb-1">Legado 3.0</h2>
              <p className="text-silver/80 text-[8px] tracking-[0.3em] uppercase mb-4">Origen · Evolución · Legado</p>

              <p className="text-white text-[11px] font-light leading-relaxed px-2 tracking-wide opacity-90">
                Será un honor contar con su presencia en nuestra exclusiva cena de gala.
              </p>
            </div>

            {/* Bottom Half */}
            <div className="pt-6">
              <div className="flex flex-col items-center justify-center relative group">
                <div className="bg-white p-3 rounded-xl mb-3 shadow-[0_0_40px_rgba(255,255,255,0.1)] ring-1 ring-white/20">
                  <QRCodeSVG 
                    id="qr-code"
                    value={`LEGADO3.0-${guestUser?.access_code || "0000"}`}
                    size={120} 
                    level={"H"}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                  />
                </div>
                <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase">
                  ID: {guestUser?.access_code}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-left mt-6">
                <div>
                  <p className="text-silver/60 text-[8px] uppercase tracking-[0.2em] mb-0.5">Fecha</p>
                  <p className="text-white text-[11px] font-light tracking-wide">11 de nov 2026</p>
                </div>
                <div>
                  <p className="text-silver/60 text-[8px] uppercase tracking-[0.2em] mb-0.5">Hora</p>
                  <p className="text-white text-[11px] font-light tracking-wide">7:00 p. m.</p>
                </div>
                <div>
                  <p className="text-silver/60 text-[8px] uppercase tracking-[0.2em] mb-0.5">Dress Code</p>
                  <p className="text-white text-[11px] font-light uppercase tracking-widest">All Black</p>
                </div>
                <div>
                  <p className="text-silver/60 text-[8px] uppercase tracking-[0.2em] mb-0.5">Lugar</p>
                  <p className="text-white text-[11px] font-light leading-tight tracking-wide">
                    Torre Legacy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Download Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-6 flex flex-col items-center gap-3"
        >
          <button 
            onClick={downloadQR}
            disabled={downloading}
            className="flex items-center gap-2 border border-primary text-primary px-6 py-2.5 rounded-full text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase hover:bg-primary/10 transition-all shadow-[0_0_20px_rgba(239,239,201,0.1)] active:scale-95 disabled:opacity-50"
          >
            {downloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            Descargar Código
          </button>
          <p className="text-silver/50 text-[8px] font-light tracking-widest uppercase text-center max-w-xs">
            Presente este código en la entrada
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function InvitationFlow() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [step, setStep] = useState(0);
  const [guestUser, setGuestUser] = useState(null);
  const [completedLevels, setCompletedLevels] = useState([]);

  useEffect(() => {
    // The Magic Link logic: Extract 'guest' from URL
    const fetchGuest = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const guestId = urlParams.get('guest');
      
      if (guestId) {
        const { data, error } = await supabase
          .from('guests')
          .select('*')
          .eq('access_code', guestId)
          .single();
        
        if (data) {
          setGuestUser(data);
          // If they already answered previously, we can pre-fill their completed levels
          const completed = [];
          const aiResponses = data.ai_responses || {};
          if (aiResponses.fase1) completed.push(1);
          if (aiResponses.fase2) completed.push(2);
          if (aiResponses.fase3) completed.push(3);
          setCompletedLevels(completed);

          if (completed.length === 3) {
            setStep(6);
          }
        } else {
          console.error("Guest not found:", error);
          // Fallback to mock if not found
          setGuestUser({ name: "INVITADO VIP", role: "DIRECTIVO", access_code: "0000" });
        }
      } else {
        // Development fallback if accessed without URL parameter
        setGuestUser({ name: "INVITADO VIP", role: "DIRECTIVO", access_code: "0000" });
      }
      setIsInitializing(false);
    };
    
    fetchGuest();
  }, []);

  if (isInitializing) {
    return (
      <div className="min-h-dvh bg-dark-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {step === 0 && <Splash key="splash" onNext={() => setStep(2)} />}
      {step === 2 && (
        <LevelMap 
          key="map" 
          guestUser={guestUser} 
          completedLevels={completedLevels}
          onStartPhase1={() => setStep(3)} 
          onStartPhase2={() => setStep(4)} 
          onStartPhase3={() => setStep(5)}
          onFinalQR={() => setStep(6)} 
        />
      )}
      {step === 3 && (
        <PhaseQuestion 
          key="phase1"
          phaseNumber={1}
          narrative={getPhaseData(1, guestUser?.role).narrative}
          question={getPhaseData(1, guestUser?.role).question}
          options={getPhaseData(1, guestUser?.role).options}
          onAbort={() => setStep(2)}
          onTransmit={async (answer) => {
            if (guestUser?.access_code && guestUser.access_code !== "0000") {
              const newAiResponses = { ...(guestUser.ai_responses || {}), fase1: answer };
              const hasAllPhases = newAiResponses.fase1 && newAiResponses.fase2 && newAiResponses.fase3;
              const updates = { ai_responses: newAiResponses };
              if (hasAllPhases) updates.status = 'invited';

              await supabase
                .from('guests')
                .update(updates)
                .eq('access_code', guestUser.access_code);
              setGuestUser({ ...guestUser, ...updates });
            }
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
          narrative={getPhaseData(2, guestUser?.role).narrative}
          question={getPhaseData(2, guestUser?.role).question}
          options={getPhaseData(2, guestUser?.role).options}
          onAbort={() => setStep(2)}
          onTransmit={async (answer) => {
            if (guestUser?.access_code && guestUser.access_code !== "0000") {
              const newAiResponses = { ...(guestUser.ai_responses || {}), fase2: answer };
              const hasAllPhases = newAiResponses.fase1 && newAiResponses.fase2 && newAiResponses.fase3;
              const updates = { ai_responses: newAiResponses };
              if (hasAllPhases) updates.status = 'invited';

              await supabase
                .from('guests')
                .update(updates)
                .eq('access_code', guestUser.access_code);
              setGuestUser({ ...guestUser, ...updates });
            }
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
          narrative={getPhaseData(3, guestUser?.role).narrative}
          question={getPhaseData(3, guestUser?.role).question}
          isTextBox={true}
          onAbort={() => setStep(2)}
          onTransmit={async (answer) => {
            if (guestUser?.access_code && guestUser.access_code !== "0000") {
              const newAiResponses = { ...(guestUser.ai_responses || {}), fase3: answer };
              const hasAllPhases = newAiResponses.fase1 && newAiResponses.fase2 && newAiResponses.fase3;
              const updates = { ai_responses: newAiResponses };
              if (hasAllPhases) updates.status = 'invited';

              await supabase
                .from('guests')
                .update(updates)
                .eq('access_code', guestUser.access_code);
              setGuestUser({ ...guestUser, ...updates });
            }
            if (!completedLevels.includes(3)) {
              setCompletedLevels([...completedLevels, 3]);
            }
            // All phases done, unlock credentials button in map
            setStep(2);
          }}
        />
      )}
      {step === 6 && (
        <FinalTicket 
          key="ticket" 
          guestUser={guestUser} 
        />
      )}
    </AnimatePresence>
  );
}
