let video;
let poseNet
let noseX = 0; 
let noseY = 0; 
let leftEyeX = 0;
let leftEyeY = 0;
let leftShoulderX = 0;
let leftShoulderY = 0;
let rightShoulderX = 0;
let rightShoulderY = 0;

let leftHipX = 0;
let leftHipY = 0;

let img;

function preload(){
    img=loadImage('sweat.png');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide()
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses)
}

function gotPoses(poses){
    console.log(poses);
    if (poses.length > 0){
        
        let newLeftShoulderX = poses[0].pose.leftShoulder.x;
        let newLeftShoulderY = poses[0].pose.leftShoulder.y;
        
        leftShoulderX = lerp(leftShoulderX, newLeftShoulderX, 0.2);
        leftShoulderY = lerp(leftShoulderY, newLeftShoulderY, 0.2);


        let newRightShoulderX = poses[0].pose.rightShoulder.x;
        let newRightShoulderY = poses[0].pose.rightShoulder.y;
        
        rightShoulderX = lerp(rightShoulderX, newRightShoulderX, 0.2);
        rightShoulderY = lerp(rightShoulderY, newRightShoulderY, 0.2);


        let newLeftHipX = poses[0].pose.leftHip.x;
        let newLeftHipY = poses[0].pose.leftHip.y;

        leftHipX = lerp(leftHipX, newLeftHipX, 0.2);
        leftHipY = lerp(leftHipY, newLeftHipY, 0.2);

        /*let newNoseX = poses[0].pose.nose.x;
        let newNoseY = poses[0].pose.nose.y;
        let newLeftEyeX = poses[0].pose.leftEye.x;
        let newLeftEyeY = poses[0].pose.leftEye.y;
        noseX = lerp(noseX, newNoseX, 0.2);
        noseY = lerp(noseY, newNoseY, 0.2);

        leftEyeX = lerp(leftEyeX, newLeftEyeX, 0.5);
        leftEyeY = lerp(leftEyeY, newLeftEyeY, 0.5);*/
    }
}

function modelReady() {
    console.log('model ready');
}

function draw() {
  image(video, 0, 0);

  let width = dist(leftShoulderX, leftShoulderY, rightShoulderX, rightShoulderY);
  let height = dist(leftShoulderX, leftShoulderY, leftHipX, leftHipY);
  image(img, rightShoulderX-(width/1.7), rightShoulderY-50, width*2, height);

  fill(255, 0, 0);
  ellipse(leftHipX, leftHipY, 25);

  fill(0, 0, 255);
  ellipse(rightShoulderX, rightShoulderY, 25);
}