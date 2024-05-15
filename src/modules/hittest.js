import {
	BufferGeometry,
	Vector3,
	Vector2,
	Euler,
	Mesh,
	BoxGeometry,
	RingGeometry,
	Line,
	LineBasicMaterial,
	MeshBasicMaterial,
	MeshNormalMaterial,
	Raycaster
} from 'three';

//UTILS
import { detectTheObjects, detectLoadedObjects } from './ThreedEUtils.js';

class HittestMesh {

	constructor( $threed, $boom = null ) {
		//Questi sono gli elementi che interagiscono con la SCENA/Viewport
		this.$scene = $threed.scene;
		this.$controls = $threed.controls;
		this.$canvas = {w: $threed.canvasW, h: $threed.canvasH}
		this.$camera = $threed.camera;

		// La funzione che restituisce al Click i dati di "Intercettazione"
		this.$boom = $boom;

		// DATI: //
		this.isDetectLine = true;

		// Intercettori
		this.raycaster;
		this.mouse = new Vector2();

		// Visualizzatori
		this.mouseHelper;
		this.line;
        this.reticle;

		// dati di orientamento
        this.position = new Vector3();
		this.positionOffset = new Vector3();
        this.orientation = new Euler();
		
		// Intersect
		this.intersection = {
            intersects: false,
            point: new Vector3(),
            normal: new Vector3(),
			offset: new Vector3(),
        };
        
        this.intersects = [];
        this.intersected;

		// Meshes (in $scene)
		this.mesh;
        this.meshs;

		// EVENTS
        this.eventchange;
        this.eventdown;
        this.eventup;
        this.eventmove;

		// COMINCIAMO.....
		//this.initHittest();
		// ................
	}
	initHittest(){
        console.log('HITTEST')
		//creo gli helper visualizzativi
		this.createLine();
        this.createMouseHelper();
        this.createReticle();

        //1 - rilevo le mesh dalla scena, il risultato è un array di nomi.
        console.log(this.$scene)
        let detectObjects = detectTheObjects(this.$scene);
        console.log('detectObjects',detectObjects)
        //2 - rintraccio la scena "this.$scene" per aspettare che tutto sia disponibile.
		detectLoadedObjects(detectObjects, this.$scene, ($arrObj) => {
			//console.log('...object_in_scene', $arrObj);

			//alert('meshs is detect '+$arrObj.length)
            this.mesh = $arrObj[0];
            this.meshs = $arrObj;

            //console.log('this.mesh',this.meshs);
            //
            this.raycaster = new Raycaster();
            //
            
            
		});
		

		// Genero gli Eventi
		this.createEvents();
	}
	removeHittestMesh(){
		this.stopDetect();
		
	}
	//------------ ON/OFF ----------------
    
    startDetect(){
        if(!this.isDetect)
        this.initHittest();
		//
        this.isDetect = true;
    }
    stopDetect(){
        if(this.isDetect){
			if ( this.intersected ) this.intersected.material.color.setHex( this.intersected.currentHex );
			this.removeLine();
			this.removeMouseHelper();
			this.removeReticle();
			this.removeEvents();
		}
        //
        this.isDetect = false;
    }
	//------------ MOUSE EVENTS ----------------
    createEvents(){
        let moved = false;

        //CONTROLS CHANGE - - - - - - -
        this.eventchange = () => {
            moved = true;
        }
        this.$controls.addEventListener( 'change', this.eventchange );

        //DOWN - - - - - - -
        this.eventdown = () => {
            moved = false;
        }
        window.addEventListener( 'pointerdown', this.eventdown );

        // UP - - - - - - - *** (Fire)
        this.eventup = (event) => {
            if ( moved === false ) {

                this.checkIntersection( event.offsetX, event.offsetY );

                if ( this.intersection.intersects ){
                    this.position.copy( this.intersection.point );
            		this.orientation.copy( this.mouseHelper.rotation );
					this.positionOffset.copy( this.intersection.offset )
					let values = { 
						mesh: this.mesh,  
						posx: this.positionOffset.x,
						posy: this.positionOffset.y,
						posz: this.positionOffset.z,
						rotx: this.orientation.x,
						roty:this.orientation.y,
						rotz: this.orientation.z
					};
					////////////////////////////
					if(this.$boom) this.$boom(values);
					////////////////////////////
                }

            }
        }
        window.addEventListener( 'pointerup', this.eventup );

        // MOVE - - - - - - -
        this.eventmove = (event) => {

            if ( event.isPrimary ) {
                //console.log('Sticker Move')
                this.checkIntersection( event.offsetX, event.offsetY );

            }
            
        }
        window.addEventListener( 'pointermove', this.eventmove );

    }
    removeEvents(){
        this.$controls.removeEventListener( 'change', this.eventchange );
        window.removeEventListener( 'pointerdown', this.eventdown );
        window.removeEventListener( 'pointerup', this.eventup );
        window.removeEventListener( 'pointermove', this.eventmove );
    }
	//------------ INTERSECTION ----------------
    checkIntersection( x, y ) {
        //console.log('checkIntersection '+x+' - '+y)
        if ( this.meshs === undefined ) return;
        
        this.mouse.x = ( x / this.$canvas.w  ) * 2 - 1;
        this.mouse.y = - ( y / this.$canvas.h  ) * 2 + 1;

        this.raycaster.setFromCamera( this.mouse, this.$camera );
        
		//this.raycaster.intersectObject( this.meshs[0], false, this.intersects );
        this.raycaster.intersectObjects( this.meshs, false, this.intersects ); // MULTIPLO
        

        if ( this.intersects.length > 0 ) {

            if ( this.intersected != this.intersects[ 0 ].object ) {

                if ( this.intersected ) this.intersected.material.color.setHex( this.intersected.currentHex );

                this.intersected = this.intersects[ 0 ].object;
                this.mesh = this.intersected;
                //console.log(this.intersected.name);
                //
                this.intersected.currentHex = this.intersected.material.color.getHex();
                this.intersected.material.color.setHex( 0xff0000 );

            }else{

            }

            const p = this.intersects[ 0 ].point;
            this.mouseHelper.position.copy( p );
            this.intersection.point.copy( p );

            const n = this.intersects[ 0 ].face.normal.clone();
            n.transformDirection( this.mesh.matrixWorld );
            n.multiplyScalar( 0.5 );
            n.add( this.intersects[ 0 ].point );

			const m = this.intersects[ 0 ].face.normal.clone();
            m.transformDirection( this.mesh.matrixWorld );
            m.multiplyScalar( 0.015 ); //la dimensione dlla linea
            m.add( this.intersects[ 0 ].point );

            this.intersection.normal.copy( this.intersects[ 0 ].face.normal );
            this.mouseHelper.lookAt( n );

            const positions = this.line.geometry.attributes.position;
            positions.setXYZ( 0, p.x, p.y, p.z );
            positions.setXYZ( 1, n.x, n.y, n.z );
            positions.needsUpdate = true;

            this.reticle.position.set(p.x, p.y, p.z);
            this.reticle.lookAt( n );

			// !!
			this.intersection.offset.copy( m );

            this.intersection.intersects = true;

            this.intersects.length = 0;
            
            this.line.visible = true;
            this.reticle.visible = true;
        } else {
            if ( this.intersected ) this.intersected.material.color.setHex( this.intersected.currentHex );

            this.intersected = null;
            
            this.intersection.intersects = false;
            
            this.line.visible = false;
            this.reticle.visible = false;
        }

    }

	//------------ MOUSEHELPER ----------------
	createMouseHelper(){
        if(!this.mouseHelper){
            this.mouseHelper = new Mesh( new BoxGeometry( 0.2, 0.1, 1 ), new MeshNormalMaterial() );
            this.mouseHelper.visible = false;
            this.$scene.add( this.mouseHelper );
        }
    }
    removeMouseHelper(){
        if(this.mouseHelper){
            this.$scene.remove( this.mouseHelper );
            this.mouseHelper.geometry.dispose();
            this.mouseHelper.material.dispose();
            this.mouseHelper = null;
        }
    }
	//------------ RETICLE ----------------
    createReticle(){
        if(!this.reticle){
            //queso è l'anello bianco che inividua il punto nella scena
            this.reticle = new Mesh(
                new RingGeometry( 0.015, 0.017, 42 ),
                new MeshBasicMaterial({
                    color:0x00FF00,
                    depthTest: true,
                    depthWrite: false,
                    polygonOffset: true,
                    polygonOffsetFactor: - 10,
                })
            );
            //this.reticle.matrixAutoUpdate = false;
            //this.reticle.visible = false;

            const scale = 1;
            this.reticle.scale.set( scale, scale, scale );

            this.$scene.add( this.reticle );
        }
    }
    removeReticle(){
        if(this.reticle){
            this.$scene.remove( this.reticle );
            this.reticle.geometry.dispose();
            this.reticle.material.dispose();
            this.reticle = null;
        }
    }
    //------------ LINE ----------------
    createLine(){
        if(!this.line){
            const geometry = new BufferGeometry();
            geometry.setFromPoints( [ new Vector3(), new Vector3() ] );

            this.line = new Line( geometry, new LineBasicMaterial({
                color: 0x00ff00,
                linewidth: 2,
            }) );
            this.$scene.add( this.line );
        }
    }
    removeLine(){
        if(this.line){
            this.$scene.remove( this.line );
            this.line.geometry.dispose();
            this.line.material.dispose();
            this.line = null;
        }
        
    }
}

export { HittestMesh };
