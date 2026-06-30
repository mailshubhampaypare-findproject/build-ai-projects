import { useState, useRef } from "react";
import { Upload, X, File, Image as ImageIcon, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MediaUploadProps {
  label: string;
  bucket?: string;
  path?: string;
  accept?: string;
  multiple?: boolean;
  onUploadComplete?: (url: string | string[]) => void;
  maxSize?: number; // in MB
}

export function MediaUpload({
  label,
  bucket = "project-assets",
  path = "uploads",
  accept = "image/*",
  multiple = false,
  onUploadComplete,
  maxSize = 10
}: MediaUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploads, setUploads] = useState<{ id: string; name: string; size: number; progress: number; status: 'uploading' | 'complete' | 'error', url?: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    const addedUploads = newFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading' as const
    }));

    setUploads(prev => [...prev, ...addedUploads]);

    const urls: string[] = [];

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      const uploadId = addedUploads[i].id;

      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${path}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            onUploadProgress: (event) => {
              const progress = (event.loaded / event.total) * 100;
              setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, progress } : u));
            }
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, status: 'complete', url: publicUrl } : u));
        urls.push(publicUrl);
        toast.success(`Uploaded ${file.name}`);
      } catch (error: any) {
        setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, status: 'error' } : u));
        toast.error(`Failed to upload ${file.name}: ${error.message}`);
      }
    }

    if (onUploadComplete && urls.length > 0) {
      onUploadComplete(multiple ? urls : urls[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors",
          isDragging ? "border-brand bg-brand/5" : "border-muted-foreground/20 hover:border-brand/50 hover:bg-muted/30"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => handleFiles(e.target.files)}
          accept={accept}
          multiple={multiple}
        />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Upload className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm font-medium">{label}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Drag and drop or <button type="button" onClick={() => fileInputRef.current?.click()} className="text-brand hover:underline">browse files</button>
          </p>
          <p className="mt-2 text-[10px] text-muted-foreground">
            Maximum file size: {maxSize}MB
          </p>
        </div>
      </div>

      {uploads.length > 0 && (
        <div className="space-y-2">
          {uploads.map((upload) => (
            <div key={upload.id} className="flex flex-col gap-2 rounded-lg border bg-card p-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                    {upload.name.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                      upload.url ? <img src={upload.url} className="h-full w-full object-cover rounded-md" /> : <ImageIcon className="h-4 w-4" />
                    ) : <File className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{upload.name}</p>
                    <p className="text-[10px] text-muted-foreground">{(upload.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {upload.status === 'uploading' && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                  {upload.status === 'complete' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                  {upload.status === 'error' && <AlertCircle className="h-4 w-4 text-destructive" />}
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setUploads(prev => prev.filter(u => u.id !== upload.id))}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              {upload.status === 'uploading' && <Progress value={upload.progress} className="h-1" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
