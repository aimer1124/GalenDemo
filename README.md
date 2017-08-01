# GalenDemo

- 如何使用Galen进行`响应式测试`
- 使用Javascript编写测试代码


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

### 创建测试文件，存放于`test/step1.js`

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

## 第三步 引入gspec文件，来难页面布局

### 新增`specs/home-page.gspec`

```
@objects
    header              id      header

= Main section =
    header:
        height 5 to 100px
```

### 在测试脚本`step3.js`中添加Layout检查 

```
test("Home page on ${deviceName}", function (device){
        var driver = createDriver("http://samples.galenframework.com/tutorial1/tutorial1.html",
            device.size,
            "chrome");
        checkLayout(driver, "GalenDemo/home-page.gspec", [device.deviceName]);
    });
```