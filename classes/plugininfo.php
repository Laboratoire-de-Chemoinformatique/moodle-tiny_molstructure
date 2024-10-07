<?php
// This file is part of Moodle - https://moodle.org/
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
 * Tiny molstructure editor plugin for Moodle.
 *
 * @package     tiny_molstructure
 * @copyright   2024 University of Strasbourg unistra.fr
 * @author Céline Pervès <louis.plyer@unistra.fr>
 * @author Louis Plyer <louis.plyer@unistra.fr>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace tiny_molstructure;

use context;
use context_system;
use editor_tiny\editor;
use editor_tiny\plugin;
use editor_tiny\plugin_with_buttons;
use editor_tiny\plugin_with_configuration;
use editor_tiny\plugin_with_menuitems;
use filter_manager;

/**
 * Tiny Molstructure plugin.
 *
 * @package    tiny_molstructure
 * @copyright  Université de Strasbourg unistra.fr
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class plugininfo extends plugin implements plugin_with_buttons, plugin_with_menuitems, plugin_with_configuration {

    #[\Override]
    public static function is_enabled(
            context $context,
            array $options,
            array $fpoptions,
            ?editor $editor = null
    ): bool {
        // Disabled if:
        // - Not logged in or guest.
        // - Files are not allowed.
        // - Only URL are supported.
        $canhavefiles = !empty($options['maxfiles']);
        $canhaveexternalfiles = !empty($options['return_types']) && ($options['return_types'] & FILE_EXTERNAL);
        return isloggedin() && !isguestuser() && $canhavefiles && $canhaveexternalfiles;
    }

    /**
     * return available buttons
     * @return string[]
     */
    public static function get_available_buttons(): array {
        return [
            'tiny_molstructure/molstructure',
        ];
    }

    /**
     * return availble menu items
     * @return string[]
     */
    public static function get_available_menuitems(): array {
        return [
            'tiny_molstructure/molstructure',
        ];
    }

    /**
     * return configuration context
     * @param context $context
     * @param array $options
     * @param array $fpoptions
     * @param editor|null $editor
     * @return array
     * @throws \dml_exception
     */
    public static function get_plugin_configuration_for_context(context $context, array $options, array $fpoptions,
        ?editor $editor = null): array {
        if (isset($options['context'])) {
            $context = $options['context'];
        } else {
            $context = context_system::instance();
        }
        return [
            'contextid' => $context->id,
        ];
    }
}
