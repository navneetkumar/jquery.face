Face = {};
Face.detect = function(image){
   var cloned_image = new Image();
   cloned_image.src = image.src;
   var faces = ccv.detect_objects({
        canvas: ccv.grayscale(ccv.pre(cloned_image)),
        cascade: cascade,
        interval: 4,
        min_neighbors: 1
    });
    return faces;
};

Face.draw = function(faces,image){
    for (var i = 0; i < faces.length; i++) {
        var f = $('<div>',{
            'class':'face',
            'css': {
                'position':	'absolute',
                'left':		faces[i].x +'px',
                'top':		faces[i].y +'px',
                'width': 	faces[i].width		+'px',
                'height': 	faces[i].height	+'px',
                'border':   '2px solid #C23535'
            }

        });
    image.after(f);
    }
};

Face.track = function(videosrc){
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
}