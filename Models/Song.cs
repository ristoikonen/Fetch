using System.Text.Json;

namespace Fetch.Models
{
    public class Song
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public DateTime DateCreated { get; set; }

        public byte[]? Data { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }

    }
}
