 song ="";
 leftWristX ="";
 leftWristY ="";
 rightWristX ="";
 rightWristY ="";
scoreleftwrist = "";

 function setup(){
   canvas = createCanvas(500,400);
   canvas.center();
   canvas.position(440,200);

   video = createCapture(VIDEO);
   video.hide();

   poseNet = ml5.poseNet(video, modelLoaded);
   poseNet.on('pose', gotPoses);
}

function modelLoaded(){
console.log("PoseNet is initialized!");
}

function gotPoses(results){
if(results.length > 0){
    console.log(results);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("LeftWristX ="+ leftWristX +"LeftWristY"+ leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("RightWristX ="+ rightWristX + "RightWristY ="+ rightWristY);

    scoreleftwrist = results[0].pose.keypoints[9].score;
    console.log("score left wrist is"+ scoreleftwrist);
}
}
function draw(){
    image(video,0,0,500,400);

if(scoreleftwrist > 0.2){
    fill('red');
    stroke('red');
    circle(leftWristX,leftWristY,15);

    NumberleftwristY = number(leftWristY);
    remove_decimals = floor(NumberleftwristY);

    volume = remove_decimals/500;
    document.getElementById("Volume").innerHTML ="volume"+ volume;
    song.setVolume(volume);


}  
}


function preload(){
    song = loadSound("lofi hip hop radio.mp3");
}

function play(){
song.play();
song.setVolume(0.7);
song.rate(1);
}