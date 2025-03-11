const fs = require('fs');
const path = require('path');


const p = path.join(
  path.dirname(process.mainModule.filename),
  'Task.json'
);

const getTasksFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};



module.exports = class Task {
  constructor(id,subject , title , check ) { 
    this.id = id  ;
    this.title = title  ;
    this.subject = subject  ;
    this.check = check  ;
    }
    save() { 
      if (this.id == null ) {
      this.id = Math.random().toString();
      getTasksFromFile(Tasks => {
        Tasks.push(this);
        console.log ( "this = " , this.title ) ;
        console.log ( "array  = " , Tasks ) ; 
      fs.writeFile(p, JSON.stringify(Tasks), err => {
        console.log(err);
      });
    });
  }else {    
  getTasksFromFile(Tasks => {
    console.log ("this.id =  " , this) ; 
      const NewTask  = Tasks.filter((ele)=>ele.id!=this.id );
      NewTask.push(this) ;
      console.log ( "NewTaskk  = " , NewTask ) ; 

      fs.writeFile(p, JSON.stringify(NewTask), err => {
        console.log( "Error Is  =  ", err);
      });
    }); 
  }
    }


    static fetchAll(cb) {
      getTasksFromFile(cb);
    };



    static DeleteTask(Id, callback) {
      getTasksFromFile(cb => {
          let newArray = cb.filter((ele) => ele.id != Id);
          fs.writeFile(p, JSON.stringify(newArray), err => {
              if (err) {
                  return callback(err);
              }
              callback(null);
          });
      });
  }


  








}