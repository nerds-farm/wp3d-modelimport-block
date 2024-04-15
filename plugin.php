<?php

namespace WP3D;

class Plugin {

    
    //https://3dviewer.net/info/index.html#supported_file_formats
    public static $mimes = [
        'stl' => 'application/octet-stream',
        'wrl' => 'model/vrml',
        'glb' => 'model/gltf-binary',
        'gltf' => 'model/gltf-json',
        'obj' => 'text/plain',
        'zip' => 'application/zip',
        'usdz' => 'model/vnd.usdz+zip',
        'mp4' => 'video/mp4',
        
        'ttf' => 'application/x-font-ttf', // font
        'dae' => 'model/dae',
        'fbx' => 'model/fbx',
        //'jpg' => 'image/jpeg',
        //'png' => 'image/png',
        'hdr' => 'image/vnd.radiance',
        'exr' => 'image/x-exr',
        'json' => 'application/json'
    ];
    //Media Mime
    public static $mimes3D = [
        'stl' => 'application/octet-stream',
        'wrl' => 'model/vrml',
        'glb' => 'model/gltf-binary',
        'gltf' => 'model/gltf-json',
        'obj' => 'text/plain',
        'zip' => 'application/zip',
        'usdz' => 'model/vnd.usdz+zip',
        'dae' => 'model/dae',
        'fbx' => 'model/fbx',
    ];
    public static $mimesImage = [
        'jpg' => 'image/jpeg',
        'png' => 'image/png',
        'gif' => 'image/gif',
        'webp' => 'image/webp'
    ];
    public static $mimesHdr = [
        'hdr' => 'image/vnd.radiance',
    ];
    public static $mimesExr = [
        'exr' => 'image/x-exr'
    ];
    public static $mimesFont = [
        'ttf' => 'application/x-font-ttf', // font
    ];
    public static $mimesVideo = [
        'mp4' => 'video/mp4'
    ];
    public static $mimesJson = [
        'json' => 'application/json'
    ];

    
    /**
     * Instance.
     *
     * Holds the plugin instance.
     *
     * @since 1.0.1
     * @access public
     * @static
     *
     * @var Plugin
     */
    public static $instance = null;

    /**
     * Constructor
     *
     * @since 1.0.1
     *
     * @access public
     */
    public function __construct() {

	$this->setup_hooks();

        $this->handle_import_file();

    }

    /**
     * Instance.
     *
     * Ensures only one instance of the plugin class is loaded or can be loaded.
     *
     * @since 1.0.0
     * @access public
     * @static
     *
     * @return Plugin An instance of the class.
     */
    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();

            /**
             * on loaded.
             *
             * Fires when was fully loaded and instantiated.
             *
             * @since 1.0.1
             */
            do_action('wp3d/instance', self::$instance);
        }

        return self::$instance;
    }

    public function setup_hooks() {

        add_action('wp_enqueue_scripts', [$this, 'wp3d_register_plugin_libs']);
        add_action('enqueue_block_editor_assets', [$this, 'wp3d_register_plugin_libs']);
        //add_action('wp_enqueue_scripts', [$this, 'wp_enqueue_scripts']);
        add_action('admin_enqueue_scripts', [$this, 'admin_enqueue_scripts']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_block_editor_assets']);
        add_action('wp_enqueue_scripts', [$this, 'wp3d_modelimport_custom_javascript']);
        add_action('admin_enqueue_scripts', [$this, 'wp3d_modelimport_custom_javascript']);
        add_action('wp_enqueue_scripts', [$this, 'wp3d_modelimport_load_frontscript'] );
        add_filter('block_categories_all', [$this, 'block_categories_all']);

        add_filter('upload_mimes', [$this, 'add_3d_mime_types']);
        if (version_compare(get_bloginfo('version'), '5.1') >= 0) {
            add_filter('wp_check_filetype_and_ext', [$this, '_add_3d_mime_types'], 10, 5);
        } else {
            add_filter('wp_check_filetype_and_ext', [$this, '_add_3d_mime_types'], 10, 4);
        }
    }

    public function add_3d_mime_types($mimes) {
        foreach (self::$mimes as $mkey => $mime) {
            $mimes[$mkey] = $mime;
        }
        //var_dump($mimes); die();
        return $mimes;
    }

    function _add_3d_mime_types($attr, $file, $filename, $mimes, $real_mime = null) {
        $proper_filename = '';
        if (!empty($attr['ext'])) {
            $ext = $attr['ext'];
        } else {
            $tmp = explode(".", $filename);
            if (count($tmp) == 1) {
                return $attr;
            }
            $ext = array_pop($tmp);
        }

        switch ($ext) {
            case 'glb':
            case 'gltf':
                $type = self::$mimes['glb']; //'model/gltf-binary';
                return compact('ext', 'type', 'proper_filename');
            case 'usdz':
            default:
                if (isset(self::$mimes[$ext])) {
                    $type = self::$mimes[$ext];
                    return compact('ext', 'type', 'proper_filename');
                }
        }
        return $attr;
    }

    protected function handle_import_file() {

        if (!empty($_GET['action']) && $_GET['action'] == 'wp3d') {

            if (!empty($_GET['url'])) {
                $url = sanitize_url($_GET['url']);

                $media_id = attachment_url_to_postid($url);

                if ($media_id) {
                    $file_path = get_attached_file($media_id);
                    $file_path = str_replace('/', DIRECTORY_SEPARATOR, $file_path);

                    if (file_exists($file_path)) {
                        $file_info = pathinfo($file_path); //[dirname],[basename],[extension],[filename]
                        $wp_upload_dir = wp_upload_dir();
                        switch ($file_info['extension']) {
                            case 'zip':

                                $folder_3d = $wp_upload_dir['basedir'] . DIRECTORY_SEPARATOR . 'wp3d' . DIRECTORY_SEPARATOR . $media_id;
                                $folder_3d = str_replace('/', DIRECTORY_SEPARATOR, $folder_3d);
                                if (!is_dir($folder_3d)) {
                                    // extract in /uploads/wp3d/ID
                                    include_once(ABSPATH . DIRECTORY_SEPARATOR . 'wp-admin' . DIRECTORY_SEPARATOR . 'includes' . DIRECTORY_SEPARATOR . 'file.php');
                                    $unzip = unzip_file($file_path, $folder_3d);
                                    $zip = new \ZipArchive;
                                    if ($zip->open($file_path) === TRUE) {
                                        $zip->extractTo($folder_3d);
                                        $zip->close();
                                    }
                                }
                                // search inside the folder a valid file
                                $extensions = !empty($_GET['type']) ? $_GET['type'] : Utils::implode(array_filter(array_keys(self::$types)), '|');
                                $file = $this->rsearch($folder_3d, "/^.*\.(" . $extensions . ")$/");
                                if (!empty($file)) {
                                    $file_path = reset($file);
                                    $file_info = pathinfo($file_path);
                                }
                                break;
                        }

                        list($pre, $folder) = explode('uploads', $file_info['dirname'], 2);
                        $folder = str_replace(DIRECTORY_SEPARATOR, '/', $folder);
                        $url = $wp_upload_dir['baseurl'] . $folder . '/' . $file_info['filename'] . '.' . $file_info['extension'];
                    }
                }

                echo esc_url($url);
                die();
            }
        }
    }

    public function rsearch($folder, $pattern) {
        $dir = new \RecursiveDirectoryIterator($folder);
        $ite = new \RecursiveIteratorIterator($dir);
        $files = new \RegexIterator($ite, $pattern, \RegexIterator::GET_MATCH);
        $fileList = array();
        foreach ($files as $file) {
            $fileList[] = $file[0];
        }
        return $fileList;
    }

    public function enqueue_block_editor_assets() {
        wp_enqueue_style(
                'wp3d-modelimport-editor-stylesheets',
                WP3D_MODELIMPORT_PLUGIN_URL . 'assets/css/editor.css',
                [],
                filemtime(WP3D_MODELIMPORT_PLUGIN_DIR . 'assets/css/editor.css')
        );
    }

    public function block_categories_all($categories) {
        foreach ($categories as $cat) {
            if ($cat['slug'] == 'wp3d-blocks') {
                return $categories;
            }
        }
        return array_merge(
                [
                    [
                        'slug' => 'wp3d-blocks',
                        'title' =>'Wp3D',
                    ],
                ],
                $categories,
        );
        
    }

    public function wp3d_register_plugin_libs() {
        wp_register_script('nprogressbar', WP3D_MODELIMPORT_PLUGIN_URL . 'assets/lib/nprogress/nprogress.js', [], '0.3.5', true);
        wp_register_style('nprogressbar', WP3D_MODELIMPORT_PLUGIN_URL . 'assets/lib/nprogress/nprogress.css', [], '0.3.5');
    }

    public function admin_enqueue_scripts() {
        wp_enqueue_style('wp3d-modelimport-icons', WP3D_MODELIMPORT_PLUGIN_URL . '/assets/css/wp3d-icons.css', false, '1.0.0');
        wp_enqueue_style('wp3d-modelimport-admin', WP3D_MODELIMPORT_PLUGIN_URL . '/assets/css/admin.css', false, '1.0.0');
    }

    public function wp3d_modelimport_custom_javascript() {
        ?>
        <script>
            var wp3d_modelimport_path = "<?php echo esc_url(WP3D_MODELIMPORT_PLUGIN_URL); ?>";
        </script>
        <?php
    }

    public function wp_enqueue_scripts() {
        // JSON NAME: PATH_THEME/{domain}-{locale}-{handle}.json (wp3d-modelimport-it_IT-wp3d-modelimport-editor-script.json)
        wp_register_script('wp3d-modelimport-front-script-block', WP3D_MODELIMPORT_PLUGIN_URL . 'build/blocks/modelimport/modelimport.js', ['wp-i18n', 'nprogressbar'], WP3D_MODELIMPORT_VERSION, true);
        wp_set_script_translations(
                'wp3d-modelimport-front-script-block',
                'wp3d-modelimport',
                plugin_dir_path(__FILE__) . 'languages'
        );
    }
    public function wp3d_modelimport_load_frontscript() {

        wp_localize_script('wp3d-modelimport-view-script', 'ajax_var', array(
            'url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('wp3d-nonce')
        ));
    }
}
