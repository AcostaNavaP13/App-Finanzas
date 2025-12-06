import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Trash2, TrendingUp, TrendingDown, DollarSign, Activity, 
  Settings, Download, Upload, X, Smartphone, ShieldCheck,
  Coffee, Car, Zap, Film, Heart, BookOpen, Briefcase, 
  Home, RefreshCw, ShoppingBag, Gift, FileText, ChevronDown,
  PawPrint, Plane, Shirt, PiggyBank, CreditCard, Scissors, Wrench, Tag,
  ExternalLink, HelpCircle, ArrowRight, Check, Mail, MessageCircle, Wallet,
  Moon, Sun, Globe, User
} from 'lucide-react';

// --- CONFIGURACIÓN DE CONTACTO ---
const MERCADO_PAGO_URL = "http://link.mercadopago.com.mx/acaapp";
const DEVELOPER_EMAIL = "teepeesaca@gmail.com";

// --- DICCIONARIO DE IDIOMAS ---
const TRANSLATIONS = {
  es: {
    balanceLabel: "Balance Disponible",
    income: "Ingresos",
    expense: "Gastos",
    addExpense: "Egreso",
    addIncome: "Ingreso",
    conceptPlaceholder: "Concepto",
    amountPlaceholder: "$0",
    categoryLabel: "Categoría",
    customCategoryPlaceholder: "Nombre categoría...",
    otherCategory: "+ Otra Categoría",
    recentActivity: "Actividad Reciente",
    emptyStateTitle: "Todo listo para empezar",
    emptyStateDesc: "Registra tu primer movimiento",
    backup: "RESPALDAR",
    restore: "RESTAURAR",
    tutorialBtn: "¿CÓMO USAR? / TUTORIAL",
    contactBtn: "CONTACTO / DONAR",
    settingsTitle: "Configuración",
    supportTitle: "Contacto y Apoyo",
    supportDesc: "¿Tienes sugerencias o quieres apoyar el desarrollo? Elige una opción:",
    contactDev: "Contactar Desarrollador",
    donate: "Donar / Invitar Café",
    viaMP: "Vía Mercado Pago",
    restoreAlert: "⚠️ RESTAURAR COPIA DE SEGURIDAD\n\nSe sobrescribirán los datos actuales.\n¿Continuar?",
    deleteAlert: "¿Eliminar registro permanentemente?",
    dbRestored: "Base de datos restaurada.",
    errorFile: "Error al leer el archivo.",
    inputNamePlaceholder: "Tu Nombre o Apodo",
    tutorialSteps: [
      { title: "Identidad", desc: "¿Cómo te gustaría que te llamemos? Esto personalizará tu experiencia." }, // Nuevo paso
      { title: "Control Total", desc: "Bienvenido. Aquí verás tu balance en tiempo real, ingresos vs gastos. Tu salud financiera en un vistazo." },
      { title: "Registro Ágil", desc: "1. Elige Ingreso o Egreso.\n2. Escribe el concepto y monto.\n3. ¡Listo! Todo se guarda automáticamente." },
      { title: "Categorías Dinámicas", desc: "Selecciona una categoría visual o crea una propia seleccionando '+ Otra Categoría' al final de la lista." },
      { title: "Seguridad de Datos", desc: "Tus datos viven en este dispositivo. Usa el menú de Configuración para RESPALDAR (Exportar) y llevártelos a donde quieras." },
      { title: "Definir Arranque", desc: "Para que tu balance sea real desde hoy, ingresa tu saldo actual (Efectivo + Bancos). Nosotros crearemos el primer registro por ti." }
    ],
    initialBalance: "Saldo Inicial",
    leaveZero: "Puedes dejarlo en 0 si prefieres.",
    startApp: "Iniciar App",
    next: "Siguiente",
    understood: "Entendido",
    personalization: "Personalización",
    yourName: "Tu Nombre",
    appearance: "Apariencia",
    language: "Idioma",
    footer: "Ingeniería y Diseño por",
    // Mapeo nulo para español (ya están en español)
    categoryMap: {} 
  },
  en: {
    balanceLabel: "Available Balance",
    income: "Income",
    expense: "Expenses",
    addExpense: "Expense",
    addIncome: "Income",
    conceptPlaceholder: "Concept",
    amountPlaceholder: "$0",
    categoryLabel: "Category",
    customCategoryPlaceholder: "Category name...",
    otherCategory: "+ Other Category",
    recentActivity: "Recent Activity",
    emptyStateTitle: "Ready to start",
    emptyStateDesc: "Record your first transaction",
    backup: "BACKUP",
    restore: "RESTORE",
    tutorialBtn: "HOW TO USE? / TUTORIAL",
    contactBtn: "CONTACT / DONATE",
    settingsTitle: "Settings",
    supportTitle: "Contact & Support",
    supportDesc: "Have suggestions or want to support development? Choose an option:",
    contactDev: "Contact Developer",
    donate: "Donate / Buy me a Coffee",
    viaMP: "Via Mercado Pago",
    restoreAlert: "⚠️ RESTORE BACKUP\n\nCurrent data will be overwritten.\nContinue?",
    deleteAlert: "Delete record permanently?",
    dbRestored: "Database restored.",
    errorFile: "Error reading file.",
    inputNamePlaceholder: "Your Name or Nickname",
    tutorialSteps: [
      { title: "Identity", desc: "What should we call you? This will personalize your experience." }, // Nuevo paso
      { title: "Total Control", desc: "Welcome. Here you will see your real-time balance, income vs expenses. Your financial health at a glance." },
      { title: "Quick Entry", desc: "1. Choose Income or Expense.\n2. Enter concept and amount.\n3. Done! Everything saves automatically." },
      { title: "Dynamic Categories", desc: "Select a visual category or create your own by selecting '+ Other Category' at the bottom of the list." },
      { title: "Data Security", desc: "Your data lives on this device. Use the Settings menu to BACKUP (Export) and take it wherever you go." },
      { title: "Set Start", desc: "For an accurate balance starting today, enter your current funds (Cash + Bank). We'll create the first record for you." }
    ],
    initialBalance: "Initial Balance",
    leaveZero: "You can leave it at 0 if you prefer.",
    startApp: "Start App",
    next: "Next",
    understood: "Got it",
    personalization: "Personalization",
    yourName: "Your Name",
    appearance: "Appearance",
    language: "Language",
    footer: "Engineering & Design by",
    // Mapeo de claves en Español a Inglés para visualización
    categoryMap: {
      'General': 'General',
      'Alimentos': 'Food',
      'Transporte': 'Transport',
      'Hogar/Renta': 'Home/Rent',
      'Servicios': 'Utilities',
      'Suscripciones': 'Subscriptions',
      'Mascotas': 'Pets',
      'Salud': 'Health',
      'Cuidado Personal': 'Personal Care',
      'Ropa/Calzado': 'Clothing',
      'Compras': 'Shopping',
      'Regalos': 'Gifts',
      'Entretenimiento': 'Entertainment',
      'Educación': 'Education',
      'Viajes': 'Travel',
      'Mantenimiento': 'Maintenance',
      'Inversiones': 'Investments',
      'Deudas/Créditos': 'Debt/Loans',
      'Negocio': 'Business'
    }
  }
};

// --- ICONOS DEL TUTORIAL (Se agrega User para el primer paso) ---
const STEPS_ICONS = [User, Activity, Plus, Tag, ShieldCheck, Wallet];

export default function FinanceManager() {
  // --- ESTADOS Y REF ---
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); 
  const [category, setCategory] = useState('General');
  
  // Preferencias de Usuario
  const [theme, setTheme] = useState('dark'); 
  const [lang, setLang] = useState('es'); 
  const [userName, setUserName] = useState(''); // Inicializado vacío

  // Estados UI
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false); 
  const [showDonationModal, setShowDonationModal] = useState(false);
  
  // Tutorial
  const [runTutorial, setRunTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [initialBalance, setInitialBalance] = useState('');
  const [tempName, setTempName] = useState(''); // Estado temporal para el nombre en tutorial

  const fileInputRef = useRef(null);
  const t = TRANSLATIONS[lang]; 

  // --- CONFIGURACIÓN DE CATEGORÍAS ---
  const categoryConfig = {
    'General': { icon: FileText, color: 'text-slate-400', bg: 'bg-slate-800' },
    'Alimentos': { icon: Coffee, color: 'text-amber-500', bg: 'bg-amber-900/20' },
    'Transporte': { icon: Car, color: 'text-blue-400', bg: 'bg-blue-900/20' },
    'Hogar/Renta': { icon: Home, color: 'text-cyan-400', bg: 'bg-cyan-900/20' },
    'Servicios': { icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-900/20' },
    'Suscripciones': { icon: RefreshCw, color: 'text-pink-400', bg: 'bg-pink-900/20' },
    'Mascotas': { icon: PawPrint, color: 'text-orange-400', bg: 'bg-orange-900/20' },
    'Salud': { icon: Heart, color: 'text-rose-400', bg: 'bg-rose-900/20' },
    'Cuidado Personal': { icon: Scissors, color: 'text-fuchsia-400', bg: 'bg-fuchsia-900/20' },
    'Ropa/Calzado': { icon: Shirt, color: 'text-violet-400', bg: 'bg-violet-900/20' },
    'Compras': { icon: ShoppingBag, color: 'text-indigo-400', bg: 'bg-indigo-900/20' },
    'Regalos': { icon: Gift, color: 'text-red-400', bg: 'bg-red-900/20' },
    'Entretenimiento': { icon: Film, color: 'text-purple-400', bg: 'bg-purple-900/20' },
    'Educación': { icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-900/20' },
    'Viajes': { icon: Plane, color: 'text-sky-400', bg: 'bg-sky-900/20' },
    'Mantenimiento': { icon: Wrench, color: 'text-stone-400', bg: 'bg-stone-900/20' },
    'Inversiones': { icon: PiggyBank, color: 'text-emerald-500', bg: 'bg-emerald-900/20' },
    'Deudas/Créditos': { icon: CreditCard, color: 'text-slate-300', bg: 'bg-slate-700' },
    'Negocio': { icon: Briefcase, color: 'text-emerald-400', bg: 'bg-emerald-900/20' },
  };

  const categories = Object.keys(categoryConfig);

  // --- HELPER DE CATEGORÍAS (FIX IDIOMA) ---
  const getCategoryLabel = (catKey) => {
    // Si hay un mapa de traducción para este idioma y existe la clave, úsala.
    // Si no, devuelve la clave original (que está en español).
    if (t.categoryMap && t.categoryMap[catKey]) {
      return t.categoryMap[catKey];
    }
    return catKey;
  };

  // --- ESTILOS DINÁMICOS (TEMA) ---
  const getThemeStyles = () => {
    if (theme === 'light') {
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-800',
        cardBg: 'bg-white',
        cardBorder: 'border-slate-200',
        inputBg: 'bg-slate-100',
        headerBg: 'bg-white/80',
        subText: 'text-slate-500',
        accentText: 'text-slate-700',
        modalBg: 'bg-white/95'
      };
    }
    return {
      bg: 'bg-slate-950',
      text: 'text-slate-200',
      cardBg: 'bg-slate-900',
      cardBorder: 'border-slate-800',
      inputBg: 'bg-slate-950',
      headerBg: 'bg-slate-900/80',
      subText: 'text-slate-500',
      accentText: 'text-slate-300',
      modalBg: 'bg-slate-950/90'
    };
  };

  const s = getThemeStyles();

  // --- EFECTOS DE INICIALIZACIÓN ---
  useEffect(() => {
    setTimeout(() => {
      const savedData = localStorage.getItem('finance_data_v1');
      if (savedData) setTransactions(JSON.parse(savedData));
      
      const savedTheme = localStorage.getItem('aca_theme');
      if (savedTheme) setTheme(savedTheme);
      
      const savedLang = localStorage.getItem('aca_lang');
      if (savedLang) setLang(savedLang);

      const savedName = localStorage.getItem('aca_username');
      if (savedName) setUserName(savedName);

      const hasSeenTutorial = localStorage.getItem('aca_tutorial_seen');
      if (!hasSeenTutorial) {
        setRunTutorial(true);
      } else if (!savedName) {
        // Si ya vio el tutorial pero por alguna razón no tiene nombre (versiones previas), usamos un default o pedimos de nuevo (aquí default)
        setUserName('Adhal Cabrera'); 
      }

      setLoading(false);
    }, 2000);
  }, []);

  // --- PERSISTENCIA ---
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('finance_data_v1', JSON.stringify(transactions));
      localStorage.setItem('aca_theme', theme);
      localStorage.setItem('aca_lang', lang);
      localStorage.setItem('aca_username', userName);
    }
  }, [transactions, theme, lang, userName, loading]);

  // --- UTILIDADES ---
  const vibrate = (ms = 10) => {
    if (navigator.vibrate) navigator.vibrate(ms);
  };

  const toggleTheme = () => {
    vibrate();
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleLang = () => {
    vibrate();
    setLang(prev => prev === 'es' ? 'en' : 'es');
  };

  // --- LÓGICA DE NEGOCIO ---
  const handleAddTransaction = (e) => {
    e.preventDefault();
    let finalCategory = category;
    if (isCustomCategory) {
      if (!customCategoryName.trim()) return; 
      finalCategory = customCategoryName.trim();
    }
    if (!description || !amount) return;

    vibrate(50); 
    const newTransaction = {
      id: crypto.randomUUID(),
      description,
      amount: parseFloat(amount),
      type,
      category: finalCategory,
      date: new Date().toISOString(),
    };
    setTransactions([newTransaction, ...transactions]);
    setDescription('');
    setAmount('');
    if (isCustomCategory) {
      setCustomCategoryName('');
      setIsCustomCategory(false);
      setCategory('General');
    }
    setShowCatMenu(false);
  };

  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = (id) => {
    vibrate(50);
    if(window.confirm(t.deleteAlert)) {
      setDeletingId(id);
      if (process.env.NODE_ENV !== 'test') {
        setTimeout(() => {
          setTransactions(transactions.filter(t => t.id !== id));
          setDeletingId(null);
        }, 500);
      } else {
        setTransactions(transactions.filter(t => t.id !== id));
        setDeletingId(null);
      }
    }
  };

  // --- IMPORT/EXPORT ---
  const handleExportData = () => {
    vibrate(20);
    const dataStr = JSON.stringify(transactions, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CASHFLOW_BKP_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportData = (event) => {
    vibrate(20);
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData)) {
          if(window.confirm(t.restoreAlert)) {
            setTransactions(importedData);
            setShowSettings(false);
            alert(t.dbRestored);
          }
        }
      } catch (error) {
        alert(t.errorFile);
      }
    };
    reader.readAsText(file);
    event.target.value = null; 
  };

  // --- TUTORIAL LOGIC ---
  const handleNextStep = () => {
    vibrate();
    
    // Guardar nombre si estamos en el paso 0
    if (tutorialStep === 0) {
      if (tempName.trim()) {
        setUserName(tempName);
      } else {
        setUserName('Adhal Cabrera'); // Fallback si lo dejan vacío
      }
    }

    if (tutorialStep < t.tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      finishTutorial();
    }
  };

  const finishTutorial = () => {
    if (initialBalance && parseFloat(initialBalance) > 0) {
      const startTransaction = {
        id: crypto.randomUUID(),
        description: t.initialBalance,
        amount: parseFloat(initialBalance),
        type: 'income',
        category: 'General',
        date: new Date().toISOString(),
      };
      setTransactions(prev => [startTransaction, ...prev]);
    }
    setRunTutorial(false);
    setTutorialStep(0);
    setInitialBalance('');
    localStorage.setItem('aca_tutorial_seen', 'true');
  };

  const restartTutorial = () => {
    setShowSettings(false);
    setTutorialStep(0);
    setInitialBalance('');
    setTempName(userName); // Pre-llenar con el nombre actual
    setRunTutorial(true);
  };

  // --- KPIS & HELPERS ---
  const incomeVal = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expenseVal = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = incomeVal - expenseVal;

  const formatCurrency = (num) => {
    return new Intl.NumberFormat(lang === 'es' ? 'es-MX' : 'en-US', { style: 'currency', currency: 'MXN' }).format(num);
  };

  const CategoryIcon = ({ catName, size = 18 }) => {
    // Buscar la configuración original usando la clave en español (así se guardan los datos)
    const config = categoryConfig[catName] || { icon: Tag, color: 'text-slate-400', bg: 'bg-slate-800' };
    const Icon = config.icon;
    return <Icon size={size} className={config.color} />;
  };

  const getCategoryBg = (catName) => {
    const config = categoryConfig[catName] || { bg: 'bg-slate-800' };
    return config.bg;
  };

  // --- RENDERIZADO: SPLASH SCREEN ---
  if (loading && process.env.NODE_ENV !== 'test') {
    return (
      <div className={`fixed inset-0 ${s.bg} flex flex-col items-center justify-center z-50`}>
        <div className="relative flex flex-col items-center animate-in fade-in zoom-in duration-700">
          <div className="relative mb-6">
            <Activity size={56} strokeWidth={1.5} className="text-amber-500 absolute -top-12 left-1/2 -translate-x-1/2 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            <h1 className="text-7xl font-serif tracking-tighter leading-none select-none" style={{ fontFamily: 'Times New Roman, serif' }}>
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}>A</span>
              <span className="text-amber-500 -ml-2 z-10 relative">C</span>
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}>A</span>
            </h1>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent mb-4"></div>
          {/* Mostramos el nombre si ya cargó, sino placeholder visual */}
          <p className={`${s.subText} text-[10px] tracking-[0.4em] uppercase font-medium h-4`}>
            {userName}
          </p>
          <div className="mt-12 flex gap-1">
             <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
             <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
             <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  // --- APP PRINCIPAL ---
  return (
    <div className={`fixed inset-0 ${s.bg} ${s.text} font-sans overflow-hidden flex flex-col select-none touch-manipulation transition-colors duration-500`}>
      <style>{`
        body { overscroll-behavior: none; -webkit-tap-highlight-color: transparent; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      
      {/* HEADER */}
      <header className={`${s.headerBg} backdrop-blur-md border-b ${s.cardBorder} pt-safe-top pb-3 px-4 shadow-lg shrink-0 z-20 transition-colors duration-500`}>
        <div className="flex items-center justify-between max-w-lg mx-auto pt-2">
          <div className="flex items-center gap-3">
            <div className={`bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 shadow-sm shadow-amber-900/20`}>
              <Activity className="text-amber-500 w-5 h-5" />
            </div>
            <div className="flex flex-col leading-none">
               <span className={`text-[10px] ${s.subText} font-bold uppercase tracking-wider`}>Control de</span>
               <h1 className={`text-lg ${s.text} font-sans`}>
                 {lang === 'es' ? '¿Cuánto' : 'How much'} <span className="font-black text-amber-500 tracking-wide">{lang === 'es' ? 'Gasto?' : 'Spent?'}</span>
               </h1>
            </div>
          </div>
          <button 
            onClick={() => { vibrate(); setShowSettings(!showSettings); }}
            className={`p-2 rounded-full transition-all active:scale-90 ${showSettings ? 'bg-amber-900/40 text-amber-400' : `${s.subText} hover:text-amber-500`}`}
          >
            {showSettings ? <X size={22} /> : <Settings size={22} />}
          </button>
        </div>
      </header>

      {/* MODAL TUTORIAL */}
      {runTutorial && (
        <div className={`fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 ${s.modalBg} backdrop-blur-md animate-in fade-in duration-300`}>
           <div className={`w-full max-w-sm ${s.cardBg} border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden`}>
              <div className="flex gap-2 mb-6">
                 {t.tutorialSteps.map((_, idx) => (
                   <div key={idx} className={`h-1 flex-1 rounded-full transition-colors ${idx <= tutorialStep ? 'bg-amber-500' : 'bg-slate-700'}`}></div>
                 ))}
              </div>

              <div className="flex flex-col items-center text-center space-y-4 min-h-[220px]">
                 <div className={`${theme === 'light' ? 'bg-slate-100' : 'bg-slate-800'} p-4 rounded-full text-amber-500 mb-2`}>
                    {React.createElement(STEPS_ICONS[tutorialStep], { size: 32 })}
                 </div>
                 <h3 className={`text-xl font-bold ${s.text}`}>{t.tutorialSteps[tutorialStep].title}</h3>
                 <p className={`${s.subText} text-sm leading-relaxed whitespace-pre-line`}>
                    {t.tutorialSteps[tutorialStep].desc}
                 </p>
                 
                 {/* Paso 0: Identidad */}
                 {tutorialStep === 0 && (
                   <div className="w-full mt-2 animate-in slide-in-from-bottom-2">
                     <div className="relative">
                       <User size={16} className={`absolute left-3 top-3.5 ${s.subText}`} />
                       <input 
                         type="text" 
                         value={tempName}
                         onChange={(e) => setTempName(e.target.value)}
                         placeholder={t.inputNamePlaceholder}
                         className={`w-full ${s.inputBg} border ${s.cardBorder} rounded-xl py-3 pl-9 pr-4 ${s.text} placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors`}
                         autoFocus
                       />
                     </div>
                   </div>
                 )}

                 {/* Paso Final: Saldo */}
                 {tutorialStep === t.tutorialSteps.length - 1 && (
                   <div className="w-full mt-2 animate-in slide-in-from-bottom-2">
                     <div className="relative">
                       <DollarSign size={16} className={`absolute left-3 top-3.5 ${s.subText}`} />
                       <input 
                         type="number" 
                         value={initialBalance}
                         onChange={(e) => setInitialBalance(e.target.value)}
                         placeholder={t.amountPlaceholder}
                         className={`w-full ${s.inputBg} border ${s.cardBorder} rounded-xl py-3 pl-9 pr-4 ${s.text} placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors`}
                         autoFocus
                       />
                     </div>
                     <p className={`text-[10px] ${s.subText} mt-2 text-center`}>{t.leaveZero}</p>
                   </div>
                 )}
              </div>

              <button 
                onClick={handleNextStep}
                className="w-full mt-6 bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {tutorialStep === t.tutorialSteps.length - 1 ? t.startApp : t.next} 
                {tutorialStep === t.tutorialSteps.length - 1 ? <Check size={18} /> : <ArrowRight size={18} />}
              </button>
           </div>
        </div>
      )}

      {/* MODAL DE CONTACTO Y DONACIONES */}
      {showDonationModal && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-6 ${s.modalBg} backdrop-blur-sm animate-in fade-in`}>
          <div className={`${s.cardBg} border ${s.cardBorder} p-6 rounded-3xl shadow-2xl w-full max-w-sm relative overflow-hidden`}>
             <button 
              onClick={() => { setShowDonationModal(false); vibrate(); }} 
              className={`absolute top-4 right-4 ${s.subText} hover:${s.text} p-1 rounded-full z-10`}
             >
                <X size={20}/>
             </button>

             <div className="flex flex-col items-center text-center mb-6 mt-4">
               <div className={`${theme === 'light' ? 'bg-slate-100' : 'bg-slate-800'} p-3 rounded-2xl mb-3 border ${s.cardBorder}`}>
                 <MessageCircle size={28} className={s.accentText} />
               </div>
               <h3 className={`text-xl font-bold ${s.text} mb-1`}>{t.supportTitle}</h3>
               <p className={`${s.subText} text-xs leading-relaxed max-w-[250px]`}>
                 {t.supportDesc}
               </p>
             </div>

             <div className="space-y-3">
                <a 
                  href={`mailto:${DEVELOPER_EMAIL}`}
                  className={`flex items-center justify-between w-full p-4 ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200' : 'bg-slate-800 hover:bg-slate-700'} border ${s.cardBorder} rounded-2xl transition-all active:scale-95 group`}
                  onClick={() => vibrate()}
                >
                   <div className="flex items-center gap-3">
                     <div className={`${theme === 'light' ? 'bg-white' : 'bg-slate-700'} p-2 rounded-lg`}>
                        <Mail size={18} className="text-blue-400" />
                     </div>
                     <div className="text-left">
                        <span className={`block font-bold ${s.text} text-sm`}>{t.contactDev}</span>
                        <span className={`block text-[10px] ${s.subText}`}>{DEVELOPER_EMAIL}</span>
                     </div>
                   </div>
                   <ArrowRight size={16} className={`${s.subText}`} />
                </a>

                <a 
                  href={MERCADO_PAGO_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-4 bg-[#009EE3] hover:bg-[#0089c4] rounded-2xl transition-all active:scale-95 group shadow-lg shadow-sky-900/20"
                  onClick={() => vibrate()}
                >
                   <div className="flex items-center gap-3">
                     <div className="bg-white/20 p-2 rounded-lg">
                        <DollarSign size={18} className="text-white" />
                     </div>
                     <div className="text-left">
                        <span className="block font-bold text-white text-sm">{t.donate}</span>
                        <span className="block text-[10px] text-white/80">{t.viaMP}</span>
                     </div>
                   </div>
                   <ExternalLink size={16} className="text-white/60 group-hover:text-white" />
                </a>
             </div>
             
             <p className={`text-[10px] ${s.subText} text-center mt-6`}>
               {t.footer} {userName}
             </p>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative w-full max-w-lg mx-auto">
        
        {/* SETTINGS OVERLAY */}
        {showSettings && (
          <div className={`sticky top-0 z-30 ${s.headerBg} backdrop-blur-md border-b ${s.cardBorder} p-4 animate-in slide-in-from-top-5 shadow-2xl`}>
            
            {/* Personalization Section */}
            <div className="mb-4 space-y-3">
              <h3 className={`text-[10px] font-bold ${s.subText} uppercase tracking-widest`}>{t.personalization}</h3>
              
              <div className={`flex items-center gap-2 ${s.inputBg} border ${s.cardBorder} rounded-xl p-3`}>
                <User size={18} className={s.subText} />
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={t.yourName}
                  className={`bg-transparent w-full focus:outline-none ${s.text} text-sm font-medium`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                 {/* Theme Toggle */}
                 <button onClick={toggleTheme} className={`flex items-center justify-between p-3 ${s.inputBg} border ${s.cardBorder} rounded-xl active:scale-95 transition-transform`}>
                    <div className="flex items-center gap-2">
                       {theme === 'dark' ? <Moon size={16} className="text-indigo-400"/> : <Sun size={16} className="text-amber-500"/>}
                       <span className={`text-xs font-bold ${s.text}`}>{t.appearance}</span>
                    </div>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-indigo-900' : 'bg-amber-200'}`}>
                       <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${theme === 'dark' ? 'left-4' : 'left-0.5'}`}></div>
                    </div>
                 </button>
                 
                 {/* Language Toggle */}
                 <button onClick={toggleLang} className={`flex items-center justify-between p-3 ${s.inputBg} border ${s.cardBorder} rounded-xl active:scale-95 transition-transform`}>
                    <div className="flex items-center gap-2">
                       <Globe size={16} className="text-emerald-500"/>
                       <span className={`text-xs font-bold ${s.text}`}>{t.language}</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${s.cardBg} border ${s.cardBorder} ${s.subText}`}>
                      {lang}
                    </span>
                 </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={handleExportData} className={`flex flex-col items-center p-4 ${s.cardBg} rounded-xl active:bg-opacity-80 transition-colors border ${s.cardBorder} group`}>
                <Download className="text-emerald-500 mb-2 group-active:scale-90 transition-transform" />
                <span className={`text-xs font-bold ${s.text}`}>{t.backup}</span>
              </button>
              <button onClick={() => fileInputRef.current.click()} className={`flex flex-col items-center p-4 ${s.cardBg} rounded-xl active:bg-opacity-80 transition-colors border ${s.cardBorder} group`}>
                <Upload className="text-amber-500 mb-2 group-active:scale-90 transition-transform" />
                <span className={`text-xs font-bold ${s.text}`}>{t.restore}</span>
              </button>
              
              <button 
                onClick={() => { vibrate(); restartTutorial(); }}
                className={`col-span-2 flex items-center justify-center gap-2 p-3 ${theme === 'light' ? 'bg-blue-50 hover:bg-blue-100' : 'bg-slate-800/50 hover:bg-slate-800'} border ${theme === 'light' ? 'border-blue-100' : 'border-slate-700/50'} rounded-xl active:scale-[0.98] transition-all group`}
              >
                <HelpCircle size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <span className={`text-xs font-bold ${s.text}`}>{t.tutorialBtn}</span>
              </button>

              <button 
                onClick={() => { setShowDonationModal(true); setShowSettings(false); vibrate(); }} 
                className={`col-span-2 flex items-center justify-center gap-2 p-3 ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200' : 'bg-slate-800/50 hover:bg-slate-800'} border ${s.cardBorder} rounded-xl active:scale-[0.98] transition-all group`}
              >
                <Mail size={16} className={`${s.subText} group-hover:scale-110 transition-transform`} />
                <span className={`text-xs font-bold ${s.text}`}>{t.contactBtn}</span>
              </button>

              <input type="file" ref={fileInputRef} onChange={handleImportData} accept=".json" className="hidden" />
            </div>
          </div>
        )}

        <div className="p-4 space-y-6 pb-28">
          
          {/* BALANCE CARD */}
          <div className={`bg-gradient-to-br ${theme === 'light' ? 'from-white via-slate-50 to-slate-100' : 'from-slate-900 via-slate-800 to-slate-900'} p-6 rounded-[2rem] border ${s.cardBorder} shadow-2xl relative overflow-hidden group transition-colors duration-500`}>
            <div className="absolute -right-4 -top-4 opacity-5 rotate-12 group-hover:opacity-10 transition-opacity duration-700">
              <ShieldCheck size={140} className={s.text} />
            </div>
            
            <div className="flex flex-col items-center justify-center mb-6 z-10 relative">
              <p className={`${s.subText} text-[10px] font-bold uppercase tracking-[0.2em] mb-1`}>{t.balanceLabel}</p>
              <h2 className={`text-5xl font-black tracking-tighter ${balance >= 0 ? `${theme === 'light' ? 'text-slate-800' : 'text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400'}` : 'text-rose-400'}`}>
                {formatCurrency(balance)}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
               <div className={`${theme === 'light' ? 'bg-white/60' : 'bg-slate-950/50'} p-3 rounded-2xl border ${theme === 'light' ? 'border-slate-200' : 'border-white/5'} backdrop-blur-sm`}>
                 <div className="flex items-center gap-2 mb-1">
                    <div className="p-1 rounded-full bg-emerald-500/10">
                      <TrendingUp size={12} className="text-emerald-400" />
                    </div>
                    <p className={`text-[10px] ${s.subText} uppercase font-bold`}>{t.income}</p>
                 </div>
                 <p className="text-emerald-400 font-bold text-lg">{formatCurrency(incomeVal)}</p>
               </div>
               <div className={`${theme === 'light' ? 'bg-white/60' : 'bg-slate-950/50'} p-3 rounded-2xl border ${theme === 'light' ? 'border-slate-200' : 'border-white/5'} backdrop-blur-sm`}>
                 <div className="flex items-center gap-2 mb-1">
                    <div className="p-1 rounded-full bg-rose-500/10">
                      <TrendingDown size={12} className="text-rose-400" />
                    </div>
                    <p className={`text-[10px] ${s.subText} uppercase font-bold`}>{t.expense}</p>
                 </div>
                 <p className="text-rose-400 font-bold text-lg">{formatCurrency(expenseVal)}</p>
               </div>
            </div>
          </div>

          {/* FORMULARIO */}
          <div className={`${s.cardBg} p-4 rounded-3xl border ${s.cardBorder} transition-colors duration-500`}>
            <div className={`flex ${s.inputBg} p-1 rounded-2xl border ${s.cardBorder} mb-4`}>
                <button
                  onClick={() => { vibrate(); setType('expense'); }}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
                    type === 'expense' ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/20' : `${s.subText} hover:${s.text}`
                  }`}
                >
                  {t.addExpense}
                </button>
                <button
                  onClick={() => { vibrate(); setType('income'); }}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
                    type === 'income' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : `${s.subText} hover:${s.text}`
                  }`}
                >
                  {t.addIncome}
                </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-3">
              <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t.conceptPlaceholder}
                      className={`w-full ${s.inputBg} border ${s.cardBorder} ${s.text} px-4 py-4 rounded-2xl focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 focus:outline-none transition-all placeholder:text-slate-500`}
                    />
                  </div>
                  <div className="w-[35%]">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={t.amountPlaceholder}
                      className={`w-full ${s.inputBg} border ${s.cardBorder} ${s.text} px-4 py-4 rounded-2xl focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 focus:outline-none transition-all placeholder:text-slate-500 text-center font-mono`}
                    />
                  </div>
              </div>
              
              <div className="flex gap-3">
                  <div className="relative flex-1">
                    {!isCustomCategory ? (
                      <button
                        type="button"
                        onClick={() => { vibrate(); setShowCatMenu(!showCatMenu); }}
                        className={`w-full ${s.inputBg} border ${s.cardBorder} ${s.accentText} px-4 py-4 rounded-2xl flex items-center justify-between active:scale-[0.99] transition-all`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg ${categoryConfig[category]?.bg || 'bg-slate-800'}`}>
                            <CategoryIcon catName={category} size={18} />
                          </div>
                          <span className="text-sm font-medium truncate">{getCategoryLabel(category)}</span>
                        </div>
                        <ChevronDown size={16} className={`${s.subText} transition-transform ${showCatMenu ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <div className="relative flex items-center">
                         <div className="absolute left-4 text-slate-500">
                            <Tag size={18} />
                         </div>
                         <input
                            type="text"
                            value={customCategoryName}
                            onChange={(e) => setCustomCategoryName(e.target.value)}
                            placeholder={t.customCategoryPlaceholder}
                            autoFocus
                            className={`w-full ${s.inputBg} border border-amber-500/50 ${s.text} pl-12 pr-10 py-4 rounded-2xl focus:outline-none transition-all placeholder:text-slate-500`}
                          />
                          <button 
                            type="button"
                            onClick={() => { setIsCustomCategory(false); setCustomCategoryName(''); vibrate(); }}
                            className={`absolute right-3 p-1 ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'} rounded-full ${s.subText} hover:${s.text}`}
                          >
                            <X size={14} />
                          </button>
                      </div>
                    )}

                    {showCatMenu && !isCustomCategory && (
                      <div className={`absolute bottom-full left-0 right-0 mb-2 ${s.cardBg} border ${s.cardBorder} rounded-2xl shadow-xl max-h-60 overflow-y-auto p-2 z-20 no-scrollbar animate-in slide-in-from-bottom-2 fade-in zoom-in-95`}>
                        <div className="grid grid-cols-1 gap-1">
                          {categories.map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => { setCategory(cat); setShowCatMenu(false); vibrate(); }}
                              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${category === cat ? 'bg-amber-900/20 border border-amber-500/30' : `hover:${theme === 'light' ? 'bg-slate-100' : 'bg-slate-800'}`}`}
                            >
                              <div className={`p-1.5 rounded-lg ${categoryConfig[cat].bg}`}>
                                {React.createElement(categoryConfig[cat].icon, { size: 16, className: categoryConfig[cat].color })}
                              </div>
                              <span className={`text-sm ${category === cat ? 'text-amber-500' : s.subText}`}>{getCategoryLabel(cat)}</span>
                            </button>
                          ))}
                          <button
                              type="button"
                              onClick={() => { setIsCustomCategory(true); setShowCatMenu(false); vibrate(); }}
                              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors hover:${theme === 'light' ? 'bg-slate-100' : 'bg-slate-800'} border-t ${s.cardBorder} mt-1`}
                            >
                              <div className={`p-1.5 rounded-lg ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`}>
                                <Plus size={16} className={s.subText} />
                              </div>
                              <span className={`text-sm ${s.text} font-semibold italic`}>{t.otherCategory}</span>
                            </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    aria-label="Add transaction"
                    className="bg-amber-600 hover:bg-amber-500 text-white px-6 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-900/20 active:scale-95 transition-transform"
                    onClick={() => vibrate(30)}
                  >
                    <Plus size={28} />
                  </button>
              </div>
            </form>
          </div>

          {/* LISTA */}
          <div className="space-y-3 pt-2">
            <h3 className={`text-[10px] font-bold ${s.subText} uppercase tracking-widest pl-2 mb-2`}>{t.recentActivity}</h3>
            
            {transactions.map((t) => (
              <div
                key={t.id}
                className={`group ${s.cardBg} p-3.5 rounded-2xl border ${s.cardBorder} flex justify-between items-center active:bg-opacity-80 transition-all ${deletingId === t.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                style={{ transition: 'opacity 500ms ease-out, transform 500ms ease-out' }}
              >
                 <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${getCategoryBg(t.category)}`}>
                       <CategoryIcon catName={t.category} size={20} />
                    </div>
                    <div>
                      <p className={`font-bold ${s.text} text-sm leading-tight`}>{t.description}</p>
                      <p className={`text-[11px] ${s.subText} mt-0.5`}>{getCategoryLabel(t.category)} • {new Date(t.date).toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { day: '2-digit', month: 'short' })}</p>
                    </div>
                 </div>
                 <div className="text-right flex flex-col items-end">
                    <p className={`font-mono font-bold text-sm ${t.type === 'income' ? 'text-emerald-400' : s.text}`}>
                      {t.type === 'expense' ? '-' : '+'}{formatCurrency(t.amount)}
                    </p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(t.id); }} 
                      className="text-rose-500/40 p-1.5 -mr-1.5 hover:text-rose-500 transition-colors"
                      aria-label={`Delete transaction: ${t.description}`}
                    >
                      <Trash2 size={14} />
                    </button>
                 </div>
              </div>
            ))}
            
            {transactions.length === 0 && (
               <div className="py-12 flex flex-col items-center justify-center opacity-30">
                 <Smartphone size={56} className={`mb-4 ${s.subText}`} />
                 <p className={`text-sm font-medium ${s.text}`}>{t.emptyStateTitle}</p>
                 <p className={`text-xs ${s.subText}`}>{t.emptyStateDesc}</p>
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}