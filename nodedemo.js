
var patrol = require('./patrol.js');
var THREE = require('three');

var fs = require('fs');
var file = __dirname + '/demo/meshes/level.nav.js';

var player = {
	position: new THREE.Vector3(-3.5, 0.5, 5.5)
};

fs.readFile(file, 'utf8', function (err, data) {
	if (err) {
		console.log('Error: ' + err);
		return;
	}

	var jsonLoader = new THREE.JSONLoader();

	var levelMesh = jsonLoader.parse(JSON.parse(data), null);

	var zoneNodes = patrol.buildNodes(levelMesh.geometry);

	patrol.setZoneData('level', zoneNodes);

	var playerNavMeshGroup = patrol.getGroup('level', player.position);

	var targetPosition = patrol.getRandomNode('level', playerNavMeshGroup);

	var calculatedPath = patrol.findPath(player.position, targetPosition, 'level', playerNavMeshGroup);

	console.log(calculatedPath);
});
