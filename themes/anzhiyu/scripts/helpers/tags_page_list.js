hexo.extend.helper.register('tags_page_list', function (type) {
  const collection = hexo.locals.get(type);
  const items = collection.toArray ? collection.toArray() : Array.from(collection);
  const categoryOrder = (hexo.theme.config && hexo.theme.config.category_order) || [];

  let sortedTags;
  if (type === 'categories' && categoryOrder.length) {
    // 分类：按 _config.anzhiyu.yml 里的 category_order 排序，未列出的排在后面
    sortedTags = items.slice().sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.name);
      const indexB = categoryOrder.indexOf(b.name);
      return (indexA === -1 ? categoryOrder.length : indexA) - (indexB === -1 ? categoryOrder.length : indexB);
    });
  } else {
    // Manually sort tags based on the length of tag names
    sortedTags = items.reduce((acc, tag) => {
      const index = acc.findIndex((t) => t.length < tag.length);
      if (index === -1) {
        acc.push(tag);
      } else {
        acc.splice(index, 0, tag);
      }
      return acc;
    }, []);
  }

  let html = ``;
  sortedTags.forEach(function (item) {
    html += `
      <a href="/${item.path}" id="/${item.path}">
        <span class="tags-punctuation">#</span>${item.name}
        <span class="tagsPageCount">${item.length}</span>
      </a>
    `;
  });

  return html;
});
