function Controller() {
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
    $.__views.image = A$(Ti.UI.createImageView({
        id: "image",
        width: "90%",
        height: "80%"
    }), "ImageView", $.__views.mainWindow);
    $.__views.mainWindow.add($.__views.image);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var osname = "android", version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
    $.mainWindow.open();
    __defers["$.__views.button!click!doClick"] && $.__views.button.on("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;