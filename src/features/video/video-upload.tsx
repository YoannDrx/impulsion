"use client";

import { CyberButton } from "@/components/impulsion/cyber-button";
import { GlowCard } from "@/components/impulsion/glow-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  Cloud,
  File,
  ImageIcon,
  Loader2,
  Upload,
  Video,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { uploadVideo } from "./video.action";
import { blobToFile, generateVideoThumbnail } from "./video-thumbnail";

type VideoUploadProps = {
  organizationId: string;
  sessionId?: string;
  onSuccess?: (videoId: string) => void;
  onCancel?: () => void;
};

export function VideoUpload({
  organizationId,
  sessionId,
  onSuccess,
  onCancel,
}: VideoUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [thumbnail, setThumbnail] = useState<Blob | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);

  // Generate thumbnail when file is selected
  useEffect(() => {
    if (!file) {
      setThumbnail(null);
      setThumbnailPreview(null);
      setDuration(null);
      return;
    }

    let isCancelled = false;

    const generateThumb = async () => {
      setIsGeneratingThumbnail(true);
      const result = await generateVideoThumbnail(file);

      if (!isCancelled && result) {
        setThumbnail(result.thumbnail);
        setDuration(result.duration);

        // Create preview URL
        const previewUrl = URL.createObjectURL(result.thumbnail);
        setThumbnailPreview(previewUrl);
      }
      setIsGeneratingThumbnail(false);
    };

    void generateThumb();

    return () => {
      isCancelled = true;
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const droppedFile = e.dataTransfer.files[0] as File | undefined;
      if (droppedFile?.type.startsWith("video/")) {
        setFile(droppedFile);
        if (!title) {
          setTitle(droppedFile.name.replace(/\.[^/.]+$/, ""));
        }
      } else {
        toast.error("Veuillez déposer un fichier vidéo");
      }
    },
    [title],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile?.type.startsWith("video/")) {
        setFile(selectedFile);
        if (!title) {
          setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
        }
      } else {
        toast.error("Veuillez sélectionner un fichier vidéo");
      }
    },
    [title],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Veuillez sélectionner une vidéo");
      return;
    }

    setIsUploading(true);
    setProgress(10);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title || file.name);
    formData.append("organizationId", organizationId);
    if (sessionId) {
      formData.append("sessionId", sessionId);
    }

    // Add thumbnail if available
    if (thumbnail) {
      const thumbnailFile = blobToFile(
        thumbnail,
        `thumbnail-${file.name.replace(/\.[^/.]+$/, "")}.jpg`,
      );
      formData.append("thumbnail", thumbnailFile);
    }

    // Add duration if available
    if (duration !== null) {
      formData.append("duration", duration.toString());
    }

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90));
    }, 500);

    const result = await uploadVideo(formData);

    clearInterval(progressInterval);

    if (result.success) {
      setProgress(100);
      toast.success("Vidéo uploadée avec succès !");
      onSuccess?.(result.data.videoId);
    } else {
      toast.error(result.error);
      setProgress(0);
    }

    setIsUploading(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    setThumbnail(null);
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    setThumbnailPreview(null);
    setDuration(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Drop Zone */}
      <GlowCard variant="default" glow={isDragOver ? "cyan" : "none"}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center p-8 transition-colors",
            isDragOver && "bg-secondary/10",
          )}
        >
          {!file ? (
            <>
              <motion.div
                animate={{ y: isDragOver ? -10 : 0 }}
                className="bg-muted mb-4 rounded-full p-4"
              >
                <Cloud className="text-muted-foreground size-8" />
              </motion.div>
              <p className="mb-2 text-lg font-medium">
                Déposez votre vidéo ici
              </p>
              <p className="text-muted-foreground mb-4 text-sm">
                ou cliquez pour parcourir
              </p>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="absolute inset-0 cursor-pointer opacity-0"
                disabled={isUploading}
              />
              <div className="text-muted-foreground flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <Video className="size-3" />
                  MP4, MOV, WebM
                </span>
                <span className="flex items-center gap-1">
                  <Upload className="size-3" />
                  Max 500 Mo
                </span>
              </div>
            </>
          ) : (
            <div className="w-full">
              <div className="flex items-start gap-4">
                {/* Thumbnail Preview */}
                <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-black">
                  {isGeneratingThumbnail ? (
                    <div className="flex size-full items-center justify-center">
                      <Loader2 className="text-muted-foreground size-6 animate-spin" />
                    </div>
                  ) : thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="Aperçu"
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center">
                      <ImageIcon className="text-muted-foreground size-6" />
                    </div>
                  )}
                  {duration !== null && (
                    <div className="absolute right-1 bottom-1 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
                      {formatDuration(duration)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{file.name}</p>
                      <div className="text-muted-foreground mt-1 flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1">
                          <File className="size-3" />
                          {formatFileSize(file.size)}
                        </span>
                        {duration !== null && (
                          <span className="flex items-center gap-1">
                            <Video className="size-3" />
                            {formatDuration(duration)}
                          </span>
                        )}
                      </div>
                    </div>
                    {!isUploading && (
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-muted-foreground hover:text-destructive shrink-0 transition-colors"
                      >
                        <X className="size-5" />
                      </button>
                    )}
                  </div>

                  {isUploading && (
                    <div className="mt-3 space-y-2">
                      <Progress value={progress} className="h-2" />
                      <p className="text-muted-foreground text-sm">
                        Upload en cours... {progress}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </GlowCard>

      {/* Title Input */}
      {file && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlowCard variant="default" glow="none">
            <div className="space-y-4 p-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la vidéo</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Technique de foulée - Séance du 15/12"
                  disabled={isUploading}
                />
              </div>
            </div>
          </GlowCard>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        {onCancel && (
          <CyberButton
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isUploading}
          >
            Annuler
          </CyberButton>
        )}
        <CyberButton
          type="submit"
          variant="neon"
          className="flex-1"
          disabled={!file || isUploading || isGeneratingThumbnail}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Upload en cours...
            </>
          ) : isGeneratingThumbnail ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Préparation...
            </>
          ) : (
            <>
              <Upload className="mr-2 size-4" />
              Uploader la vidéo
            </>
          )}
        </CyberButton>
      </div>
    </form>
  );
}
