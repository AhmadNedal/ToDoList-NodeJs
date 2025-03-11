
const path = require('path') ; 
const Task  = require('../model/mode');
const { render } = require('pug');

exports.Error= (req,res , next )=> {
  res.status(404).sendFile(path.join(__dirname, "../views" , "404.html")); 
  // res.status(404).send("Error html"); 
  
}

exports.AddTask = (req, res,next)=> {
  res.render("AddTask.ejs");
}

  exports.AddTaskPost = (req, res,next)=> {
  const title = req.body.title;
  const subject = req.body.subject;
  const check = req.body.check;
  const Obj = new Task(null , subject , title , check ) ;
  console.log ( "Object = " ,Obj ) ; 
  Obj.save () ; 
  res.render("AddTask.ejs");
}


  exports.ShowAll = (req,res,next)=> { 
    Task.fetchAll(cbbb=>{ 
    res.render( "ShowAll.ejs" ,{ Tasks : cbbb} );   
      
    })}


    exports.EditeTask = (req, res , next )=> {
      const TaskIdd = req.params.TaskId;
      Task.fetchAll(tasks=>{
        const TaskEdite = tasks.filter((ele)=>ele.id==TaskIdd) ; 
          console.log ("TaskEdite = " ,TaskEdite) ; 
        res.render("EditeTask.ejs", {TaskEdite:TaskEdite});
      })
    }


    exports.Show = (req, res , next )=> {
      const TaskIdd = req.params.TaskId;
      Task.fetchAll(tasks=>{
        const TaskEdite = tasks.filter((ele)=>ele.id==TaskIdd) ; 
        
        res.render("Show.ejs", {TaskEdite:TaskEdite});
      })
    }




    exports.EditeTaskPost = (req, res , next )=> {
      const title=req.body.title ; 
      const id=req.body.id ; 
      const subject=req.body.subject; 
      const check=req.body.check ;
      const Obj = new Task(id , subject,title,check) ;
      Obj.save () ;
      Task.fetchAll(cbbb=>{ 
        res.render( "ShowAll.ejs" ,{ Tasks : cbbb} )
      });   
          
    }


    exports.Delete = (req, res, next) => {
      let ID = req.body.IDD;
      Task.DeleteTask(ID, (err) => {
          if (err){
              return res.status(500).send("Error deleting task");
          }
          Task.fetchAll((cbbb) => {
              res.render("ShowAll", { Tasks: cbbb });
          });
      });
  };



  exports.Done= (req,res,next)=>{ 
      Task.fetchAll((cbbb) => {
        let newArray = cbbb.filter((ele)=>ele.check);
        res.render("ShowAll", { Tasks: newArray });
    });
  }


  exports.DontDone= (req,res,next)=>{ 
    Task.fetchAll((cbbb) => {
      let newArray = cbbb.filter((ele)=>!(ele.check));
      res.render("ShowAll", { Tasks: newArray });
  });
}

  



  