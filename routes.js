
const Handular = (req,res)=>  {    
  if  (req.url == "/") { 
    res.write( `<html> <head><title>AhmadNodeJs</title></head> <body><form action="/msg" method="POST"><input name="msg" type="text"> <button onclick="submit" >Send </button></form></body> </html>`)
    return res.end() ; 
    }
  
  
    if(req.url == `/msg` && req.method == 'POST' ) {
      res.write( "<html> <head><title>AhmadNodeJs</title></head> <body><h1>Hello Worled Form Node Js </h1></body> </html>")
      const body = [] ; 

      req.on('data' , (chunk)=> {
        body.push(chunk) ;
      })
  
      req.on('end', ()=> { 
        let ele =Buffer.concat(body).toString() ; 
        let lastele = ele.split("=")[1]; 
        console.log ( "Msg=  " , lastele ) ; 
      })
      res.statusCode = 302 ; 
      res.setHeader('Location', '/') ; 
      return res.end(); 
    }
    res.setHeader ('Content-Type' , 'text/html') ;
    res.write(`<html> <head><title>AhmadNodeJs</title></head> <body> <h1>Hello To NodeJs</h1></body> </html>`)
    res.end();

}

module.exports= Handular ;