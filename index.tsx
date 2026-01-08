
import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

// --- TYPES ---
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
  type?: 'general' | 'house';
  quote?: string;
}

// --- CONSTANTS ---
export const STORY_SYNOPSIS = {
  title: "에피엘 아카데미 (Ephiel Academy)",
  description: "성좌의 힘이 깃든 소년 소녀들의 운명적인 서사. 지구와 밀로아, 두 세계가 겹쳐진 시대의 기록.",
};

export const LORE_DATA: LoreItem[] = [
  {
    id: 'academy',
    title: '에피엘 아카데미',
    summary: '성좌가 나아가야할 올바른 이정표',
    type: 'general',
    content: "전쟁의 상흔을 딛고 성좌의 힘을 문명의 발전에 활용함과 동시에, 잠재적 위험요인으로 남은 마물들에 대한 대처의 필요성에 의해 설립되었습니다. 두 세계를 연결하는 통로인 '포르타'에 위치하며, 성좌군에서 가장 큰 활약을 했던 유니가 초대 학장으로 취임하여 두 세계의 조화와 안전을 책임지고 있습니다.",
    imageUrl: 'https://razbe.uk/da06.png',
    history: [
      "100년 전: 크로만 제국의 궁중 마법사 '오큘라'가 지구와 성좌의 존재를 관측",
      "서기 2025년: 100년간의 마법 실험 끝에 크로만 제국이 지구와 밀로아를 연결시키는데 성공",
      "힘의 각성: 밀로아의 마력이 지구로 흘러들어오자 성좌의 힘이 활성화되어 양쪽 인류가 힘을 얻음",
      "성좌대전 발발: 전쟁을 준비하던 크로만 제국이 성좌의 힘으로 두 세계를 침공",
      "지구-밀로아 동맹: 지구의 성좌 지식과 밀로아의 마법 지식을 하나로 합치는 연합 결성",
      "성좌군의 활약: 연합에 의해 탄생한 '성좌군'이 크로만의 침공을 저지",
      "5년 전쟁: 이후 5년간 전쟁이 이어졌으나 제국민들이 성좌의 힘 오용으로 인해 마물로 변화하기 시작",
      "대전의 종결: 제국 전체가 하나의 마물 소굴로 변해버리며 크로만 제국 멸망과 함께 전쟁 종료",
      "재건과 대처: 성좌의 힘 활용 및 잠재적 위협인 마물들에 대한 대처 필요성 제기",
      "에피엘 설립: 두 세계를 잇는 '포르타'에 설립. 성좌군의 영웅 '유니' 학장 취임"
    ]
  },
  {
    id: 'monsters',
    title: '마물',
    summary: '성좌에 먹혀버린 그릇된 존재들',
    type: 'general',
    content: "성좌의 힘에 먹혀버린 존재들입니다. 성좌에 대한 지식 없이 무분별하게 그 힘만을 남용한 자들의 말로이며, 감정이 절제되었고 오로지 파괴와 폭력만을 추구하는 껍데기만이 남아버린 가련한 존재들입니다. 과거 제국의 영웅이었던 자들이 현재는 가장 위험한 마물로서 인류를 위협하고 있습니다.",
    imageUrl: 'https://razbe.uk/demon01.png',
    subItems: [
      { id: 'anarin', name: '아나린', imageUrl: 'https://razbe.uk/demon01.png', description: '전 크로만 제국의 여황제. 혼돈의 신 카오스의 화신이 되어 세상을 허무로 되돌리려 함.' },
      { id: 'ocula', name: '오큘라', imageUrl: 'https://razbe.uk/demon02.png', description: '지구를 관측한 타락한 마법사. 오딘의 화신으로서 모든 지식을 탐욕스럽게 집어삼킴.' },
      { id: 'noier', name: '노이어', imageUrl: 'https://razbe.uk/demon03.png', description: '크로만 제국군 사령관. 강철의 악룡 파프니르의 화신이 되어 모든 것을 부식시킴.' }
    ]
  },
  {
    id: 'deus',
    title: '데우스 학파',
    summary: '신성하고 전통적인 마력의 계승자',
    type: 'house',
    quote: "성좌의 매력? 신의 권능을 부릴 수 있다는 점 아닐까?",
    content: "어찌보면 가장 전통적이면서 메이저하다고 할 수 있겠지. 신의 이름 아래에 그들의 대리인이 되어 신의 권능을 통해 세상을 이롭게 한다는, 성좌의 의의를 가장 충실하게 따르는 곳이거든. 우리는 신의 힘을 다루는만큼 화신으로서의 힘은 모든 학파들 중 가장 강력해. 뭐어, 힘이 전부라고는 말 못하겠지만 전부가 아니라고도 말 못하겠지. 어때? 우리 학파에 들어오고 싶은 생각이 조금은 들었어?",
    imageUrl: 'https://razbe.uk/title01.png'
  },
  {
    id: 'adam',
    title: '아담 학파',
    summary: '인간의 의지와 기술로 성좌에 닿는 자들',
    type: 'house',
    quote: "역사를 쌓아올린 것도, 시대를 만들어가는 것도 모두 인간입니다!",
    content: "인간은 위대합니다. 저희는 그들의 발자취 속에서 살아가며 저희 또한 저희의 발자취를 후대에게 남길 것입니다. 개개인의 힘은 미약해보이나 그 속에 숨기고 있는 저력은 신도 마수도 뛰어 넘습니다. 저희는 단결하고 저희는 목숨을 불태우며 저희는 우리 자신을 찬가합니다. 당신 또한 한 명의 인간으로서 저희와 연대하지 않겠는가? 아담으로 오십시오.",
    imageUrl: 'https://razbe.uk/title02.png'
  },
  {
    id: 'behemoth',
    title: '베헤모스 학파',
    summary: '거친 야성과 마수의 힘을 다루는 자들',
    type: 'house',
    quote: "마수 또한 동물이야. 교감할 수 있다구.",
    content: "그래, 위험하지. 마수라니. 어느 이야기에 나오든 위험하기 짝이 없는 녀석들뿐이지. 난폭하고 으르렁거리고 할퀴고 물어뜯고......그런데 그런 녀석들일수록 그 힘은 어마어마해. 까짓거 길들여버리면 그만이잖아? 그 왜, 세상에 나쁜 마수는 없다...라는 말도 있잖아? 요컨대 주인이 하기 나름이란 거야. 너도 너의 안에 있는 마수를 길러볼 생각 없어?",
    imageUrl: 'https://razbe.uk/title03.png'
  },
  {
    id: 'marchen',
    title: '메르헨 학파',
    summary: '환상과 동화 속의 기적을 실현하는 자들',
    type: 'house',
    quote: "줄곧 동경해왔어요. 그 이야기 속의 주인공을...",
    content: "저희는 사실 큰 뜻을 품는다거나 위험을 무릅쓰고 위업을 달성한다던가...성좌가 가진 의의를 제대로 따르는 사람들은 아니예요. 저희가 가장 중요히 여기는 것은 '동경'이랍니다. 당신은 어릴 적부터 동경하던 이야기는 없었나요? 그 이야기가 너무 마음에 들고, 그 이야기 속 주인공이 되고 싶다던가 하는...언젠가 이상적인 스스로의 모습에 손이 닿고 가장 빛나는 내 모습을 마주할 순간을...기다리고 있다거나 하지는 않나요? 만약 그렇다면 메르헨으로 와주세요. 이제 당신이 이야기의 주인공이 될 거예요.",
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
  id: string, name: string, house: HouseType, color: string, origin: string,
  title: string, age: string, personality: string, constellation: string,
  ability: string, stigma: string, traits: string, imgUrl: string, addImgs: string[] = []
): Character => ({
  id, name, jpName: name, origin, title, age, personality, constellation, ability, stigma, traits, house, themeColor: color, imageUrl: imgUrl, additionalImages: addImgs,
});

export const CHARACTERS: Character[] = [
  // Principal
  createChar('yuni', '유니', 'Principal', '#64748b', '밀로아', '학장', '45세', '조용하고 우아함', "성좌를 관장하는 신 '크리오스'", '타인의 성좌의 힘을 다룰 수 있음', '별모양 동공', '사실은 진짜 성격을 숨기고 있는데...', 'https://razbe.uk/da02.png', ['https://razbe.uk/ea01.png', 'https://razbe.uk/fa01.png']),
  
  // Deus
  createChar('ciel', '시엘', 'Deus', '#06b6d4', '지구', '1학년', '20세', '담담한 마이페이스', "무지개의 여신 '이리스'", '어디든지 순식간에 이동', '무지개색 이너헤어', '입고 싶은 교복도, 듣고 싶은 수업도 다 제멋대로', 'https://razbe.uk/db02.png', ['https://razbe.uk/eb01.png', 'https://razbe.uk/fb01.png']),
  createChar('seo', '세오', 'Deus', '#06b6d4', '밀로아', '2학년', '21세', '쿨해보이지만 외로움', "명계의 인도자 '아누비스'", '영혼을 부릴 수 있음', '늑대 귀', '친구는 유령 친구가 있어요!', 'https://razbe.uk/dc02.png', ['https://razbe.uk/ec01.png', 'https://razbe.uk/fc01.png']),
  createChar('fani', '파니', 'Deus', '#06b6d4', '밀로아', '1학년', '101세', '호기심 가득', "우주의 섭리 '바루나'", '물을 자유롭게 다룸', '인간의 신체', '슬라임에 성좌가 깃들어 인간의 몸을 얻음', 'https://razbe.uk/dd02.png', ['https://razbe.uk/ed01.png', 'https://razbe.uk/fd01.png']),
  createChar('leshem', '레솀', 'Deus', '#06b6d4', '지구', '교사', '31세', '친근하고 요염함', "하늘의 서기관 '메타트론'", '아카식 레코드를 통해 무수한 정보를 얻을 수 있음', '천사 날개', '의외로 연애 허접', 'https://razbe.uk/de02.png', ['https://razbe.uk/ee01.png', 'https://razbe.uk/fe01.png']),

  // Adam
  createChar('jungah', '윤정아', 'Adam', '#f43f5e', '지구', '3학년', '22세', '호쾌하고 당당함', "광활한 정복군주 '광개토대왕'", '주변 영역을 마음대로 지배하고 변화시킴', '', '리더쉽 넘치는 학생회장', 'https://razbe.uk/df02.png', ['https://razbe.uk/ef01.png', 'https://razbe.uk/ff01.png']),
  createChar('ruming', '루밍', 'Adam', '#f43f5e', '밀로아', '2학년', '21세', '활발한 실험광', "난해한 발명가 '다이달로스'", '상상 속의 물건을 개발', '', '잦은 실험으로 사고치는 맑은 눈의 광인', 'https://razbe.uk/dg02.png', ['https://razbe.uk/eg01.png', 'https://razbe.uk/fg01.png']),
  createChar('frenda', '프렌다', 'Adam', '#f43f5e', '지구', '1학년', '20세', '순진하고 활발함', "성야의 축복 '산타클로스'", '무작위 선물이 들어있는 깜짝 상자', '', '서프라이즈가 너무 좋아', 'https://razbe.uk/dh02.png', ['https://razbe.uk/eh01.png', 'https://razbe.uk/fh01.png']),
  createChar('sirha', '시르하', 'Adam', '#f43f5e', '밀로아', '교사', '347세', '올곧지만 허당', "사막 위의 신념 '살라딘'", '아군의 사기를 끌어올림', '', '요즘 학생들의 유행을 따라가고 싶음', 'https://razbe.uk/di02.png', ['https://razbe.uk/ei01.png', 'https://razbe.uk/fi01.png']),

  // Behemoth
  createChar('schatten', '샤텐', 'Behemoth', '#8b5cf6', '지구', '1학년', '20세', '활발하고 로망이 넘침', "탑을 오르는 그림자 '아 바오아 쿠'", '그림자를 다룸', '검은색 피부', '닌자가 되고 싶습니다!', 'https://razbe.uk/dj02.png', ['https://razbe.uk/ej01.png', 'https://razbe.uk/fj01.png']),
  createChar('levi', '레비', 'Behemoth', '#8b5cf6', '밀로아', '1학년', '20세', '조용하고 무감정함', "만악의 재앙룡 '아지다하카'", '파괴, 부식, 재생', '삼중인격', '부드러운 인격과 거친 인격이 공존', 'https://razbe.uk/dk02.png', ['https://razbe.uk/ek01.png', 'https://razbe.uk/fk01.png']),
  createChar('ricella', '리셀라', 'Behemoth', '#8b5cf6', '밀로아', '2학년', '21세', '능글맞고 장난기 많음', "마안의 작은 왕 '바실리스크'", '타인에게 저주를 거는 마안', '녹색의 마안', '에카타 제국의 황녀이자 부학생회장', 'https://razbe.uk/dl02.png', ['https://razbe.uk/el01.png', 'https://razbe.uk/fl01.png']),
  createChar('mardel', '마르델', 'Behemoth', '#8b5cf6', '지구', '교사', '35세', '장난기 넘치지만 사려 깊음', "괴물들의 어머니 '에키드나'", '괴물을 창조함', '길다란 혀', '언제나 학생들을 돌봐주는 의외의 마망', 'https://razbe.uk/dm02.png', ['https://razbe.uk/em01.png', 'https://razbe.uk/fm01.png']),

  // Marchen
  createChar('tsukuha', '츠쿠하', 'Marchen', '#10b981', '지구', '2학년', '21세', '순진하고 엉뚱함', "달의 공주 '카구야'", '시련을 내림', '달토끼의 귀', '시련에 맞딱드리는 걸 좋아하는 시련 매니아', 'https://razbe.uk/dn02.png', ['https://razbe.uk/en01.png', 'https://razbe.uk/fn01.png']),
  createChar('lucel', '루첼', 'Marchen', '#10b981', '지구', '1학년', '20세', '소심하고 자신감 없음', "재투성이 아가씨 '신데렐라'", '이상적인 모습, 프린세스 모드!', '잿빛 머리카락', '사실 귀여워서 인기 많음', 'https://razbe.uk/do02.png', ['https://razbe.uk/eo01.png', 'https://razbe.uk/fo01.png']),
  createChar('shu', '슈', 'Marchen', '#10b981', '밀로아', '3학년', '22세', '중립적이지만 약삭빠름', "평온과 부유의 기로 '시골쥐와 도시쥐'", '공격을 포기하고 방어에 올인, 방어를 포기하고 공격에 올인', '쥐의 귀', '계산이 빠른 학생회 회계', 'https://razbe.uk/dp02.png', ['https://razbe.uk/ep01.png', 'https://razbe.uk/fp01.png']),
  createChar('hael', '하엘', 'Marchen', '#10b981', '밀로아', '교사', '45세', '순진하고 자주 덜렁댐', "천국으로 인도하는 여인 '베아트리체'", '치유와 심판', '머리 위 헤일로', '사랑을 전파하는 전직 수녀', 'https://razbe.uk/dq02.png', ['https://razbe.uk/eq01.png', 'https://razbe.uk/fq01.png']),
];

// --- MAIN APP ---
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'characters'>('characters');
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [selectedLore, setSelectedLore] = useState<LoreItem | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const housesWithMembers = useMemo(() => HOUSES.map(h => ({ ...h, members: CHARACTERS.filter(c => c.house === h.type) })), []);
  const principal = useMemo(() => CHARACTERS.find(c => c.house === 'Principal'), []);

  // Character selection resets image index
  useEffect(() => {
    setImgIndex(0);
  }, [selectedChar?.id]);

  const allImages = selectedChar ? [selectedChar.imageUrl, ...selectedChar.additionalImages] : [];

  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const generalLore = useMemo(() => LORE_DATA.filter(l => l.type === 'general'), []);
  const houseLore = useMemo(() => LORE_DATA.filter(l => l.type === 'house'), []);

  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#1a1c20] font-sans selection:bg-blue-100">
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => { setSelectedChar(null); setSelectedLore(null); setActiveTab('characters'); }}>
            <div className="w-11 h-11 bg-slate-900 text-white flex items-center justify-center font-serif italic font-bold rounded-xl rotate-45 shadow-xl"><span className="-rotate-45 text-xl">E</span></div>
            <div>
              <h1 className="text-lg font-serif font-bold tracking-tight">EPHIEL ACADEMY</h1>
              <p className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-bold">Archives & Directory</p>
            </div>
          </div>
          <div className="flex bg-slate-200/50 p-1 rounded-2xl border">
            <button 
              onClick={() => { setActiveTab('story'); setSelectedChar(null); setSelectedLore(null); }} 
              className={`px-10 py-2.5 text-[11px] font-black uppercase rounded-xl transition-all ${activeTab === 'story' ? 'bg-white shadow-md text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
              세계관
            </button>
            <button 
              onClick={() => { setActiveTab('characters'); setSelectedChar(null); setSelectedLore(null); }} 
              className={`px-10 py-2.5 text-[11px] font-black uppercase rounded-xl transition-all ${activeTab === 'characters' ? 'bg-white shadow-md text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
              캐릭터 소개
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        {activeTab === 'story' ? (
          !selectedLore ? (
            <div className="space-y-24 animate-in fade-in duration-700">
               <div className="text-center space-y-4">
                 <h2 className="text-5xl font-serif italic">{STORY_SYNOPSIS.title}</h2>
                 <p className="text-slate-400 text-xs tracking-[0.4em] uppercase font-bold">{STORY_SYNOPSIS.description}</p>
               </div>
               
               <div className="space-y-12">
                 <h3 className="text-[11px] font-black tracking-[0.4em] text-slate-400 uppercase text-center flex items-center gap-6 justify-center">
                   <div className="h-px w-20 bg-slate-200"></div>주요 기록<div className="h-px w-20 bg-slate-200"></div>
                 </h3>
                 <div className="grid md:grid-cols-2 gap-10">
                   {generalLore.map(lore => (
                     <button key={lore.id} onClick={() => setSelectedLore(lore)} className="group relative aspect-video rounded-[2.5rem] overflow-hidden bg-white shadow-2xl hover:-translate-y-2 transition-all border border-slate-100">
                       <img src={lore.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 flex flex-col justify-end text-left">
                         <h3 className="text-white text-3xl font-serif italic mb-1">{lore.title}</h3>
                         <p className="text-slate-300 text-[10px] font-bold tracking-widest uppercase">{lore.summary}</p>
                       </div>
                     </button>
                   ))}
                 </div>
               </div>

               <div className="space-y-12">
                 <h3 className="text-[11px] font-black tracking-[0.4em] text-slate-400 uppercase text-center flex items-center gap-6 justify-center border-t border-slate-100 pt-12">
                   <div className="h-px w-20 bg-slate-200"></div>학파 소개<div className="h-px w-20 bg-slate-200"></div>
                 </h3>
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                   {houseLore.map(lore => (
                     <button key={lore.id} onClick={() => setSelectedLore(lore)} className="group relative aspect-square rounded-[2rem] overflow-hidden bg-white shadow-xl hover:-translate-y-2 transition-all border border-slate-100">
                       <img src={lore.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end text-left">
                         <h3 className="text-white text-xl font-serif italic mb-1">{lore.title}</h3>
                         <p className="text-slate-300 text-[8px] font-bold tracking-widest uppercase">{lore.summary}</p>
                       </div>
                     </button>
                   ))}
                 </div>
               </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-16 pb-20">
              <button onClick={() => setSelectedLore(null)} className="text-[11px] font-black uppercase text-slate-400 hover:text-slate-900 transition-colors">← 세계관 목록으로 돌아가기</button>
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                  <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black tracking-widest uppercase border border-blue-100">Historical Record #{selectedLore.id.toUpperCase()}</div>
                  <h2 className="text-7xl font-serif italic">{selectedLore.title}</h2>
                  
                  {selectedLore.quote && (
                    <div className="relative pl-8 border-l-4 border-blue-500 py-2">
                       <span className="absolute -top-4 -left-2 text-6xl text-blue-500/20 font-serif leading-none">"</span>
                       <p className="text-2xl font-bold text-slate-800 italic leading-snug">{selectedLore.quote}</p>
                    </div>
                  )}

                  <p className="text-xl leading-relaxed text-slate-600 font-medium whitespace-pre-wrap">{selectedLore.content}</p>
                </div>
                <img src={selectedLore.imageUrl} className="rounded-[4rem] shadow-2xl border-[16px] border-white aspect-square object-cover bg-slate-100" />
              </div>

              {selectedLore.history && (
                <div className="space-y-8">
                  <h3 className="text-4xl font-serif italic flex items-center gap-6">Timeline <div className="h-px flex-1 bg-slate-200"></div></h3>
                  <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 space-y-6">
                    {selectedLore.history.map((h, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                        <p className="text-slate-600 text-lg font-semibold">{h}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedLore.subItems && (
                <div className="space-y-10">
                   <h3 className="text-4xl font-serif italic text-red-600 flex items-center gap-6">High-Risk Entities <div className="h-px flex-1 bg-red-100"></div></h3>
                   <div className="grid md:grid-cols-3 gap-10">
                     {selectedLore.subItems.map(sub => (
                       <div key={sub.id} className="group relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl bg-black border-[4px] border-white hover:border-red-500 transition-all">
                         <img src={sub.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-8 flex flex-col justify-end">
                           <h4 className="text-white text-3xl font-serif italic mb-2">{sub.name}</h4>
                           <p className="text-slate-300 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">{sub.description}</p>
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
               <section className="flex flex-col items-center gap-10">
                 <h2 className="text-[11px] font-black tracking-[0.6em] text-slate-400 uppercase">Administrator</h2>
                 <button onClick={() => setSelectedChar(principal)} className="group relative w-72 aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl transition-all hover:-translate-y-4 border-[6px] border-white">
                   <img src={principal.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent flex flex-col justify-end p-10 text-center">
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                  {house.members.map(char => (
                    <button key={char.id} onClick={() => setSelectedChar(char)} className="group relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-xl transition-all hover:shadow-2xl hover:-translate-y-3 bg-white border-2 border-slate-50">
                      <img src={char.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/20 to-transparent flex flex-col justify-end p-8">
                        <span className="text-2xl font-bold tracking-tight text-slate-900">{char.name}</span>
                        <div className="w-0 group-hover:w-16 h-1 mt-2 rounded-full transition-all duration-500" style={{ backgroundColor: house.color }}></div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
            <div className="lg:w-[480px] space-y-12 flex-shrink-0">
              <button onClick={() => setSelectedChar(null)} className="text-[11px] font-black uppercase text-slate-400 hover:text-slate-900 transition-colors">← 캐릭터 목록으로 돌아가기</button>
              
              {/* IMAGE CAROUSEL SECTION */}
              <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white group bg-slate-100">
                <img src={allImages[imgIndex]} className="w-full h-full object-cover transition-opacity duration-500" />
                
                {/* NAVIGATION ARROWS */}
                {allImages.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImg}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md text-slate-900 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/80 active:scale-90"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button 
                      onClick={handleNextImg}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md text-slate-900 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/80 active:scale-90"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </>
                )}

                {/* SLIDE INDICATORS */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, idx) => (
                    <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === imgIndex ? 'bg-slate-900 w-6' : 'bg-slate-900/20'}`} />
                  ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent pointer-events-none p-12 flex flex-col justify-end">
                  <h2 className="text-8xl font-serif italic leading-none">{selectedChar.name}</h2>
                  <div className="mt-8 flex gap-3">
                    <span className="text-[12px] uppercase font-black tracking-widest px-5 py-2.5 bg-white/80 rounded-2xl shadow-lg border border-slate-100" style={{ color: selectedChar.themeColor }}>{selectedChar.house.toUpperCase()} UNIT</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 space-y-10">
              <section className="grid md:grid-cols-2 gap-8">
                {[
                  { l: "출신", v: selectedChar.origin },
                  { l: "직위", v: selectedChar.title },
                  { l: "나이", v: selectedChar.age },
                  { l: "성격", v: selectedChar.personality },
                  { l: "성좌", v: selectedChar.constellation },
                  { l: "능력", v: selectedChar.ability },
                  ...(selectedChar.house === 'Adam' ? [] : [{ l: "성흔", v: selectedChar.stigma }]),
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{item.l}</span>
                    <span className="text-2xl font-bold text-slate-800 tracking-tight">{item.v}</span>
                  </div>
                ))}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl md:col-span-2">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">특징 (Traits)</span>
                   <p className="text-2xl text-slate-700 font-semibold leading-relaxed">{selectedChar.traits}</p>
                </div>
              </section>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-100 bg-white/50 py-16 px-10 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">&copy; 2025 EPHIEL ACADEMY ADMINISTRATIONS.</div>
           <div className="flex gap-10 text-[10px] font-black text-slate-300 uppercase tracking-widest">
             <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>SYSTEM ONLINE</span>
             <span>ACCESS LEVEL: ARCHIVIST</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><App /></React.StrictMode>);
