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
 * Tiny Molstructure UI.
 *
 * @module      tiny_molstructure/ui
 * @copyright   2024 University of Strasbourg unistra.fr
 * @author Céline Pervès <louis.plyer@unistra.fr>
 * @author Louis Plyer <louis.plyer@unistra.fr>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import MolstructureModal from 'tiny_molstructure/modal';
import ModalFactory from 'core/modal_factory';
import ModalEvents from 'core/modal_events';
import Selectors from 'tiny_molstructure/selectors';
import * as Config from 'core/config';
import {insertImage} from "./ketcher";
import {initCanvas2D} from "./canvas2D";
import {initCanvas3D} from "./canvas3D";

/**
 * Handle action
 * @param {TinyMCE} editor
 */
export const handleAction = (editor) => {
    displayDialogue(editor);
};

/**
 * Display the equation editor
 * @param {TinyMCE} editor
 * @returns {Promise<void>}
 */
export const displayDialogue = async(editor) => {
    let data = {};
    const modalPromises = await ModalFactory.create({
        type: MolstructureModal.TYPE,
        templateContext: getTemplateContext(editor, data),
        large: true,
    });

    modalPromises.show();
    const root = await modalPromises.getRoot();


    // Init canvas 2D.
    let editorRoot = root[0];
    const iframeBody2D = editorRoot.querySelector(Selectors.elements.canvas.selector2D);
    const iframeBody3D = editorRoot.querySelector(Selectors.elements.canvas.selector3D);
    iframeBody2D.contentWindow.addEventListener('DOMContentLoaded', function(){
        initCanvas2D(editor, iframeBody2D);
        editorRoot.querySelector('.modal-body .nav-tabs .nav-item .nav-link').classList.add('active');
        editorRoot.querySelector('.modal-body .nav-tabs .nav-item .nav-link').setAttribute('aria-selected','true');
        editorRoot.querySelector('.modal-body .tab-content .tab-pane').classList.add('active');
        editorRoot.querySelector('.modal-body .tab-content .tab-pane').classList.add('show');
    });
    iframeBody3D.contentWindow.addEventListener('DOMContentLoaded', function(){
        initCanvas3D(editor, iframeBody3D);
    });
    // Due to firefox need to force tab selection

    root.on(ModalEvents.hidden, (e) => {
        const submitAction = e.target.closest(Selectors.actions.submit);
        if (submitAction) {
            e.preventDefault();
            // Select current iframe
            const currentFrame = window.document.querySelector(Selectors.elements.canvas.selector2D);
            insertImage(currentFrame, editor);
        }
        modalPromises.destroy();
    });
    root.on(ModalEvents.save, (e) => {
        e.preventDefault();
        const currentFrame = window.document.querySelector(Selectors.elements.canvas.selector2D);
        insertImage(currentFrame, editor);
        modalPromises.destroy();
    });
};

/**
 * Get template context.
 * @param {TinyMCE} editor
 * @param {Object} data
 * @returns {Object}
 */
const getTemplateContext = (editor, data) => {
    return Object.assign({}, {
        elementid: editor.id,
        wwwroot: Config.wwwroot

    }, data);
};

