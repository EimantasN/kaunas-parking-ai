using System.Collections.Generic;

namespace Domain.Entities
{
    public class MRCnnSetting : TrackedEntity
    {
        public string Source { get; set; }

        public List<Rect> Selected { get; set; }
    }
}
