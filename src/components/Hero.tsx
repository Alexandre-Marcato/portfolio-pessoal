'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Componente para os círculos flutuantes
function FloatingCircles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-purple-400/30 blur-xl"
        style={{ top: '15%', right: '10%' }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-indigo-400/30 blur-xl"
        style={{ bottom: '20%', left: '15%' }}
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-blue-400/30 blur-xl"
        style={{ top: '35%', left: '10%' }}
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute w-56 h-56 rounded-full bg-violet-400/30 blur-xl"
        style={{ bottom: '35%', right: '15%' }}
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
    </div>
  );
}

// Componente para a animação de partículas
function ParticlesAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const mousePosition = useRef<{x: number, y: number} | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  
  type Particle = {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    alpha: number;
    originalX?: number;
    originalY?: number;
  };

  useEffect(() => {
    console.log("Inicializando animação de partículas");
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas não encontrado");
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Contexto 2D não disponível");
      return;
    }
    
    // Definir o tamanho do canvas para preencher a tela
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log(`Canvas redimensionado: ${canvas.width}x${canvas.height}`);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Mouse leave handler
    const handleMouseLeave = () => {
      mousePosition.current = null;
    };
    
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Criar partículas iniciais
    const initParticles = () => {
      const particlesArray: Particle[] = [];
      const particleCount = Math.min(100, Math.floor(window.innerWidth * window.innerHeight / 10000));
      
      const colors = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#6366f1', '#818cf8'];
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        particlesArray.push({
          x,
          y,
          size: Math.random() * 5 + 2, // Partículas maiores
          speedX: (Math.random() - 0.5) * 1.0, // Velocidade maior
          speedY: (Math.random() - 0.5) * 1.0, // Velocidade maior
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.7 + 0.3, // Maior opacidade
          originalX: x,
          originalY: y
        });
      }
      
      console.log(`Criadas ${particlesArray.length} partículas`);
      return particlesArray;
    };
    
    // Inicializa as partículas
    const particlesArray = initParticles();
    
    // Animar partículas
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Desenhar e atualizar cada partícula
      particlesArray.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
        
        // Atualizar posição
        particlesArray[index].x += particle.speedX;
        particlesArray[index].y += particle.speedY;
        
        // Verificar limites e rebater
        if (particle.x < 0 || particle.x > canvas.width) {
          particlesArray[index].speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particlesArray[index].speedY *= -1;
        }
        
        // Interação com o cursor
        if (mousePosition.current && particle.originalX && particle.originalY) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            
            // Afastar as partículas do cursor
            const angle = Math.atan2(dy, dx);
            const tx = particle.x - Math.cos(angle) * force * 8;
            const ty = particle.y - Math.sin(angle) * force * 8;
            
            // Aplicar uma pequena atração/repulsão suave
            particlesArray[index].x += (tx - particle.x) * 0.05;
            particlesArray[index].y += (ty - particle.y) * 0.05;
          } else {
            // Retornar lentamente à posição original quando longe do cursor
            particlesArray[index].x += (particle.originalX - particle.x) * 0.01;
            particlesArray[index].y += (particle.originalY - particle.y) * 0.01;
          }
        } else if (particle.originalX && particle.originalY) {
          // Retornar lentamente à posição original quando não há interação do cursor
          particlesArray[index].x += (particle.originalX - particle.x) * 0.01;
          particlesArray[index].y += (particle.originalY - particle.y) * 0.01;
        }
      });
      
      // Desenhar linhas conectando partículas próximas
      particlesArray.forEach((particle, i) => {
        particlesArray.forEach((otherParticle, j) => {
          if (i === j) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = 0.4 * (1 - distance / 100); // Linhas mais visíveis
            ctx.lineWidth = 1.0; // Linhas mais grossas
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    console.log("Animação de partículas iniciada");
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      console.log("Animação de partículas encerrada");
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        pointerEvents: 'none'
      }}
    />
  );
}

// Componente para renderizar uma linha de código com syntax highlighting
function CodeLine({ line }: { line: string }) {
  // Expressões regulares para identificar diferentes partes do código
  const keywordRegex = /\b(const|let|var|function|return|new|if|else|import|export|from|class|extends|for|while|switch|case|break|default|try|catch|finally|async|await|=>)\b/g;
  const stringRegex = /(["'`])(.*?)\1/g;
  const commentRegex = /\/\/.*/g;
  const functionRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
  const bracketRegex = /[{}[\]()]/g;

  // Processar o texto para aplicar highlighting
  let result: React.ReactNode[] = [];
  let lastIndex = 0;
  let unresolvedText = line;
  
  // Processar comentários primeiro (prioridade mais alta)
  let commentMatch;
  while ((commentMatch = commentRegex.exec(line)) !== null) {
    const start = commentMatch.index;
    const end = start + commentMatch[0].length;
    
    if (start > lastIndex) {
      result.push(<span key={`text-${lastIndex}-${start}`}>{line.substring(lastIndex, start)}</span>);
    }
    
    result.push(
      <span key={`comment-${start}`} className="comment">
        {commentMatch[0]}
      </span>
    );
    
    lastIndex = end;
  }
  
  // Processar o texto restante se necessário
  if (lastIndex === 0) {
    // Nenhum comentário encontrado, processar outros elementos
    
    // Processar strings
    let stringMatch;
    stringRegex.lastIndex = 0;
    while ((stringMatch = stringRegex.exec(line)) !== null) {
      const start = stringMatch.index;
      const end = start + stringMatch[0].length;
      
      if (start > lastIndex) {
        result.push(<span key={`text-${lastIndex}-${start}`}>{line.substring(lastIndex, start)}</span>);
      }
      
      result.push(
        <span key={`string-${start}`} className="string">
          {stringMatch[0]}
        </span>
      );
      
      lastIndex = end;
    }
    
    // Processar keywords
    let keywordMatch;
    let tempLine = line;
    lastIndex = 0;
    keywordRegex.lastIndex = 0;
    while ((keywordMatch = keywordRegex.exec(line)) !== null) {
      const start = keywordMatch.index;
      const end = start + keywordMatch[0].length;
      
      if (start > lastIndex) {
        // Verificar se há função nesta parte
        const textBefore = line.substring(lastIndex, start);
        functionRegex.lastIndex = 0;
        let funcMatch;
        let funcLastIndex = 0;
        
        while ((funcMatch = functionRegex.exec(textBefore)) !== null) {
          const funcStart = funcMatch.index;
          const funcEnd = funcStart + funcMatch[0].length - 1; // -1 para não incluir o parêntese
          
          if (funcStart > funcLastIndex) {
            result.push(<span key={`text-${lastIndex + funcLastIndex}-${lastIndex + funcStart}`}>{textBefore.substring(funcLastIndex, funcStart)}</span>);
          }
          
          result.push(
            <span key={`function-${lastIndex + funcStart}`} className="function">
              {funcMatch[1]}
            </span>
          );
          result.push(<span key={`paren-${lastIndex + funcEnd}`}>(</span>);
          
          funcLastIndex = funcEnd + 1;
        }
        
        if (funcLastIndex < textBefore.length) {
          result.push(<span key={`text-rest-${lastIndex + funcLastIndex}`}>{textBefore.substring(funcLastIndex)}</span>);
        }
      }
      
      result.push(
        <span key={`keyword-${start}`} className="keyword">
          {keywordMatch[0]}
        </span>
      );
      
      lastIndex = end;
    }
  }
  
  // Adicionar o restante do texto
  if (lastIndex < line.length) {
    const remainingText = line.substring(lastIndex);
    
    // Checar se há funções no texto restante
    functionRegex.lastIndex = 0;
    let funcMatch;
    let funcLastIndex = 0;
    
    while ((funcMatch = functionRegex.exec(remainingText)) !== null) {
      const funcStart = funcMatch.index;
      const funcEnd = funcStart + funcMatch[0].length - 1; // -1 para não incluir o parêntese
      
      if (funcStart > funcLastIndex) {
        result.push(<span key={`text-final-${funcLastIndex}-${funcStart}`}>{remainingText.substring(funcLastIndex, funcStart)}</span>);
      }
      
      result.push(
        <span key={`function-final-${funcStart}`} className="function">
          {funcMatch[1]}
        </span>
      );
      result.push(<span key={`paren-final-${funcEnd}`}>(</span>);
      
      funcLastIndex = funcEnd + 1;
    }
    
    if (funcLastIndex < remainingText.length) {
      result.push(<span key={`text-final-rest-${funcLastIndex}`}>{remainingText.substring(funcLastIndex)}</span>);
    }
  }
  
  return (
    <div className="typing-line">
      {result.length > 0 ? result : line}
    </div>
  );
}

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const textToType = 'Desenvolvedor Full Stack';
  const typingSpeed = 100;

  // Estado para a animação do código de fundo
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const codeSamples = [
    'function createApp() {',
    '  const app = new NextApp();',
    '  return app.initialize({',
    '    features: ["react", "typescript", "tailwind"],',
    '    theme: "modern"',
    '  });',
    '}',
    '',
    'const Portfolio = () => {',
    '  const [projects, setProjects] = useState([]);',
    '  const skills = ["JavaScript", "React", "Node.js"];',
    '',
    '  useEffect(() => {',
    '    // Carregar projetos do portfólio',
    '    fetchProjects().then(data => setProjects(data));',
    '  }, []);',
    '',
    '  return (',
    '    <Layout>',
    '      <Hero />',
    '      <Projects data={projects} />',
    '      <Contact />',
    '    </Layout>',
    '  );',
    '};',
    '',
    '// Tecnologias utilizadas',
    'import React from "react";',
    'import { motion } from "framer-motion";',
    'import tailwindcss from "tailwindcss";',
    'import NextJS from "next";'
  ];

  useEffect(() => {
    if (typedText.length < textToType.length) {
      const timeout = setTimeout(() => {
        setTypedText(textToType.slice(0, typedText.length + 1));
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Efeito para a animação do código
  useEffect(() => {
    if (codeLines.length < codeSamples.length) {
      const interval = setInterval(() => {
        setCodeLines((prev) => [...prev, codeSamples[prev.length]]);
      }, 150);

      return () => clearInterval(interval);
    }

    // Reset e reinicia a animação após mostrar todas as linhas
    if (codeLines.length === codeSamples.length) {
      const resetTimeout = setTimeout(() => {
        setCodeLines([]);
      }, 10000);
      
      return () => clearTimeout(resetTimeout);
    }
  }, [codeLines.length, codeSamples.length]);

  // Variantes de animação para diferentes elementos
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: "easeInOut"
      }
    })
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1] // Efeito de "spring" suave
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3
      }
    }
  };

  const iconAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1.2 + i * 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    })
  };

  return (
    <section className="min-h-screen pt-28 pb-16 flex flex-col justify-center relative overflow-hidden">
      {/* Fundo com gradiente animado */}
      <div className="absolute inset-0 z-0 gradient-bg pointer-events-none"></div>
      
      {/* Círculos flutuantes */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <FloatingCircles />
      </div>
      
      {/* Animação de partículas no fundo */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <ParticlesAnimation />
      </div>
      
      {/* Animação de código no fundo */}
      <div className="absolute inset-0 z-30 overflow-hidden code-animation pointer-events-none">
        <pre className="font-mono text-xs md:text-sm p-8 overflow-hidden h-full w-full code-background opacity-40">
          {codeLines.map((line, index) => (
            <CodeLine key={index} line={line} />
          ))}
        </pre>
      </div>
      
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 z-40 opacity-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-purple-400 blur-3xl"
          initial={{ scale: 0, x: 50 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-blue-400 blur-3xl"
          initial={{ scale: 0, x: -50 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        ></motion.div>
      </motion.div>
      
      {/* Novo elemento de animação de fundo adicional - ondas */}
      <div className="absolute inset-0 z-50 overflow-hidden pointer-events-none">
        <motion.div 
          className="wave-animation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full">
            <path fill="#8b5cf6" fillOpacity="0.2" d="M0,96L48,106.7C96,117,192,139,288,154.7C384,171,480,181,576,165.3C672,149,768,107,864,85.3C960,64,1056,64,1152,74.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full">
            <path fill="#6366f1" fillOpacity="0.2" d="M0,224L48,218.7C96,213,192,203,288,170.7C384,139,480,85,576,85.3C672,85,768,139,864,149.3C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </motion.div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 z-100 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              custom={0}
              variants={fadeIn}
            >
              Olá, me chamo
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-violet-600 mt-2">
                Alexandre Marcato
              </div>
            </motion.h1>
            
            <motion.div 
              className="flex items-center text-xl md:text-2xl font-mono mt-2"
              custom={1}
              variants={fadeIn}
            >
              <span className="mr-2">{typedText}</span>
              <span className="animate-blink">|</span>
            </motion.div>
            
            <motion.p 
              className="max-w-md text-muted-foreground text-base md:text-lg"
              custom={2}
              variants={slideUp}
            >
              Transformando ideias em experiências digitais com criatividade e estilo. Especialista em desenvolvimento web e mobile com foco em UX/UI.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              custom={3}
              variants={fadeIn}
            >
              <Link href="#projetos" className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <motion.span
                  className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a78bfa_0%,#7c3aed_50%,#a78bfa_100%)]"
                  whileHover={{ animationDuration: '1s' }}
                  transition={{ duration: 0.3 }}
                />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-medium backdrop-blur-3xl text-foreground">
                  Meus Projetos
                </span>
              </Link>
              
              <Link href="#contato" className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-transparent px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
                Fale Comigo
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-5 pt-6"
              variants={staggerContainer}
              custom={4}
            >
              <motion.a 
                href="https://github.com/Alexandre-Marcato" 
                target="_blank" 
                rel="noopener noreferrer"
                custom={0}
                variants={iconAnimation}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/alexandre-marcato-998a00362/" 
                target="_blank" 
                rel="noopener noreferrer"
                custom={1}
                variants={iconAnimation}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/marcato.web/" 
                target="_blank" 
                rel="noopener noreferrer"
                custom={2}
                variants={iconAnimation}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex justify-center"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-xl">
              <Image
                src="/images/myperfil.jpeg"
                alt="Alexandre Marcato"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 288px, 384px"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 