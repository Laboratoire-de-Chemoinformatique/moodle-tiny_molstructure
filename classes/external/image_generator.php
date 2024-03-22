<?php
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
 * Tiny molstructure external API for generating image.
 *
 * @package     tiny_molstructure
 * @copyright   2024 University of Strasbourg unistra.fr
 * @author Céline Pervès <louis.plyer@unistra.fr>
 * @author Louis Plyer <louis.plyer@unistra.fr>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace tiny_molstructure\external;
defined('MOODLE_INTERNAL') || die();

use context;
use context_user;
use external_api;
use external_function_parameters;
use external_single_structure;
use external_value;
use stdClass;

/**
 * Generate an image with datas provided by image dataUrl representation
 */
class image_generator extends external_api {
    /**
     * external function parameters
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters([
            'itemId' => new external_value(PARAM_TEXT, 'itemid', VALUE_REQUIRED),
            'imageDataUrl' => new external_value(PARAM_RAW, 'DataImageUrl', VALUE_REQUIRED),
            'contextId' => new external_value(PARAM_INT, 'editor contextid', VALUE_REQUIRED),
        ]);
    }

    /**
     * create a file from imagedatas and return its url
     * @param string $itemid
     * @param string $imagedataurl
     * @param int $contextid
     * @return array
     * @throws \invalid_parameter_exception
     */
    public static function execute(string $itemid, string $imagedataurl, int $contextid): array {
        global $CFG, $USER;
        [
            'itemId' => $itemid,
            'imageDataUrl' => $imagedataurl,
            'contextId' => $contextid,
        ] = self::validate_parameters(self::execute_parameters(), [
            'itemId' => $itemid,
            'imageDataUrl' => $imagedataurl,
            'contextId' => $contextid,
        ]);
        $context = context::instance_by_id($contextid);
        self::validate_context($context);
        $usercontext = context_user::instance($USER->id);
        $fs       = get_file_storage();
        $filename = "upfile_" . time(). '_' . floor(mt_rand() / mt_getrandmax() * 1000) . ".png";
        // Assume a root level filepath.
        $filepath = "/";
        $farea = "draft";
        $comp = "user";

        // Make our filerecord.
        $record            = new  stdClass();
        $record->filearea  = $farea;
        $record->component = $comp;
        $record->filepath  = $filepath;
        $record->itemid    = $itemid;
        $record->license   = $CFG->sitedefaultlicense;
        $record->author    = fullname($USER);
        $record->contextid = $usercontext->id;
        $record->userid    = $USER->id;
        $record->source    = '';
        $record->filename = $filename;

        if ($fs->file_exists($usercontext->id, $comp, $farea, $itemid, $filepath, $filename)) {
            // Delete existing draft files.
            $file = $fs->get_file($usercontext->id, $comp, $farea, $itemid, $filepath, $filename);
            $file->delete();
        }
        $imagedataurl = base64_decode(preg_replace('/^data:image\/png;base64,/', '', $imagedataurl));
        $fs->create_file_from_string($record, $imagedataurl);
        return [
            'fileUrl' => "$CFG->wwwroot/draftfile.php/$usercontext->id/user/draft/$itemid/$filename",
        ];
    }

    /**
     * external function return parameters
     * @return external_single_structure
     */
    public static function execute_returns(): external_single_structure {
        return new external_single_structure([
            'fileUrl' => new external_value(PARAM_RAW, 'File url'),
        ]);
    }
}

