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
import Selectors from "tiny_molstructure/selectors";
import notification from "core/notification";
import Ajax from 'core/ajax';
import {getDraftItemId} from 'editor_tiny/options';
import {getContextId} from "./options";

/**
 * @module     tiny_molstructure/ketcher
 * @copyright   2024 University of Strasbourg unistra.fr
 * @author Céline Pervès <louis.plyer@unistra.fr>
 * @author Louis Plyer <louis.plyer@unistra.fr>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * Visual Mathquill editor input instanciation
 */

export const insertImage = async(iframeBody, editor) => {
  let divContent = '';
  // Getting the viewer canvas.
  let ketcherViewer = iframeBody.contentDocument.querySelector(Selectors.elements.canvas.ketcherviewId);
  const imgDataURL = ketcherViewer.toDataURL('image/svg');
  const itemId = getDraftItemId(editor);
  const fileReturn = await createAnUploadImageFile(itemId, imgDataURL, getContextId(editor));
  // To retrieve image.
  divContent = "<img src=\"" + fileReturn.fileUrl + "\" alt=\"ChemDoodle PNG\"/>";
  editor.insertContent(divContent);
};

export const createAnUploadImageFile = async (itemId, imageDataUrl, contextId) => {
  const generatedImageResult = await new Promise( resolve => {
    return Ajax.call([{
      methodname: 'tiny_molstructure_generate_store_image',
      args: {
        'itemId': itemId,
        'imageDataUrl': imageDataUrl,
        'contextId': contextId,
      },
      done : result => {
        resolve(result);
      },
      fail: notification.exception
    }]);
  });
  return generatedImageResult;
};

