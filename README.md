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