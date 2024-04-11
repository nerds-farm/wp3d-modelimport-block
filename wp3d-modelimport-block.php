<?php
/**
 * Plugin Name:       WP3D Model Import Viewer
 * Description:       The import of models is allowed from Media Library, Folders and also from CDN. There are many allowed formats. Ideal to display all kinds models. The aim is to combine 3D and Web Design.
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Version:           1.0.1
 * Author:            WP3D
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp3d-modelimport
 * Domain Path:       /languages
 *
 * @package           wp3d
 */
/**
 * Copyright
 *
 * @copyright 2021-2024  Nerds farm srl. info@wp3d.site
 *
 *  Original development of this plugin was kindly funded by NERDS.FARM srl
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */
define('WP3D_MODELIMPORT_VERSION', '1.0.1');
define('WP3D_MODELIMPORT_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('WP3D_MODELIMPORT_PLUGIN_URL', plugin_dir_url(__FILE__));
define('WP3D_MODELIMPORT_PLUGIN_FILE', __FILE__);
define('WP3D_MODELIMPORT_PLUGIN_BASE', plugin_basename(__FILE__));

add_action('init', function () {
    $loaded = load_plugin_textdomain(
            'wp3d-modelimport',
            false,
            dirname(plugin_basename(__FILE__)) . '/languages'
    );

    register_block_type(__DIR__ . '/build/blocks/modelimport');

    $localized = wp_set_script_translations('wp3d-modelimport-editor-script', 'wp3d-modelimport', plugin_dir_path(__FILE__) . 'languages');

    include_once(__DIR__ . DIRECTORY_SEPARATOR . 'plugin.php');
    $wp3d = \WP3D\Plugin::instance();
});
