'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="contato" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h2>
          <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Tem um projeto em mente ou quer conversar sobre uma oportunidade? Entre em contato!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="md:col-span-2 lg:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            custom={1}
          >
            <h3 className="text-xl font-bold mb-4">Informações de Contato</h3>
            <p className="mb-6 text-foreground/70">
              Estou disponível para trabalhos freelance, projetos e oportunidades.
            </p>
          </motion.div>

          <motion.div
            className="space-y-6 md:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            custom={2}
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-purple-100 text-purple-500 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium mb-1">Email</p>
                <p className="text-foreground/70">Alexandremarcatodev@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-purple-100 text-purple-500 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium mb-1">Telefone</p>
                <p className="text-foreground/70">(11) 98499-8353</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-2 lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            custom={3}
          >
            <h3 className="text-xl font-bold mb-4">Me Siga</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/seu-username"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full text-foreground/70 hover:bg-purple-100 hover:text-purple-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              
              <a
                href="https://linkedin.com/in/seu-username"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full text-foreground/70 hover:bg-purple-100 hover:text-purple-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              
              <a
                href="https://instagram.com/seu-username"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full text-foreground/70 hover:bg-purple-100 hover:text-purple-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 