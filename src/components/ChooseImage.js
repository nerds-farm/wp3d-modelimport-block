import { __ } from '@wordpress/i18n';
import { PanelRow, Icon, Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useState, useEffect, useRef, Fragment } from '@wordpress/element';

function ChooseImage(prop) {
  const [mediaId, setMediaId] = useState(0);
  const [mediaUrl, setMediaUrl] = useState('');
  const [media, setMedia] = useState({"id":0, "url":"", "alt":"", "title":""});
  
  useEffect(() => {
      
  },[]);

  const removeMedia = () => {
		prop.onRemove()
    setMedia({"id":0, "url":"", "alt":"", "title":""})
	}
  const onSelectMedia = (m) => {
		prop.onAdd(m)
    setMedia({"id":m.id, "url":m.url, "alt":m.alt, "title":m.title})
    //console.log('media_data',m.id,m.url)
	}
  /*
    $mime_types['stl']  = 'application/octet-stream';
    $mime_types['wrl']  = 'model/vrml';
    $mime_types['glb']  = 'model/gltf-binary';
    $mime_types['gltf']  = 'model/gltf-json';
    $mime_types['obj']  = 'text/plain';
    $mime_types['zip']  = 'application/zip';
  */
  let allowedTipe = ['image']
  return (
      <>
      <div className="choose-wp3d">
        <h3><Icon icon="format-image" /> { prop.label ? __(prop.label, 'wp3d-modelimport') : __('Image', 'wp3d-modelimport')}</h3>
        <MediaUploadCheck>
          <MediaUpload
            onSelect={onSelectMedia}
            value={prop.value.id}
            allowedTypes={allowedTipe}
            multiple={false}
            render={({open}) => (
              <Button 
                className={prop.value.id == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
                onClick={open}
              >
                { ! prop.value.id ? (
                  
                  <div>
                  { prop.chooselabel ? __(prop.chooselabel + ' ' + prop.mimetype, 'wp3d-modelimport') : __('Choose an image', 'wp3d-modelimport')}
                  </div>
                  
                  ) : (
                  
                  <img src={ prop.value.url } />
                 
                  )
                }
              </Button>
            )}
          />
        </MediaUploadCheck>
        {prop.value.id != 0 && 
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                title={__('Replace', 'wp3d-modelimport')}
                value={prop.value.id}
                onSelect={onSelectMedia}
                allowedTypes={['image']}
                render={({open}) => (

                  <Button variant="secondary" onClick={open}>{__('Replace', 'wp3d-modelimport')}</Button>
                )}
              />
            </MediaUploadCheck>
            <MediaUploadCheck>
              <Button isDestructive onClick={removeMedia}>{__('Remove', 'wp3d-modelimport')}</Button>
            </MediaUploadCheck>
          </PanelRow>
        }
      </div>
    </>

  )
}

export default ChooseImage;
