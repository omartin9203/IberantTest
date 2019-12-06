using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PackingListApp.Models
{
    public class PersonModel: BaseModel
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Occupation { get; set; }
    }
}
