import { registerBlockType } from '@wordpress/blocks';
import { SVG, Path } from '@wordpress/components';

import './style.scss';
import './editor.scss';

import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: {
        src: (
            <SVG id="icon-modelimport" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                <Path d="M474.56,124.87a6.51,6.51,0,0,0,3.8-8.39C455.73,56.55,395.44,22.27,337.43,32.9L323.06,4.76A6.51,6.51,0,0,0,315,1.62L294.22,9.45a6.53,6.53,0,0,0-4,7.71L298,47.78c-25.47,15.3-43.84,39.53-52.91,67.48L127.36,188.82a48.11,48.11,0,1,0-24,89.81c1.11,0,2.22-.05,3.32-.13l67.68,120.64A55.18,55.18,0,0,0,153.66,436H44.4A44.84,44.84,0,0,0-.39,480.79v11.49a6.52,6.52,0,0,0,6.51,6.52H410.81a6.51,6.51,0,0,0,6.51-6.52V480.79A44.84,44.84,0,0,0,372.53,436H263.28a55.31,55.31,0,0,0-48.12-48.28L142.58,258.35a47.85,47.85,0,0,0,8.26-35.67l88.41-55.22a135.94,135.94,0,0,0,8.26,36.18,6.53,6.53,0,0,0,6.1,4.22,6.45,6.45,0,0,0,2.3-.43l44-16.59A71,71,0,0,0,432,140.94ZM117.72,262.52c-.87.39-1.76.75-2.66,1.07l-.08,0a35.42,35.42,0,0,1-5.75,1.48,34.33,34.33,0,0,1-5.86.5A35.09,35.09,0,1,1,123.85,202q1,.74,2,1.53l.44.38q1,.84,1.89,1.74l.24.26c.58.59,1.13,1.2,1.66,1.82l.29.33c.55.67,1.07,1.35,1.58,2.05l.3.43c.49.7,1,1.43,1.39,2.17l.23.41c.44.77.86,1.56,1.24,2.36l.12.27a34.61,34.61,0,0,1,2,5.35,35,35,0,0,1-7.53,32.59q-.83.93-1.71,1.8l-.43.41c-.63.6-1.27,1.17-1.93,1.71-.09.08-.18.14-.27.21-.7.57-1.43,1.11-2.17,1.62l-.08.06c-.79.53-1.59,1-2.42,1.5l-.2.12c-.82.45-1.66.88-2.51,1.27ZM372.53,449a31.8,31.8,0,0,1,31.77,31.77v5H12.64v-5A31.8,31.8,0,0,1,44.4,449H372.53Zm-166.68-48.6c.87-.05,1.74-.09,2.62-.09s1.51,0,2.25.07A42.26,42.26,0,0,1,250.15,436H166.79a42.32,42.32,0,0,1,19.93-29.62c.61-.36,1.23-.72,1.85-1.05.29-.16.58-.3.86-.44.52-.27,1-.52,1.57-.76l.69-.32c.73-.31,1.48-.61,2.23-.88l.64-.23c.75-.26,1.5-.51,2.26-.73l.17-.05c.84-.24,1.69-.44,2.54-.63l.51-.1a43.08,43.08,0,0,1,5.2-.73Zm-5.53-12.51h0c-1.18.17-2.35.4-3.51.65l-.7.16c-1,.22-1.91.47-2.85.74l-.7.2q-1.65.49-3.24,1.08l-.78.31c-.8.31-1.59.64-2.36,1l-.66.27L120,275.65c1.12-.41,2.22-.88,3.3-1.38l.32-.14c1-.49,2.08-1,3.09-1.58l.42-.24c.94-.54,1.87-1.1,2.76-1.7l.27-.17c.89-.6,1.74-1.23,2.59-1.88.13-.11.28-.2.42-.31Zm38.42-235.49-91.92,57.42,0-.05c-.48-1-1-2-1.56-2.95-.12-.23-.25-.45-.38-.67-.54-.92-1.11-1.83-1.71-2.71l-.42-.59q-.78-1.11-1.62-2.16l-.52-.68q-1-1.16-2-2.25l-.35-.4,102.34-63.92A131.9,131.9,0,0,0,238.74,152.42ZM314.11,15.87l10.3,20.19-.46.15-2.58.83-.91.31c-1.14.38-2.27.79-3.4,1.21h0l-.07,0c-1.11.42-2.2.86-3.29,1.31l-.87.37q-1.26.52-2.49,1.08l-.45.2-5.62-22ZM363.37,217.1a57.56,57.56,0,0,1-51.26-30.89l107.62-40.64a58,58,0,0,1-56.36,71.53Zm58.27-86.17L301,176.48h0l-43.44,16.41c-17.5-54.82,5.74-113.33,53.86-137.63l.32-.17c1.41-.7,2.85-1.37,4.29-2l1.16-.51c1.47-.63,3-1.25,4.47-1.82,1.35-.51,2.7-1,4.06-1.43L327,48.9c1-.31,2-.6,3-.89l1.29-.36A104.27,104.27,0,0,1,358.63,44c43.69,0,85.84,27.15,105.08,71l-42.06,15.89ZM290.71,291.68l26.64-52.77L329,244.78l-26.65,52.77Zm108.78-47.9,18.91,57.48L406,305.33l-18.91-57.48Zm103.6-22-5.87,11.63-54.15-27.34,5.87-11.63Z" />
            </SVG>
        ),
    },
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: ()=>{
		return null;
	}
} );
