using System.Collections.Generic;

namespace Domain.Entities
{
    public class StreamSource : Entity
    {
        public string Url { get; set; }

        public int Miliseconds { get; set; }

        public int Current { get; set; }

        public int Increment { get; set; }

        public bool Refresh { get; set; }

        public List<Rect> Selected { get; set; }

        public virtual int MRCnnSettingId { get; set; }

        public int Next()
        {
            return Current + Increment;
        }
    }
}
