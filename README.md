# generator-jdm

> 一个基于gulp的前端自动化流程




## Install

```
$ npm install generator-jdm
```


## CLI

首先你要安装好yeoman

```
$ npm install yo -g
```
然后执行generator-jdm
 
```
$ npm install generator-jdm -g
```

然后执行 yo jdm  就会自动搭好脚手架并装好npm报了

```
$ yo jdm
```
<p>Yan Liping</p>

### 功能
```
$ gulp
```

      1. 编译 sass文件 (src目录下的 scss文件夹下的scss和component文件夹下的scss文件)
      2. 合并 生成的CSS文件
      3. 对JS文件 进行 jshint
      4. 开启browsersync，并监听css和js文件

```
$ gulp build
```

      1. 将img文件夹下的文件复制到dist目录
      2. 将html下的html文件复制到dist目录
      3. 将js和css文件按照规则合并压缩，复制到dist目录
      4. css和js生成版本
      5. 自动替换HTML中的引用css/js文件至最新版

```
$ gulp img
```

      1. 将src/img/sprite下的文件夹的png 拼接css sprite并输出sass文件(congif.js中配置是否输出@2x)
      2. 压缩所有image

```
$ gulp run
```

       执行 gulp default相同任务，除去监听和自动刷新
 
开发文件目录

```
|
+- src
|   +- css
|   +- scss
|   +- img
|       +- sprite
|   +- js
|       +- lib
|   +- component
|   - index.html
+- dist
|   +- css
|   +- img
|       +- sprite
|   +- js
|       +- lib
|   - index.html
```

## License

