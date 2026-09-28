import React, { useState } from 'react';
import {
  Printer,
  FileCode,
  Image as ImageIcon,
  Share2,
  Check,
  Download,
  Copy,
  Sparkles,
} from 'lucide-react';
import { ComicStory } from '../types/comic';
import confetti from 'canvas-confetti';
import { comicSound } from '../utils/comicSound';

interface ExportModalProps {
  comic: ComicStory;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  comic,
  isOpen,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);

  if (!isOpen) return null;

  // Print as PDF
  const handlePrintPDF = () => {
    comicSound.playPop();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
    window.print();
  };

  // Download JSON Digital Comic Format
  const handleDownloadJSON = () => {
    comicSound.playFanfare();
    confetti({
      particleCount: 50,
      spread: 60,
    });

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(comic, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `${comic.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-issue-${comic.issueNumber || 1}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export Canvas Snapshot as PNG
  const handleExportPNG = async () => {
    comicSound.playPunch();
    setIsExportingImage(true);

    try {
      // Create high-res canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = 1200;
      const panelHeight = 240;
      const rows = Math.ceil(comic.panels.length / 2);
      const height = 180 + rows * (panelHeight + 40);

      canvas.width = width;
      canvas.height = height;

      // Background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Border
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 8;
      ctx.strokeRect(10, 10, width - 20, height - 20);

      // Comic Title Header
      ctx.fillStyle = '#FFDD00';
      ctx.fillRect(14, 14, width - 28, 120);

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.strokeRect(14, 14, width - 28, 120);

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText(comic.title.toUpperCase(), 35, 75);

      ctx.font = 'bold 18px sans-serif';
      ctx.fillStyle = '#DC2626';
      ctx.fillText(
        `ISSUE #${comic.issueNumber || 1} • ${comic.genre.toUpperCase()} • ART STYLE: ${comic.artStyle.toUpperCase()}`,
        35,
        110
      );

      // Draw Panels
      comic.panels.forEach((p, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);

        const x = 35 + col * 560;
        const y = 160 + row * (panelHeight + 40);
        const pWidth = 530;

        // Panel Box
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(x, y, pWidth, panelHeight);

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, pWidth, panelHeight);

        // Panel Number Badge
        ctx.fillStyle = '#FFDD00';
        ctx.fillRect(x + 10, y + 10, 100, 26);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 10, y + 10, 100, 26);

        ctx.fillStyle = '#000';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(`PANEL #${p.panel_number}`, x + 16, y + 28);

        // Sound Effect
        if (p.sound_effect) {
          ctx.fillStyle = '#EF4444';
          ctx.font = 'bold 22px sans-serif';
          ctx.fillText(p.sound_effect, x + pWidth - 120, y + 35);
        }

        // Action text
        ctx.fillStyle = '#E2E8F0';
        ctx.font = '13px sans-serif';
        ctx.fillText(`Action: ${p.action.slice(0, 55)}...`, x + 15, y + 70);

        // Narration text
        if (p.narration) {
          ctx.fillStyle = '#FEF08A';
          ctx.fillRect(x + 10, y + 90, pWidth - 20, 28);
          ctx.fillStyle = '#000';
          ctx.font = 'italic 12px sans-serif';
          ctx.fillText(p.narration.slice(0, 65), x + 18, y + 108);
        }

        // Dialogue
        if (p.dialogue[0]) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(x + 10, y + 135, pWidth - 20, 48);
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.strokeRect(x + 10, y + 135, pWidth - 20, 48);

          ctx.fillStyle = '#000';
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText(`${p.dialogue[0].character}: "${p.dialogue[0].text.slice(0, 50)}"`, x + 18, y + 162);
        }
      });

      // Export canvas as image download
      const imgURL = canvas.toDataURL('image/png');
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', imgURL);
      downloadAnchor.setAttribute(
        'download',
        `${comic.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-comic-strip.png`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      confetti({
        particleCount: 50,
        spread: 60,
      });
    } catch {
      alert('PNG download failed.');
    } finally {
      setIsExportingImage(false);
    }
  };

  // Share Web Link
  const handleShare = () => {
    comicSound.playPop();
    if (navigator.share) {
      navigator.share({
        title: comic.title,
        text: `Check out my comic story "${comic.title}" made with ComicCraft AI!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="comic-box-lg bg-slate-900 border-4 border-black rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[10px_10px_0px_#000] text-slate-100">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Download className="w-6 h-6 text-yellow-400" />
            <h3 className="font-bangers text-2xl sm:text-3xl text-yellow-400 tracking-wide uppercase">
              Export Comic Book
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-300 font-comic mb-6">
          Choose your desired format for printing, sharing, or digital archiving:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Option 1: PDF */}
          <div
            onClick={handlePrintPDF}
            className="comic-box bg-slate-950 hover:bg-slate-800 p-4 rounded-xl cursor-pointer border-2 border-slate-700 hover:border-yellow-400 transition-all group"
          >
            <Printer className="w-7 h-7 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bangers text-lg text-white">Print / Save PDF</h4>
            <p className="text-[11px] text-slate-400 font-comic">
              Formatted multi-page spread ready for classroom or physical print.
            </p>
          </div>

          {/* Option 2: PNG Image */}
          <div
            onClick={handleExportPNG}
            className="comic-box bg-slate-950 hover:bg-slate-800 p-4 rounded-xl cursor-pointer border-2 border-slate-700 hover:border-cyan-400 transition-all group"
          >
            <ImageIcon className="w-7 h-7 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bangers text-lg text-white">
              {isExportingImage ? 'Generating PNG...' : 'High-Res PNG'}
            </h4>
            <p className="text-[11px] text-slate-400 font-comic">
              Snapshot image with panels, sound bursts, and titles.
            </p>
          </div>

          {/* Option 3: Digital JSON */}
          <div
            onClick={handleDownloadJSON}
            className="comic-box bg-slate-950 hover:bg-slate-800 p-4 rounded-xl cursor-pointer border-2 border-slate-700 hover:border-emerald-400 transition-all group"
          >
            <FileCode className="w-7 h-7 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bangers text-lg text-white">Digital Comic JSON</h4>
            <p className="text-[11px] text-slate-400 font-comic">
              Full structured story data, characters, dialogues, and prompts.
            </p>
          </div>

          {/* Option 4: Share Link */}
          <div
            onClick={handleShare}
            className="comic-box bg-slate-950 hover:bg-slate-800 p-4 rounded-xl cursor-pointer border-2 border-slate-700 hover:border-purple-400 transition-all group"
          >
            <Share2 className="w-7 h-7 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bangers text-lg text-white">
              {copiedLink ? 'Link Copied!' : 'Share Web Link'}
            </h4>
            <p className="text-[11px] text-slate-400 font-comic">
              Share your comic URL directly with peers and friends.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
