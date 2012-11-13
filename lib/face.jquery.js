/*
 FaceDetection jQuery Plugin
 Copyright (c) 2010, Jay Salvat

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
(function($){
    $.fn.faceDetection = function(settings){
        var options = {
            confidence:null,
            start:function(img) {
            },
            complete:function(img, coords) {
            },
            error:function(img, code, message) {
            }
        }
        $.extend(options, settings);
        options.start(this);
        if(this.is('video')){
            Face.track(this);
        }
//        if (!this.is('img')) {
//            options.error(this, 1, 'This is not an image.');
//            options.complete(this, []);
//            return [];
//        }
//
//        var image = this.get(0);
//        var faces = Face.detect(image);
//        Face.draw(faces,this);
//        return faces;
    };
})(jQuery);