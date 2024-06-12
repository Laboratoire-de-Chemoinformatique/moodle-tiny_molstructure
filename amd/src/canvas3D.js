// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Tiny Molstructure canvas init and functions.
 *
 * @module      tiny_molstructure/ui
 * @copyright   2024 University of Strasbourg unistra.fr
 * @author Céline Pervès <louis.plyer@unistra.fr>
 * @author Louis Plyer <louis.plyer@unistra.fr>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import Selectors from 'tiny_molstructure/selectors';
import {get_string as getString} from 'core/str';
import {component} from 'tiny_molstructure/common';

export const initCanvas3D = async(editor,
                                  iframeBody,
                                  sketcherWidth=400,
                                  sketcherHeight=200,
                                  sketcherViewerWidth=100,
                                  sketcherViewerHeight=100) => {

  const iframeContent = iframeBody.contentDocument;
  let ChemDoodle = iframeBody.contentWindow.ChemDoodleVar;
  ChemDoodle._Canvas3D.PRESERVE_DRAWING_BUFFER = true;
//  ChemDoodle.ELEMENT['H'].jmolColor = 'black';
//  ChemDoodle.ELEMENT['S'].jmolColor = '#B9A130';

  // Main ketcher.
  let sketcher3D = new ChemDoodle.EditorCanvas3D(
    'sketcher3D', sketcherWidth, sketcherHeight, {useServices:false, includeToolbar: true}
  );
  sketcher3D.styles.set3DRepresentation('Ball and Stick');
  sketcher3D.styles.backgroundColor = 'white';
  sketcher3D.styles.atoms_useJMOLColors= true;
  // TODO
  ChemDoodle.readJSON("{\"m\":[{\"a\":[]}]}");

  // Preview ketcher.
  const sketcher_viewer_3D = new ChemDoodle.ViewerCanvas3D(
    Selectors.elements.canvas3D.ketcherviewId, sketcherViewerWidth, sketcherViewerHeight);
  sketcher_viewer_3D.emptyMessage = 'No data loaded';
  sketcher_viewer_3D.styles.set3DRepresentation('Ball and Stick');
  sketcher_viewer_3D.styles.backgroundColor = 'white';
  sketcher_viewer_3D.styles.atoms_useJMOLColors= true;
  sketcher3D.oldFunc = sketcher3D.checksOnAction;


  /*   Refactor the function, in order for the preview ketcher to be a copy of the main ketcher,
         updated at every modification of the main ketcher. */

  sketcher3D.checksOnAction = function(force){
    this.oldFunc(force);
    let mols = sketcher3D.molecules;
    let forms = sketcher3D.shapes;
    sketcher_viewer_3D.loadContent(mols, forms);
    sketcher3D.center();
    for ( let i = 0, ii = this.molecules.length; i < ii; i++) {
      this.molecules[i].check();
    }
    sketcher3D.repaint();
    sketcher_viewer_3D.repaint();
  };
  sketcher_viewer_3D.styles.set3DRepresentation('Ball and Stick');
  // set the background color to black
  sketcher_viewer_3D.styles.backgroundColor = 'white';





  //try
  iframeBody.contentWindow.sketcherViewerVar = sketcher_viewer_3D;
  iframeContent.querySelector(Selectors.elements.canvas3D.resizeButton).addEventListener('click', function_resize, iframeBody);
  // Need this for firefow ESR < 120 since has is not present by default
  window.document.querySelector('.modal-content').setAttribute('style', ' height:100vh;');
  await changeLangString(iframeContent);
};

/*  Button activated function, checks for the values of width and height in the input elements.
    If empty, uses the default value. */
export const function_resize= (e) => {
  const iframeContent = e.target.ownerDocument;
  let input_width = iframeContent.querySelector(Selectors.elements.canvas3D.widthInput).valueAsNumber;
  let input_height = iframeContent.querySelector(Selectors.elements.canvas3D.heightInput).valueAsNumber;
  let sketcher_viewer_3D = window.document.querySelector(Selectors.elements.canvas3D.selector).contentWindow.sketcherViewerVar;
  let width;
  let height;

  if(input_width > 0 ) {
    width = input_width;
  } else {
    width = 100;
  }

  if(input_height > 0 ) {
    height = input_height;
  } else {
    height = 100;
  }
  sketcher_viewer_3D.resize(width, height);
};

export const changeLangString = async(iframeContent) => {
  const button = iframeContent.querySelector(Selectors.elements.canvas3D.resizeButton);
  button.firstChild.data =await getString('resize', component);

  var height_input = iframeContent.querySelector(Selectors.elements.canvas3D.heightInputLabel);
  height_input.firstChild.data = await getString('height', component);

  var width_input = iframeContent.querySelector(Selectors.elements.canvas3D.widthInputLabel);
  width_input.firstChild.data = await getString('width', component);
};
