using System.Globalization;
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
        public IActionResult GetBooks([FromQuery] int pageSize = 5, [FromQuery] int pageNum = 1, [FromQuery] string? sortBy = null, [FromQuery] string? sortOrder = "asc", [FromQuery] List<string>? bookTypes = null) // Default to ascending)
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


    }
}
