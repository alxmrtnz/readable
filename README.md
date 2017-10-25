# Udacilist (aka Udacity's Readable Project)

This is the project for the final assessment project of Udacity's Redux course. It is a comment web app where users can post content to predefined categories, comment on their posts and other user's posts, and vote on posts and comments

## API Server

The backend API server included in this projected was provided from Udacity ([repository here](https://github.com/udacity/reactnd-project-readable-starter))

More information about the API server and how to use it can be found in its [README file](api-server/README.md).

### Getting API Server Up and Running

To start working with the API server, install it and start it:
    - `cd api-server`
    - `npm install`
    - `node server`
    
### Editing Predefined Categories, Comments, Posts

To add predefined content (so your app isn't empty when you start it up), you can edit the following files in the `api-server` directory:
    - `categories.js`
    - `comments.js`
    - `posts.js`
    
Each file contains a `defaultData` object where you can add a new piece of data. After editing, make sure you restart the server for it to update.

## Front End

To begin working on the front end of the application
    - `cd frontend`
    - `npm install`
    - `npm start`
    
This will make sure you install the correct node packages and start a script to build and watch your js and scss.

Dependencies can be found in `package.json`

### Styles/Webpack Setup

This project has been set up to use and compile `scss`. Styles are found in 
```
frontend
–– assets
–– –– styles
```
`styles.scss` is the sole file that is compiled using the scripts (and the `node-sass-chokidar` package) found in `package.json`. To add new styles, make sure to import them into `styles.scss`


