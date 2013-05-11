/**
 *  Titanium Android Facebook Photo Share
 *
 *
 *  Author By Equan Pr.
 *  www.junwatu.com
 */

var fb = require('facebook');

var osname = Ti.Platform.osname,
	version = Ti.Platform.version,
	height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;

var fbbutton = fb.createLoginButton({
	style: fb.BUTTON_STYLE_WIDE
});

var shareFbButton = Titanium.UI.createButton({
	title: 'Share',
	height: 30,
	width: 100
});


// Facebook Application ID
fb.appid = 185299698279540;
fb.permissions = ['publish_stream'];

fb.addEventListener('logout', function(e) {
	alert('Logged out');
	$.shareButtonsContainer.remove(shareFbButton);
	$.messagePost.visible = false;
});

fb.addEventListener('login', function(e) {
	if(e.success) {
		alert('Logged In');
		if(!fb.loggedIn) {
			$.shareButtonsContainer.add(shareFbButton);
		}
	} else if(e.error) {
		alert(e.error);
	} else if(e.cancelled) {
		alert("Canceled");
	}
});


// Indicator UI
var style = Titanium.UI.ActivityIndicatorStyle.DARK,

	activityIndicator = Titanium.UI.createActivityIndicator({
		color: 'green',
		font: {
			fontFamily: 'Helvetica Neue',
			fontSize: 26,
			fontWeight: 'bold'
		},
		message: 'Upload To Facebook...',
		style: style,
		top: 10,
		left: 10,
		height: Titanium.UI.SIZE,
		width: Titanium.UI.SIZE
	});

$.mainWindow.add(activityIndicator);

// Function's

function shareOnFb(e, dataPost) {
	activityIndicator.show();
	
	fb.requestWithGraphPath('me/photos', dataPost, 'POST', function(e) {
		if(e.success) {
			alert("Success!  From FB: " + e.result);
			activityIndicator.hide();
		} else {
			activityIndicator.hide();
			if(e.error) {
				alert(e.error);
			} else {
				alert("Unknown result");
			}
		}
	});
}


function doClick(e) {
	console.log("OS " + osname + " " + version + " Screen Size: " + height + " x " + width);
	Titanium.Media.showCamera({
		success: function(event) {

			console.log(event.media);
			picName = event.media.file.name;
			picW = event.media.width;
			picH = event.media.height;
			picSize = Math.round((event.media.length / 1024) * 100) / 100;

			$.picTitle.text = picName + " [ " + picW + "x" + picH + " ] Size: " + picSize + " KB";

			$.image.setImage(event.media);

			$.shareButtonsContainer.add(fbbutton);

			if(fb.loggedIn) {
				$.messagePost.visible = true;
				$.shareButtonsContainer.add(shareFbButton);
			}

			shareFbButton.addEventListener('click', function(e) {
				var data = {
					message: $.messagePost.getValue(),
					picture: event.media
				};


				// Validation for empty message
				//
				shareOnFb(e, data);
			});
		},
		cancel: function(event) {
			console.log("Camera Cancelled");
		},
		error: function(event) {
			console.log("Camera Open Error!");
		},
		saveToPhotogallery: true,
		showControls: true,
		allowEditing: true
	});
}

$.mainWindow.open();