import { Character, HouseType } from './types';

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

export const LORE_DATA: LoreItem[] = [
  {
    id: 'academy',
    title: '에피엘 아카데미',
    summary: '성좌가 나아가야할 올바른 이정표',
    content: "하늘 위 성좌들에게 받은 힘을 무분별하게 사용하지 않고 올바르게 사용하는 법을 배우기 위한 아카데미. 지구와 밀로아, 두 세계의 학생들이 다니며 각자가 가진 능력을 이롭게 사용할 수 있는 방법을 배워나간다. 그들은 훗날 문명의 발전에 이바지함은 물론, 잠재적 위험요인으로 남아있는 마물과 싸워나갈 것이다.",
    imageUrl: 'https://razbe.uk/da06.png',
    history: [
      "100년 전, 크로만 제국의 궁중 마법사 '오큘라'가 지구와 성좌의 존재를 관측",
      "100년간의 마법 실험 끝에 서기 2025년, 크로만 제국은 지구와 밀로아를 연결시키는데 성공",
      "밀로아의 마력이 지구로 흘러들어오게되자 성좌의 힘이 이에 반응하여 활성화. 지구와 밀로아의 인류들이 성좌의 힘을 얻게 됨",
      "성좌를 통한 전쟁을 미리 준비하던 크로만 제국은 발빠르게 성좌의 힘을 통해 두 세계를 침공. 이로 인해 '성좌대전'이 발발",
      "전쟁 초기에는 두 세계 모두 열세였으나 곧이어 지구가 가진 성좌의 지식과 밀로아가 가진 마법의 지식을 하나로 합치는 동맹이 체결",
      "지구와 밀로아, 두 연합에 의해 탄생한 '성좌군'이 크로만의 침공을 저지",
      "이후 5년간 전쟁은 끝없이 이어졌으나 성좌의 힘을 그릇되게 사용해온 크로만 제국민들이 하나 둘씩 마물로 변화",
      "결국 제국 전체가 하나의 마물 소굴로 변함으로써 성좌대전은 종결",
      "전쟁의 상흔을 딛고 성좌의 힘을 문명의 발전에 활용함과 동시에 잠재적 위험요인으로 남은 마물들에 대한 대처의 필요성이 제기됨",
      "그리하여 두 세계를 연결하는 '포르타'에 에피엘 아카데미를 설립",
      "학장은 성좌군 중 가장 큰 활약을 했던 '유니 아스트라이어'가 취임"
    ]
  },
  {
    id: 'monsters',
    title: '마물',
    summary: '성좌에 먹혀버린 그릇된 존재들',
    content: "성좌의 힘에 먹혀버린 존재들. 성좌에 대한 지식 없이 무분별하게 그 힘만을 남용한 자들의 말로. 감정이 절제되었으며 오로지 폭력만을 추구하는 껍데기만이 남아버린 인간. 그러나 그 성좌의 힘은 인간이었을 시절에 비해 월등히 강해졌다. 크로만 제국이 멸망한 이후, 현재는 크로만 제국 내의 영토 안에 가둬두고 있으나 잠재적 위협 요인으로 남아있다.",
    imageUrl: 'https://razbe.uk/demon01.png',
    subItems: [
      { id: 'anarin', name: '아나린', imageUrl: 'https://razbe.uk/demon01.png', description: '전 크로만 제국의 여황제. 혼돈의 신 카오스의 화신' },
      { id: 'ocula', name: '오큘라', imageUrl: 'https://razbe.uk/demon02.png', description: '지구를 관측하고 두 세계를 하나로 합친 마법사. 아홉 세상을 내려다보는 오딘의 화신' },
      { id: 'noier', name: '노이어', imageUrl: 'https://razbe.uk/demon03.png', description: '크로만 제국군의 총사령관. 강철의 악룡 파프니르의 화신' }
    ]
  },
  {
    id: 'deus',
    title: '데우스 학파',
    summary: '신성하고 전통적인 마력의 계승자',
    content: '"성좌의 매력? 신의 권능을 부릴 수 있다는 점 아닐까?"\n\n어찌보면 가장 전통적이면서 메이저하다고 할 수 있겠지. 신의 이름 아래에 그들의 대리인이 되어 신의 권능을 통해 세상을 이롭게 한다는, 성좌의 의의를 가장 충실하게 따르는 곳이거든. 우리는 신의 힘을 다루는만큼 화신으로서의 힘은 모든 학파들 중 가장 강력해. 뭐어, 힘이 전부라고는 말 못하겠지만 전부가 아니라고도 말 못하겠지. 어때? 우리 학파에 들어오고 싶은 생각이 조금은 들었어?',
    imageUrl: 'https://razbe.uk/title01.png'
  },
  {
    id: 'adam',
    title: '아담 학파',
    summary: '인간의 의지와 기술로 성좌에 닿는 자들',
    content: '"역사를 쌓아올린 것도, 시대를 만들어가는 것도 모두 인간이다!"\n\n인간은 위대하다. 우리는 그들의 발자취 속에서 살아가며 우리 또한 우리의 발자취를 후대에게 남길 것이다. 개개인의 힘은 미약해보이나 그 속에 숨기고 있는 저력은 신도 마수도 뛰어 넘는다. 우리는 단결하고 우리는 목숨을 불태우며 우리는 우리 자신을 찬가한다. 너 또한 한 명의 인간으로서 우리와 연대하지 않겠는가? 아담으로 오너라.',
    imageUrl: 'https://razbe.uk/title02.png'
  },
  {
    id: 'behemoth',
    title: '베헤모스 학파',
    summary: '거친 야성과 마수의 힘을 다루는 자들',
    content: '"마수 또한 동물이야. 교감할 수 있다구."\n\n그래, 위험하지. 마수라니. 어느 이야기에 나오든 위험하기 짝이 없는 녀석들뿐이지? 난폭하고 으르렁거리고 할퀴고 물어뜯고......그런데 그런 녀석들일수록 그 힘은 어마어마해. 까짓거 길들여버리면 그만이잖아? 그 왜, 세상에 나쁜 마수는 없다...라는 말도 있잖아? 요컨대 주인이 하기 나름이란 거야. 너도 너의 안에 있는 마수를 길러볼 생각 없어?',
    imageUrl: 'https://razbe.uk/title03.png'
  },
  {
    id: 'marchen',
    title: '메르헨 학파',
    summary: '환상과 동화 속의 기적을 실현하는 자들',
    content: '"줄곧 동경해왔어요. 그 이야기 속의 주인공을..."\n\n저희는 사실 큰 뜻을 품는다거나 위험을 무릅쓰고 위업을 달성한다던가...성좌가 가진 의의를 제대로 따르는 사람들은 아니예요. 저희가 가장 중요히 여기는 것은 \'동경\'이랍니다. 당신은 어릴 적부터 동경하던 이야기는 없었나요? 그 이야기가 너무 마음에 들고, 그 이야기 속 주인공이 되고 싶다던가 하는...언젠가 이상적인 스스로의 모습에 손이 닿고 가장 빛나는 내 모습을 마주할 순간을...기다리고 있다거나 하지는 않나요? 만약 그렇다면 메르헨으로 와주세요. 이제 당신이 이야기의 주인공이 될 거예요.',
    imageUrl: 'https://razbe.uk/title04.png'
  }
];

export const STORY_SYNOPSIS = {
  title: "에피엘 아카데미",
  description: "",
  chapters: [
    { id: 1, title: "프롤로그: 별이 지는 밤", summary: "성좌 아카데미 입학식 날, 하늘에서 떨어진 기묘한 파편이 주인공의 운명을 바꿉니다." },
    { id: 2, title: "제1장: 계약의 조건", summary: "성좌 '공허를 응시하는 눈'이 당신에게 첫 번째 시련을 부여합니다." },
    { id: 3, title: "제2장: 학파 대항전", summary: "각 학파의 대리인들이 성좌의 가호를 걸고 진검승부를 벌입니다." }
  ]
};

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
  id,
  name,
  jpName: name, 
  origin,
  title,
  age,
  personality,
  constellation,
  ability,
  stigma,
  traits,
  house,
  height: '165cm',
  voiceActor: '성우 미배정',
  description: traits,
  themeColor: color,
  imageUrl: imgUrl,
  additionalImages: addImgs,
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
  createChar('yuni', '유니', 'Principal', '#e2e8f0', '밀로아', '학장', '45세', '조용하고 우아함', "성좌를 관장하는 신 '크리오스'", '타인의 성좌의 힘을 다룰 수 있음', '별모양 동공', '사실은 진짜 성격을 숨기고 있는데...', 'https://razbe.uk/da02.png', ['https://razbe.uk/ea01.png', 'https://razbe.uk/fa01.png']),
  createChar('ciel', '시엘', 'Deus', '#06b6d4', '지구', '1학년', '20세', '담담한 마이페이스', '무지개의 여신 \'이리스\'', '어디든지 순식간에 이동', '무지개색 이너헤어', '입고 싶은 교복도, 듣고 싶은 수업도 다 제멋대로', 'https://razbe.uk/db02.png', ['https://razbe.uk/eb01.png', 'https://razbe.uk/fb01.png']),
  createChar('seo', '세오', 'Deus', '#06b6d4', '밀로아', '2학년', '21세', '쿨해보이지만 외로움 잘탐', '명계의 인도자 \'아누비스\'', '영혼을 부릴 수 있음', '늑대 귀', '친구는 유령 친구가 있어요!', 'https://razbe.uk/dc02.png', ['https://razbe.uk/ec01.png', 'https://razbe.uk/fc01.png']),
  createChar('fani', '파니', 'Deus', '#06b6d4', '밀로아', '1학년', '101세', '호기심 가득', '우주의 섭리 \'바루나\'', '물을 자유롭게 다룸', '인간의 신체', '슬라임에 성좌가 깃들어 인간의 몸을 얻음', 'https://razbe.uk/dd02.png', ['https://razbe.uk/ed01.png', 'https://razbe.uk/fd01.png']),
  createChar('leshem', '레솀', 'Deus', '#06b6d4', '지구', '교사', '31세', '친근하고 요염함', '하늘의 서기관 \'메타트론\'', '아카식 레코드를 통해 무수한 정보를 얻을 수 있음', '천사 날개', '의외로 연애허접', 'https://razbe.uk/de02.png', ['https://razbe.uk/ee01.png', 'https://razbe.uk/fe01.png']),
  createChar('adam1', '윤정아', 'Adam', '#f43f5e', '지구', '3학년', '22세', '호쾌하고 당당함', '광활한 정복군주 \'광개토대왕\'', '주변 영역을 마음대로 지배하고 변화시킴', '', '리더쉽 넘치는 학생회장', 'https://razbe.uk/df02.png', ['https://razbe.uk/ef01.png', 'https://razbe.uk/ff01.png']),
  createChar('ruming', '루밍', 'Adam', '#f43f5e', '밀로아', '2학년', '21세', '활발할 실험광', '난해한 발명가 \'다이달로스\'', '상상 속의 물건을 개발', '', '잦은 실험으로 사고치는 맑은 눈의 광인', 'https://razbe.uk/dg02.png', ['https://razbe.uk/eg01.png', 'https://razbe.uk/fg01.png']),
  createChar('frenda', '프렌다', 'Adam', '#f43f5e', '지구', '1학년', '20세', '순진하고 활발함', '성야의 축복 \'산타클로스\'', '무작위 선물이 들어있는 깜짝 상자', '', '서프라이즈가 너무 좋아', 'https://razbe.uk/dh02.png', ['https://razbe.uk/eh01.png', 'https://razbe.uk/fh01.png']),
  createChar('sirha', '시르하', 'Adam', '#f43f5e', '밀로아', '교사', '347세', '고지식하지만 허당', '사막 위의 신념 \'살라딘\'', '타인에게 갈증과 결핍을 줌', '', '요즘 학생들의 유행을 따라가고 싶은 엘프', 'https://razbe.uk/di02.png', ['https://razbe.uk/ei01.png', 'https://razbe.uk/fi01.png']),
  createChar('schatten', '샤텐', 'Behemoth', '#8b5cf6', '지구', '1학년', '20세', '활발하고 로망이 넘침', '탑을 오르는 그림자 \'아 바오아 쿠\'', '그림자를 다룸', '검은색 피부', '닌자가 되고 싶습니다!', 'https://razbe.uk/dj02.png', ['https://razbe.uk/ej01.png', 'https://razbe.uk/fj01.png']),
  createChar('levi', '레비', 'Behemoth', '#8b5cf6', '밀로아', '1학년', '20세', '조용하고 무감정함', '만악의 재앙룡 \'아지다하카\'', '파괴, 부식, 재생', '삼중인격', '부드러운 인격과 츤데레 인격이 공존', 'https://razbe.uk/dk02.png', ['https://razbe.uk/ek01.png', 'https://razbe.uk/fk01.png']),
  createChar('ricella', '리셀라', 'Behemoth', '#8b5cf6', '밀로아', '2학년', '21세', '능글맞고 장난기 많음', '마안의 작은 왕 \'바실리스크\'', '타인에게 저주를 거는 마안', '녹색의 마안', '에카타 제국의 황녀이자 부학생회장', 'https://razbe.uk/dl02.png', ['https://razbe.uk/el01.png', 'https://razbe.uk/fl01.png']),
  createChar('mardel', '마르델', 'Behemoth', '#8b5cf6', '지구', '교사', '35세', '장난기 넘치지만 사려 깊음', '괴물들의 어머니 \'에키드나\'', '괴물을 창조함', '길다란 혀', '은근히 학생들을 돌봐주는 의외의 마망', 'https://razbe.uk/dm02.png', ['https://razbe.uk/em01.png', 'https://razbe.uk/fm01.png']),
  createChar('tsukuha', '츠쿠하', 'Marchen', '#10b981', '지구', '2학년', '21세', '순진하고 엉뚱함', '달의 공주 \'카구야\'', '시련을 내림', '달토끼의 귀', '시련에 맞딱드리는 걸 좋아하는 시련 매니아', 'https://razbe.uk/dn02.png', ['https://razbe.uk/en01.png', 'https://razbe.uk/fn01.png']),
  createChar('lucel', '루첼', 'Marchen', '#10b981', '지구', '1학년', '20세', '소심하고 자신감 없음', '재투성이 공주님 \'신데렐라\'', '이상적인 모습, 프린세스 모드!', '잿빛 머리카락', '꾸미면 무지 귀여움', 'https://razbe.uk/do02.png', ['https://razbe.uk/eo01.png', 'https://razbe.uk/fo01.png']),
  createChar('shu', '슈', 'Marchen', '#10b981', '밀로아', '3학년', '22세', '중립적이지만 약삭빠름', '평온과 부유의 기로 \'시골쥐와 도시쥐\'', '공격 혹은 방어 올인', '쥐의 귀', '계산이 빠른 학생회 회계', 'https://razbe.uk/dp02.png', ['https://razbe.uk/ep01.png', 'https://razbe.uk/fp01.png']),
  createChar('hael', '하엘', 'Marchen', '#10b981', '밀로아', '교사', '45세', '순진하고 자주 덜렁댐', '천국으로 인도하는 여인 \'베아트리체\'', '신성한 힘을 다룸', '머리 위 헤일로', '사랑을 전파하는 전직 수녀', 'https://razbe.uk/dq02.png', ['https://razbe.uk/eq01.png', 'https://razbe.uk/fq01.png']),
];