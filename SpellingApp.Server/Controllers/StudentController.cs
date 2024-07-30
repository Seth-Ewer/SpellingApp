using LiteDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpellingApp.Server.Infrastructure;
using SpellingApp.Server.Models;
using System.Reflection;

namespace SpellingApp.Server.Controllers
{
    [Route("api/students")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        public StudentController()
        {
            using (var db = LiteDbFactory.OpenConnection())
            {
                var col = db.GetCollection<Student>();
                col.EnsureIndex(x => x.Name);
            }
        }

        [HttpPost]
        public ActionResult<Student> Create(Student model)
        {
            using (var db = LiteDbFactory.OpenConnection())
            {
                var col = db.GetCollection<Student>();
                //TODO: Validate model fields
                //TODO: Ensure record not already present
                col.Insert(model);
                return this.Ok(model);
            }
        }

        [Route("{id:Guid}")]
        [HttpPut]
        public ActionResult<Student> Update(Guid id, Student model)
        {
            using (var db = LiteDbFactory.OpenConnection())
            {
                var col = db.GetCollection<Student>();
                var record = col.FindById(id);
                if (record != null)
                {
                    record.Name = model.Name;
                    record.ClassroomIds = model.ClassroomIds;
                    //TODO: Make sure to copy all fields
                    col.Update(record);
                    return this.Ok(record);
                }
                else
                {
                    return this.NotFound(id);
                }
            }
        }
        [Route("{id:Guid}")]
        [HttpGet]
        public ActionResult<Student> GetById(Guid id)
        {
            using (var db = LiteDbFactory.OpenConnection())
            {
                var col = db.GetCollection<Student>();
                var result = col.FindById(id);
                if (result == null)
                    return this.NotFound(id);
                return this.Ok(result);
            }
        }
        [HttpGet]
        public List<Student> Search([FromQuery] string? term, [FromQuery] Guid? classroomId, [FromQuery] int limit = 25, [FromQuery] int offset = 0)
        {
            using (var db = LiteDbFactory.OpenConnection())
            {
                var col = db.GetCollection<Student>();
                var results = col.Query();

                if (!string.IsNullOrEmpty(term))
                    results = results.Where(x => x.Name.Contains(term!));
                if (classroomId.HasValue) results = results.Where(x => x.ClassroomIds.Contains(classroomId.Value));

                results = (ILiteQueryable<Student>)results
                    .OrderBy(x => x.Name)
                    .Skip(offset)
                    .Limit(limit);

                return results.ToList();
            }
        }

        [Route("{id:Guid}")]
        [HttpDelete]
        public ActionResult Delete(Guid id)
        {
            using (var db = LiteDbFactory.OpenConnection())
            {
                var col = db.GetCollection<Student>();
                var result = col.Delete(id);
                if (result) return this.NoContent();
                else return this.NotFound(id);
            }
        }
    }
}
