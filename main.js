const { app, BrowserWindow, ipcMain} = require('electron')

var knex = require("knex")({
  client:"sqlite3",
  connection:{
    filename:"database.sqlite"
  }
});

console.log("test")

app.on("ready", () => {
  
  
  
  
  
  let mainWindow = new BrowserWindow({height:800, width: 800, show: true, webPreferences:{nodeIntegration:true}})
  
  // note need to set web preferences to node integration true (as above) to allow use of things like require in HTML
  mainWindow.loadURL ("file:///"+__dirname+"/test.html"); //Entry point
  
  mainWindow.once('ready-to-show', () => {mainWindow.show()})
  ipcMain.on("mainWindowLoaded", function(){
  let result = knex.select("Name").from("Users")
  result.then(function(rows){
  mainWindow.webContents.send("resultSent", rows);
    })
  })
  ipcMain.on("FormSubmitted",function(){
  let result=knex.select("Name","Password").from("Users")
  result.then(function(rows){
    mainWindow.webContents.send("Newresults",rows)
  })
  })
 
  ipcMain.on("User_Logon", (event, val) => {  //Important, val is the variable in which any variables pased from the renderer are captured - here the username (stored as fname)
    console.log("Event and Val afterwards")
    console.log(event)
    console.log(val)
    name=val
    console.log(val)
    console.log(val)
    console.log("TEsting from main >>>>>")
    let result1 = knex.select("Name","Password").from("Users") //wher name johhn etcs
    console.log("<<<<< result1 Password>>>>>")
    console.log(result1[1])
    console.log("<<<< fname")
    mainWindow.loadURL ("file:///"+__dirname+"/index.html"); 
     mainWindow.once('ready-to-show', () => {mainWindow.show()})
     
      })
     ipcMain.on("Logon_loaded", function(){
      console.log("Testing inside Logon loaded")
      console.log(name)
      
      
     let result = knex.select("list1_1","list1_2","list1_3","list1_4","list1_5","list1_6","List2_1","List2_2", "List2_3", "List2_4", "List2_5", "List2_6", "List3_1", "List3_2", "List3_3", "List3_4", "List3_5", "List3_6","List4_1","List4_2","List4_3","List4_4").from("Users").where("Name", name); //replace latter with fname variable somehow
     // let result=knex.select("Name","Password").from("Users")  <-- this simple statement DOES work but removed for developement
     result.then(function(rows){
      mainWindow.webContents.send("Fname", rows);
    })
    ipcMain.on("Remove_list",(event,val)=>{
      console.log("in REMOVE LIST")
      let result1 = knex.select('*').from("Users").where("Name", name)
      result1.update(val,"")
      .then(() => console.log(val + "cleared"))
      mainWindow.loadURL ("file:///"+__dirname+"/index.html"); //reload the file to apply changes
      mainWindow.once('ready-to-show', () => {mainWindow.show()})
      let result = knex.select("list1_1","list1_2","list1_3","list1_4","list1_5","list1_6","list2_1","list2_2", "list2_3", "list2_4", "list2_5", "list2_6", "list3_1", "list3_2", "list3_3", "list3_4", "list3_5", "list3_6","list4_1","list4_2","list4_3","list4_4").from("Users").where("Name", name); //replace latter with fname variable somehow
     // let result=knex.select("Name","Password").from("Users")  <-- this simple statement DOES work but removed for developement
     result.then(function(rows){
      mainWindow.webContents.send("Fname", rows);
    })
  })
    ipcMain.on("New_List",(event,args)=>{
      var val=args[0]
      var col=args[1]
       
      let result1 = knex.select('*').from("Users").where("Name", name)
       result1.update(col,val)
      .then(() => console.log("result1 " + result1[0]));
      mainWindow.loadURL ("file:///"+__dirname+"/index.html"); //reload the file to apply changes
      mainWindow.once('ready-to-show', () => {mainWindow.show()})
      let result = knex.select("list1_1","list1_2","list1_3","list1_4","list1_5","list1_6","list2_1","list2_2", "list2_3", "list2_4", "list2_5", "list2_6", "list3_1", "list3_2", "list3_3", "list3_4", "list3_5", "list3_6","list4_1","list4_2","list4_3","list4_4").from("Users").where("Name", name); //replace latter with fname variable somehow
     // let result=knex.select("Name","Password").from("Users")  <-- this simple statement DOES work but removed for developement
     result.then(function(rows){
      mainWindow.webContents.send("Fname", rows);
    })
    
    ipcMain.on("Item_deleted",(event,val)=>{
     

      console.log("in delete")
      console.log(val)
      let result = knex.select(val).from("Users").where("Name", name); //THIS LINE IS WORKING can add result.del() and wil remove
      const newName ={Name:'Trump'}
      knex('Users').insert(newName)
      .then(()=>console.log("insterted"))
      let result2=knex.select("*").from("Users").where("Name","test");
      console.log(result2[0])
      result2.del()
      let result3=knex.select("Name","Password").from("Users")
      console.log(result3)
      console.log(result3[0])
      result.then(function(rows){
      console.log(rows)
      
      })
      
     
  
})
})
  
     })
    })

app.on("window-all-closed", () => {app.quit()})
