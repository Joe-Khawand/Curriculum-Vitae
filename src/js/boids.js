import { Vector3 } from "three";
// Returns a random integer from 0 to 9:
//Math.floor(Math.random() * 10);
// Virtual box containing the boids cube size 60 centre en 0
const  border_x=40.0;
const  border_y=40.0;
const  border_z=40.0;
export class Boid {
    constructor (){
        //change borders
        this.position = new Vector3(Math.floor(Math.random() * 61)-30,Math.floor(Math.random() * 61)-30,Math.floor(Math.random() * 61)-30);
        this.vitesse = new Vector3(0.1,0.1,0.1);
    }
    get pos(){
        return this.position;
    }
    get vit(){
        return this.vitesse;
    }
    distance_to(b){
        return Math.sqrt(pow(position.x-b.position.x,2)+pow(position.y-b.position.y,2)+pow(position.z-b.position.z,2));
    }
    update_pos(dt){
        //Evite les collision avec le cube
        if (this.position.x>= border_x)
        {
            this.vitesse.x = -Math.abs(this.vitesse.x);
        }
        if(this.position.x<=-border_x){
            this.vitesse.x = Math.abs(this.vitesse.x);
        }
        if (this.position.y>= border_y)
        {
            this.vitesse.y = -Math.abs(this.vitesse.y);
        }
        if(this.position.y<=-border_y){
            this.vitesse.y = Math.abs(this.vitesse.y);
        }
        if (this.position.z>= border_z)
        {
            this.vitesse.z = -Math.abs(this.vitesse.z);
        }
        if(this.position.z<=-border_z){
            this.vitesse.z = Math.abs(this.vitesse.z);
        }
        //console.log("delta");
        //console.log(dt);
        //console.log("vitesse");
        //console.log(this.vitesse);
        //console.log(this.vitesse.multiplyScalar(dt));
        //console.log("position");
        //console.log(this.position);
        this.position.addVectors(this.position,this.vitesse);
    }
}

//! Separation
//* Evite les collisions entre boids