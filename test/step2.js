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


forAll(devices, function (device) {
    test("Home page on ${deviceName}", function (device){
        var driver = createDriver("http://galenframework.com",
            device.size,
            "chrome");
        console.log(device.size)
    });
});