const $navList = $(".navList");
const $lastLi = $navList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x); //parse把字符串变为对象
const hashMap = xObject || [{
    logo: "",
    url: "https://www.acfun.cn",
  },
  {
    logo: "",
    url: "https://www.bilibili.com",
  },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除/开头的内容
};

const render = () => {
  $navList.find("li:not(.last)").remove(); //唯独不要最后一个
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
<div class="site">
          <div class="logo"><img src="${node.url}/favicon.ico" alt=""></div>
          <div class="link" >${simplifyUrl(node.url)}</div>
         <div class="close"> <svg class="icon" >
<use xlink:href="#icon-close"></use>
</svg>
</div>
</div>
</li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url, target = "_self");
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是什么");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url,
  });
  render();
});
window.onbeforeunload = () => {
  //关闭网页最后触发
  const string = JSON.stringify(hashMap); //把对象变为string
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const {
    key
  } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (document.activeElement.id !== "navInp") {
      if (hashMap[i].logo.toLowerCase() === key) {
        open(hashMap[i].url, target = "_self")
        // window.location.href = hashMap[i].url;
      }
    }
  }
})