@tiny_molstructure @editor_tiny @_switch_iframe @javascript
Feature: Tiny molstructure editor
  As a teacher I wan't to open tiny molstructure editor

  @javascript
  Scenario: Create an molecule using TinyMCE
    Given the following config values are set as admin:
      | enablefitstructure        | 1   | tiny_molstructure |
      | enablecustomsketchersize | 1   | tiny_molstructure |
      | sketcherwidth             | 500 | tiny_molstructure |
      | sketcherheight            | 300 | tiny_molstructure |
      | enablecustomoutputsize    | 1   | tiny_molstructure |
      | outputwidth               | 400 | tiny_molstructure |
      | outputheight              | 250 | tiny_molstructure |
    And I log in as "admin"
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
    And "#fit_structure_container" "css_element" should be visible
    And I click on "#fit_structure_input" "css_element"
    And I switch to the main frame
    And I click on "3D molecule representation" "link"
    And I switch to "id_description_editor_molstructure_3D_iframe" iframe
    And "#sketcher3D[style*='width: 500px']" "css_element" should exist
    And the field "width_input_molstructure-3D" matches value "400"
    And the field "height_input_molstructure-3D" matches value "250"
    And I switch to the main frame
    And I click on "2D molecule representation" "link"
    And I switch to "id_description_editor_molstructure_2D_iframe" iframe
    And I click on "#sketcher_button_ring_cyclohexane_icon" "css_element"
    And I click on "#sketcher" "css_element"
    And I switch to the main frame
    # Click doesn't work so pass by css element.
    And I click on ".modal-footer button" "css_element" in the "Draw a molecule, resize the canvas and click on insert." "dialogue"
    And I switch to "id_description_editor_ifr" iframe
    And "#tinymce img[alt^=ChemDoodle]" "css_element" should exist

  Scenario: Open Tiny molstructure in a file-enabled essay question attempt
    Given the following "users" exist:
      | username | firstname | lastname | email               |
      | student  | Student   | One      | student@example.com |
    And the following "courses" exist:
      | fullname | shortname | category |
      | Course 1 | C1        | 0        |
    And the following "course enrolments" exist:
      | user    | course | role    |
      | student | C1     | student |
    And the following "question categories" exist:
      | contextlevel | reference | name           |
      | Course       | C1        | Test questions |
    And the following "questions" exist:
      | questioncategory | qtype | name  | template         |
      | Test questions   | essay | Essay | editorfilepicker |
    And the following "activities" exist:
      | activity | name   | course | idnumber |
      | quiz     | Quiz 1 | C1     | quiz1    |
    And quiz "Quiz 1" contains the following questions:
      | question | page |
      | Essay    | 1    |
    When I am on the "Quiz 1" "mod_quiz > View" page logged in as "student"
    And I press "Attempt quiz"
    And I expand all toolbars for the "Answer" TinyMCE editor
    And I click on the "Chemical substance" button for the "Answer" TinyMCE editor
    Then ".molstructure_2D_iframe" "css_element" should exist
