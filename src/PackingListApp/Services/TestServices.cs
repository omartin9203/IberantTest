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
    public class TestServices : BaseServices<TestModel, NewTestModel>, ITestServices
    {
        private readonly ITestRepository _repository;

        public TestServices(ITestRepository repository): base(repository) 
        {
            _repository = repository;
        }
    }
}
