var Botkit = require('botkit')

var accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN

var verifyToken = process.env.FACEBOOK_VERIFY

var port = process.env.PORT

if(!accessToken) throw new Error('FACEBOOK_PAGE_ACCESS_TOKEN is required but missing!')
if(!verifyToken) throw new Error('FACEBOOK_VERIFY is required but missing!')
if(!port) throw new Error('PORT is required but missing!')

var controller = Botkit.facebookbot({
    access_token: accessToken,
    verify_token: verifyToken
})

var bot = controller.spawn()

controller.setupWebserver(port,function (err,webserver){
  if(err) return console.log(err)
  controller.createWebhookEndpoints(webserver,bot,function(){
    console.log('Ready Player 1')
  })
})
controller.hears(['hello','hi'], 'message_received', function (bot, message){
  bot.reply(message,'Hello!')
  bot.reply(message,'I want to show you some mobile phones')
  bot.reply(message,{
    attachment:{
      type: 'template',
      payload:{
        template_type: 'button',
        text:'Which Device do you prefer?',
        buttons:[
          {
            type:'postback',
            title:'iPhone',
            payload:'show_iphone'
          },
          {
            type:'postback',
            title:'Xiaomi Mi4',
            payload:'show_Mi4'
          }
        ]
      }
    }
  })
})
controller.on('facebook_postback', function(bot,message){
  switch (message.payload) {
    case show_iphone:
      bot.reply(message,{
        attachment:{
          type:'image',
          payload: {
            url:'https://media.giphy.com/media/3oEdv4vLE53soPC8i4/giphy.gif'
          }
        }
      })
      break
      case show_Mi4:
        bot.reply(message,{
          attachment:{
            type:'image',
            payload: {
              url:'https://media.giphy.com/media/uwwA9ygPpO6WY/giphy.gif'
            }
          }
        })
      break
  }
})
