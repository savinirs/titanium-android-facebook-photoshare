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


function doClick(e) {
	console.log("OS " + osname + " " + version + " Screen Size: " + height + " x " + width);
	Titanium.Media.showCamera({
		success: function(event) {
			console.log(event);
			$.image.image = event.media;
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