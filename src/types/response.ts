import type { Note } from "./note";

export interface PaginatedNotesResponse {
  data: Note[];
  total: number;
  page: number;
  limit: number;
}
