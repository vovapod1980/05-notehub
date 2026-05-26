import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[]; // Проп onDelete повністю видалено
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  // Налаштування мутації для видалення нотатки
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      // Оновлюємо кеш списку нотаток після успішного видалення
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (err) => {
      console.error("Помилка при видаленні нотатки:", err);
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            {/* Тег тепер обов'язковий за новими типами */}
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => mutation.mutate(note.id)}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
