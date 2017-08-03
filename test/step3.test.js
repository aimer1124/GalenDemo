this.devices = {
    mobile: {
        deviceName: "mobile",
        size: "400x700"
    },
    tablet: {
        deviceName: "tablet",
        size: "600x800"
    },
    desktop: {
        deviceName: "desktop",
        size: "1024x768"
    }
};

this.home = $page("home", {
    content: "div#content"
});

forAll(devices, function (device) {
    test("Home page on ${deviceName}", function (device){
        var driver = createDriver("http://samples.galenframework.com/tutorial1/tutorial1.html",
            device.size,
            "chrome");
        var homepage = new home(driver);
        if (!homepage.content.exists()){
            console.log("Content element don't exist")
        }
        checkLayout(driver, "specs/home-page.gspec", [device.deviceName]);
        driver.close();
    });

});