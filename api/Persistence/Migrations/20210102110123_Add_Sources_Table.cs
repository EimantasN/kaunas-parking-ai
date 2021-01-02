using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Add_Sources_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rects_MRCnnSettings_MRCnnSettingId",
                table: "Rects");

            migrationBuilder.DropIndex(
                name: "IX_Rects_MRCnnSettingId",
                table: "Rects");

            migrationBuilder.DropColumn(
                name: "MRCnnSettingId",
                table: "Rects");

            migrationBuilder.DropColumn(
                name: "Source",
                table: "MRCnnSettings");

            migrationBuilder.AddColumn<int>(
                name: "StreamSourceId",
                table: "Rects",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Sources",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Url = table.Column<string>(nullable: true),
                    Miliseconds = table.Column<int>(nullable: false),
                    Current = table.Column<int>(nullable: false),
                    Increment = table.Column<int>(nullable: false),
                    Refresh = table.Column<bool>(nullable: false),
                    MRCnnSettingId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sources_MRCnnSettings_MRCnnSettingId",
                        column: x => x.MRCnnSettingId,
                        principalTable: "MRCnnSettings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rects_StreamSourceId",
                table: "Rects",
                column: "StreamSourceId");

            migrationBuilder.CreateIndex(
                name: "IX_Sources_MRCnnSettingId",
                table: "Sources",
                column: "MRCnnSettingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rects_Sources_StreamSourceId",
                table: "Rects",
                column: "StreamSourceId",
                principalTable: "Sources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rects_Sources_StreamSourceId",
                table: "Rects");

            migrationBuilder.DropTable(
                name: "Sources");

            migrationBuilder.DropIndex(
                name: "IX_Rects_StreamSourceId",
                table: "Rects");

            migrationBuilder.DropColumn(
                name: "StreamSourceId",
                table: "Rects");

            migrationBuilder.AddColumn<int>(
                name: "MRCnnSettingId",
                table: "Rects",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Source",
                table: "MRCnnSettings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rects_MRCnnSettingId",
                table: "Rects",
                column: "MRCnnSettingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rects_MRCnnSettings_MRCnnSettingId",
                table: "Rects",
                column: "MRCnnSettingId",
                principalTable: "MRCnnSettings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
