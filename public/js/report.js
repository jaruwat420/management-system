
get_datatable();

function get_datatable() {
    fetch('/dashboard/get_datatable_report')
        .then(res => res.json())
        .then(data => {

            if ($.fn.DataTable.isDataTable('#tbl_report')) {
                $('#tbl_report').DataTable().destroy();
            }
            dataTable = $('#tbl_report').DataTable({
                serverSide: false,
                data: data.res,
                searching: false,
                destroy: true,
                "ordering": false,
                columns: [
                    {
                        data: null,
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    { data: 'license', className: "nowrap" },
                    { data: 'tank_code', className: "nowrap" },
                    { data: 'brand', className: "nowrap" },
                    { data: 'model', className: "nowrap" },
                    { data: 'province', className: "nowrap"},
                    { data: 'auction_name', className: "nowrap" },
                    { data: 'auction_location', className: "nowrap" },
                    {
                        data: null,
                        render: function (data) {
                            if (data.over_thirty_days) {
                            return `<span class="btn-sm blink" style="color: red;"> เกินกำหนด ${data.over_thirty_days} วัน</span>`;
                            }
                        }
                    },
                ]
            });
        });

        // dataTable.ext.buttons.excelHtml5 = {
        //     className: 'buttons-excel buttons-html5',
        // }
}
