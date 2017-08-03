function Device(deviceName, size, tags) {
    this.deviceName = deviceName;
    this.size = size;
    this.tags = tags;
}

this.devices = {
    mobile:  new Device("mobile", "450x700", ["mobile"]),
    tablet:  new Device("tablet", "600x800", ["tablet"]),
    desktop: new Device("desktop", "1024x768", ["desktop"])
};

this.home = $page("home", {
    content: "div#content"
});

forAll(devices, function () {
    test("Home page on ${deviceName}", function (device){
        var driver = createDriver("http://samples.galenframework.com/tutorial1/tutorial1.html",
            device.size,
            "chrome");
        var homepage = new home(driver);
        if (!homepage.content.exists()){
            console.log("Content element don't exist")
        }
        checkLayout(driver, "specs/home-page.gspec", [device.tags]);
        driver.quit();
    });

});