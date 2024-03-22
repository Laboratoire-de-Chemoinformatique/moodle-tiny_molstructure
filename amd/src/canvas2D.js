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

export const initCanvas2D = async(editor,
                                  iframeBody,
                                  sketcherWidth=400,
                                  sketcherHeight=200,
                                  sketcherViewerWidth=100,
                                  sketcherViewerHeight=100) => {
  const iframeContent = iframeBody.contentDocument;
  let ChemDoodle = iframeBody.contentWindow.ChemDoodleVar;
  ChemDoodle.ELEMENT['H'].jmolColor = 'black';
  ChemDoodle.ELEMENT['S'].jmolColor = '#B9A130';
  // Main ketcher.
  const sketcher = new ChemDoodle.SketcherCanvas('sketcher', sketcherWidth, sketcherHeight,
    {useServices:false, requireStartingAtom: false});
  // We init the ketcher with an empty molecule object.
  ChemDoodle.readJSON("{\"m\":[{\"a\":[]}]}");
  sketcher.styles.atoms_displayTerminalCarbonLabels_2D = true;
  sketcher.styles.atoms_useJMOLColors = true;
  sketcher.styles.bonds_clearOverlaps_2D = true;
  sketcher.repaint();

  // Preview ketcher.
  const sketcher_viewer = new ChemDoodle.ViewerCanvas('sketcher-viewer-tiny', sketcherViewerWidth, sketcherViewerHeight);
  sketcher_viewer.styles.atoms_displayTerminalCarbonLabels_2D = true;
  sketcher_viewer.styles.atoms_useJMOLColors = true;
  sketcher_viewer.styles.bonds_clearOverlaps_2D = true;
  //sketcher_viewer.repaint();
  sketcher_viewer.emptyMessage = 'No data loaded';
  sketcher.oldFunc = sketcher.checksOnAction;

  /*   Refactor the function, in order for the preview ketcher to be a copy of the main ketcher,
         updated at every modification of the main ketcher. */
  sketcher.checksOnAction = function(force){
    this.oldFunc(force);
    //sketcher.repaint();
    let mols = sketcher.molecules;
    let forms = sketcher.shapes;
    sketcher_viewer.loadContent(mols, forms);
    sketcher.center();
    for ( let i = 0, ii = this.molecules.length; i < ii; i++) {
      this.molecules[i].check();
    }
  };
  iframeBody.contentWindow.sketcherViewerVar = sketcher_viewer;
  iframeContent.querySelector(Selectors.elements.canvas.resizeButton).addEventListener('click', function_resize, iframeBody);
  // Need this for firefow ESR < 120 since has is not present by default
  window.document.querySelector('.modal-content').setAttribute('style', ' height:100vh;');
  await changeLangString(iframeContent);
};

/*  Button activated function, checks for the values of width and height in the input elements.
    If empty, uses the default value. */
export const function_resize= (e) => {
  const iframeContent = e.target.ownerDocument;
  let input_width = iframeContent.querySelector(Selectors.elements.canvas.widthInput).valueAsNumber;
  let input_height = iframeContent.querySelector(Selectors.elements.canvas.heightInput).valueAsNumber;
  let sketcher_viewer = window.document.querySelector(Selectors.elements.canvas.selector2D).contentWindow.sketcherViewerVar;
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
  sketcher_viewer.resize(width, height);
};

export const changeLangString = async(iframeContent) => {
  const button = iframeContent.querySelector(Selectors.elements.canvas.resizeButton);
  button.firstChild.data =await getString('resize', component);

  var height_input = iframeContent.querySelector(Selectors.elements.canvas.heightInputLabel);
  height_input.firstChild.data = await getString('height', component);

  var width_input = iframeContent.querySelector(Selectors.elements.canvas.widthInputLabel);
  width_input.firstChild.data = await getString('width', component);
};
