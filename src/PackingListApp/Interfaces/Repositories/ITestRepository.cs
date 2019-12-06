using PackingListApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PackingListApp.Interfaces.Repositories
{
    public interface ITestRepository: IBaseRepository<TestModel, NewTestModel>
    {
    }
}
