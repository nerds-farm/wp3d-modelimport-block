/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {WPElement} Element to render.
 */
export default function save( { attributes, style } ) {
	const h = attributes.viewport_ratio == "custom" ? {height: attributes.viewport_height} : {};
	const fix = attributes.viewport_fixed ? " wp3d-viewport_fixed" : "";

	let styles = {};
	const blockProps = useBlockProps.save({
		className: fix,
		style: {...style, ...styles},
	});


	return (
	<div id={ attributes.ide } { ...blockProps } data-settings={ JSON.stringify(attributes) }>
		<div className="wp3d-container wp3d-importmodel-container" style={h}>
			<canvas id={ `canvas-${ attributes.ide }` } className="wp3d-canvas threed-canvas"></canvas>
			<div className="wp3d-loading-message"></div>
			<div className="wp3d-navigator"></div>
		</div>
		{/* <div className="wp3d-blocks-list">
			<InnerBlocks.Content />
		</div> */}
	</div>
	);
}
