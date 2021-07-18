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

                string[]  temp = {check.Name,token.Token,check.ID.ToString()};

                 return Ok(temp);
                //return Json({"neme":""});

            }
            string[] temp1 = { "userNotValid", "","" };
            return Ok(temp1);

        }
        [Route("api/userauth/{name}"), HttpPost]
        public IHttpActionResult UserAuthCheck([FromBody]TokenTable data,[FromUri]string name)
        {

            var check = context.TokenTables.Where(x => x.Username == data.Username && x.Token == data.Token).FirstOrDefault();

            if (check != null)
            {
                var check2 = context.UserInfoes.Where(x => x.Username == data.Username && x.Name == name).FirstOrDefault();
                if (check2 != null)
                {
                    return Ok("userValid");
                }
                return Ok("userNotValid");
            }
            return Ok("userNotValid");

        }

        [Route("api/messages/{ReceiverID}/{SenderID}"), HttpGet]
        public IHttpActionResult Messages([FromUri]int ReceiverID, [FromUri]int SenderID)
        {
            var messages = context.Messages.Where(x => x.ReceiverID ==ReceiverID || x.SenderID == ReceiverID || x.SenderID == SenderID || x.ReceiverID == SenderID).ToList();
            return Ok(messages);
        }

        [Route("api/messages/{ReceiverID}/{SenderID}"), HttpPost]
        public IHttpActionResult MessagesSent([FromUri] int ReceiverID, [FromUri] int SenderID, [FromBody]Message data)
        {
            DateTime time = DateTime.Today;

            Message newMsg = new Message();
            newMsg.Msg = data.Msg;
            newMsg.ReceiverID = ReceiverID;
            newMsg.SenderID = SenderID;
            newMsg.Time = time.ToString();
            context.Messages.Add(newMsg);
            context.SaveChanges();


            var messages = context.Messages.Where(x => x.ReceiverID == ReceiverID || x.SenderID == ReceiverID || x.SenderID == SenderID || x.ReceiverID == SenderID).ToList();
            return Ok(messages);
        }


        [Route("api/friendsList/{ID}"), HttpGet]
        public IHttpActionResult Firends([FromUri] int ID)
        {
            var friends = context.FriendsTables.Where(x => x.Friend2ID == ID).ToList();
            return Ok(friends);
        }
    }
}