// returns the torso object
function createTorso(){
	/*define the varibale of torso and torso point*/
	var pointTorso = new THREE.Object3D();
    var pointTorsoAxes = createAxes(1);
    pointTorso.add(pointTorsoAxes);

    var topTorso = createHexagonalBipyramid();
    var bottomTorso = createHexagonalBipyramid();

    bottomTorso.rotation.z = Math.PI;

    pointTorso.add(topTorso);
    topTorso.add(bottomTorso);

    topTorso.name = 'topTorso';
    bottomTorso.name = 'bottomTorso';

    pointTorso.name = 'pointTorso';
    pointTorsoAxes.name = 'pointTorsoAxes';

    return pointTorso;
}


// returns the head object
function createHead(){
	/*define the varibale of neck and head*/
    var neck = createNeckJoint();
    var head = createSquareBipyramid();

    head.position.z = 0.5;
    /*head rotation*/
    head.rotation.y = Math.PI / 2;

    neck.add(head);

    /*right eye*/
    var REye = createEye();
	REye.position.x = -0.5;
	REye.position.y = -0.1;
	REye.position.z = -0.5;
	/*left eye*/
    var LEye = createEye();
	LEye.position.x = -0.5;
	LEye.position.y = -0.1;
	LEye.position.z = 0.5;

    head.add(REye);
    head.add(LEye);

	REye.name = 'eye';
	LEye.name = 'eye';
	head.name = 'head';
	neck.name = 'neck';
    return neck;
}



//return the tail object
function createTail(){
	var tailPoint = createTailJoint();

	var turtleTail = createTriangle();
	tailPoint.add(turtleTail);

	turtleTail.name = 'turtleTail';
	tailPoint.name = 'tailPoint';
	return tailPoint;

}

// returns a whole leg
function createLeg(){
	/*create upleg*/
	var hip = createHipJoint();
	var upLeg = createSquareBipyramid();
	upLeg.position.x = 0.5;
	hip.add(upLeg);
	upLeg.name = 'upLeg';
	hip.name = 'hip';

	/*create lowLeg*/
	var knee = createKneeJoint();
	hip.add(knee);
	var lowLeg = createSquareBipyramid();
	lowLeg.position.x = 0.5;
	knee.add(lowLeg);
	lowLeg.name = 'lowLeg';
	knee.name = 'knee';

	/*create foot*/
	var ankle = createAnkleJoint();
	knee.add(ankle);
	var foot = createSquareBipyramid();
	foot.position.x = 0.5;
	ankle.add(foot);
	foot.name = 'foot';
	ankle.name = 'ankle';

	/*return a whole leg*/

	return hip;	/*END*/

}

/*NeckJoint*/
function createNeckJoint(){
	var Neck = new THREE.Object3D();
	var neckAxes = createAxes(1);
	Neck.add(neckAxes);

	Neck.position.z = 0.866;

    neckAxes.name = 'neckAxes';
    return Neck;
}

/*TailJoint*/
function createTailJoint(){
	var Tail = new THREE.Object3D();
	var tailAxes = createAxes(1);
	Tail.add(tailAxes);

	Tail.position.z = -0.866;

	tailAxes.name = 'tailAxes';
	return Tail;
}


/*HipJoint*/
function createHipJoint(){
	var Hip = new THREE.Object3D();
    var hipAxes = createAxes(1);
    Hip.add(hipAxes);

    hipAxes.name = 'hipAxes';
    return Hip;
}

/*KneeJoint*/
// createKneeJoint();
function createKneeJoint(){
	var Knee = new THREE.Object3D();
	var kneeAxes = createAxes(1);
	Knee.add(kneeAxes);

	Knee.position.x = 1;
	/*knee rotation*/
	Knee.rotation.z = Math.PI / -4;

	kneeAxes.name = 'kneeAxes';
	return Knee;
}

/*AnkleJoint*/
function createAnkleJoint(){
	var Ankle = new THREE.Object3D();
	var ankleAxes = createAxes(1);
	Ankle.add(ankleAxes);

	Ankle.position.x = 1;
	/*ankle rotation*/
	Ankle.rotation.z = Math.PI / -4;

	ankleAxes.name = 'ankleAxes';
	return Ankle;
}