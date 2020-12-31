namespace Domain.Entities
{
    public class Rect : Entity
    {
        public int x1 { get; set; }
        public int y1 { get; set; }
        public int x2 { get; set; }
        public int y2 { get; set; }

        public override bool Equals(object obj)
        {
            Rect rect = obj as Rect;
            return this.x1 == rect.x1 &&
                this.y1 == rect.y1 &&
                this.x2 == rect.x2 &&
                this.y2 == rect.y2;
        }

        public override int GetHashCode()
        {
            return x1.GetHashCode() 
                + y1.GetHashCode() 
                + x2.GetHashCode() 
                + y2.GetHashCode();
        }
    }
}
