import { clientEnv } from "../client-env";

const DEFAULT_PLACEHOLDER = "/file.svg";

function stripLeadingSlash(value: string): string {
  return value.replace(/^\/+/, "");
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function resolveImageBaseUrl(): string | null {
  const publicBase = clientEnv.NEXT_PUBLIC_IMAGE_BASE_URL;
  return stripTrailingSlash(publicBase);
}

export function toImageUrl(
  pathOrUrl: string | null | undefined,
  options?: { fallbackPath?: string },
): string {
  const fallbackPath = options?.fallbackPath ?? DEFAULT_PLACEHOLDER;
  if (!pathOrUrl) {
    return fallbackPath;
  }

  if (
    pathOrUrl.startsWith("http://") ||
    pathOrUrl.startsWith("https://") ||
    pathOrUrl.startsWith("data:") ||
    pathOrUrl.startsWith("blob:")
  ) {
    return pathOrUrl;
  }

  if (pathOrUrl.startsWith("/")) {
    return pathOrUrl;
  }

  const baseUrl = resolveImageBaseUrl();
  if (!baseUrl) {
    return fallbackPath;
  }

  return `${baseUrl}/${stripLeadingSlash(pathOrUrl)}`;
}
