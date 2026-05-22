export interface Note {
  id: string | number;
  title: string;
  content: string; // було text
  tag?: string;
}

export interface NewNoteData {
  title: string;
  content: string; // було text
  tag?: string;
}

// Інтерфейс для пагінованої відповіді сервера
export interface PaginatedNotesResponse {
  notes: Note[];
  totalPages: number; // Переконайтеся, що тут написано саме totalPages (не total)
  page: number;
  perPage: number;
}
