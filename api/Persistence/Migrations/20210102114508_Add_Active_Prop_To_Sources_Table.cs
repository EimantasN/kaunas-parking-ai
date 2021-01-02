using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Add_Active_Prop_To_Sources_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rects_Sources_StreamSourceId",
                table: "Rects");

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Sources",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "StreamSourceId",
                table: "Rects",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Rects_Sources_StreamSourceId",
                table: "Rects",
                column: "StreamSourceId",
                principalTable: "Sources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rects_Sources_StreamSourceId",
                table: "Rects");

            migrationBuilder.DropColumn(
                name: "Active",
                table: "Sources");

            migrationBuilder.AlterColumn<int>(
                name: "StreamSourceId",
                table: "Rects",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Rects_Sources_StreamSourceId",
                table: "Rects",
                column: "StreamSourceId",
                principalTable: "Sources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
