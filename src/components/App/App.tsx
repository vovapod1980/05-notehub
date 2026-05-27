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
  } = useNotes(ITEMS_PER_PAGE);

  const debouncedSearchHandler = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={debouncedSearchHandler} />

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
          notes.length > 0 && <NoteList notes={notes} />
        )}
      </main>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
