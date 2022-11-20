$(document).ready(function () {

    var myDB;
//Open Database Connection
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});
    }

//Create new table
    $("#createTable").click(function () {
        myDB.transaction(function (transaction) {
            transaction.executeSql('CREATE TABLE IF NOT EXISTS phonegap_pro (id integer primary key, gedung text, noruangan text, kapasitas integer)', [], function (tx, result) {
                alert("Table berhasil dibuat");
            }, function (error) {
                alert("Terjadi kesalahan saat membuat table.");
            });
        });
    });

//Insert New Data
    $("#insert").click(function () {
        var geudung = $("#gedung").val();
        var noruangan = $("#noruangan").val();
        var kapasitas = $("#kapasitas").val();
        console.log(gedung + "" + noruangan + "" + kapasitas);
        myDB.transaction(function (transaction) {
            var executeQuery = "INSERT INTO phonegap_pro (gedung, noruangan, kapasitas) VALUES (?,?,?)";
            transaction.executeSql(executeQuery, [gedung, noruangan, kapasitas], function (tx, result) {
                alert('Data Berhasil Dimasukkan ');
            }, function (error) {
                alert('Terjadi Kesalahan');
            });
        });
    });

//Display Table Data
    $("#showTable").click(function () {
        $("#TableData").html("");
        myDB.transaction(function (transaction) {
            transaction.executeSql('SELECT * FROM phonegap_pro', [], function (tx, results) {
                var len = results.rows.length, i;
                $("#rowCount").html(len);
                for (i = 0; i < len; i++) {
                    $("#TableData").append("<tr><td>" + results.rows.item(i).id + "</td><td>" + results.rows.item(i).gedung + "</td><td>" + results.rows.item(i).noruangan + results.rows.item(i).kapasitas + "</td><td><a href='edit.html?id=" + results.rows.item(i).id + "&gedung=" + results.rows.item(i).gedung + "&noruangan=" + results.rows.item(i).noruangan + "&kapasitas=" + results.rows.item(i).kapasitas + "'>Edit</a> &nbsp;&nbsp; <a class='delete' href='#' id='" + results.rows.item(i).id + "'>Delete</a></td></tr>");
                }
            }, null);
        });
    });

//Delete Data from Database
    $(document.body).on('click', '.delete', function () {
        var id = this.id;
        myDB.transaction(function (transaction) {
            var executeQuery = "DELETE FROM phonegap_pro where id=?";
            transaction.executeSql(executeQuery, [id], //On Success
                function (tx, result) {
                    alert('Delete successfully');
                }, //On Error
                function (error) {
                    alert('Something went Wrong');
                });
        });
    });


//Delete Tables
    $("#update").click(function () {
        var id = $("#id").text();
        var title = $("#title").val();
        var desc = $("#desc").val()
        myDB.transaction(function (transaction) {
            var executeQuery = "UPDATE phonegap_pro SET gedung=?, noruangan=?, kapasitas=? WHERE id=?";
            transaction.executeSql(executeQuery, [title, desc, id], //On Success
                function (tx, result) {
                    alert('Berhasil menghapus data');
                }, //On Error
                function (error) {
                    alert('Gagal menghapus data');
                });
        });
    });

    $("#DropTable").click(function () {
        myDB.transaction(function (transaction) {
            var executeQuery = "DROP TABLE  IF EXISTS phonegap_pro";
            transaction.executeSql(executeQuery, [], function (tx, result) {
                alert('Table berhasil dihapus');
            }, function (error) {
                alert('Terjadi kesalahan saat menghapus table');
            });
        });
    });

});


