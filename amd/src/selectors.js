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
        canvas: {
            selector2D: '.molstructure_2D_iframe',
            selector3D: '.molstructure_3D_iframe',
            ketcherviewId: '#sketcher-viewer-tiny',
            heightInputLabel: '#label_height_input_molstructure',
            widthInputLabel: '#label_width_input_molstructure',
            heightInput: '#height_input_molstructure',
            widthInput: '#width_input_molstructure',
            resizeButton: '#button-size-button'

        },
    }
};
