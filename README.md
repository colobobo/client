<div align="center">
<img src="https://raw.githubusercontent.com/colobobo/client/master/src/assets/logo/logo-simple.png" alt="logo" width="400" />
</div>

<h4 align="center">A multiplayer mobile game with a shared gaming interface across devices</h4>

<h6 align="center">
  <img src="https://forthebadge.com/images/badges/built-with-love.svg" alt="build with love" />
  <br/>
  <br/>
  and :
</h6>

<p align="center">
  <a href="https://www.typescriptlang.org/">TypeScript</a> •
  <a href="https://reactjs.org">React</a> •
  <a href="https://redux.js.org/">Redux</a> •
  <a href="https://phaser.io/">Phaser</a> •
  <a href="https://socket.io/">Socket.IO</a>
</p>

# Colobobo - Client

This repo is the client part of Colobobo project. The others parts :
- [Server](https://github.com/colobobo/server) 
- [Library](https://github.com/colobobo/library)

> To run the project locally you will need at least the client part and the server part.

## Installation

1. Set node version with [nvm](https://github.com/nvm-sh/nvm)

   ```bash
   nvm use
   ```
   
2. Install dependencies with [yarn](https://yarnpkg.com/)

   ```bash
   yarn install
   ```
   
3. Run the app in the development mode

   ```bash
   yarn start
   ```
   
## Admin interface

To simulate a game with several mobile devices directly in your browser, you can go to admin interface at [http://localhost:3000/admin](http://localhost:3000/admin)

## Use @colobobo/library locally

Follow these steps if you want to use @colobobo/library in development mode.

1. Install and build [@colobobo/library](https://github.com/colobobo/library)

2. Symlink library package folder 

   1. Go to library folder and run :
   
      ```bash
      yarn link
      ```
      
   2. Go to client folder and run :
   
      ```bash
      yarn link "@colobobo/library"
      ```