//ELEMENTLERİ SEÇTİM
const todoInput = document.getElementById("todo-input");
const addBtn = document.querySelector("#todo-button");
const todoUl = document.querySelector("#todo-ul");

//LOCAL STORAGEDEN TODOLİSTİ ÇEKTİM
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
//Bu kod, "todoList" adlı bir diziyi tarayıcının yerel depolama (local storage) alanından alır veya eğer bu dizinin depolanmamış olması durumunda boş bir dizi oluşturur.

//SAYFA İLK YUKLENDİĞİNDE TODOLİST DİZİSİNİ TEK TEK GEZİP createTodo METODUNU ÇALIŞTIRIP HER BİR Lİ Yİ UL YE YÜKLEDİM.
window.addEventListener("load", () => {
  getTodoListFromLocalStorage();
});
const getTodoListFromLocalStorage = () => {
  todoList.forEach((todo) => {
    createTodo(todo);
  });
};

//ADD BUTONUNA TIKLADIĞIMIZDA OLAN OLAYLAR
// preventDefault() yöntemi, bu butonun tıklanması durumunda varsayılan form gönderme işlemini engellemek için kullanılır. Bu kod örneği, bir HTML formundaki "submit" düğmesinin tıklanması durumunda sayfanın yeniden yüklenmesini ve form verilerinin sunucuya gönderilmesini engeller.
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoInput.value.trim() === "") {
    alert("Please enter new todo text!");
    return;
  }
  const newTodo = {
    id: new Date().getTime(),
    completed: false,
    text: todoInput.value,
  };

  createTodo(newTodo);
  todoList.push(newTodo);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  e.target.closest("form").reset();
  //e.target.closest("form").reset(); bir HTML formu gönderildikten sonra formun tüm alanlarının sıfırlanması için kullanılır. Bu şekilde, formun tekrar kullanıma hazır hale getirilmesi sağlanır ve kullanıcıların yeni verileri kolayca girmesi mümkün olur.
});
const createTodo = (newTodo) => {
  const { id, completed, text } = newTodo;

  const li = document.createElement("li");
  li.setAttribute("id", id);

  completed ? li.classList.add("checked") : "";
  //completed değişkeninin doğruluğu (true veya false değeri) kontrol edilir. Eğer completed doğruysa (true), liye "checked" adlı bir CSS sınıfı eklenir.Eğer completed yanlışsa (false), herhangi bir işlem yapılmaz ("").

  const icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-check");
  li.appendChild(icon);

  const p = document.createElement("p");
  p.innerText = text;
  li.appendChild(p);

  const removeIcon = document.createElement("i");
  removeIcon.setAttribute("class", "fas fa-trash");
  li.append(removeIcon);
  todoUl.prepend(li);
};

todoUl.addEventListener("click", (e) => {
  const idAttr = e.target.closest("li").getAttribute("id");
  if (e.target.classList.contains("fa-check")) {
    e.target.parentElement.classList.toggle("checked");
    //Bu kod satırı, tıklanan öğenin ebeveyn "li" öğesine "checked" sınıfını ekler veya kaldırır.e.target tıklanan öğeyi temsil eder. parentElement özelliği, tıklanan öğenin doğrudan ebeveyn öğesini temsil eder, bu durumda tıklanan öğe bir tik işareti olduğundan ebeveyn "li" öğesi olacaktır.toggle() yöntemi, bir sınıfı öğede varsa kaldırır veya yoksa ekler.Böylece bu satır, tıklanan öğenin ebeveyn "li" öğesinde "checked" sınıfını ekler veya kaldırarak, kullanıcıya bu öğenin tamamlandığını veya tamamlanmadığını görsel olarak gösterir.

    todoList.forEach((todo) => {
      if (todo.id == idAttr) {
        todo.completed = !todo.completed;
      }
    });
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
    todoList = todoList.filter((todo) => todo.id != idAttr);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else {
    alert("other element clicked");
  }
  console.log(todoList);
});
