"use strict";

/*START PART 1*/

var scene, camera, renderer, controls, axes;
var event;
var light;
var water;

var object, sphere;
var topBody, bottomBody;


var rectangular, tank;

var torso, head, FRLeg, FLLeg, RRLeg, RLLeg, tail;

/*body*/
var loader = new THREE.TextureLoader();
var bodyTexture = loader.load("./shell-tex.png");
var bodyBasicMaterial = new THREE.MeshBasicMaterial();
var bodyLightMaterial = new THREE.MeshPhongMaterial({specular: 0xffffff}); 
var bodyMaterial = bodyBasicMaterial;

/*arms and tail*/
var basicMaterial = new THREE.MeshBasicMaterial({color: 0xff9966});
var lightMaterial = new THREE.MeshPhongMaterial({color: 0xff9966, specular: 0xffffff});
var armTailMaterial = basicMaterial;

/*eyes*/
var eyeBasicMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
var eyeLightMaterial = new THREE.MeshPhongMaterial({color: 0x000000, specular: 0xffffff});
var eyeMaterial = eyeBasicMaterial;
/*selectKey*/
var selectKey;
var Neck;
var Tail;
var hipKneeAnkle;
var upDown;
var leftRight;


/*Initial*/
init();
function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000); 
    camera.position.z = 5; 

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x404040, 1);
    document.body.appendChild(renderer.domElement); 

    /*control and view model with mouse*/
    controls = new THREE.TrackballControls(camera);
    controls.addEventListener('change', render);

    /*water*/
    water = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 10, 15, 10),
    new THREE.MeshBasicMaterial({transparent:true, opacity:0.5,color:0x33CCCC})
    );
    water.rotation.x = Math.PI / -2;
    scene.add(water);

    /*fish tank*/
    tank = createFishTank();
    console.log(tank);
    scene.add(tank);

    /*lighting*/
    addLights();

    /*createTurtle functon*/
    createTurtle();

    /*animation function*/
    animate();

    render();
}

function render(){
    renderer.render(scene,camera);
}

/*animation*/
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

/*lighting*/
function addLights(){
    var light  = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 1);
    scene.add(light);

    light  = new THREE.AmbientLight(0x404040);
    scene.add(light);
}


// returns hexagonal bipyramid (dodecahedron) object
function createHexagonalBipyramid(){
    var geometry = new THREE.Geometry(); 

    geometry.vertices.push(new THREE.Vector3(-0.5, 0, -0.866));
    geometry.vertices.push(new THREE.Vector3(-1, 0, 0));
    geometry.vertices.push(new THREE.Vector3(-0.5, 0, 0.866));
    geometry.vertices.push(new THREE.Vector3(0.5, 0, 0.866));
    geometry.vertices.push(new THREE.Vector3(1, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0.5, 0, -0.866));
    geometry.vertices.push(new THREE.Vector3(0, 0.5, 0));

    geometry.faces.push(new THREE.Face3(6, 0, 1));
    geometry.faces.push(new THREE.Face3(6, 1, 2));
    geometry.faces.push(new THREE.Face3(6, 2, 3));
    geometry.faces.push(new THREE.Face3(6, 3, 4));
    geometry.faces.push(new THREE.Face3(6, 4, 5));
    geometry.faces.push(new THREE.Face3(6, 5, 0));
    geometry.computeFaceNormals();

    /*texture*/
    var Shells = [
        new THREE.Vector2(0.25, 0.933), 
        new THREE.Vector2(0, 0.5), 
        new THREE.Vector2(0.25, 0.067), 
        new THREE.Vector2(0.75, 0.067), 
        new THREE.Vector2(1, 0.5), 
        new THREE.Vector2(0.75, 0.933), 
        new THREE.Vector2(0.5, 0.5)
        ];

    /*shell coordinates for texture mapping*/
    var a = new Array(Shells[6], Shells[0], Shells[1]);
    geometry.faceVertexUvs[0].push(a);

    a = new Array(Shells[6], Shells[1], Shells[2]);
    geometry.faceVertexUvs[0].push(a);

    a = new Array(Shells[6], Shells[2], Shells[3]);
    geometry.faceVertexUvs[0].push(a);

    a = new Array(Shells[6], Shells[3], Shells[4]);
    geometry.faceVertexUvs[0].push(a);

    a = new Array(Shells[6], Shells[4], Shells[5]);
    geometry.faceVertexUvs[0].push(a);

    a = new Array(Shells[6], Shells[5], Shells[0]);
    geometry.faceVertexUvs[0].push(a);

    object = new THREE.Mesh(geometry, bodyMaterial); 

    // Load and add texture to object material
    var loader = new THREE.TextureLoader();
    var texture = loader.load("./shell-tex.png");
    object.material.map = texture;

    return object;
}

// returns square bipyramid (octahedron) object
function createSquareBipyramid(){

    var geometry = new THREE.Geometry(); 
    geometry.vertices.push(new THREE.Vector3(0, 1, 0));
    geometry.vertices.push(new THREE.Vector3(-1, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 1));
    geometry.vertices.push(new THREE.Vector3(1, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, -1));
    geometry.vertices.push(new THREE.Vector3(0, -1, 0 ));

    geometry.faces.push(new THREE.Face3(0, 2 ,1));
    geometry.faces.push(new THREE.Face3(0, 3, 2));
    geometry.faces.push(new THREE.Face3(0, 4, 3));
    geometry.faces.push(new THREE.Face3(0, 1, 4));
    geometry.faces.push(new THREE.Face3(1, 2, 5));
    geometry.faces.push(new THREE.Face3(2, 3, 5));
    geometry.faces.push(new THREE.Face3(3, 4, 5));
    geometry.faces.push(new THREE.Face3(4, 1, 5));
    geometry.computeFaceNormals();

    object = new THREE.Mesh(geometry, armTailMaterial); 

    /*scaling*/
    object.scale.x = 0.5;
    object.scale.y = 0.3;
    object.scale.z = 0.3;

    return object; 
}

/*turtle tail triangle*/
function createTriangle(){
    var geometry = new THREE.Geometry(); 
    geometry.vertices.push(new THREE.Vector3(-0.25, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0.25, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, -0.5));

    geometry.faces.push(new THREE.Face3(0, 1 ,2));
    geometry.computeFaceNormals();

    object = new THREE.Mesh(geometry, armTailMaterial);

    return object; 
}


/*turtle eyes*/
function createEye(){
    var geometry = new THREE.SphereGeometry(1);

    geometry.computeFaceNormals();

    sphere = new THREE.Mesh(geometry,eyeMaterial);

    sphere.scale.x = 0.15;
    sphere.scale.y = 0.3;
    sphere.scale.z = 0.3;
    return sphere;
}


/*Fish tank*/
function createRectangular(){

    var geometry = new THREE.Geometry(); 
    /*bottom*/
    geometry.vertices.push(new THREE.Vector3(-7.5, -5, 5));
    geometry.vertices.push(new THREE.Vector3(7.5, -5, 5));
    geometry.vertices.push(new THREE.Vector3(7.5, -5, -5));
    geometry.vertices.push(new THREE.Vector3(-7.5, -5, -5));
    /*F*/
    geometry.vertices.push(new THREE.Vector3(-7.5, 5, 5));
    geometry.vertices.push(new THREE.Vector3(7.5, 5, 5));
    /*B*/
    geometry.vertices.push(new THREE.Vector3(-7.5, 5, -5));
    geometry.vertices.push(new THREE.Vector3(7.5, 5, -5));

    /*bottom*/
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(0, 2, 3));
    /*F*/
    geometry.faces.push(new THREE.Face3(0, 4, 1));
    geometry.faces.push(new THREE.Face3(1, 4, 5));
    /*B*/
    geometry.faces.push(new THREE.Face3(2, 3, 6));
    geometry.faces.push(new THREE.Face3(2, 6, 7));
    /*L*/
    geometry.faces.push(new THREE.Face3(0, 3, 6));
    geometry.faces.push(new THREE.Face3(0, 6, 4));
    /*R*/
    geometry.faces.push(new THREE.Face3(2, 1, 5));
    geometry.faces.push(new THREE.Face3(2, 5, 7));

    geometry.computeFaceNormals();


    var material = new THREE.MeshLambertMaterial({transparent:true, opacity:0.5, color: 0x00CCFF}); 

    rectangular = new THREE.Mesh(geometry, material);

    // rectangular.visible = true;
    material.wireframe = false;

    return rectangular; 
}


/*create fish tank*/
function createFishTank(){
    var tankPoint = createAxes(3);
    var tank = createRectangular();

    tankPoint.add(tank);

    tankPoint.name = 'tankPoint';

    return tankPoint;
}


// Uses the other functions to create the turtle
function createTurtle(){

    /*turtle body*/
    torso = createTorso();
    console.log(torso);
    scene.add(torso);

    /*turtle head*/
    head = createHead();
    console.log(head);
    torso.add(head);

    /*FRLeg*/
    FRLeg = createLeg();
    FRLeg.name = 'FRLeg';
    FRLeg.position.x = -0.75;
    FRLeg.position.z = 0.433;
    FRLeg.rotation.y = Math.PI / 0.857;
    console.log(FRLeg);
    torso.add(FRLeg);

    /*FLLeg*/
    FLLeg = createLeg();
    FLLeg.name = 'FLLeg';
    FLLeg.position.x = 0.75;
    FLLeg.position.z = 0.433;
    FLLeg.rotation.y = Math.PI / -6;
    console.log(FLLeg);
    torso.add(FLLeg);

    /*RRLeg*/
    RRLeg = createLeg();
    RRLeg.name = 'RRLeg';
    RRLeg.position.x = -0.75;
    RRLeg.position.z = -0.433;
    RRLeg.rotation.y = Math.PI / 1.2;
    console.log(RRLeg);
    torso.add(RRLeg);

    /*RLLeg*/
    RLLeg = createLeg();
    RLLeg.name = 'RLLeg';
    RLLeg.position.x = 0.75;
    RLLeg.position.z = -0.433;
    RLLeg.rotation.y = Math.PI / 6;
    console.log(RLLeg);
    torso.add(RLLeg);

    /*turtle tail*/
    tail = createTail();
    console.log(tail);
    torso.add(tail);
}


/*handleKeyDown*/
document.onkeydown = handleKeyDown;

function handleKeyDown(event)
{
    console.log(event.keyCode);
  
    switch (event.keyCode) {
    	// m
      	case 77:
			bodyMaterial.wireframe =! bodyMaterial.wireframe;
			armTailMaterial.wireframe =! armTailMaterial.wireframe;
			eyeMaterial.wireframe =! eyeMaterial.wireframe;

			bodyLightMaterial.wireframe =! bodyLightMaterial.wireframe;
			lightMaterial.wireframe =! lightMaterial.wireframe;
			eyeLightMaterial.wireframe =! eyeLightMaterial.wireframe;

			break;

      	// l
      	case 76:

			scene.traverse(materialswap);

         	break;
        // x
        case 88:

			/*turtle body*/
			scene.getObjectByName('pointTorsoAxes').visible =! scene.getObjectByName('pointTorsoAxes').visible;
				
			torso.getObjectByName('neckAxes').visible =! torso.getObjectByName('neckAxes').visible;

			torso.getObjectByName('tailAxes').visible =! torso.getObjectByName('tailAxes').visible;
			      
			torso.getObjectByName('FRLeg').getObjectByName('hipAxes').visible = !torso.getObjectByName('FRLeg').getObjectByName('hipAxes').visible;
			torso.getObjectByName('FRLeg').getObjectByName('kneeAxes').visible = !torso.getObjectByName('kneeAxes').visible;
			torso.getObjectByName('FRLeg').getObjectByName('ankleAxes').visible = !torso.getObjectByName('ankleAxes').visible;

			torso.getObjectByName('FLLeg').getObjectByName('hipAxes').visible = !torso.getObjectByName('FLLeg').getObjectByName('hipAxes').visible;
			torso.getObjectByName('FLLeg').getObjectByName('kneeAxes').visible = !torso.getObjectByName('FLLeg').getObjectByName('kneeAxes').visible;
			torso.getObjectByName('FLLeg').getObjectByName('ankleAxes').visible = !torso.getObjectByName('FLLeg').getObjectByName('ankleAxes').visible;

			torso.getObjectByName('RRLeg').getObjectByName('hipAxes').visible = !torso.getObjectByName('RRLeg').getObjectByName('hipAxes').visible;
			torso.getObjectByName('RRLeg').getObjectByName('kneeAxes').visible = !torso.getObjectByName('RRLeg').getObjectByName('kneeAxes').visible;
			torso.getObjectByName('RRLeg').getObjectByName('ankleAxes').visible = !torso.getObjectByName('RRLeg').getObjectByName('ankleAxes').visible;

			torso.getObjectByName('RLLeg').getObjectByName('hipAxes').visible = !torso.getObjectByName('RLLeg').getObjectByName('hipAxes').visible;
			torso.getObjectByName('RLLeg').getObjectByName('kneeAxes').visible = !torso.getObjectByName('RLLeg').getObjectByName('kneeAxes').visible;
			torso.getObjectByName('RLLeg').getObjectByName('ankleAxes').visible = !torso.getObjectByName('RLLeg').getObjectByName('ankleAxes').visible;

			break;


      	// -    
      	case 109:
			scene.traverse(turtleControl);

			/*decrease degree neck*/
			if(Neck == 'n'){
				if(selectKey.rotation.x < Math.PI / 2){
					selectKey.rotation.x += 1 * Math.PI / 180;
				}
			} 

			/*decrease degree tail*/
			if(Tail == 't'){
				if(selectKey.rotation.x > Math.PI / -2){
					selectKey.rotation.x -= 1 * Math.PI / 180;
				}
			} 

			/*decrease degree hip*/
			if(hipKneeAnkle == 'h'){
				if(selectKey.rotation.x < Math.PI / 2){
					selectKey.rotation.x += 1 * Math.PI / 180;
				}
			} 

			/*decrease degree knee*/
			if(hipKneeAnkle == 'k'){
				if(selectKey.rotation.x > Math.PI / -2){
					selectKey.rotation.x -= 1 * Math.PI / 180;
				}
			} 

			/*decrease degree ankle*/
			if(hipKneeAnkle == 'a'){
				if(selectKey.rotation.y < Math.PI / 3){
					selectKey.rotation.y += 1 * Math.PI / 180;
				}
			} 
			break;

        // +    
        case 107:
			scene.traverse(turtleControl);

			/*increase degree neck*/
			if(Neck == 'n'){
				if(selectKey.rotation.x > Math.PI / -2){
					selectKey.rotation.x -= 1 * Math.PI / 180;
				}
			} 

			/*increase degree tail*/
			if(Tail == 't'){
				if(selectKey.rotation.x < Math.PI / 2){
					selectKey.rotation.x += 1 * Math.PI / 180;
				} 
			} 

			/*increase degree hip*/
			if(hipKneeAnkle == 'h'){
				if(selectKey.rotation.x > Math.PI / -2){
					selectKey.rotation.x -= 1 * Math.PI / 180;
				}
			} 

			/*increase degree knee*/
			if(hipKneeAnkle == 'k'){
				if(selectKey.rotation.x < 0){
					selectKey.rotation.x += 1 * Math.PI / 180;
				}
			} 

			/*increase degree ankle*/
			if(hipKneeAnkle == 'a'){
				if(selectKey.rotation.y > Math.PI / -3){
					selectKey.rotation.y -= 1 * Math.PI / 180;
				}
			} 
			break;

      	// neck
      	case 78:
			Neck = 'n';
			Tail = '';
			hipKneeAnkle = '';
			break;

		// tail
      	case 84:
			Tail = 't';
			Neck = '';
			hipKneeAnkle = '';
			break;

  		// hip
  	  	case 72:
  	  		hipKneeAnkle = 'h';
  	  		Neck = '';
  	  		Tail = '';
  	  		break;

	  	// knee
	    case 75:
  	  		hipKneeAnkle = 'k';
  	  		Neck = '';
  	  		Tail = '';
  	  		break;

	  	// ankle
	    case 65:
  	  		hipKneeAnkle = 'a';
  	  		Neck = '';
  	  		Tail = '';
  	  		break;

	  	// left
	    case 37:
  	  		leftRight = 'l';
  	  		break;

	  	// right
	    case 39:
  	  		leftRight = 'r';
  	  		break;

	  	// up
	    case 38:
  	  		upDown = 'u';
  	  		break;

	  	// down
	    case 40:
  	  		upDown = 'd';
  	  		break;
    }
}


/*we can hand key code about turtle parts in any order*/
function turtleControl(){

	/*hand n*/
    if(Neck == 'n'){
    	selectKey = torso.getObjectByName('neck');
    }

	/*hand t*/
    if(Tail == 't'){
        selectKey = torso.getObjectByName('turtleTail');
    }

	/*hand h*/
    if(hipKneeAnkle == 'h'){
        if(upDown == 'u'){
            if(leftRight == 'l'){
                selectKey = torso.getObjectByName('FLLeg');
            } else if(leftRight == 'r'){
              selectKey = torso.getObjectByName('FRLeg');
            }
        } else if(upDown == 'd'){
            if(leftRight == 'l'){
                selectKey = torso.getObjectByName('RLLeg');
            } else if(leftRight == 'r'){
                selectKey = torso.getObjectByName('RRLeg');
            }
        }
    }

	/*hand k*/
    if(hipKneeAnkle == 'k'){
        if(upDown == 'u'){
            if(leftRight == 'l'){
                selectKey = torso.getObjectByName('FLLeg').getObjectByName('knee');
            } else if(leftRight == 'r'){
                selectKey = torso.getObjectByName('FRLeg').getObjectByName('knee');
            }
        } else if(upDown == 'd'){
            if(leftRight == 'l'){
                selectKey = torso.getObjectByName('RLLeg').getObjectByName('knee');
            } else if(leftRight == 'r'){
                selectKey = torso.getObjectByName('RRLeg').getObjectByName('knee');
            }
        }
    }

	/*hand a*/
    if(hipKneeAnkle == 'a'){
        if(upDown == 'u'){
            if(leftRight == 'l'){
                selectKey = torso.getObjectByName('FLLeg').getObjectByName('ankle');
            } else if(leftRight == 'r'){
                selectKey = torso.getObjectByName('FRLeg').getObjectByName('ankle');
            }
        } else if(upDown == 'd'){
            if(leftRight == 'l'){
                selectKey = torso.getObjectByName('RLLeg').getObjectByName('ankle');
            } else if(leftRight == 'r'){
                selectKey = torso.getObjectByName('RRLeg').getObjectByName('ankle');
            }
        }
    }
}


/*render control for lighting*/
/*arm and tail*/
function materialswap(obj)
{
  	if(obj.isMesh){
		if(obj.name == 'head'){
			if(obj.material.isMeshBasicMaterial){
				obj.material = lightMaterial;
				//swap head materials
			} else{
				obj.material = basicMaterial;
			}
		  }


		if(obj.name == 'eye'){
			  if(obj.material.isMeshBasicMaterial){
				    obj.material = eyeLightMaterial;
				//swap eye materials
			} else{
				obj.material = eyeBasicMaterial;
			}
		}


		if(obj.name == 'turtleTail'){
			  if(obj.material.isMeshBasicMaterial){
				    obj.material = lightMaterial;
				//swap turtleTail materials
			} else{
				obj.material = basicMaterial;
			}
		}


		if(obj.name == 'upLeg'){
			  if(obj.material.isMeshBasicMaterial){
				    obj.material = lightMaterial;
				//swap upleg materials
			} else{
				obj.material = basicMaterial;
			}
		}


		if(obj.name == 'lowLeg'){
			  if(obj.material.isMeshBasicMaterial){
				    obj.material = lightMaterial;
				//swap lowleg materials
			} else{
				obj.material = basicMaterial;
			}
		}


		if(obj.name == 'foot'){
			  if(obj.material.isMeshBasicMaterial){
				    obj.material = lightMaterial;
				//swap foot materials
			} else{
				obj.material = basicMaterial;
			}
		}


		if(obj.name == 'topTorso'){
  			if(obj.material.isMeshBasicMaterial){
  				obj.material = bodyLightMaterial;
            obj.material.map = bodyTexture;
  				//swap torso materials
  			} else{
  				obj.material = bodyBasicMaterial;
          		obj.material.map = bodyTexture;
  			}
		}


		if(obj.name == 'bottomTorso'){
  			if(obj.material.isMeshBasicMaterial){
  				obj.material = bodyLightMaterial;
            obj.material.map = bodyTexture;
  				//swap torso materials
  			} else{
  				obj.material = bodyBasicMaterial;
          		obj.material.map = bodyTexture;
  			}
		}
    }
}
/*END PART 1*/