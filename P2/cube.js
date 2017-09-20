"use strict";

/*START PART 2*/


var scene, camera, renderer, controls, axes;
var event;
var water;
var object, sphere;
var rectangular, tank;

/*torso*/
var torso, head, FRLeg, FLLeg, RRLeg, RLLeg, tail;
var turtle1;

/*body*/
var bodyBasicMaterial = new THREE.MeshBasicMaterial();
var bodyMaterial = bodyBasicMaterial

/*arms and tail*/
var basicMaterial = new THREE.MeshBasicMaterial({color: 0xff9966});
var armTailMaterial = basicMaterial;

/*eyes*/
var eyeBasicMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
var eyeMaterial = eyeBasicMaterial;

/*turtle array account and animation*/
var x = 0;
var y = 0;
var time1 = 0;
var time2 = 0;

/*the amount of turtle*/
var multipleTurtles = 6;
/*the amount turtle array*/
var turtleArray = new Array();
/*detection array*/
var shiftingArray = new Array();
/*start x */
var sx = new Array();
/*start y*/
var sy = new Array();
var s = new Array();
/*detection x*/
var dx = new Array();
/*detection y*/
var dy = new Array();

var clock = new THREE.Clock();
clock.start();


/*initialize*/
init();
function init(){

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000); 
	camera.position.z = 5; 

	/*water*/
	water = new THREE.Mesh(
	new THREE.PlaneGeometry(60, 40, 60, 40),
	new THREE.MeshBasicMaterial({transparent:true, opacity:0.5,color:0x33CCCC})
	);
	water.rotation.x = Math.PI / -2;
	scene.add(water);

	/*fish tank*/
	tank = createFishTank();
	console.log(tank);
	scene.add(tank);


	/*create many turtles and make the to stand in random position when the website was refreshed*/
	for (var n = 0; n < multipleTurtles; n++){
		turtleArray[n] = createTurtle();
		turtleArray[n].position.x = 2 * (Math.random() - 0.5) * 15;
		turtleArray[n].position.z = 2 * (Math.random() - 0.5) * 10;
		scene.add(turtleArray[n]);
	}


	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x404040, 1);
	document.body.appendChild(renderer.domElement); 

	/*control and view model with mouse*/
	controls = new THREE.TrackballControls(camera);
	controls.addEventListener('change', render);

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

	/*color*/
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

	/*color*/
	geometry.computeFaceNormals();

	object = new THREE.Mesh(geometry, armTailMaterial);

	return object; 
}


/*Fish tank*/
function createRectangular(){

	var geometry = new THREE.Geometry(); 
	/*bottom*/
	geometry.vertices.push(new THREE.Vector3(-30, -10, 20));
	geometry.vertices.push(new THREE.Vector3(30, -10, 20));
	geometry.vertices.push(new THREE.Vector3(30, -10, -20));
	geometry.vertices.push(new THREE.Vector3(-30, -10, -20));
	/*F*/
	geometry.vertices.push(new THREE.Vector3(-30, 10, 20));
	geometry.vertices.push(new THREE.Vector3(30, 10, 20));
	/*B*/
	geometry.vertices.push(new THREE.Vector3(-30, 10, -20));
	geometry.vertices.push(new THREE.Vector3(30, 10, -20));


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
	return rectangular; 
}


/*turtle eyes*/
function createEye(){
	var geometry = new THREE.SphereGeometry(1);

	geometry.computeFaceNormals();

	sphere = new THREE.Mesh(geometry,eyeMaterial);

	/*scaling*/
	sphere.scale.x = 0.15;
	sphere.scale.y = 0.3;
	sphere.scale.z = 0.3;

	return sphere;
}


/*create fish tank*/
function createFishTank(){
	var tankPoint = createAxes(2);
	var tank = createRectangular();

	tankPoint.add(tank);

	tankPoint.name = 'tankPoint';

	return tankPoint;
}


/*Uses the other functions to create the turtle*/
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

	return torso;
}

/*++++++++++++++++++++++++++++++++++++++++++++++++++Animation part+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function render(){
    renderer.render(scene,camera);
}


/*find interval function*/
function findInterval(keys, key){
    for(var n = 0; n < keys.length; n++){
        if(keys[n] > key){          
            return n;                      
        }       
    }     
}

/*fomula lerp*/
function lerp(k1,v1,k2,v2,k){
    var v = (k-k1)/(k2-k1)*(v2-v1)+v1;
    return v;
}

/*calculate interpolator*/
function interpolator(keys, value, key){
    var n = findInterval(keys, key);
    var k1 = keys[n-1], v1 = value[n-1], k2 = keys[n], v2 = value[n]; 
    var k = key;
    var v = lerp(k1,v1,k2,v2,k);
    return v;
 }

/*swimming with random speeds */
animationPre();
function animationPre(){
	for (var n = 0; n < multipleTurtles; n++){
		s[n] = Math.random()* (-2) + 3;
	}

	for(var n = 0; n < multipleTurtles; n++){
		shiftingArray[n] = (2 * Math.random()-0.5) * Math.PI;
	}

	for(var n = 0; n < multipleTurtles; n++){
		sx[n] = s[n] * Math.cos(shiftingArray[n]);
	}

	for(var n = 0; n < multipleTurtles; n++){
		sy[n] = s[n] * Math.sin(shiftingArray[n]);
	}
}

/*turtles swimming in the water randomly*/
function animateTurtle(){
	var dt = clock.getDelta();

    time1 += dt;
    if(time1 > 8){
        time1 = 0;
    }

    time2 += dt;
    if(time2 > 8){
        time2 = 0;
    }

	for(var n = 0; n<multipleTurtles;n ++){
		dx[n] = sx[n] * dt;
		dy[n] = sy[n] * dt;
		turtleArray[n].position.z += dy[n];
		turtleArray[n].position.x += dx[n];
	}

	for (var n = 0; n < multipleTurtles; n++){
		turtleArray[n].getObjectByName('neck').rotation.x = interpolator([0,1,2,3,4,5,6,7,8], [0, 0, 0, -0.261,-0.523, -0.261, 0, 0, 0], time1);
		turtleArray[n].getObjectByName('turtleTail').rotation.x = interpolator([0,1,2,3,4,5,6,7,8], [0, 0, 0, -0.261,-0.523, -0.261, 0, 0, 0], time1);
		turtleArray[n].getObjectByName('FRLeg').rotation.y = interpolator([0,1,2,3,4,5,6,7,8], [-2.617, -2.878, -3.14, -2.878, -2.617, -2.356, -2.093, -2.356, -2.617], time2);
		turtleArray[n].getObjectByName('FLLeg').rotation.y = interpolator([0,1,2,3,4,5,6,7,8], [-0.523, -0.262, 0, -0.262, -0.523, -0.784, -1.047, -0.784, -0.523], time2);
		turtleArray[n].getObjectByName('RRLeg').rotation.y = interpolator([0,1,2,3,4,5,6,7,8], [-3.67, -3.931, -4.19, -3.931, -3.67, -3.409, -3.14, -3.409, -3.67], time2);
		turtleArray[n].getObjectByName('RLLeg').rotation.y = interpolator([0,1,2,3,4,5,6,7,8], [0.523, 0.784, 1.047, 0.784, 0.523, 0.262, 0, 0.262, 0.523], time2);
	}
}

/*collision detection with wall*/
function collisionTank(){
	for(var n = 0; n<multipleTurtles;n ++){
		turtleArray[n].rotation.y = shiftingArray[n];

		if(( turtleArray[n].position.x >= 30)||( turtleArray[n].position.x <= -30)){
			sx[n] = -sx[n];
			shiftingArray[n] = Math.acos(sx[n]/s[n]);
			turtleArray[n].rotation.y = shiftingArray[n];
		} else if(( turtleArray[n].position.z >= 20)||( turtleArray[n].position.z <= -20)){
			sy[n] = -sy[n];
			shiftingArray[n] = Math.asin(sy[n]/s[n]);
			turtleArray[n].rotation.y =  shiftingArray[n];
		}
	}	
}


animate();
function animate()
{
	animateTurtle();

	collisionTank();

    requestAnimationFrame(animate);

    controls.update();

    render();
}



/*handleKeycode---s(stop), f(feed)*/
var feed;
var stop;

document.onkeydown = handleKeySF;

function handleKeySF(event)
{
    console.log(event.keyCode);
  
    switch (event.keyCode) {
    	// f
      	case 70:
      		// scene.traverse(animate);

      		scene.traverse(animateTurtle);
			scene.traverse(collisionTank);

			break;
      	// s
      	case 83:
      		break;

    }
}
/*END PART 2*/