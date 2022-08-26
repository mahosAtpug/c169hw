AFRAME.registerComponent("markerhandler", {
    init: async function () {
  
      var toys = await this.getToys();
  
      //markerFound event
      this.el.addEventListener("markerFound", () => {
        var markerId = this.el.id;      
        this.handleMarkerFound(toys, markerId);
      });
  
      //markerLost event
      this.el.addEventListener("markerLost", () => {
        this.handleMarkerLost();
      });
  
    },
    handleMarkerFound: function (toys, markerId) {
      // Changing button div visibility
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "flex";
  
      var ratingButton = document.getElementById("rating-button");
      var orderButtton = document.getElementById("order-button");
  
      // Handling Click Events
      ratingButton.addEventListener("click", function () {
        swal({
          icon: "warning",
          title: "Rate Toy",
          text: "Work In Progress"
        });
      });
  
      orderButtton.addEventListener("click", () => {
        swal({
          icon: "https://i.imgur.com/4NZ6uLY.jpg",
          title: "Thanks For Order!",
          text: "Please go through the store once more to find anything that you like!!"
        });
      });
  
      // Changing Model scale to initial scale
      var toy = toys.filter(toy => toy.id === markerId)[0];
  
      var model = document.querySelector(`#model-${toy.id}`);
      model.setAttribute("position", toy.model_geometry.position);
      model.setAttribute("rotation", toy.model_geometry.rotation);
      model.setAttribute("scale", toy.model_geometry.scale);
    },
  
    handleMarkerLost: function () {
      // Changing button div visibility
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "none";
    },
    getToys: async function () {
      return await firebase
        .firestore()
        .collection("toys")
        .get()
        .then(snap => {
          return snap.docs.map(doc => doc.data());
        });
    }
  });
  