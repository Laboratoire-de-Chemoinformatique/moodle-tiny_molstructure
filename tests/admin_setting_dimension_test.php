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
 * Dimension administration setting tests.
 *
 * @package    tiny_molstructure
 * @category   test
 * @copyright  2026 University of New England
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace tiny_molstructure;

/**
 * Tests for the validated dimension setting.
 *
 * @covers \tiny_molstructure\admin_setting_dimension
 */
final class admin_setting_dimension_test extends \advanced_testcase {
    /**
     * Values must be integers within the supported pixel range.
     */
    public function test_validate(): void {
        global $CFG;
        require_once($CFG->libdir . '/adminlib.php');

        $setting = new admin_setting_dimension(
            'tiny_molstructure/testdimension',
            'Test dimension',
            '',
            100,
            PARAM_INT,
        );

        $this->assertTrue($setting->validate('50'));
        $this->assertTrue($setting->validate('1000'));
        $this->assertIsString($setting->validate('49'));
        $this->assertIsString($setting->validate('1001'));
        $this->assertIsString($setting->validate('invalid'));
    }
}
