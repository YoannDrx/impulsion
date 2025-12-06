"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/impulsion/glow-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Loader2,
  MessageSquare,
  Search,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { addVideoMarker, deleteMarker } from "./video.action";
import type { VideoMarkerData } from "./video.types";

type VideoMarkersPanelProps = {
  videoId: string;
  markers: VideoMarkerData[];
  currentTime: number;
  currentUserId?: string;
  onMarkerClick?: (timestamp: number) => void;
  onMarkersChange?: () => void;
};

export function VideoMarkersPanel({
  videoId,
  markers,
  currentTime,
  currentUserId,
  onMarkerClick,
  onMarkersChange,
}: VideoMarkersPanelProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [expandedMarkers, setExpandedMarkers] = useState<Set<string>>(
    new Set(),
  );
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");

  const formatTimestamp = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAddMarker = () => {
    if (!newComment.trim()) {
      toast.error("Veuillez entrer un commentaire");
      return;
    }

    startTransition(async () => {
      const result = await addVideoMarker({
        videoId,
        timestamp: currentTime,
        content: newComment.trim(),
      });

      if (result.success) {
        toast.success("Commentaire ajouté");
        setNewComment("");
        setIsAdding(false);
        onMarkersChange?.();
      } else {
        toast.error(result.error);
      }
    });
  };

  const handleAddReply = (parentId: string) => {
    if (!replyContent.trim()) {
      toast.error("Veuillez entrer une réponse");
      return;
    }

    const parentMarker = markers.find((m) => m.id === parentId);
    if (!parentMarker) return;

    startTransition(async () => {
      const result = await addVideoMarker({
        videoId,
        timestamp: parentMarker.timestamp,
        content: replyContent.trim(),
        parentId,
      });

      if (result.success) {
        toast.success("Réponse ajoutée");
        setReplyContent("");
        setReplyingTo(null);
        onMarkersChange?.();
      } else {
        toast.error(result.error);
      }
    });
  };

  const handleDeleteMarker = (markerId: string) => {
    startTransition(async () => {
      const result = await deleteMarker(markerId);

      if (result.success) {
        toast.success("Commentaire supprimé");
        onMarkersChange?.();
      } else {
        toast.error(result.error);
      }
    });
  };

  const toggleExpanded = (markerId: string) => {
    setExpandedMarkers((prev) => {
      const next = new Set(prev);
      if (next.has(markerId)) {
        next.delete(markerId);
      } else {
        next.add(markerId);
      }
      return next;
    });
  };

  // Filter and sort markers
  const filteredAndSortedMarkers = useMemo(() => {
    let result = [...markers];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((marker) => {
        // Check marker content
        if (marker.content.toLowerCase().includes(query)) return true;
        // Check author name
        if (marker.author.name.toLowerCase().includes(query)) return true;
        // Check replies
        if (
          marker.replies.some(
            (reply) =>
              reply.content.toLowerCase().includes(query) ||
              reply.author.name.toLowerCase().includes(query),
          )
        )
          return true;
        return false;
      });
    }

    // Sort by timestamp
    return result.sort((a, b) => a.timestamp - b.timestamp);
  }, [markers, searchQuery]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-muted-foreground size-5" />
            <h3 className="font-semibold">Commentaires ({markers.length})</h3>
          </div>
          <Button
            size="sm"
            variant={isAdding ? "secondary" : "default"}
            onClick={() => setIsAdding(!isAdding)}
          >
            {isAdding ? "Annuler" : "+ Ajouter"}
          </Button>
        </div>

        {/* Search Input */}
        {markers.length > 0 && (
          <div className="relative mt-3">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              placeholder="Rechercher dans les commentaires..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-9 pl-9"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        )}

        {/* Add Marker Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <GlowCard variant="default" glow="lime" size="sm">
                <div className="space-y-3 p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="text-primary size-4" />
                    <span className="font-medium">
                      {formatTimestamp(currentTime)}
                    </span>
                    <span className="text-muted-foreground">
                      - Position actuelle
                    </span>
                  </div>
                  <Textarea
                    placeholder="Votre commentaire sur ce moment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={2}
                    autoFocus
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      onClick={handleAddMarker}
                      disabled={isPending || !newComment.trim()}
                    >
                      {isPending ? (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 size-4" />
                      )}
                      Envoyer
                    </Button>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Markers List */}
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {filteredAndSortedMarkers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            {searchQuery ? (
              <>
                <Search className="text-muted-foreground mb-4 size-12" />
                <p className="text-muted-foreground">Aucun résultat</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Aucun commentaire ne correspond à &quot;{searchQuery}&quot;
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3"
                  onClick={() => setSearchQuery("")}
                >
                  Effacer la recherche
                </Button>
              </>
            ) : (
              <>
                <MessageSquare className="text-muted-foreground mb-4 size-12" />
                <p className="text-muted-foreground">Aucun commentaire</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Cliquez sur &quot;+ Ajouter&quot; pour commenter un moment de
                  la vidéo
                </p>
              </>
            )}
          </div>
        ) : (
          filteredAndSortedMarkers.map((marker) => {
            const isExpanded = expandedMarkers.has(marker.id);
            const hasReplies = marker.replies.length > 0;

            return (
              <motion.div
                key={marker.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "rounded-lg border p-3 transition-colors",
                  Math.abs(currentTime - marker.timestamp) < 2 &&
                    "border-primary bg-primary/5",
                )}
              >
                {/* Marker Header */}
                <div className="flex items-start justify-between">
                  <button
                    type="button"
                    onClick={() => onMarkerClick?.(marker.timestamp)}
                    className="bg-primary/10 text-primary hover:bg-primary/20 rounded px-2 py-0.5 text-sm font-medium transition-colors"
                  >
                    {formatTimestamp(marker.timestamp)}
                  </button>
                  {marker.author.id === currentUserId && (
                    <button
                      type="button"
                      onClick={() => handleDeleteMarker(marker.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      disabled={isPending}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>

                {/* Author & Content */}
                <div className="mt-2 flex gap-3">
                  <Avatar className="size-8">
                    {marker.author.image && (
                      <AvatarImage
                        src={marker.author.image}
                        alt={marker.author.name}
                      />
                    )}
                    <AvatarFallback>
                      {marker.author.name.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {marker.author.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {formatDistanceToNow(marker.createdAt, {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{marker.content}</p>
                  </div>
                </div>

                {/* Replies Section */}
                {(hasReplies || replyingTo === marker.id) && (
                  <div className="mt-3 border-t pt-3">
                    {hasReplies && (
                      <button
                        type="button"
                        onClick={() => toggleExpanded(marker.id)}
                        className="text-muted-foreground hover:text-foreground mb-2 flex items-center gap-1 text-sm transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                        {marker.replies.length} réponse
                        {marker.replies.length > 1 ? "s" : ""}
                      </button>
                    )}

                    <AnimatePresence>
                      {isExpanded &&
                        marker.replies.map((reply) => (
                          <motion.div
                            key={reply.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-2 ml-4 flex gap-2"
                          >
                            <Avatar className="size-6">
                              {reply.author.image && (
                                <AvatarImage
                                  src={reply.author.image}
                                  alt={reply.author.name}
                                />
                              )}
                              <AvatarFallback className="text-xs">
                                {reply.author.name.slice(0, 1).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium">
                                  {reply.author.name}
                                </span>
                                <span className="text-muted-foreground text-xs">
                                  {formatDistanceToNow(reply.createdAt, {
                                    addSuffix: true,
                                    locale: fr,
                                  })}
                                </span>
                              </div>
                              <p className="text-sm">{reply.content}</p>
                            </div>
                          </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Reply Form */}
                    {replyingTo === marker.id ? (
                      <div className="mt-2 ml-4 space-y-2">
                        <Textarea
                          placeholder="Votre réponse..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          rows={2}
                          autoFocus
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyContent("");
                            }}
                          >
                            Annuler
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAddReply(marker.id)}
                            disabled={isPending || !replyContent.trim()}
                          >
                            {isPending ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              "Répondre"
                            )}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setReplyingTo(marker.id)}
                        className="text-muted-foreground hover:text-foreground ml-4 text-sm transition-colors"
                      >
                        Répondre
                      </button>
                    )}
                  </div>
                )}

                {/* Reply Button (when no replies yet) */}
                {!hasReplies && replyingTo !== marker.id && (
                  <button
                    type="button"
                    onClick={() => setReplyingTo(marker.id)}
                    className="text-muted-foreground hover:text-foreground mt-2 text-sm transition-colors"
                  >
                    Répondre
                  </button>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
