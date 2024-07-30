using LiteDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpellingApp.Server.Infrastructure;
using SpellingApp.Server.Models;

namespace SpellingApp.Server.Controllers
{
    [Route("api/grades")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        public GradeController()
        {
            using (var db = LiteDbFactory.OpenConnection())
            {
                var col = db.GetCollection<Grade>();
                col.EnsureIndex(x => x.StudentId);
            }
        }

        [HttpPost]
        public ActionResult<Grade> Create(Grade model)
        {
            try
            {
                using (var db = LiteDbFactory.OpenConnection())
                {
                    var col = db.GetCollection<Grade>();
                    col.Insert(model);
                    return this.Ok(model);
                }
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex);
            }
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public ActionResult<Grade> Update(Guid id, Grade model)
        {
            try
            {
                using (var db = LiteDbFactory.OpenConnection())
                {
                    var col = db.GetCollection<Grade>();
                    var record = col.FindById(id);
                    if (record != null)
                    {
                        record.Scores = model.Scores;
                        record.Date = model.Date;
                        col.Update(record);
                        return this.Ok(model);
                    }
                    else
                    {
                        return this.NotFound(id);
                    }
                }
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex);
            }
        }

        [Route("{id:Guid}")]
        [HttpGet]
        public ActionResult<Grade> GetById(Guid id)
        {
            using (var db = LiteDbFactory.OpenConnection())
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
            using (var db = LiteDbFactory.OpenConnection())
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

        [Route("{id:Guid}")]
        [HttpDelete]
        public ActionResult Delete(Guid id)
        {
            using (var db = LiteDbFactory.OpenConnection())
            {
                var col = db.GetCollection<Grade>();
                var result = col.Delete(id);
                if (result)
                    return this.NoContent();
                return this.NotFound(id);
            }
        }
    }
}
