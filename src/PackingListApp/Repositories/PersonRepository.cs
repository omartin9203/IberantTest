using PackingListApp.DTO;
using PackingListApp.EntityFramework;
using PackingListApp.Interfaces.Repositories;
using PackingListApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PackingListApp.Repositories
{
    public class PersonRepository : BaseRepository<PersonModel, NewPersonModel>, IPersonRepository
    {
        private readonly TestContext _context;

        public PersonRepository(TestContext context): base(context)
        {
            _context = context;
        }
        public override PersonModel GetInstance(NewPersonModel model) 
        {
            return new PersonModel()
            {
                LastName = model.LastName,
                Name = model.Name,
                Occupation = model.Occupation,
            };
        }
    }
}
