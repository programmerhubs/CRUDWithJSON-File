using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Entities
{
    public  class ImgDetails
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage ="Enter Name")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Select Valid  Date")]
        
        public DateTime CreatedOn { get; set; }
        [Required(ErrorMessage = "Mandatory*")]
        public string Description { get; set; }
        [Required(ErrorMessage ="Mandatory*")]
        [Url(ErrorMessage ="Enter vaild URL")]
        public string URL { get; set; }
    }
}
