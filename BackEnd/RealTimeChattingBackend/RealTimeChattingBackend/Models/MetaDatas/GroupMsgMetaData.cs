using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.Xml.Serialization;

namespace RealTimeChattingBackend.Models.MetaDatas
{
    public class GroupMsgMetaData
    {
        public int ID { get; set; }
        public string Msg { get; set; }
        public Nullable<int> GroupID { get; set; }
        public Nullable<int> SenderID { get; set; }
        [JsonIgnore, XmlIgnore]
        public virtual GroupInfo GroupInfo { get; set; }

        public virtual UserInfo UserInfo { get; set; }
    }
}