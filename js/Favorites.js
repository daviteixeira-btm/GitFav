/* Classe que vai conter a lógica dos dados e como eles
serão estruturados */

export class Favorites {
    constructor(root){
        this.root = document.querySelector(root);
        this.load();
    }

    load(){
        this.entries = [
            {
                login: "daviteixeira-btm",
                name: "Davi Teixeira",
                public_repos: "80",
                followers: "101"
            }
        ];
    };

    delete(user){
        // Higher-order functions (map, filter, find, reduce ...)
        const filteredEntries = this.entries
            .filter(entry => entry.login !== user.login);
    };
};

/* Classe que vai criar a visualização e os eventos do HTML */

export class FavoritesView extends Favorites {
    constructor(root){
        super(root);

        this.tbody = this.root.querySelector("table tbody");

        this.update();
    };

    update(){
        this.removeAllTr();

        this.entries.forEach(user => {
            const row = this.createRow();

            row.querySelector(".user img").src = `https://github.com/${user.login}.png`
            
            row.querySelector(".user img").alt = `Imagem de ${user.name}`;
            
            row.querySelector(".user p").textContent = user.name;

            row.querySelector(".user span").textContent = user.login;

            row.querySelector(".repositories").textContent = user.public_repos;

            row.querySelector(".followers").textContent = user.followers;

            row.querySelector(".remove").onclick = () => {
                const isOk = confirm("Tem certeza que deseja deletar essa linha?");

                if(isOk){
                    this.delete(user);
                }
            }

            this.tbody.append(row);
        });
    };

    createRow(){

        const tr = document.createElement('tr');

        tr.innerHTML = `
        <td class="user">
            <img src="https://github.com/daviteixeira-btm.png" alt="Imagem de daviteixeira-btm">
            <a href="https://github.com/daviteixeira-btm" target="_blank">
                <p>Davi Teixeira</p>
                <span>daviteixeira-btm</span>
            </a>
        </td>
        <td class="repositories">
            80
        </td>
        <td class="followers">
            101
        </td>
        <td>
            <button class="remove">&times;</button>
        </td>
        `

        return tr;
    }

    removeAllTr(){
        this.tbody.querySelectorAll("tr")
            .forEach((tr) => {
                tr.remove();
            });
    };
};