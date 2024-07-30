using LiteDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpellingApp.Server.Infrastructure;
using SpellingApp.Server.Models;

namespace SpellingApp.Server.Controllers
{
    [Route("/api/classrooms")]
    [ApiController]
    public class ClassroomController : ControllerBase
    {
        public ClassroomController() {
            using (var db = LiteDbFactory.OpenConnection()) {
                var col = db.GetCollection<Classroom>();
                col.EnsureIndex(x => x.Name);
            }
        }

        [HttpPost]
        public ActionResult<Classroom> Create(Classroom model) {
            using (var db = LiteDbFactory.OpenConnection())
            {
                var col = db.GetCollection<Classroom>();
                //TODO: Validate model fields
                //TODO: Ensure record not already present
                col.Insert(model);
            }
            //TODO: Ensure all fields updated with values from database
            return this.Ok(model);
        }

        [Route("{id:Guid}")]
        [HttpPut]
        public ActionResult<Classroom> Update(Guid id, Classroom model)
        {
            using (var db = LiteDbFactory.OpenConnection())
            {
                var col = db.GetCollection<Classroom>();
                var record = col.FindById(id);
                if (record != null)
                {
                    record.Name = model.Name;
                    record.TestIds = model.TestIds;
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

        [Route("{id}")]
        [HttpGet]
        public ActionResult<Classroom> Get(Guid id) {
            using (var db = LiteDbFactory.OpenConnection())
            {
                var col = db.GetCollection<Classroom>();
                var result = col.FindById(id);
                if(result == null)
                    return this.NotFound(id);
                return this.Ok(result);
            }
        }

        [HttpGet]
        public List<Classroom> Search([FromQuery] string? term, [FromQuery] Guid? testId, [FromQuery] int limit=25, [FromQuery] int offset=0)
        {
            using (var db = LiteDbFactory.OpenConnection())
            {
                var col = db.GetCollection<Classroom>();
                var results = col.Query();

                if (!string.IsNullOrEmpty(term))
                    results = results.Where(x => x.Name.Contains(term!));
                if(testId.HasValue) results=results.Where(x => x.TestIds.Contains(testId.Value));

                results = (ILiteQueryable<Classroom>)results
                    .OrderBy(x => x.Name)
                    .Skip(offset)
                    .Limit(limit);

                return results.ToList();
            }

        }

        [Route("{id}")]
        [HttpDelete]
        public ActionResult Delete(Guid id) {
            using (var db = LiteDbFactory.OpenConnection())
            {
                var col = db.GetCollection<Classroom>();
                var result = col.Delete(id);
                if (result) return this.NoContent();
                else return this.NotFound(id);
            }
        }

    }
}
