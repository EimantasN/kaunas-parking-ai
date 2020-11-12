using CarDetection.Enumerators;
using System;

namespace CarDetection.Models
{
    public class Match
    {
        public Guid UId { get; set; }

        public double Value { get; set; }

        public Colors Color { get; set; }

        public CarTypes Type { get; set; }

        public Match()
        {
            UId = new Guid();
        }

        // maybe loaded from ssh output???
        public Match(string line)
        { 
        }

        public static Match Random()
        {
            return new Match
            {
                UId = Guid.NewGuid(),
                Value = new Random(Guid.NewGuid().GetHashCode()).Next(0, 100),
                Color = (Colors)new Random(Guid.NewGuid().GetHashCode()).Next(0, Enum.GetNames(typeof(Colors)).Length),
                Type = (CarTypes)new Random(Guid.NewGuid().GetHashCode()).Next(0, Enum.GetNames(typeof(CarTypes)).Length),
            };
        }
    }
}
