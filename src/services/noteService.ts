import type { AxiosResponse } from "axios";
import notehubApi from "../api/notehub";
import type { Note, NewNoteData, PaginatedNotesResponse } from "../types/note";

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

// Якщо бекенд повертає об'єкт типу PaginatedNotesResponse:
export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<AxiosResponse<PaginatedNotesResponse>> => {
  return notehubApi.get<PaginatedNotesResponse>("/notes", { params });
};

export const createNote = async (
  noteData: NewNoteData,
): Promise<AxiosResponse<Note>> => {
  return notehubApi.post<Note>("/notes", noteData);
};

export const deleteNote = async (
  id: string | number,
): Promise<AxiosResponse<Note>> => {
  return notehubApi.delete<Note>(`/notes/${id}`);
};
