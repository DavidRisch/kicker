
// This function needs jquery
function setUpGroupSelection () {
  const selectionElement = $('#groupSelector')
  groupSnapshot.forEach(element => {
    // create a new option element for the groupSelector with jquery
    const newOption = $('<option>', {
      value: element.id,
      text: element.name
    })
    // add the new option to the groupSelector
    selectionElement.append(newOption)
  })
  // Add an eventListener to our select that executes if the element/the selection changes
  selectionElement.change(function () {
    // log our selected group id, that is stored in the options element value, in the console
    console.log($('#groupSelector').val())
  })
}
// if the document is completly loaded, then execute the setup function
$(document).ready(
  function () {
    setUpGroupSelection()
  }
)
