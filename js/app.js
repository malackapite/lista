import { OBJEKTUMLISTA } from '../both/adat.js';
import * as THREE from './three.module.js';

var APP = {

	Player: function () {

		var renderer = new THREE.WebGLRenderer( { antialias: true,
			alpha: true,
			premultipliedAlpha: false 
		} );
		renderer.setPixelRatio( window.devicePixelRatio ); // TODO: Use player.setPixelRatio()
		renderer.outputEncoding = THREE.sRGBEncoding;

		var loader = new THREE.ObjectLoader();
		var camera, scene;

		var vrButton = VRButton.createButton( renderer ); // eslint-disable-line no-undef

		var events = {};

		var dom = document.createElement( 'div' );
		dom.appendChild( renderer.domElement );

		this.dom = dom;

		this.width = 500;
		this.height = 500;

		const ido = new THREE.Clock();
		const idoCam = new THREE.Clock();
		//idoCam.stop()
		//ido.stop();
		let nth=[0,0]
		let fing
		const distance=2.2

		this.load = function ( json ) {

			var project = json.project;

			if ( project.vr !== undefined ) renderer.xr.enabled = project.vr;
			if ( project.shadows !== undefined ) renderer.shadowMap.enabled = project.shadows;
			if ( project.shadowType !== undefined ) renderer.shadowMap.type = project.shadowType;
			if ( project.toneMapping !== undefined ) renderer.toneMapping = project.toneMapping;
			if ( project.toneMappingExposure !== undefined ) renderer.toneMappingExposure = project.toneMappingExposure;
			if ( project.physicallyCorrectLights !== undefined ) renderer.physicallyCorrectLights = project.physicallyCorrectLights;

			this.setScene( loader.parse( json.scene ) );
			this.setCamera( loader.parse( json.camera ) );

			events = {
				init: [],
				start: [],
				stop: [],
				keydown: [],
				keyup: [],
				pointerdown: [],
				pointerup: [],
				pointermove: [],
				update: []
			};

			var scriptWrapParams = 'player,renderer,scene,camera';
			var scriptWrapResultObj = {};

			for ( var eventKey in events ) {

				scriptWrapParams += ',' + eventKey;
				scriptWrapResultObj[ eventKey ] = eventKey;

			}

			var scriptWrapResult = JSON.stringify( scriptWrapResultObj ).replace( /\"/g, '' );

			for ( var uuid in json.scripts ) {

				var object = scene.getObjectByProperty( 'uuid', uuid, true );

				if ( object === undefined ) {

					console.warn( 'APP.Player: Script without object.', uuid );
					continue;

				}

				var scripts = json.scripts[ uuid ];

				for ( var i = 0; i < scripts.length; i ++ ) {

					var script = scripts[ i ];

					var functions = ( new Function( scriptWrapParams, script.source + '\nreturn ' + scriptWrapResult + ';' ).bind( object ) )( this, renderer, scene, camera );

					for ( var name in functions ) {

						if ( functions[ name ] === undefined ) continue;

						if ( events[ name ] === undefined ) {

							console.warn( 'APP.Player: Event type not supported (', name, ')' );
							continue;

						}

						events[ name ].push( functions[ name ].bind( object ) );

					}

				}

			}

			dispatch( events.init, arguments );
			
			for (let ix = 0; ix < OBJEKTUMLISTA.length-1; ix++) {
				var asd= scene.getObjectByName("node_id34").clone();
				asd.name="macska"+ix
				scene.add(asd);
				asd.position.x=distance+distance*ix	
			}	
			const raycaster = new THREE.Raycaster();
			const clickMouse = new THREE.Vector2();
			window.addEventListener("click", event =>{
				clickMouse.x = (event.clientX/window.innerWidth)*2-1;
				clickMouse.y = -(event.clientY/window.innerHeight)*2+1;
				raycaster.setFromCamera(clickMouse, camera);
				const found = raycaster.intersectObjects(scene.children);
				if(found.length>0 && found[0].object.name=="fart"){
					var selectedObject = scene.getObjectByName("fart");
					var masik= selectedObject.parent.clone();
					//masik.scale.set(300,300,600);
					var asd= scene.getObjectByName("node_id31");
					//const ido = new THREE.Clock();
					ido.start();

					asd.parent.add(masik);
					selectedObject.parent.clear();
					new Audio('both/fart2.mp3').play()
					// console.log(masik.scale);
					//console.log(scene.getObjectByName("node_id29").position);
					//console.log(masik.scale);
					//fing=masik
					//console.log(fing);
				}
		})
	
		$("#elore").on("click",function() {
			idoCam.start()
			// console.log(nth);
			nth.shift()
			nth.push(Math.min(nth[0]+1,OBJEKTUMLISTA.length-1))
			console.log(nth);
		})

		$("#hatra").on("click",function() {
			idoCam.start()
			// console.log(nth);
			nth.shift()
			nth.push(Math.max(nth[0]-1,0))
			console.log(nth);
		})
		};

		this.setCamera = function ( value ) {

			camera = value;
			camera.aspect = this.width / this.height;
			camera.updateProjectionMatrix();

		};

		this.setScene = function ( value ) {

			scene = value;

		};

		this.setPixelRatio = function ( pixelRatio ) {

			renderer.setPixelRatio( pixelRatio );

		};

		this.setSize = function ( width, height ) {

			this.width = width;
			this.height = height;

			if ( camera ) {

				camera.aspect = this.width / this.height;
				camera.updateProjectionMatrix();

			}

			renderer.setSize( width, height );

		};

		function dispatch( array, event ) {

			for ( var i = 0, l = array.length; i < l; i ++ ) {

				array[ i ]( event );

			}

		}

		var time, startTime, prevTime;

		function animate() {

			time = performance.now();

			try {

				dispatch( events.update, { time: time - startTime, delta: time - prevTime } );

			} catch ( e ) {

				console.error( ( e.message || e ), ( e.stack || '' ) );

			}
			try{
				var selectedObject = scene.getObjectByName("fart");
				// console.log(selectedObject);
				// console.log(fing);
				if (ido.getElapsedTime()<1) {
					selectedObject.scale.x=(Math.pow((ido.getElapsedTime()),2)+Math.sin(ido.getElapsedTime()*3))/1.052335956 //4,104528463 //(-Math.pow((ido.getElapsedTime()-3),2)+9)/9
					selectedObject.scale.y=(Math.pow((ido.getElapsedTime()),2)+Math.sin(ido.getElapsedTime()*3))/1.052335956 //4,104528463
					selectedObject.scale.z=(Math.pow((ido.getElapsedTime()),2)+Math.sin(ido.getElapsedTime()*3))/1.052335956 //4,104528463
				}
			}catch(e){}
			
			try{
				if (idoCam.getElapsedTime()<1) {
					camera.position.x=nth[0]*distance+(nth[1]-nth[0])*(Math.pow((idoCam.getElapsedTime()),2))/(Math.pow(1,2)) *distance
					//console.log(camera.position.x);
				}
			}catch(e){}
			
			try{
				for (let ix = 0; ix < OBJEKTUMLISTA.length; ix++) {
					let asd=scene.getObjectByName("macska"+ix).rotation.y = ( time * 0.001) * -.5;
				}
			}
			catch(e){}

			renderer.render( scene, camera );

			prevTime = time;

		}

		this.play = function () {

			if ( renderer.xr.enabled ) dom.append( vrButton );

			startTime = prevTime = performance.now();

			document.addEventListener( 'keydown', onKeyDown );
			document.addEventListener( 'keyup', onKeyUp );
			document.addEventListener( 'pointerdown', onPointerDown );
			document.addEventListener( 'pointerup', onPointerUp );
			document.addEventListener( 'pointermove', onPointerMove );

			dispatch( events.start, arguments );

			renderer.setAnimationLoop( animate );

		};

		this.stop = function () {

			if ( renderer.xr.enabled ) vrButton.remove();

			document.removeEventListener( 'keydown', onKeyDown );
			document.removeEventListener( 'keyup', onKeyUp );
			document.removeEventListener( 'pointerdown', onPointerDown );
			document.removeEventListener( 'pointerup', onPointerUp );
			document.removeEventListener( 'pointermove', onPointerMove );

			dispatch( events.stop, arguments );

			renderer.setAnimationLoop( null );

		};

		this.render = function ( time ) {

			dispatch( events.update, { time: time * 1000, delta: 0 /* TODO */ } );

			renderer.render( scene, camera );

		};

		this.dispose = function () {

			renderer.dispose();

			camera = undefined;
			scene = undefined;

		};


		function onKeyDown( event ) {

			dispatch( events.keydown, event );

		}

		function onKeyUp( event ) {

			dispatch( events.keyup, event );

		}

		function onPointerDown( event ) {

			dispatch( events.pointerdown, event );

		}

		function onPointerUp( event ) {

			dispatch( events.pointerup, event );

		}

		function onPointerMove( event ) {

			dispatch( events.pointermove, event );
			
		}
	}

};

export { APP };
