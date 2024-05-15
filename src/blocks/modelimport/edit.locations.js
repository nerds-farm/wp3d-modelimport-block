import { __ } from '@wordpress/i18n';

import { useState, useEffect, useRef, Fragment } from '@wordpress/element';
import {
	Button,
	IconButton,
	PanelBody,
	TextControl,
} from '@wordpress/components'

export default function Locations( prop ) {
    const props = prop.props;
    const { attributes, setAttributes, clientId } = prop.props;
	const onChangeValue = prop.onChange;

    console.log('locations props',props)
    const handleAddLocation = () => {
        const locations = [ ...props.attributes.locations ];
        locations.push( {
            address: '',
        } );
        props.setAttributes( { locations } );
    };

    const handleRemoveLocation = ( index ) => {
        const locations = [ ...props.attributes.locations ];
        locations.splice( index, 1 );
        props.setAttributes( { locations } );
    };

    const handleLocationChange = ( address, index ) => {
        const locations = [ ...props.attributes.locations ];
        locations[ index ].address = address;
        props.setAttributes( { locations } );
    };

    let locationFields,
    locationDisplay;


    if ( props.attributes.locations.length ) {
        locationFields = props.attributes.locations.map( ( location, index ) => {
            return <Fragment key={ index }>
                <TextControl
                    className="grf__location-address"
                    placeholder="350 Fifth Avenue New York NY"
                    value={ props.attributes.locations[ index ].address }
                    onChange={ ( address ) => handleLocationChange( address, index ) }
                />
                <IconButton
                    className="grf__remove-location-address"
                    icon="no-alt"
                    label="Delete location"
                    onClick={ () => handleRemoveLocation( index ) }
                />
            </Fragment>;
        } );

        locationDisplay = props.attributes.locations.map( ( location, index ) => {
            return <p key={ index }>{ location.address }</p>;
        } );
    }

    return (
        <>
          <PanelBody 
			title={ __( "Locations",  "wp3d-modelimport" )}
			initialOpen={true}
			>
                { locationFields }
                <Button
                    isDefault
                    onClick={ handleAddLocation.bind( this ) }
                >
                    { __( 'Add Location' ) }
                </Button>


            </PanelBody>
        </>
    )
}