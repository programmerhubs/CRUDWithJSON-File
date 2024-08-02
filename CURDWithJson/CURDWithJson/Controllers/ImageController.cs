using DomainLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer;
using static System.Net.Mime.MediaTypeNames;

namespace CURDWithJson.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly JsonFileService _jsonFileService;
        public ImageController(JsonFileService jsonFileService)
        {
            _jsonFileService = jsonFileService;
        }
        [HttpGet("AllImages")]
        public IActionResult GetImages()
        {
            return Ok(_jsonFileService.ReadImage());
        }
        [HttpPost("Add New")]
        public IActionResult NewImage([FromBody] ImgDetails image)
        {
            if (ModelState.IsValid)
            {
                var images = _jsonFileService.ReadImage();
                image.Id = images.Count + 1;
                images.Add(image);
                return Ok(_jsonFileService.WriteImageData(images));
            }
            else
            {
                return BadRequest("Provide valid information");

            }
        }
        [HttpPut("UpdateImage/{Id}")]
        public IActionResult UpdateImage(int Id, [FromBody] ImgDetails image)
        {
            if (ModelState.IsValid)
            {
                var images = _jsonFileService.ReadImage();
                var img=images.FirstOrDefault(x=>x.Id==Id);
                if(img==null)
                {
                    return NotFound("No Record Found");
                }
                else
                {
                    image.Id= img.Id;
                    img = image;
                 
                    _jsonFileService.WriteImageData(images);
                    return NoContent();

                }

            }
            else
            {
                return BadRequest("Provide valid information");
            }

        }
        [HttpDelete("DeleteImage/{Id}")]
        public IActionResult DeleteImage(int Id)
        {
            if (ModelState.IsValid)
            {
                var images = _jsonFileService.ReadImage();
                var img = images.FirstOrDefault(x => x.Id == Id);
                if (img == null)
                {
                    return NotFound("No Record Found");
                }
                else
                {
                    images.Remove(img);
                    _jsonFileService.WriteImageData(images);
                    return NoContent();

                }

            }
            else
            {
                return BadRequest("Provide valid information");

            }
        }
    }
}
