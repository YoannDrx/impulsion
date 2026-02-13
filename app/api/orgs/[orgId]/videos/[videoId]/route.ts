import { getVideoDetail } from "@/features/video";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import { route } from "@/lib/zod-route";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = route
  .params(
    z.object({
      orgId: z.string(),
      videoId: z.string(),
    }),
  )
  .handler(async (_req, { params }) => {
    const user = await getRequiredUser();

    const membership = await prisma.member.findFirst({
      where: {
        userId: user.id,
        organizationId: params.orgId,
      },
      select: { id: true },
    });

    if (!membership) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const video = await getVideoDetail(params.videoId, params.orgId);

    if (!video) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return { video };
  });
