export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-black/[0.02] border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-8">
            <h2 className="text-xl font-bold font-[family-name:var(--font-geist-mono)]">
              DEV<span className="text-purple-500">VIBE</span>
            </h2>
          </div>
          
          <div className="text-sm text-foreground/60">
            <p>© {currentYear} Dev Vibe. Todos os direitos reservados.</p>
            <p className="mt-1">Desenvolvido com ❤️ e Next.js</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 