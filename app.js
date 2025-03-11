
const express = require('express') ;

const bodyParser = require('body-parser');
const app = express()  ;

const path = require('path') ; 

app.use(bodyParser.urlencoded({extended:false})); 
app.use(express.static(path.join(__dirname, 'public')));

const Controller = require('./controllers/AppController');


app.set("views","views") ; 
app.set("view engine" , "ejs"); 



app.get("/" , Controller.ShowAll)

app.get("/AddTask" , Controller.AddTask)
app.post("/PostAddTask" , Controller.AddTaskPost );

// app.get("/show" , Controller.Show)

app.get("/show/:TaskId" , Controller.Show)

// app.get("/EditeTask" , Controller.EditeTask)


app.post('/EditeTask/EditeTaskPost', Controller.EditeTaskPost);

app.post("/Delete",Controller.Delete);

app.get("/Done" , Controller.Done)
app.get("/DontDone" , Controller.DontDone)

app.get('/EditeTask/:TaskId', Controller.EditeTask);






app.get(Controller.Error );



// app.use((req , res))
app.listen(3000)
