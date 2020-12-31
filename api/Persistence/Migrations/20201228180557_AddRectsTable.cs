using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddRectsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rect_MRCnnSettings_MRCnnSettingId",
                table: "Rect");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rect",
                table: "Rect");

            migrationBuilder.RenameTable(
                name: "Rect",
                newName: "Rects");

            migrationBuilder.RenameIndex(
                name: "IX_Rect_MRCnnSettingId",
                table: "Rects",
                newName: "IX_Rects_MRCnnSettingId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rects",
                table: "Rects",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rects_MRCnnSettings_MRCnnSettingId",
                table: "Rects",
                column: "MRCnnSettingId",
                principalTable: "MRCnnSettings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rects_MRCnnSettings_MRCnnSettingId",
                table: "Rects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rects",
                table: "Rects");

            migrationBuilder.RenameTable(
                name: "Rects",
                newName: "Rect");

            migrationBuilder.RenameIndex(
                name: "IX_Rects_MRCnnSettingId",
                table: "Rect",
                newName: "IX_Rect_MRCnnSettingId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rect",
                table: "Rect",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rect_MRCnnSettings_MRCnnSettingId",
                table: "Rect",
                column: "MRCnnSettingId",
                principalTable: "MRCnnSettings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
