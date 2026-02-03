
import React from 'react';
import { GeneratedImage } from '../types';
import { TOOLS } from '../constants';
import { Download, Trash2, Calendar, LayoutGrid } from 'lucide-react';

interface GalleryViewProps {
  images: GeneratedImage[];
  isDarkMode: boolean;
}

const GalleryView: React.FC<GalleryViewProps> = ({ images, isDarkMode }) => {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] p-12 text-center">
        <div className={`w-28 h-28 rounded-[2rem] flex items-center justify-center mb-8 border shadow-2xl transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
          <LayoutGrid size={56} className={isDarkMode ? 'text-slate-700' : 'text-slate-200'} />
        </div>
        <h2 className={`text-4xl font-black italic uppercase tracking-tighter mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Your Gallery is empty</h2>
        <p className={`text-lg font-medium italic max-w-md ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Start creating with our industrial tools to see your masterpieces saved here for later access.</p>
      </div>
    );
  }

  return (
    <div className="p-12 animate-in fade-in duration-500">
      <div className="mb-14 flex justify-between items-end">
        <div>
          <h1 className={`text-5xl font-black italic uppercase tracking-tighter mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Master Gallery</h1>
          <p className={`text-lg font-medium italic ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>View and manage your creative history.</p>
        </div>
        <div className="text-right">
          <span className={`text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full border shadow-xl ${isDarkMode ? 'text-slate-500 bg-slate-900 border-slate-800' : 'text-slate-400 bg-white border-slate-100'}`}>
            {images.length} Creations Cataloged
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {images.map((img) => {
          const toolInfo = TOOLS.find(t => t.id === img.tool);
          return (
            <div key={img.id} className={`group rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 border ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50' : 'bg-white border-slate-100 hover:border-indigo-500'}`}>
              <div className="aspect-square relative overflow-hidden bg-slate-950">
                <img src={img.url} alt={img.prompt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end ${isDarkMode ? 'from-slate-950' : 'from-black/60'}`}>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = img.url;
                        link.download = `artisan-${img.id}.png`;
                        link.click();
                      }}
                      className="flex-1 bg-white text-black py-4 rounded-2xl text-xs font-black uppercase italic tracking-tighter flex items-center justify-center space-x-2 hover:bg-slate-200 transition-colors shadow-xl"
                    >
                      <Download size={16} />
                      <span>Download HD</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-gradient-to-br ${toolInfo?.gradient || 'from-slate-600 to-slate-700'} text-white shadow-lg`}>
                    {toolInfo?.name || 'Creation'}
                  </span>
                  <div className={`flex items-center text-[10px] font-bold space-x-2 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    <Calendar size={12} />
                    <span>{new Date(img.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className={`text-sm font-medium italic line-clamp-2 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>"{img.prompt}"</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default GalleryView;
