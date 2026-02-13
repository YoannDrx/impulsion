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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AthleteOnboardingSchema } from "@/lib/impulsion/schemas";
import { SPORT_LABELS, SPORTS } from "@/lib/impulsion/types";
import { motion } from "motion/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useOnboardingStore } from "./onboarding-store";
import { completeAthleteOnboarding } from "./onboarding.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AthleteProfileForm() {
  const router = useRouter();
  const { sport, seasonGoal, setSport, setSeasonGoal, setStep } =
    useOnboardingStore();
  const [isPending, startTransition] = useTransition();

  const form = useZodForm({
    schema: AthleteOnboardingSchema,
    defaultValues: {
      sport: sport ?? undefined,
      seasonGoal: seasonGoal,
    },
  });

  const onSubmit = (data: {
    sport: (typeof SPORTS)[number];
    seasonGoal?: string;
  }) => {
    setSport(data.sport);
    if (data.seasonGoal) setSeasonGoal(data.seasonGoal);

    startTransition(async () => {
      const result = await completeAthleteOnboarding(data);

      if (result.success) {
        toast.success("Votre profil a été créé !");
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
          Configurez votre profil
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mt-2"
        >
          Ces informations aideront votre coach à personnaliser votre
          entraînement
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seasonGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objectif de saison (optionnel)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ex: Terminer un marathon sous 3h30, améliorer mon 10km..."
                    className="min-h-24"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Décrivez votre objectif principal pour cette saison
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
                  Configuration...
                </>
              ) : (
                "Configurer mon profil"
              )}
            </CyberButton>
          </div>
        </Form>
      </motion.div>
    </div>
  );
}
