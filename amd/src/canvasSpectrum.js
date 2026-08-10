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

    iframeContent.querySelector(Selectors.elements.canvasSpectrum.updateButton)
        .addEventListener('click', (e) => function_update(e), iframeBody);

    iframeContent.querySelector(Selectors.elements.canvasSpectrum.inputButton)
        .addEventListener('click', function() {
            iframeContent.querySelector(Selectors.elements.canvasSpectrum.jcampInput).click();
        });
    iframeContent.querySelector(Selectors.elements.canvasSpectrum.jcampInput)
        .addEventListener('change', (e) => function_insert(e, ChemDoodle, sketcherSpectrum), iframeBody);

    iframeContent.querySelector(Selectors.elements.canvasSpectrum.updateKetcherButton)
        .addEventListener('click', (e) => function_update_ketcher(e, ChemDoodle, sketcherSpectrum), iframeBody);

    await changeLangString(iframeContent);
};

// Displays the view to the user.
export const  function_displaySVG= (iframeContent) => {
    const imgDataURL =  iframeContent.querySelector('#sketcherSpectrum').toDataURL('image/svg+xml');

    const imgElement = iframeContent.createElement('img');
    imgElement.src = imgDataURL;
    imgElement.id = Selectors.elements.canvasSpectrum.ketcherviewId;
    let testimg = iframeContent.querySelector(Selectors.elements.canvasSpectrum.viewId);
    testimg.innerHTML = ''; // Clear previous content
    iframeContent.querySelector(Selectors.elements.canvasSpectrum.viewId).appendChild(imgElement);
};
/*  Button activated function, checks for the values of JcampFile, xlabel and ylabel in the input elements.
    If empty, uses the default value. */
export const function_insert= (e, ChemDoodle, sketcherSpectrum) => {
    const iframeContent = e.target.ownerDocument;
    sketcherSpectrum.spectrum = undefined;
    sketcherSpectrum.repaint();

    const file = iframeContent.querySelector(Selectors.elements.canvasSpectrum.jcampInput).files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            let content = e.target.result;
            let spectrum = ChemDoodle.readJCAMP(content);
            sketcherSpectrum.loadSpectrum(spectrum);

            function_displaySVG(iframeContent);
        };
        reader.readAsText(file);
    }
};
export const function_update= (e) => {
    const iframeContent = e.target.ownerDocument;
    function_displaySVG(iframeContent);
};

export const function_update_ketcher= (e, ChemDoodle, sketcherSpectrum) => {
    const iframeContent = e.target.ownerDocument;
    const file = iframeContent.querySelector(Selectors.elements.canvasSpectrum.jcampInput).files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            let content = e.target.result;
            let spectrum = ChemDoodle.readJCAMP(content);
            let xLabel = iframeContent.querySelector(Selectors.elements.canvasSpectrum.xlabelInput).value;
            let yLabel = iframeContent.querySelector(Selectors.elements.canvasSpectrum.ylabelInput).value;
            let title = iframeContent.querySelector(Selectors.elements.canvasSpectrum.titleInput).value;
            let integration = iframeContent.querySelector(Selectors.elements.canvasSpectrum.integrationInput);
            let inverseAxis = iframeContent.querySelector(Selectors.elements.canvasSpectrum.inversexaxisInput);

            if (xLabel !== '') {
                spectrum.xUnit = xLabel;
            }
            if (yLabel !== '') {
                spectrum.yUnit = yLabel;
            }
            if (title !== '') {
                spectrum.title = title;
            }

            sketcherSpectrum.styles.plots_showIntegration = integration.checked ? true : false;
            sketcherSpectrum.styles.plots_flipXAxis = inverseAxis.checked ? true : false;
            sketcherSpectrum.loadSpectrum(spectrum);
        };
        reader.readAsText(file);
    }
};

export const changeLangString = async(iframeContent) => {
    const button = iframeContent.querySelector(Selectors.elements.canvasSpectrum.updateButton);
    button.firstChild.data = await getString('update', component);

    const button2 = iframeContent.querySelector(Selectors.elements.canvasSpectrum.updateKetcherButton);
    button2.firstChild.data = await  getString('updateKetcherButton', component);

    /*var jcampfile = iframeContent.querySelector(Selectors.elements.canvasSpectrum.jcampInputLabel);
    jcampfile.firstChild.data = await getString('jcamp', component);
*/
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
