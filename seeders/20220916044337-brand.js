'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let brands=[
      {
        name:'{"tm":"Adidas","ru":"Adidas"}',
        description: '{"tm":"brand barada","ru":"brand barada"}',
        address: '{"tm":"mir3 55 dom 49 kw","ru":"mir3 55 dom 49 kw"}',
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"puma","ru":"puma"}',
        description: '{"tm":"brand barada","ru":"brand barada"}',
        address: '{"tm":"mir3 55 dom 49 kw","ru":"mir3 55 dom 49 kw"}',
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"redbul","ru":"redbul"}',
        description: '{"tm":"brand barada","ru":"brand barada"}',
        address: '{"tm":"mir3 55 dom 49 kw","ru":"mir3 55 dom 49 kw"}',
        active: 1,
        createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Colgate","ru":"Colgate"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Samsung","ru":"Samsung"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Apple","ru":"Apple"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Jacobs","ru":"Jacobs"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Alpen Gold","ru":"Alpen Gold"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Adidas","ru":"Adidas"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Nivea","ru":"Nivea"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Others","ru":"Others"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Alcatel","ru":"Alcatel"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Açil","ru":"Açil"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Nokia","ru":"Nokia"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Acer","ru":"Acer"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Sony","ru":"Sony"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Nescafe","ru":"Nescafe"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Joş","ru":"Joş"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Nestle","ru":"Nestle"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Özi","ru":"Özi"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"KitKat","ru":"KitKat"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Süýtli Dere","ru":"Süýtli Dere"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Däp","ru":"Däp"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Huawei","ru":"Huawei"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"LG","ru":"LG"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Nutella","ru":"Nutella"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Lipton","ru":"Lipton"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Mizan","ru":"Mizan"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Oba","ru":"Oba"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Pepsi","ru":"Pepsi"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Ýunus","ru":"Ýunus"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Peýkam","ru":"Peýkam"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Arçalyk","ru":"Arçalyk"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"7gün","ru":"7gün"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"ADA","ru":"ADA"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"TOSHIBA","ru":"TOSHIBA"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Intel","ru":"Intel"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"SanDisk","ru":"SanDisk"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Mercury","ru":"Mercury"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Delux","ru":"Delux"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"HikVision","ru":"HikVision"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"AMD","ru":"AMD"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Kingston","ru":"Kingston"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Bakjaly","ru":"Bakjaly"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"AOC","ru":"AOC"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Asus","ru":"Asus"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Dell","ru":"Dell"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Faberlic","ru":"Faberlic"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Losk","ru":"Losk"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Persil","ru":"Persil"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Perwoll","ru":"Perwoll"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Pastel","ru":"Pastel"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Pril","ru":"Pril"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Snickers","ru":"Snickers"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Sleepy","ru":"Sleepy"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Silen","ru":"Silen"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Zewa","ru":"Zewa"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Zamana","ru":"Zamana"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Yumoş","ru":"Yumoş"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Ýeserje","ru":"Ýeserje"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Xiaomi","ru":"Xiaomi"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Vernel","ru":"Vernel"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Venus","ru":"Venus"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Vanish","ru":"Vanish"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Ülker","ru":"Ülker"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Torku","ru":"Torku"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"TiTiz","ru":"TiTiz"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"TicTac","ru":"TicTac"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Tenda","ru":"Tenda"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Tex","ru":"Tex"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Tefal","ru":"Tefal"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Targus","ru":"Targus"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Taft","ru":"Taft"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Tadelle","ru":"Tadelle"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Sorti","ru":"Sorti"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Somat","ru":"Somat"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Palmolive","ru":"Palmolive"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Panasonic","ru":"Panasonic"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Nur","ru":"Nur"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Mars","ru":"Mars"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Nuts","ru":"Nuts"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Mentos","ru":"Mentos"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Genius","ru":"Genius"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Gerek","ru":"Gerek"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Garnier","ru":"Garnier"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Epson","ru":"Epson"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Dirol","ru":"Dirol"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Dosia","ru":"Dosia"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Dove","ru":"Dove"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Clear","ru":"Clear"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Cif","ru":"Cif"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Canon","ru":"Canon"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Bingo","ru":"Bingo"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Барни","ru":"Барни"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Ariel","ru":"Ariel"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Areon","ru":"Areon"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"AXE","ru":"AXE"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Braun","ru":"Braun"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Deli","ru":"Deli"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Dogadan","ru":"Dogadan"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"DSP","ru":"DSP"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Duru","ru":"Duru"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Elseve","ru":"Elseve"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Gillette","ru":"Gillette"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Glade","ru":"Glade"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Hame","ru":"Hame"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Heinz","ru":"Heinz"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Isleg","ru":"Isleg"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Kalyon","ru":"Kalyon"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Rollton","ru":"Rollton"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Pila","ru":"Pila"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Kinder","ru":"Kinder"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Rexona","ru":"Rexona"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Polen","ru":"Polen"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Nagmat","ru":"Nagmat"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Molfix","ru":"Molfix"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Meller","ru":"Meller"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Sap","ru":"Sap"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Özgeriş","ru":"Özgeriş"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Papia","ru":"Papia"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Joly","ru":"Joly"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Idee Kaffee","ru":"Idee Kaffee"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Hero Baby","ru":"Hero Baby"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Gliss Kur","ru":"Gliss Kur"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Red Bull","ru":"Red Bull"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Ak Bulut","ru":"Ak Bulut"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Ak Gar","ru":"Ak Gar"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Coca Cola","ru":"Coca Cola"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Fruit Tella","ru":"Fruit Tella"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Team Group","ru":"Team Group"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Yess Baby","ru":"Yess Baby"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Hewlett Packard","ru":"Hewlett Packard"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Ahmad Tea","ru":"Ahmad Tea"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Täç Hil","ru":"Täç Hil"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"TP-Link","ru":"TP-Link"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"D-Link","ru":"D-Link"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Kilwan Konditer","ru":"Kilwan Konditer"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
      {name:'{"tm":"Täze Aý","ru":"Täze Aý"}',description: '{"tm":"","ru":""}',address: '{"tm":"","ru":""}',active: 1,createdAt: new Date(),updatedAt: new Date()},
    ]

    await queryInterface.bulkInsert('brands',brands , {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
