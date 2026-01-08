import React, { useState, useEffect, useMemo } from 'react';
import { CHARACTERS, STORY_SYNOPSIS, LORE_DATA, LoreItem } from './constants';
import { Character, HouseType } from './types';

const HOUSES: { type: HouseType; label: string; color: string }[] = [
  { type: 'Deus', label: '데우스 학파 (DEUS)', color: '#06b6d4' },
  { type: 'Adam', label: '아담 학파 (ADAM)', color: '#f43f5e' },
  { type: 'Behemoth', label: '베헤모스 학파 (BEHEMOTH)', color: '#8b5cf6' },
  { type: 'Marchen', label: '메르헨 학파 (MARCHEN)', color: '#10b981' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'characters'>('characters');
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [selectedLore, setSelectedLore] = useState<LoreItem | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);

  const principal = useMemo(() => CHARACTERS.find(c => c.house === 'Principal'), []);
  
  const groupedCharacters = useMemo(() => {
    return HOUSES.map(house => ({
      ...house,
      members: CHARACTERS.filter(c => c.house === house.type)
    }));
  }, []);

  const allImages = useMemo(() => {
    if (!selectedChar) return [];
    return [selectedChar.imageUrl, ...selectedChar.additionalImages].filter(img => img);
  }, [selectedChar]);

  const handleSelectChar = (char: Character) => {
    setScrollPos(window.scrollY);
    setSelectedChar(char);
    window.scrollTo(0, 0);
  };

  const handleSelectLore = (lore: LoreItem) => {
    setScrollPos(window.scrollY);
    setSelectedLore(lore);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedChar(null);
    setSelectedLore(null);
  };

  const handleTabChange = (tab: 'story' | 'characters') => {
    setActiveTab(tab);
    setSelectedChar(null);
    setSelectedLore(null);
    setScrollPos(0);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if ((!selectedChar && !selectedLore) && scrollPos > 0) {
      const timeoutId = setTimeout(() => {
        window.scrollTo({
          top: scrollPos,
          behavior: 'instant'
        });
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedChar, selectedLore, scrollPos]);

  useEffect(() => {
    setCurrentImgIndex(0);
  }, [selectedChar?.id]);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const getCharDetails = (char: Character) => {
    const details = [
      { label: "출신", value: char.origin },
      { label: "직위", value: char.title },
      { label: "나이", value: char.age },
      { label: "성격", value: char.personality },
      { label: "성좌", value: char.constellation },
      { label: "능력", value: char.ability },
      { label: "성흔", value: char.stigma },
    ];
    
    if (char.house === 'Adam') {
      return details.filter(d => d.label !== "성흔");
    }
    return details;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-500">
      {/* Academy Aesthetic Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] grayscale"></div>
        {selectedChar && (
          <div 
            className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[150px] transition-all duration-1000 opacity-20" 
            style={{ backgroundColor: selectedChar.themeColor }}
          />
        )}
      </div>

      {/* Main Header */}
      <header className="relative z-40 pt-8 px-6 md:px-12 bg-white/70 backdrop-blur-md sticky top-0 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pb-6">
          <div className="flex items-center gap-4 mb-6 md:mb-0 cursor-pointer" onClick={() => handleTabChange('characters')}>
            <div className="w-12 h-12 border-2 border-slate-900/10 rounded-lg flex items-center justify-center font-serif text-xl font-bold italic rotate-45 group hover:rotate-0 transition-all bg-white shadow-sm">
              <span className="-rotate-45 group-hover:rotate-0 transition-transform text-slate-800">E</span>
            </div>
            <div>
              <h1 className="text-xl font-serif tracking-tight text-slate-900">EPHIEL ACADEMY</h1>
              <p className="text-[9px] tracking-[0.4em] uppercase text-slate-400 font-bold">중앙 성좌 관리국</p>
            </div>
          </div>
          
          <div className="flex gap-1 bg-slate-200/50 p-1 rounded-xl border border-slate-200">
            <button 
              onClick={() => handleTabChange('story')}
              className={`px-8 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'story' ? 'bg-white text-slate-900 shadow-sm' : 'hover:bg-white/40 text-slate-500'}`}
            >
              세계관
            </button>
            <button 
              onClick={() => handleTabChange('characters')}
              className={`px-8 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'characters' && !selectedChar ? 'bg-white text-slate-900 shadow-sm' : 'hover:bg-white/40 text-slate-500'}`}
            >
              캐릭터 소개
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full p-6 md:p-12">
        {activeTab === 'story' ? (
          !selectedLore ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
               <div className="text-center space-y-4 mb-16">
                  <h2 className="text-5xl font-serif italic text-slate-900">{STORY_SYNOPSIS.title}</h2>
                  {STORY_SYNOPSIS.description && (
                    <p className="text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
                      {STORY_SYNOPSIS.description}
                    </p>
                  )}
               </div>

               <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {LORE_DATA.slice(0, 2).map((lore) => (
                      <button 
                        key={lore.id}
                        onClick={() => handleSelectLore(lore)}
                        className="group relative h-64 rounded-3xl overflow-hidden glass border-slate-200 hover:border-slate-300 transition-all shadow-md bg-white"
                      >
                        <img src={lore.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={lore.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent p-8 flex flex-col justify-end text-left">
                          <div className="text-[10px] uppercase tracking-[0.4em] text-blue-600 font-bold mb-1">Global Information</div>
                          <h3 className="text-3xl font-serif italic mb-2 text-slate-900">{lore.title}</h3>
                          <p className="text-xs text-slate-600 font-medium">{lore.summary}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {LORE_DATA.slice(2).map((lore) => (
                      <button 
                        key={lore.id}
                        onClick={() => handleSelectLore(lore)}
                        className="group relative aspect-[4/5] rounded-2xl overflow-hidden glass border-slate-100 hover:border-slate-200 transition-all transform hover:-translate-y-1 bg-white"
                      >
                        <img src={lore.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity grayscale group-hover:grayscale-0" alt={lore.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent p-6 flex flex-col justify-end text-left">
                          <div className="text-[8px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">House Record</div>
                          <h3 className="text-lg font-bold text-slate-800 group-hover:text-slate-900 transition-colors">{lore.title}</h3>
                        </div>
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-12">
              <button onClick={handleBackToList} className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-slate-900 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7" /></svg>
                목록으로 돌아가기
              </button>
              
              <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
                <div className="space-y-8">
                  <div className="inline-block px-3 py-1 bg-slate-100 border border-slate-200 rounded-md text-[10px] font-bold tracking-widest uppercase text-slate-500">
                    Archival Record No.{selectedLore.id.toUpperCase()}
                  </div>
                  <h2 className="text-6xl font-serif italic leading-tight text-slate-900">{selectedLore.title}</h2>
                  <p className="text-xl leading-relaxed text-slate-700 font-light first-letter:text-4xl first-letter:font-serif first-letter:mr-1 whitespace-pre-wrap">{selectedLore.content}</p>
                </div>
                <div className="relative aspect-square rounded-3xl overflow-hidden glass border-slate-200 shadow-xl p-2 bg-white">
                  <img src={selectedLore.imageUrl} className="w-full h-full object-cover rounded-2xl" alt={selectedLore.title} />
                </div>
              </div>

              {/* Recovery: Render History for Academy */}
              {selectedLore.history && selectedLore.history.length > 0 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-serif italic text-slate-900">Historical Archives // 연혁</h3>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                  <div className="glass p-8 rounded-3xl border-slate-100 bg-white/50 space-y-4">
                    {selectedLore.history.map((item, idx) => (
                      <div key={idx} className="flex gap-6 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <p className="text-slate-600 font-medium leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recovery: Render SubItems for Monsters - Vertically Long and Large */}
              {selectedLore.subItems && selectedLore.subItems.length > 0 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                  <div className="flex items-center gap-4">
                    <h3 className="text-3xl font-serif italic text-red-600">High-Risk Entities // 특급 위험 개체</h3>
                    <div className="h-px flex-1 bg-red-100" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {selectedLore.subItems.map((sub) => (
                      <div key={sub.id} className="glass group overflow-hidden rounded-[2.5rem] border-red-50 bg-white hover:border-red-300 transition-all shadow-xl hover:shadow-red-900/10">
                        <div className="aspect-[2/3] relative overflow-hidden">
                          <img 
                            src={sub.imageUrl} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                            alt={sub.name} 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute bottom-8 left-8 right-8">
                            <h4 className="text-white font-serif italic text-4xl mb-4 group-hover:text-red-400 transition-colors tracking-tight">{sub.name}</h4>
                            <div className="h-0.5 w-12 bg-red-500 mb-4 group-hover:w-full transition-all duration-500" />
                            <p className="text-slate-300 text-base font-medium leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                              {sub.description}
                            </p>
                          </div>
                          <div className="absolute top-6 right-6 px-3 py-1 bg-red-600/20 backdrop-blur-md border border-red-500/50 rounded-full text-[10px] font-bold text-red-400 tracking-widest uppercase">
                            Class-S Danger
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        ) : !selectedChar ? (
          <div className="space-y-20 animate-in fade-in duration-700">
            {principal && (
              <section className="flex flex-col items-center">
                <h2 className="text-xl font-serif italic tracking-[0.3em] text-slate-400 uppercase mb-8 border-b border-slate-200 pb-4 w-full text-center">ADMINISTRATOR // 학장</h2>
                <button onClick={() => handleSelectChar(principal)} className="group relative w-72 aspect-[3/4] rounded-2xl overflow-hidden glass border-slate-200 hover:border-slate-400 transition-all transform hover:-translate-y-2 shadow-lg bg-white">
                  <img src={principal.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100" alt={principal.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent flex flex-col justify-end p-8 text-center">
                    <div className="text-3xl font-serif italic text-slate-900 mb-1">{principal.name}</div>
                  </div>
                </button>
              </section>
            )}

            <div className="space-y-24">
              {groupedCharacters.map((house) => (
                <section key={house.type} className="space-y-10">
                  <div className="flex items-center gap-10">
                    <div className="h-px flex-1 bg-slate-200" />
                    <h2 className="text-3xl md:text-4xl font-serif italic tracking-[0.2em] uppercase text-center" style={{ color: house.color }}>{house.label}</h2>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
                    {house.members.map((char) => (
                      <button key={char.id} onClick={() => handleSelectChar(char)} className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass border-slate-100 hover:border-slate-300 transition-all transform hover:-translate-y-2 shadow-md bg-white">
                        <img src={char.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100" alt={char.name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent flex flex-col justify-end p-6">
                          <div className="text-2xl font-bold text-slate-900 mb-1">{char.name}</div>
                        </div>
                        <div className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full shadow-[0_0_10px]" style={{ backgroundColor: house.color }} />
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Left Column: Character Imagery */}
            <div className="lg:w-[400px] flex-shrink-0 space-y-6">
              <button onClick={handleBackToList} className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-slate-900 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7" /></svg>
                목록으로 돌아가기
              </button>

              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden glass border-slate-200 shadow-2xl bg-slate-100 group">
                <img 
                  key={`${selectedChar.id}-${currentImgIndex}`}
                  src={allImages[currentImgIndex]} 
                  alt={selectedChar.name} 
                  className="w-full h-full object-cover animate-in fade-in duration-500" 
                />
                
                {allImages.length > 1 && (
                  <>
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={prevImg} className="p-2 rounded-full bg-white/80 text-slate-900 shadow-md border border-slate-200 hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button onClick={nextImg} className="p-2 rounded-full bg-white/80 text-slate-900 shadow-md border border-slate-200 hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  </>
                )}

                <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-white via-white/60 to-transparent">
                  <h2 className="text-5xl font-serif italic text-slate-900">{selectedChar.name}</h2>
                  <div className="text-[10px] tracking-[0.5em] text-slate-400 uppercase mb-4">{selectedChar.jpName}</div>
                  <div className="inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-slate-200 bg-white/50" style={{ color: selectedChar.themeColor }}>
                    {selectedChar.house.toUpperCase()} UNIT
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Information (Enlarged) */}
            <div className="flex-1 space-y-10">
              {/* Detailed Specs Grid */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getCharDetails(selectedChar).map((item, idx) => (
                  <div key={idx} className="glass p-6 rounded-2xl border-slate-100 bg-white/80 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: selectedChar.themeColor }} />
                      <h3 className="text-xs font-black tracking-widest uppercase text-slate-400">{item.label}</h3>
                    </div>
                    <p className="text-xl text-slate-800 font-bold leading-tight">{item.value}</p>
                  </div>
                ))}
                
                {/* Traits Section (Full Width) */}
                <div className="glass p-8 rounded-2xl border-slate-100 bg-white/80 col-span-1 md:col-span-2 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: selectedChar.themeColor }} />
                    <h3 className="text-xs font-black tracking-widest uppercase text-slate-400">특징 및 비고</h3>
                  </div>
                  <p className="text-lg text-slate-700 font-medium leading-relaxed">{selectedChar.traits}</p>
                </div>
              </section>
            </div>
          </div>
        )}
      </main>

      {/* Persistence Footer */}
      <footer className="relative z-30 border-t border-slate-200 bg-white/70 backdrop-blur-xl p-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4 items-center">
             <div className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-md text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase">
               Academy Network Status: Optimal
             </div>
             <div className="text-[10px] text-slate-400 tracking-tighter uppercase font-mono">
               SYS_EPHIEL_CONSTELLATION_V3 // DECRYPTED_ACCESS
             </div>
          </div>
          <div className="text-[9px] text-slate-300 font-bold tracking-widest uppercase">
            &copy; 2025 EPHIEL ACADEMY ADMINISTRATIONS
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;