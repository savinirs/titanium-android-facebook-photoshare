function Controller() {
    function shareOnFb(e, dataPost) {
        activityIndicator.show();
        fb.requestWithGraphPath("me/photos", dataPost, "POST", function(e) {
            if (e.success) {
                alert("Success!  From FB: " + e.result);
                activityIndicator.hide();
            } else {
                activityIndicator.hide();
                e.error ? alert(e.error) : alert("Unknown result");
            }
        });
    }
    function doClick() {
        console.log("OS " + osname + " " + version + " Screen Size: " + height + " x " + width);
        Titanium.Media.showCamera({
            success: function(event) {
                console.log(event.media);
                picName = event.media.file.name;
                picW = event.media.width;
                picH = event.media.height;
                picSize = Math.round(100 * (event.media.length / 1024)) / 100;
                $.picTitle.text = picName + " [ " + picW + "x" + picH + " ] Size: " + picSize + " KB";
                $.image.setImage(event.media);
                $.shareButtonsContainer.add(fbbutton);
                if (fb.loggedIn) {
                    $.messagePost.visible = true;
                    $.shareButtonsContainer.add(shareFbButton);
                }
                shareFbButton.addEventListener("click", function(e) {
                    var data = {
                        message: $.messagePost.getValue(),
                        picture: event.media
                    };
                    shareOnFb(e, data);
                });
            },
            cancel: function() {
                console.log("Camera Cancelled");
            },
            error: function() {
                console.log("Camera Open Error!");
            },
            saveToPhotogallery: true,
            showControls: true,
            allowEditing: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.mainWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "mainWindow"
    });
    $.__views.mainWindow && $.addTopLevelView($.__views.mainWindow);
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        width: "90%",
        height: "60%"
    });
    $.__views.mainWindow.add($.__views.image);
    $.__views.picTitle = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "picTitle"
    });
    $.__views.mainWindow.add($.__views.picTitle);
    $.__views.button = Ti.UI.createButton({
        title: "Capture!",
        id: "button",
        width: "100%",
        height: "60",
        top: "5"
    });
    $.__views.mainWindow.add($.__views.button);
    doClick ? $.__views.button.addEventListener("click", doClick) : __defers["$.__views.button!click!doClick"] = true;
    $.__views.controls = Ti.UI.createView({
        layout: "vertical",
        id: "controls",
        height: "40%"
    });
    $.__views.mainWindow.add($.__views.controls);
    $.__views.messagePost = Ti.UI.createTextArea({
        id: "messagePost",
        width: "100%",
        visible: "false",
        height: "40%"
    });
    $.__views.controls.add($.__views.messagePost);
    $.__views.shareButtonsContainer = Ti.UI.createView({
        layout: "horizontal",
        id: "shareButtonsContainer",
        height: "60%"
    });
    $.__views.controls.add($.__views.shareButtonsContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var fb = require("facebook");
    var osname = "android", version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
    var fbbutton = fb.createLoginButton({
        style: fb.BUTTON_STYLE_WIDE
    });
    var shareFbButton = Titanium.UI.createButton({
        title: "Share",
        height: 50,
        width: 100
    });
    fb.appid = 0xa88772b16474;
    fb.permissions = [ "publish_stream" ];
    fb.addEventListener("logout", function() {
        alert("Logged out");
        $.shareButtonsContainer.remove(shareFbButton);
        $.messagePost.visible = false;
    });
    fb.addEventListener("login", function(e) {
        if (e.success) {
            alert("Logged In");
            fb.loggedIn || $.shareButtonsContainer.add(shareFbButton);
        } else e.error ? alert(e.error) : e.cancelled && alert("Canceled");
    });
    var style = Titanium.UI.ActivityIndicatorStyle.DARK, activityIndicator = Titanium.UI.createActivityIndicator({
        color: "green",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 26,
            fontWeight: "bold"
        },
        message: "Upload To Facebook...",
        style: style,
        top: 10,
        left: 10,
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE
    });
    $.mainWindow.add(activityIndicator);
    $.mainWindow.open();
    __defers["$.__views.button!click!doClick"] && $.__views.button.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;