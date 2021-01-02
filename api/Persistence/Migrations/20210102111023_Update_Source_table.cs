using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Update_Source_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sources_MRCnnSettings_MRCnnSettingId",
                table: "Sources");

            migrationBuilder.AlterColumn<int>(
                name: "MRCnnSettingId",
                table: "Sources",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Sources_MRCnnSettings_MRCnnSettingId",
                table: "Sources",
                column: "MRCnnSettingId",
                principalTable: "MRCnnSettings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sources_MRCnnSettings_MRCnnSettingId",
                table: "Sources");

            migrationBuilder.AlterColumn<int>(
                name: "MRCnnSettingId",
                table: "Sources",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Sources_MRCnnSettings_MRCnnSettingId",
                table: "Sources",
                column: "MRCnnSettingId",
                principalTable: "MRCnnSettings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
