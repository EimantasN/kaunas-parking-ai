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
        private readonly CIDMDbContext context;

        private HashSet<Rect>? SelectedRects { get; set; }

        public ModelControls(CIDMDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Rect>> AllSelected()
        {
            if (SelectedRects == null)
            {
                SelectedRects = new HashSet<Rect>(await this.context.Rects
                .ToListAsync());
            }

            return SelectedRects.ToList();
        }

        public async Task<bool> Selected(List<Rect> selected)
        {
            SelectedRects = new HashSet<Rect>(selected);

            var current = await this.context.Rects
                .ToListAsync();

            this.context.RemoveRange(current);

            this.context.Rects.AddRange(SelectedRects.ToList());
            await this.context.SaveChangesAsync();
            return true;
        }
    }
}
