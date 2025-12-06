"use client";

import { CyberButton } from "@/components/impulsion/cyber-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CoachOnboardingSchema } from "@/lib/impulsion/schemas";
import { SPORT_LABELS, SPORTS } from "@/lib/impulsion/types";
import { motion } from "motion/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useOnboardingStore } from "./onboarding-store";
import { completeCoachOnboarding } from "./onboarding.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CoachProfileForm() {
  const router = useRouter();
  const { teamName, teamSport, setTeamName, setTeamSport, setStep } =
    useOnboardingStore();
  const [isPending, startTransition] = useTransition();

  const form = useZodForm({
    schema: CoachOnboardingSchema,
    defaultValues: {
      teamName: teamName,
      sport: teamSport ?? undefined,
    },
  });

  const onSubmit = (data: {
    teamName: string;
    sport: (typeof SPORTS)[number];
  }) => {
    setTeamName(data.teamName);
    setTeamSport(data.sport);

    startTransition(async () => {
      const result = await completeCoachOnboarding(data);

      if (result.success) {
        toast.success("Votre équipe a été créée !");
        router.push("/orgs");
      } else {
        toast.error(result.error ?? "Une erreur est survenue");
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight lg:text-4xl"
        >
          Créez votre équipe
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mt-2"
        >
          Configurez les informations de base de votre équipe
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Form form={form} onSubmit={onSubmit} className="space-y-6">
          <FormField
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l'équipe</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Club Athlétisme Paris" {...field} />
                </FormControl>
                <FormDescription>
                  Le nom visible par vos athlètes
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sport principal</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un sport" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SPORTS.map((sport) => (
                      <SelectItem key={sport} value={sport}>
                        {SPORT_LABELS[sport]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Vous pourrez ajouter d'autres sports plus tard
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-4">
            <CyberButton
              type="button"
              variant="ghost"
              onClick={() => setStep("role")}
              disabled={isPending}
            >
              <ArrowLeft className="mr-2 size-4" />
              Retour
            </CyberButton>

            <CyberButton
              type="submit"
              variant="default"
              className="flex-1"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Création...
                </>
              ) : (
                "Créer mon équipe"
              )}
            </CyberButton>
          </div>
        </Form>
      </motion.div>
    </div>
  );
}
