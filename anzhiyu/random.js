var posts=["posts/提瓦特国际机场-节点观测站/","posts/提瓦特国际机场-汇聚订阅站/","posts/我的博客正式启航/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };