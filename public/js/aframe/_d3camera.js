// fake data
var data = [10, 20, 30, 15, 25, 35, 40,
    45, 50, 70, 100, 120, 130,
    12, 18, 22, 29, 33, 44, 59, 200, 10];

// we scale the height of our bars using d3's linear scale
var height3d = 3;
var hscale = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, height3d])

function xz(i) {
    // lets place the bars all around our camera
    var radius = 5;
    var theta = i / data.length * 2 * Math.PI - 3 / 4 * Math.PI
    var x = radius * Math.cos(theta)
    var z = radius * Math.sin(theta)
    return {x: x, z: z}
}

var toDomain = d3.scale.linear()
    .domain([0, 1]).range(hscale.domain())

var camera = d3.select("#vehicle")
    .attr("position", "0 1 0")
    .attr("rotation", "0 45 0")

// 2d line
var height2d = 100;
var width2d = 300;

var yscale = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([height2d, 0])
var line = d3.svg.line()
    .x(function (d, i) {
        return width2d * i / data.length;
    })
    .y(function (d, i) {
        return yscale(d);
    })
    //.interpolate("basis")
    .interpolate("cardinal")

var svg = d3.select("svg#path2d")

svg.selectAll("rect.bar2d").data(data)
    .enter().append("rect").classed("bar2d", true)
    .attr({
        x: function (d, i) {
            return i / data.length * width2d - width2d / data.length / 4
        },
        y: function (d, i) {
            return yscale(d)
        },
        width: width2d / data.length / 2,
        height: function (d, i) {
            return height2d - yscale(d)
        },
        "fill-opacity": 0.1
    })
var path2d = svg.append("path").attr({
    d: line(data),
    fill: "none",
    stroke: "#111",
    "stroke-width": 3
})

var playHead = svg.append("line")
    .classed("play-head", true)
    .attr({
        stroke: "#f11",
        y1: 0,
        y2: height2d,
    })

var path = path2d.node()
var totalLength = path.getTotalLength();

var trackn2d = 200;
var track2ddata = d3.range(trackn2d).map(function (d, i) {
    var t = i / trackn2d;
    var p = path.getPointAtLength(t * totalLength)
    var x = p.x //t * width2d - width2d/trackn2d/4
    var y = 1 + height2d - p.y / height2d * height2d;

    return {x: x, y: y}
})
svg.selectAll("rect.track2d").data(track2ddata)
    .enter().append("rect").classed("track2d", true)
    .attr({
        x: function (d, i) {
            return d.x
        },
        y: function (d, i) {
            return height2d - d.y
        },
        width: width2d / trackn2d / 2,
        height: function (d, i) {
            return d.y
        },
        "fill-opacity": 0.3,
        fill: "blue"
    })

// we select the scene object just like an svg
var scene = d3.select("a-scene")

// visualize the camera tracks
var track = function (t) {
    //var y = 1.5 + hscale(data[Math.round(t * data.length)])
    var p2d = path.getPointAtLength(t * totalLength)
    var y = 1.3 + height3d - p2d.y / height2d * height3d;
    //console.log(t, t*totalLength, y)
    var tx = p2d.x / width2d
    var p = xz(tx * data.length);
    return {x: p.x, y: y, z: p.z}
}

var tracknum = 200;
var trackdata = d3.range(tracknum).map(function (i) {
    var p = track(i / tracknum)
    return p
})
var tracks = scene.selectAll("a-box.track").data(trackdata)
tracks.enter().append("a-box").classed("track", true)
tracks.attr({
    position: function (d, i) {
        return d.x + " " + d.y + " " + d.z
    },
    rotation: function (d, i) {
        var x = 0;
        var z = 0;
        var y = -(i / tracknum) * 360;
        return x + " " + y + " " + z
    },
    width: 0.05,
    height: 0.05,
    depth: 0.5,
    opacity: 0.1
})
////


d3.timer(function (elapsed) {

    dt = (elapsed * 0.0005 % 10) / 10;
    var p = track(dt);
    //var p = xz(dt*data.length)
    //var y = 1.5 + hscale(data[Math.floor(dt * data.length)])
    //var y = 1.5 + path.getPointAtLength(dt*totalLength).y/100;
    p.y += 0.5;

    var r = {
        x: 0,
        y: -dt * 360 - 45,
        z: 0
    }
    camera.attr({
        position: p.x + " " + p.y + " " + p.z,
        rotation: r.x + " " + r.y + " " + r.z
    })

    playHead.attr({
        x1: dt * 100,
        x2: dt * 100,
        y1: 0,
        y2: 100
    })
})


// we use d3's enter/update/exit pattern to draw and bind our dom elements
var bars = scene.selectAll("a-box.bar").data(data)
bars.enter().append("a-box").classed("bar", true)

// we set attributes on our cubes to determine how they are rendered
bars.attr({
    position: function (d, i) {
        var y = 1 + hscale(d) / 2;
        var p = xz(i);
        return p.x + " " + y + " " + p.z
    },
    rotation: function (d, i) {
        var x = 0;
        var z = 0;
        var y = -(i / data.length) * 360 - 45;
        return x + " " + y + " " + z
    },
    width: function (d) {
        return 0.5
    },
    depth: function (d) {
        return 0.9
    },
    height: function (d) {
        return hscale(d)
    },
    opacity: function (d, i) {
        return 0.6 + (i / data.length) * 0.4
    },
    //metalness: function(d,i) { return i/data.length}
})
    .on("click", function (d, i) {
        console.log("click", i, d)
    })
    .on("mouseenter", function (d, i) {
        // this event gets fired continuously as long as the cursor
        // is over the element. we only want trigger our animation the first time
        if (this.hovering) return;
        console.log("hover", i, d)
        this.hovering = true;
        d3.select(this).transition().duration(1000)
            .attr({
                metalness: 0.5,
                width: 2
            })
    })
    .on("mouseleave", function (d, i) {
        console.log("leave", i, d)
        this.hovering = false;
        d3.select(this).transition()
            .attr({
                metalness: 0,
                width: 0.5
            })
    })


var labels = scene.selectAll("a-entity.label").data(data)
labels.enter().append("a-entity").classed("label", true)
    .attr({
        text: function (d, i) {
            return "text: " + i
        },
        material: "color: #000",
        size: 3
    })
labels.attr({

    position: function (d, i) {
        // cubes are positioned by their center so we
        // offset for their height
        var y = 0.3;
        // lets place the bars all around our camera
        var radius = 5;
        var theta = i / data.length * 2 * Math.PI - 3 / 4 * Math.PI - 0.07
        var x = radius * Math.cos(theta)
        var z = radius * Math.sin(theta)
        return x + " " + y + " " + z
    },
    rotation: function (d, i) {
        var x = 0;
        var z = 0;
        var y = +45 - (i / data.length) * 360;
        return x + " " + y + " " + z
    },
})
