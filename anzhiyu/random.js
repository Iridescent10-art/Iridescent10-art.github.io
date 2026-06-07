var posts=["2026/06/07/我的博客正式启航/","2026/06/07/这是一篇新的文章/","2026/06/07/hello-world/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };