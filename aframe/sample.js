// Setup for a-frame
AFRAME.registerComponent('samplehandler', {
    init: function () {
        console.log("samplehandler init...")
        let marker = this.el;
        //let marker = this.el.sceneEl;

        marker.addEventListener('markerFound', function () {
            console.log("markerFound...");
        }.bind(this));

        marker.addEventListener('markerLost', function() {
            console.log("markerLost...");
        }.bind(this));
    }
});

AFRAME.registerComponent('modify-materials', {
    init: function () {
        let tex = new THREE.TextureLoader().load('../resources/Map-COL.jpg');

        // Wait for model to load.
        this.el.addEventListener('model-loaded', () => {
            // Grab the mesh / scene.
            const obj = this.el.getObject3D('mesh');
            // Go over the submeshes and modify materials we want.
            obj.traverse(node => {
                console.log("node.name:", node.name);
                if (node.name == "LeePerrySmith") {
                    // node.material.color.set('red');
                    node.material.map = tex;
                }
            });
            
            // When button clicked
            let scene = document.querySelector("a-scene");
            let submitBtn = document.getElementById("submit-btn");
            submitBtn.addEventListener('click', () => {
                if (scene.hasLoaded){
                    const lat = document.getElementById('textbox-lat');
                    const lon = document.getElementById('textbox-lon');
                    console.log("textbox->(lat, lon):", lat.value, lon.value);

                    const model = document.getElementById("ar-model")
                    console.log("model->(lat, lon):", model.getAttribute('gps-projected-entity-place'))
                    //console.log("pos:", model.object3D.position);
                    model.setAttribute('gps-projected-entity-place', {
                        latitude: lat.value,
                        longitude: lon.value
                    });

                    model.object3D.position.z += 1;
                }
            });
        });
    }
});

window.onload = function() {
    console.log("window loaded...");
};