var posts=["posts/我的博客正式启航/","posts/代理软件使用教程/","posts/Kazumi-番剧采集播放器/","posts/卫戍协议-盟约/","posts/提瓦特国际机场-节点观测站/","posts/提瓦特国际机场-汇聚订阅站/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };