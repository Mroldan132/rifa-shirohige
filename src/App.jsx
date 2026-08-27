import React, { useState, useEffect } from 'react';
import { Anchor, Cat, Heart, Copy, CheckCircle2, Send, MessageCircle, Info, Landmark } from 'lucide-react';

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [soldNumbers, setSoldNumbers] = useState([]);

  useEffect(() => {
    const sheetCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT3gCjvbIvAWTAIGpsjEWIoJ8Pks3qNIjjcjx3_VxYMaceVxfNmUd2bbpOlkU4-1fojEe8IKlciO9j0/pub?output=csv';

    const fetchSoldNumbers = async () => {
      try {
        const response = await fetch(sheetCsvUrl);
        const text = await response.text();
        const numbersList = text
          .split('\n')
          .map(row => parseInt(row.trim(), 10))
          .filter(num => !isNaN(num));
          console.log(numbersList)
        setSoldNumbers(numbersList);
      } catch (error) {
        console.error("Error leyendo el Excel:", error);
      }
    };

        fetchSoldNumbers();
  }, []);

  const handleCopyInstruction = () => {
    if (!selectedNumber) return;
    const text = `¡Hola! Quiero separar el número ${selectedNumber} de la Gran Rifa del Capitán Shirohige ⚓🐱`;
    copyToClipboard(text, `Ticket ${selectedNumber} listo para pedir por WhatsApp.`);
  };

  const handleCopyData = (text, type) => {
    copyToClipboard(text, `Dato de ${type} copiado 💖`);
  };

  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(message);
      setShowToast(true);
    });
  };

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const renderRaffleGrid = () => {
    let buttons = [];
    for (let i = 1; i <= 200; i++) {
      const isSold = soldNumbers.includes(i);
      const isSelected = selectedNumber === i;

      buttons.push(
        <button
          key={i}
          disabled={isSold}
          onClick={() => setSelectedNumber(i)}
          className={`
            w-10 h-10 rounded-xl font-comic text-sm transition-all duration-200 flex items-center justify-center border-2
            ${isSold 
              ? 'bg-slate-300 border-slate-400 text-slate-500 cursor-not-allowed opacity-60' 
              : isSelected
                ? 'bg-yellow-400 border-slate-900 text-slate-900 transform scale-110 shadow-[2px_2px_0px_rgba(15,23,42,1)] z-10'
                : 'bg-white border-slate-900 text-slate-900 hover:bg-sky-200 cursor-pointer shadow-[2px_2px_0px_rgba(15,23,42,1)] hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(15,23,42,1)]'
            }
          `}
          title={isSold ? 'Ya comprado' : '¡Elígeme!'}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const customStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@600;700;800&display=swap');
    
    html { scroll-behavior: smooth; }
    .font-comic { font-family: 'Fredoka', sans-serif; }
    .font-text { font-family: 'Nunito', sans-serif; }
    
    .bg-texture {
      background-color: #e5d9c5;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
    }

    .comic-shadow { box-shadow: 6px 6px 0px rgba(15, 23, 42, 1); }
    .comic-shadow-sm { box-shadow: 4px 4px 0px rgba(15, 23, 42, 1); }
    
    .text-outline {
      text-shadow: -2px -2px 0 #0f172a, 2px -2px 0 #0f172a, -2px 2px 0 #0f172a, 2px 2px 0 #0f172a, -3px 0 0 #0f172a, 3px 0 0 #0f172a, 0 -3px 0 #0f172a, 0 3px 0 #0f172a;
    }

    .blob-purple { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; background: #7c3aed; }
    .blob-teal { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; background: #2dd4bf; }
    .blob-yellow { border-radius: 50% 50% 20% 80% / 25% 80% 20% 75%; background: #fde047; }

    .speech-tail {
      position: absolute; bottom: -20px; right: 40px; width: 0; height: 0;
      border-left: 20px solid transparent; border-right: 10px solid transparent; border-top: 20px solid #0f172a;
    }
    .speech-tail::after {
      content: ''; position: absolute; bottom: 4px; right: -7px; width: 0; height: 0;
      border-left: 16px solid transparent; border-right: 6px solid transparent; border-top: 16px solid white;
    }

    .tape {
      background-color: rgba(253, 230, 138, 0.7); box-shadow: 0 1px 3px rgba(0,0,0,0.2); backdrop-filter: blur(2px);
    }

    .animate-float { animation: float 6s ease-in-out infinite; }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: #e5d9c5; }
    ::-webkit-scrollbar-thumb { background: #7c3aed; border: 2px solid #0f172a; border-radius: 5px; }
  `;

  return (
    <div className="min-h-screen bg-texture font-text relative overflow-x-hidden selection:bg-purple-300">
      <style>{customStyles}</style>

      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 blob-yellow opacity-40 z-0"></div>
      <div className="fixed bottom-[10%] right-[-5%] w-[30rem] h-[30rem] blob-teal opacity-30 z-0"></div>
      <div className="fixed top-[40%] left-[-15%] w-[40rem] h-[20rem] blob-purple opacity-20 z-0 rotate-12"></div>

      <nav className="w-full bg-white/90 border-b-4 border-slate-900 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#" className="text-2xl font-comic font-bold text-slate-900 flex items-center gap-2">
            <Anchor className="text-purple-600 fill-purple-600" size={28} /> Shirohige
          </a>
          <div className="space-x-2 md:space-x-4 text-sm md:text-base font-bold font-comic">
            <a href="#historia" className="px-3 py-1 hover:bg-yellow-300 border-2 border-transparent hover:border-slate-900 rounded-lg transition-all hidden sm:inline-block">Historia</a>
            <a href="#rifa" className="px-3 py-1 bg-teal-400 border-2 border-slate-900 rounded-lg hover:-translate-y-1 comic-shadow-sm transition-all text-slate-900">🎟️ Rifa</a>
          </div>
        </div>
      </nav>

      <main className="flex-grow relative z-10">
        
        <header className="relative px-4 pt-12 pb-24 md:pt-20 md:pb-32 max-w-5xl mx-auto flex flex-col items-center">
          
          <div className="relative mb-12 text-center transform -rotate-2">
            <div className="absolute inset-0 bg-teal-400 rounded-3xl border-4 border-slate-900 comic-shadow transform rotate-3 scale-105"></div>
            <div className="relative bg-white rounded-3xl border-4 border-slate-900 comic-shadow p-6 px-10">
              <div className="tape absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 -rotate-3 border border-amber-200 z-20"></div>
              <h1 className="text-5xl md:text-7xl font-comic font-black text-white text-outline tracking-wider">
                Rifa <span className="text-yellow-400">Flash</span>
              </h1>
              <div className="bg-yellow-400 border-4 border-slate-900 rounded-full px-6 py-2 mt-4 inline-block font-comic font-bold text-xl comic-shadow-sm transform rotate-2">
                ¡Ayuda! ⚓
              </div>
            </div>
            
            <div className="absolute -left-10 md:-left-20 -bottom-8 bg-purple-600 text-white font-comic font-bold border-4 border-slate-900 rounded-3xl p-4 comic-shadow transform -rotate-12 hover:rotate-0 transition-transform cursor-pointer z-30">
              <p className="text-sm">Costo por ticket:</p>
              <p className="text-2xl text-yellow-300">10 soles</p>
            </div>

            <div className="absolute -right-8 md:-right-16 -top-10 bg-purple-600 text-white font-comic font-bold border-4 border-slate-900 rounded-full w-28 h-28 flex flex-col items-center justify-center comic-shadow transform rotate-12 hover:rotate-0 transition-transform cursor-pointer z-30">
              <span className="text-4xl text-yellow-300">4</span>
              <span className="text-lg leading-none">Premios</span>
            </div>
          </div>

          {}
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-end justify-center gap-8 mt-10 relative">
            
            <div className="w-full md:w-1/2 bg-white border-4 border-slate-900 rounded-[2.5rem] p-8 comic-shadow relative z-20 md:mb-16 transform md:-rotate-2">
              <h2 className="text-3xl font-comic font-bold text-amber-700 mb-4 leading-tight">
                ¿Me ayudas a llegar a la meta?
              </h2>
              <p className="text-xl text-slate-700 font-bold mb-6">
                Puur-favor, dame la patita que hay unos premios increíbles y necesito mis medicinas.
              </p>
              <div className="flex gap-4 text-yellow-400">
                <Send className="fill-yellow-400 drop-shadow-md" size={32}/>
                <MessageCircle className="fill-yellow-400 drop-shadow-md" size={32}/>
                <Heart className="fill-yellow-400 drop-shadow-md" size={32}/>
              </div>
              <div className="speech-tail hidden md:block"></div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-slate-900 md:hidden">
                 <div className="absolute -top-[24px] -left-[10px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-white"></div>
              </div>
            </div>

            <div className="w-72 h-72 md:w-96 md:h-96 relative z-10 animate-float mt-10 md:mt-0">
               <div className="absolute -left-8 top-8 w-48 h-56 bg-white p-2 pb-8 border-4 border-slate-900 comic-shadow transform -rotate-12 z-0 hidden md:block hover:rotate-0 hover:z-40 transition-all cursor-pointer">
                 <div className="tape absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 rotate-3 border border-amber-200 z-20"></div>
                 <img src="https://placehold.co/400x500/fde047/0f172a?text=Foto+Extra" alt="Shiro Extra" className="w-full h-full object-cover border-2 border-slate-900" />
               </div>

               <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full shadow-[2px_4px_4px_rgba(0,0,0,0.4)] border-2 border-red-800 z-30">
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white/60 rounded-full"></div>
               </div>
               
               <img 
                 src="https://placehold.co/600x600/ffffff/0f172a?text=Pon+Foto+de\nShirohige+Aqui" 
                 alt="Shirohige" 
                 className="w-full h-full object-cover rounded-3xl border-8 border-white comic-shadow transform rotate-3 relative z-20 bg-white"
               />
               <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-slate-900 p-3 rounded-full comic-shadow-sm border-4 border-slate-900 transform rotate-12 z-30">
                 <Cat size={32} />
               </div>
            </div>

          </div>
        </header>

        {}
        <section id="historia" className="px-4 py-16 relative">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#fdfbf7] p-8 md:p-12 border-4 border-slate-900 comic-shadow transform -rotate-1 relative">
              <div className="tape absolute -top-4 -left-6 w-24 h-8 rotate-45 border border-amber-200 z-20"></div>
              <div className="tape absolute -bottom-4 -right-6 w-24 h-8 rotate-45 border border-amber-200 z-20"></div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-comic font-bold mb-4 text-slate-900 flex items-center gap-3">
                    Soy Shirohige ⚓
                  </h3>
                  <div className="w-full h-2 bg-purple-500 rounded-full mb-6 border-2 border-slate-900"></div>
                  <p className="mb-4 text-xl font-bold text-slate-700 leading-relaxed">
                    TEXTO
                  </p>
                  <p className="text-lg font-bold text-slate-600 bg-yellow-100 p-4 rounded-xl border-4 border-slate-900 border-dashed">
                    <Info className="inline-block mr-2 text-yellow-600" />
                    Todo lo recaudado será para mis análisis y tratamiento veterinario. ¡Te lo agradece!
                  </p>
                </div>
                
                <div className="w-full md:w-1/2 flex justify-center items-center relative h-72 md:h-80 mt-10 md:mt-0">
                  <div className="absolute left-0 top-0 md:-left-4 md:top-4 w-40 h-48 bg-white p-2 pb-8 border-4 border-slate-900 comic-shadow transform -rotate-12 hover:rotate-0 hover:z-40 transition-all cursor-pointer z-10">
                    <div className="tape absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 rotate-6 border border-amber-200 z-20"></div>
                    <img src="https://placehold.co/400x500/2dd4bf/0f172a?text=Foto+1" alt="Shiro 1" className="w-full h-full object-cover border-2 border-slate-900" />
                  </div>
                  
                  <div className="absolute right-0 bottom-0 md:-right-4 md:bottom-4 w-44 h-52 bg-white p-2 pb-8 border-4 border-slate-900 comic-shadow transform rotate-12 hover:rotate-0 hover:z-40 transition-all cursor-pointer z-20">
                    <div className="tape absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 -rotate-3 border border-amber-200 z-20"></div>
                    <img src="https://placehold.co/400x500/a78bfa/0f172a?text=Foto+2" alt="Shiro 2" className="w-full h-full object-cover border-2 border-slate-900" />
                  </div>
                  
                  <div className="absolute z-30 w-48 h-56 bg-white p-2 pb-8 border-4 border-slate-900 comic-shadow transform rotate-2 hover:-translate-y-2 hover:scale-105 transition-all cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full shadow-[2px_4px_4px_rgba(0,0,0,0.4)] border-2 border-red-800 z-30">
                      <div className="absolute top-1 left-1 w-2 h-2 bg-white/60 rounded-full"></div>
                    </div>
                    <img src="https://placehold.co/400x500/bae6fd/0f172a?text=Foto+3" alt="Shiro 3" className="w-full h-full object-cover border-2 border-slate-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {}
        <section id="rifa" className="px-4 py-16 relative">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white p-6 md:p-10 border-4 border-slate-900 rounded-[2rem] comic-shadow relative z-10">
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-teal-400 text-slate-900 font-comic font-bold text-2xl px-8 py-2 rounded-full border-4 border-slate-900 comic-shadow-sm transform -rotate-2 whitespace-nowrap">
                 Elige tu Número 🎟️
               </div>

              <div className="mt-8 mb-8 flex flex-col lg:flex-row justify-between items-center gap-6 bg-slate-100 p-4 rounded-2xl border-4 border-slate-900 border-dashed">
                <div className="flex flex-wrap justify-center gap-4 text-sm font-comic font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_rgba(15,23,42,1)]"></div> Libre
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-yellow-400 border-2 border-slate-900 shadow-[2px_2px_0px_rgba(15,23,42,1)] flex justify-center items-center"><CheckCircle2 size={16}/></div> Seleccionado
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-slate-300 border-2 border-slate-400 opacity-60"></div> Vendido
                  </div>
                </div>
                
                {selectedNumber ? (
                  <div className="flex flex-col sm:flex-row items-center gap-3 bg-purple-600 text-white py-3 px-6 rounded-2xl border-4 border-slate-900 comic-shadow-sm animate-in fade-in zoom-in duration-300">
                    <span className="font-comic font-bold text-lg">Número: <strong className="text-3xl text-yellow-300">{selectedNumber}</strong></span>
                    <button 
                      onClick={handleCopyInstruction}
                      className="bg-yellow-400 text-slate-900 px-6 py-2 rounded-xl font-comic font-bold text-lg hover:bg-yellow-300 border-2 border-slate-900 shadow-[2px_2px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-transform flex items-center gap-2"
                    >
                      ¡Lo quiero! <Copy size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="font-comic font-bold text-slate-500 animate-pulse text-center">
                    Toca un número libre para apartarlo
                  </div>
                )}
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-20 gap-3 max-h-[450px] overflow-y-auto p-4 bg-slate-50 rounded-2xl border-4 border-slate-900 shadow-inner">
                {renderRaffleGrid()}
              </div>
            </div>
          </div>
        </section>

        {}
        <section id="ayuda" className="px-4 py-16">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            
            <div 
              onClick={() => handleCopyData('994783185', 'Yape/Plin')}
              className="bg-[#581c87] hover:bg-[#6b21a8] text-white p-4 md:p-6 rounded-[2.5rem] border-4 border-slate-900 comic-shadow flex flex-col md:flex-row items-center justify-between cursor-pointer transition-all transform hover:-translate-y-2 group"
            >
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="flex -space-x-4">
                   <div className="w-16 h-16 rounded-full bg-teal-400 border-4 border-slate-900 flex items-center justify-center font-comic font-bold text-slate-900 text-xl z-10 comic-shadow-sm">plin</div>
                   <div className="w-16 h-16 rounded-full bg-purple-500 border-4 border-slate-900 flex items-center justify-center font-comic font-bold text-white text-xl z-0 comic-shadow-sm">yape</div>
                </div>
              </div>
              
              <div className="text-center md:text-left flex-grow md:pl-8">
                <p className="text-4xl md:text-5xl font-comic font-black tracking-widest text-white text-outline">
                  994 783 185
                </p>
                <p className="text-xl font-bold text-yellow-300 mt-1">
                  Roldan Reynaga Martin Adriel
                </p>
              </div>

              <div className="hidden md:flex flex-col items-center justify-center bg-white text-slate-900 rounded-full w-16 h-16 border-4 border-slate-900 group-hover:bg-yellow-400 transition-colors comic-shadow-sm shrink-0">
                <Copy size={24} />
              </div>
            </div>

            <div 
              onClick={() => handleCopyData('191-12345678-0-12', 'Cuenta BCP')}
              className="bg-white hover:bg-slate-50 text-slate-900 p-4 md:p-6 rounded-[2.5rem] border-4 border-slate-900 comic-shadow flex flex-col md:flex-row items-center justify-between cursor-pointer transition-all transform hover:-translate-y-2 group"
            >
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-orange-400 border-4 border-slate-900 flex items-center justify-center text-slate-900 z-10 comic-shadow-sm shrink-0">
                  <Landmark size={32} />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xl font-comic font-bold text-slate-500 uppercase">Cuenta BCP</p>
                  <p className="text-2xl md:text-3xl font-comic font-black text-slate-900">
                    191-12345678-0-12
                  </p>
                  <p className="text-sm font-bold text-slate-500">CCI: 0021911234567801234</p>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-center justify-center bg-yellow-400 text-slate-900 rounded-full w-16 h-16 border-4 border-slate-900 group-hover:bg-teal-400 transition-colors comic-shadow-sm shrink-0">
                <Copy size={24} />
              </div>
            </div>

          </div>
        </section>

      </main>

      {}
      <footer className="bg-slate-900 text-white py-12 mt-10 border-t-8 border-teal-400 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-4xl mb-6 flex justify-center items-center gap-4">
            <Cat className="text-yellow-400" size={40}/> 
            <Heart className="text-red-500 fill-red-500 animate-pulse" size={40}/> 
            <Anchor className="text-teal-400" size={40}/>
          </div>
          <p className="text-lg text-slate-400 font-bold max-w-md mx-auto">
            Gracias por sumar tu granito de arena. Cada ticket cuenta para llegar a la meta. ⚓🐱
          </p>
        </div>
      </footer>

      <div 
        className={`
          fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 px-6 py-4 rounded-2xl border-4 border-slate-900 comic-shadow-sm font-comic font-bold text-lg flex items-center gap-3 z-[60] transition-all duration-300
          ${showToast ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}
        `}
      >
        <CheckCircle2 className="text-slate-900" size={24} />
        {toastMessage}
      </div>

    </div>
  );
}