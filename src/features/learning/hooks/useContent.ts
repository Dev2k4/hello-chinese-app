import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ContentCatalogIndex,
  ContentLessonBundle,
  LearningPathInfo,
  VocabularyPage,
  GrammarList,
  VocabularySearchResult,
} from "../../../types/content.types";
import { API_ROUTES } from "../../../constants/apiRoutes";
import apiClient from "../../../services/apiClient";
import {
  getCatalogIndex as getCatalogLocal,
  getLessonBundle as getLessonLocal,
} from "../api/contentRepository";

async function fetchCatalog(): Promise<ContentCatalogIndex> {
  try {
    const { data } = await apiClient.get(API_ROUTES.CONTENT.CATALOG);
    if (data && data.levels && data.levels.length > 0) return data;
    throw new Error("empty");
  } catch {
    return getCatalogLocal();
  }
}

async function fetchLesson(lessonId: string): Promise<ContentLessonBundle> {
  try {
    const { data } = await apiClient.get(
      API_ROUTES.CONTENT.LESSON(lessonId),
    );
    if (data && data.lesson) return data;
    throw new Error("empty");
  } catch {
    return getLessonLocal(lessonId);
  }
}

async function fetchPaths(): Promise<LearningPathInfo[]> {
  const { data } = await apiClient.get(API_ROUTES.CONTENT.PATHS);
  return data ?? [];
}

export function useContentCatalog() {
  const queryClient = useQueryClient();
  const query = useQuery<ContentCatalogIndex, Error>({
    queryKey: ["content", "catalog"],
    queryFn: fetchCatalog,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  const preload = useCallback(async () => {
    await queryClient.prefetchQuery({
      queryKey: ["content", "catalog"],
      queryFn: fetchCatalog,
      staleTime: 1000 * 60 * 5,
    });
  }, [queryClient]);

  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.error ? query.error.message : null,
    refresh: query.refetch,
    preload,
  };
}

export function useLessonBundle(lessonId: string | null) {
  const query = useQuery<ContentLessonBundle, Error>({
    queryKey: ["content", "lesson", lessonId],
    queryFn: () => {
      if (!lessonId) throw new Error("Missing lessonId");
      return fetchLesson(lessonId);
    },
    enabled: !!lessonId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });

  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.error ? query.error.message : null,
    refresh: query.refetch,
  };
}

export function useLearningPaths() {
  const query = useQuery<LearningPathInfo[], Error>({
    queryKey: ["content", "paths"],
    queryFn: fetchPaths,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  return {
    paths: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? query.error.message : null,
    refresh: query.refetch,
  };
}

async function fetchVocabularyByLevel(levelId: string, page: number): Promise<VocabularyPage> {
  const { data } = await apiClient.get(API_ROUTES.CONTENT.VOCABULARY_BY_LEVEL(levelId, page, 50));
  return data ?? { level: 0, total: 0, page, limit: 50, items: [] };
}

async function fetchGrammarByLevel(levelId: string): Promise<GrammarList> {
  const { data } = await apiClient.get(API_ROUTES.CONTENT.GRAMMAR_BY_LEVEL(levelId));
  return data ?? { level: 0, total: 0, items: [] };
}

export function useVocabularyByLevel(levelId: string | null, page = 1) {
  const query = useQuery<VocabularyPage, Error>({
    queryKey: ["content", "vocabulary", levelId, page],
    queryFn: () => {
      if (!levelId) throw new Error("Missing levelId");
      return fetchVocabularyByLevel(levelId, page);
    },
    enabled: !!levelId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });

  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.error ? query.error.message : null,
    refresh: query.refetch,
  };
}

export function useGrammarByLevel(levelId: string | null) {
  const query = useQuery<GrammarList, Error>({
    queryKey: ["content", "grammar", levelId],
    queryFn: () => {
      if (!levelId) throw new Error("Missing levelId");
      return fetchGrammarByLevel(levelId);
    },
    enabled: !!levelId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });

  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.error ? query.error.message : null,
    refresh: query.refetch,
  };
}

export function useVocabularySearch(query: string) {
  return useQuery<VocabularySearchResult, Error>({
    queryKey: ["content", "vocabulary-search", query],
    queryFn: async () => {
      if (!query) return { items: [] };
      const { data } = await apiClient.get(API_ROUTES.CONTENT.VOCABULARY_SEARCH(query));
      return data ?? { items: [] };
    },
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}

export function useLearningPathByCode(code: string | null) {
  const query = useQuery<LearningPathInfo | null, Error>({
    queryKey: ["content", "path", code],
    queryFn: async () => {
      if (!code) throw new Error("Missing path code");
      const { data } = await apiClient.get(API_ROUTES.CONTENT.PATH_BY_CODE(code));
      return data ?? null;
    },
    enabled: !!code,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  return {
    path: query.data ?? null,
    loading: query.isLoading,
    error: query.error ? query.error.message : null,
    refresh: query.refetch,
  };
}
