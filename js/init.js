(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(".dropdown-trigger").dropdown();

var content = {
	"nav_hidden_content1": "The data is collected using a ROS utility called <a href=http://wiki.ros.org/rosbag>rosbag</a>. Since the camera outputs images at 60FPS we throttle it down with the help of <a href=http://wiki.ros.org/topic_tools/throttle>topic_tools throttle</a> ROS package. This basically diverts the camera stream into a new topic that only outputs at a frequency of 1Hz. Once this is setup we run the throttle package to divert the input and use rosbag to record the diverted input giving us unique images across the track and reducing file size taken by a given lap. The images are then extracted from this bag file using the <a href=http://wiki.ros.org/rosbag/Tutorials/Exporting%20image%20and%20video%20data>image_view</a> ROS package. Once converted into images we now have a part of our dataset ready",
	"nav_hidden_content2": "The dataset is labelled in the COCO JSON format with the help of <a href=https://www.makesense.ai/>MakeSenseAI</a>. We labelled around 2 laps of data. Since we ran a model that was pretrained on the COCO dataset we believed it would be sufficient. The images were cropped so that the top half is not visible during training and inference. This reduced a lot of the noise from the background",
	"nav_hidden_content3": "Training is done with the help of Facebook AI's <a href=https://github.com/facebookresearch/detectron2/>Detectron2</a> network. Specifically we use the MaskRCNN model in Detectron2 that has been pretrained on the COCO dataset. Using their libary allowed us to easily set up visualizations, inference and training. We noticed that a lower batch size of 8, initial learning rate of .01 and 200 epochs gave the best result. The scheduler reduced the learning rate soon after and the batch size of 8 led to faster convergence",
	"nav_hidden_content4": "The MaskRCNN model returns 4 objects: The boundary box which is the rectangular portion of the image where an object lies, the segmentation mask which is the exact pixels in which the object exists, the confidence level in the prediction and an integer ID representing what that object is. In our case the integer ID is mapped to our object strings: Lane and Cone",
	"nav_hidden_content5": "First we use the boundary boxes for the lanes. The great part about the boundary boxes is it perfectly contains the end points of the segmentation results. For the lanes we assume boundary boxes on the left are the left lane and boundary boxes on the right are the right lane (safe assumption if we are staying within the lanes at all times). The end points of those boundary boxes are connected to generate the base white polygon. If any cones appear in this white polygon we overlay the cone segmentation mask and blacken the area making it impermissible to move there. We then use the centroid of the image to move forward"
}

function nav_hidden_content(elem_id) {
  let button = document.getElementById(elem_id).children[0];
  let description = document.getElementById(elem_id+"_p");
  if (button.innerText.toLowerCase() == "arrow_downward") {
  	button.innerText = "arrow_upward";
  	// if (elem_id == "nav_hidden_content1") {
  	// 	description.innerText = ""
  	// }
  	description.innerHTML = content[elem_id];
  }
  else {
  	button.innerText = "arrow_downward";
  	description.innerText = "";
  }
}