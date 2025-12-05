import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Trash2, TrendingUp, TrendingDown, DollarSign, Activity, 
  Settings, Download, Upload, X, Smartphone, ShieldCheck,
  Coffee, Car, Zap, Film, Heart, BookOpen, Briefcase, 
  Home, RefreshCw, ShoppingBag, Gift, FileText, ChevronDown,
  PawPrint, Plane, Shirt, PiggyBank, CreditCard, Scissors, Wrench, Tag
} from 'lucide-react';

export default function FinanceManager() {
  // --- ESTADOS Y REF ---
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); 
  const [category, setCategory] = useState('General');

  // Estados para categoría personalizada
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');

  const [showSettings, setShowSettings] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false); 
  const fileInputRef = useRef(null);

  // --- CONFIGURACIÓN DE CATEGORÍAS (ICONOS Y COLORES) ---
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

  // --- EFECTOS DE INICIALIZACIÓN ---
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedData = localStorage.getItem('finance_data_v1');
      if (savedData) {
        try {
          setTransactions(JSON.parse(savedData));
        } catch (e) {
          console.error("Data corruption detected", e);
        }
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // --- PERSISTENCIA ---
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('finance_data_v1', JSON.stringify(transactions));
    }
  }, [transactions, loading]);

  // --- UTILIDADES NATIVAS ---
  const vibrate = (ms = 10) => {
    if (navigator.vibrate) navigator.vibrate(ms);
  };

  // --- LÓGICA DE NEGOCIO ---
  const handleAddTransaction = (e) => {
    e.preventDefault();

    // Determinar categoría final
    let finalCategory = category;
    if (isCustomCategory) {
      if (!customCategoryName.trim()) return; // Validar que no esté vacía
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

    // Reset fields
    setDescription('');
    setAmount('');

    // Si era custom, reseteamos a General para el siguiente o mantenemos si prefieres
    // Aquí reseteo a modo normal para flujo rápido
    if (isCustomCategory) {
      setCustomCategoryName('');
      setIsCustomCategory(false);
      setCategory('General');
    }
    setShowCatMenu(false);
  };

  const handleDelete = (id) => {
    vibrate(50);
    if(window.confirm("¿Eliminar registro permanentemente?")) {
      setTransactions(transactions.filter(t => t.id !== id));
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
          if(window.confirm(`⚠️ RESTAURAR COPIA DE SEGURIDAD\n\nSe sobrescribirán los datos actuales.\n¿Continuar?`)) {
            setTransactions(importedData);
            setShowSettings(false);
            alert("Base de datos restaurada.");
          }
        }
      } catch (error) {
        alert("Error al leer el archivo.");
      }
    };
    reader.readAsText(file);
    event.target.value = null; 
  };

  // --- KPIS ---
  const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - expense;

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(num);
  };

  // --- RENDERIZADO: SPLASH SCREEN ---
  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50">
        <Activity className="text-amber-600 w-16 h-16 animate-pulse mb-4" />
        <h1 className="text-2xl font-bold text-white tracking-widest">LESTER</h1>
        <p className="text-amber-600 text-xs tracking-[0.3em] mt-1">ENGINEERING</p>
        <div className="mt-8 w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-amber-600 animate-[loading_1s_ease-in-out_infinite]"></div>
        </div>
      </div>
    );
  }

  // Componente auxiliar para icono de categoría
  // Modificado para soportar categorías personalizadas (fallback a icono Tag)
  const CategoryIcon = ({ catName, size = 18 }) => {
    const config = categoryConfig[catName] || { icon: Tag, color: 'text-slate-400', bg: 'bg-slate-800' };
    const Icon = config.icon;
    return <Icon size={size} className={config.color} />;
  };

  // helper para bg de categorías desconocidas en la lista
  const getCategoryBg = (catName) => {
    return categoryConfig[catName]?.bg || 'bg-slate-800';
  };

  // --- APP PRINCIPAL ---
  return (
    <div className="fixed inset-0 bg-slate-950 text-slate-200 font-sans overflow-hidden flex flex-col select-none touch-manipulation">
      <style>{`
        body { overscroll-behavior: none; -webkit-tap-highlight-color: transparent; }
        @keyframes loading { 0% { width: 0% } 50% { width: 100% } 100% { width: 0%; margin-left: 100% } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* HEADER */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 pt-safe-top pb-3 px-4 shadow-lg shrink-0 z-20">
        <div className="flex items-center justify-between max-w-lg mx-auto pt-2">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500/10 p-1.5 rounded-lg">
              <Activity className="text-amber-500 w-5 h-5" />
            </div>
            <h1 className="text-lg font-bold tracking-wide text-slate-100">CASH<span className="text-amber-500">FLOW</span></h1>
          </div>
          <button 
            onClick={() => { vibrate(); setShowSettings(!showSettings); }}
            className={`p-2 rounded-full transition-all active:scale-90 ${showSettings ? 'bg-amber-900/40 text-amber-400' : 'text-slate-400 hover:text-white'}`}
          >
            {showSettings ? <X size={22} /> : <Settings size={22} />}
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative w-full max-w-lg mx-auto bg-slate-950">

        {/* SETTINGS OVERLAY */}
        {showSettings && (
          <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 p-4 animate-in slide-in-from-top-5 shadow-2xl">
            <div className="grid grid-cols-2 gap-3">
              <button onClick={handleExportData} className="flex flex-col items-center p-4 bg-slate-800 rounded-xl active:bg-slate-700 transition-colors border border-slate-700 group">
                <Download className="text-emerald-500 mb-2 group-active:scale-90 transition-transform" />
                <span className="text-xs font-bold text-slate-300">RESPALDAR</span>
              </button>
              <button onClick={() => fileInputRef.current.click()} className="flex flex-col items-center p-4 bg-slate-800 rounded-xl active:bg-slate-700 transition-colors border border-slate-700 group">
                <Upload className="text-amber-500 mb-2 group-active:scale-90 transition-transform" />
                <span className="text-xs font-bold text-slate-300">RESTAURAR</span>
              </button>
              <input type="file" ref={fileInputRef} onChange={handleImportData} accept=".json" className="hidden" />
            </div>
          </div>
        )}

        <div className="p-4 space-y-6 pb-28">

          {/* BALANCE CARD */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-[2rem] border border-slate-700/50 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 rotate-12 group-hover:opacity-10 transition-opacity duration-700">
              <ShieldCheck size={140} />
            </div>

            <div className="flex flex-col items-center justify-center mb-6 z-10 relative">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Balance Disponible</p>
              <h2 className={`text-5xl font-black tracking-tighter ${balance >= 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400' : 'text-rose-400'}`}>
                {formatCurrency(balance)}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
               <div className="bg-slate-950/50 p-3 rounded-2xl border border-white/5 backdrop-blur-sm">
                 <div className="flex items-center gap-2 mb-1">
                    <div className="p-1 rounded-full bg-emerald-500/10">
                      <TrendingUp size={12} className="text-emerald-400" />
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Ingresos</p>
                 </div>
                 <p className="text-emerald-400 font-bold text-lg">{formatCurrency(income)}</p>
               </div>
               <div className="bg-slate-950/50 p-3 rounded-2xl border border-white/5 backdrop-blur-sm">
                 <div className="flex items-center gap-2 mb-1">
                    <div className="p-1 rounded-full bg-rose-500/10">
                      <TrendingDown size={12} className="text-rose-400" />
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Gastos</p>
                 </div>
                 <p className="text-rose-400 font-bold text-lg">{formatCurrency(expense)}</p>
               </div>
            </div>
          </div>

          {/* FORMULARIO DE CAPTURA INTELIGENTE */}
          <div className="bg-slate-900/50 p-4 rounded-3xl border border-slate-800">
            {/* Toggle Tipo */}
            <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-4">
                <button
                  onClick={() => { vibrate(); setType('expense'); }}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
                    type === 'expense' ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/20' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Egreso
                </button>
                <button
                  onClick={() => { vibrate(); setType('income'); }}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
                    type === 'income' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Ingreso
                </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-3">
              <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Concepto (ej. Gasolina)"
                      className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-4 rounded-2xl focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 focus:outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="w-[35%]">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="$0"
                      className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-4 rounded-2xl focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 focus:outline-none transition-all placeholder:text-slate-600 text-center font-mono"
                    />
                  </div>
              </div>

              <div className="flex gap-3">
                  {/* Selector Dinámico: Categoría o Input Manual */}
                  <div className="relative flex-1">

                    {!isCustomCategory ? (
                      <button
                        type="button"
                        onClick={() => { vibrate(); setShowCatMenu(!showCatMenu); }}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-300 px-4 py-4 rounded-2xl flex items-center justify-between active:bg-slate-900 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg ${categoryConfig[category].bg}`}>
                            <CategoryIcon catName={category} size={18} />
                          </div>
                          <span className="text-sm font-medium truncate">{category}</span>
                        </div>
                        <ChevronDown size={16} className={`text-slate-500 transition-transform ${showCatMenu ? 'rotate-180' : ''}`} />
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
                            placeholder="Nombre categoría..."
                            autoFocus
                            className="w-full bg-slate-950 border border-amber-500/50 text-white pl-12 pr-10 py-4 rounded-2xl focus:outline-none transition-all placeholder:text-slate-600"
                          />
                          <button 
                            type="button"
                            onClick={() => { setIsCustomCategory(false); setCustomCategoryName(''); vibrate(); }}
                            className="absolute right-3 p-1 bg-slate-800 rounded-full text-slate-400 hover:text-white"
                          >
                            <X size={14} />
                          </button>
                      </div>
                    )}

                    {/* Menú Dropdown Personalizado */}
                    {showCatMenu && !isCustomCategory && (
                      <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-xl max-h-60 overflow-y-auto p-2 z-20 no-scrollbar animate-in slide-in-from-bottom-2 fade-in zoom-in-95">
                        <div className="grid grid-cols-1 gap-1">
                          {categories.map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => { setCategory(cat); setShowCatMenu(false); vibrate(); }}
                              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${category === cat ? 'bg-amber-900/20 border border-amber-500/30' : 'hover:bg-slate-800'}`}
                            >
                              <div className={`p-1.5 rounded-lg ${categoryConfig[cat].bg}`}>
                                {React.createElement(categoryConfig[cat].icon, { size: 16, className: categoryConfig[cat].color })}
                              </div>
                              <span className={`text-sm ${category === cat ? 'text-amber-100' : 'text-slate-400'}`}>{cat}</span>
                            </button>
                          ))}
                          {/* Opción Manual */}
                          <button
                              type="button"
                              onClick={() => { setIsCustomCategory(true); setShowCatMenu(false); vibrate(); }}
                              className="flex items-center gap-3 w-full p-3 rounded-xl transition-colors hover:bg-slate-800 border-t border-slate-800 mt-1"
                            >
                              <div className="p-1.5 rounded-lg bg-slate-800">
                                <Plus size={16} className="text-slate-400" />
                              </div>
                              <span className="text-sm text-slate-300 font-semibold italic">+ Otra Categoría</span>
                            </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-500 text-white px-6 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-900/20 active:scale-95 transition-transform"
                    onClick={() => vibrate(30)}
                  >
                    <Plus size={28} />
                  </button>
              </div>
            </form>
          </div>

          {/* LISTA DE MOVIMIENTOS */}
          <div className="space-y-3 pt-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2 mb-2">Actividad Reciente</h3>

            {transactions.map((t) => (
              <div key={t.id} className="group bg-slate-900 p-3.5 rounded-2xl border border-slate-800 flex justify-between items-center active:bg-slate-800 active:border-slate-700 transition-all">
                 <div className="flex items-center gap-3.5">
                    {/* Icono de Categoría */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${getCategoryBg(t.category)}`}>
                       <CategoryIcon catName={t.category} size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-200 text-sm leading-tight">{t.description}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{t.category} • {new Date(t.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}</p>
                    </div>
                 </div>
                 <div className="text-right flex flex-col items-end">
                    <p className={`font-mono font-bold text-sm ${t.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {t.type === 'expense' ? '-' : '+'}{formatCurrency(t.amount)}
                    </p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(t.id); }} 
                      className="text-rose-500/40 p-1.5 -mr-1.5 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                 </div>
              </div>
            ))}

            {transactions.length === 0 && (
               <div className="py-12 flex flex-col items-center justify-center opacity-30">
                 <Smartphone size={56} className="mb-4 text-slate-600" />
                 <p className="text-sm font-medium">Todo listo para empezar</p>
                 <p className="text-xs">Registra tu primer movimiento</p>
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
