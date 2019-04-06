// where is matter being deployed
const sectionTag = document.querySelector("section.shapes")
const w = window.innerWidth
const h = window.innerHeight



//==============================================================
// Responsive
// updates viewport by percetange
// timer to call 
//==============================================================
function screenResonsive(width, height) {
    // console.log("responsive ")
    const h = window.innerHeight;
    const w = window.innerWidth;

    return Math.round(width/100 * window.innerWidth),Math.round(height/100 * window.innerHeight);
}

setInterval(()=>{
    screenResonsive(w, h)
},1000)




//============================================================================================================================
// screenState()
//
// updates viewport by percetange
// timer to call 
//============================================================================================================================

//// list of window.matchMedia() queries
var mqls = [ 
    window.matchMedia("(max-width: 860px)"),
    window.matchMedia("(max-width: 600px)"),
    window.matchMedia("(max-height: 200px)")
]



function screenState(x) {
     console.log("responsive ")
   // if (x.matches) { // If media query matches
   //   document.body.style.backgroundColor = "yellow";
   // } else {
   //  document.body.style.backgroundColor = "pink";
   // }



    // document.getElementById("content").innerHTML = mqls[0].matches // width: 860px media match?
    // document.getElementById("content").innerHTML = mqls[1].matches // width: 600px media match?
    // document.getElementById("content").innerHTML = mqls[2].matches // height: 500px media match?

    for (var i=0; i<mqls.length; i++){ // loop through queries
        mediaQResponse(mqls[i]) // call handler function explicitly at run time
        mqls[i].addListener( mediaQResponse) // call handler function whenever the media query is triggered
    }

 }


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

 var x = window.matchMedia("(max-width: 700px)")
 screenState(mqls) // Call listener function at run time
 x.addListener(screenState) // Attach listener function on state changes




Matter.use(
    'matter-wrap'
);

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create engine
const engine = Engine.create(),
    world = engine.world;

// create renderer
const render = Render.create({
    element: sectionTag,
    engine: engine,
    options: {
    height: h,
    width: w,
    background: "rgba(255, 255, 255, 0)",
    wireframes: false,
    pixelRatio: window.devicePixelRatio
  }
})

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var stack = Composites.stack(-350, -20, 10, 2, 0, 0, function(x, y) {
    return Bodies.circle(x, y, 5, { 
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

World.add(world, stack);

World.add(world, [
    Bodies.rectangle(-260, 100, w-500, 100, {
     isStatic: true, angle: Math.PI * .06,
     render: {
        sprite: {
        texture: "assets/Utility.png",
        xScale: 0.5,
        yScale: 0.5
        }
    } 
    }),
    Bodies.rectangle(400, 350, 700, 100, {
     isStatic: true, angle: -Math.PI * 0.06,
     render: {
        sprite: {
        texture: "assets/digitalfirst.png",
        xScale: 0.5,
        yScale: 0.5
        }
    } 
 }),
    Bodies.rectangle(0, h-30, w, 100, { 
        isStatic: true, 
         render: {
             fillStyle: 'WHITE',
             
         }
    })
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, Composite.allBodies(world));

// wrapping using matter-wrap plugin
for (var i = 0; i < stack.bodies.length; i += 1) {
    stack.bodies[i].plugin.wrap = {
        min: { x: render.bounds.min.x, y: render.bounds.min.y },
        max: { x: render.bounds.max.x, y: render.bounds.max.y }
    };
}

// run both the engine, and the renderer
Engine.run(engine)



// setTimeout(loader(),100)

function loader(){
    // document.getElementById("loader").removeClass('hide')
    setTimeout(()=>{
        document.getElementById("loader").classList.remove('hide')
    },500)
        
}


// ============================================
// loader()
// delay hides div
// ============================================
function loader(){
    // document.getElementById("loader").removeClass('hide')
    setTimeout(()=>{
        document.getElementById("loader").classList.remove('hide')
    },500)
        
}

// ============================================
// main()
// sets up first calls
// ============================================
function main(){
    setTimeout(loader(),100)
}


main()