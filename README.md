# GalenDemo

- 如何使用Galen进行`响应式测试`
- 使用Javascript编写测试代码
- [https://github.com/aimer1124/GalenDemo](https://github.com/aimer1124/GalenDemo)

## 安装Galen

### 通过NPM安装

```
sudo npm install -g galenframework-cli
```

### 检查安装版本`galen -v`

```
➜  GalenDemo git:(master) ✗ galen -v
Galen Framework
Version: 2.3.4
JavaScript executor: Rhino 1.7 release 5 2015 01 29

```

## 第一步

### 创建测试文件，存放于`test/step1.test.js`

```
test("First test", function () {
    console.log('This is first test')
});
```

### 执行测试

```
➜  GalenDemo git:(master) ✗ galen test  test/*.js
========================================
Test: First test
========================================
This is first test

========================================
----------------------------------------
========================================
Suite status: PASS
Total tests: 1
Total failed tests: 0
Total failures: 0

```

## 第二步

## 添加多个不同的设备，用于测试兼容性

```
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
```

### 查看测试结果

```
➜  GalenDemo git:(master) ✗ galen test test/*.js
========================================
Test: Home page on mobile
========================================
Starting ChromeDriver 2.31.488774 (7e15618d1bf16df8bf0ecf2914ed1964a387ba0b) on port 10344
Only local connections are allowed.
Aug 01, 2017 2:34:11 PM org.openqa.selenium.remote.ProtocolHandshake createSession
INFO: Detected dialect: OSS
400x700
========================================
Test: Home page on tablet
========================================
Starting ChromeDriver 2.31.488774 (7e15618d1bf16df8bf0ecf2914ed1964a387ba0b) on port 6454
Only local connections are allowed.
Aug 01, 2017 2:34:17 PM org.openqa.selenium.remote.ProtocolHandshake createSession
INFO: Detected dialect: OSS
600x800
========================================
Test: Home page on desktop
========================================
Starting ChromeDriver 2.31.488774 (7e15618d1bf16df8bf0ecf2914ed1964a387ba0b) on port 42862
Only local connections are allowed.
Aug 01, 2017 2:34:23 PM org.openqa.selenium.remote.ProtocolHandshake createSession
INFO: Detected dialect: OSS
1024x768

========================================
----------------------------------------
========================================
Suite status: PASS
Total tests: 3
Total failed tests: 0
Total failures: 0

```

## 第三步 引入`gspec`文件，来难页面布局

### 新增`specs/home-page.gspec`

```
@objects
    header              id      header

= Main section =
    header:
        height 5 to 100px
```

### 在测试脚本`step3.test.js`中添加Layout检查 

```
    test("Home page on ${deviceName}", function (device){
        var driver = createDriver("http://samples.galenframework.com/tutorial1/tutorial1.html",
            device.size,
            "chrome");
        checkLayout(driver, "GalenDemo/home-page.gspec", [device.deviceName]);
    });
```

### 添加关闭浏览器

```
driver.close();
```

### 添加页面`pageObject`


- 新增`pageObject`

```
this.home = $page("home", {
    content: "div#content"
});
```

- 测试中引用`pageObject`

```
        var homepage = new home(driver);
        if (!homepage.content.exists()){
            console.log("Content element don't exist")
        }

```

## 第四步 不同分辨率下Layout测试及生成测试报告

### 不同分辨率测试

- 重新调整设备配制信息

```
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
```

- 修改`layout`测试中的设备`辨别和测试`

```
    @on *
        header:
            height 5 to 100px

    @on tablet
        content:
            width 600px

    @on desktop
        content:
            width 1024px
```


### 生成测试报告

```
➜  GalenDemo git:(master) ✗ galen test test/step3.test.js --htmlreport ./report
========================================
Test: Home page on mobile
========================================
Starting ChromeDriver 2.31.488774 (7e15618d1bf16df8bf0ecf2914ed1964a387ba0b) on port 36316
Only local connections are allowed.
Aug 03, 2017 2:56:04 PM org.openqa.selenium.remote.ProtocolHandshake createSession
INFO: Detected dialect: OSS
= Main section =
    header:
        height 5 to 100px

========================================
Test: Home page on tablet
========================================
Starting ChromeDriver 2.31.488774 (7e15618d1bf16df8bf0ecf2914ed1964a387ba0b) on port 28325
Only local connections are allowed.
Aug 03, 2017 2:56:07 PM org.openqa.selenium.remote.ProtocolHandshake createSession
INFO: Detected dialect: OSS
= Main section =
    header:
        height 5 to 100px

    content:
        width 600px

========================================
Test: Home page on desktop
========================================
Starting ChromeDriver 2.31.488774 (7e15618d1bf16df8bf0ecf2914ed1964a387ba0b) on port 12177
Only local connections are allowed.
Aug 03, 2017 2:56:10 PM org.openqa.selenium.remote.ProtocolHandshake createSession
INFO: Detected dialect: OSS
= Main section =
    header:
        height 5 to 100px

    content:
        width 1024px


========================================
----------------------------------------
========================================
Suite status: PASS
Total tests: 3
Total failed tests: 0
Total failures: 0

```

- 从日志中可以查看到，每次在不同`设备`测试时`layout`代码已变更

```
Test: Home page on desktop
========================================
Starting ChromeDriver 2.31.488774 (7e15618d1bf16df8bf0ecf2914ed1964a387ba0b) on port 12177
Only local connections are allowed.
Aug 03, 2017 2:56:10 PM org.openqa.selenium.remote.ProtocolHandshake createSession
INFO: Detected dialect: OSS
= Main section =
    header:
        height 5 to 100px

    content:
        width 1024px


========================================
```

## 参考

- [http://galenframework.com/](http://galenframework.com/)
- [http://galenframework.com/docs/reference-javascript-tests-guide/](http://galenframework.com/docs/reference-javascript-tests-guide/)