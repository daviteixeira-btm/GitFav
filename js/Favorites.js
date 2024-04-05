export class GithubUser {
    static search(username){
        const endpoint = `https://api.github.com/users/${username}`;
        return fetch(endpoint)
        .then(data => data.json())
        .then(({ login, name, public_repos, followers }) => ({
            login,
            name,
            public_repos,
            followers
        }));
    };
};

/* Classe que vai conter a lógica dos dados e como eles
serão estruturados */

export class Favorites {
    constructor(root){
        this.root = document.querySelector(root);
        this.load();
    };

    load(){
        this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || []
    };

    save(){
        localStorage.setItem("@github-favorites:", JSON.stringify(this.entries));
    };

    async add(username){
        try {
            const user = await GithubUser.search(username);
            console.log(user);

            if(user.login === undefined){
                throw new Error("Usuário não encontrado!");
            }

            this.entries = [user, ...this.entries];
            this.update();
            this.save();

        }catch(error){
            alert(error.message);
        };
    };

    delete(user){
        // Higher-order functions (map, filter, find, reduce ...)
        const filteredEntries = this.entries
            .filter(entry => entry.login !== user.login);

        this.entries = filteredEntries;
        this.update();
        this.save();
    };
};

/* Classe que vai criar a visualização e os eventos do HTML */

export class FavoritesView extends Favorites {
    constructor(root){
        super(root);

        this.tbody = this.root.querySelector("table tbody");

        this.update();
        this.onadd();
    };

    onadd(){
        const addButton = this.root.querySelector(".search button");

        addButton.onclick = () => {
            const { value } = this.root.querySelector(".search input");

            this.add(value);
        }
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