using Microsoft.EntityFrameworkCore;
using PackingListApp.EntityFramework;
using PackingListApp.Interfaces;
using PackingListApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PackingListApp.Repositories
{
    public abstract class BaseRepository<T, Z> : IBaseRepository<T, Z>
        where T: BaseModel
        where Z: class
    {
        private readonly TestContext _context;
        public BaseRepository(TestContext context)
        {
            _context = context;
        }
        public int Add(Z model)
        {
            var newEntity = _context.Set<T>().Add(this.GetInstance(model));
            _context.SaveChanges();
            return newEntity.Entity.Id;
        }

        public T Delete(int id)
        {
            var entity = _context.Set<T>().FirstOrDefault(t => t.Id == id);
            var res = _context.Set<T>().Remove(entity).Entity;
            _context.SaveChanges();
            return res;
        }

        public T Get(int id)
        {
            return _context.Set<T>().FirstOrDefault(t => t.Id == id);
        }

        public List<T> GetAll()
        {
            return _context.Set<T>().ToList();
        }

        public T Update(int id, Z model)
        {
            var entity = GetInstance(model);
            entity.Id = id;
            _context.Set<T>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
            return entity;
        }
        public abstract T GetInstance(Z model);
    }
}
