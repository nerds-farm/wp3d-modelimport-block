import { IconButton } from '@wordpress/components';
import { Inserter } from '@wordpress/block-editor';

function Appender(prop) {
    function append(e){
        // console.log('appendBlock PROP--',prop);
        // console.log('appendBlock E--',e);
        prop.onAppend && prop.onAppend();
    }
    
    return (
        <>
        <Inserter
            className="wp3d-inserter-appender" 
            rootClientId={ prop.rootClientId }
            renderToggle={ ( { onToggle, disabled } ) => (
                <IconButton
                    className="wp3d-button-appender"
                    onClick={ (e) => { onToggle(e); append(e) } }
                    disabled={ disabled }
                    label={prop.label ? prop.label : 'Add'}
                    icon="plus"
                />
            ) }
            isAppender
        />
        </>
    )
}
export default Appender;