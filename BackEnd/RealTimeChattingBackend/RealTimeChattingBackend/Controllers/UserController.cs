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
            var check = context.FriendsTables.Where(x => x.Friend1ID == ReceiverID && x.Friend2ID == SenderID).FirstOrDefault();

            if (check != null)
            {
                return Ok("notFriend");
            }

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

        [Route("api/sentFriendReq/{friendKey}/{senderID}"), HttpPost]
        public IHttpActionResult Firends([FromUri]string friendKey, [FromUri]int senderID)
        {
            var check = context.UserInfoes.Where(x => x.UserConnectID == friendKey).FirstOrDefault();
            //RequstReciver is UserConnectID

            if (check== null)
            {
                 return Ok("User Not Found!");
                //return Ok(data.RequstReciver);
            }


            var check2 = context.FriendsTables.Where(x => x.Friend1ID == check.ID && x.Friend2ID==senderID || x.Friend2ID == check.ID && x.Friend1ID == senderID).FirstOrDefault();
            if (check2 != null)
            {
                return Ok("User Alreay is Your Friend!");
            }

            var check3 = context.FriendRequests.Where(x => x.RequstReciver == check.ID && x.RequstSender == senderID).FirstOrDefault();
            if (check3 != null)
            {
                return Ok("Friend Request Already Send!");
            }

            var check4 = context.FriendRequests.Where(x => x.RequstReciver == senderID && x.RequstSender == check.ID).FirstOrDefault();
            if (check4 != null)
            {
                return Ok("This User Alreay Send Your Friend Request!");
            }

            if(senderID == check.ID) 
            {
                return Ok("Cann't Send Friend Request to Own Account!");
            }


            FriendRequest data = new FriendRequest();

            data.Time = "";
            data.RequstSender = senderID;
            data.RequstReciver = check.ID;
            context.FriendRequests.Add(data);
            context.SaveChanges();

            return Ok("Friend Request Send!");
        }

        [Route("api/friendsRequstAction/{ID}"), HttpGet]
        public IHttpActionResult FirendsRequestActionList([FromUri] int ID)
        {
            var friendsReq = context.FriendRequests.Where(x => x.RequstReciver == ID).ToList();

            return Ok(friendsReq);
        }

        [Route("api/friendsRequstAction/{ReqAction}/{RequstID}"), HttpPost]
        public IHttpActionResult FirendsRequestAction([FromUri] int RequstID,[FromUri] string ReqAction)
        {
            var friends = context.FriendRequests.Where(x => x.ID == RequstID).FirstOrDefault();

            if (ReqAction=="accept")
            {
                return Ok("Friend Request Accpted!");
            }


            return Ok("Friend Request Rejected!");
        }
    }
}