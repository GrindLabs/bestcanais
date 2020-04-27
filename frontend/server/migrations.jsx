import { Meteor } from 'meteor/meteor';
import Channels from '/imports/api/Channels';
import Sources from '/imports/api/Sources';
import Ads from '/imports/api/Ads';

Migrations.add({
  version: 1,
  name: 'Initial data',
  up() {
    Channels.rawCollection().insertMany([
      {
        name: 'Premiere 2',
        alias: 'premiere2',
        description: null,
        logo: 'http://i.imgur.com/8d0cM31.png',
        isActive: true,
      },
      {
        name: 'Premiere 3',
        alias: 'premiere3',
        description: null,
        logo: 'http://i.imgur.com/8d0cM31.png',
        isActive: true,
      },
      {
        name: 'Premiere 4',
        alias: 'premiere4',
        description: null,
        logo: 'http://i.imgur.com/8d0cM31.png',
        isActive: true,
      },
      {
        name: 'Premiere 5',
        alias: 'premiere5',
        description: null,
        logo: 'http://i.imgur.com/8d0cM31.png',
        isActive: true,
      },
      {
        name: 'Premiere 6',
        alias: 'premiere6',
        description: null,
        logo: 'http://i.imgur.com/8d0cM31.png',
        isActive: true,
      },
      {
        name: 'Premiere 7',
        alias: 'premiere7',
        description: null,
        logo: 'http://i.imgur.com/8d0cM31.png',
        isActive: true,
      },
      {
        name: 'Premiere 8',
        alias: 'premiere8',
        description: null,
        logo: 'http://i.imgur.com/8d0cM31.png',
        isActive: true,
      },
      {
        name: 'Premiere Clubes',
        alias: 'premiereclubes',
        description: null,
        logo: 'http://i.imgur.com/8d0cM31.png',
        isActive: true,
      },
      {
        name: 'Combate',
        alias: 'combate',
        description: null,
        logo: 'http://i.imgur.com/5qo1Dyc.png',
        isActive: true,
      },
    ]);

    // Add new sources
    Sources.insert({
      name: 'AoVivo Club',
      alias: 'aovivoclub',
      lookup: [
        'http://aovivo.club/assistir-canais-de-esportes-ao-vivo/',
        'http://aovivo.club/assistir-canais-infantis-ao-vivo/',
        'http://aovivo.club/assistir-canais-de-filmes-e-series-ao-vivo/',
        'http://aovivo.club/assistir-canais-de-documentarios-ao-vivo/',
        'http://aovivo.club/assistir-canais-de-variedades-ao-vivo/',
        'http://aovivo.club/assistir-canais-de-musicas-ao-vivo/',
      ],
      blocks: [
        {
          name: 'stream',
          path:
            '/main/div/div[@itemscope="itemscope"]/div/div/div[1]/div/a/img[matches(@alt, ".*{0}.*", "i")]',
        },
      ],
      isActive: true,
    });
  },
  down() {
    Sources.rawCollection().drop();
    Channels.rawCollection().drop();
  },
});

Migrations.add({
  version: 2,
  name: 'Add domain field to Sources model',
  up() {
    Sources.update(
      { alias: 'aovivoclub' },
      { $set: { domain: 'aovivo.club' } }
    );
  },
  down() {
    Sources.update({ alias: 'aovivoclub' }, { $unset: { domain: 1 } });
  },
});

Migrations.add({
  version: 3,
  name: 'Update blocks field of Sources model',
  up() {
    Sources.update(
      { alias: 'aovivoclub' },
      {
        $set: {
          blocks: [
            {
              name: 'stream',
              path:
                '//main/div/div[@itemscope="itemscope"]/div/div/div[1]/div/a/@href',
              regex: '.*({0}).*-(fhd|hd|sd)?.*',
            },
          ],
        },
      }
    );
  },
  down() {
    Sources.update(
      { alias: 'aovivoclub' },
      {
        $set: {
          blocks: [
            {
              name: 'stream',
              path:
                '/main/div/div[@itemscope="itemscope"]/div/div/div[1]/div/a/img[matches(@alt, ".*{0}.*", "i")]',
            },
          ],
        },
      }
    );
  },
});

Migrations.add({
  version: 4,
  name: 'Add MTV and A Fazenda channels',
  up() {
    Channels.rawCollection().insertMany([
      {
        name: 'MTV',
        alias: 'mtv',
        description: null,
        logo: 'http://i.imgur.com/U6Rgjqs.png',
        isActive: true,
      },
      {
        name: 'A Fazenda',
        alias: 'afazenda',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/afazenda.png',
        isActive: true,
      },
    ]);
  },
  down() {
    Channels.remove({ alias: { $in: ['mtv', 'afazenda'] } });
  },
});

Migrations.add({
  version: 5,
  name: 'Add ExoClick ADS',
  up() {
    Ads.rawCollection().insertMany([
      {
        provider: 'EXOCLICK',
        domain: 'https://www.exoclick.com/',
        elementId: 'adsHorizontal',
        rawHtml:
          '<iframe src="//a.exdynsrv.com/iframe.php?idzone=3566187&size=900x250" width="900" height="250" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>',
        createdAt: true,
      },
      {
        provider: 'EXOCLICK',
        domain: 'https://www.exoclick.com/',
        elementId: 'adsVertical',
        rawHtml:
          '<iframe src="//a.exdynsrv.com/iframe.php?idzone=3566263&size=160x600" width="160" height="600" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>',
        createdAt: true,
      },
    ]);
  },
  down() {
    Channels.remove({ provider: 'EXOCLICK' });
  },
});

Migrations.add({
  version: 6,
  name: 'Fix the createdAt field',
  up() {
    Ads.rawCollection().updateMany(
      { provider: 'EXOCLICK' },
      { $set: { createdAt: new Date() } }
    );
  },
  down() {
    Channels.remove({ provider: 'EXOCLICK' });
  },
});

Migrations.add({
  version: 7,
  name: 'Add ExoClick ADS Mobile Version',
  up() {
    Ads.rawCollection().insertMany([
      {
        provider: 'EXOCLICK',
        domain: 'https://www.exoclick.com/',
        elementId: 'adsMobileTop',
        rawHtml:
          '<iframe src="//a.exdynsrv.com/iframe.php?idzone=3579591&size=300x100" width="300" height="100" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>',
        createdAt: new Date(),
      },
      {
        provider: 'EXOCLICK',
        domain: 'https://www.exoclick.com/',
        elementId: 'adsMobileBottom',
        rawHtml:
          '<iframe src="//a.exdynsrv.com/iframe.php?idzone=3579595&size=300x100" width="300" height="100" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>',
        createdAt: new Date(),
      },
    ]);
  },
  down() {
    Channels.remove({ provider: 'EXOCLICK' });
  },
});

Migrations.add({
  version: 8,
  name: 'Add priority field to Channel model',
  up() {
    Channels.update(
      {
        $or: [
          { alias: { $regex: 'premiere.*' } },
          { alias: { $regex: 'combate.*' } },
        ],
      },
      { $set: { priority: Meteor.settings.public.channel.priority.low } },
      { multi: true }
    );
  },
  down() {
    Channels.update(
      {
        $or: [
          { alias: { $regex: 'premiere.*' } },
          { alias: { $regex: 'combate.*' } },
        ],
      },
      { $unset: { priority: Meteor.settings.public.channel.priority.low } }
    );
  },
});

Migrations.add({
  version: 9,
  name: 'Add priority field to Channel model',
  up() {
    Channels.update(
      {
        $or: [
          { alias: { $regex: 'afazenda.*' } },
          { alias: { $regex: 'mtv.*' } },
        ],
      },
      { $set: { priority: Meteor.settings.public.channel.priority.high } },
      { multi: true }
    );
  },
  down() {
    Channels.update(
      {
        $or: [
          { alias: { $regex: 'afazenda.*' } },
          { alias: { $regex: 'mtv.*' } },
        ],
      },
      { $unset: { priority: Meteor.settings.public.channel.priority.high } }
    );
  },
});

Migrations.add({
  version: 10,
  name: 'Add new kids channels',
  up() {
    Channels.rawCollection().insertMany([
      {
        name: 'NatGeo Kids',
        alias: 'natgeokids',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/natgeokids.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Cartoon Network',
        alias: 'cartoonnetwork',
        description: null,
        logo:
          'http://aovivo.club/wp-content/uploads/2019/07/cartoonnetwork.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'Discovery Kids',
        alias: 'discoverykids',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/dicoverykids.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Disney XD',
        alias: 'disneyxd',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/disneyxd.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Disney Junior',
        alias: 'disneyjunior',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/disneyjr.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Disney Channel',
        alias: 'disneychannel',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/disneychannel.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Gloob',
        alias: 'gloob',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/gloob.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Nickelodeon',
        alias: 'nickelodeon',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/nick.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'Nick Jr',
        alias: 'nickjr',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/nickjr.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Tooncast',
        alias: 'tooncast',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tooncast.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Boomerang',
        alias: 'boomerang',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/boomerang.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
    ]);
  },
  down() {
    Channels.remove({
      alias: {
        $in: [
          'natgeokids',
          'cartoonnetwork',
          'discoverykids',
          'disneyxd',
          'disneyjunior',
          'disneychannel',
          'gloob',
          'nickelodeon',
          'nickjr',
          'tooncast',
          'boomerang',
        ],
      },
    });
  },
});

Migrations.add({
  version: 11,
  name: 'Add new documentary channels',
  up() {
    Channels.rawCollection().insertMany([
      {
        name: 'Discovery Channel',
        alias: 'discoverychannel',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/discovery.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'National Geographic',
        alias: 'nationalgeographic',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/natgeochannel.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'History',
        alias: 'history',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/history.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'H2',
        alias: 'h2',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/h2.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Discovery World',
        alias: 'discoveryworld',
        description: null,
        logo:
          'http://aovivo.club/wp-content/uploads/2019/07/discoveryworld.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Discovery Turbo',
        alias: 'discoveryturbo',
        description: null,
        logo:
          'http://aovivo.club/wp-content/uploads/2019/07/discoveryturbo.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Discovery Theater',
        alias: 'discoverytheater',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/theaterhd.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Discovery Science',
        alias: 'discoveryscience',
        description: null,
        logo:
          'http://aovivo.club/wp-content/uploads/2019/07/discoveryscience.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Discovery Home & Health',
        alias: 'discoveryhomeandhealth',
        description: null,
        logo:
          'http://aovivo.club/wp-content/uploads/2019/07/discoveryhomehealth.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Discovery Civilization',
        alias: 'discoverycivilization',
        description: null,
        logo:
          'http://aovivo.club/wp-content/uploads/2019/07/discoverycivilization.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Animal Planet',
        alias: 'animalplanet',
        description: null,
        logo:
          'http://aovivo.club/wp-content/uploads/2019/07/discoverycivilization.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Investigação Discovery',
        alias: 'investigacaodiscovery',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/id.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
    ]);
  },
  down() {
    Channels.remove({
      alias: {
        $in: [
          'discoverychannel',
          'nationalgeographic',
          'history',
          'h2',
          'discoveryworld',
          'discoveryturbo',
          'discoverytheater',
          'discoveryscience',
          'discoveryhomeandhealth',
          'discoverycivilization',
          'animalplanet',
          'investigacaodiscovery',
        ],
      },
    });
  },
});

Migrations.add({
  version: 12,
  name: 'Add new public channels',
  up() {
    Channels.rawCollection().insertMany([
      {
        name: 'Record ES',
        alias: 'recordes',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/rederecord.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Record',
        alias: 'record',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/rederecord.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Rede Brasil',
        alias: 'redebrasil',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/redebrasil.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Rede Brasil DF',
        alias: 'redebrasildf',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/redebrasil.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'SBT PE',
        alias: 'sbtpe',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/sbt-1.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'SBT MA',
        alias: 'sbtma',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/sbt-1.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'SBT SP',
        alias: 'sbtsp',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/sbt-1.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'SBT PI',
        alias: 'sbtpi',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/sbt-1.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Canal FCV',
        alias: 'canalfcv',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/09/fcv.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Globo',
        alias: 'globo',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/globo-2.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'Globo SP',
        alias: 'globosp',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/globo-2.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Globo RJ',
        alias: 'globorj',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/globo-2.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Globo Nordeste',
        alias: 'globonordeste',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/globo-2.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'TV Novo Tempo',
        alias: 'tvnovotempo',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/novotempo.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'TV Câmara',
        alias: 'tvcamara',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tvcamara.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'TV Brasil',
        alias: 'tvbrasil',
        description: null,
        logo:
          'http://aovivo.club/wp-content/uploads/2019/07/tvbrasilinternacional.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'TV Aparecida',
        alias: 'tvaparecida',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tvaparecida.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Terra Viva',
        alias: 'terraviva',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/terraviva.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Rede Vida',
        alias: 'redevida',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/redevida.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Canção Nova',
        alias: 'cancaonova',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/cancaonova.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Canal Brasil',
        alias: 'canalbrasil',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/canalbrasil.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'TV Gazeta',
        alias: 'tvgazeta',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tvgazeta.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'TV Cultura',
        alias: 'tvcultura',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tvcultura.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Rede TV',
        alias: 'redetv',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/redetv.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Band',
        alias: 'band',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/band.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
    ]);
  },
  down() {
    Channels.remove({
      alias: {
        $in: [
          'recordes',
          'record',
          'redebrasil',
          'redebrasildf',
          'sbtpe',
          'sbtma',
          'sbtsp',
          'sbtpi',
          'canalfcv',
          'globo',
          'globosp',
          'globorj',
          'globonordeste',
          'tvnovotempo',
          'tvcamara',
          'tvbrasil',
          'tvaparecida',
          'terraviva',
          'redevida',
          'cancaonova',
          'canalbrasil',
          'tvgazeta',
          'tvcultura',
          'redetv',
          'band',
        ],
      },
    });
  },
});

Migrations.add({
  version: 13,
  name: 'Add new music channels',
  up() {
    Channels.rawCollection().insertMany([
      {
        name: 'Multishow',
        alias: 'multishow',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/multishow.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'BIS',
        alias: 'bis',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/bis.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'VH1',
        alias: 'vh1',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/vh1.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
    ]);
  },
  down() {
    Channels.remove({
      alias: {
        $in: ['multishow', 'bis', 'vh1'],
      },
    });
  },
});

Migrations.add({
  version: 14,
  name: 'Add new variety channels',
  up() {
    Channels.rawCollection().insertMany([
      {
        name: 'Futura',
        alias: 'futura',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/futura.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Syfy',
        alias: 'syfy',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/syfy.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'TLC',
        alias: 'tlc',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tlchd.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Globosat',
        alias: 'globosat',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/globosat.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Viva',
        alias: 'viva',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/viva.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'TBS',
        alias: 'tbs',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tbs.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'GNT',
        alias: 'gnt',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/gnt.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'E! Entertainment',
        alias: 'eentertainment',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/e.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Comedy Central',
        alias: 'comedycentral',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/comedycentral.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Canal Off',
        alias: 'canaloff',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/canaloff.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Food Network',
        alias: 'foodnetwork',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/foodnetwork.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: '!Curta',
        alias: 'canalcurta',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/canalcurta.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Arte 1',
        alias: 'arte1',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/arte1.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Globo News',
        alias: 'globonews',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/globonews.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Band News',
        alias: 'bandnews',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/bandnews.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
    ]);
  },
  down() {
    Channels.remove({
      alias: {
        $in: [
          'futura',
          'syfy',
          'tlc',
          'globosat',
          'viva',
          'tbs',
          'gnt',
          'eentertainment',
          'comedycentral',
          'canaloff',
          'foodnetwork',
          'canalcurta',
          'arte1',
          'globonews',
          'bandnews',
        ],
      },
    });
  },
});

Migrations.add({
  version: 15,
  name: 'Add new movies channels',
  up() {
    Channels.rawCollection().insertMany([
      {
        name: 'A&E Mundo',
        alias: 'aemundo',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/ae.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'FX',
        alias: 'fx',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/fx.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'TC Touch',
        alias: 'tutouch',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tctouch.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'TC Premium',
        alias: 'tcpremium',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tcpremium.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'TC Pipoca',
        alias: 'tcpipoca',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tcpipoca.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'TC Fun',
        alias: 'tcfun',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tcfun.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'TC Cult',
        alias: 'tccult',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tccult.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'TC Action',
        alias: 'tcaction',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tcaction.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'HBO Signature',
        alias: 'hbosignature',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/hbosignature.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'HBO Plus',
        alias: 'hboplus',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/hboplus.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'HBO Plus e',
        alias: 'hbopluse',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/hbopluse.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.nlow,
      },
      {
        name: 'HBO Family',
        alias: 'hbofamily',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/hbofamily.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'HBO 2',
        alias: 'hbo2',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/hbo2hd.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'HBO',
        alias: 'hbo',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/hbohd.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'Sony',
        alias: 'sony',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/sony.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Fox Premium',
        alias: 'foxpremium',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/foxpremium1.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'Fox Premium 2',
        alias: 'foxpremium2',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/foxpremium2.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Fox',
        alias: 'fox',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/fox.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'Fox life',
        alias: 'foxlife',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/foxlife.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'TNT',
        alias: 'tnt',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tnt.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'TNT Series',
        alias: 'tntseries',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tntseries.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'AMC Brasil',
        alias: 'amcbrasil',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/amc.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'AXN',
        alias: 'axn',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/axn.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Cinemax',
        alias: 'cinemax',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/cinemax.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Paramount',
        alias: 'paramount',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/paramount.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'TCM',
        alias: 'tcm',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/tcm.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Universal Channel',
        alias: 'universalchannel',
        description: null,
        logo:
          'http://aovivo.club/wp-content/uploads/2019/07/universalchannel.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Studio Universal',
        alias: 'studiouniversal',
        description: null,
        logo:
          'http://aovivo.club/wp-content/uploads/2019/07/studiouniversal.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Megapix',
        alias: 'megapix',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/megapix.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Lifetime',
        alias: 'lifetime',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/lifetime.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'Max Up',
        alias: 'maxup',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/maxup.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Max Prime',
        alias: 'maxprime',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/maxprime.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Max',
        alias: 'max',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/max.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'Warner Channel',
        alias: 'warnerchannel',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/warner.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'Prime Box Brazil',
        alias: 'primeboxbrazil',
        description: null,
        logo:
          'http://aovivo.club/wp-content/uploads/2019/07/primeboxbrazil.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
    ]);
  },
  down() {
    Channels.remove({
      alias: {
        $in: [
          'aemundo',
          'fx',
          'tutouch',
          'tcpremium',
          'tcpipoca',
          'tcfun',
          'tccult',
          'tcaction',
          'hbosignature',
          'hboplus',
          'hbopluse',
          'hbofamily',
          'hbo2',
          'hbo',
          'sony',
          'foxpremium',
          'foxpremium2',
          'fox',
          'foxlife',
          'tnt',
          'tntseries',
          'amcbrasil',
          'axn',
          'cinemax',
          'paramount',
          'tcm',
          'universalchannel',
          'studiouniversal',
          'megapix',
          'lifetime',
          'maxup',
          'maxprime',
          'max',
          'warnerchannel',
          'primeboxbrazil',
        ],
      },
    });
  },
});

Migrations.add({
  version: 16,
  name: 'Add new sport channels',
  up() {
    Channels.rawCollection().insertMany([
      {
        name: 'UFC Ultimate Fighting Championship',
        alias: 'ufc',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/11/LOGO_UFC.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'Formula 1',
        alias: 'formula1',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/11/Logotipo_F1.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'FishTv',
        alias: 'fishtv',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/fishtv.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
      {
        name: 'SporTv 3',
        alias: 'sportv3',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/sportv3.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'SporTv 2',
        alias: 'sportv2',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/sportv2.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'SporTv',
        alias: 'sportv',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/sportv.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'Fox Sports',
        alias: 'foxsports',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/foxsports.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Fox Sports 2',
        alias: 'foxsports2',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/foxsports2.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Espn Plus',
        alias: 'espnplus',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/espnplus.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.normal,
      },
      {
        name: 'Espn',
        alias: 'espn',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/espn.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'Espn Brasil',
        alias: 'espnbrasil',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/espnbrasil.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'Band Sports',
        alias: 'bandsports',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/bandsports.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.high,
      },
      {
        name: 'Space',
        alias: 'space',
        description: null,
        logo: 'http://aovivo.club/wp-content/uploads/2019/07/space.png',
        isActive: true,
        priority: Meteor.settings.public.channel.priority.low,
      },
    ]);
  },
  down() {
    Channels.remove({
      alias: {
        $in: [
          'ufc',
          'formula1',
          'fishtv',
          'sportv3',
          'sportv2',
          'sportv',
          'foxsports',
          'foxsports2',
          'espnplus',
          'espn',
          'espnbrasil',
          'bandsports',
          'space',
        ],
      },
    });
  },
});
