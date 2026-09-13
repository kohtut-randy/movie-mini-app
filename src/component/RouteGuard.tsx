import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  isProtectedRoute,
  isPublicOnlyRoute,
} from "@/lib/routes";

function FullScreenLoader() {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

/**
 * Blocks rendering of protected pages until the session is known, and
 * redirects based on the current route:
 * - signed out on a protected route -> login page
 * - signed in on a public only route (login) -> home
 *
 * This guards direct URL access on the client. API routes still have to
 * check authorization on their own.
 */
export default function RouteGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const pathname = router.pathname;
  const needsAuth = isProtectedRoute(pathname);
  const publicOnly = isPublicOnlyRoute(pathname);

  useEffect(() => {
    if (isLoading) return;

    if (needsAuth && !isAuthenticated) {
      router.replace({
        pathname: LOGIN_ROUTE,
        query: { redirect: router.asPath },
      });
      return;
    }

    if (publicOnly && isAuthenticated) {
      router.replace(HOME_ROUTE);
    }
  }, [isLoading, isAuthenticated, needsAuth, publicOnly, router]);

  if (isLoading && (needsAuth || publicOnly)) {
    return <FullScreenLoader />;
  }

  // Do not flash protected content while the redirect is in flight.
  if (needsAuth && !isAuthenticated) {
    return <FullScreenLoader />;
  }

  if (publicOnly && isAuthenticated) {
    return <FullScreenLoader />;
  }

  return <>{children}</>;
}
