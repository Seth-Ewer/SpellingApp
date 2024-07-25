namespace SpellingApp.Server.Models
{
    public class Classroom
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<Guid> TestIds { get; set; } = new List<Guid>();
    }

    public class Student
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<Guid> ClassroomIds { get; set; } = new List<Guid>();
    }

    public class Test
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<Guid> WordIds { get; set; } = new List<Guid>();
    }

    public class Word
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = "";

    }

    public class Grade
    {
        //TODO: Handle removing grades for lists, classes, students that don't exist anymore
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public Guid StudentId { get; set; }
        public Guid ClassroomId { get; set; }
        public Guid TestId { get; set; }
        public Dictionary<Guid, int> Scores { get; set; } = new Dictionary<Guid, int>();
        //For later: Update and do version correction on finishing a test

    }
}
