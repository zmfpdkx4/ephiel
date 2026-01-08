import React, { useState, useRef, useEffect } from 'react';
import { Character, ChatMessage } from '../types';
import { geminiService } from '../geminiService';

interface CharacterChatProps {
  character: Character;
}

const CharacterChat: React.FC<CharacterChatProps> = ({ character }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [character.id]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    const newMessages: ChatMessage[] = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    const response = await geminiService.chatWithCharacter(character, messages, userText);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="glass rounded-3xl flex flex-col h-[400px] overflow-hidden border-slate-100 shadow-lg bg-white/80">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-[10px] tracking-widest uppercase flex items-center gap-2 text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: character.themeColor }}></span>
          실시간 데이터 통신: {character.name}
        </h3>
        {isLoading && <span className="text-[9px] animate-pulse text-blue-500 font-mono font-bold">LINKING...</span>}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 text-xs mt-10 font-medium leading-relaxed px-6">
            데이터 수신 준비 완료.<br/>{character.name}에게 질문을 입력하십시오.
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] font-medium leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-slate-50/50 border-t border-slate-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="p-2 rounded-xl transition-all disabled:opacity-50 text-white shadow-md hover:scale-105 active:scale-95"
          style={{ backgroundColor: character.themeColor }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default CharacterChat;