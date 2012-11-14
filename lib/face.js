Face = function(ccvFace,source){
    var self = $.extend({},ccvFace);
    self.source = source;
    self.absoluteX = source.position().left + self.x;
    self.absoluteY = source.position().top + self.y;

    self.draw = function(){
        var div = document.createElement('div');
        div.className = 'tracker';
        div.style.border = '2px solid #C23535';
        div.style.position = 'absolute';
        div.style.width = this.width;
        div.style.height = this.height;
        div.style.left = this.absoluteX + 'px';
        div.style.top =  this.absoluteY + 'px';
        this.source.after(div);
    };

    return self;
}

FaceDetector = function(settings){
    var options = {};
    var self = $.extend(options, settings);
    self.source = this;
    self.getFaces = function(canvas){
        var ccv_faces = ccv.detect_objects({
            canvas: canvas,
            cascade: cascade,
            interval: 4,
            min_neighbors: 1
        });
        var faces =[];
        for(var i=0;i<ccv_faces.length;i++){
            var f = new Face(ccv_faces[i],this.source);
            faces.push(f);
        }
        return faces;
    }
    self.detect =  function(){
        if(this.source.is('img')){
            var cloned_image = new Image();
            cloned_image.src = this.source.get(0).src;
            var canvas = ccv.grayscale(ccv.pre(cloned_image));
            var all_faces = this.getFaces(canvas);
            this.draw_all(all_faces);
            return all_faces;
        }
        else return [];
    };

    self.draw_all = function(faces){
        $('.tracker').remove();
        for(var i=0;i < faces.length;i++){
            faces[i].draw();
        }
    }

   self.track = function(){
       if(this.source.is('video')){
           var video = this.source.get(0);
           canvas = document.createElement('canvas');
           canvas.width = video.videoWidth;
           canvas.height = video.videoHeight;
           context = canvas.getContext('2d');
           this.source.after(canvas);
           var self = this;
           setInterval(function(){
               if(!video.paused){
                   context.drawImage(video, 0, 0, canvas.width, canvas.height);
                   self.draw_all(self.getFaces(canvas));
               }
           },10)
       }
       else alert('Not a video');

   };
   return self;
};