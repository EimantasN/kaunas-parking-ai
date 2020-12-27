namespace Domain.Entities
{
    public class MlModel : TrackedEntity
    {
        public string Path { get; set; }

        public string Name { get; set; }

        public StreamSource Stream { get; set; }
    }
}
