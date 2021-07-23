using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RealTimeChattingBackend.Models;
using System.Web.Http;


namespace RealTimeChattingBackend.Controllers
{
    public class FriendsController : ApiController
    {
        Realtime_ChattingEntities context = new Realtime_ChattingEntities();


        [Route("api/friendsList/{ID}/{page}"), HttpGet]
        public IHttpActionResult Firends([FromUri] int ID, [FromUri] string page)
        {

            if (page == "list")
            {
                var friendsList = context.FriendsTables.Where(x => x.Friend2ID == ID && x.FriendStatus == "true").ToList();
                return Ok(friendsList);
            }

            var friends = context.FriendsTables.Where(x => x.Friend2ID == ID).ToList();
            return Ok(friends);
        }


        [Route("api/sentFriendReq/{friendKey}/{senderID}"), HttpPost]
        public IHttpActionResult Firends([FromUri] string friendKey, [FromUri] int senderID)
        {
            var check = context.UserInfoes.Where(x => x.UserConnectID == friendKey).FirstOrDefault();
            //RequstReciver is UserConnectID
            //  return Ok("User Not Found!");

            if (check == null)
            {
                return Ok("User Not Found!");
                //return Ok(data.RequstReciver);
            }


            var check2 = context.FriendsTables.Where(x => x.Friend1ID == check.ID && x.Friend2ID == senderID || x.Friend2ID == check.ID && x.Friend1ID == senderID).FirstOrDefault();
            if (check2 != null && check2.FriendStatus == "true")
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

            if (senderID == check.ID)
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

        [Route("api/friendsRequstAction/{ReqAction}/{RequstID}"), HttpPost]  //firend requst accipt
        public IHttpActionResult FirendsRequestAction([FromUri] int RequstID, [FromUri] string ReqAction)
        {
            var friendsreq = context.FriendRequests.Where(x => x.ID == RequstID).FirstOrDefault();

            if (ReqAction == "accept")
            {

                var checkFirend = context.FriendsTables.Where(x => x.Friend1ID == friendsreq.RequstReciver && x.Friend2ID == friendsreq.RequstSender).FirstOrDefault();
                var checkFirend2 = context.FriendsTables.Where(x => x.Friend2ID == friendsreq.RequstReciver && x.Friend1ID == friendsreq.RequstSender).FirstOrDefault();

                if (checkFirend != null && checkFirend2 != null)
                {
                    checkFirend.FriendStatus = "true";
                    checkFirend2.FriendStatus = "true";

                    context.Entry(checkFirend).State = System.Data.Entity.EntityState.Modified;
                    context.Entry(checkFirend2).State = System.Data.Entity.EntityState.Modified;
                    context.SaveChanges();
                }
                else
                {
                    FriendsTable friend1 = new FriendsTable();
                    FriendsTable friend2 = new FriendsTable();

                    friend1.Friend1ID = friendsreq.RequstReciver;
                    friend1.Friend2ID = friendsreq.RequstSender;
                    friend1.Time = "12-12-2020";
                    friend1.FriendStatus = "true";
                    context.FriendsTables.Add(friend1);

                    friend2.Friend1ID = friendsreq.RequstSender;
                    friend2.Friend2ID = friendsreq.RequstReciver;
                    friend2.Time = "12-12-2020";
                    friend2.FriendStatus = "true";
                    context.FriendsTables.Add(friend2);
                    context.SaveChanges();

                }

                context.FriendRequests.Remove(context.FriendRequests.Find(RequstID));
                context.SaveChanges();
                return Ok("Friend Request Accpted!");
            }

            context.FriendRequests.Remove(context.FriendRequests.Find(RequstID));
            context.SaveChanges();
            return Ok("Friend Request Rejected!");
        }




        [Route("api/friendValidition/{ReceiverID}/{SenderID}"), HttpGet]
        public IHttpActionResult FriendValidition([FromUri] int ReceiverID, [FromUri] int SenderID)
        {
            var check = context.FriendsTables.Where(x => x.Friend1ID == ReceiverID && x.Friend2ID == SenderID || x.Friend1ID == SenderID && x.Friend2ID == ReceiverID).FirstOrDefault();

            if (check == null || check.FriendStatus == "false" || check.FriendStatus == null)
            {
                return Ok("notFriend");
            }

            return Ok("Friend");
        }

        [Route("api/unfriend/{ReceiverID}/{SenderID}"), HttpPost]
        public IHttpActionResult Unfriend([FromUri] int ReceiverID, [FromUri] int SenderID)
        {
            var check1 = context.FriendsTables.Where(x => x.Friend1ID == ReceiverID && x.Friend2ID == SenderID).FirstOrDefault();
            var check2 = context.FriendsTables.Where(x => x.Friend1ID == SenderID && x.Friend2ID == ReceiverID).FirstOrDefault();



            if (check2 != null && check1 != null)
            {
                check1.FriendStatus = "false";
                context.Entry(check1).State = System.Data.Entity.EntityState.Modified;

                check2.FriendStatus = "false";
                context.Entry(check2).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
            }



            return Ok("OK");
        }


        [Route("api/groups/messages/{groupID}"), HttpGet]
        public IHttpActionResult GroupMessages([FromUri] int groupID)
        {
            var messages = context.GroupInfoes.Where(x => x.ID == groupID).ToList();
            return Ok(messages);

        }

        [Route("api/groups/list/{userID}"), HttpGet]
        public IHttpActionResult GroupNameOfUser([FromUri] int userID)
        {
            var groups = context.GroupInfoes.Where(x => x.UserInfo.ID == userID).ToList();
            return Ok(groups);

        }
/*
        [Route("api/groups/memberValidation/{userID}/{groupID}"), HttpGet]
        public IHttpActionResult GroupNameOfUser([FromUri] int userID)
        {
            var groups = context.GroupMembers.Where(x => x.UserID == userID).ToList();
            return Ok(groups);

        }*/

    }    
}