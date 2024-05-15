<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly 

$h = $attributes['viewport_ratio'] == "custom" ? 'height:'.$attributes['viewport_height'] : '';
$fix = $attributes['viewport_fixed'] ? " wp3d-viewport_fixed" : "";

$extra_attributes = [];
$extra_attributes['id'] = $attributes['ide'];
$extra_attributes['class'] = 'wp3d-render';
if ($fix) $extra_attributes['class'] += $fix;
?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes($extra_attributes) ); ?> data-settings='<?php echo wp_json_encode($attributes); ?>'>
        <div class="wp3d-container wp3d-importmodel-container"<?php if ($h) echo ' style="'.esc_attr($h).'"'; ?>>
            <canvas id="canvas-<?php echo esc_attr($attributes['ide']); ?>" class="wp3d-canvas threed-canvas"></canvas>
                <div class="wp3d-loading-message"></div>
                <div class="wp3d-tools-object3d">
                        <span class="wp3d-tools-object3d-pos active"></span>
                        <span class="wp3d-tools-object3d-rot"></span>
                        <span class="wp3d-tools-object3d-scale"></span>
                </div>
                <div class="wp3d-navigator"></div>
        </div>
</div>