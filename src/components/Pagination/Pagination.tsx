import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const cleanPageCount = Math.floor(Number(pageCount) || 0);
  const cleanCurrentPage = Math.floor(Number(currentPage) || 1);

  // Умова з ТЗ: якщо сторінок менше або рівно 1, нічого не рендеримо
  if (cleanPageCount <= 1) {
    return null;
  }

  // Генеруємо масив із номерами сторінок, наприклад [1, 2, 3, 4, 5]
  const pages = Array.from({ length: cleanPageCount }, (_, i) => i + 1);

  return (
    <nav className={css.paginationContainer}>
      {/* Кнопка "Назад" */}
      <button
        className={css.pageLink}
        disabled={cleanCurrentPage === 1}
        onClick={() => onPageChange(cleanCurrentPage - 1)}
      >
        &lt; previous
      </button>

      {/* Список сторінок */}
      <ul className={css.paginationList}>
        {pages.map((page) => (
          <li key={page} className={css.pageItem}>
            <button
              className={`${css.pageLink} ${
                page === cleanCurrentPage ? css.active : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      {/* Кнопка "Вперед" */}
      <button
        className={css.pageLink}
        disabled={cleanCurrentPage === cleanPageCount}
        onClick={() => onPageChange(cleanCurrentPage + 1)}
      >
        next &gt;
      </button>
    </nav>
  );
}
