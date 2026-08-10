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

/**
 * Tiny Molstructure plugin.
 *
 * @package    tiny_molstructure
 * @copyright  Université de Strasbourg unistra.fr
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class plugininfo extends plugin implements plugin_with_buttons, plugin_with_configuration, plugin_with_menuitems {
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
    public static function get_plugin_configuration_for_context(
        context $context,
        array $options,
        array $fpoptions,
        ?editor $editor = null
    ): array {
        $enablecustomsketchersize = (bool) get_config('tiny_molstructure', 'enablecustomsketchersize');
        $sketcherwidth = $enablecustomsketchersize
            ? self::get_dimension_setting('sketcherwidth', 500)
            : 400;
        $sketcherheight = $enablecustomsketchersize
            ? self::get_dimension_setting('sketcherheight', 300)
            : 200;

        if (isset($options['context'])) {
            $context = $options['context'];
        } else {
            $context = context_system::instance();
        }
        return [
            'contextid' => $context->id,
            'enablereactions' => (bool) get_config('tiny_molstructure', 'enablereactions'),
            'enableresizablesketcher' => (bool) get_config('tiny_molstructure', 'enableresizablesketcher'),
            'enablecustomsketchersize' => $enablecustomsketchersize,
            'sketcherwidth' => $sketcherwidth,
            'sketcherheight' => $sketcherheight,
        ];
    }

    /**
     * Get a validated dimension setting.
     *
     * @param string $name Setting name
     * @param int $default Default value when the setting is absent or invalid
     * @return int
     */
    private static function get_dimension_setting(string $name, int $default): int {
        $value = (int) get_config('tiny_molstructure', $name);
        return $value >= 50 && $value <= 1000 ? $value : $default;
    }

    /**
     * Whether the plugin is enabled for the editor context.
     *
     * @param context $context The context that the editor is used within
     * @param array $options The options passed in when requesting the editor
     * @param array $fpoptions The file picker options passed in when requesting the editor
     * @param editor|null $editor The editor instance in which the plugin is initialised
     * @return bool
     */
    public static function is_enabled(
        context $context,
        array $options,
        array $fpoptions,
        ?editor $editor = null
    ): bool {
        // Disabled if:
        // - Not logged in or guest.
        // - Files are not allowed.
        $canhavefiles = !empty($options['maxfiles']);
        return isloggedin() && !isguestuser() && $canhavefiles;
    }
}
