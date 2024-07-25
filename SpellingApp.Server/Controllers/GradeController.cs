using LiteDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpellingApp.Server.Models;

namespace SpellingApp.Server.Controllers
{
    [Route("api/grades")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        public GradeController()
        {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Grade>();
                col.EnsureIndex(x => x.StudentId);
            }
        }

        [HttpPost]
        public ActionResult<Grade> Create(Grade model)
        {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Grade>();
                col.Insert(model);
                return this.Ok(model);
            }
        }

        [HttpPut]
        public ActionResult<Grade> Update(Grade model)
        {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Grade>();
                var record = col.FindById(model.Id);
                if (record != null)
                {
                    record.Scores = model.Scores;
                    record.Date = model.Date;
                    col.Update(record);
                    return this.Ok(model);
                }
                else
                {
                    return this.NotFound(model);
                }
            }
        }

        [HttpGet]
        public ActionResult<Grade> GetById(int id)
        {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Grade>();
                var result = col.FindById(id);
                if (result == null)
                    return this.NotFound(id);
                return this.Ok(result);
            }
        }

        [HttpGet]
        public List<Grade> Search([FromQuery] Guid? studentId, [FromQuery] Guid? classroomId, [FromQuery] Guid? testId, [FromQuery] int limit = 25, [FromQuery] int offset = 0)
        {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Grade>();
                var results = col.Query();

                if (classroomId != null)
                    results = results.Where(x => x.ClassroomId == classroomId);
                if (testId != null)
                    results = results.Where(x => x.TestId == testId);
                if (studentId != null)
                    results = results.Where(x => x.StudentId == studentId);

                results = (ILiteQueryable<Grade>)results
                    .OrderBy(x => x.Date)
                    .Skip(offset)
                    .Limit(limit);

                return results.ToList();
            }
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Grade>();
                var result = col.Delete(id);
                if(result)
                    return this.NoContent();
                return this.NotFound(id);
            }
        }
    }
}
