using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PackingList.Core.Queries;
using PackingListApp.DTO;
using PackingListApp.Interfaces;
using PackingListApp.Models;

namespace PackingListApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly IPersonServices _services;

        public PersonController(IPersonServices services)
        {
            _services = services;
        }
        // GET: api/Person
        [HttpGet]
        public IActionResult Get(ODataQueryOptions<PersonModel> options)
        {
            var list = _services.GetAll();
            return Ok(new QueryResult<PersonModel>(list, list.Count));
        }

        // GET: api/Person/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_services.Get(id));
        }

        // POST: api/Person
        [HttpPost]
        public IActionResult Post([FromBody] NewPersonModel value)
        {
            var id = _services.Add(value);
            return Ok(new CommandHandledResult(true, id.ToString(), id.ToString(), id.ToString()));

        }

        // PUT: api/Person/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] NewPersonModel value)
        {
            return Ok(_services.Update(id, value));
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(_services.Delete(id));
        }
    }
}