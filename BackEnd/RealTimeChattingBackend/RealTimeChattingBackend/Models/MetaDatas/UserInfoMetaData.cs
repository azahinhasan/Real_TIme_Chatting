using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.Xml.Serialization;

namespace RealTimeChattingBackend.Models.MetaDatas
{
    public class UserInfoMetaData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string UserConnectID { get; set; }
        public string Password { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        [JsonIgnore, XmlIgnore]
        public virtual ICollection<FriendsTable> FriendsTables { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        [JsonIgnore, XmlIgnore]
        public virtual ICollection<FriendsTable> FriendsTables1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        [JsonIgnore, XmlIgnore]
        public virtual ICollection<FriendRequest> FriendRequests { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        [JsonIgnore, XmlIgnore]
        public virtual ICollection<FriendRequest> FriendRequests1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        [JsonIgnore, XmlIgnore]
        public virtual ICollection<GroupInfo> GroupInfoes { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

       /* [JsonIgnore, XmlIgnore]
        public virtual ICollection<GroupMember> GroupMembers { get; set; }*/

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        [JsonIgnore, XmlIgnore]
        public virtual ICollection<GroupMsg> GroupMsgs { get; set; }
    }
}