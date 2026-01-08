
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
  origin: string; // 출신
  title: string; // 직위
  age: string; // 나이
  personality: string; // 성격
  constellation: string; // 성좌
  ability: string; // 능력
  stigma: string; // 성흔 (아담 학파는 없음)
  traits: string; // 특징
  house: HouseType;
  height: string;
  voiceActor: string;
  description: string; // 배경(내부용)
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
