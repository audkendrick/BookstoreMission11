using System.Globalization;
using BookProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookProject.API.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetBooks([FromQuery] int pageSize = 5, [FromQuery] int pageNum = 1, [FromQuery] string? sortBy = null, [FromQuery] string? sortOrder = "asc") // Default to ascending)
        {
            var books = _bookContext.Books.AsQueryable();

            // Apply sorting **only** if the user selects it
            if (!string.IsNullOrEmpty(sortBy) && sortBy.ToLower() == "title")
            {
                books = sortOrder?.ToLower() == "desc"
                    ? books.OrderByDescending(b => b.Title)
                    : books.OrderBy(b => b.Title);
            }

            var pagedBooks = books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            var someObject = new
            {
                Books = pagedBooks,
                TotalBooks = totalNumBooks
            };

            return Ok(someObject);
        }

        //[HttpGet("FunctionalProjects")]
        //public IEnumerable<Project> GetFunctionalProjects()
        //{
        //    var something = _bookContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
        //    return something;
        //}
    }
}
