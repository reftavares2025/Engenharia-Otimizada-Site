import React, { useState, useEffect } from 'react';
import { MapPin, X, Building2, Home, CheckCircle2, Clock } from 'lucide-react';

export interface SocialNotification {
  id: string;
  name: string;
  city: string;
  countryOrState: string;
  projectType: string;
  timeAgo: string;
  isChalet: boolean;
}

const mockNotifications: SocialNotification[] = [
  {
    id: '1',
    name: 'Sr. Ricardo S.',
    city: 'Angatuba',
    countryOrState: 'SP',
    projectType: 'Chalé A-Frame em Aço (95m²)',
    timeAgo: 'há 2 minutos',
    isChalet: true,
  },
  {
    id: '2',
    name: 'Eng. Marcelo B.',
    city: 'Avaré',
    countryOrState: 'SP',
    projectType: 'Galpão Pré-Fabricado (600m²)',
    timeAgo: 'há 5 minutos',
    isChalet: false,
  },
  {
    id: '3',
    name: 'Dra. Camila N.',
    city: 'Campos do Jordão',
    countryOrState: 'SP',
    projectType: 'Chalé de Luxo com Mezanino',
    timeAgo: 'há 8 minutos',
    isChalet: true,
  },
  {
    id: '4',
    name: 'Sr. Gabriel F.',
    city: 'Curitiba',
    countryOrState: 'PR',
    projectType: 'Estrutura Metálica Residencial',
    timeAgo: 'há 12 minutos',
    isChalet: false,
  },
  {
    id: '5',
    name: 'Sra. Valentina M.',
    city: 'Montevideo',
    countryOrState: 'Uruguai',
    projectType: 'Chalé Alpino com Deck e Piscina',
    timeAgo: 'há 15 minutos',
    isChalet: true,
  },
  {
    id: '6',
    name: 'Arq. Esteban C.',
    city: 'Santiago',
    countryOrState: 'Chile',
    projectType: 'Edifício Comercial Pré-Fabricado',
    timeAgo: 'há 18 minutos',
    isChalet: false,
  },
  {
    id: '7',
    name: 'Sr. Fernando P.',
    city: 'Gramado',
    countryOrState: 'RS',
    projectType: 'Vila de Chalés Turísticos em Aço',
    timeAgo: 'há 22 minutos',
    isChalet: true,
  },
  {
    id: '8',
    name: 'Sr. Matías G.',
    city: 'Punta del Este',
    countryOrState: 'Uruguai',
    projectType: 'Chalé de Alto Padrão em Aço',
    timeAgo: 'há 27 minutos',
    isChalet: true,
  },
  {
    id: '9',
    name: 'Eng. Lucas T.',
    city: 'Buenos Aires',
    countryOrState: 'Argentina',
    projectType: 'Complexo Logístico Pré-Moldado',
    timeAgo: 'há 31 minutos',
    isChalet: false,
  },
  {
    id: '10',
    name: 'Sr. Carlos E.',
    city: 'Angatuba',
    countryOrState: 'SP',
    projectType: 'Orçamento para Chalé A-Frame',
    timeAgo: 'agora pouco',
    isChalet: true,
  },
  {
    id: '11',
    name: 'Sra. Beatriz L.',
    city: 'Asunción',
    countryOrState: 'Paraguai',
    projectType: 'Galpão Industrial em Aço',
    timeAgo: 'há 35 minutos',
    isChalet: false,
  },
  {
    id: '12',
    name: 'Dr. Rodrigo M.',
    city: 'Bariloche',
    countryOrState: 'Argentina',
    projectType: 'Chalé de Montanha com Mezanino',
    timeAgo: 'há 40 minutos',
    isChalet: true,
  }
];

export const SocialProofToast: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosedByUser, setIsClosedByUser] = useState(() => {
    try {
      return sessionStorage.getItem('rt_social_toast_closed') === 'true';
    } catch {
      return false;
    }
  });

  const handleClose = () => {
    setIsClosedByUser(true);
    setIsVisible(false);
    try {
      sessionStorage.setItem('rt_social_toast_closed', 'true');
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (isClosedByUser) return;

    // Discreet initial timer: 10 seconds after page load
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(initialTimer);
  }, [isClosedByUser]);

  useEffect(() => {
    if (isClosedByUser) return;

    if (isVisible) {
      // Auto hide toast after 5 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(hideTimer);
    } else {
      // Wait 35 seconds before next toast
      const nextTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockNotifications.length);
        setIsVisible(true);
      }, 35000);

      return () => clearTimeout(nextTimer);
    }
  }, [isVisible, isClosedByUser]);

  if (isClosedByUser || !isVisible) return null;

  const current = mockNotifications[currentIndex];

  return (
    <div
      className={`fixed bottom-24 left-4 sm:bottom-6 sm:left-6 z-40 transition-all duration-500 ease-in-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-slate-900/95 border border-amber-500/30 text-white shadow-2xl backdrop-blur-md rounded-2xl p-3.5 pr-8 max-w-[290px] sm:max-w-sm relative group overflow-hidden">
        {/* Subtle accent bar */}
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-amber-500" />

        <button
          onClick={handleClose}
          className="absolute top-2.5 right-2.5 text-slate-400 hover:text-white p-1 rounded-full transition-colors"
          title="Fechar notificação"
          aria-label="Fechar notificação"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-start gap-3 pl-1">
          {/* Icon Box */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
            {current.isChalet ? (
              <Home className="w-4 h-4" />
            ) : (
              <Building2 className="w-4 h-4" />
            )}
          </div>

          {/* Content */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-100">{current.name}</span>
              <span className="text-[10px] bg-slate-800 text-amber-300 font-mono font-medium px-1.5 py-0.2 rounded border border-slate-700/80 flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5 text-amber-400" />
                {current.city}, {current.countryOrState}
              </span>
            </div>

            <p className="text-xs font-medium text-slate-300 line-clamp-1">
              {current.projectType}
            </p>

            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Orçamento
              </span>
              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5" />
                {current.timeAgo}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
