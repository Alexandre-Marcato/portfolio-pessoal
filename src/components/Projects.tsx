'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = ['all', 'web', 'app', 'design'];

  return (
    <section id="projetos" className="py-20 bg-black/[0.02]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meus Projetos</h2>
          <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Em breve, compartilharei aqui projetos incríveis. Aguarde as novidades!
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-foreground/70 hover:bg-gray-300'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid place-items-center py-16">
          <div className="max-w-lg text-center">
            <Image 
              src="/images/coming-soon.svg" 
              alt="Em breve"
              width={250}
              height={250}
              className="mx-auto mb-8 opacity-75"
            />
            <h3 className="text-2xl font-bold mb-4">Projetos em Desenvolvimento</h3>
            <p className="text-lg text-foreground/70">
              Estou trabalhando em novos projetos empolgantes que serão adicionados em breve. 
              Fique de olho neste espaço para ver minhas próximas criações!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 