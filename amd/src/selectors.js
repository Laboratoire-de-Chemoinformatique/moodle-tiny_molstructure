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
 * Tiny Equation plugin helper function to build queryable data selectors.
 *
 * @module      tiny_molstructure/selectors
 * @copyright   2024 University of Strasbourg unistra.fr
 * @author Céline Pervès <louis.plyer@unistra.fr>
 * @author Louis Plyer <louis.plyer@unistra.fr>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

export default {
    actions: {
        submit: '[data-action="save"]'
    },
    elements: {
        form: 'form',
        tabsSelectors: 'ul[id^=molstructure-navbar] a[data-toggle="tab"]',
        canvas2D: {
            tabSelector: 'ul[id^=molstructure-navbar] a[data-toggle="tab"][id^=molstructure-tab-2D]',
            selector: '.molstructure_2D_iframe',
            ketcherviewId: 'sketcher-viewer-tiny',
            heightInputLabel: '#label_height_input_molstructure',
            widthInputLabel: '#label_width_input_molstructure',
            heightInput: '#height_input_molstructure',
            widthInput: '#width_input_molstructure',
            resizeButton: '#button-size-button'

        },
        canvas3D: {
            tabSelector: 'ul[id^=molstructure-navbar] a[data-toggle="tab"][id^=molstructure-tab-3D]',
            selector: '.molstructure_3D_iframe',
            ketcherviewId: 'sketcher-viewer-tiny-3D',
            heightInputLabel: '#label_height_input_molstructure-3D',
            widthInputLabel: '#label_width_input_molstructure-3D',
            heightInput: '#height_input_molstructure-3D',
            widthInput: '#width_input_molstructure-3D',
            resizeButton: '#button-size-button-3D'
        },
        canvasSpectrum: {
            tabSelector: 'ul[id^=molstructure-navbar] a[data-toggle="tab"][id^=molstructure-tab-Spectrum]',
            selector: '.molstructure_Spectrum_iframe',
            ketcherviewId: 'sketcher-viewer-tiny-Spectrum',
            viewId: '#viewer-container-Spectrum',
            xlabelInputLabel: '#label_xlabel_input_molstructure-Spectrum',
            ylabelInputLabel: '#label_ylabel_input_molstructure-Spectrum',
            jcampInputLabel: '#label_jcamp_input_molstructure-Spectrum',
            inversexaxisInputLabel: '#label_inversexaxis_input_molstructure-Spectrum',
            integrationInputLabel: '#label_integration_input_molstructure-Spectrum',
            titleInputLabel: '#label_title_input_molstructure-Spectrum',
            xlabelInput: '#xlabel_input_molstructure-Spectrum',
            ylabelInput: '#ylabel_input_molstructure-Spectrum',
            jcampInput: '#jcamp_input_molstructure-Spectrum',
            inversexaxisInput: '#inversexaxis_input_molstructure-Spectrum',
            integrationInput: '#integration_input_molstructure-Spectrum',
            titleInput: '#title_input_molstructure-Spectrum',
            updateButton: '#button-size-button-Spectrum',
            inputButton: '#button-input-Spectrum'
        }
    }
};
