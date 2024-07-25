using LiteDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpellingApp.Server.Models;
using System.Reflection;

namespace SpellingApp.Server.Controllers
{
    [Route("api/words")]
    [ApiController]
    public class WordController : ControllerBase
    {
        public WordController()
        {
            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Word>();
                col.EnsureIndex(x => x.Name);
            }
        }

        [HttpPost]
        public ActionResult<Word> Create(Word model)
        {

            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Word>();
                col.Insert(model);
                return this.Ok(model);
            }
        }

        [HttpPut]
        public ActionResult<Word> Update(Word model)
        {

            using (var db = new LiteDatabase(@"database.db"))
            {

                var col = db.GetCollection<Word>();
                var record = col.FindById(model.Id);
                if (record != null)
                {
                    record.Name = model.Name;
                    record.Description = model.Description;
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
        public ActionResult<Word> GetById(int id)
        {

            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Word>();
                var record = col.FindById(id);
                if (record == null)
                    return this.NotFound(id);
                return this.Ok(record);
            }
        }

        [HttpGet]
        public List<Word> Search([FromQuery] string? term, [FromQuery] List<Guid> ids, [FromQuery] int limit = 25, [FromQuery] int offset = 0)
        {

            using (var db = new LiteDatabase(@"database.db"))
            {
                var col = db.GetCollection<Word>();
                var results = col.Query();

                if (!string.IsNullOrEmpty(term))
                    results = results.Where(x => x.Name.Contains(term!));

                if(ids.Count > 0)
                    results = results.Where(x => ids.Contains(x.Id));

                results = (ILiteQueryable<Word>)results
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
                var col = db.GetCollection<Word>();
                var results = col.Delete(id);
                if(results == false)
                    return this.NotFound(id);
                return this.NoContent();
            }
        }
    }
}