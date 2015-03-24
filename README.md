# PatrolJS
Navigation mesh toolkit for ThreeJS

PatrolJS helps your AI agents navigate around your world. It uses the A* and Funnel algorithms to calculate a path on a navigation mesh.

## Introduction

Traditionally games and 3D apps used waypoints to help their AI agents navigate. This is bad and has a lot of problems, but is generally easier to implement than navigation meshes. Navmeshes are far more accurate, faster and take into account the size of the AI agent (e.g. tanks require move space to maneuver than soldiers).

For a thorough introduction to Navigation mesh pathfinding, see AI Blog's article [Fixing Pathfinding Once and For All](http://www.ai-blog.net/archives/000152.html)

## Demo

[Demo](http://nickjanssen.github.io/PatrolJS/demo/demo.html)
![alt text](https://github.com/nickjanssen/PatrolJS/raw/master/patroljs.gif "PatrolJS Demo")

[Usage inside Ironbane MMO](https://www.youtube.com/watch?v=p6c9VFoYxrk)

## Installation

PatrolJS can be used on both the client and the server.

You need ThreeJS and Underscore in order to use this library. On the client, PatrolJS will assume these are availabe on the window object. On the server, just install this library using `npm install patroljs`. Afterwards just include it using `var patrol = require('patroljs')`.

## Usage

Before we get started, you need to understand a few stages of PatrolJS's navigation mesh building and planning.

PatrolJS currently does not build navigation meshes for you. I've tried but failed horribly. If you have knowledge of the matter and would like to help, please send a PR!

Fortunately there is a great tool to assist us with navigation meshes, namely Blender.
See [this video (6:08)](https://youtu.be/v4d_6ZCGlAg?t=6m8s) on how to generate your own navmesh.
After saving it as OBJ, you have to convert the file to ThreeJS's JSON format.

PatrolJS only accepts raw JSON model data. You must take care of loading the JSON file yourself.

### Loading a navmesh
```
jsonLoader.load( 'meshes/level.nav.js', function( geometry, materials ) {
	var zoneNodes = patrol.buildNodes(geometry);

	patrol.setZoneData('level', zoneNodes);

	// Set the player's navigation mesh group
	playerNavMeshGroup = patrol.getGroup('level', player.position);
}, null);
```

First, you need to build nodes from the navigation mesh using `buildNodes(geometry)`. These nodes are then saved in memory by passing them to PatrolJS using `setZoneData(levelName, nodes)`.

Every navigation mesh consists out of many groups of polygons. This is because, you can't always calculate a path from everywhere to everywhere. A path can only be constructed between points that lie on one group of polygons.

A level may only contain one group of polygons, but in practice these are usually more. The demo scene has around 50 groups for example. This is because Blender tries to bake the top surfaces of obstacles like crates and other inaccessible areas as well. You may remove these areas yourself for an optimization, if you wish, before converting the file to JSON for use with PatrolJS.

When calculating a path, PatrolJS needs to know what group of polygons you are searching in. In your game or app, you should precalculate this position using `getGroup(levelName, position)` and store it for when you want to calculate a path later.

```
// Calculate a path to the target
calculatedPath = patrol.findPath(player.position, target.position, 'level', playerNavMeshGroup);
```

Finally you can calculate a path using `findPath(beginPosition, targetPosition, levelName, group)`. This returns an array of THREE.Vector3. Simply go to these positions in order in order to complete your path. See the demo code for an example.

## Thanks to

* [bgrin's astar library](https://github.com/bgrins/javascript-astar)
* [Digesting Duck's Simple Stupid Funnel Algorithm](http://digestingduck.blogspot.jp/2010/03/simple-stupid-funnel-algorithm.html)
* [Recastnavigation's level mesh](https://github.com/memononen/recastnavigation)

## License

MIT
