[New version here!](https://github.com/loq24/wp-react-typescript/)

# ReactJS with Wordpress Client Authentication using JWT
Must have **JWT Authentication** plugin installed into your wordpress website. Follow the installation guide [here](https://github.com/Tmeister/wp-api-jwt-auth). Port 3000 must be open and make sure to replace the **ROOT_URL** found inside the [index file](https://github.com/loq24/wp-react/blob/master/src/actions/index.js) under actions directory.

This project is to serve as a guide for users that is looking for an idea on how to use Wordpress REST API with React as a frontend. Improvements are welcome. You may create a pull request or just contact me at my [personal website](https://lougiequisel.com/).

I also created an OAuth 2.0 demo as well found here -[https://github.com/loq24/oauth-demo](https://github.com/loq24/oauth-demo).

### Online Demo
- [SignIn](https://wp-react.lougiequisel.com/signin)
- [All Posts](https://wp-react.lougiequisel.com/posts)
- [Add New Post](https://wp-react.lougiequisel.com/add-post)
- [Acount Page](https://wp-react.lougiequisel.com/account)

### Installation
Clone repo:
```sh
git clone https://github.com/loq24/wp-react.git
cd wp-react
npm install
npm start
Access http://localhost:3000/
```

### Typescript Version

I converted the whole project with Typescript. Please check the Typescript version [here](https://github.com/loq24/wp-react-typescript/)

### License
MIT
