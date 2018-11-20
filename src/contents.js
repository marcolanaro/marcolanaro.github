const getContentFromFileName = fileName =>
  import(/* webpackMode: "lazy" */ `./markdown/${fileName}.md`).then(value => {
    return value.default;
  });

export { getContentFromFileName };
