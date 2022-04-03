import { isConditionalExpression } from "typescript";

/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
  for (let i = 0;i<count;i++)
  {
    const el =document.createElement(tag);
    el.innerHTML = content;
    document.body.append(el);
  }
}
/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
function generate_children (parent,childrenCount, level,p) {
  for (let i = 0;i<childrenCount;i++)
  {
    let node = document.createElement('div')
    name = "item_" + p.toString()
    node.className = name
    parent.append(node)
    if (p<level)
      generate_children(node,childrenCount,level,p+1)
  }
}
export function generateTree(childrenCount, level) {
    let root = document.createElement('div')
    name = "item_" + "1"
    root.className = name
    generate_children(root,childrenCount,level,2)
    return root
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
function go_tree(node,p) {
  if (node.className=="item_2") {
    console.log("yes")
    const new_tag = document.createElement('section')
    new_tag.innerHTML = node.innerHTML
    new_tag.className = node.className
    node.replaceWith(new_tag)
  }
  if (p<2)
  {
      let children = node.childNodes
      for (let i = 0;i<children.length;i++)
      {
        go_tree(children[i], p+1)
      }
  }
}
export function replaceNodes() {
  let tree = generateTree(2, 3)
  
  go_tree(tree.getRootNode(), 1)
  return tree
}
