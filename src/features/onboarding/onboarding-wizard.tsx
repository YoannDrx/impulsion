"use client";

import { CyberButton } from "@/components/impulsion/cyber-button";
import { GlowCard } from "@/components/impulsion/glow-card";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { AthleteProfileForm } from "./athlete-profile-form";
import { CoachProfileForm } from "./coach-profile-form";
import { useOnboardingStore } from "./onboarding-store";
import { RoleSelection } from "./role-selection";

const stepVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function OnboardingWizard() {
  const { step, role, setStep } = useOnboardingStore();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <GlowCard
        variant="elevated"
        glow={role ? "lime" : "none"}
        size="lg"
        className="w-full max-w-2xl"
      >
        <div className="p-8">
          {/* Progress indicator */}
          <div className="mb-8 flex items-center justify-center gap-2">
            <StepIndicator step={1} currentStep={step} label="Rôle" />
            <div className="bg-border h-px w-8" />
            <StepIndicator step={2} currentStep={step} label="Profil" />
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            {step === "role" && (
              <motion.div
                key="role"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <RoleSelection />
                <div className="mt-8 flex justify-center">
                  <CyberButton
                    variant="neon"
                    size="lg"
                    disabled={!role}
                    onClick={() => setStep("profile")}
                  >
                    Continuer
                    <ArrowRight className="ml-2 size-4" />
                  </CyberButton>
                </div>
              </motion.div>
            )}

            {step === "profile" && role === "coach" && (
              <motion.div
                key="coach-profile"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <CoachProfileForm />
              </motion.div>
            )}

            {step === "profile" && role === "athlete" && (
              <motion.div
                key="athlete-profile"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <AthleteProfileForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlowCard>
    </div>
  );
}

function StepIndicator({
  step,
  currentStep,
  label,
}: {
  step: number;
  currentStep: string;
  label: string;
}) {
  const stepMap: Record<string, number> = {
    role: 1,
    profile: 2,
    complete: 3,
  };
  const currentStepNumber = stepMap[currentStep] ?? 1;
  const isActive = currentStepNumber >= step;
  const isCurrent = currentStepNumber === step;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex size-8 items-center justify-center rounded-full text-sm font-medium transition-all ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        } ${isCurrent ? "ring-primary/50 ring-offset-background ring-2 ring-offset-2" : ""}`}
      >
        {step}
      </div>
      <span
        className={`text-xs ${isActive ? "text-foreground" : "text-muted-foreground"}`}
      >
        {label}
      </span>
    </div>
  );
}
