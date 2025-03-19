import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function ProjectList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  // const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();
      setBooks(data.books);
      // setTotalItems(data.totalNumProjects);
      setTotalPages(
        data.totalBooks ? Math.ceil(data.totalBooks / pageSize) : 0
      );
    };
    fetchBook();
  }, [pageSize, pageNum]);

  return (
    <>
      <h1> Book Store </h1>
      <br />
      {books.map((p) => (
        <div id="projectCard" className="card" key={p.bookID}>
          <h3 className="card-title">{p.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {p.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {p.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {p.isbn} Individuals Served
              </li>
              <li>
                <strong>Classification: </strong>
                {p.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {p.category}
              </li>
              <li>
                <strong>Page Count: </strong>
                {p.pageCount}
              </li>
              <li>
                <strong>Price: </strong>
                {p.price}
              </li>
            </ul>
          </div>
        </div>
      ))}
      ;
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default ProjectList;
