"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GlowCard } from "@/components/impulsion/glow-card";
import { motion } from "motion/react";
import { Users } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  image: string | null;
  role: "owner" | "admin" | "member";
};

type MyTeamInfoProps = {
  teamName: string;
  coach: TeamMember | null;
  teammates: TeamMember[];
};

export function MyTeamInfo({ teamName, coach, teammates }: MyTeamInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <GlowCard variant="elevated" glow="cyan" size="sm">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Users className="text-secondary size-5" />
            <h3 className="font-semibold">{teamName}</h3>
          </div>

          {coach ? (
            <div className="mt-4">
              <p className="text-muted-foreground mb-2 text-xs tracking-wide uppercase">
                Mon coach
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  {coach.image ? (
                    <AvatarImage src={coach.image} alt={coach.name} />
                  ) : null}
                  <AvatarFallback>
                    {coach.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{coach.name}</p>
                  <p className="text-muted-foreground text-sm">Coach</p>
                </div>
              </div>
            </div>
          ) : null}

          {teammates.length > 0 ? (
            <div className="mt-4">
              <p className="text-muted-foreground mb-2 text-xs tracking-wide uppercase">
                Mes coéquipiers ({teammates.length})
              </p>
              <div className="flex -space-x-2">
                {teammates.slice(0, 8).map((teammate) => (
                  <Avatar
                    key={teammate.id}
                    className="border-background size-8 border-2"
                  >
                    {teammate.image ? (
                      <AvatarImage src={teammate.image} alt={teammate.name} />
                    ) : null}
                    <AvatarFallback className="text-xs">
                      {teammate.name.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {teammates.length > 8 ? (
                  <div className="border-background bg-muted flex size-8 items-center justify-center rounded-full border-2 text-xs">
                    +{teammates.length - 8}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </GlowCard>
    </motion.div>
  );
}
