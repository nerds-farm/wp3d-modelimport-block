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

export default function Points( props ) {
    const handleAddLocation = () => {
        const points = [ ...props.attributes.points ];
        points.push( {
            address: '',
        } );
        props.setAttributes( { points } );
    };

    const handleRemoveLocation = ( index ) => {
        const points = [ ...props.attributes.points ];
        points.splice( index, 1 );
        props.setAttributes( { points } );
    };

    const handleLocationChange = ( address, index ) => {
        const points = [ ...props.attributes.points ];
        points[ index ].address = address;
        props.setAttributes( { points } );
    };

    let pointFields,
        pointDisplay;

    return (
        <>
          <PanelBody 
			title={ __( "Points",  "wp3d-modelimport" )}
			initialOpen={false}
			>



            </PanelBody>
        </>
    )
}