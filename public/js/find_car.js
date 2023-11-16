$(document).ready(function () {
    $('#myTable').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]
    } );
});

// find CarLicense
$('#addBtn').click(function (e) { 
    alert(1111);
});