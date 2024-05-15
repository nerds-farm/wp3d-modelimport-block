//import { inherits } from "util";

function ifIsSet($key,$prop = null){
    if( typeof $key !== 'undefined' && $key !== null ) {
        if( typeof $key === 'object' ){
            //console.log('1')
            if( $key.hasOwnProperty($prop) ){
                    //console.log('2')
                    if($key[$prop] === ''){
                        //console.log('3',$key[$prop],typeof $key[$prop])
                        return false;
                    }else{
                        return true;
                    }
            }else{
                //console.log('4')
                return false;
            }
        }else{
            if($key == ''){
                //console.log('5')
                return false;
            }else{
                return true;
            }
        }
    }else{
        //console.log('6')
        return false;
    }
}
function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        return true;
    }
    return false;
}
function more(){

}
//restituisce un'array con tutti gli oggetti mesh nella scena
function detectTheObjects($target){
    let oblist = [];
    $target.traverse( ( child ) => {
        
        child.traverseAncestors( ( ancestor ) => {
                
            if(ancestor.name == "themodel" ){
                if ( child.isMesh && child.children.length == 0 && child.material )
                oblist.push(child);
            }
        });

    });

    return oblist;
}
//restituisce un'array con tutti gli oggetti mesh nella scena ###### non usato!!
function traverseTheObjects($target, $names){
    let oblist = [];
    $target.traverse( ( child ) => {
        //console.log('traverseTheObjects',child.name)
        if ( child.isMesh && child.children.length == 0 && child.material ){
            
                $names.forEach((n)=>{
                    
                });
                //console.log(child.type+' - '+child);
                if($names.includes(child.name))
                    oblist.push(child);
            
        }
    });

    return oblist;
}

//restituisce un'array con tutti i nomi delle mesh nella scena
function detectTheNames($target){
    let oblist = [];
    $target.traverse( ( child ) => {
        
        child.traverseAncestors( ( ancestor ) => {
                
            if(ancestor.name == "themodel" ){
                if ( child.isMesh && child.children.length == 0 && child.material )
                oblist.push(child.name);
            }
        });
    });

    return oblist;
}

function detectLoadedObjects1($data, $target, $cb = null){
    if(!$data) return;
    
    let arrayObjects = [];
    
    if(typeof $data === 'string'){
        if($data.includes(',')){
            arrayObjects = $data.replaceAll(' ','').split(',');
        }else{
            arrayObjects[0] = $data;
        };
    }else if(typeof $data === 'object'){
        if( Array.isArray($data) ){
            arrayObjects = $data;
        }else{
            return;
        }
    }else{
        return;
    }

    //
    let theObjects = [];
    const promises = [];
    let that = this;
   
    arrayObjects.forEach((name,i)=>{
        let promise = new Promise(resolve => {
            let myOb = $target.getObjectByName(name);
            if(myOb){
                theObjects[i] = myOb;
                resolve(myOb);
            }
            
        });
        promises.push(promise);
    })
    
    Promise.all(promises).then(() => {
        if($cb) $cb(theObjects);
    });

}
function detectLoadedObjects($data, $target, $cb = null){
    
    //console.log('$data',$data);
    let arrayObjects = [];
    
    if(typeof $data === 'string'){
        //controllo data come una stringa
        if(!$data) return;
        if($data.includes(',')){
            arrayObjects = $data.replaceAll(' ','').split(',');
        }else{
            arrayObjects[0] = $data;
        };
    }else if(typeof $data === 'object'){
        //alert('object '+$data.length)
        if( Array.isArray($data) ){
            //alert('isArray '+$data.length)
            //controllo data come un array
            if($data.length < 1) return;
           
            $data.forEach((el,i,array) => {
                arrayObjects.push(el.name);
                //console.log('OOOO', el.name);
            });
            
        }else{
            return;
        }
    }else{
        return;
    }
   // console.log('ARRAYOBJECTS',arrayObjects);
    let theObjects = [];
    const intervalID = setInterval(
        () => {
            //l'intervallo controlla la lista di ids..
            
            arrayObjects.forEach((el,i,array) => {
                
                let myob = $target.getObjectByName(el);
                if(!myob.userData.index) myob.userData.index = i;
                
                // se l'id esiste
                if(myob){
                    // lo rimuovo dalla array-lista
                    let aNameIndex = array.indexOf(el);
                    
                    array.splice(aNameIndex, 1);
                    
                    // Popolo l'array per la restituzione
                    // alert(myob.name+' '+i+' '+myob.type)
                    // console.log('myob ', i, myob);
                    
                    if(myob.type != 'Scene') theObjects.push(myob);
                    // ---------------
                    
                }else{
                    //se non trovo myob è un problema..
                };
                
                
                //alert(array.length)
                //quado l'array-lista è vuoto interrompo l'intervllo e restituisco il gruppo pieno
                //alert(array.length)
                if(array.length == 0){
                    //console.log('RETURN-detect',theObjects)
                    if($cb) $cb(theObjects);
                    clearInterval(intervalID);
                }
            }); // END foreach
        } 
    , 10);

    //comunque dopo 30s lo interrompo, per sicurezza.
    setTimeout(() => {
        clearInterval(intervalID);
    },30000);
}
//questa funfione restituisce un'array da una sringa ditipo dato
function stringToArray($string){
    let arrayObjects = [];
    if($string)
    if($string.includes(',')){
        arrayObjects = $string.replaceAll(' ','').split(',');
    }else{
        arrayObjects[0] = $string;
        arrayObjects.length = 1;
    };
    return arrayObjects;
}

export {
    ifIsSet,
    isMobile,
    more,
    stringToArray,
    detectTheNames,
    detectTheObjects,
    traverseTheObjects,
    detectLoadedObjects,
    detectLoadedObjects1
};

  