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
 * Administration settings for Tiny Molstructure.
 *
 * @package    tiny_molstructure
 * @copyright  2026 University of New England
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

if ($hassiteconfig && $ADMIN->fulltree) {
    $settings->add(new admin_setting_configcheckbox(
        'tiny_molstructure/enablereactions',
        get_string('enablereactions', 'tiny_molstructure'),
        get_string('enablereactions_desc', 'tiny_molstructure'),
        0,
    ));

    $settings->add(new admin_setting_configcheckbox(
        'tiny_molstructure/enableresizablesketcher',
        get_string('enableresizablesketcher', 'tiny_molstructure'),
        get_string('enableresizablesketcher_desc', 'tiny_molstructure'),
        0,
    ));

    $settings->add(new admin_setting_configcheckbox(
        'tiny_molstructure/enablecustomsketchersize',
        get_string('enablecustomsketchersize', 'tiny_molstructure'),
        get_string('enablecustomsketchersize_desc', 'tiny_molstructure'),
        0,
    ));

    $setting = new \tiny_molstructure\admin_setting_dimension(
        'tiny_molstructure/sketcherwidth',
        get_string('sketcherwidth', 'tiny_molstructure'),
        get_string('sketcherwidth_desc', 'tiny_molstructure'),
        500,
        PARAM_INT,
    );
    $settings->add($setting);

    $setting = new \tiny_molstructure\admin_setting_dimension(
        'tiny_molstructure/sketcherheight',
        get_string('sketcherheight', 'tiny_molstructure'),
        get_string('sketcherheight_desc', 'tiny_molstructure'),
        300,
        PARAM_INT,
    );
    $settings->add($setting);

    $settings->add(new admin_setting_configcheckbox(
        'tiny_molstructure/enablecustomoutputsize',
        get_string('enablecustomoutputsize', 'tiny_molstructure'),
        get_string('enablecustomoutputsize_desc', 'tiny_molstructure'),
        0,
    ));

    $setting = new \tiny_molstructure\admin_setting_dimension(
        'tiny_molstructure/outputwidth',
        get_string('outputwidth', 'tiny_molstructure'),
        get_string('outputwidth_desc', 'tiny_molstructure'),
        400,
        PARAM_INT,
    );
    $settings->add($setting);

    $setting = new \tiny_molstructure\admin_setting_dimension(
        'tiny_molstructure/outputheight',
        get_string('outputheight', 'tiny_molstructure'),
        get_string('outputheight_desc', 'tiny_molstructure'),
        250,
        PARAM_INT,
    );
    $settings->add($setting);
}
