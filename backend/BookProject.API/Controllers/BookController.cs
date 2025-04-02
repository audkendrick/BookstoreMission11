using System.Globalization;
using System.Net;
using BookProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BookProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetBooks([FromQuery] int pageSize = 5, [FromQuery] int pageNum = 1, [FromQuery] string? sortBy = null, [FromQuery] string? sortOrder = "asc", [FromQuery] List<string>? bookTypes = null, [FromQuery] decimal? maxPrice = null) // Default to ascending)
        {
            var books = _bookContext.Books.AsQueryable();

            // Apply sorting **only** if the user selects it
            if (!string.IsNullOrEmpty(sortBy) && sortBy.ToLower() == "title")
            {
                books = sortOrder?.ToLower() == "desc"
                    ? books.OrderByDescending(b => b.Title)
                    : books.OrderBy(b => b.Title);
            }

            

            if (bookTypes != null && bookTypes.Any())
            {
                books = books.Where(p => bookTypes.Contains(p.Category));
            }

            // **Filter by price if maxPrice is provided**
            if (maxPrice.HasValue)
            {
                books = books.Where(b => b.Price <= maxPrice.Value);
            }

            var totalNumBooks = books.Count();

            var pagedBooks = books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            

            var someObject = new
            {
                Books = pagedBooks,
                TotalBooks = totalNumBooks
            };

            return Ok(someObject);
        }

        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }

        [HttpGet("GetBook/{bookID}")]
        public IActionResult GetBook(int bookID)
        {
            var book = _bookContext.Books.FirstOrDefault(b => b.BookID == bookID);

            if (book == null)
            {
                return NotFound(); // Book not found
            }

            return Ok(new { title = book.Title, price = book.Price });
        }

        [HttpPost("AddBook")]
        public IActionResult AddProject([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book UpdatedBook)
        {
            var exisitingBook = _bookContext.Books.Find(bookID);

            exisitingBook.Title = UpdatedBook.Title;
            exisitingBook.Author = UpdatedBook.Author;
            exisitingBook.Publisher = UpdatedBook.Publisher;
            exisitingBook.ISBN = UpdatedBook.ISBN;
            exisitingBook.Classification = UpdatedBook.Classification;
            exisitingBook.Category = UpdatedBook.Category;
            exisitingBook.PageCount = UpdatedBook.PageCount;
            exisitingBook.Price = UpdatedBook.Price;

            _bookContext.Books.Update(exisitingBook);
            _bookContext.SaveChanges();

            return Ok(exisitingBook);
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteProject(int bookID)
        {
            var book = _bookContext.Books.Find(bookID);

            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent();
        }
    }
}