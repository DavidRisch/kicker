// Configure Dropzone
Dropzone.options.group_member_select = {
    paramName: 'groupImage', // Name of the transferred file
    maxFilesize: 8, // MB
    uploadMultiple: false,
    clickable: true,
    acceptedFiles: 'image/jpeg,image/png',
    dictDefaultMessage: null
}
// Chosen init script
$(function () {
    $('.group_members').tokenize2({
        // max number of tags
        tokensMaxItems: 0,

        // allow you to create custom tokens
        tokensAllowCustom: false,

        // max items in the dropdown
        dropdownMaxItems: 10,

        // minimum/maximum of characters required to start searching
        searchMinLength: 0,
        searchMaxLength: 0,

        // specify if Tokenize2 will search from the beginning of a string
        searchFromStart: true,

        // choose if you want your search highlighted in the result dropdown
        searchHighlight: true,

        // custom delimiter
        delimiter: ';',

        // display no results message
        displayNoResultsMessage: false,
        noResultsMessageText: 'Keine Ergebnisse zu "%s" gefunden.',

        // data source
        dataSource: 'select',

        // waiting time between each search
        debounce: 0,

        // custom placeholder text
        placeholder: false,

        // enable sortable
        // requires jQuery UI
        sortable: false,

        // tabIndex
        tabIndex: 0,

        // allows empty values
        allowEmptyValues: false,

        // z-index
        zIndexMargin: 500
    })
})

