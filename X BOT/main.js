const Discord = require('discord.js');
const { Client, Intents } = Discord;
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, /* другие интенты, которые вам нужны */] });
const prefix = '!'; 
client.on('ready', () =>{ 
    client.generateInvite("ADMINISTRATOR").then(invite => console.log(`Ссылка на добавление ${invite}`))
    console.log(`Привет! ${client.user.tag} запустился!`)
})
const commands = new Discord.Collection();
client.on('message', message => {
    if (message.author.bot) return;
  
    // Проверяем, начинается ли сообщение с префикса
    if (message.content.startsWith(prefix)) {
      // Разбиваем сообщение на команду и аргументы
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
  
      if (command === 'пинг') {
        // Вызываем функцию для показа задержки пинга
        showPing(message);
      }
  
      // Добавьте обработку других команд здесь
    }
  });
  
  // Функция для показа задержки пинга
  function showPing(message) {
    const startTime = Date.now();
    message.channel.send('Проверка пинга...').then(sentMessage => {
      const endTime = Date.now();
      const ping = endTime - startTime;
  
      const embed = new Discord.MessageEmbed()
        .setTitle('Задержка пинга')
        .setDescription(`Понг : ${ping} мс`)
        .setColor('RANDOM');
  
      sentMessage.edit(embed);
    });
  }
// Добавьте команды в коллекцию
commands.set('привет', {
  name: 'привет',
  description: 'Поздороваться с ботом.',
});
commands.set('пинг', {
    name: 'пинг',
    description: 'ПИНГ ПОНГ.',
  });

commands.set('пока', {
  name: 'пока',
  description: 'Попрощаться с ботом.',
});

commands.set('команды', {
  name: 'команды',
  description: 'Показать список всех команд.',
});

// Обработчик события 'message'
client.on('message', message => {
  if (message.author.bot) return;

  // Проверяем, начинается ли сообщение с префикса
  if (message.content.startsWith(prefix)) {
    // Разбиваем сообщение на команду и аргументы
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Проверяем, вызвана ли команда "команды"
    if (command === 'команды') {
      showCommands(message);
    }

    // Обрабатываем другие команды здесь
    else if (command === 'привет') {
      message.channel.send('Привет!');
    } else if (command === 'пока') {
      message.channel.send('Пока!');
    }
  }
});

// Функция для вывода списка всех команд
function showCommands(message) {
  let commandList = '';
  commands.forEach(command => {
    commandList += `**${prefix}${command.name}**: ${command.description}\n`;
  });

  const embed = new Discord.MessageEmbed()
    .setTitle('Список команд')
    .setDescription(commandList)
    .setColor('RANDOM');

  message.channel.send(embed);
}

client.on('message', message => {
    if (message.author.bot) return;
  
    if (message.content === '!55') {
      const embed = new Discord.MessageEmbed()
        .setTitle('Форма')
        .setDescription('Выберите, что вы хотите заполнить:')
        .addField('1️⃣ Возраст', 'Введите свой возраст.')
        .addField('2️⃣ Город', 'Введите название своего города.')
        .setColor('RANDOM');
  
      message.channel.send(embed).then(sentMessage => {
        sentMessage.react('1️⃣');
        sentMessage.react('2️⃣');
  
        const filter = (reaction, user) => {
          return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
  
        const collector = sentMessage.createReactionCollector(filter, { max: 1, time: 60000 });
  
        collector.on('collect', (reaction, user) => {
          sentMessage.delete();
  
          if (reaction.emoji.name === '1️⃣') {
            askForAge(message);
          } else if (reaction.emoji.name === '2️⃣') {
            askForCity(message);
          }
        });
  
        collector.on('end', collected => {
          if (collected.size === 0) {
            sentMessage.delete();
            message.channel.send('Время истекло. Пожалуйста, попробуйте снова.');
          }
        });
      });
    }
  });
  
  function askForAge(message) {
    message.channel.send('Введите свой возраст:');
  
    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });
  
    collector.on('collect', m => {
      const age = m.content;
      m.delete();
  
      const responseEmbed = new Discord.MessageEmbed()
        .setTitle('Форма')
        .setDescription(`Вы ввели возраст: ${age}`)
        .setColor('RANDOM');
  
      message.channel.send(responseEmbed);
    });
  
    collector.on('end', collected => {
      if (collected.size === 0) {
        message.channel.send('Время истекло. Пожалуйста, попробуйте снова.');
      }
    });
  }
  
  function askForCity(message) {
    message.channel.send('Введите название своего города:');
  
    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });
  
    collector.on('collect', m => {
      const city = m.content;
      m.delete();
  
      const responseEmbed = new Discord.MessageEmbed()
        .setTitle('Форма')
        .setDescription(`Вы ввели название города: ${city}`)
        .setColor('RANDOM');
  
      message.channel.send(responseEmbed);
    });
  
    collector.on('end', collected => {
      if (collected.size === 0) {
        message.channel.send('Время истекло. Пожалуйста, попробуйте снова.');
      }
    });
  }
client.on('message', message =>{
    if (message.author.bot) return; 
    if (message.content == '!0') { 
    let embed = new Discord.MessageEmbed() 
    .setTitle(message.author.username) 
    let status = ''
    switch (message.author.presence.status) { 
        case 'online':
            status = 'онлайн'; break; 
            case 'idle':
                status = ':orange_circle:нет на месте'; break;
                case 'offline':
                    status = 'нет в сети'; break;
                    case 'dnd':
                        status = ':red_circle:не беспокоить'; break;
    }
    embed.setDescription(`**Ваш дискорд айди: ${message.author.id}
    Ваш статус: ${status}
    Дата создания аккаунта: ${message.author.createdAt.toLocaleDateString()}
    Дата входа на сервер: ${message.member.joinedAt.toLocaleDateString()}
    **`) 
    .setColor('RANDOM') 
    .setThumbnail(message.author.avatarURL()) 
    message.channel.send(embed)    
    }
    
})
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content == '!5') {
        let embed = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .setDescription('ТЫ ГАНДОН !')
            .setColor('RANDOM')
            .setThumbnail(message.author.avatarURL());
        message.channel.send(embed);
    }
});
client.on('message', message => {
    if (message.author.bot) return;
  
    if (message.content.startsWith('!заполнить_бланк')) {
      // Получаем параметры из сообщения
      const args = message.content.slice('!заполнить_бланк'.length).trim().split(', ');
      const name = args[0];
      const age = args[1];
      const city = args[2];
  
      // Создаем ембед с заполненными данными
      const embed = new Discord.MessageEmbed()
        .setTitle('Бланк')
        .setDescription(`Имя: ${name}\nВозраст: ${age}\nГород: ${city}`)
        .setColor('RANDOM');
  
      // Отправляем ембед в тот же канал, где была вызвана команда
      message.channel.send(embed);
    }
  });
  client.on('message', message => {
    if (message.author.bot) return;
  
    if (message.content === '!форма') {
      // Создаем всплывающую форму
      const embed = new Discord.MessageEmbed()
        .setTitle('Форма')
        .setDescription('Пожалуйста, введите свое имя:')
        .setColor('RANDOM');
  
      // Отправляем всплывающую форму
      message.channel.send(embed).then(sentMessage => {
        // Добавляем кнопку "Отмена"
        sentMessage.react('❌');
  
        // Создаем коллектор, который будет отслеживать реакции
        const filter = (reaction, user) => {
          return ['❌'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
  
        const collector = sentMessage.createReactionCollector(filter, { max: 1, time: 60000 });
  
        // Обрабатываем событие, когда пользователь нажимает кнопку "Отмена"
        collector.on('collect', (reaction, user) => {
          sentMessage.delete();
          message.channel.send('Вы отменили заполнение формы.');
        });
  
        // Обрабатываем событие, когда время истекает
        collector.on('end', collected => {
          if (collected.size === 0) {
            sentMessage.delete();
            message.channel.send('Время истекло. Пожалуйста, попробуйте снова.');
          }
        });
  
        // Ждем ответа пользователя в течение 60 секунд
        message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 60000, errors: ['time'] })
          .then(collected => {
            const name = collected.first().content;
            sentMessage.delete();
  
            // Создаем новый ембед с введенными данными
            const responseEmbed = new Discord.MessageEmbed()
              .setTitle('Форма')
              .setDescription(`Вы ввели имя: ${name}`)
              .setColor('RANDOM');
  
            // Отправляем ответ
            message.channel.send(responseEmbed);
          })
          .catch(collected => {
            message.channel.send('Время истекло. Пожалуйста, попробуйте снова.');
            sentMessage.delete();
          });
      });
    }
  });

client.on('messageDelete', message => { 
    let embed = new Discord.MessageEmbed()
        .setTitle('Было удалено сообщение!')
        .setColor('RANDOM')
        .addField(`Удалённое сообщение:`, message.content, true)
        .addField("Автор:",`${message.author.tag} (${message.author})`,true)
        .addField("Канал:", `${message.channel}`, false)
        .setFooter(' - ') // Убрать ${message.author.avatarURL()}
        .setTimestamp(message.createdAt);
    client.channels.cache.get("1135916691709239407").send(embed);
});

client.on('guildMemberAdd', async member => {
  
    
    // Отправка сообщения в канал с логами
    let embed2 = new Discord.MessageEmbed()
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setTitle(`Пользователь вошел на сервер`)
        .addField('Пользователь:', member.user);
    client.channels.cache.get('1135916691709239407').send(embed2); // Айди вашего канала с логами
});

client.on('guildMemberRemove', member => {
    let embed = new Discord.MessageEmbed()
        .setThumbnail(member.user.avatarURL())
        .setTitle(`Пользователь покинул сервер`)
        .addField('Пользователь:', member.user);

    client.channels.cache.get('1135916691709239407').send(embed)
        .then(() => console.log(`Сообщение успешно отправлено в канал с логами.`))
        .catch(error => console.error(`Ошибка при отправке сообщения в канал с логами: ${error}`));
});


// var interval = setInterval(function () { change(); }, 90000  ); // время обновления в миллисекундах
const token = 'MTEzNjMxODA2MzEyNjUxOTk3OQ.GUuCaM.seRgSt5VjTrJkEUJ_GpQ69mS9BqXBfwZ4N6CiA';
client.login(token);

