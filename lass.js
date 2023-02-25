song = "";
left_wristx = 0;
left_wristy = 0;
right_wristx = 0;
right_wristy = 0;
score_lw = 0;
score_rw = 0;
function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded() {
    console.log("pose net is initialised");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        score_lw = results[0].pose.keypoints[9].score;
        score_rw = results[0].pose.keypoints[10].score;
        console.log("Score for left wrist = " + score_lw + ", Score for right wrist = " + score_rw);

        left_wristx = results[0].pose.leftWrist.x;
        left_wristy = results[0].pose.leftWrist.y;
        console.log("left wrist X = " + left_wristx + "left wrist y = " + left_wristy);
        right_wristx = results[0].pose.rightWrist.x;
        right_wristy = results[0].pose.rightWrist.y;
        console.log("right wrist X = " + right_wristx + "right wrist y = " + right_wristy);
    }
}

function preload() {
    song = loadSound("imagine.ogg");

}
function draw() {
    image(video, 0, 0, 500, 500);
    fill('blue');
    stroke('black');
    if (score_rw > 0.2) {
        circle(right_wristx, right_wristy, 21);



        if (right_wristy > 0 && right_wristy <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if (right_wristy > 100 && right_wristy <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if (right_wristy > 200 && right_wristy <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if (right_wristy > 300 && right_wristy <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if (right_wristy > 400 && right_wristy <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
    if (score_lw > 0.2) {
        circle(left_wristx, left_wristy, 20);
        inNumberlwristy = Number(left_wristy);
        remove_decimal = floor(inNumberlwristy);
        volume = remove_decimal / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}
function play() {
    song.play();

}