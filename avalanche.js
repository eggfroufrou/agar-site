//============================================================================================================================
//                                                            TEST.JS
// matter.js 
// responsive
//============================================================================================================================
// globals
const sectionTag = document.querySelector("section.shapes")
const w = window.innerWidth
const h = window.innerHeight
var mqls = []; // make media query array

//==============================================================
//screenResonsive(width, height)  updates height and width  variable 
//==============================================================
function screenResonsive(width, height) {
    const h = window.innerHeight;
    const w = window.innerWidth;

    return Math.round(width/100 * window.innerWidth),Math.round(height/100 * window.innerHeight);
}

// ============================================
// screenState()  add listener to all media queries screen size
// ============================================
function screenState(x) {
    console.log("responsive ")
    for (var i=0; i<mqls.length; i++){ // loop through queries
        mediaQResponse(mqls[i]) // call handler function explicitly at run time
        mqls[i].addListener( mediaQResponse) // call handler function whenever the media query is triggered
    }

 }

// ============================================
// mediaQResponse()  respond t0 media query matchs
// ============================================
function mediaQResponse(){
    if (mqls[0].matches){ // do something when width: 860px media query matches
        document.body.style.backgroundColor = "#cc99ff"
    }
    if (mqls[1].matches){ // do something when width: 600px media query matches
        document.body.style.backgroundColor = "#e6ccff"
    }
    if (mqls[2].matches){ // do something when height: 500px media query matches
        document.body.style.backgroundColor = "y#f2e6ff"
    }
}  

// ============================================
// ResponsiveSetup() continously call screenResonssive() | populate media query array | add listener to window size
// ============================================
function ResponsiveSetup(){
    setInterval(()=>{
        screenResonsive(w, h)
    },1000)

    mqls = [ 
        window.matchMedia("(max-width: 860px)"),
        window.matchMedia("(max-width: 600px)"),
        window.matchMedia("(max-height: 200px)")
    ]

    var x = window.matchMedia("(max-width: 700px)")
    screenState(mqls) // Call listener function at run time
    x.addListener(screenState) // Attach listener function on state changes
}

// ============================================
// myRenderer class()
// constructor set variables render, engine
// object method
// mouse method
// ============================================
class myRenderer {
    constructor(){
            Matter.use(
                'matter-wrap'
            );

        const Runner = Matter.Runner, Common = Matter.Common;
        this.Composite = Matter.Composite,
        this.Render = Matter.Render;
        this.MouseConstraint = Matter.MouseConstraint;
        this.Mouse = Matter.Mouse;
        this.Engine = Matter.Engine;
        this.World = Matter.World;
        this.Composites = Matter.Composites;
        this.Bodies = Matter.Bodies;
        this.stack;
        this.engine = this.Engine.create();  // second engine
        this.world = this.engine.world; //second world???

        this.render = this.Render.create({ 
            element: sectionTag,
            engine: this.engine,
            options: {
            height: h,
            width: w,
            background: "rgba(255, 255, 255, 0)",
            wireframes: false,
            pixelRatio: window.devicePixelRatio
          }
        })

        this.Render.run(this.render);

        // create runner
        var runner = Runner.create();
        Runner.run(runner, this.engine);

    }
    
    objects(){
            let _bodies = this.Bodies;
            let _world = this.world;
            let World = this.World;
            let stack = this.stack

            // the falling objects are this stack
            stack = this.Composites.stack(-350, -20, 10, 2, 0, 0, function(x, y) { // this is spacing function (x,y, colomn, row, ?,?)
                return _bodies.circle(x, y, 5, { 
                    friction: .0021, 
                    restitution: 0.5, 
                    density: 0.001,
                    render: {
                        sprite: {
                        texture: "assets/@.png",
                        // fillStyle: 'white',
                        strokeStyle: 'black',
                        xScale: 1.,
                        yScale: 1.
                        }
                    } 
                    });
            });

        World.add(_world, stack); // add falling objects to world

        // add the three rectangles into world
        World.add(_world, [
            _bodies.rectangle(-260, 100, w-500, 100, { // first angled body
             isStatic: true, angle: Math.PI * .06,
             render: {
                sprite: {
                texture: "assets/Utility.png",
                xScale: 0.5,
                yScale: 0.5
                }
            } 
            }),
            _bodies.rectangle(400, 350, 700, 100, { // second angled body
             isStatic: true, angle: -Math.PI * 0.06,
             render: {
                sprite: {
                texture: "assets/digitalfirst.png",
                xScale: 0.5,
                yScale: 0.5
                }
            } 
         }),
            _bodies.rectangle(0, h-30, w, 100, {  // bottom site rectangle body
                isStatic: true, 
                 render: {
                     fillStyle: 'WHITE',
                     
                 }
            })
        ]);

        let render = this.render
        for (var i = 0; i < stack.bodies.length; i += 1) {
            stack.bodies[i].plugin.wrap = {
                min: { x: render.bounds.min.x, y: render.bounds.min.y },
                max: { x: render.bounds.max.x, y: render.bounds.max.y }
            };
        }
        
        this.Engine.run(this.engine) // run the engine
        this.Render.lookAt(this.render, this.Composite.allBodies(this.world)); // fit the render viewport to the scene
    }
    
    mouseCtrl(){    // add mouse control
        var mouse = this.Mouse.create(this.render.canvas),
            mouseConstraint = this.MouseConstraint.create(this.engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        this.World.add(this.world, mouseConstraint);
        this.render.mouse = mouse; // keep the mouse in sync with rendering
    }
}
    
// ============================================
// loader() delay hides div
// ============================================
function loader(){
    // document.getElementById("loader").removeClass('hide')
    setTimeout(()=>{
        document.getElementById("loader").classList.remove('hide')
    },500)
        
}

// ============================================
// main()  sets up first calls
// ============================================
function main(){
    let rend = new myRenderer()
    rend.objects()
    rend.mouseCtrl()
    setTimeout(loader(),100)
    ResponsiveSetup()
}

main()
