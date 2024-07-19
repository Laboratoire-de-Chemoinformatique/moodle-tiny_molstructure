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

export const initCanvasSpectrum = async(editor,
                                  iframeBody,
                                  sketcherWidth=400,
                                  sketcherHeight=200,
                                  ) => {
    const iframeContent = iframeBody.contentDocument;
    let ChemDoodle = iframeBody.contentWindow.ChemDoodleVar;
    // Main ketcher.
    let sketcherSpectrum = new ChemDoodle.PerspectiveCanvas('sketcherSpectrum', sketcherWidth, sketcherHeight);
    sketcherSpectrum.styles.plots_color="#00B918";
    sketcherSpectrum.styles.plots_width=2;
    sketcherSpectrum.emptyMessage="Please insert a Jcamp file in the area bellow.";
    sketcherSpectrum.styles.text_font_size = 14;
    sketcherSpectrum.styles.text_font_families[0] = "Impact";
    sketcherSpectrum.styles.text_font_families[1] = "Charcoal";
    sketcherSpectrum.styles.text_font_families[2] = 'sans-serif';
    sketcherSpectrum.repaint();
    //let spectrum = ChemDoodle.readJCAMP(spectrumJcampFile);

    //sketcherSpectrum.loadSpectrum(spectrum);

    // Preview ketcher.
    /*const sketcher_viewer_spectrum = new ChemDoodle.ViewerCanvas(
        Selectors.elements.canvas2D.ketcherviewId, sketcherViewerWidth, sketcherViewerHeight);
    sketcher_viewer_spectrum.styles.atoms_displayTerminalCarbonLabels_2D = true;
    sketcher_viewer_spectrum.styles.atoms_useJMOLColors = true;
    sketcher_viewer_spectrum.styles.bonds_clearOverlaps_2D = true;
    //sketcher_viewer.repaint();
    sketcher_viewer_spectrum.emptyMessage = 'No data loaded';
    sketcher.oldFunc = sketcher.checksOnAction;*/

    /*   Refactor the function, in order for the preview ketcher to be a copy of the main ketcher,
           updated at every modification of the main ketcher.
    sketcher.checksOnAction = function(force){
        this.oldFunc(force);
        //sketcher.repaint();
        let mols = sketcher.molecules;
        let forms = sketcher.shapes;
        sketcher_viewer_spectrum.loadContent(mols, forms);
        sketcher.center();
        for ( let i = 0, ii = this.molecules.length; i < ii; i++) {
            this.molecules[i].check();
        }
    };
    iframeBody.contentWindow.sketcherViewerVar = sketcher_viewer;*/
    iframeContent.querySelector(Selectors.elements.canvasSpectrum.updateButton)
        .addEventListener('click', (e) => function_update(e, ChemDoodle, sketcherSpectrum), iframeBody);
    // Need this for firefow ESR < 120 since has is not present by default
    window.document.querySelector('.modal-content').setAttribute('style', ' height:100vh;');
    await changeLangString(iframeContent);
};

// Displays the view to the user.
export const  function_displaySVG= (iframeContent) => {
    const imgDataURL =  iframeContent.querySelector('#sketcherSpectrum').toDataURL('image/svg+xml');

    const imgElement = iframeContent.createElement('img');
    imgElement.src = imgDataURL;
    imgElement.id = Selectors.elements.canvasSpectrum.ketcherviewId;
    iframeContent.querySelector(Selectors.elements.canvasSpectrum.viewId).innerHTML = ''; // Clear previous content
    iframeContent.querySelector(Selectors.elements.canvasSpectrum.viewId).appendChild(imgElement);
};
/*  Button activated function, checks for the values of JcampFile, xlabel and ylabel in the input elements.
    If empty, uses the default value. */
export const function_update= (e, ChemDoodle, sketcherSpectrum) => {
    const iframeContent = e.target.ownerDocument;

    let xLabel = iframeContent.querySelector(Selectors.elements.canvasSpectrum.xlabelInput).value;
    let yLabel = iframeContent.querySelector(Selectors.elements.canvasSpectrum.ylabelInput).value;
    let title =  iframeContent.querySelector(Selectors.elements.canvasSpectrum.titleInput).value;
    let spectrumJcampFile = iframeContent.querySelector(Selectors.elements.canvasSpectrum.jcampInput).value;
    let integration = iframeContent.querySelector(Selectors.elements.canvasSpectrum.integrationInput);
    let inverseAxis = iframeContent.querySelector(Selectors.elements.canvasSpectrum.inversexaxisInput);

    sketcherSpectrum.spectrum = undefined;
    sketcherSpectrum.repaint();

    let spectrum = ChemDoodle.readJCAMP(spectrumJcampFile);
    let spectrum2 = ChemDoodle.readJCAMP(iframeContent.querySelector(Selectors.elements.canvasSpectrum.jcampInput).value);

    sketcherSpectrum.loadSpectrum(spectrum);
    sketcherSpectrum.loadSpectrum(spectrum2);

    spectrum.xUnit = xLabel;
    spectrum.yUnit = yLabel;
    spectrum.title = title;
    if (integration.checked) {
        sketcherSpectrum.styles.plots_showIntegration = true;
    } else {
        sketcherSpectrum.styles.plots_showIntegration = false;
    }
    if (inverseAxis.checked) {
        sketcherSpectrum.styles.plots_flipXAxis = true;
    } else {
        sketcherSpectrum.styles.plots_flipXAxis = false;
    }
    //sketcherSpectrum.loadSpectrum(spectrum);
    //function_displaySVG(iframeContent);
};

export const changeLangString = async(iframeContent) => {
    const button = iframeContent.querySelector(Selectors.elements.canvasSpectrum.updateButton);
    button.firstChild.data = await getString('update', component);

    var jcampfile = iframeContent.querySelector(Selectors.elements.canvasSpectrum.jcampInputLabel);
    jcampfile.firstChild.data = await getString('jcamp', component);

    var xlabel = iframeContent.querySelector(Selectors.elements.canvasSpectrum.xlabelInputLabel);
    xlabel.firstChild.data = await getString('xlabel', component);

    var ylabel = iframeContent.querySelector(Selectors.elements.canvasSpectrum.ylabelInputLabel);
    ylabel.firstChild.data = await getString('ylabel', component);

    var integration = iframeContent.querySelector(Selectors.elements.canvasSpectrum.integrationInputLabel);
    integration.firstChild.data = await getString('integration', component);

    var inverse = iframeContent.querySelector(Selectors.elements.canvasSpectrum.inversexaxisInputLabel);
    inverse.firstChild.data = await getString('inverseaxis', component);

    var title = iframeContent.querySelector(Selectors.elements.canvasSpectrum.titleInputLabel);
    title.firstChild.data = await getString('title', component);
};
