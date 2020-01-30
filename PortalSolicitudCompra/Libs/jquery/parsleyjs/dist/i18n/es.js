// ParsleyConfig definition if not already set
// Validation errors messages for Parsley
// Load this after Parsley

Parsley.addMessages('es', {
    defaultMessage: "Este valor parece ser inv&aacute;lido.",
    type: {
        email: "Este valor debe ser un correo v&aacute;lido.",
        url: "Este valor debe ser una URL v&aacute;lida.",
        number: "Este valor debe ser un n&uacute;mero v&aacute;lido.",
        integer: "Este valor debe ser un n&uacute;mero v&aacute;lido.",
        digits: "Este valor debe ser un d&iacute;gito v&aacute;lido.",
        alphanum: "Este valor debe ser alfanum&eacute;rico."
    },
    notblank: "Este valor no debe estar en blanco.",
    required: "Este valor es requerido.",
    pattern: "Este valor es incorrecto.",
    min: "Este valor no debe ser menor que %s.",
    max: "Este valor no debe ser mayor que %s.",
    range: "Este valor debe estar entre %s y %s.",
    minlength: "Este valor es muy corto. La longitud m&iacute;nima es de %s caracteres.",
    maxlength: "Este valor es muy largo. La longitud m&aacute;xima es de %s caracteres.",
    length: "La longitud de este valor debe estar entre %s y %s caracteres.",
    mincheck: "Debe seleccionar al menos %s opciones.",
    maxcheck: "Debe seleccionar %s opciones o menos.",
    check: "Debe seleccionar entre %s y %s opciones.",
    equalto: "Este valor debe ser id&eacute;ntico."
});

Parsley.setLocale('es');