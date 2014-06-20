module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    watch: {
      grunt: {
        files: ["Gruntfile.js"]
      },

      jasmine: {
        files: ["index.js", "lib/**/*.js", "spec/**/*.js", "features/*.features", "features/step_definitions/*.js"],
        tasks: ["jasmine_node", "cucumberjs"]
      }
    },

    jasmine_node: {
      options: {
        forceExit: true,
        match: ".",
        matchall: false,
        extensions: "js",
        specNameMatcher: "spec",
        jUnit: {
          report: true,
          savePath: "./build/reports/jasmine/",
          useDotNotation: true,
          consolidate: true
        }
      },
      all: ["spec/"]
    },

    cucumberjs: {
      src: 'features',
      options: {
        steps: "features/step_definitions"
      }
    }
  });

  require("matchdep").filterDev(["grunt-*", "!grunt-cli"]).forEach(grunt.loadNpmTasks);

  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("test", ["jasmine_node"]);
  grunt.registerTask("acceptance", ["cucumberjs"]);
};