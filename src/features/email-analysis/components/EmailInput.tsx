import { useRef, useState, useCallback } from 'react';
import { Upload, FileText, X, Loader2, Send } from 'lucide-react';
import { EXAMPLE_EMAILS } from '../domain/email.constants';

interface EmailInputProps {
  onSubmit: (payload: { text?: string; file?: File }) => void;
  loading: boolean;
}

export function EmailInput({ onSubmit, loading }: EmailInputProps) {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.type === 'text/plain' || f.type === 'application/pdf')) {
      setFile(f);
      if (f.type === 'text/plain') {
        f.text().then(setText);
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      if (f.type === 'text/plain') {
        f.text().then(setText);
      }
    }
  };

  const handleClear = () => {
    setText('');
    setFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const canSubmit = (text.trim().length > 0 || file) && !loading;

  return (
    <div className="space-y-4">
      <div className="card-surface overflow-hidden">
        <div className="px-5 py-3 border-b border-border/50 flex items-center justify-between bg-secondary/50">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Entrada de Dados
          </h2>
          {(text || file) && (
            <button onClick={handleClear} className="section-label hover:text-primary transition-colors">
              Limpar
            </button>
          )}
        </div>

        <div className="p-5 space-y-4">
          <div
            className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".txt,.pdf"
              className="hidden"
              onChange={handleFileSelect}
            />
            {file ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); if (fileRef.current) fileRef.current.value = ''; }}
                  className="ml-auto p-1 rounded-md hover:bg-secondary transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="w-7 h-7 text-muted-foreground/40 mb-2" />
                <p className="text-sm text-muted-foreground font-medium">Arraste o arquivo ou clique para upload</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Suporta .txt, .pdf (Máx 5MB)</p>
              </>
            )}
          </div>

          <div className="relative">
            <div className="absolute left-5 top-3.5 section-label pointer-events-none">Email Content</div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Cole o conteúdo do email aqui para análise..."
              className="input-textarea h-56 w-full"
            />
          </div>

          <button
            onClick={() => onSubmit({ text: text || undefined, file: file || undefined })}
            disabled={!canSubmit}
            className="btn-primary w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Classificando e gerando resposta...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Processar Email</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap items-start">
        {EXAMPLE_EMAILS.map((ex) => (
          <div key={ex.label} className="flex flex-col items-center gap-1.5">
            <button
              onClick={() => setText(ex.text)}
              className="chip-button text-[10px] py-1 px-2.5 h-auto transition-all hover:scale-[1.02]"
            >
              + {ex.label}
            </button>
            {ex.label === 'Enviar Comprovante' && (
              <a 
                href="/comprovante-modelo.pdf" 
                download 
                className="text-[9px] font-bold text-primary/40 hover:text-primary underline uppercase tracking-widest transition-all px-1"
                title="Baixar modelo para teste"
              >
                (Modelo PDF)
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
