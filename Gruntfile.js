module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    watch: {
      unit: {
        files: [
          "index.js", "lib/*.js", "lib/knockout-view-transition/*.js",
          "spec/**/*.js"
        ],
        tasks: ["jasmine_node"]
      },

      acceptance: {
        files: [
          "index.js", "lib/*.js", "lib/knockout-view-transition/*.js",
          "spec/**/*.js", "features/*.feature", "features/step_definitions/*.js"
        ],
        tasks: ["cucumberjs"]
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

  grunt.registerTask("default", ["unit"]);
  grunt.registerTask("unit", ["watch:unit"]);
  grunt.registerTask("acceptance", ["watch:acceptance"]);
  grunt.registerTask("test", ["jasmine_node", "cucumberjs"]);
};