/**
 *  Katut
 *
 *
 *  Author By Equan Pr.
 *  www.junwatu.com
 */

var osname = Ti.Platform.osname,
	version = Ti.Platform.version,
	height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;

var fbbutton = Titanium.Facebook.createLoginButton({
	style: Ti.Facebook.BUTTON_STYLE_WIDE
});

// APP ID
Ti.Facebook.appid = 185299698279540;
Ti.Facebook.permissions = ['publish_stream'];

Ti.Facebook.addEventListener('logout', function(e) {
	alert('Logged out');
});
Ti.Facebook.logout();

Ti.Facebook.addEventListener('login', function(e) {
	if(e.success) {
		alert('Logged In');
	} else if(e.error) {
		alert(e.error);
	} else if(e.cancelled) {
		alert("Canceled");
	}
});

function doClick(e) {
	console.log("OS " + osname + " " + version + " Screen Size: " + height + " x " + width);
	Titanium.Media.showCamera({
		success: function(event) {

			console.log("Media File: " + event.media);
			$.image.image = event.media;
			$.mainWindow.add(fbbutton);
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