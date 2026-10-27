import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  // attachSupabaseAuth is left out because nothing uses Supabase auth yet, and it
  // pulls the whole Supabase client (~200 kB) into the browser bundle. Add it back
  // (from "@/integrations/supabase/auth-attacher") before adding server functions
  // that use requireSupabaseAuth.
  functionMiddleware: [],
  requestMiddleware: [errorMiddleware],
}));
