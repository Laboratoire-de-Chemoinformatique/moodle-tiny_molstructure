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
 * Tiny Molstructure plugin info tests.
 *
 * @package    tiny_molstructure
 * @category   test
 * @copyright  2026 University of New England
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace tiny_molstructure;

use context_system;

/**
 * Tests for Tiny Molstructure plugin info.
 *
 * @covers \tiny_molstructure\plugininfo
 */
final class plugininfo_test extends \advanced_testcase {
    /**
     * Reaction drawing is disabled by default.
     */
    public function test_reaction_drawing_defaults_to_disabled(): void {
        $this->resetAfterTest();

        $configuration = plugininfo::get_plugin_configuration_for_context(context_system::instance(), [], []);

        $this->assertFalse($configuration['enablereactions']);
    }

    /**
     * Reaction drawing can be enabled for Tiny editor instances.
     */
    public function test_reaction_drawing_setting_is_passed_to_configuration(): void {
        $this->resetAfterTest();
        set_config('enablereactions', 1, 'tiny_molstructure');

        $configuration = plugininfo::get_plugin_configuration_for_context(context_system::instance(), [], []);

        $this->assertTrue($configuration['enablereactions']);
    }

    /**
     * The plugin is available to authenticated users when the editor can store files.
     */
    public function test_is_enabled_when_editor_supports_files(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $this->assertTrue(plugininfo::is_enabled(
            context_system::instance(),
            ['maxfiles' => -1, 'return_types' => 1],
            [],
        ));
    }

    /**
     * File picker return types may be supplied separately from the editor options.
     */
    public function test_is_enabled_with_separate_filepicker_options(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $this->assertTrue(plugininfo::is_enabled(
            context_system::instance(),
            ['maxfiles' => -1],
            ['return_types' => 3],
        ));
    }

    /**
     * The plugin is unavailable when the editor cannot retain generated images.
     */
    public function test_is_disabled_when_editor_does_not_support_files(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $this->assertFalse(plugininfo::is_enabled(
            context_system::instance(),
            [],
            ['return_types' => 3],
        ));
    }

    /**
     * Guests cannot generate draft files.
     */
    public function test_is_disabled_for_guest_users(): void {
        $this->resetAfterTest();
        $this->setGuestUser();

        $this->assertFalse(plugininfo::is_enabled(
            context_system::instance(),
            ['maxfiles' => -1],
            [],
        ));
    }
}
