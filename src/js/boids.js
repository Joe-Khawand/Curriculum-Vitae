import { Vector3 } from "three";

// Virtual box containing the boids cube size 60 centre en 0
const  border_x=70.0;
const  border_y=70.0;
const  border_z=70.0;

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
    set set_pos(vect){
        this.position.copy(vect);
    }
    set set_vit(vect){
        this.vitesse.copy(vect);
    }
    distance_to(b){
        return Math.sqrt(Math.pow(this.position.x-b.pos.x,2)+Math.pow(this.position.y-b.pos.y,2)+Math.pow(this.position.z-b.pos.z,2));
    }
    update_pos(dt){
        var dm = new Vector3();//dummy vector
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
        dm.copy(this.vitesse);
        this.position.addVectors(this.position,dm.normalize().multiplyScalar(dt*20));
    }
}

//!Initialise boid array

export function initialize_boids(number_boids){
    const boids_array = [];
    for (let i = 0; i < number_boids; i++)
    {
       boids_array[i] = new Boid();
    }
    return boids_array;
}

//! Separation
//* Evite les collisions entre boids
export function separation( boids_array , number_boids){
    var d;
    var dir = new Vector3();
    var dummy= new Vector3();

    for (let i = 0; i < number_boids; i++)
    {   
        for (let j = 0; j < number_boids; j++)
        {
            if (j!=i)
            {
                d = boids_array[i].distance_to(boids_array[j]);
                if (d<10.0)
                {
                    dir.copy(boids_array[j].pos).sub(boids_array[i].pos);
                    dummy.addVectors(boids_array[i].vit.normalize(),dir.normalize().multiplyScalar(0.01/(d+0.00001) -1/(10.0*10.0)))//Varibale can be changed to increase or decrease cohesion
                    boids_array[i].set_vit=dummy.normalize();   
                }  
            }
        }
    }
}

//! Alignment
//* Calul la vitesse moyenne des voisin d'un boid et applique la moyenne au mouvement
export function alignment(boids_array,number_boids){
    for (let i = 0; i < number_boids; i++)
    {   
        var dummy = new Vector3(0,0,0);
        var v = new Vector3(0,0,0);
        var nb=0;
        var d = 0;
        for (let j = 0; j < number_boids; j++)
        {
            if (j!=i)
            {
                d= boids_array[i].distance_to(boids_array[j]);
                if(d<30.0){
                    v.addVectors(v,boids_array[j].vit);
                    nb++;  
                }        
            }
            if(nb!=0){
                v.multiplyScalar(0.001/nb);//Varibale can be changed to increase or decrease alignment
                dummy.copy(boids_array[i].vit).normalize();
                boids_array[i].set_vit = dummy.addVectors(dummy,v);
            }
        }
    }
}

//! Cohesion
//* Trouve la position du centre des voisins du boid et l'oriente vers celui-ci
export function cohesion(boids_array,number_boids){
    for (let i = 0; i < number_boids; i++)
    {   
        var p= new Vector3(0,0,0);
        var nb=0;
        var d=0;
        var dummy= new Vector3();
        for (let j = 0; j < number_boids; j++)
        {
            
            d = boids_array[i].distance_to(boids_array[j]);
            if(d<30.0){
                p.addVectors(p,boids_array[j].pos);
                nb++;  
            }        
            
            if(nb!=0){
                p.multiplyScalar(1/nb);
                p.sub(boids_array[i].pos);
                p.multiplyScalar(0.000008);//Varibale can be changed to increase or decrease cohesion
                dummy.copy(boids_array[i].vit);
                dummy.normalize();
                dummy.addVectors(dummy,p);
                boids_array[i].set_vit = dummy;
            }
        }
    }
}