import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

// Middleware for error handling
const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    
    // Log error to monitoring service
    if (typeof error === "object" && error !== null) {
      console.error("[Server Error]", {
        message: (error as any).message,
        stack: (error as any).stack,
        timestamp: new Date().toISOString(),
      });
    } else {
      console.error("[Server Error]", error);
    }
    
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware],
}));
