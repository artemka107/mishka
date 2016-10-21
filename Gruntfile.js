module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    less: {
      style: {
        files: {
          "build/css/style.css": "src/less/style.less"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers: [
              "last 1 version",
              "last 2 Chrome versions",
              "last 2 Firefox versions",
              "last 2 Opera versions",
              "last 2 Edge versions",
              "IE 11"
            ]}),
            require("css-mqpacker")({
              sort: true
            })
          ]
        },
        src: "build/css/style.css"
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["src/*.html"],
        tasks: ["copy:html"]
      },
      style: {
        files: ["src/less/**/*.less"],
        tasks: ["less", "postcss", "csso"],
        options: {
          spawn: false
        }
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style-min.css" : ["build/css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif}"]
        }]
      }
    },

    svgstore: {
      options: {
        svg: {
          style: "display: none"
        }
      },
      symbols: {
        files: {
          "build/img/symbols.svg" : ["build/img/icons/*.svg"]
        }
      }
    },

    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: ["build/img/icons/*.svg"]
        }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "src",
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      },
      html: {
        files: [{
          expand: true,
          cwd: "src",
          src: ["*.html"],
          dest: "build"
       }]
      }
    },

    clean: {
      build: ["build"]
    },

    uglify: {
      my_target: {
        files: [{
          expand: true,
          cwd: "src/js",
          src: ["*.js", "!*.-min.js"],
          dest: "build/js/",
          ext: "-min.js"
        }]
      }
    },

    "gh-pages": {
      options: {
        // какую папку считать результатом работы
        base: "build"
      },
      src: "**/*"
    },
  });

  grunt.registerTask("symbols", ["svgmin", "svgstore"]);
  grunt.registerTask("serve", ["browserSync", "watch"]);

  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
    "csso",
    "uglify",
    "symbols",
    "imagemin",
  ]);
};
