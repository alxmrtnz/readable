const clone = require('clone')

let db = {}

const defaultData = {
  "1xf0y6ziyjabvozdd253nd": {
    id: '1xf0y6ziyjabvozdd253nd',
    timestamp: 1506816000000,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'Zach Kuzmic',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
  "2ni6ok3ym7mf1p33lnez": {
    id: '2ni6ok3ym7mf1p33lnez',
    timestamp: 1502541240000,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'Elvis Presley',
    category: 'redux',
    voteScore: -5,
    deleted: false
  },
  "3ni6ok3ym7mf1p33lnex": {
    id: '3ni6ok3ym7mf1p33lnex',
    timestamp: 1506470400000,
    title: 'Rails and React',
    body: 'Taking advantage of both technologies',
    author: 'Amrit Saini',
    category: 'rails',
    voteScore: 0,
    deleted: false
  },
  "4o86ok3ym7mf1p33lnez": {
    id: '4o86ok3ym7mf1p33lnez',
    timestamp: 1506729600000,
    title: 'Web Design for Dummies',
    body: "You're not a dummy, don't worry!",
    author: 'Alex Martinez',
    category: 'design',
    voteScore: 1,
    deleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
}
