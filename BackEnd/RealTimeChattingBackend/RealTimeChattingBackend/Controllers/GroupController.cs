using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RealTimeChattingBackend.Models;
using System.Web.Http;


namespace RealTimeChattingBackend.Controllers
{
    public class GroupController : ApiController
    {
        Realtime_ChattingEntities context = new Realtime_ChattingEntities();

        [Route("api/groups/info/{groupID}"), HttpGet]
        public IHttpActionResult GroupInfo([FromUri] int groupID)
        {
            var messages = context.GroupInfoes.Where(x => x.ID == groupID).FirstOrDefault();
            return Ok(messages);

        }

        [Route("api/groups/list/{userID}"), HttpGet]
        public IHttpActionResult GroupNameOfUser([FromUri] int userID)
        {
            var groups = context.GroupMembers.Where(x => x.UserID == userID).ToList();
            return Ok(groups);

        }


        [Route("api/groups/sendmessage/{GroupID}/{SenderID}"), HttpPost]
        public IHttpActionResult MessagesSent([FromUri] int SenderID, [FromUri] int GroupID, [FromBody] GroupMsg data)
        {


            DateTime time = DateTime.Today;

            GroupMsg newMsg = new GroupMsg();

            byte[] msg = System.Text.ASCIIEncoding.ASCII.GetBytes(data.Msg);
            newMsg.Msg = System.Convert.ToBase64String(msg);

          //  newMsg.Msg = data.Msg;
            newMsg.SenderID = SenderID;
            newMsg.GroupID = GroupID;
            //newMsg.Time = time.ToString();
            context.GroupMsgs.Add(newMsg);
            context.SaveChanges();


            //var groupInfo = context.GroupInfoes.Where(x => x.ID == GroupID).FirstOrDefault();
            return Ok("OK");
        }

        [Route("api/groups/memberValidation/{userID}/{groupID}"), HttpGet]
        public IHttpActionResult GroupMemberVerify([FromUri] int userID, [FromUri] int groupID)
        {
            var groups = context.GroupMembers.Where(x => x.UserID == userID && x.GroupID == groupID).FirstOrDefault();

            if (groups != null)
            {
                return Ok(groups.Rank);
            }

            return Ok("notMember");


        }

        [Route("api/groups/joingroup/{userID}/{groupIDFromUser}"), HttpPost]
        public IHttpActionResult JoinGroup([FromUri] int userID, [FromUri] string groupIDFromUser)
        {
            int groupID = Int32.Parse(groupIDFromUser);


            var checkGroup = context.GroupInfoes.Where(x => x.ID == groupID).FirstOrDefault();

            if (checkGroup == null)
            {
                return Ok("Group Key is Not Valid!");
            }


            var checkMember = context.GroupMembers.Where(x => x.UserID == userID && x.GroupID == groupID).FirstOrDefault();

            if (checkMember != null)
            {
                if (checkMember.Rank == "member")
                {
                    return Ok("You are already a Member!");
                }
                else
                {
                    return Ok(SendJoinGroupRequest(groupID, userID, checkMember,"notAccpt"));
                }
            }
            else
            {
                return Ok(SendJoinGroupRequest(groupID, userID, null, "notAccpt"));
            }

            // return Ok("Request Send!");

        }

        protected string SendJoinGroupRequest(int groupId, int userId, GroupMember checkMember,string action)
        {

            var groupData = context.GroupInfoes.Where(x => x.ID == groupId).FirstOrDefault();

            if (groupData.GroupType == "open" || action == "accept")
            {
                if (checkMember != null)
                {
                    checkMember.Rank = "member";
                    context.Entry(checkMember).State = System.Data.Entity.EntityState.Modified;
                    context.SaveChanges();
                }
                else
                {
                    //return "cc";
                  
                    GroupMember gm = new GroupMember();
                    gm.GroupID = groupId;
                    gm.UserID = userId;
                    gm.Rank = "member";
                    gm.GroupName = groupData.GroupName;
                    context.GroupMembers.Add(gm);
                    context.SaveChanges();
                }



                return "Added To That Group!";
            }
            else
            {
                GroupRequest gr = new GroupRequest();

                gr.UserID = userId;
                gr.GroupID = groupId;
                context.GroupRequests.Add(gr);
                context.SaveChanges();
            }
            return "Request Send!";
        }


         [Route("api/groups/members/{groupID}"), HttpGet]
        public IHttpActionResult GroupMamberList([FromUri] int groupID)
        {
            return Ok(context.GroupMembers.Where(x => x.GroupID == groupID && x.Rank != "not_member").ToList());
        }


        [Route("api/groups/joinrequest/{groupID}"), HttpGet]
        public IHttpActionResult GroupMamberRequest([FromUri] int groupID)
        {
            return Ok(context.GroupRequests.Where(x => x.GroupID == groupID).ToList());
           
        }

        [Route("api/groups/joinrequest/action/{groupID}/{adminID}/{reqSender}/{actionType}"), HttpPost]
        public IHttpActionResult GroupMamberRequest([FromUri] int groupID, [FromUri] int adminID, [FromUri] int reqSender, [FromUri] string actionType)
        {
            var data = context.GroupRequests.Where(x => x.GroupID == groupID && x.UserID == reqSender).FirstOrDefault();
            var prevMember = context.GroupMembers.Where(x => x.GroupID == groupID && x.UserID == reqSender).FirstOrDefault();
            var msg = "";

            if (actionType == "accept")
            {
                if (prevMember != null)
                {

                    msg = SendJoinGroupRequest(groupID, reqSender, prevMember, "accept");
                  // return Ok(msg);
                }

                else
                {
     
                    msg = SendJoinGroupRequest(groupID, reqSender, null, "accept");
                 //   return Ok(msg);
                }

/*                context.GroupRequests.Remove(data);
                context.SaveChanges();*/
            }

            context.GroupRequests.Remove(context.GroupRequests.Find(data.ID));
            context.SaveChanges();

            //return Ok("OK");
            return Ok(GroupMamberRequest(groupID));
        }


        [Route("api/groups/removeMember/{groupID}/{removeUserID}/{userID}"), HttpPost]
        public IHttpActionResult RemoveMemberFromGroup([FromUri] int groupID, [FromUri] int removeUserID, [FromUri] int userID) 
        {

            var verifyAdmin = context.GroupInfoes.Where(x => x.CreatorID == userID && x.ID == groupID).FirstOrDefault();

            if (verifyAdmin!= null)
            {


                var verify = context.GroupInfoes.Where(x => x.CreatorID == removeUserID && x.ID == groupID).FirstOrDefault();

                if (verify != null)
                {
                    var data = context.GroupMsgs.Where(x => x.GroupID == groupID);

                    foreach (var delete in data)
                    {
                        context.GroupMsgs.Remove(delete);
                    }

                    var data2 = context.GroupMembers.Where(x => x.GroupID == groupID);

                    foreach (var delete in data2)
                    {
                        context.GroupMembers.Remove(delete);
                    }

                    var data3 = context.GroupRequests.Where(x => x.GroupID == groupID);

                    foreach (var delete in data3)
                    {
                        context.GroupRequests.Remove(delete);
                    }

                    context.GroupInfoes.Remove(context.GroupInfoes.Find(groupID));

                    context.SaveChanges();

                    return Ok("groupDistorted");

                }

                var find = context.GroupMembers.Where(x => x.UserID == removeUserID && x.GroupID == groupID).FirstOrDefault();

                find.Rank = "not_member";

                context.Entry(find).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
                return Ok("OK");
            }
            else
            {

                
            }

           

            return Ok("notOK");
        }

        [Route("api/groups/create"), HttpPost]
        public IHttpActionResult CreateGroup([FromBody] GroupInfo data)
        {
            

            context.GroupInfoes.Add(data);
            context.SaveChanges();

            GroupMember gm = new GroupMember();
            gm.GroupID = data.ID;
            gm.UserID = data.CreatorID;
            gm.Rank = "member";
            gm.GroupName = data.GroupName;
            context.GroupMembers.Add(gm);


            context.SaveChanges();


            return Ok("OK");
        }
    }
}