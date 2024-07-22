using Microsoft.AspNetCore.Mvc;
using Fetch.Models;

namespace Fetch.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class SongsController : ControllerBase
    {
        // GET: api/<SongsController>

        //[HttpGet(Name = "Names")]
        //public async Task<IEnumerable<string>> Names()
        //{

        //    return new string[] { "disco", "rock" };
        //}

        [HttpGet(Name = "All")]
        public async Task<IEnumerable<Song>> All()
        {

            string path = @"C:\temp\disco.wav";
            FileInfo info = new FileInfo(path);
            byte[] bytess = new byte[info.Length];

            bytess = await System.IO.File.ReadAllBytesAsync(path);

            Song s1 = new Song() { Id = 1, Name = "disco", DateCreated = DateTime.Now, Data = bytess };
            return new List<Song> { s1 };

   
    }
        
        [HttpGet("{id}")]
        public async Task<FileContentResult> Get(long id)
        {

            string path = @"C:\temp\disco.wav";
            FileInfo info = new FileInfo(path);
            byte[] bytess = new byte[info.Length];

            bytess = await System.IO.File.ReadAllBytesAsync(path);
            // File f = new File(bytess, "audio/mpeg,ugotItAll.wav");

            return File(bytess, "audio/wav", "disco.wav");



        }


        /*

        [HttpGet(Name = "ByName")]
        public async Task<FileContentResult> ByName()
        {

            string path = @"C:\temp\disco.wav";
            FileInfo info = new FileInfo(path);
            byte[] bytess = new byte[info.Length];

            bytess = await System.IO.File.ReadAllBytesAsync(path);
            //TODO: filename from FileInfo
            return File(bytess, "audio/mpeg", "disco.wav");

            // File f = new File(bytess, "audio/mpeg,ugotItAll.wav");
            //return new FileContentResult(attachment.File, 
            //MimeTypeMap.GetMimeType(attachment.FileExtension))
            //{
            //    FileDownloadName = $"{attachment.NomeFile}.{attachment.FileExtension}"
            //};
            //return new MemoryStream(10).GetBuffer();


        }
        */

        // GET api/<SongsController>/5
        [HttpGet("{id}/{fileid}")]
        public ActionResult GetFile(long id, string fileid)
        {
            // UgotItALL

            string path = @"C:\temp\disco.wav";
            FileInfo info = new FileInfo(path);
            byte[] bytess = new byte[info.Length];

            //System.IO.File.WriteAllBytes(path, bytess);
            bytess = System.IO.File.ReadAllBytes(path);

            return File(bytess, "audio/wav,disco.wav");

        }

        // POST api/<SongsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SongsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SongsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
