import { Resend } from "resend";
import { env } from "../env";
import type { MailAdapter } from "./send-email";

// Use a dummy key in CI/test environments to allow build to succeed
const apiKey = env.RESEND_API_KEY ?? "re_dummy_key_for_ci";
export const resend = new Resend(apiKey);

export const resendMailAdapter: MailAdapter = {
  send: async (params) => {
    const result = await resend.emails.send(params);

    if (result.error) {
      return { error: new Error(result.error.message), data: null };
    }

    return { error: null, data: { id: result.data.id } };
  },
};
