using PackingListApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PackingListApp.Interfaces
{
    public interface IBaseRepository<T, Z>
        where T: BaseModel
        where Z : class
    {
        List<T> GetAll();

        int Add(Z model);

        T Get(int id);

        T Update(int id, Z model);

        T Delete(int id);

        T GetInstance(Z model);
    }
}
