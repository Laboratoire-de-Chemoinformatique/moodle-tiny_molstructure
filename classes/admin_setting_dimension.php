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
    /** Minimum supported dimension. */
    public const MIN_VALUE = 50;

    /** Maximum supported dimension. */
    public const MAX_VALUE = 1000;

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
        if ($value < self::MIN_VALUE || $value > self::MAX_VALUE) {
            return get_string('dimensionsmustbebetween', 'tiny_molstructure', [
                'min' => self::MIN_VALUE,
                'max' => self::MAX_VALUE,
            ]);
        }

        return true;
    }
}
