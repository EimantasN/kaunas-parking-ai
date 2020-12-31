using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MRCnnSettings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Created = table.Column<DateTime>(nullable: false),
                    Updated = table.Column<DateTime>(nullable: false),
                    Source = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MRCnnSettings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rect",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    x1 = table.Column<int>(nullable: false),
                    y1 = table.Column<int>(nullable: false),
                    x2 = table.Column<int>(nullable: false),
                    y2 = table.Column<int>(nullable: false),
                    MRCnnSettingId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rect", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rect_MRCnnSettings_MRCnnSettingId",
                        column: x => x.MRCnnSettingId,
                        principalTable: "MRCnnSettings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rect_MRCnnSettingId",
                table: "Rect",
                column: "MRCnnSettingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rect");

            migrationBuilder.DropTable(
                name: "MRCnnSettings");
        }
    }
}
