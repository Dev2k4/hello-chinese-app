import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ContentCatalogIndex,
  ContentLessonBundle,
} from "../types/content.types";

const CONTENT_BASE_URL = process.env.EXPO_PUBLIC_CONTENT_URL || "";
const CACHE_PREFIX = "content:";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7;

const memoryCache = new Map<string, unknown>();

type CachedValue<T> = {
  savedAt: number;
  data: T;
};

async function getCached<T>(key: string): Promise<T | null> {
  if (memoryCache.has(key)) {
    return memoryCache.get(key) as T;
  }

  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as CachedValue<T>;
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) {
      await AsyncStorage.removeItem(key);
      return null;
    }
    memoryCache.set(key, parsed.data);
    return parsed.data;
  } catch {
    await AsyncStorage.removeItem(key);
    return null;
  }
}

async function setCached<T>(key: string, data: T) {
  memoryCache.set(key, data);
  const payload: CachedValue<T> = { savedAt: Date.now(), data };
  await AsyncStorage.setItem(key, JSON.stringify(payload));
}

async function fetchJson<T>(path: string): Promise<T> {
  if (!CONTENT_BASE_URL) {
    throw new Error("Missing EXPO_PUBLIC_CONTENT_URL");
  }
  const res = await fetch(`${CONTENT_BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Failed to load content: ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function getCatalogIndex(): Promise<ContentCatalogIndex> {
  const key = `${CACHE_PREFIX}catalog`;
  const cached = await getCached<ContentCatalogIndex>(key);
  if (cached) return cached;

  const catalog = await fetchJson<ContentCatalogIndex>("/catalog.json");
  await setCached(key, catalog);
  return catalog;
}

export async function getLessonBundle(lessonId: string): Promise<ContentLessonBundle> {
  const key = `${CACHE_PREFIX}lesson:${lessonId}`;
  const cached = await getCached<ContentLessonBundle>(key);
  if (cached) return cached;

  const bundle = await fetchJson<ContentLessonBundle>(`/lessons/${lessonId}.json`);
  await setCached(key, bundle);
  return bundle;
}

export async function clearContentCache() {
  const keys = await AsyncStorage.getAllKeys();
  const contentKeys = keys.filter((k) => k.startsWith(CACHE_PREFIX));
  if (contentKeys.length > 0) {
    await AsyncStorage.multiRemove(contentKeys);
  }
  memoryCache.clear();
}
