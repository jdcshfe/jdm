/**
 * Created by willhu on 15/9/11.
 */
'use strict';


var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var fs = require('fs');


var jdmGenerator = yeoman.generators.Base.extend({
    // 用户输入部分
    prompting: function() {
        var done = this.async();
        this.log(yosay('Welcome to JDM!'));
        this.prompt(
            [{
                type:       'input',
                name:       'appName',
                message:    'What\' your app name?'
            },
            /*{
                type:       'confirm',
                name:       'addJdMpbo',
                message:    'Would you like to include jdMobi?',
                default:    true
            }*/],
            function(answers) {
                this.appName = answers.appName;
                done();
            }.bind(this));

    },
    // 复制配置文件
    configuring: function() {
        var context = {
            appName: this.appName
        };
        this.template('package.json', 'package.json', context);
        this.copy('gulpfile.js', 'gulpfile.js');
        this.copy('.jshintrc', '.jshintrc');
        this.copy('.gitignore', '.gitignore');
    },
    // npm bower install
    install: function() {
        var done = this.async();
        this.npmInstall(['mkdirp','yosay','fs'], {'saveDev': true});
        this.installDependencies({
            bower: false,
            npm: true,
            callback: function () {
                console.log('NPM install ready!');
                done();
            }
        });
    },
    // 创建文件夹
    createFolders: function() {
        mkdirp('src');
        mkdirp('src/scss');
        mkdirp('src/css');
        mkdirp('src/img');
        mkdirp('src/img/sprite');
        mkdirp('src/js');
        mkdirp('src/js/lib');
        mkdirp('src/html');
        mkdirp('src/component');
        mkdirp('tasks');
        mkdirp('dist');
    },
    // 写文件
    writing: function() {
        var _self = this;
        var tasksPath = this.sourceRoot() + '/tasks/';
        function dir(ff) {
            fs.readdir(ff, function(err, files) {
                if (err) {
                    console.log('err');
                    return;
                };

                files.forEach(function(file) {
                    fs.stat(ff + file, function(err, stat) {
                        if(err) {
                            console.log('readdir error');
                            return;
                        }
                        if (stat.isDirectory()) {
                            dir(ff+file);
                        } else {
                            var item = 'tasks/' + file;
                            _self.copy(item, item);
                        }
                    })
                })
            })
        }
        dir(tasksPath);
    },
    // 解决冲突
    conflicts: function() {

    },
    // end
    end: function() {
        this.log(yosay('jdm install complete, '+ '\n' +' you can beign ' + this.appName + ' project!'));
    }

});

module.exports = jdmGenerator;