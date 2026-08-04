import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { usePageVisibilityHelper } from "@/hooks/usePageVisibility";

function SimpleSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e75710] border-t-transparent" />
    </div>
  );
}

function NotFoundView() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-slate-900">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-slate-900">Page not found</h2>
        <p className="mt-2 text-sm text-slate-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-[#e75710] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#c94a0a]"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PageVisibilityGuard({ children }: { children: React.ReactNode }) {
  const { isVisible, loading } = usePageVisibilityHelper();
  const location = useLocation();
  const path = location.pathname;

  if (loading) {
    return <SimpleSpinner />;
  }

  if (!isVisible(path)) {
    return <NotFoundView />;
  }

  return <>{children}</>;
}
