

const render = (html: string) => {
  console.log("RENDER")
  const root = document.getElementById("root")
  if (root) root.innerHTML = html;
}

export default render;