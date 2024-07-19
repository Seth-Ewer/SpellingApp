namespace SpellingApp.Server.Models
{
    public class Classroom
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<Guid> TestIds { get; set; }
    }

    public class Student
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<Guid> ClassroomIds { get; set; }
    }

    public class Test
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<Guid> WordIds { get;}
    }

    public class Word
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
