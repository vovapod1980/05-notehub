import { useState } from "react";
// 1. Обов'язково додайте імпорт keepPreviousData
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { fetchNotes, createNote, deleteNote } from "../services/noteService";

export default function useNotes(perPage: number) {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading, isError, error } = useQuery({
    // queryKey приводимо до константного типу (as const) для суворої типізації v5
    queryKey: ["notes", currentPage, searchQuery] as const,
    queryFn: async () => {
      const response = await fetchNotes({
        page: currentPage,
        perPage,
        search: searchQuery,
      });
      return response.data;
    },
    // 2. ЗАМІСТЬ keepPreviousData: true ПИШЕМО:
    placeholderData: keepPreviousData,
  });

  // Решта коду мутацій (createMutation, deleteMutation) залишається без змін...
  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return {
    notes: data?.notes || [],
    // Приводимо до Number, щоб уникнути undefined чи некоректних типів
    totalPages: data ? Number(data.totalPages) : 1,
    currentPage,
    setCurrentPage,
    setSearchQuery,
    isLoading,
    isError,
    errorMessage: error instanceof Error ? error.message : "Сталася помилка",
    addNote: createMutation.mutateAsync,
    removeNote: deleteMutation.mutate,
  };
}
