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
                var tokenCheck = context.TokenTables.Where(x => x.Username == data.Username).FirstOrDefault();
                if (tokenCheck != null)
                {
                    string[] temp2 = { check.Name, tokenCheck.Token, check.ID.ToString() };
                    return Ok(temp2);
                }
                else
                {
                    TokenTable token = new TokenTable();
                    token.Username = check.Username;

                    Random r = new Random();
                    int num = r.Next();           
                    token.Token = num.ToString();

                    context.TokenTables.Add(token);
                    context.SaveChanges();

                    string[] temp = { check.Name, token.Token, check.ID.ToString() };

                    return Ok(temp);
                }


            }
            string[] temp1 = { "userNotValid", "","" };
            return Ok(temp1);
        }

        [Route("api/signup"), HttpPost]
        public IHttpActionResult SignUp([FromBody] UserInfo data)
        {
            var check = context.UserInfoes.Where(x => x.Username == data.Username).FirstOrDefault();

            if (check != null)
            {
                return Ok("UserNameMatchFound");
            }

            Random r = new Random();
            int num = r.Next();
            data.UserConnectID = num.ToString();
            context.UserInfoes.Add(data);
            context.SaveChanges();
            return Ok("OK");
        }

        [Route("api/signup/usernameverify/{username}"), HttpGet]
        public IHttpActionResult UserNameVerify([FromUri] string username)
        {
            var check = context.UserInfoes.Where(x => x.Username == username).FirstOrDefault();

            if (check != null)
            {
                return Ok("matchFound");
            }

            return Ok("OK");
        }


        [Route("api/logout_fromother_device/{userName}/{token}"), HttpPut]
        public IHttpActionResult Messages([FromUri] string userName, [FromUri] string token)
        {
            var data = context.TokenTables.Where(x => x.Username == userName && x.Token==token).FirstOrDefault();

            Random r = new Random();
            int num = r.Next();
            data.Token = num.ToString();

            context.Entry(data).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();

            return Ok(data.Token);
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
            var messages = context.Messages.Where(x => x.ReceiverID ==ReceiverID && x.SenderID == SenderID || x.SenderID == ReceiverID && x.ReceiverID == SenderID).ToList();
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


            var messages = context.Messages.Where(x => x.ReceiverID == ReceiverID && x.SenderID == SenderID || x.SenderID == ReceiverID && x.ReceiverID == SenderID).ToList();
            return Ok(messages);
        }

        [Route("api/loginActivityStore"), HttpPost]
        public IHttpActionResult LoginActivity([FromBody]LoginActivity data)
        {

            var check = context.LoginActivities.Where(x => x.IP == data.IP && data.Address == data.Address).FirstOrDefault();

            if (check != null)
            {
                return Ok("alreadyExist");
            }

            context.LoginActivities.Add(data);
            context.SaveChanges();
            return Ok("OK");
        }

        [Route("api/loginActivity/{id}"), HttpGet]
        public IHttpActionResult LoginActivityGet([FromUri] int id)
        {
            var data = context.LoginActivities.Where(x => x.UserID == id).ToList();
            return Ok(data);
        }

        [Route("api/loginActivity/{dataID}"), HttpDelete]
        public IHttpActionResult LoginActivityRemoveSIngle([FromUri] int dataID)
        {
            context.LoginActivities.Remove(context.LoginActivities.Find(dataID));
            context.SaveChanges();
            return Ok("OK");
        }

        [Route("api/loginActivityAll/{UserID}"), HttpDelete]
        public IHttpActionResult LoginActivityRemoveAll([FromUri] int UserID)
        {
            var data = context.LoginActivities.Where(x => x.UserID == UserID);

            foreach (var delete in data)
            {
                context.LoginActivities.Remove(delete);
            }

            context.SaveChanges();
            return Ok("OK");
        }


    }
}