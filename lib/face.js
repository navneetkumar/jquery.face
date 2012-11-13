Face = function(ccvFace,source){
    var self = $.extend({},ccvFace);
    self.source = source;
    self.absoluteX = source.position().left + self.x;
    self.absoluteY = source.position().top + self.y;

    self.draw = function(){
        var div = document.createElement('div');
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
            for(var i=0;i < all_faces.length;i++){
                all_faces[i].draw();
            }
            return all_faces;
        }
        else return [];
    };

   self.track = function(videosrc){
       var video = videosrc.get(0);
       canvas = document.createElement('canvas');
       canvas.width = video.videoWidth;
       canvas.height = video.videoHeight;
       context = canvas.getContext('2d');
       div = document.createElement('div');
       div.style.border = '2px solid #C23535';
       div.style.position = 'absolute';
       div.style.width = '20px';
       div.style.height = '20px'
       videosrc.after(div);
       videosrc.after(canvas);

       setInterval(function(){
           if(!video.paused){
               context.drawImage(video, 0, 0, canvas.width, canvas.height);
               faces = ccv.detect_objects({
                   canvas: canvas,
                   cascade: cascade,
                   interval: 4,
                   min_neighbors: 1
               });
               if(faces.length > 0){
                   div.style.top = videosrc.position().top + faces[0].y + 'px';
                   div.style.left =  videosrc.position().left +faces[0].x + 'px';
                   div.style.width = faces[0].width + 'px';
                   div.style.height = faces[0].height + 'px';
               }

           }
       },10)
       return faces;
   };
   return self;
};