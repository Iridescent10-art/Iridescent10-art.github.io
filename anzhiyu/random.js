var posts=["2025/08/07/hello-world/","2025/08/07/这是一篇新的博文/","2025/08/07/这是另一篇新的博文/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };