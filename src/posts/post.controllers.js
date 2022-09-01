const uuid = require("uuid");
const { post } = require("../app");
const { hashPassword } = require("../utils/crypt");

const postDB = [{
	"id": "ad708a6e-b2d9-4417-8618-842f7d247dc7",
	"title": "post1",
	"content":"post1",
	"header_image": "url_to_img",
	"user_id": "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",//Aqui hara referencia al usuario de tu userDB
	"published": true
},
{
	"id": "01204ebb-ce69-4804-8542-e9256bd00ca0",
	"title": "post2",
	"content":"post2",
	"header_image": "url_to_img",
	"user_id": "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",//Aqui hara referencia al usuario de tu userDB
	"published": true
}
];

const getAllPosts = () => {
  return postDB;
  //? select * from posts;
};

const getPostById = (id) => {
  
    const data = postDB.filter((post) => post.id === id);
  
    return data.length ? data[0] : null
}

const createPost = (data) => {
  const newPost = {
    id: uuid.v4(), //obligatorio y unico
    title: data.title, //obligatorio
    content: data.content, //obligatorio
    header_image: data.post_img, //obligatorio
    user_id: data.user_id, //Aqui hara referencia al usuario de tu userDB
	  published: true
  };
  postDB.push(newPost);
  return newPost;
};

const editPost = (id, data, user_id) => {
    const index = postDB.findIndex((post) => post.id === id);
    if (index !== -1) {
      postDB[index] = {
        id: id,
        title: data.title, //obligatorio
        content: data.content, //obligatorio
        header_image: data.post_img, //obligatorio
        user_id: user_id, //Aqui hara referencia al usuario de tu userDB
	      published: true
      };
      return postDB[index];
    } 
    //else {
    //  return createPost(data);
    //}
  };

  
const deletePost = (id) => {
    const index = postDB.findIndex((post) => post.id === id)
    if (index !== -1) {
      postDB.splice(index, 1)
      return true
    } else {
      return false
    } 
  }
  
  const getPostByUser = (user_id) => {
    const data = postDB.filter(post => user_id === post.user_id)
    return data 
  }
  
module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
  getPostByUser
   
}