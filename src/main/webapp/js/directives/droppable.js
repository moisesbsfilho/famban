angular.module('famban').directive('droppable', function() {
  return {
    scope: {
      dropComplete: "&"
    }, link: function(scope, element, attributes) {
        // this gives us the native JS object
        var el = element[0];

        el.addEventListener(
          'dragover',
          function(e) {
            e.dataTransfer.dropEffect = 'move';
            if (e.preventDefault) e.preventDefault();
            this.classList.add('over');
            return false;
          },
          false
          );

        el.addEventListener(
          'drop',
          function(e) {
            e.preventDefault();
            var data = e.dataTransfer.getData("id");
            var card = document.getElementById(data);
            var target = e.target.dataset.panel;
            if(target != card.parentElement.dataset.panel){
              e.target.appendChild(card);
              scope.dropComplete({id_banco: data, target: target});
              this.classList.remove('over');
            }
            return false;
          },
          false
          );
        
        el.addEventListener(
          'dragenter',
          function(e) {
            this.classList.add('over');
            return false;
          },
          false
          );

        el.addEventListener(
          'dragleave',
          function(e) {
            this.classList.remove('over');
            return false;
          },
          false
          );
      }
    }
});