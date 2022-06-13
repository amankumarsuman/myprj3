function csvFileValidation(element) {
    var flag = 0;
    var fileUpload = document.getElementById(element);
    var reader = new FileReader();
    reader.onload = function (e) {
        var rows = e.target.result.split("\n");
        for (var i = 1; i < rows.length; i++) {
            var cells = rows[i].split(",");
            if(cells.length < 2){
               flag = 1;
               break;
            }
            for (var j = 0; j < cells.length; j++) {
                if (cells[j] == "" || cells[j] == "\r") {
                    window.alert("ERROR");
                    flag = 1;
                    break;
                }
            }
            if (flag == 1)
                break;
        }
        if (flag)
            window.alert("ERROR");
        else
            window.alert("VALIDATED");
    }
    reader.readAsText(fileUpload.files[0]);
}
export {csvFileValidation}