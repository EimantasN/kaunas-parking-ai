using Newtonsoft.Json;
using System.Collections.Generic;

namespace CarDetection.Generics
{
    public class LimitedSize<T>
    {
        private readonly int Limit;

        private readonly List<T> Data = new List<T>();

        public LimitedSize(int limit)
        {
            Limit = limit;
        }

        public void Add(T model)
        {
            if (Data.Count > Limit)
            {
                Data.RemoveAt(0);
            }
            Data.Add(model);
        }

        // Dirty but fast and easy way to cup reference :(
        public List<T> GetAll() 
        {
            var serialized = JsonConvert.SerializeObject(Data);
            return JsonConvert.DeserializeObject<List<T>>(serialized);
        }
    }
}
