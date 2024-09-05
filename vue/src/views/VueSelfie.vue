
<template>


    <div class="bg-blue w-full p-8 flex justify-center font-sans ">
        <div class="rounded bg-grey-light p-2 bg-blue-500 w-screen">
            <div class="flex justify-between py-1">
            	
            </div>
            

  	        <div class="bg-white p-2 rounded mt-1 border-b border-grey h-40"> 
                <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">
                   
                    <div>
                   
                    <video ref="video" @canplay="initCanvas()" height="120" width="160">Stream Unavailable</video> 
                     <button @click="takePicture()">Click</button>
             
                   </div>
                   
                   <div>
                    <canvas ref="canvas" style="display:none;" > </canvas>
                    <img id="photo" alt="The screen capture will appear in this box." />

                   </div>
             
              

                


                   
               

                </div>  
	        </div> 
        </div>



    </div> 

  
</template>


<script>

import axios from "axios";
import axiosClient from "../axios"; 

export default{
 name:"vueSelfie",

 data(){
    return{
        imageSrc:null,
        video:null,
        canvas:null,
    }
 },
 mounted(){
    this.canvas=this.$refs.canvas;
    this.video=this.$refs.video;

 },
 methods: {
    
    startCapture(){
navigator.mediaDevices.getUserMedia({video: true,audio:false}).then(stream => {
this.video.srcObject= stream,
this.video.play();
}).catch(error =>{
console.log(error);
})
    },
    takePicture(){
    
    this.startCapture();
    let context = this.canvas.getContext('2d');
    context.drawImage(this.video,0,0,this.video.videoWidth,this.video.videoHeight);
    const data = this.canvas.toDataURL("image/png");
    // console.log(data);
    //photo.setAttribute("src", data);
    this.$emit('picture-taken',data);
    this.iscameraOpen=false;
    this.isPhotoTaken=false;
    this.isShotPhoto=false;
    this.vidOff();
   // this.stopCapture();

},

initCanvas(){
        this.canvas.setAttribute('width',this.video.videoWidth)
        this.canvas.setAttribute('height',this.video.videoHeight)
     },


vidOff() {
 const constraints=(window.constraints={
    audio:false,
    video:true
 });

//   navigator.mediaDevices
//         .getUserMedia(constraints)
//         .then(stream => {
//             this.$refs.video.srcObject = stream;
//             stream.getTracks().forEach((track) => {
//     track.stop();
//   });
 //})

        
 
}
  
},


}
</script>