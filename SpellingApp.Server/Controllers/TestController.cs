using LiteDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpellingApp.Server.Models;

namespace SpellingApp.Server.Controllers
{
    [Route("api/tests")]
    [ApiController]
    public class TestController : ControllerBase
    {
        public TestController()
        {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Test>();
                col.EnsureIndex(x => x.Name);
            }
        }

        [HttpPost]
        public ActionResult Create(Test model)
        {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Test>();
                col.Insert(model);
                //Fix
                return this.Ok(model);
            }
        }

        [HttpPut]
        public ActionResult<Test> Update(Test model)
        {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Test>();
                var record = col.FindById(model.Id);
                if (record != null)
                {
                    record.Name = model.Name;
                    record.WordIds = model.WordIds;
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
        public ActionResult<Test> GetById(int id)
        {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Test>();
                var result = col.FindById(id);
                if(result == null)
                    return this.NotFound(id);
                return this.Ok(result);
            }
        }

        [HttpGet]
        public List<Test> Search([FromQuery] string? term, [FromQuery] int limit = 25, [FromQuery] int offset = 0)
        {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Test>();
                var results = col.Query();

                if (!string.IsNullOrEmpty(term))
                    results = results.Where(x => x.Name.Contains(term!));

                results = (ILiteQueryable<Test>)results
                    .OrderBy(x => x.Name)
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
                var col = db.GetCollection<Test>();
                var result = col.Delete(id);
                if(result)
                    return this.NoContent();
                return this.NotFound(id);
            }
        }
    }
}