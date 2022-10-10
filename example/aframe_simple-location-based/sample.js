window.onload = function() {
    console.log("window loaded...");
};

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
        });
    }
});