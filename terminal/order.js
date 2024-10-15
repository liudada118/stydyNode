const fs = require('fs')
const path = require('path')
const args = process.argv.splice(2)
var command = args.shift()
var taskDescription = args.join(' ')
var file = path.join(process.cwd())

switch (command){
    case 'add' : 
        addTask(file , taskDescription)
        break
    case 'list' :
        listTask(file , taskDescription)
        break
    default:
        console.log('Usage: ' + process.argv[0] + ' list|add [taskDescription]')
}

function loadOrInitializeTaskArray(flie , cb){
    fs.existsSync(file, function(existsSync){
        var tasks = []

        console.log(existsSync , 'existsSync')
        if(existsSync){
            fs.readFile(flie , 'utf8' , function(err, data){
                if(err) throw err
                var data = data.toString()
                var tasks = JSON.parse(data || '[]')
                cb(tasks)
            })
        }else{
            cb([])
        }
    })
}

function listTask(){
    loadOrInitializeTaskArray(file , function(){
        for(var i in tasks){
            console.log(tasks[i])
        }
    })
}

function storeTasks(file , tasks){
    fs.writeFile(file , JSON.stringify(tasks) , 'utf8' , function(err){
        if(err) throw err
        console.log('saved.')
    })
}

function addTask(file , taskDescription){
    console.log(file , taskDescription)
    loadOrInitializeTaskArray(file , function(tasks){
        tasks.push(taskDescription)
        storeTasks(file , tasks)
    })
}