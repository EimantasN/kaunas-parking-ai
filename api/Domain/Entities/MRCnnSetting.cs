using System.Collections.Generic;

namespace Domain.Entities
{
    public class MRCnnSetting : TrackedEntity
    {
        public List<StreamSource> Sources { get; set; }
    }
}
