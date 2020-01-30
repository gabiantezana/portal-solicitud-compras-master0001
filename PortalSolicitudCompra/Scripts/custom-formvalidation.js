var bootboxValid = null;

function maskLoader(element, active) {
    var ContentLoader = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
    var ContentButton = '<span class="nav-icon"><i class="material-icons">save</i></span> Guardar';
    element.html(active ? ContentLoader : ContentButton);
    if (active)
        element.attr("disabled", "disabled");
    else
        element.removeAttr("disabled");
}
function setCheckboxes() {
    $(document).on("change", ".cbx-event-main", function (e) {
        var elParent = $(this).attr("data-parent");
        var elChilds = $(this).attr("data-childs");
        var boolCheck = false;
        if ($(this).is(":checked")) {
            boolCheck = true;
        }
        var Childs = elChilds.split(",");
        for (var i = 0; i < Childs.length; i++) {
            $(elParent).find(Childs[i]).prop("checked", boolCheck);
            $(elParent).find(Childs[i]).val(boolCheck ? '1' : '0');
        }
    });
    $(document).on("change", ".cbx-event-main,.row_permisos", function (e) {
        $(this).val('0');
        if ($(this).is(":checked")) $(this).val('1');
    });
}
function resetModalReqAddItem(button) {
    debugger;

    $(".parsley-errors-list").remove();
    $(".parsley-error").removeClass("parsley-error");
    $("#requestAddItem #ItemFec").val($("#fechaVencimiento").val());
    $("#requestAddItem #ItemCan").val('');
    $("#requestAddItem #ItemCom").val('');

    if ($('#tipoSolicitud').val() === "A") {
        $("#requestAddItem #ItemTip").val("Articulo");
        $("#requestAddItem #ItemCod").prop("disabled", false);
        $("#requestAddItem #ItemCod").val('-1');
        $("#requestAddItem #ItemDes").val('');

        $("#requestAddItem #proyectoId").val('-1');
        $("#requestAddItem #almacenId").val('-1');
        $("#requestAddItem #unidadMedida").val('-1');
        $("#requestAddItem #sedeId").val('-1');
        $("#requestAddItem #centroCostoId").val('-1');
        $("#requestAddItem #dimensionCostoId").val('-1');


    } else if ($('#tipoSolicitud').val() === "S") {
        $("#requestAddItem #ItemTip").val('Servicio');
        $("#requestAddItem #ItemCod").prop("disabled", true);
        $("#requestAddItem #ItemCod").empty();
        $("#requestAddItem #ItemDes").val('');
    }

    $("#requestAddItem #almacenId").html('<option disabled selected value="-1"> Seleccione... </option>');
    $.ajax({
        type: 'POST',
        url: base_url('Almacen/GetList'),
        dataType: 'json',
        data: {},
        success: function (list) {
            $.each(list, function (i, list) {
                $("#requestAddItem #almacenId").append('<option value="' + list.Value + '" title="' + list.Value + '">' +
                    (list.Value + " - " + list.Text) + '</option>');

                if (button) {
                    var id, cSap, des, fec, cant, comm, _proyectoId, _almacenId, _unidadMedida, _sedeId, _centroCostoId, _dimensionCostoId;

                    //Capturar los valores de la fila
                    $(button.closest('tr')).each(function () {
                        id = $(this).find(".id").html();
                        cSap = $(this).find(".csap").html();
                        des = $(this).find(".des").html();
                        fec = $(this).find(".fec").html();
                        cant = $(this).find(".cant").html();
                        comm = $(this).find(".comm").html();
                        _proyectoId = $(this).find(".proyectoId").html();
                        _almacenId = $(this).find(".almacenId").html();
                        _unidadMedida = $(this).find(".unidadMedida").html();
                        _sedeId = $(this).find(".sedeId").html();
                        _centroCostoId = $(this).find(".centroCostoId").html();
                        _dimensionCostoId = $(this).find(".dimensionCostoId").html();
                    });
                    //Establecer los valores capturados en los elementos del dialog
                    $("#requestAddItem #ItemTid").val(id);
                    $("#requestAddItem #ItemCod").val(cSap);
                    $("#requestAddItem #ItemDes").val(des);
                    $("#requestAddItem #ItemFec").val(fec);
                    $("#requestAddItem #ItemCan").val(cant);
                    $("#requestAddItem #ItemCom").val(comm);
                    $("#requestAddItem #almacenId").val(_almacenId);
                    $("#requestAddItem #proyectoId").val(_proyectoId);
                    $("#requestAddItem #sedeId").val(_sedeId);
                    $("#requestAddItem #centroCostoId").val(_centroCostoId);
                    $("#requestAddItem #unidadMedida").val(_unidadMedida);
                    $("#requestAddItem #dimensionCostoId").val(_dimensionCostoId);
                }

            });
        },
        error: function (ex) {
            notificacion(1, 'Failed to retrieve Items.' + ex);
        }
    });

    //Load projects
    $("#requestAddItem #proyectoId").html('<option disabled selected value="-1"> Seleccione... </option>');
    $.ajax({
        type: 'POST',
        url: base_url('Proyecto/GetList'),
        dataType: 'json',
        data: {},
        success: function (list) {
            $.each(list, function (i, list) {
                $("#requestAddItem #proyectoId").append('<option value="' + list.Value + '" title="' + list.Value + '">' +
                    (list.Value + " - " + list.Text) + '</option>');
            });

            if (button) {
                var id, cSap, des, fec, cant, comm, _proyectoId, _almacenId, _unidadMedida, _sedeId, _centroCostoId, _dimensionCostoId;

                //Capturar los valores de la fila
                $(button.closest('tr')).each(function () {
                    id = $(this).find(".id").html();
                    cSap = $(this).find(".csap").html();
                    des = $(this).find(".des").html();
                    fec = $(this).find(".fec").html();
                    cant = $(this).find(".cant").html();
                    comm = $(this).find(".comm").html();
                    _proyectoId = $(this).find(".proyectoId").html();
                    _almacenId = $(this).find(".almacenId").html();
                    _unidadMedida = $(this).find(".unidadMedida").html();
                    _sedeId = $(this).find(".sedeId").html();
                    _centroCostoId = $(this).find(".centroCostoId").html();
                    _dimensionCostoId = $(this).find(".dimensionCostoId").html();
                });
                //Establecer los valores capturados en los elementos del dialog
                $("#requestAddItem #ItemTid").val(id);
                $("#requestAddItem #ItemCod").val(cSap);
                $("#requestAddItem #ItemDes").val(des);
                $("#requestAddItem #ItemFec").val(fec);
                $("#requestAddItem #ItemCan").val(cant);
                $("#requestAddItem #ItemCom").val(comm);
                $("#requestAddItem #almacenId").val(_almacenId);
                $("#requestAddItem #proyectoId").val(_proyectoId);
                $("#requestAddItem #sedeId").val(_sedeId);
                $("#requestAddItem #centroCostoId").val(_centroCostoId);
                $("#requestAddItem #unidadMedida").val(_unidadMedida);
                $("#requestAddItem #dimensionCostoId").val(_dimensionCostoId);
            }
        },
        error: function (ex) {
            notificacion(1, 'Failed to retrieve Items.' + ex);
        }
    });

    //Load sedes
    $("#requestAddItem #sedeId").html('<option disabled selected value="-1"> Seleccione... </option>');
    $.ajax({
        type: 'POST',
        url: base_url('Sede/GetList'),
        dataType: 'json',
        data: {},
        success: function (list) {
            $.each(list, function (i, list) {
                $("#requestAddItem #sedeId").append('<option value="' + list.Value + '" title="' + list.Value + '">' +
                    (list.Value + " - " + list.Text) + '</option>');

                if (button) {
                    var id, cSap, des, fec, cant, comm, _proyectoId, _almacenId, _unidadMedida, _sedeId, _centroCostoId, _dimensionCostoId;

                    //Capturar los valores de la fila
                    $(button.closest('tr')).each(function () {
                        id = $(this).find(".id").html();
                        cSap = $(this).find(".csap").html();
                        des = $(this).find(".des").html();
                        fec = $(this).find(".fec").html();
                        cant = $(this).find(".cant").html();
                        comm = $(this).find(".comm").html();
                        _proyectoId = $(this).find(".proyectoId").html();
                        _almacenId = $(this).find(".almacenId").html();
                        _unidadMedida = $(this).find(".unidadMedida").html();
                        _sedeId = $(this).find(".sedeId").html();
                        _centroCostoId = $(this).find(".centroCostoId").html();
                        _dimensionCostoId = $(this).find(".dimensionCostoId").html();
                    });
                    //Establecer los valores capturados en los elementos del dialog
                    $("#requestAddItem #ItemTid").val(id);
                    $("#requestAddItem #ItemCod").val(cSap);
                    $("#requestAddItem #ItemDes").val(des);
                    $("#requestAddItem #ItemFec").val(fec);
                    $("#requestAddItem #ItemCan").val(cant);
                    $("#requestAddItem #ItemCom").val(comm);
                    $("#requestAddItem #almacenId").val(_almacenId);
                    $("#requestAddItem #proyectoId").val(_proyectoId);
                    $("#requestAddItem #sedeId").val(_sedeId);
                    $("#requestAddItem #centroCostoId").val(_centroCostoId);
                    $("#requestAddItem #unidadMedida").val(_unidadMedida);
                    $("#requestAddItem #dimensionCostoId").val(_dimensionCostoId);
                }

            });
        },
        error: function (ex) {
            notificacion(1, 'Failed to retrieve Items.' + ex);
        }
    });

    //Load centros de costo
    $("#requestAddItem #centroCostoId").html('<option disabled selected value="-1"> Seleccione... </option>');
    $.ajax({
        type: 'POST',
        url: base_url('CentroCosto/getCentroCostoXEmpresa'),
        dataType: 'json',
        data: { idEmpresa: $("#empresa").val() },
        success: function (list) {
            $.each(list, function (i, list) {
                $("#requestAddItem #centroCostoId").append('<option value="' + list.Value + '" title="' + list.Value + '">' +
                    (list.Value + " - " + list.Text) + '</option>');
            });

            if (button) {
                var id, cSap, des, fec, cant, comm, _proyectoId, _almacenId, _unidadMedida, _sedeId, _centroCostoId, _dimensionCostoId;

                //Capturar los valores de la fila
                $(button.closest('tr')).each(function () {
                    id = $(this).find(".id").html();
                    cSap = $(this).find(".csap").html();
                    des = $(this).find(".des").html();
                    fec = $(this).find(".fec").html();
                    cant = $(this).find(".cant").html();
                    comm = $(this).find(".comm").html();
                    _proyectoId = $(this).find(".proyectoId").html();
                    _almacenId = $(this).find(".almacenId").html();
                    _unidadMedida = $(this).find(".unidadMedida").html();
                    _sedeId = $(this).find(".sedeId").html();
                    _centroCostoId = $(this).find(".centroCostoId").html();
                    _dimensionCostoId = $(this).find(".dimensionCostoId").html();
                });
                //Establecer los valores capturados en los elementos del dialog
                $("#requestAddItem #ItemTid").val(id);
                $("#requestAddItem #ItemCod").val(cSap);
                $("#requestAddItem #ItemDes").val(des);
                $("#requestAddItem #ItemFec").val(fec);
                $("#requestAddItem #ItemCan").val(cant);
                $("#requestAddItem #ItemCom").val(comm);
                $("#requestAddItem #almacenId").val(_almacenId);
                $("#requestAddItem #proyectoId").val(_proyectoId);
                $("#requestAddItem #sedeId").val(_sedeId);
                $("#requestAddItem #centroCostoId").val(_centroCostoId);
                $("#requestAddItem #unidadMedida").val(_unidadMedida);
                $("#requestAddItem #dimensionCostoId").val(_dimensionCostoId);
            }
        },
        error: function (ex) {
            notificacion(1, 'Failed to retrieve Items.' + ex);
        }
    });

    //Load dimensión de costo
    $("#requestAddItem #dimensionCostoId").html('<option disabled selected value="-1"> Seleccione... </option>');
    $.ajax({
        type: 'POST',
        url: base_url('DimensionCosto/GetList'),
        dataType: 'json',
        data: {},
        success: function (list) {
            $.each(list, function (i, list) {
                $("#requestAddItem #dimensionCostoId").append('<option value="' + list.Value + '" title="' + list.Value + '">' +
                    (list.Value + " - " + list.Text) + '</option>');
            });

            if (button) {
                var id, cSap, des, fec, cant, comm, _proyectoId, _almacenId, _unidadMedida, _sedeId, _centroCostoId, _dimensionCostoId;

                //Capturar los valores de la fila
                $(button.closest('tr')).each(function () {
                    id = $(this).find(".id").html();
                    cSap = $(this).find(".csap").html();
                    des = $(this).find(".des").html();
                    fec = $(this).find(".fec").html();
                    cant = $(this).find(".cant").html();
                    comm = $(this).find(".comm").html();
                    _proyectoId = $(this).find(".proyectoId").html();
                    _almacenId = $(this).find(".almacenId").html();
                    _unidadMedida = $(this).find(".unidadMedida").html();
                    _sedeId = $(this).find(".sedeId").html();
                    _centroCostoId = $(this).find(".centroCostoId").html();
                    _dimensionCostoId = $(this).find(".dimensionCostoId").html();
                });
                //Establecer los valores capturados en los elementos del dialog
                $("#requestAddItem #ItemTid").val(id);
                $("#requestAddItem #ItemCod").val(cSap);
                $("#requestAddItem #ItemDes").val(des);
                $("#requestAddItem #ItemFec").val(fec);
                $("#requestAddItem #ItemCan").val(cant);
                $("#requestAddItem #ItemCom").val(comm);
                $("#requestAddItem #almacenId").val(_almacenId);
                $("#requestAddItem #proyectoId").val(_proyectoId);
                $("#requestAddItem #sedeId").val(_sedeId);
                $("#requestAddItem #centroCostoId").val(_centroCostoId);
                $("#requestAddItem #unidadMedida").val(_unidadMedida);
                $("#requestAddItem #dimensionCostoId").val(_dimensionCostoId);
            }
        },
        error: function (ex) {
            notificacion(1, 'Failed to retrieve Items.' + ex);
        }
    });

    //Load item codes
    $("#requestAddItem #ItemCod").html('<option disabled selected value="-1"> Seleccione... </option>');
    $.ajax({
        type: 'POST',
        url: base_url('Articulo/getArticuloXEmpresa'),
        dataType: 'json',
        data: { idEmpresa: $("#empresa").val() },
        success: function (list) {
            $.each(list, function (i, list) {
                $("#requestAddItem #ItemCod").append('<option value="' + list.Value + '" title="' + list.Value + '">' +
                    (list.Value + " - " + list.Text) + '</option>');
            });

            if (button) {
                var id, cSap, des, fec, cant, comm, _proyectoId, _almacenId, _unidadMedida, _sedeId, _centroCostoId, _dimensionCostoId;

                //Capturar los valores de la fila
                $(button.closest('tr')).each(function () {
                    id = $(this).find(".id").html();
                    cSap = $(this).find(".csap").html();
                    des = $(this).find(".des").html();
                    fec = $(this).find(".fec").html();
                    cant = $(this).find(".cant").html();
                    comm = $(this).find(".comm").html();
                    _proyectoId = $(this).find(".proyectoId").html();
                    _almacenId = $(this).find(".almacenId").html();
                    _unidadMedida = $(this).find(".unidadMedida").html();
                    _sedeId = $(this).find(".sedeId").html();
                    _centroCostoId = $(this).find(".centroCostoId").html();
                    _dimensionCostoId = $(this).find(".dimensionCostoId").html();
                });
                //Establecer los valores capturados en los elementos del dialog
                $("#requestAddItem #ItemTid").val(id);
                $("#requestAddItem #ItemCod").val(cSap);
                $("#requestAddItem #ItemDes").val(des);
                $("#requestAddItem #ItemFec").val(fec);
                $("#requestAddItem #ItemCan").val(cant);
                $("#requestAddItem #ItemCom").val(comm);
                $("#requestAddItem #almacenId").val(_almacenId);
                $("#requestAddItem #proyectoId").val(_proyectoId);
                $("#requestAddItem #sedeId").val(_sedeId);
                $("#requestAddItem #centroCostoId").val(_centroCostoId);
                $("#requestAddItem #unidadMedida").val(_unidadMedida);
                $("#requestAddItem #dimensionCostoId").val(_dimensionCostoId);
            }
        },
        error: function (ex) {
            notificacion(1, 'Failed to retrieve Items.' + ex);
        }
    });

}
function resetSelectSolicitud() {
    debugger;
    //Limpiar y recargar la lista de centros de costo
    $("#centroCosto").empty();
    $.ajax({
        type: 'POST',
        url: base_url("centroCosto/getcentroCostoXEmpresa"),
        dataType: 'json',
        data: { idEmpresa: $("#empresa").val() },
        success: function (list) {
            $.each(list, function (i, list) {
                $("#centroCosto").append('<option value="' + list.Value + '">' +
                    list.Text + '</option>');
            });
        },
        error: function (ex) {
            notificacion(1, 'Failed to retrieve Centros de costo.' + ex);
        }
    });
    //Limpiar y recargar la lista de artículos
    $("#ItemCod").empty();
    $.ajax({
        type: 'POST',
        url: base_url("Articulo/getArticuloXEmpresa"),
        dataType: 'json',
        data: { idEmpresa: $("#empresa").val() },
        success: function (list) {
            $.each(list, function (i, list) {
                $("#ItemCod").append('<option value="' + list.Value + '" title="' + list.Value + '">' +
                    (list.Value + " - " + list.Text) + '</option>');
            });
        },
        error: function (ex) {
            notificacion(1, 'Failed to retrieve Items.' + ex);
        }
    });

    //Limpiar y recargar la lista de Almacén
    $("#almacenId").empty();
    $.ajax({
        type: 'POST',
        url: base_url("Almacen/GetList"),
        dataType: 'json',
        data: {},
        success: function (list) {
            $.each(list, function (i, list) {
                $("#almacenId").append('<option value="' + list.Value + '" title="' + list.Value + '">' +
                    (list.Value + " - " + list.Text) + '</option>');
            });
        },
        error: function (ex) {
            notificacion(1, 'Failed to retrieve Items.' + ex);
        }
    });

    //Limpiar y recargar la lista de Proyecto
    $("#proyectoId").empty();
    $.ajax({
        type: 'POST',
        url: base_url("Proyecto/GetList"),
        dataType: 'json',
        data: {},
        success: function (list) {
            $.each(list, function (i, list) {
                $("#proyectoId").append('<option value="' + list.Value + '" title="' + list.Value + '">' +
                    (list.Value + " - " + list.Text) + '</option>');
            });
        },
        error: function (ex) {
            notificacion(1, 'Failed to retrieve Items.' + ex);
        }
    });

    //Limpiar y recargar la lista de Sedes
    $("#requestAddItem #sedeId").empty();
    $.ajax({
        type: 'POST',
        url: base_url("Sede/GetList"),
        dataType: 'json',
        data: {},
        success: function (list) {
            $.each(list, function (i, list) {
                $("#requestAddItem #sedeId").append('<option value="' + list.Value + '" title="' + list.Value + '">' +
                    (list.Value + " - " + list.Text) + '</option>');
            });
        },
        error: function (ex) {
            notificacion(1, 'Failed to retrieve Items.' + ex);
        }
    });

    //Limpiar y recargar la lista de Centro de costo
    $("#requestAddItem #centroCostoId").empty();
    $.ajax({
        type: 'POST',
        url: base_url("CentroCosto/getCentroCostoXEmpresa"),
        dataType: 'json',
        data: { idEmpresa: $("#empresa").val() },
        success: function (list) {
            $.each(list, function (i, list) {
                $("#requestAddItem #centroCostoId").append('<option value="' + list.Value + '" title="' + list.Value + '">' +
                    (list.Value + " - " + list.Text) + '</option>');
            });
        },
        error: function (ex) {
            notificacion(1, 'Failed to retrieve Items.' + ex);
        }
    });
}
function setButtonsAction() {
    $(document).on("click", ".btn-save-form-main", function (e) {
        var $button = $(this);
        maskLoader($button, true);
        setTimeout(function () {
            $("#" + $button.attr("data-form")).submit();
        }, 1500);
        e.preventDefault();
    });
    $(document).on("change", "#filtrarCentrosCosto", function (e) {
        var EmpresaId = $(this).val();
        $.ajax({
            type: 'POST',
            url: base_url('usuario/centroscosto'),
            data: { empresa_id: EmpresaId },
            success: function (data) {
                $('#centros-costo').html(data);
            }
        });
        e.preventDefault();
    });
    $(document).on("click", "#btnAddLevelAuth", function (e) {
        var ContentLoader = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
        var ContentButton = '<i class="fa fa-check"></i> Agregar';
        var niv_des = $('input[name="niv_des"]');
        var niv_usu = $('select[name="niv_usu"]');
        var button = $(this);
        var errors = 0;

        $(".parsley-errors-list").remove();
        $(".parsley-error").removeClass("parsley-error");

        if (niv_des.val().trim() === "") {
            errors++;
            niv_des.addClass("parsley-error");
            niv_des.after('<ul class="parsley-errors-list filled text-left" style="margin: 6px 0 0;"><li class="parsley-required">Este valor es requerido.</li></ul>');
        }
        if (niv_usu.val() === "") {
            errors++;
            niv_usu.addClass("parsley-error");
            niv_usu.after('<ul class="parsley-errors-list filled text-left" style="margin: 6px 0 0;"><li class="parsley-required">Este valor es requerido.</li></ul>');
        }
        if (errors > 0) {
            return false;
        }

        button.html(ContentLoader);
        setTimeout(function () {
            $.ajax({
                type: 'POST',
                url: base_url('centrocosto/DataNiveles'),
                data: {
                    descripcion: niv_des.val(),
                    prioridad: 0,
                    userId: niv_usu.val(),
                    userName: $('option:selected', niv_usu).text()
                },
                success: function (data) {
                    $('#cc-niveles').html(data);
                    button.html(ContentButton);
                    $("#createLevel").modal("hide");
                    $("#createLevel").find("input").val("");
                    $("#createLevel").find("select").val("");
                }
            });
        }, 1500);

        e.preventDefault();
    });
    $(document).on("click", "#btnModifyPriority", function (e) {
        var ContentLoader = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
        var ContentButton = '<i class="fa fa-check"></i> Modificar';
        var button = $(this);

        button.html(ContentLoader);
        setTimeout(function () {
            var counter = 1;
            var prioridades = [];
            $('#ulSortable li').each(function () {
                prioridades[counter] = $(this).attr('id') + "|" + counter;
                counter++;
            });
            $.ajax({
                type: 'POST',
                traditional: true,
                url: base_url('centrocosto/DataNiveles'),
                data: { prioridades: prioridades },
                success: function (data) {
                    $('#cc-niveles').html(data);
                    button.html(ContentButton);
                    $("#priorityLevel").modal("hide");
                    $('#ulSortable').empty();
                }
            });
        }, 1500);

        e.preventDefault();
    });
    $(document).on("click", ".removebutton", function (e) {
        var button = $(this);
        bootboxValid = bootbox.confirm({
            title: "Eliminar registros",
            message: "&iquest;Est&aacute; seguro de eliminar este registro?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancelar'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirmar',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result) {
                    $('button[data-bb-handler="confirm"]').html('<i class="fa fa-spin fa-spinner"></i> Procesando...');
                    $('button[data-bb-handler="confirm"]').attr("disabled", "disabled");

                    setTimeout(function () {
                        var id = button.attr("data-id");
                        var url = button.attr("data-url");

                        $.ajax({
                            type: 'POST',
                            traditional: true,
                            url: base_url(url),
                            data: { deleteId: id },
                            success: function (data) {
                                bootboxValid.modal("hide");
                                var formName = window[button.attr("data-callback")];
                                if (typeof formName === "function") formName.apply(null, [data]);
                            }
                        });
                    }, 1500);
                    return false;
                }
            }
        });
        e.preventDefault();
    });
    $(document).on("click", ".editbutton", function (e) {
        var button = $(this);
        resetModalReqAddItem(button);
        //Mostrar dialog
        $('#requestAddItem').modal('show');
        e.preventDefault();
    });
    $(document).on("click", "#openModalReqAddItem", function (e) {
        resetModalReqAddItem(null);
        $('#requestAddItem').modal('show');
        e.preventDefault();
    });
    $(document).on("click", "#btnChangePassword", function (e) {
        var ContentLoader = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
        var ContentButton = '<i class="fa fa-check"></i> Agregar';
        var usu_pass = $('input[name="Pass"]');
        var usu_npass1 = $('input[name="NewPass1"]');
        var usu_npass2 = $('input[name="NewPass2"]');
        var button = $(this);
        var errors = 0;

        $(".parsley-errors-list").remove();
        $(".parsley-error").removeClass("parsley-error");

        if (usu_pass.val().trim() === "") {
            errors++;
            usu_pass.addClass("parsley-error");
            usu_pass.after('<ul class="parsley-errors-list filled text-left" style="margin: 6px 0 0;"><li class="parsley-required">Este valor es requerido.</li></ul>');
        }
        if (usu_npass1.val().trim() === "") {
            errors++;
            usu_npass1.addClass("parsley-error");
            usu_npass1.after('<ul class="parsley-errors-list filled text-left" style="margin: 6px 0 0;"><li class="parsley-required">Este valor es requerido.</li></ul>');
        }
        if (usu_npass2.val().trim() === "") {
            errors++;
            usu_npass2.addClass("parsley-error");
            usu_npass2.after('<ul class="parsley-errors-list filled text-left" style="margin: 6px 0 0;"><li class="parsley-required">Este valor es requerido.</li></ul>');
        }
        if (usu_npass1.val().trim() !== usu_npass2.val().trim()) {
            errors++;
            usu_npass1.addClass("parsley-error");
            usu_npass2.addClass("parsley-error");
            usu_npass1.after('<ul class="parsley-errors-list filled text-left" style="margin: 6px 0 0;"><li class="parsley-required">Las contrase&ntilde;as no coinciden.</li></ul>');
            usu_npass2.after('<ul class="parsley-errors-list filled text-left" style="margin: 6px 0 0;"><li class="parsley-required">Las contrase&ntilde;as no coinciden.</li></ul>');
        }
        if (errors > 0) {
            return false;
        }

        button.html(ContentLoader);
        setTimeout(function () {
            $.ajax({
                type: 'POST',
                url: base_url('Perfil/CambiarPassword'),
                dataType: 'json',
                data: { actual: usu_pass.val(), nueva: usu_npass1.val() },
                success: function (r) {
                    button.html(ContentButton);
                    if (r.respuesta) {
                        $('#changePassword').modal('hide');
                        notificacion(0, 'Contrase&ntilde;a cambiada con &eacute;xito.');
                    } else {
                        notificacion(1, r.error);
                    }
                },
                error: function (ex) {
                    button.html(ContentButton);
                    notificacion(1, 'Failed.' + ex);
                }
            });
        }, 1500);
        e.preventDefault();
    });
    $(document).on("click", "#btnAddRequestItem", function (e) {
        debugger;
        var ContentLoader = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
        var ContentButton = '<i class="fa fa-check"></i> Agregar';
        var ItemTid = $('input[name="ItemTid"]');
        var ItemCod = $('select[name="ItemCod"]');
        var ItemDes = $('input[name="ItemDes"]');
        var ItemFec = $('input[name="ItemFec"]');
        var ItemCan = $('input[name="ItemCan"]');
        var ItemCom = $('textarea[name="ItemCom"]');
        var ItemProyectoId = $('select[name="proyectoId"]');
        var ItemAlmacenId = $('select[name="almacenId"]');
        var ItemUnidadMedida = $('select[name="unidadMedida"]');
        var ItemSedeId = $('#requestAddItem select[name="sedeId"]');
        var ItemCentroCostoId = $('#requestAddItem select[name="centroCostoId"]');
        var ItemDimensionCostoId = $('select[name="dimensionCostoId"]');

        var button = $(this);
        var errors = 0;

        $(".parsley-errors-list").remove();
        $(".parsley-error").removeClass("parsley-error");

        if (ItemCod.val() === null || ItemCod.val().trim() === "" || ItemCod.val().trim() == "-1") {
            errors++;
            ItemCod.addClass("parsley-error");
            ItemCod.after('<ul class="parsley-errors-list filled text-left" style="margin: 6px 0 0;"><li class="parsley-required">Este valor es requerido.</li></ul>');
        }
        if (ItemDes.val() === "") {
            errors++;
            ItemDes.addClass("parsley-error");
            ItemDes.after('<ul class="parsley-errors-list filled text-left" style="margin: 6px 0 0;"><li class="parsley-required">Este valor es requerido.</li></ul>');
        }
        if (ItemFec.val() === "") {
            errors++;
            ItemFec.addClass("parsley-error");
            ItemFec.after('<ul class="parsley-errors-list filled text-left" style="margin: 6px 0 0;"><li class="parsley-required">Este valor es requerido.</li></ul>');
        }
        if (ItemCan.val() === "") {
            errors++;
            ItemCan.addClass("parsley-error");
            ItemCan.after('<ul class="parsley-errors-list filled text-left" style="margin: 6px 0 0;"><li class="parsley-required">Este valor es requerido.</li></ul>');
        }
        if (errors > 0) {
            return false;
        }
        button.html(ContentLoader);
        setTimeout(function () {
            $.ajax({
                type: 'POST',
                url: base_url('solicitud/DataDetalle'),
                data: {
                    temporal_id: ItemTid.val(),
                    codigo: ItemCod.val(),
                    descripcion: ItemDes.val(),
                    fecha: ItemFec.val(),
                    cantidad: ItemCan.val(),
                    comentario: ItemCom.val(),
                    proyectoId: ItemProyectoId.val(),
                    almacenId: ItemAlmacenId.val(),
                    unidadMedida: ItemUnidadMedida.val(),
                    sedeId: ItemSedeId.val(),
                    centroCostoId: ItemCentroCostoId.val(),
                    dimensionCostoId: ItemDimensionCostoId.val()
                },
                success: function (data) {
                    $('#cc-niveles').html(data);
                    button.html(ContentButton);
                    $('#requestAddItem').modal('hide');
                }
            });
        }, 1500);

        e.preventDefault();
    });
    $(document).on("change", "#ItemCod", function (e) {
        var arr = $('#requestAddItem #ItemCod option:selected').text().split('-');
        $("#requestAddItem #ItemDes").val('');
        $("#requestAddItem #ItemDes").val(arr.slice(1).join('-').trim());
    });
    $(document).on('change', '#tipoSolicitud', function (event) {
        if ($(this).val() === '') {
            return false;
        }
        var rowCount = $('#tbNiveles tr').length;
        if (rowCount == 1)
            return false;

        bootbox.confirm({
            title: "Solicitud",
            message: "Con las modificaciones se borrar&aacute;n los datos. &iquest;Desea continuar?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancelar'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirmar'
                }
            },
            callback: function (result) {
                if (result) {
                    //Limpiar los elementos existentes
                    $.ajax({
                        type: 'POST',
                        url: base_url('solicitud/DataDetalle'),
                        data: {
                            deleteAll: true
                        },
                        success: function (data) {
                            $('#cc-niveles').html(data);
                        }
                    });
                } else {
                    if ($("#tipoSolicitud").val() == "S") {
                        $("#tipoSolicitud").val('A');
                    } else {
                        $("#tipoSolicitud").val('S');
                    }
                }
            }
        });
    });
    $(document).on("click", "#btnSolAprobar", function (e) {
        var button = $(this);
        bootbox.prompt("Aprobar Solicitud", function (result) {
            var ids = [];
            ids[0] = button.attr("data-id");
            if (result != null) {
                $('button[data-bb-handler="confirm"]').html('<i class="fa fa-spin fa-spinner"></i> Procesando...');
                $('button[data-bb-handler="confirm"]').attr("disabled", "disabled");

                setTimeout(function () {
                    fnAprobarSolicitudes(ids, result);
                }, 2500);
            }
            return false;
        });
        e.preventDefault();
    });
    $(document).on("click", "#btnSolRechazar", function (e) {
        var button = $(this);
        bootbox.prompt("Rechazar Solicitud", function (result) {
            var ids = [];
            ids[0] = button.attr("data-id");
            if (result != null) {
                $('button[data-bb-handler="confirm"]').html('<i class="fa fa-spin fa-spinner"></i> Procesando...');
                $('button[data-bb-handler="confirm"]').attr("disabled", "disabled");

                setTimeout(function () {
                    fnRechazarSolicitudes(ids, result);
                }, 2500);
            }
            return false;
        });
        e.preventDefault();
    });
    $(document).on("change", "#frmSolicitud #empresa", function (e) {
        resetSelectSolicitud();
        var rowCount = $('#tbNiveles tr').length;
        if (rowCount == 1)
            return false;

        var object = this;
        bootbox.confirm({
            title: "Solicitud",
            message: "Con las modificaciones se borrar&aacute;n los datos. &iquest;Desea continuar?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancelar'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirmar'
                }
            },
            callback: function (result) {
                if (result) {
                    //Limpiar los elementos existentes
                    $.ajax({
                        type: 'POST',
                        url: base_url('solicitud/DataDetalle'),
                        data: {
                            deleteAll: true
                        },
                        success: function (data) {
                            $('#cc-niveles').html(data);
                        }
                    });
                }
            }
        });
        return false;
        e.preventDefault();
    });
    if ($("#ulSortable").length) {
        $("#ulSortable").sortable();
        $("#ulSortable").disableSelection();
    }
    if ($("#priorityLevel").length) {
        $("#priorityLevel").on("shown.bs.modal", function () {
            $('#ulSortable').empty();
            var cList = $('#ulSortable');

            $('#tbNiveles tr').each(function () {
                var id = $(this).find(".id").html();
                var description = $(this).find(".des").html();
                if (id != null) {
                    var li = $('<li/>')
                        .addClass('ui-state-default list-group-item')
                        .attr('id', id);
                    var aaa = $('<span/>')
                        .addClass('ui-icon ui-icon-arrowthick-2-n-s')
                        .appendTo(li);
                    li.text(description)
                        .appendTo(cList);
                }
            });
        });
    }
    if ($("#requestAddItem").length) {
        $("#fechaRegistroDis").datepicker({ disabled: true });
        var insertUpd = $("#insertUpd").val();
        var current_date = new Date();
        if (insertUpd === "1") {
            $("#fechaRegistro").val($.datepicker.formatDate('yy-mm-dd', current_date));
            $("#fechaRegistroDis").val($.datepicker.formatDate('yy-mm-dd', current_date));
            current_date.setMonth(current_date.getMonth() + 1);
            $("#fechaNecesaria").val($.datepicker.formatDate('yy-mm-dd', current_date));
            $("#fechaVencimiento").val($.datepicker.formatDate('yy-mm-dd', current_date));
            $("#requestAddItem #ItemFec").val($("#fechaVencimiento").val());
            resetSelectSolicitud();
        } else {
            $("#empresa").attr("disabled", "disabled");
            $("#centroCosto").attr("disabled", "disabled");
        }
        $(document).on("change", "#fechaRegistro", function (e) {
            $("#fechaNecesaria").datepicker("option", "minDate", getDate(this));
            $("#fechaVencimiento").datepicker("option", "minDate", getDate(this));
            $("#requestAddItem #ItemFec").datepicker("option", "minDate", getDate(this));
        });
        $(document).on("change", "#fechaNecesaria", function (e) {
            $("#requestAddItem #ItemFec").datepicker("option", "minDate", getDate(this));
        });
    }
}
function frmRol() {
    var form = $("#frmRol"), counter = 0;
    var mxrol = [];
    $('#frmRol table tbody tr').each(function () {
        mxrol[counter] = $(this).find('input[name="menu_id"]').val() + "|" +
            $(this).find('input[name="mxro_accesa"]').val() + "|" +
            $(this).find('input[name="mxro_registra"]').val() + "|" +
            $(this).find('input[name="mxro_modifica"]').val() + "|" +
            $(this).find('input[name="mxro_consulta"]').val() + "|" +
            $(this).find('input[name="mxro_elimina"]').val() + "|" +
            $(this).find('input[name="mxro_imprime"]').val() + "|" +
            $(this).find('input[name="mxro_exporta"]').val();
        counter++;
    });
    form.ajaxSubmit({
        type: 'POST',
        traditional: true,
        url: form.attr('action'),
        data: { mxrol: mxrol },
        success: function (r) {
            if (r.respuesta) {
                redirect(r.redirect);
            } else {
                notificacion(1, r.error);
                maskLoader($(".btn-save-form-main"), false);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            notificacion(1, errorThrown);
            maskLoader($(".btn-save-form-main"), false);
        }
    });
}
function frmEmpresa() {
    var form = $("#frmEmpresa");
    form.ajaxSubmit({
        type: 'POST',
        traditional: true,
        url: form.attr('action'),
        //data: { mxrol: mxrol },
        success: function (r) {
            if (r.respuesta) {
                redirect(r.redirect);
            } else {
                notificacion(1, r.error);
                maskLoader($(".btn-save-form-main"), false);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            notificacion(1, errorThrown);
            maskLoader($(".btn-save-form-main"), false);
        }
    });
}
function frmUsuario() {
    var form = $("#frmUsuario");
    form.ajaxSubmit({
        dataType: 'JSON',
        type: 'POST',
        url: form.attr('action'),
        success: function (r) {
            if (r.respuesta) {
                redirect(r.redirect);
            } else {
                if (r.error != "") {
                    notificacion(1, r.error);
                }
                if (r.error2 != "") {
                    notificacion(1, r.error);
                }
                maskLoader($(".btn-save-form-main"), false);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            notificacion(1, errorThrown);
            maskLoader($(".btn-save-form-main"), false);
        }
    });
}
function frmImportUsuario() {
    var form = $("#frmImportUsuario");
    bootboxValid = bootbox.confirm({
        title: "Importar usuarios",
        message: "Se importar&aacute;n los usuarios, tenga en cuenta que no se registrar&aacute;n los que no cuenten con datos correctos. &iquest;Continuar?",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Cancelar'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Registrar'
            }
        },
        callback: function (result) {
            if (result) {

                var appendInit = '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> ';
                var appendFin = '</div>';
                var errors = [];

                $('button[data-bb-handler="confirm"]').html('<i class="fa fa-spin fa-spinner"></i> Procesando...');
                $('button[data-bb-handler="confirm"]').attr("disabled", "disabled");

                var rows = $('#tbUsers tr').length;
                var currIndex = 0;
                $('#tbUsers tr').each(function (index, element) {
                    var validate = $(this).find(".usr_val").html();
                    currIndex = index;

                    if (validate != null) {
                        if (validate.trim() == 'Datos correctos') {

                            var nombre = $(this).find(".usr_nom").html();
                            var cuenta = $(this).find(".usr_cue").html();
                            var passwr = $(this).find(".usr_pwd").html();
                            var email = $(this).find(".usr_ema").html();
                            var fecReg = $(this).find(".usr_fec").html();
                            var usrSap = $(this).find(".usr_sap").html();
                            var usrRol = $(this).find(".usr_rol").html();
                            var emprsa = $(this).find(".usr_emp").html();
                            var ccosto = $(this).find(".usr_cco").html();

                            dialog.find('.bootbox-body').html(appendInit + 'Registrando a ' + nombre + appendFin);

                            $.ajax({
                                type: 'POST',
                                url: base_url('usuario/GuardarFromExcel'),
                                data: {
                                    nombre: nombre,
                                    cuenta: cuenta,
                                    password: passwr,
                                    correo: email,
                                    fecReg: fecReg,
                                    codSAP: usrSap,
                                    rol: usrRol,
                                    empresa: emprsa,
                                    ccosto: ccosto
                                },
                                success: function (r) {
                                    if (r.respuesta) {
                                        dialog.find('.bootbox-body').html(appendInit + 'Registrado');
                                    } else {
                                        errors.push(nombre + ', ' + r.error);
                                    }

                                    if (index === (rows - 1)) {
                                        dialog.modal('hide');
                                        if (errors.length > 0)
                                            notificacion(1, errors.join('\n'))
                                        else
                                            notificacion(0, 'Usuarios registrados con éxito');
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    dialog.modal('hide');
                                    notificacion(1, errorThrown);
                                }
                            });
                        } else {
                            if (index === (rows - 1)) {
                                dialog.modal('hide');
                                if (errors.length > 0)
                                    notificacion(1, errors.join('\n'))
                                else
                                    notificacion(0, 'Usuarios registrados con éxito');
                            }
                        }
                    }
                });
            }
        }
    });
}
function deleteNivelCC(data) {
    $('#cc-niveles').html(data);
}
function deleteRequestItem(data) {
    $('#cc-niveles').html(data);
}
function frmCentroCosto() {
    var form = $("#frmCentroCosto");
    form.ajaxSubmit({
        dataType: 'JSON',
        type: 'POST',
        url: form.attr('action'),
        success: function (r) {
            if (r.respuesta) {
                redirect(r.redirect);
            } else {
                notificacion(1, r.error);
                maskLoader($(".btn-save-form-main"), false);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            notificacion(1, errorThrown);
            maskLoader($(".btn-save-form-main"), false);
        }
    });
}
function frmConfiguracion() {
    var form = $("#frmConfiguracion");
    form.ajaxSubmit({
        type: 'POST',
        url: form.attr('action'),
        success: function (r) {
            if (r.respuesta) {
                redirect(r.redirect);
            } else {
                notificacion(1, r.error);
                maskLoader($(".btn-save-form-main"), false);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            notificacion(1, errorThrown);
            maskLoader($(".btn-save-form-main"), false);
        }
    });
}
function frmSolicitud() {
    var form = $("#frmSolicitud");
    form.ajaxSubmit({
        dataType: 'JSON',
        type: 'POST',
        url: form.attr('action'),
        success: function (r) {
            if (r.respuesta) {
                redirect(r.redirect);
            } else {
                if (r.error != "") {
                    notificacion(1, r.error);
                    maskLoader($(".btn-save-form-main"), false);
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            notificacion(1, errorThrown);
            maskLoader($(".btn-save-form-main"), false);
        }
    });
}
function frmLogin() {
    var form = $("#frmLogin");
    var button = $("#btnSubmitLogin");
    var ContentLoader = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
    var ContentButton = 'Ingresar';
    var errorUl = '';
    $("input").attr("readonly", "true");
    $("buttton").attr("disabled", "disabled");
    $('.bs-callout-warning').remove();
    $('.parsley-errors-list').remove();
    button.html(ContentLoader);
    setTimeout(function () {
        form.ajaxSubmit({
            dataType: 'JSON',
            type: 'POST',
            url: form.attr('action'),
            success: function (r) {
                if (r.respuesta)
                    redirect(r.redirect);
                else {
                    errorUl = '<ul class="text-sm bs-callout-warning text-left"><li>' + r.error + '</li></ul>';
                    form.before(errorUl);
                    $("input").removeAttr("readonly");
                    $("buttton").removeAttr("disabled");
                    button.html(ContentButton);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                errorUl = '<ul class="text-sm bs-callout-warning text-left"><li>Ha ocurrido un error inesperado...</li></ul>';
                form.before(errorUl);
                $("input").removeAttr("disabled");
                $("buttton").removeAttr("disabled");
                button.html(ContentButton);
            }
        });
    }, 800);
}
function frmRecupera() {
    var form = $("#frmRecupera");
    var button = $("#btnSubmitForgot");
    var ContentLoader = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
    var ContentButton = 'Enviar';
    var errorUl = '';
    $("input").attr("readonly", "true");
    $("buttton").attr("disabled", "disabled");
    $('.bs-callout-warning').remove();
    $('.parsley-errors-list').remove();
    button.html(ContentLoader);
    setTimeout(function () {
        form.ajaxSubmit({
            dataType: 'JSON',
            type: 'POST',
            url: form.attr('action'),
            success: function (r) {
                if (r.respuesta) {
                    $(".forgot-info").remove();
                    errorUl = '<ul class="text-sm bs-callout-info text-left"><li>Se ha reestablecido su clave y enviado al correo especificado.</li></ul>';
                } else
                    errorUl = '<ul class="text-sm bs-callout-warning text-left"><li>' + r.error + '</li></ul>';

                form.before(errorUl);
                $("input").removeAttr("readonly");
                $("buttton").removeAttr("disabled");
                button.html(ContentButton);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                errorUl = '<ul class="text-sm bs-callout-warning text-left"><li>Ha ocurrido un error inesperado...</li></ul>';
                form.before(errorUl);
                $("input").removeAttr("disabled");
                $("buttton").removeAttr("disabled");
                button.html(ContentButton);
            }
        });
    }, 1200);
}
function setSubmitsAction() {
    var $forms = $('form[ui-jp="parsley"]');
    if ($forms.length) {
        $forms.each(function (index) {
            var $form = $(this);
            $form.parsley().on('field:validated', function () {
                var ok = $('.parsley-error').length === 0;
                if (!ok) maskLoader($(".btn-save-form-main"), false);
                $('.bs-callout-info').toggleClass('hidden', !ok);
                $('.bs-callout-warning').toggleClass('hidden', ok);
            })
                .on('form:submit', function () {
                    var formName = window[$form.attr("id")];
                    if (typeof formName === "function") formName.apply();
                    return false; // Don't submit form for this demo
                });
        });
    }
}

setCheckboxes();
setButtonsAction();
setSubmitsAction();