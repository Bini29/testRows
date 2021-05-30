import jsa from 'obj.js';


class Tables {

    constructor(table) {
        this.table = table;
        this.body();
        this.sort(); 
    }

    body (){ //Отрисовка таблицы
        let container = document.createElement("div");

        container.classList.add("container");
        document.body.append(container);

        let tables = document.createElement("table");
        let thead = document.createElement("tr");

        container.insertAdjacentHTML("afterbegin",`
        <div class="sortBtnList">
            <button class="sortname">Сортировать по названию</button>
            <button class="sort-prise">Сортировать по количеству</button>
        </div>
        `);

        container.append(tables);

        tables.append(thead);

        thead.insertAdjacentHTML("beforeend",` 
        <th>Название товара</th>
        <th> Цвет </th>
        <th> Размер </th>
        <th> Количество </th>
        <th> цена </th>
        `);

        
        let tbody = document.createElement("tbody");

        tables.append(tbody);

        let product = Object.values(this.table);
        let dataCircle;
        // console.log(product);
        let name;
        let valcir;
        let circleList = document.createElement("div");
        circleList.classList.add("circleList");
        container.append(circleList);
        for (let i = 0; i < product.length; i++) {

        const element = Object.values(product);

        let obs = Object.values(element[i]);

        name = element[i].name;
        let nameColor = element[i].color.name;
        let nameColorValue = element[i].color.value;

        // let g4 = Object.values(obs[2]);
        
        valcir = [];
        
        for (const i in Object.values(obs[2])) {
            if (Object.hasOwnProperty.call(Object.values(obs[2]), i)) {

                const element = Object.values(obs[2])[i];

                valcir.push(element.available);

                
                tbody.insertAdjacentHTML("beforeend",`
                <td class="name">${name}<span style="background-color:${nameColorValue}"></span></td>
                <td style="background-color:${nameColorValue}">${nameColor}</td>
                <td>${element.name}</td>
                <td>${element.available}</td>
                <td class="prise">${element.price}</td>
                `);
            }
        }

        dataCircle = function (name,data) { //Данные для диаграммы , имя в диаграмме, соличество размеров

            let dataColor = getRandomColor(data);

            let paramsar = {
                labels:[],
                datasets: [
                    {
                        label: `Количество всех размеров ${name}`,
                        data: data,
                        backgroundColor: dataColor,
                        borderColor: dataColor,
                        borderWidth: 1 
                    }
                ]

            };
            function getRandomColor(data) { //Рандомный цвет дли диаграммы
                
                let colorAr = [];  

                // console.log(colorAr);

                for (let i = 0; i < data.length; i++) {
                let letters = '0123456789ABCDEF'.split('');
                let color = "#";

                for (let
                     i = 0; i < 6; i++ ) {
                    color += (letters[Math.floor(Math.random() * 16)]);
                } 
                colorAr.push(color);
                }

               return colorAr;
        
            }
            return paramsar;
        };

        // console.log(dataCircle(name,valcir));
        // console.log(name);
        let item = document.createElement("div");

        item.classList.add("d-list");

        circleList.append(item);

        item.append(this.diagramma (dataCircle(name,valcir),name));
    }
    
    }
    sort(){ // Сортировка
        let btnSortName = document.querySelector(".sortname");
        let btnSortPrise = document.querySelector(".sort-prise");
        let table = document.querySelector("table");

        btnSortName.addEventListener("click",function (event) {

        sort(this,"sortname",0);

        });

        btnSortPrise.addEventListener("click",function (event) {

        sort(this,"sort-prise",3);

        });

        let sort = function (btn, classnbtn, rows) { //Функция для сортировки

            btn.classList.toggle("sort"); 

            let nosortedRows = Array.from(table.rows);
            
        if (event.target.className == `${classnbtn} sort`) {
            let sortedRows = Array.from(table.rows)

            .slice(1)
        
            .sort((rowA, rowB) => rowA.cells[rows].innerHTML < rowB.cells[rows].innerHTML ? 1 : -1);
        
            table.tBodies[0].append(...sortedRows);
            
        }
        else {
            let sortedRows = Array.from(table.rows)

            .slice(1)
        
            .sort((rowA, rowB) => rowA.cells[rows].innerHTML > rowB.cells[rows].innerHTML ? 1 : -1);
        
            table.tBodies[0].append(...sortedRows);
            
            }
        };

    }
    diagramma (data,name){ //Отрисовка диагарммы

        name = name.split(" ").join("-");
        // console.log(name);

        let canvasCircle = document.createElement("canvas");
        
        canvasCircle.classList.add(`${name}`);

        canvasCircle.getContext('2d');

        let ctx = canvasCircle;


        let myChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: `Количество всех размеров ${name}`
                    }
                }
            }
        });
        // console.log(canvasCircle);
        return canvasCircle;

    }
}


let td = new Tables(jsa);
