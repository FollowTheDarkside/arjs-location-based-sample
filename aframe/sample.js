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

window.onload = function() {
    console.log("window loaded...");

    let scene = document.querySelector('a-scene');
    let submitBtn = document.getElementById("submit-btn");

    // Set location based model when button clicked
    submitBtn.addEventListener('click', () => {
        console.log("Submitted...")

        const lat = document.getElementById('textbox-lat').value;
        const lon = document.getElementById('textbox-lon').value;
        console.log("textbox->(lat, lon):", lat, lon);

        let model = document.createElement('a-entity');
        model.setAttribute('id', 'ar-model');
        model.setAttribute('look-at', '[gps-camera]');
        model.setAttribute('gps-entity-place', 'latitude: ${lat}; longitude: ${lon};');
        model.setAttribute('gltf-model', '../resources/LeePerrySmith.glb');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '100 100 100');

        model.addEventListener('loaded', () => {
            console.log("loaded...")
            // Set custom event for gps-entity-place
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))

            // Set texture when model loaded
            let arModel = document.getElementById('ar-model')
            arModel.addEventListener('model-loaded', () => {
                console.log("arModel loaded...")
                let tex = new THREE.TextureLoader().load('../resources/Map-COL.jpg');
                let obj = arModel.getObject3D('mesh');
                obj.traverse(node => {
                    console.log("node.name:", node.name);
                    if (node.name == "LeePerrySmith") {
                        // node.material.color.set('red');
                        node.material.map = tex;
                    }
                });
            })
        });

        scene.appendChild(model);
    });
};