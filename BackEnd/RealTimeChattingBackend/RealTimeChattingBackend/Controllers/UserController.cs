using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RealTimeChattingBackend.Models;
using System.Web.Http;

namespace RealTimeChattingBackend.Controllers
{
    public class UserController : ApiController
    {
        Realtime_ChattingEntities context = new Realtime_ChattingEntities();
        // GET: User
        [Route("api/login"), HttpPost]
        public IHttpActionResult UserAndOrderInfo([FromBody] UserInfo data)
        {
            var check = context.UserInfoes.Where(x => x.Username == data.Username && x.Password == data.Password).FirstOrDefault();
            if (check != null)
            {
                TokenTable token = new TokenTable();
                token.Username = check.Username;
                token.Token = "123";

                context.TokenTables.Add(token);
                context.SaveChanges();

                return Ok("userValid");

            }
            return Ok("userNotValid");

        }
    }
}