import { __ } from '@wordpress/i18n';

import { useState, useEffect, useRef, Fragment } from '@wordpress/element';
import {
	TextControl,
	TextareaControl,
	PanelBody,
	SelectControl,
	PanelRow,
	RangeControl,
	ToggleControl,
	Icon,
	Button,
	ColorPicker,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components'

// My components
import ChooseImage from './ChooseImage.js';

export default function SkyPanel( prop ) {
	const { attributes, setAttributes, clientId } = prop.props;
	const onChangeValue = prop.onChange;
	const isOpen = Boolean(prop.isOpen);
	const { 
		light_intensity,
		sky_type,
		sky_transparent,
		sky_color,
		sky_showimage,
		sky_environmentimage,
		sky_image,
		material_metalness,
		material_roughness
	} = attributes;

	const removeMediaSky = () => {
		onChangeValue("sky_image",{
			sky_image: {
				id: 0,
				url: "",
				alt: "",
				title: ""
			}
		});
		if(sky_type == 'image') onChangeValue("sky_type",{ sky_type: 'backgroundcolor' })
		onChangeValue("sky_environmentimage",{ sky_environmentimage: false })
	}
 	const onSelectMediaSky = (media) => {
		onChangeValue("sky_image",{
			sky_image: {
				id: media.id,
				url: media.url,
				alt: media.alt,
				title: media.title
			}
		});
		
	}
	let typeOptions = [
		{ label: __("Color", "wp3d-modelimport"), value: 'backgroundcolor' },
		{ label: __("Transparent", "wp3d-modelimport"), value: 'transparent' },
	];
	if(sky_image.url){
		typeOptions.push({ label: __("Image", "wp3d-modelimport"), value: 'image' })
	}
	

	return (
	<>
		<PanelBody 
		title={ __( 'Sky', 'wp3d-modelimport' )}
		initialOpen={isOpen}
		>
			<SelectControl
				label={ __( "Type", "wp3d-modelimport" ) }
				value={ sky_type }
				options={ typeOptions }
				onChange={ ( val ) => onChangeValue("sky_type",{ sky_type: val }) }
			/>
			<div>
				{sky_type == 'backgroundcolor' &&
					<ColorPicker
					color={sky_color}
					onChange={ ( val ) => onChangeValue("sky_color",{ sky_color: val }) }
					//enableAlpha
					defaultValue="#FFF"
				/>}
				<ChooseImage 
					label={ __( "Texture Image", "wp3d-modelimport" ) }
					value={sky_image}
					onAdd={onSelectMediaSky} 
					onRemove={removeMediaSky}
				/>
				{(sky_image.url) && <ToggleControl
					label={ __( 'Environment', 'wp3d-modelimport' )}
					checked={ sky_environmentimage }
					onChange={ ( val ) => onChangeValue("sky_environmentimage",{ sky_environmentimage: val }) }
				/>}
				
				

			</div>
		</PanelBody>
	</>
	)
}