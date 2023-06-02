const userSurname = document.querySelector('[name="surname"]');
const userName =  document.querySelector('[name="name"]');

//получите элементы checkbox с товарами goods
const goodsElements = document.querySelectorAll('.checkbox');
//получите элементы input с кол-вом(*)
const countElements = document.querySelectorAll('[name="goodsCount"]');

//получите элемент button(*)
const btn = document.querySelector('.btn')
//получите элемент span для итоговой суммы
const resultElem = document.querySelector('.sum')

//создайте переменную для хранения итоговой суммы (*)
let totalSum = 0
//создайте функцию, которая будет считать итоговую сумму, подумайте над формулой.
function countSum(countElements, goodsElements){
    totalSum = 0;

    for (let i = 0; i < countElements.length; i++){
        if (countElements[i].value < 0) {
            countElements[i].value = 0;
        }
        if (goodsElements[i].checked) {
            totalSum += (Number(countElements[i].value) * Number(goodsElements[i].value));
        }
    }
    return totalSum;
};


//для каждого элемента input с кол-вом нужно повесить событие на изменение change, 
//по которому в объекте должны меняться значения на значение в input
countElements.forEach(elem => {
    elem.addEventListener("change", function(){
        resultElem.textContent = countSum(countElements, goodsElements);
    });
});

//для каждого элемента checkbox нужно повесить событие на изменение change, 
//по которому в объекте должны меняться значение на цену, если чекбокс выбран
//или обратно на 0, если чекбокс не выбран
for (let i = 0; i < goodsElements.length; i++) {
    goodsElements[i].addEventListener("change", function() {
        if (goodsElements[i].checked) {
            countElements[i].value = 1;
        } else {
            countElements[i].value = 0;
        }
        resultElem.textContent = countSum(countElements, goodsElements);
    });
};


// по клику на кнопку должен появиться alert с текстом
// (*)для выбравших способ 1 или 2 именно внутри данного события будет происходить подсчет итоговой суммы,
// вам нужно перебрать все элементы checkbox и input в цикле
btn.addEventListener("click", function() {
    if (userSurname.value === "" || userName.value === "") {
        alert("Введите своё имя и фамилию, пожалуйста.")
    } else {
        alert(`Заказчик: ${userSurname.value} ${userName.value}\nИтого: ${resultElem.textContent} р.`)

        for (let i = 0; i < goodsElements.length; i++) {
            goodsElements[i].checked = false;
            countElements[i].value = 0;

        resultElem.textContent = 0;
        userName.value = ""
        userSurname.value = ""
        }
    }
})