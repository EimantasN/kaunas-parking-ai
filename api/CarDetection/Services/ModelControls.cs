using CarDetection.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDetection.Services
{
    public class ModelControls : IModelControls
    {
        public int ActiveSource { get; set; }

        private readonly CIDMDbContext context;

        public StreamSource Source { get; set; }

        private Dictionary<int, HashSet<Rect>> SelectedRects { get; set; }

        public ModelControls(CIDMDbContext context)
        {
            this.context = context;
            SelectedRects = new Dictionary<int, HashSet<Rect>>();
            Source = new StreamSource();
        }

        public async Task<bool> SetActive(int source)
        {
            var sourceModel = await context.Sources
                .AsNoTracking()
                .FirstAsync(x => x.Id == source);

            var model = await context.MRCnnSettings
                .Include(x => x.Sources)
                .FirstAsync();

            model.Sources.ForEach(x => { x.Active = x.Id == source ? true : false; });

            Source = model.Sources.First(x => x.Active);

            await context.SaveChangesAsync();

            ActiveSource = source;

            return true;
        }

        public async Task<List<Rect>> ActiveAllSelected()
        {
            if (ActiveSource == 0) 
            {
                var model = await context.MRCnnSettings
                    .Include(x => x.Sources)
                    .FirstAsync();

                ActiveSource = model.Sources.Single(x => x.Active).Id;
                Source = model.Sources.First(x => x.Active);
            }

            return await AllSelected(ActiveSource);
        }

        public async Task<List<Rect>> AllSelected(int source)
        {
            if (!SelectedRects.ContainsKey(source))
            {
                var sourceModel = await this.context.Sources
                    .Include(x => x.Selected)
                    .AsNoTracking()
                    .FirstAsync(x => x.Id == source);
                SelectedRects.Add(source, new HashSet<Rect>(sourceModel.Selected));
            }

            return SelectedRects[source].ToList();
        }

        public async Task<bool> Selected(List<Rect> selected, int source)
        {
            SelectedRects[source] = new HashSet<Rect>(selected);

            var current = await this.context.Sources
                .Include(x => x.Selected)
                .FirstOrDefaultAsync(x => x.Id == source);

            if (current == null)
                return false;

            this.context.Rects.RemoveRange(current.Selected);

            selected.ForEach(x => { x.Id = 0; });

            current.Selected = selected;

            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<List<StreamSource>> GetSources()
        {
            var model = await context.MRCnnSettings
                .AsNoTracking()
                .Include(x => x.Sources)
                .FirstAsync();

            if (model.Sources.Count == 0)
                return new List<StreamSource>();

            var active = model.Sources.FirstOrDefault(x => x.Active);
            if (active == null)
            {
                var source = context.Sources.First(x => x.Id == model.Sources[0].Id);
                source.Active = true;
                await context.SaveChangesAsync();

                return await GetSources();
            }

            ActiveSource = model.Sources.First().Id;

            return model.Sources;
        }
    }
}
