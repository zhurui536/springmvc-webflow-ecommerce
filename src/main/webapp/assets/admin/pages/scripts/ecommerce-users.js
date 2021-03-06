var EcommerceUsers = function () {

    var initPickers = function () {
        //init date pickers
        $('.date-picker').datepicker({
            rtl: Metronic.isRTL(),
            autoclose: true
        });
    }

    var handleUsers = function () {

        var grid = new Datatable();

        grid.init({
            src: $("#datatable_users"),
            onSuccess: function (grid) {
                // execute some code after table records loaded
            },
            onError: function (grid) {
                // execute some code on network or other general error  
            },
            loadingMessage: 'Loading...',
            dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 
                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/scripts/datatable.js). 
                // So when dropdowns used the scrollable div should be removed. 
                //"dom": "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r>t<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>",

                "lengthMenu": [
                    [10, 20, 50, 100, 150, -1],
                    [10, 20, 50, 100, 150, "All"] // change per page values here
                ],
                "pageLength": 10, // default record count per page
                "ajax": {
                    "url": "/admin/users/data", // ajax source
                },
                columns : [{
                    data : "id"
                },{
                    data : "username"
                },{
                    data: "email"
                },{
                    data: "fullName"
                },{
                    data: "lastLoginAccess"
                },{
                    data: "enabled",
                    render: function(data, type, row){
                        var className = row.enabled ? "label-success" : "label-danger";
                        var text = row.enabled ? "enabled" : "disabled";
                        return "<span class='label " + className + "'>"+ text +"</span>";
                    }
                },{
                    data: "actions",
                    render: function (data, type, row) {
                        var content = "<div class='btn-group btn-group-sm'>";
                        content += "<a href='"+_ctx+"/admin/users/edit/"+row.id+"' class='btn btn-sm btn-default btn-circle btn-editable'><i class='fa fa-pencil'></i> Edit</a>";
                        content += "<a href='"+_ctx+"/admin/users/remove/"+row.id+"' class='btn btn-sm btn-danger btn-circle btn-editable'><i class='fa fa-remove'></i> Remove</a>";
                        content += "</div>";
                        return content;
                    }
                }],
                "order": [
                    [4, "desc"]
                ] // set first column as a default sort by asc
            }
        });

        // handle group actionsubmit button click
        grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
            e.preventDefault();
            var action = $(".table-group-action-input", grid.getTableWrapper());
            if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
                grid.setAjaxParam("customActionType", "group_action");
                grid.setAjaxParam("customActionName", action.val());
                grid.setAjaxParam("id", grid.getSelectedRows());
                grid.getDataTable().ajax.reload();
                grid.clearAjaxParams();
            } else if (action.val() == "") {
                Metronic.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: 'Please select an action',
                    container: grid.getTableWrapper(),
                    place: 'prepend'
                });
            } else if (grid.getSelectedRowsCount() === 0) {
                Metronic.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: 'No record selected',
                    container: grid.getTableWrapper(),
                    place: 'prepend'
                });
            }
        });

    }

    return {

        //main function to initiate the module
        init: function () {

            initPickers();
            handleUsers();
        }

    };

}();