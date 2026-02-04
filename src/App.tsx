import React, { useState } from 'react';
import {
  Printer,
  Sun,
  Moon,
  Utensils,
  BookOpen,
  Music,
  Smile,
  Star,
  Plus,
  Trash2,
  ArrowLeft,
  Calendar,
  Coffee,
  BookHeart
} from 'lucide-react';

const ACTIVITY_TYPES = [
  { id: 'morning', label: 'Rotina Matinal', icon: Sun, color: 'bg-yellow-100 text-yellow-700' },
  { id: 'breakfast', label: 'Café da Manhã', icon: Coffee, color: 'bg-amber-100 text-amber-700' },
  { id: 'food', label: 'Almoço/Jantar', icon: Utensils, color: 'bg-orange-100 text-orange-700' },
  { id: 'study', label: 'Estudo/Escola', icon: BookOpen, color: 'bg-blue-100 text-blue-700' },
  { id: 'reading', label: 'Leitura', icon: BookHeart, color: 'bg-teal-100 text-teal-700' },
  { id: 'extra', label: 'Extra/Esporte', icon: Music, color: 'bg-purple-100 text-purple-700' },
  { id: 'relax', label: 'Lazer/Brincar', icon: Smile, color: 'bg-green-100 text-green-700' },
  { id: 'sleep', label: 'Dormir', icon: Moon, color: 'bg-indigo-100 text-indigo-700' },
  { id: 'other', label: 'Outro', icon: Star, color: 'bg-gray-100 text-gray-700' }
] as const;

type ActivityTypeId = (typeof ACTIVITY_TYPES)[number]['id'];

type Activity = {
  time: string;
  activity: string;
  type: ActivityTypeId;
};

const DAYS = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'] as const;

type DayKey = (typeof DAYS)[number];

type Schedule = Record<DayKey, Activity[]>;

const DEFAULT_SCHEDULE: Schedule = {
  segunda: [
    { time: '06:15', activity: 'Acordar', type: 'morning' },
    { time: '06:30', activity: 'Café da Manhã', type: 'breakfast' },
    { time: '07:00', activity: 'Português', type: 'study' },
    { time: '12:00', activity: 'Almoço', type: 'food' },
    { time: '14:00', activity: 'Inglês', type: 'extra' }
  ],
  terca: [
    { time: '07:00', activity: 'História', type: 'study' },
    { time: '09:00', activity: 'Lanche', type: 'breakfast' },
    { time: '14:00', activity: 'Natação', type: 'extra' },
    { time: '17:00', activity: 'Leitura', type: 'reading' }
  ],
  quarta: [
    { time: '07:00', activity: 'Geografia', type: 'study' },
    { time: '15:30', activity: 'Parque', type: 'relax' }
  ],
  quinta: [
    { time: '07:00', activity: 'Ciências', type: 'study' },
    { time: '16:00', activity: 'Brincar', type: 'relax' }
  ],
  sexta: [
    { time: '08:15', activity: 'Matemática', type: 'study' },
    { time: '17:30', activity: 'Pizza', type: 'food' }
  ]
};

const ActivityIcon = ({ type }: { type: ActivityTypeId }) => {
  const typeObj = ACTIVITY_TYPES.find((item) => item.id === type) ?? ACTIVITY_TYPES[ACTIVITY_TYPES.length - 1];
  const Icon = typeObj.icon;
  const colorClass = typeObj.color.split(' ')[1] || 'text-gray-500';
  return <Icon size={16} className={colorClass} />;
};

export default function App() {
  const [schedule, setSchedule] = useState<Schedule>(DEFAULT_SCHEDULE);
  const [childName, setChildName] = useState('');
  const [viewMode, setViewMode] = useState<'edit' | 'print'>('edit');
  const [activeDay, setActiveDay] = useState<DayKey>('segunda');

  const addActivity = () => {
    setSchedule((previous) => ({
      ...previous,
      [activeDay]: [
        ...previous[activeDay],
        { time: '00:00', activity: 'Nova Atividade', type: 'other' }
      ]
    }));
  };

  const removeActivity = (index: number) => {
    setSchedule((previous) => ({
      ...previous,
      [activeDay]: previous[activeDay].filter((_, itemIndex) => itemIndex !== index)
    }));
  };

  const updateActivity = (index: number, field: keyof Activity, value: string) => {
    setSchedule((previous) => ({
      ...previous,
      [activeDay]: previous[activeDay].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handlePrint = () => {
    window.focus();
    window.print();
  };

  if (viewMode === 'edit') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 font-sans">
        <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="text-pink-500" /> Minha Rotina
            </h1>
            <button
              onClick={() => setViewMode('print')}
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Printer size={16} /> Ver Impressão
            </button>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4">
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome da Criança</label>
            <input
              type="text"
              placeholder="Ex: Estela"
              className="w-full text-lg font-semibold border-b-2 border-pink-100 focus:border-pink-500 outline-none py-1 bg-transparent"
              value={childName}
              onChange={(event) => setChildName(event.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-4 py-2 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-colors ${
                  activeDay === day
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-lg font-bold text-gray-700 capitalize">{activeDay}</h2>
              <span className="text-xs text-gray-400">{schedule[activeDay].length} atividades</span>
            </div>

            {schedule[activeDay].map((item, index) => (
              <div
                key={`${item.time}-${item.activity}-${index}`}
                className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3 animate-fadeIn"
              >
                <div className="flex gap-2">
                  <div className="w-20">
                    <label className="text-[10px] text-gray-400 font-bold">HORA</label>
                    <input
                      type="time"
                      value={item.time}
                      onChange={(event) => updateActivity(index, 'time', event.target.value)}
                      className="w-full bg-gray-50 rounded-lg p-2 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="flex-grow">
                    <label className="text-[10px] text-gray-400 font-bold">ATIVIDADE</label>
                    <input
                      type="text"
                      value={item.activity}
                      onChange={(event) => updateActivity(index, 'activity', event.target.value)}
                      className="w-full bg-gray-50 rounded-lg p-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-grow">
                    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
                      {ACTIVITY_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => updateActivity(index, 'type', type.id)}
                          className={`p-1.5 rounded-lg flex items-center justify-center transition-all ${
                            item.type === type.id
                              ? `${type.color} ring-2 ring-offset-1 ring-gray-200`
                              : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                          }`}
                          title={type.label}
                        >
                          <type.icon size={16} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => removeActivity(index)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addActivity}
              className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 font-bold flex items-center justify-center gap-2 hover:border-pink-300 hover:text-pink-500 hover:bg-pink-50 transition-all"
            >
              <Plus size={20} /> Adicionar Atividade
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans print:bg-white print:p-0">
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <button
          onClick={() => setViewMode('edit')}
          className="bg-white text-gray-700 px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-gray-50 flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Voltar para Edição
        </button>

        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Printer size={18} /> Imprimir Agora
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-none print:shadow-none print:w-full print:h-auto print:overflow-visible relative overflow-hidden">
        <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 h-24 w-full absolute top-0 left-0 print:h-20"></div>

        <div className="relative z-10 p-6 print:p-4">
          <div className="text-center bg-white rounded-2xl shadow-lg mx-auto w-3/4 py-3 mb-6 border-4 border-yellow-300 print:shadow-none print:border-2">
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
              A Semana Incrível {childName ? `de ${childName}` : '...'}
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-1">Siga as cores para uma semana feliz!</p>
          </div>

          <div className="grid grid-cols-5 gap-2 md:gap-4 print:gap-2">
            {DAYS.map((day) => (
              <div key={day} className="flex flex-col h-full">
                <div
                  className={`text-white text-center py-2 rounded-t-lg font-bold uppercase text-sm mb-2 shadow-md print:shadow-none print-color-adjust ${
                    day === 'segunda'
                      ? 'bg-pink-500 print:bg-pink-500'
                      : day === 'terca'
                      ? 'bg-purple-500 print:bg-purple-500'
                      : day === 'quarta'
                      ? 'bg-blue-500 print:bg-blue-500'
                      : day === 'quinta'
                      ? 'bg-green-500 print:bg-green-500'
                      : 'bg-yellow-500 print:bg-yellow-500'
                  }`}
                >
                  {day}
                </div>
                <div className="bg-gray-50 rounded-b-lg p-2 flex-grow min-h-[400px] border border-gray-100 print:min-h-0">
                  {schedule[day].map((item, idx) => {
                    const activityType =
                      ACTIVITY_TYPES.find((type) => type.id === item.type) ?? ACTIVITY_TYPES[ACTIVITY_TYPES.length - 1];
                    const bgColor = activityType.color.split(' ')[0].replace('100', '50');

                    return (
                      <div key={`${item.time}-${item.activity}-${idx}`} className={`flex flex-col p-1 mb-1 rounded border border-dashed border-transparent ${bgColor}`}>
                        <span className="text-[10px] font-bold text-gray-500 w-full">{item.time}</span>
                        <div className="flex items-center gap-1">
                          <ActivityIcon type={item.type} />
                          <span className="text-xs font-medium text-gray-800 w-full truncate">{item.activity}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 print:mt-4">
            <div className="bg-orange-100 rounded-xl p-3 flex items-center justify-center gap-3 border-2 border-orange-200 border-dashed">
              <div className="bg-white p-2 rounded-full text-orange-500">
                <Utensils size={24} />
              </div>
              <div>
                <h3 className="font-bold text-orange-800 text-sm">Almoço & Descanso</h3>
                <p className="text-xs text-orange-600">Recarregar energias!</p>
              </div>
            </div>
            <div className="bg-indigo-100 rounded-xl p-3 flex items-center justify-center gap-3 border-2 border-indigo-200 border-dashed">
              <div className="bg-white p-2 rounded-full text-indigo-500">
                <Moon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-indigo-800 text-sm">Boa Noite</h3>
                <p className="text-xs text-indigo-600">Jantar, brincar e dormir (Zzz...)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media print {
          @page { size: landscape; margin: 0.5cm; }
          body { background: white; -webkit-print-color-adjust: exact; }
          .print-color-adjust { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}
