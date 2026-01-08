
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis, Radar as RadarComponent } from 'recharts';

// --- TYPES ---
export interface CharacterStat {
  subject: string;
  A: number;
  fullMark: number;
}

export type HouseType = 'Principal' | 'Deus' | 'Adam' | 'Behemoth' | 'Marchen';

export interface Character {
  id: string;
  name: string;
  jpName: string;
  origin: string;
  title: string;
  age: string;
  personality: string;
  constellation: string;
  ability: string;
  stigma: string;
  traits: string;
  house: HouseType;
  themeColor: string;
  imageUrl: string;
  additionalImages: string[];
  stats: CharacterStat[];
  quotes: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface LoreSubItem {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
}

export interface LoreItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  subItems?: LoreSubItem[];
  history?: string[];
}

// --- CONSTANTS ---
export const STORY_SYNOPSIS = {
  title: "에피엘 아카데미",
  description: "성좌의 힘이 깃든 소년 소녀들의 운명적인 서사.",
};

export const LORE_DATA: LoreItem[] = [
  {
    id: 'academy',
    title: '에피엘 아카데미',
    summary: '성좌가 나아가야할 올바른 이정표',
    content: "하늘 위 성좌들에게 받은 힘을 무분별하게 사용하지 않고 올바르게 사용하는 법을 배우기 위한 아카데미. 지구와 밀로아, 두 세계의 학생들이 다니며 각자가 가진 능력을 이롭게 사용할 수 있는 방법을 배워나간다. 그들은 훗날 문명의 발전에 이바지함은 물론, 잠재적 위험요인으로 남아있는 마물과 싸워나갈 것이다.",
    imageUrl: 'https://razbe.uk/da06.png',
    history: [
      "100년 전, 크로만 제국의 궁중 마법사 '오큘라'가 지구와 성좌의 존재를 관측",
      "서기 2025년, 크로만 제국은 지구와 밀로아를 연결하는 '포르타' 개방에 성공",
      "밀로아의 마력이 지구로 흘러들어오며 인류가 성좌의 힘을 얻게 됨",
      "성좌의 힘을 그릇되게 사용한 자들이 마물로 변하며 제국 멸망",
      "전쟁의 상흔을 딛고 성좌를 올바르게 다루기 위해 '에피엘 아카데미' 설립"
    ]
  },
  {
    id: 'monsters',
    title: '마물',
    summary: '성좌에 먹혀버린 그릇된 존재들',
    content: "성좌의 힘에 먹혀버린 존재들. 성좌에 대한 지식 없이 무분별하게 그 힘만을 남용한 자들의 말로. 감정이 절제되었으며 오로지 폭력만을 추구하는 껍데기만이 남아버린 인간입니다.",
    imageUrl: 'https://razbe.uk/demon01.png',
    subItems: [
      { id: 'anarin', name: '아나린', imageUrl: 'https://razbe.uk/demon01.png', description: '전 크로만 제국의 여황제. 혼돈의 신 카오스의 화신.' },
      { id: 'ocula', name: '오큘라', imageUrl: 'https://razbe.uk/demon02.png', description: '지구를 관측한 마법사. 오딘의 화신.' },
      { id: 'noier', name: '노이어', imageUrl: 'https://razbe.uk/demon03.png', description: '크로만 제국군 사령관. 파프니르의 화신.' }
    ]
  },
  {
    id: 'deus',
    title: '데우스 학파',
    summary: '신성하고 전통적인 마력의 계승자',
    content: "가장 전통적인 학파입니다. 신의 이름 아래에 그들의 대리인이 되어 신의 권능을 통해 세상을 이롭게 한다는, 성좌의 의의를 가장 충실하게 따르는 곳입니다.",
    imageUrl: 'https://razbe.uk/title01.png'
  },
  {
    id: 'adam',
    title: '아담 학파',
    summary: '인간의 의지와 기술로 성좌에 닿는 자들',
    content: "인간은 위대하다. 우리는 그들의 발자취 속에서 살아가며 우리 또한 우리의 발자취를 후대에게 남길 것이다. 인간의 연대를 중시합니다.",
    imageUrl: 'https://razbe.uk/title02.png'
  },
  {
    id: 'behemoth',
    title: '베헤모스 학파',
    summary: '거친 야성과 마수의 힘을 다루는 자들',
    content: "마수 또한 동물이며 교감할 수 있다고 믿습니다. 난폭한 힘을 길들여 자신의 것으로 만드는 데 탁월한 능력을 보입니다.",
    imageUrl: 'https://razbe.uk/title03.png'
  },
  {
    id: 'marchen',
    title: '메르헨 학파',
    summary: '환상과 동화 속의 기적을 실현하는 자들',
    content: "가장 중요히 여기는 것은 '동경'입니다. 어릴 적 꿈꾸던 이야기 속의 주인공이 되어 빛나는 내 모습을 마주하는 것을 목표로 합니다.",
    imageUrl: 'https://razbe.uk/title04.png'
  }
];

export const HOUSES: { type: HouseType; label: string; color: string }[] = [
  { type: 'Deus', label: '데우스 학파 (DEUS)', color: '#06b6d4' },
  { type: 'Adam', label: '아담 학파 (ADAM)', color: '#f43f5e' },
  { type: 'Behemoth', label: '베헤모스 학파 (BEHEMOTH)', color: '#8b5cf6' },
  { type: 'Marchen', label: '메르헨 학파 (MARCHEN)', color: '#10b981' },
];

const createChar = (
  id: string, 
  name: string, 
  house: HouseType, 
  color: string, 
  origin: string,
  title: string, 
  age: string,
  personality: string,
  constellation: string,
  ability: string,
  stigma: string,
  traits: string,
  imgUrl: string,
  addImgs: string[] = []
): Character => ({
  id, name, jpName: name, origin, title, age, personality, constellation, ability, stigma, traits, house, themeColor: color, imageUrl: imgUrl, additionalImages: addImgs,
  stats: [
    { subject: '마력', A: Math.floor(Math.random() * 30) + 70, fullMark: 100 },
    { subject: '이론', A: Math.floor(Math.random() * 40) + 60, fullMark: 100 },
    { subject: '민첩', A: Math.floor(Math.random() * 40) + 60, fullMark: 100 },
    { subject: '윤리', A: Math.floor(Math.random() * 40) + 60, fullMark: 100 },
    { subject: '통솔', A: Math.floor(Math.random() * 50) + 50, fullMark: 100 },
  ],
  quotes: ["우주의 의지를 거스르는 자들에게 파멸을."]
});

export const CHARACTERS: Character[] = [
  // Principal
  createChar('yuni', '유니', 'Principal', '#e2e8f0', '밀로아', '학장', '45세', '조용하고 우아함', "크리오스", '타인의 성좌 힘 통제', '별모양 동공', '진짜 성격을 숨기고 있는 성좌군의 영웅.', 'https://razbe.uk/da02.png', ['https://razbe.uk/ea01.png']),
  
  // Deus
  createChar('ciel', '시엘', 'Deus', '#06b6d4', '지구', '1학년', '20세', '담담한 마이페이스', '이리스', '무지개 이동', '무지개색 이너헤어', '제멋대로인 천재 학생.', 'https://razbe.uk/db02.png', ['https://razbe.uk/eb01.png']),
  createChar('seo', '세오', 'Deus', '#06b6d4', '밀로아', '2학년', '21세', '외로움 잘탐', '아누비스', '영혼 부리기', '늑대 귀', '유령 친구를 데리고 다니는 소년.', 'https://razbe.uk/dc02.png', ['https://razbe.uk/ec01.png']),
  createChar('fani', '파니', 'Deus', '#06b6d4', '밀로아', '1학년', '101세', '호기심 가득', '바루나', '수분 조작', '인간 신체', '슬라임에서 인간이 된 존재.', 'https://razbe.uk/dd02.png', ['https://razbe.uk/ed01.png']),
  createChar('leshem', '레솀', 'Deus', '#06b6d4', '지구', '교사', '31세', '친근하고 요염함', '메타트론', '아카식 레코드', '천사 날개', '의외로 연애에 허접한 서기관.', 'https://razbe.uk/de02.png', ['https://razbe.uk/ee01.png']),

  // Adam
  createChar('adam1', '윤정아', 'Adam', '#f43f5e', '지구', '3학년', '22세', '호쾌하고 당당함', '광개토대왕', '영역 지배', '', '학생회장직을 맡고 있는 카리스마 리더.', 'https://razbe.uk/df02.png', ['https://razbe.uk/ef01.png']),
  createChar('ruming', '루밍', 'Adam', '#f43f5e', '밀로아', '2학년', '21세', '활발한 실험광', '다이달로스', '상상 발명', '', '매일 폭발 사고를 내는 실험 광인.', 'https://razbe.uk/dg02.png', ['https://razbe.uk/eg01.png']),
  createChar('frenda', '프렌다', 'Adam', '#f43f5e', '지구', '1학년', '20세', '순진하고 활발함', '산타클로스', '무작위 선물함', '', '깜짝 서프라이즈를 좋아하는 소녀.', 'https://razbe.uk/dh02.png', ['https://razbe.uk/eh01.png']),
  createChar('sirha', '시르하', 'Adam', '#f43f5e', '밀로아', '교사', '347세', '고지식한 허당', '살라딘', '갈증과 결핍', '', '유행을 따라가고 싶어하는 엘프 선생님.', 'https://razbe.uk/di02.png', ['https://razbe.uk/ei01.png']),

  // Behemoth
  createChar('schatten', '샤텐', 'Behemoth', '#8b5cf6', '지구', '1학년', '20세', '로망 가득함', '아 바오아 쿠', '그림자 조작', '검은 피부', '닌자를 동경하는 활기찬 소년.', 'https://razbe.uk/dj02.png', ['https://razbe.uk/ej01.png']),
  createChar('levi', '레비', 'Behemoth', '#8b5cf6', '밀로아', '1학년', '20세', '조용한 무감정', '아지다하카', '파괴와 부식', '삼중인격', '내면에 공존하는 여러 자아들.', 'https://razbe.uk/dk02.png', ['https://razbe.uk/ek01.png']),
  createChar('ricella', '리셀라', 'Behemoth', '#8b5cf6', '밀로아', '2학년', '21세', '능글맞은 장난기', '바실리스크', '마안의 저주', '녹색 마안', '에카타 제국의 황녀이자 부회장.', 'https://razbe.uk/dl02.png', ['https://razbe.uk/el01.png']),
  createChar('mardel', '마르델', 'Behemoth', '#8b5cf6', '지구', '교사', '35세', '사려 깊음', '에키드나', '괴물 창조', '긴 혀', '학생들을 엄마처럼 돌봐주는 교사.', 'https://razbe.uk/dm02.png', ['https://razbe.uk/em01.png']),

  // Marchen
  createChar('tsukuha', '츠쿠하', 'Marchen', '#10b981', '지구', '2학년', '21세', '순진하고 엉뚱함', '카구야', '시련 부여', '달토끼 귀', '시련을 즐기는 엉뚱한 매니아.', 'https://razbe.uk/dn02.png', ['https://razbe.uk/en01.png']),
  createChar('lucel', '루첼', 'Marchen', '#10b981', '지구', '1학년', '20세', '소심한 성격', '신데렐라', '프린세스 모드', '잿빛 머리', '꾸미면 놀랍게 변하는 소녀.', 'https://razbe.uk/do02.png', ['https://razbe.uk/eo01.png']),
  createChar('shu', '슈', 'Marchen', '#10b981', '밀로아', '3학년', '22세', '약삭빠른 중립', '시골쥐와 도시쥐', '공방 전환', '쥐의 귀', '계산이 매우 빠른 학생회 회계.', 'https://razbe.uk/dp02.png', ['https://razbe.uk/ep01.png']),
  createChar('hael', '하엘', 'Marchen', '#10b981', '밀로아', '교사', '45세', '자주 덜렁댐', '베아트리체', '신성한 인도', '헤일로', '사랑을 전파하는 전직 수녀 교사.', 'https://razbe.uk/dq02.png', ['https://razbe.uk/eq01.png']),
];

// --- SERVICES ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const chatWithCharacter = async (character: Character, history: ChatMessage[], userMessage: string) => {
  const systemInstruction = `You are roleplaying as ${character.name} from Ephiel Academy. Your personality is ${character.personality}. Respond only in Korean, be concise (max 2 sentences). Treat user as a student.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(msg => ({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: { systemInstruction, temperature: 0.8 },
    });
    return response.text || "데이터 응답 실패.";
  } catch (e) {
    return "통신 장애 발생.";
  }
};

// --- COMPONENTS ---
const StatChart: React.FC<{ data: CharacterStat[], color: string }> = ({ data, color }) => (
  <div className="w-full h-64">
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
        <RadarComponent name="Stats" dataKey="A" stroke={color} fill={color} fillOpacity={0.4} />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

const CharacterChat: React.FC<{ character: Character }> = ({ character }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [messages]);
  useEffect(() => { setMessages([]); }, [character.id]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userText = input; setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);
    const res = await chatWithCharacter(character, messages, userText);
    setMessages(prev => [...prev, { role: 'model', text: res }]);
    setIsLoading(false);
  };

  return (
    <div className="glass rounded-3xl flex flex-col h-[420px] overflow-hidden bg-white/90 shadow-xl border border-slate-100">
      <div className="p-4 border-b border-slate-100 flex justify-between bg-slate-50/50">
        <h3 className="text-[10px] font-bold uppercase text-slate-500 tracking-widest flex items-center gap-2">
           <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: character.themeColor }}></span>
           실시간 동기화 채널: {character.name}
        </h3>
        {isLoading && <span className="text-[9px] animate-pulse text-blue-500 font-bold">LINKING...</span>}
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 text-[11px] mt-10">보안 통신망 연결 완료.<br/>대화를 시작하십시오.</div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 px-4 rounded-2xl text-[13px] max-w-[85%] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}`}>{msg.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-4 border-t bg-slate-50/50 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 text-xs px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="메시지를 입력하세요..." />
        <button type="submit" disabled={isLoading} className="px-4 rounded-xl text-white shadow-md transition-transform active:scale-95 disabled:opacity-50" style={{ backgroundColor: character.themeColor }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </form>
    </div>
  );
};

// --- MAIN APP ---
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'characters'>('characters');
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [selectedLore, setSelectedLore] = useState<LoreItem | null>(null);

  const housesWithMembers = useMemo(() => HOUSES.map(h => ({ ...h, members: CHARACTERS.filter(c => c.house === h.type) })), []);
  const principal = useMemo(() => CHARACTERS.find(c => c.house === 'Principal'), []);

  return (
    <div className="min-h-screen bg-[#fcfdff] text-[#1a1c20] font-sans selection:bg-blue-100">
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => { setSelectedChar(null); setSelectedLore(null); setActiveTab('characters'); }}>
            <div className="w-11 h-11 bg-slate-900 text-white flex items-center justify-center font-serif italic font-bold rounded-xl rotate-45 shadow-lg"><span className="-rotate-45 text-xl">E</span></div>
            <div>
              <h1 className="text-lg font-serif font-bold tracking-tight">EPHIEL ACADEMY</h1>
              <p className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-bold">Archives & Management</p>
            </div>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {['story', 'characters'].map(t => (
              <button key={t} onClick={() => { setActiveTab(t as any); setSelectedChar(null); setSelectedLore(null); }} className={`px-8 py-2.5 text-[11px] font-black uppercase rounded-xl transition-all ${activeTab === t ? 'bg-white shadow-md text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                {t === 'story' ? 'Archives (세계관)' : 'Directory (캐릭터)'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        {activeTab === 'story' ? (
          !selectedLore ? (
            <div className="space-y-16 animate-in fade-in duration-700">
               <div className="text-center space-y-4">
                 <h2 className="text-5xl font-serif italic">The Grand Archives</h2>
                 <p className="text-slate-400 text-xs tracking-[0.5em] uppercase font-bold">Chronicles of the Unified Worlds</p>
               </div>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {LORE_DATA.map(lore => (
                   <button key={lore.id} onClick={() => setSelectedLore(lore)} className="group relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100">
                     <img src={lore.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end text-left">
                       <h3 className="text-white text-3xl font-serif italic mb-1">{lore.title}</h3>
                       <p className="text-slate-300 text-[11px] font-bold tracking-widest uppercase">{lore.summary}</p>
                     </div>
                   </button>
                 ))}
               </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-16 pb-20">
              <button onClick={() => setSelectedLore(null)} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                BACK TO LIST
              </button>
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                  <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black tracking-widest uppercase border border-blue-100">Record No.{selectedLore.id.toUpperCase()}</div>
                  <h2 className="text-7xl font-serif italic leading-tight">{selectedLore.title}</h2>
                  <p className="text-xl leading-relaxed text-slate-600 font-medium whitespace-pre-wrap">{selectedLore.content}</p>
                </div>
                <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
                  <img src={selectedLore.imageUrl} className="w-full h-full object-cover" />
                </div>
              </div>

              {selectedLore.history && (
                <div className="space-y-8">
                  <h3 className="text-3xl font-serif italic flex items-center gap-4">Chronology <div className="h-px flex-1 bg-slate-200"></div></h3>
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-50 space-y-6">
                    {selectedLore.history.map((h, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                        <p className="text-slate-600 text-lg font-medium leading-relaxed">{h}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedLore.subItems && (
                <div className="space-y-12">
                   <h3 className="text-4xl font-serif italic text-red-600 flex items-center gap-4">Target: HIGH-RISK <div className="h-px flex-1 bg-red-100"></div></h3>
                   <div className="grid md:grid-cols-3 gap-12">
                     {selectedLore.subItems.map(sub => (
                       <div key={sub.id} className="group relative aspect-[2/3] rounded-[3rem] overflow-hidden shadow-2xl bg-black border-4 border-white transition-all hover:border-red-500">
                         <img src={sub.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                         <div className="absolute bottom-12 left-10 right-10 space-y-4">
                           <h4 className="text-white text-5xl font-serif italic tracking-tighter">{sub.name}</h4>
                           <div className="h-1 w-12 bg-red-500 rounded-full group-hover:w-full transition-all duration-500"></div>
                           <p className="text-slate-300 text-base font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-all transform translate-y-6 group-hover:translate-y-0">{sub.description}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </div>
          )
        ) : !selectedChar ? (
          <div className="space-y-24 animate-in fade-in duration-700">
            {principal && (
               <section className="flex flex-col items-center gap-8">
                 <h2 className="text-xs font-black tracking-[0.5em] text-slate-400 uppercase">Administrator</h2>
                 <button onClick={() => setSelectedChar(principal)} className="group relative w-72 aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl transition-all hover:-translate-y-4 border-4 border-white">
                   <img src={principal.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent flex flex-col justify-end p-8 text-center">
                     <span className="text-3xl font-serif italic font-bold">{principal.name}</span>
                   </div>
                 </button>
               </section>
            )}

            {housesWithMembers.map(house => (
              <section key={house.type} className="space-y-12">
                <div className="flex items-center gap-10">
                  <h2 className="text-3xl font-serif italic tracking-widest uppercase shrink-0" style={{ color: house.color }}>{house.label}</h2>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                  {house.members.map(char => (
                    <button key={char.id} onClick={() => setSelectedChar(char)} className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-lg transition-all hover:shadow-2xl hover:-translate-y-3 bg-white border-2 border-slate-50">
                      <img src={char.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent flex flex-col justify-end p-8">
                        <span className="text-2xl font-bold tracking-tight text-slate-900">{char.name}</span>
                        <div className="w-0 group-hover:w-12 h-1 mt-2 rounded-full transition-all duration-500" style={{ backgroundColor: house.color }}></div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
            <div className="lg:w-[450px] space-y-10 flex-shrink-0">
              <button onClick={() => setSelectedChar(null)} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-slate-900">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                BACK TO DIRECTORY
              </button>
              <div className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-2xl border-[10px] border-white group">
                <img src={selectedChar.imageUrl} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent p-12 flex flex-col justify-end">
                  <h2 className="text-7xl font-serif italic leading-none">{selectedChar.name}</h2>
                  <div className="mt-6 flex gap-3">
                    <span className="text-[11px] uppercase font-black tracking-widest px-4 py-2 bg-white/80 rounded-xl shadow-sm border border-slate-100" style={{ color: selectedChar.themeColor }}>{selectedChar.house} UNIT</span>
                    <span className="text-[11px] uppercase font-black tracking-widest px-4 py-2 bg-white/80 rounded-xl shadow-sm border border-slate-100 text-slate-400">ID: {selectedChar.id.toUpperCase()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50">
                <h4 className="text-[11px] font-black uppercase text-slate-400 mb-8 tracking-[0.2em] flex items-center gap-3">
                   <span className="w-2 h-5 rounded-full" style={{ backgroundColor: selectedChar.themeColor }}></span>
                   성좌 감응 데이터 (Sync Rate)
                </h4>
                <StatChart data={selectedChar.stats} color={selectedChar.themeColor} />
              </div>
            </div>
            
            <div className="flex-1 space-y-10">
              <section className="grid md:grid-cols-2 gap-8">
                {[
                  { l: "출신 (Origin)", v: selectedChar.origin },
                  { l: "직위 (Rank)", v: selectedChar.title },
                  { l: "성격 (Nature)", v: selectedChar.personality },
                  { l: "주 성좌 (Constellation)", v: selectedChar.constellation },
                  { l: "고유 능력 (Ability)", v: selectedChar.ability },
                  { l: "나이 (Age)", v: selectedChar.age }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{item.l}</span>
                    <span className="text-2xl font-bold text-slate-800 tracking-tight">{item.v}</span>
                  </div>
                ))}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm md:col-span-2">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">특징 및 데이터 (Observations)</span>
                   <p className="text-xl text-slate-600 font-semibold leading-relaxed">{selectedChar.traits}</p>
                </div>
              </section>
              <CharacterChat character={selectedChar} />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-100 bg-white/50 py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">&copy; 2025 EPHIEL ACADEMY ADMINISTRATIONS. ALL RIGHTS RESERVED.</div>
           <div className="flex gap-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">
             <span>Security Protocol: V.2.0</span>
             <span>Access Level: AUTHORIZED</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><App /></React.StrictMode>);
