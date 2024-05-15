import {
    Color,
    MathUtils,
    Spherical
} from 'three'

import { gsap } from "gsap";

export class MoveTo {
    constructor($this, $props) {
        // console.log('props',$props);
        // console.log('this',$this);
        if(!$this) return;
        this.threed = $this;

        this.scene = this.threed.scene;
        this.renderer = this.threed.renderer;
        this.object3d = this.threed.theModel;
        this.camera = this.threed.camera; // xx
        this.isMoved = false;

        this.controls = this.threed.controls; // xx
        this.target = this.threed.controls.target; // xx
        
        this.settings = $props;

        this.defaultData = this.threed.getDefaultCamPos();
        //console.log(this.defaultData)
        this.objRot = this.getCamPos();

        this.tweenease = "expo.inOut";
        this.tweenduration = 1;
        
        
        this.tlmaster = gsap.timeline({ 
            //onStart: () => {} 
        });
        let startMoveTo = gsap.to(this.objRot, this.defaultData);
        this.tlmaster.add(startMoveTo);
        
        this.threed.on('endControls', () => {

        })
        this.threed.on('startControls', () => {

        })
        
    }
    init(){
        
    }
    add(){

    }
    remove(){
        
    }
    update(){
        this.remove();
        this.add();
        
    }
    render(){
        
    }

    // METHODS
    left(){
        const obPos = {"fov":40,"zoom":1,"camx":-3.9999999999999303,"camy":2.4496881626739146e-16,"camz":0.07180108265331789,"trgtx":0,"trgty":0,"trgtz":0,"phi":1.5707963267948966,"theta":-1.5528479836910987,"radius":4};
        this.setCamPos(obPos);
    }
    right(){
        const obPos = {"fov":40,"zoom":1,"camx":4,"camy":2.4496876860514383,"camz":-0.07175769922806836,"trgtx":0,"trgty":0,"trgtz":0,"phi":1.5707963267948966,"theta":1.5887338275338139,"radius":4};
        this.setCamPos(obPos);
    }
    top(){
        const obPos = {"fov":40,"zoom":1,"camx":1.4273025548816803e-12,"camy":3.9999999999975895,"camz":0.000003999999999998669,"trgtx":0,"trgty":0,"trgtz":0,"phi":9.999334257726859e-7,"theta":3.5682563872052366e-7,"radius":4}
        this.setCamPos(obPos);
    }
    bottom(){
        const obPos = {"fov":40,"zoom":1,"camx":0.000518424369809532,"camy":-3.99854975235048,"camz":-0.1077014819468725,"trgtx":0,"trgty":0,"trgtz":0,"phi":3.11466371662581,"theta":3.136779160251386,"radius":4}
        this.setCamPos(obPos);
    }
    back(){
        const obPos = {"fov":40,"zoom":1,"camx":4.898192536839533,"camy":2.4490962684197664,"camz":-4,"trgtx":0,"trgty":0,"trgtz":0,"phi":1.5707963267948966,"theta":3.141592653589793,"radius":4}
        this.setCamPos(obPos);
    }
    front(){
        const obPos = {"fov":40,"zoom":1,"camx":0,"camy":2.4492935982947064,"camz":4,"trgtx":0,"trgty":0,"trgtz":0,"phi":1.5707963267948966,"theta":0,"radius":4}
        this.setCamPos(obPos);
    }
    default(){
        this.defaultData = this.threed.getDefaultCamPos();
        this.setCamPos(this.defaultData);
    }
    //MoveTo
    setCamPos(obPos, cbr = ()=>{}, isMaster = false){
        

        //console.log('setCamPos')
        let tlMoveTo = gsap.timeline({
            id: 'moveto',
            //smoothChildTiming: true,
            paused:true,
            onStart: () => {
                
            }
        });
        
        //console.log('CAP-POS',this.getCamPos())
        if(!this.isMoved) {
        console.log('this.getCamPos()',this.getCamPos())
        if(!isMaster) tlMoveTo.to(this.objRot, this.getCamPos());
        tlMoveTo.to(this.objRot, { duration: this.tweenduration, 
            phi: obPos.phi,
            theta: obPos.theta,
            radius: obPos.radius,
            fov: obPos.fov,
            zoom: obPos.zoom,
            trgtx: obPos.trgtx,
            trgty: obPos.trgty,
            trgtz: obPos.trgtz,
            onUpdateParams: [this.objRot],

            onUpdate: (self) => {
                //console.log(self.phi,self.theta,self.radius);
                let p = this.calcPosFromSpherical(self.phi,self.theta,self.radius);
                this.threed.camera.position.set(p[0],p[1],p[2]);
                this.threed.camera.fov = self.fov;
                this.threed.camera.zoom = self.zoom;
                //console.log(this.threed.camera.position)

                //console.log('enable_hplookattarget',obPos.lookAtMarker)
                if(obPos.lookAtMarker){
                    this.threed.controls.target.x = self.trgtx;
                    this.threed.controls.target.y = self.trgty;
                    this.threed.controls.target.z = self.trgtz;

                    this.threed.controls.update();
                }else{
                    console.log(this.defaultData.trgtx,this.defaultData.trgty,this.defaultData.trgtz);
                    this.threed.controls.target.x = this.defaultData.trgtx;
                    this.threed.controls.target.y = this.defaultData.trgty;
                    this.threed.controls.target.z = this.defaultData.trgtz;

                    this.threed.controls.update();

                }

                
                //this.threed.camera.lookAt(self.trgtx,self.trgty,self.trgtz);
                
                this.threed.camera.updateProjectionMatrix();
            },
            onComplete: () => {
                this.isMoved = false;
                
                //console.log('END tween...')
                if(cbr) cbr();
            },
            onStart: () => {
                this.isMoved = true;
                //console.log('START tween...')
            },
            ease: this.tweenease
            });

            tlMoveTo.play();
        }
        
       
        if(isMaster) this.tlmaster.add(tlMoveTo)
    }
    
    
    getCamPos(){
        //alert(Number(this.threed.camera.position.x.toFixed(3)))
        let spherical = new Spherical().setFromCartesianCoords(Number(this.threed.camera.position.x),Number(this.threed.camera.position.y),Number(this.threed.camera.position.z));
        //console.log(this.threed.camera.position.x,this.threed.camera.position.y,this.threed.camera.position.z)
        //console.log(new Spherical().setFromCartesianCoords(Number(this.threed.camera.position.x),Number(this.threed.camera.position.y),Number(this.threed.camera.position.z)))
        let camFov = Number(this.threed.camera.fov),
            camZoom = Number(this.threed.camera.zoom),
            camx = Number(this.threed.camera.position.x), 
            camy = Number(this.threed.camera.position.y), 
            camz = Number(this.threed.camera.position.z),
            trgtx = Number(this.threed.controls.target.x), 
            trgty = Number(this.threed.controls.target.y), 
            trgtz = Number(this.threed.controls.target.z),
            phi = spherical.phi,
            theta = spherical.theta,
            radius = spherical.radius;
            
        return { fov:camFov, zoom:camZoom, camx:camx, camy:camy, camz:camz, trgtx:trgtx, trgty:trgty, trgtz:trgtz, phi:phi, theta:theta, radius:radius };
    }

    // UTILITY
    getSphetical(sx,sy,sz){
        // 
        let spherical = new Spherical().setFromCartesianCoords(sx,sy,sz);
        let cartesian = this.calcPosFromSpherical( spherical.phi, spherical.theta, spherical.radius);
        
        //console.log('CartesianCoords',sx,sy,sz)
        //console.log('spherical',spherical,cartesian);

        return cartesian;
    }

    // posit -> sphera [phi,theta,radius]
    getSpheticalFromCartesian(sx,sy,sz){
        // 
        let spherical = new Spherical().setFromCartesianCoords(sx,sy,sz);
        let cartesian = this.calcPosFromSpherical( spherical.phi, spherical.theta, spherical.radius);
        
        //console.log('CartesianCoords',sx,sy,sz)
        //console.log('spherical',spherical,cartesian);
        let phi = spherical.phi;
        let theta = spherical.theta;
        let radius = spherical.radius;

        return [phi,theta,radius];
    }
    // sphera -> posit [x,y,z]
    calcPosFromSpherical(phi,theta,radius){
  
        let x = (radius * Math.sin(phi)*Math.sin(theta));
        let y = (radius * Math.cos(phi));
        let z = (radius * Math.sin(phi)*Math.cos(theta));
      
        return [x,y,z];
    
    }
    
    change(propertyName, settings){
        this.settings = settings;
        
    }
}
export default MoveTo;