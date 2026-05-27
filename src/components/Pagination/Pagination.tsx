import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

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

  if (cleanPageCount <= 1) {
    return null;
  }

  const handlePageClick = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <nav className={css.paginationContainer}>
      <ReactPaginate
        pageCount={cleanPageCount}
        onPageChange={handlePageClick}
        forcePage={cleanCurrentPage - 1}
        previousLabel="< previous"
        nextLabel="next >"
        breakLabel="..."
        containerClassName={css.paginationList}
        pageClassName={css.pageItem}
        pageLinkClassName={css.pageLink}
        previousClassName={css.pageItem}
        previousLinkClassName={css.pageLink}
        nextClassName={css.pageItem}
        nextLinkClassName={css.pageLink}
        breakClassName={css.pageItem}
        breakLinkClassName={css.pageLink}
        activeClassName={css.active}
        disabledClassName={css.disabled}
      />
    </nav>
  );
}
