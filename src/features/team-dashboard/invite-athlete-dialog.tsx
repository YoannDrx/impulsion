"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CyberButton } from "@/components/impulsion/cyber-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Loader2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type InviteAthleteDialogProps = {
  trigger?: React.ReactNode;
};

export function InviteAthleteDialog({ trigger }: InviteAthleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { data: activeOrg } = authClient.useActiveOrganization();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const result = await authClient.organization.inviteMember({
        email,
        role: "member", // Athletes are members
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result;
    },
    onSuccess: () => {
      toast.success("Invitation envoyée !", {
        description: `Un email a été envoyé à ${email}`,
      });
      setEmail("");
      setOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error("Erreur lors de l'envoi", {
        description: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      mutation.mutate();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <CyberButton variant="neon">
            <UserPlus className="mr-2 size-4" />
            Inviter un athlète
          </CyberButton>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-4">
          <div className="flex justify-center">
            <Avatar className="size-16">
              {activeOrg?.logo ? (
                <AvatarImage src={activeOrg.logo} alt={activeOrg.name} />
              ) : null}
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {activeOrg?.name.substring(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <DialogTitle className="text-center">Inviter un athlète</DialogTitle>
          <DialogDescription className="text-center">
            Envoyez une invitation à un athlète pour rejoindre{" "}
            <span className="font-medium">{activeOrg?.name}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              type="email"
              placeholder="athlete@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-muted-foreground text-sm">
              L'athlète recevra un email avec un lien pour rejoindre l'équipe
            </p>
          </div>

          <CyberButton
            type="submit"
            variant="neon"
            className="w-full"
            disabled={mutation.isPending || !email}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 size-4" />
                Envoyer l'invitation
              </>
            )}
          </CyberButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
