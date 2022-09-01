const postControllers = require("./post.controllers");

const getAllPosts = (req, res) => {
  const data = postControllers.getAllPosts();
  res.status(200).json({ items: data.length, posts: data });
};

const getPostById = (req, res) => {
    console.log(req.params.id)
    const id = req.params.id;
    const data = postControllers.getPostById(id);
  
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: `El post con el id ${id} no existe` });
    }
  };

 const getMyPost = (req, res) => {
  const user_id = req.user.id;
  const data = postControllers.getPostByUser(user_id);
  res.status(200).json(data);
 } 

 const registerPost = (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.title ||
    !data.content ||
    !data.header_image ||
    !data.published 
  ) { 
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        content: "string",
        header_image: "string",
        published: true
      },
    });
  } else {
    const response = postControllers.createPost(data);
    return res
      .status(201)
      .json({
        message: `Post created succesfully with id: ${response.id}`,
        user: response,
      });
  }
};
 
  const removeMyPost = (req, res) => {
  const post_id = req.params.id;
  const data = postControllers.deletePost(post_id)
  if(data){
    res.status(204).json()
  } else {
    res.status(400).json({message: 'invalid id'})
  }
}

const editMyPost = (req, res) => {
  const id = req.user.id;
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.title ||
    !data.content ||
    !data.header_image ||
    !data.published 
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        content: "string",
        header_image: "string",
        is_active: true
      },
    });
  } else {
    const response = postControllers.editPost(id, data)
    return res.status(200).json({
      message: 'Post edited succesfully',
      post: response
    })
  }
}

module.exports = {
    getAllPosts,
    getPostById,
    getMyPost,
    registerPost,
    editMyPost,
    removeMyPost,
}