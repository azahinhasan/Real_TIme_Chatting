//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RealTimeChattingBackend.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class GroupInfo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public GroupInfo()
        {
            this.GroupMsgs = new HashSet<GroupMsg>();
        }
    
        public int ID { get; set; }
        public string GroupName { get; set; }
        public Nullable<int> CreatorID { get; set; }
        public Nullable<int> CurrentMemberNum { get; set; }
        public Nullable<int> Maxmember { get; set; }
        public string GroupType { get; set; }
    
        public virtual UserInfo UserInfo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GroupMsg> GroupMsgs { get; set; }
    }
}
