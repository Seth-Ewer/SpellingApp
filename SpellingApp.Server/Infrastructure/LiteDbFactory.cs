using LiteDB;

namespace SpellingApp.Server.Infrastructure
{
    public static class LiteDbFactory
    {
        public static LiteDB.LiteDatabase OpenConnection()
        {
            return new LiteDatabase(@"Filename=database.db;connection=shared");
        } 
    }
}
