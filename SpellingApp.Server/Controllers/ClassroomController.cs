using LiteDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpellingApp.Server.Models;

namespace SpellingApp.Server.Controllers
{
    [Route("/api/classrooms")]
    [ApiController]
    public class ClassroomController : ControllerBase
    {
        // public ClassroomController() {
        //     using (var db = new LiteDatabase(@"database.db")) {
        //         var col = db.GetCollection<Classroom>();
        //         col.EnsureIndex(x => x.Name);
        //     }
        // }

        [HttpPost]
        public Classroom Create(Classroom model) {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Classroom>();
                //TODO: Validate model fields
                //TODO: Ensure record not already present
                col.Insert(model);
            }
            //TODO: Ensure all fields updated with values from database
            return model;
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Classroom> Get(Guid id) {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Classroom>();
                var result = col.FindById(id);
                if(result == null)
                    return this.NotFound(id);
                return this.Ok(result);
            }
        }

        [HttpPut]
        public ActionResult<Classroom> Update(Classroom model) {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Classroom>();
                var record = col.FindById(model.Id);
                record.Name = model.Name;
                //TODO: Make sure to copy all fields
                col.Update(record);
                return this.Ok(record);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult Delete(Guid id) {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Classroom>();
                var result = col.Delete(id);
                if (result) return this.NoContent();
                else return this.NotFound(id);
            }
        }

        [HttpGet]
        public List<Classroom> Search(
            [FromQuery] string? term, [FromQuery] Guid? testId, [FromQuery] int limit=25, [FromQuery] int offset=0)
        {
            using (var db = new LiteDatabase(@"database.db"))
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

    }
}
