using PackingListApp.DTO;
using PackingListApp.EntityFramework;
using PackingListApp.Interfaces;
using PackingListApp.Interfaces.Repositories;
using PackingListApp.Models;
using PackingListApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PackingListApp.Services
{
    public class PersonServices: BaseServices<PersonModel, NewPersonModel>, IPersonServices
    {
        private readonly IPersonRepository _repository;

        public PersonServices(IPersonRepository repository): base(repository)
        {
            _repository = repository;
        }
    }
}
