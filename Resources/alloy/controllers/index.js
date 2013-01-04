function Controller() {
    function doClick(e) {
        console.log("OS " + osname + " " + version + " Screen Size: " + height + " x " + width);
        Titanium.Media.showCamera({
            success: function(event) {
                console.log("Media File: " + event.media);
                $.picTitle.text = event.media;
                $.image.image = event.media;
                $.mainWindow.add(fbbutton);
            },
            cancel: function(event) {
                console.log("Camera Cancelled");
            },
            error: function(event) {
                console.log("Camera Open Error!");
            },
            saveToPhotogallery: !0,
            showControls: !0,
            allowEditing: !0
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.mainWindow = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "mainWindow"
    }), "Window", null);
    $.addTopLevelView($.__views.mainWindow);
    $.__views.button = A$(Ti.UI.createButton({
        title: "Shoot!",
        id: "button",
        width: "100",
        top: "10",
        height: "50"
    }), "Button", $.__views.mainWindow);
    $.__views.mainWindow.add($.__views.button);
    doClick ? $.__views.button.on("click", doClick) : __defers["$.__views.button!click!doClick"] = !0;
    $.__views.picTitle = A$(Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "picTitle"
    }), "Label", $.__views.mainWindow);
    $.__views.mainWindow.add($.__views.picTitle);
    $.__views.image = A$(Ti.UI.createImageView({
        id: "image",
        width: "90%",
        height: "80%"
    }), "ImageView", $.__views.mainWindow);
    $.__views.mainWindow.add($.__views.image);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var osname = "android", version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth, fbbutton = Titanium.Facebook.createLoginButton({
        style: Ti.Facebook.BUTTON_STYLE_WIDE
    });
    Ti.Facebook.appid = 185299698279540;
    Ti.Facebook.permissions = [ "publish_stream" ];
    Ti.Facebook.addEventListener("logout", function(e) {
        alert("Logged out");
    });
    Ti.Facebook.logout();
    Ti.Facebook.addEventListener("login", function(e) {
        e.success ? alert("Logged In") : e.error ? alert(e.error) : e.cancelled && alert("Canceled");
    });
    $.mainWindow.open();
    __defers["$.__views.button!click!doClick"] && $.__views.button.on("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;