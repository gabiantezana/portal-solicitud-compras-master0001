
var bootboxDialog = null;

function setDatatables() {
    var $tables = $('table[ui-jp="dataTable"]');
    if ($tables.length) {
        $tables.each(function (index) {
            $(this).DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
                }
            });
        });
    }
    $(document).on("click", ".table-solicitud-action .column-actions a", function (e) {
        var iconButton = $(this).find(".material-icons").text();
        if (iconButton === "edit") {
            var state;
            $($(this).closest('tr')).each(function () {
                state = $(this).find(".estado-solicitud").html();
            });
            if (state === 'Pendiente')
                return true;
            else if (state === 'Procesando') {
                notificacion(1, 'Esta solicitud ya est&aacute; siendo procesada.');
                return false;
            } else if (state === 'Aprobada') {
                notificacion(1, 'Esta solicitud ya fue aprobada.');
                return false;
            } else if (state === 'Rechazada') {
                notificacion(1, 'Esta solicitud ya fue rechazada.');
                return false;
            } else {
                notificacion(1, 'No se puede editar una solicitud que se encuentra en SAP.');
                return false;
            }
        }
        return true;
        e.preventDefault();
    });
    $(document).on("click", "#btnAprobarSolicitudes", function (e) {
        var counter = 0;
        var ids = [];
        $('#tablaSolicitudesPendientes tbody tr').each(function () {
            var chkInput = $(this).find('input[name="chkSolPend"]');
            if (chkInput.is(":checked")) {
                ids[counter] = chkInput.attr("data-id");
                counter++;
            }
        });

        if (counter === 0)
            notificacion(1, "No ha seleccionado ning&uacute;n documento");
        else {

            bootbox.confirm({
                title: "Aprobar solicitudes",
                message: "Se aprobar&aacute;(n) " + counter + " solicitud(es). &iquest;Desea continuar?",
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
                        $('button[data-bb-handler="confirm"]').html('<i class="fa fa-spin fa-spinner"></i> Procesando...');
                        $('button[data-bb-handler="confirm"]').attr("disabled", "disabled");
                        setTimeout(function () {
                            fnAprobarSolicitudes(ids);
                        }, 2500);
                        return false;
                    }                    
                }
            });
        }
        e.preventDefault();
    });
    $(document).on("click", "#btnRechazarSolicitudes", function (e) {
        var counter = 0;
        var ids = [];
        $('#tablaSolicitudesPendientes tbody tr').each(function () {
            var chkInput = $(this).find('input[name="chkSolPend"]');
            if (chkInput.is(":checked")) {
                ids[counter] = chkInput.attr("data-id");
                counter++;
            }
        });

        if (counter === 0)
            notificacion(1, "No ha seleccionado ning&uacute;n documento");
        else {
            bootbox.confirm({
                title: "Rechazar solicitudes",
                message: "Se rechazar&aacute;(n) " + counter + " solicitud(es). &iquest;Desea continuar?",
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
                        $('button[data-bb-handler="confirm"]').html('<i class="fa fa-spin fa-spinner"></i> Procesando...');
                        $('button[data-bb-handler="confirm"]').attr("disabled", "disabled");
                        setTimeout(function () {
                            fnRechazarSolicitudes(ids);
                        }, 2500);
                        return false;
                    }
                }
            });
        }
        e.preventDefault();
    });
}
function deleteAction(mtd, url) {
    var parts = url.split("/");
    var id = parseInt(parts[parts.length - 1]);
    //url = url.replace("/" + parts[parts.length - 1]);
    $.ajax({
        type: mtd,
        traditional: true,
        url: url,
        data: { id: id },
        success: function (r) {
            if (r.respuesta) {
                window.location.href = base_url(r.redirect);
            } else {
                $('button[data-bb-handler="confirm"]').html('<i class="fa fa-check"></i> Confirmar');
                $('button[data-bb-handler="confirm"]').removeAttr("disabled");
                bootboxDialog.modal('hide');
                if (r.error) {
                    notificacion(1, r.error);
                } else {
                    notificacion(0, "Registro eliminado correctamente");
                    setTimeout(function () {
                        window.location.reload();
                    }, 1500);
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('button[data-bb-handler="confirm"]').html('<i class="fa fa-check"></i> Confirmar');
            $('button[data-bb-handler="confirm"]').removeAttr("disabled");
            bootboxDialog.modal('hide');
            notificacion(1, errorThrown);
        }
    });
}
function setIndexActions() {
    $(document).on("click", ".btn-confirm-delete", function (e) {
        var mtd = $(this).attr("data-mtd");
        var ttl = $(this).attr("data-ttl");
        var msg = $(this).attr("data-msg");
        var url = $(this).attr("data-url");
        bootboxDialog = bootbox.confirm({
            title: ttl,
            message: msg,
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
                        deleteAction(mtd, url);
                    }, 2500);
                    return false;
                }
            }
        });
        e.preventDefault();
    });
}
setDatatables();
setIndexActions();