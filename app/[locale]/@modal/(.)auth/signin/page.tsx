import { LogoSvg } from "@/components/svg/logo-svg";
import { DialogContent } from "@/components/ui/dialog";
import { InterceptDialog } from "@/components/utils/intercept-dialog";
import { SocialProviders } from "@/lib/auth";
import { SiteConfig } from "@/site-config";
import { SignInModal } from "./signin";

export default function SignInDialogPage() {
  return (
    <InterceptDialog>
      <DialogContent className="bg-card">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="mx-auto mt-4 flex flex-row items-center gap-2">
            <LogoSvg size={32} className="text-lime-400" />
            <span className="text-lg font-semibold">{SiteConfig.title}</span>
          </div>
          <p className="text-muted-foreground mt-2 text-center">
            Connectez-vous pour continuer.
          </p>
        </div>
        <SignInModal providers={Object.keys(SocialProviders ?? {})} />
      </DialogContent>
    </InterceptDialog>
  );
}
