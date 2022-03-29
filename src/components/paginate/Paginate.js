import ReactPaginate from "react-paginate"

const Paginate = ({onPageChange, pageCount}) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      containerClassName={'pagination'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      activeClassName={'active'}
   />
  )
}

export default Paginate
