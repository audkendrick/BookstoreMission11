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
        public IActionResult GetProjects(int pageSize = 5, int pageNum = 1)
        {
            var something = _bookContext.Books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumProjects = _bookContext.Books.Count();

            var someObject = new
            {
                Books = something,
                TotalProjects = totalNumProjects
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
