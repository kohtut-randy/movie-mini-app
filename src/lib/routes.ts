/**
 * Routes that require a logged in user. A route is protected when the current
 * pathname equals an entry or starts with it followed by "/".
 */
export const PROTECTED_ROUTES = ["/movie"];

/** Routes a logged in user should not see (login page). */
export const PUBLIC_ONLY_ROUTES = ["/"];

/** Where to send users after a successful login. */
export const HOME_ROUTE = "/movie";

/** Where to send users who open a protected route while signed out. */
export const LOGIN_ROUTE = "/";

function matches(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function isProtectedRoute(pathname: string) {
  return matches(pathname, PROTECTED_ROUTES);
}

export function isPublicOnlyRoute(pathname: string) {
  return matches(pathname, PUBLIC_ONLY_ROUTES);
}
