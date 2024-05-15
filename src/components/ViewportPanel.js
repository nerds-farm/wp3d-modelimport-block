import { __ } from '@wordpress/i18n';

import { useState, useEffect, useRef, Fragment } from '@wordpress/element';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components'

export default function ViewportPanel( prop ) {
	const { attributes, setAttributes, clientId } = prop.props;
	const onChangeValue = prop.onChange;

	const { 
		viewport_ratio,
		viewport_height,
		viewport_fixed
	} = attributes;

	const units = [
		{ value: 'px', label: 'px', default: 500 },
		{ value: '%', label: '%', default: 100 },
		{ value: 'em', label: 'em', default: 5 },
		{ value: 'vh', label: 'vh', default: 100 },
	];
	
    return (
        <>
          <PanelBody 
			title={ __( "Viewport",  "wp3d-modelimport" )}
			initialOpen={false}
			>
                {/* Ratio(select) */}
				<SelectControl
					label={__("Ratio", "wp3d-modelimport")}
					value={ viewport_ratio }
					options={ [
						{ label: __("Custom", "wp3d-modelimport"), value: 'custom' },
						{ label: '1/1', value: '1/1' },
						{ label: '4/3', value: '4/3' },
						{ label: '16/9', value: '16/9' },
					] }
					
					onChange={ ( val ) => onChangeValue("viewport_ratio",{ viewport_ratio: val }) }
				/>
				{/* Height(Number Unit) */}
				{viewport_ratio == "custom" && <UnitControl 
					label={__("Height", "wp3d-modelimport")}
					isUnitSelectTabbable
					onChange={ ( val ) => onChangeValue("viewport_height",{ viewport_height: val }) } 
					//onUnitChange={ e => console.log("new unit "+e) }
					units={ units }
					value={ viewport_height } />}
				{/* fixed(Switcher) */}
				<ToggleControl
					label={__("Fixed", "wp3d-modelimport")}
					checked={ viewport_fixed }
					onChange={ ( val ) => onChangeValue("viewport_fixed",{ viewport_fixed: val }) }
				/>
				<p>{__("This option forces this block to remain fixed in fullscreen below everything.", "wp3d-modelimport")}</p>
            </PanelBody>
        </>
      )

}