const MOCK_DATA_SIZE = 25;

const Likes = {
  MIN: 15,
  MAX: 200,
};

const Comments = {
  MIN: 0,
  MAX: 5,
};

const descriptions = [
  'Est ea nisi irure sunt consequat qui laboris. Non nulla Lorem elit mollit voluptate quis ullamco id cillum quis elit. Est laboris velit qui labore tempor labore dolore ut tempor. Officia do esse laborum eu enim enim laboris sint ut magna amet. Irure fugiat ea id Lorem. Ad in non cillum quis pariatur ex anim sunt.\r\n',
  'Labore nisi qui pariatur veniam ea culpa laborum et aliquip aute. Voluptate veniam nostrud deserunt est nulla amet do commodo consectetur. Nostrud excepteur id pariatur ut nostrud duis voluptate excepteur tempor. Reprehenderit deserunt fugiat Lorem aliquip excepteur exercitation. Velit magna commodo quis magna proident pariatur minim ut excepteur veniam consectetur proident occaecat quis.\r\n',
  'Tempor dolor sunt labore mollit labore id ad culpa consectetur minim adipisicing laborum. Dolor quis laboris sit Lorem excepteur officia excepteur aliqua aliquip veniam occaecat Lorem cupidatat. Sint voluptate duis laboris non. Culpa adipisicing ea dolor in minim. Ea ipsum aliqua non et laboris duis exercitation do. Labore ipsum commodo voluptate qui ut culpa incididunt elit exercitation deserunt culpa aliquip voluptate. Voluptate nulla esse proident in irure eiusmod irure ex dolor id quis do.\r\n',
  'Veniam sint nostrud enim veniam ipsum dolor aliqua veniam duis Lorem. Ipsum fugiat elit consectetur quis amet voluptate irure minim Lorem cupidatat minim. Anim reprehenderit officia culpa aliqua amet sunt sunt cupidatat non. Ullamco id Lorem duis mollit do incididunt. Labore magna dolore pariatur laborum. Esse laboris exercitation nulla deserunt labore ad dolore exercitation ex veniam et consectetur cupidatat. Anim non labore ut ipsum ad excepteur ex culpa sunt.\r\n',
  'Proident labore est ut irure excepteur consequat incididunt. Ullamco ullamco sunt irure velit tempor velit ut adipisicing. Anim fugiat officia anim pariatur ullamco sunt. Id aute consequat nisi cillum cillum esse excepteur veniam adipisicing. Dolore laborum velit amet laboris consectetur. Elit ex eu officia consequat aliqua adipisicing ea ea do consectetur do culpa.\r\n',
  'Fugiat aliqua et incididunt esse laboris dolore. Voluptate consequat est consequat elit Lorem dolor qui consequat nostrud. Eu laboris laborum eiusmod laboris.\r\n',
  'Dolor ea culpa do eu culpa ut laboris. Qui do quis deserunt aute. Duis officia do sit culpa.\r\n',
  'Qui fugiat nulla nisi exercitation mollit exercitation proident enim cupidatat deserunt. Esse cupidatat minim minim mollit laboris excepteur et laboris non adipisicing ex. Sint amet nisi ullamco nulla esse. Culpa voluptate in consequat officia elit proident enim fugiat mollit et cupidatat id cupidatat. Eu exercitation dolor sint sit enim amet irure duis aute aliqua laborum. Elit eu reprehenderit ipsum id. Quis incididunt enim officia qui reprehenderit.\r\n',
  'Non dolore dolor aliquip dolore in est Lorem duis sint elit aliqua eiusmod. Reprehenderit aliqua exercitation in qui ad consequat. Pariatur minim consectetur nisi officia occaecat aliqua ea deserunt. Consequat ullamco nostrud reprehenderit enim eiusmod qui. Adipisicing elit aliqua veniam est id do deserunt consectetur non deserunt laborum ipsum.\r\n',
  'Ex et anim commodo mollit ipsum eu. Laborum laboris dolor fugiat cupidatat ex minim eiusmod. Ullamco non enim dolor eu cillum minim. Qui duis enim tempor pariatur culpa sint qui minim duis velit consectetur enim. Anim mollit nostrud ullamco occaecat pariatur velit veniam aute est ea in anim. Ullamco voluptate labore ad esse ullamco tempor eiusmod tempor.\r\n',
  'Eu proident laborum consectetur nisi dolor minim cupidatat cupidatat amet officia dolor. Et dolore qui do tempor ullamco duis. Sint esse dolore veniam nostrud ipsum aute aliqua eiusmod amet reprehenderit adipisicing dolore dolore. Magna consectetur occaecat sit sint sit amet velit pariatur ipsum consequat fugiat incididunt. Aliquip non aliquip dolor amet et est aute nisi quis enim. Et ea deserunt veniam exercitation excepteur et veniam elit quis culpa labore tempor. Sunt labore consectetur eiusmod reprehenderit exercitation quis nisi voluptate incididunt excepteur.\r\n',
  'Lorem excepteur minim minim qui quis minim ipsum ut commodo ipsum fugiat duis consectetur laborum. Proident proident nulla do nulla. In duis deserunt minim velit commodo anim officia magna labore. Occaecat officia anim qui ullamco elit pariatur.\r\n',
  'Ipsum aliquip dolor cupidatat eiusmod mollit minim dolor officia sunt aliquip culpa aliquip. Ullamco non laboris officia aute. Minim veniam eiusmod reprehenderit cupidatat nisi nisi officia. Enim ex irure anim ex id nisi dolor id ipsum aliquip tempor aliquip officia laborum. Duis id est fugiat tempor dolore.\r\n',
  'Qui consectetur et do ut id nulla do proident aliquip sint id occaecat ad incididunt. In irure culpa laborum qui labore et irure quis. Excepteur enim pariatur anim quis duis dolor ipsum reprehenderit ipsum in dolor.\r\n',
  'Culpa elit ipsum consectetur esse aliquip eu nostrud laborum nisi id proident veniam. Nulla consectetur id exercitation sit duis ad ipsum adipisicing mollit. In ea cupidatat sunt veniam ea. Magna dolore pariatur minim eiusmod id nisi labore do ullamco labore id cupidatat officia. Incididunt est exercitation sint sint ut sint ipsum in et eiusmod deserunt consequat enim amet. Esse reprehenderit adipisicing irure sit magna.\r\n',
  'Et ex sint duis anim consequat nulla et culpa incididunt. Nisi deserunt proident aliqua adipisicing ut ipsum consequat commodo. Laboris excepteur incididunt consectetur nisi dolore pariatur esse consequat nostrud magna irure ullamco. Ullamco fugiat velit id qui nisi laboris ex consequat elit elit pariatur proident.\r\n',
  'Velit proident consequat elit sint. Pariatur id aute laboris cillum consectetur eiusmod labore mollit nulla ullamco consectetur dolore exercitation pariatur. Cillum aliquip ut occaecat officia commodo voluptate eiusmod nisi amet aute cillum. Nisi eiusmod aliquip anim ad et duis sint. Consequat culpa sint velit irure amet officia reprehenderit ipsum occaecat ex. Laborum eu nulla incididunt nulla fugiat et anim ut tempor adipisicing proident. Adipisicing aute eiusmod exercitation irure ipsum magna do eiusmod duis exercitation.\r\n',
  'Tempor sit fugiat eiusmod laboris nulla dolor laboris mollit minim sunt laborum officia non exercitation. Sint incididunt tempor in minim officia ut velit et pariatur. Occaecat commodo officia duis qui et tempor nulla ut est sint proident. Magna magna eiusmod dolor ipsum ad sit excepteur ut eu.\r\n',
  'Incididunt pariatur dolor magna sunt excepteur pariatur quis commodo id elit ea labore. Do nisi qui et dolore voluptate sint minim nulla non id anim et. Irure reprehenderit esse est aliqua nulla cillum excepteur tempor aliqua proident. Sit enim aliquip consectetur velit occaecat ullamco eiusmod culpa in id fugiat cupidatat. In dolore deserunt aliquip non pariatur. Laboris cupidatat occaecat incididunt ea dolore aliquip culpa. Culpa enim eiusmod id officia.\r\n',
  'Id sit eu sint exercitation consectetur sint excepteur do exercitation sint do. Id qui irure eiusmod ut incididunt excepteur est cillum. Culpa minim sit officia commodo. Culpa id mollit dolore sint excepteur.\r\n',
  'Ad tempor ea cupidatat mollit sint ullamco dolor irure commodo commodo ex est officia. Nisi excepteur irure cillum velit. Labore duis eu labore ut ipsum. Cupidatat quis pariatur aute laborum elit veniam dolore consequat nisi ad cupidatat fugiat sit. Qui est nisi in velit Lorem ea in deserunt anim magna dolore pariatur sint.\r\n',
  'Elit sit reprehenderit in et excepteur sint deserunt aute enim aliquip laborum dolore mollit elit. Incididunt proident voluptate non adipisicing dolore ea labore anim sit ullamco consectetur ipsum enim. Nisi aute in officia mollit laboris non nulla. Proident dolor laborum qui sint proident irure nisi proident veniam proident ipsum officia. Reprehenderit commodo nulla et occaecat nulla culpa adipisicing deserunt. Dolor labore et Lorem mollit proident veniam do id nulla.\r\n',
  'Cillum esse cillum ipsum nisi eiusmod ipsum eu officia sit sit. Sunt velit commodo in Lorem quis eiusmod. Nisi consequat proident cillum duis veniam nisi et minim laboris. Cillum reprehenderit sit elit enim proident cillum. Occaecat ex ipsum nulla ad excepteur exercitation fugiat eu consectetur. Consequat nostrud consectetur amet amet mollit non culpa deserunt velit velit. Nulla magna ad nulla irure excepteur sunt.\r\n',
];

const getNumber = (max, min) =>
  Math.round(Math.random() * (max - Comments.MIN) + min);

const getComments = (array) => {
  if (array.length === 0) {
    return array;
  }

  const getName = () => {
    const names = [
      'Mendez Rutledge',
      'Leona Lang',
      'Sherri Lewis',
      'Kendra Charles',
      'Letha Kaufman',
      'Katina Hewitt',
      'Wong Russell',
      'Hammond Saunders',
      'Faulkner Giles',
      'Irene Osborne',
      'Luella Pace',
      'Christian Mcintosh',
      'Sylvia Ross',
      'Taylor Strickland',
      'Atkinson Vang',
      'Goff Dixon',
      'Bowen Brewer',
      'Dionne Atkins',
      'Hogan Hayes',
      'Willa Valencia',
      'Isabel Pope',
      'Carol Ward',
      'Sophia Berg',
      'Savage Cannon',
      'Osborne Fox',
      'Gracie Delacruz',
      'Lori Humphrey',
    ];
    const nameIndex = getNumber(names.length, 1);
    return names[nameIndex];
  };

  const getMessage = (message = '') => {
    const messages = `Всё отлично!
    В целом всё неплохо. Но не всё.
    Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
    Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
    Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
    Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`.split(
      '\n'
    );

    const messageSize = Math.random() >= 0.5 ? 1 : 2;

    for (let i = 0; i < messageSize; i++) {
      message += `${messages[getNumber(messages.length - 1, 1) - 1].trim()}\n`;
    }

    return message;
  };

  const commentsIds = new Array(array.length)
    .fill()
    .map(() => getNumber(100, 1));

  return array.map(() => {
    const id = commentsIds.at(-1);
    commentsIds.pop();
    const avatar = `img/avatar-${getNumber(6, 1)}.svg`;
    const message = getMessage();
    const name = getName();

    return { id, avatar, message, name };
  }, {});
};

const createMockData = (listSize) =>
  [...new Array(listSize).keys()].map((index) => {
    const id = index + 1;
    const url = `photos/${id}.jpg`;
    const description = descriptions[getNumber(descriptions.length - 1, 1) - 1];
    const likes = getNumber(Likes.MAX, Likes.MIN);
    const commentsAmount = getNumber(Comments.MAX, Comments.MIN);
    const comments = getComments(new Array(commentsAmount).fill());
    return { id, url, description, likes, comments };
  });

const data = createMockData(MOCK_DATA_SIZE);
console.log(data);
