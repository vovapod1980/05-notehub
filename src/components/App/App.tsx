import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import useNotes from "../../hooks/useNotes";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./App.module.css";

const ITEMS_PER_PAGE = 12;

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    notes,
    totalPages,
    currentPage,
    setCurrentPage,
    setSearchQuery,
    isLoading,
    isError,
    errorMessage,
    addNote,
    removeNote,
  } = useNotes(ITEMS_PER_PAGE);

  const debouncedSearchHandler = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  const handleAddNote = async (noteData: {
    title: string;
    content: string;
    tag?: string;
  }): Promise<void> => {
    try {
      await addNote(noteData);
      setIsModalOpen(false);
    } catch (err: unknown) {
      console.error("Помилка при додаванні нотатки:", err);
    }
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={debouncedSearchHandler} />

        {/* Умова: рендеримо пагінацію, лише якщо кількість сторінок більше 1 */}
        {!isLoading && !isError && totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          Create note +
        </button>
      </header>

      <main className={css.mainContent}>
        {isError && <ErrorMessage message={errorMessage} />}

        {isLoading ? (
          <Loader />
        ) : (
          notes.length > 0 && <NoteList notes={notes} onDelete={removeNote} />
        )}
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onAdd={handleAddNote} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
