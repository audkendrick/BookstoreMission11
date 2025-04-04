import { Book } from "../types/Book";

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const API_URL = "https://bookprojectkendrickbackend.azurewebsites.net/Book";

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
      .join("&");

    console.log(categoryParams);
    const response = await fetch(
      `${API_URL}/GetProjectTypes?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ""}`
      // {
      //   credentials: "include",
      // }
    );
    console.log("Finished??", response.status);

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook?`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error("Failed to add book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding book", error);
    throw error;
  }
};

export const updateBook = async (
  bookid: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteBook = async (bookid: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookid}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
