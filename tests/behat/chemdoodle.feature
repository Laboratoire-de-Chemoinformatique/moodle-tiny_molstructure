@tiny_molstructure @editor_tiny @_switch_iframe @javascript
Feature: Tiny molstructure editor
  As a teacher I wan't to open tiny molstructure editor

  @javascript
  Scenario: Create an molecule using TinyMCE
    Given I log in as "admin"
    When I open my profile in edit mode
    And I set the field "Description" to "<p>Chemical Structure test</p>"
    # Set field on the bottom of page, so equation editor dialogue is visible.
    And I expand all fieldsets
    And I set the field "Picture description" to "Test"
    And I expand all toolbars for the "Description" TinyMCE editor
    And I click on the "Chemical substance" button for the "Description" TinyMCE editor
    And I switch to "id_description_editor_molstructure_2D_iframe" iframe
    And "#sketcher-viewer-tiny" "css_element" should exist
    And "#label_height_input_molstructure" "css_element" should exist
    And "#button-size-button" "css_element" should exist
    And I click on "#sketcher_button_ring_cyclohexane_icon" "css_element"
    And I click on "#sketcher" "css_element"
    And I switch to the main frame
    # Click doesn't work so pass by css element.
    And I click on ".modal-footer button" "css_element" in the "Draw a molecule, resize the canvas and click on insert." "dialogue"
    And I switch to "id_description_editor_ifr" iframe
    And "#tinymce img[alt^=ChemDoodle]" "css_element" should exist