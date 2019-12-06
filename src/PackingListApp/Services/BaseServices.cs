using PackingListApp.EntityFramework;
using PackingListApp.Interfaces;
using PackingListApp.Models;
using PackingListApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PackingListApp.Services
{
    public class BaseServices<T, Z>: IBaseServices<T, Z>
        where T : BaseModel
        where Z : class
    {
        private readonly IBaseRepository<T, Z> _repository;

        public BaseServices(IBaseRepository<T, Z> repository)
        {
            _repository = repository;
        }

        public int Add(Z testmodel)
        {
            return _repository.Add(testmodel);
        }

        public T Delete(int id)
        {
            return _repository.Delete(id);
        }

        public T Get(int id)
        {
            return _repository.Get(id);
        }

        public List<T> GetAll()
        {
            return _repository.GetAll();
        }

        public T Update(int id, Z model)
        {
            return _repository.Update(id, model);
        }
    }
}
