using System;

namespace Domain.Entities
{
    public class TrackedEntity : Entity
    {
        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }

        public TrackedEntity()
        {
            Created = DateTime.UtcNow;
            Updated = DateTime.UtcNow;
        }
    }
}
