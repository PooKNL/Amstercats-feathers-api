const feathers = require('feathers-client');
const authentication = require('feathers-authentication');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const host = 'http://localhost:3030';
const app = feathers()
  .configure(feathers.hooks())
  .configure(feathers.authentication({
    type: 'local'
  }))
  .configure(rest(host).superagent(superagent));

// services
const userService = app.service('users');
const catService = app.service('cats');

const user = {
  name: 'Robert Jan',
  email: 'rj.hogerbrugge@hotmail.com',
  password: 'abcd1234'
}

const cats = [
  {
    name: 'Wally',
    summary: 'Our lovely little furball.',
    age: '6 months',
    breed: 'Ragdoll',
    liked: false,
    photo: 'http://res.cloudinary.com/daahasvbo/image/upload/v1489924697/Wally1_kxmjd4.jpg'
  },
  {
    name: 'Art',
    summary: 'Q and Yores lovely little furball.',
    age: '5 years',
    breed: 'European shorthair',
    liked: false,
    photo: 'http://res.cloudinary.com/daahasvbo/image/upload/v1489924764/Ard1_oaasec.jpg'
  },
  {
    name: 'Baas',
    summary: 'Flip and Vrooms first lovely little furball.',
    age: '2 years',
    breed: 'Something',
    liked: false,
    photo: 'http://res.cloudinary.com/daahasvbo/image/upload/v1489924754/Baas2_jz8llh.jpg'
  },
  {
    name: 'Barney',
    summary: 'Flip and Vrooms second lovely little furball.',
    age: '1 year',
    breed: 'Something',
    liked: false,
    photo: 'http://res.cloudinary.com/daahasvbo/image/upload/v1489924693/Barney1_euv9qs.jpg'
  },
  {
    name: 'Wally',
    summary: 'Our lovely little furball.',
    age: '6 months',
    breed: 'Ragdoll',
    liked: false,
    photo: 'http://res.cloudinary.com/daahasvbo/image/upload/v1489924697/Wally1_kxmjd4.jpg'
  },
  {
    name: 'Art',
    summary: 'Q and Yores lovely little furball.',
    age: '5 years',
    breed: 'European shorthair',
    liked: false,
    photo: 'http://res.cloudinary.com/daahasvbo/image/upload/v1489924764/Ard1_oaasec.jpg'
  },
  {
    name: 'Baas',
    summary: 'Flip and Vrooms first lovely little furball.',
    age: '2 years',
    breed: 'Something',
    liked: false,
    photo: 'http://res.cloudinary.com/daahasvbo/image/upload/v1489924754/Baas2_jz8llh.jpg'
  },
  {
    name: 'Barney',
    summary: 'Flip and Vrooms second lovely little furball.',
    age: '1 year',
    breed: 'Something',
    liked: false,
    photo: 'http://res.cloudinary.com/daahasvbo/image/upload/v1489924693/Barney1_euv9qs.jpg'
  },
  {
    name: 'Wally',
    summary: 'Our lovely little furball.',
    age: '6 months',
    breed: 'Ragdoll',
    liked: false,
    photo: 'http://res.cloudinary.com/daahasvbo/image/upload/v1489924697/Wally1_kxmjd4.jpg'
  },
  {
    name: 'Art',
    summary: 'Q and Yores lovely little furball.',
    age: '5 years',
    breed: 'European shorthair',
    liked: false,
    photo: 'http://res.cloudinary.com/daahasvbo/image/upload/v1489924764/Ard1_oaasec.jpg'
  },
  {
    name: 'Baas',
    summary: 'Flip and Vrooms first lovely little furball.',
    age: '2 years',
    breed: 'Something',
    liked: false,
    photo: 'http://res.cloudinary.com/daahasvbo/image/upload/v1489924754/Baas2_jz8llh.jpg'
  },
  {
    name: 'Barney',
    summary: 'Flip and Vrooms second lovely little furball.',
    age: '1 year',
    breed: 'Something',
    liked: false,
    photo: 'http://res.cloudinary.com/daahasvbo/image/upload/v1489924693/Barney1_euv9qs.jpg'
  },
]


// Seed the user and cat!
userService.create(user)
  .then((result) => {
    console.log('User created, authenticating as user...');

    app.authenticate({
      type: 'local',
      email: user.email,
      password: user.password,
    }).then((result) => {
      console.log('Authenticated, seeding cats...');

      cats.map((cat) => {
        catService.create(Object.assign({}, cat, { token: result.token }))
          .then((result) => {
            console.log('Cat seeded...');
          }).catch((error) => {
            console.error('Error seeding cat!', error);
          });
      })
    }).catch((error) => {
      console.error('Error authenticating!', error);
    });
  })
  .catch((error) => {
    console.error('Error creating user!', error);
  });
