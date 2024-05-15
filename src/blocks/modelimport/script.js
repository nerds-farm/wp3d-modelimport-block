import e_threed_class_modelimport from '../../classes/class.e_threed_modelimport.js';

document.addEventListener("DOMContentLoaded", () => {
    
    const wp3d_modelimport3d = document.querySelectorAll('.wp-block-wp3d-modelimport');
    

    

    function cbfn($this){
        
    }
    wp3d_modelimport3d.forEach((el,index)=>{
       // const settings_string = ;
        const settings_obj = JSON.parse(el.getAttribute('data-settings'));
        const ide = settings_obj.ide;
        
        const targetScope = document.getElementById(ide);
        const modelimport3D_element = new e_threed_class_modelimport(targetScope, settings_obj,false,cbfn);

        //
    })
    
});