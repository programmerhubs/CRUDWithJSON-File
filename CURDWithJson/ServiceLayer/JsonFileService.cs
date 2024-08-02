using DomainLayer.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public class JsonFileService
    {
        private readonly string _filePath;
        public JsonFileService(string filepath)
        {
            var path = System.Environment.CurrentDirectory;
            _filePath =Path.Combine(path,filepath);

        }
        public List<ImgDetails> ReadImage()
        {
            if (!File.Exists(_filePath))
            {
                return new List<ImgDetails>();
            }
            try
            {
                string jsonImage = File.ReadAllText(_filePath);
                if (string.IsNullOrEmpty(jsonImage) || jsonImage.Trim() == "{}")
                {
                    return new List<ImgDetails>();
                }
                else
                {
                    List<ImgDetails> images = JsonConvert.DeserializeObject<List<ImgDetails>>(jsonImage);
                    return images ?? new List<ImgDetails>();

                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error Reading Json File data", ex);

            }
        }
        public int WriteImageData(List<ImgDetails> images)
        {
            int retval = 0;
            try
            {
                string json = JsonConvert.SerializeObject(images, Formatting.Indented);
                if (!File.Exists(_filePath))
                {
                    File.Create(_filePath);
                }
                File.WriteAllText( _filePath,json);
                retval = 1;
            }
            catch(Exception ex)
            {
                retval = -1;
                throw new Exception("Error Writing Json File data", ex);
                
            }
            return retval;
        }
    }
}
