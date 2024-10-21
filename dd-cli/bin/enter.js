#!/usr/bin/env node

const lib = require('./cli-lib')
const {program} = require('commander')
const Inquirer = require('inquirer')
const argv = require('process').argv

program.parse(process.argv)
const command = argv[2]

program.name("dd-cli").usage('<command> [option]').version('1.0.0')

//enter

const chalk = require("chalk");
console.log(`hello ${chalk.blue("world")}`);
console.log(chalk.blue.bgRed.bold("Hello world!"));
console.log(
  chalk.green(
    "I am a green line " +
      chalk.blue.underline.bold("with a blue substring") +
      " that becomes green again!"
  )
);

new Inquirer.prompt([
    {
      name: "vue",
      // 多选交互功能
      // 单选将这里修改为 list 即可
      type: "checkbox",
      message: "Check the features needed for your project:",
      choices: [
        {
          name: "Babel",
          checked: true,
        },
        {
          name: "TypeScript",
        },
        {
          name: "Progressive Web App (PWA) Support",
        },
        {
          name: "Router",
        },
      ],
    },
  ]).then((data) => {
    console.log(data);
  });
  

// if(command.startsWith('--') || command.startsWith('-')){
//     const globalOption = command.replace(/--|-/g , '')
//     if(globalOption == 'version' || globalOption == 'V'){
//         console.log('1.0.0')
//         return
//     }
// }

// const options = argv.slice(3)
// let [option , param] = options
// option = option.replace('--' , '')

// console.log(command, 'command')
// if(command){
//     if(lib[command]){
//         lib[command]({option , param})
//     }else{
//         console('无效的命令')
//     }
// }else{
//     console.log('请输入命令')
// }

// console.log(argv)

// console.log('cli test123')