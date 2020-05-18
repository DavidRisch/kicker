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
  $('.group_member_select').chosen({
    allow_single_deselect: true,
    placeholder_text_multiple: 'Gruppenmitglieder hinzufügen',
    display_selected_options: false,
    inherit_select_classes: true,
    width: '98%'
  })
})
