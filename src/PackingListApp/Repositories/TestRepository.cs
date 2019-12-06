using PackingListApp.EntityFramework;
using PackingListApp.Interfaces.Repositories;
using PackingListApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PackingListApp.Repositories
{
    public class TestRepository: BaseRepository<TestModel, NewTestModel>, ITestRepository
    {
        private readonly TestContext _context;

        public TestRepository(TestContext context) : base(context)
        {
            _context = context;
        }
        public override TestModel GetInstance(NewTestModel model)
        {
            return new TestModel()
            {
                Title = model.Title,
                Description = model.Description,
            };
        }
    }
}
