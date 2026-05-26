import notehubApi from "../api/notehub";
import type { Note, NewNoteData } from "../types/note";

export interface PaginatedNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

const AUTH_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<PaginatedNotesResponse> => {
  const response = await notehubApi.get<PaginatedNotesResponse>("/notes", {
    params,
    ...getAuthConfig(), // Додано заголовок авторизації
  });
  return response.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const response = await notehubApi.post<Note>(
    "/notes",
    noteData,
    getAuthConfig(),
  );
  return response.data;
};

export const deleteNote = async (id: string | number): Promise<Note> => {
  const response = await notehubApi.delete<Note>(
    `/notes/${id}`,
    getAuthConfig(),
  );
  return response.data;
};
