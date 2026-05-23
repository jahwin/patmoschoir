export interface ContactEmail {
  title?: string;
  value?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ContactsData {
  address?: string | null;
  phones?: unknown;
  emails?: unknown;
  social_links?: unknown;
}

export function asStringList(value: unknown): string[] {
  if (value == null) return [];
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>)
      .map((item) => String(item).trim())
      .filter(Boolean);
  }
  return [];
}

export function asEmailList(value: unknown): ContactEmail[] {
  if (value == null) return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") {
          return { title: "General", value: item };
        }
        if (item && typeof item === "object") {
          const row = item as ContactEmail;
          return {
            title: row.title ?? "General",
            value: row.value ?? "",
          };
        }
        return null;
      })
      .filter((e): e is ContactEmail => !!e?.value?.trim());
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((value) => ({ title: "General", value }));
  }
  return [];
}

export function asSocialList(value: unknown): SocialLink[] {
  if (value == null) return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (item && typeof item === "object" && "url" in item) {
          const row = item as SocialLink;
          return {
            platform: String(row.platform ?? ""),
            url: String(row.url ?? ""),
          };
        }
        return null;
      })
      .filter((s): s is SocialLink => !!s?.url?.trim());
  }
  return [];
}

export function hasContactContent(contacts?: ContactsData): boolean {
  if (!contacts) return false;
  return !!(
    contacts.address?.trim() ||
    asStringList(contacts.phones).length > 0 ||
    asEmailList(contacts.emails).length > 0 ||
    asSocialList(contacts.social_links).length > 0
  );
}
