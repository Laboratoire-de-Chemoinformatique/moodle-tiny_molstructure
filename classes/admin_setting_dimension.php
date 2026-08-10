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
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Validated dimension administration setting.
 *
 * @package    tiny_molstructure
 * @copyright  2026 University of New England
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace tiny_molstructure;

/**
 * Integer setting constrained to the dimensions supported by the plugin UI.
 */
class admin_setting_dimension extends \admin_setting_configtext {
    /**
     * Validate a dimension before storage.
     *
     * @param string $data Submitted value
     * @return true|string True when valid, otherwise a validation error
     */
    public function validate($data) {
        $result = parent::validate($data);
        if ($result !== true) {
            return $result;
        }

        $value = (int) $data;
        if ($value < plugininfo::MIN_DIMENSION || $value > plugininfo::MAX_DIMENSION) {
            return get_string('dimensionsmustbebetween', 'tiny_molstructure', [
                'min' => plugininfo::MIN_DIMENSION,
                'max' => plugininfo::MAX_DIMENSION,
            ]);
        }

        return true;
    }
}
