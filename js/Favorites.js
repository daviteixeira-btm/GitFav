/* Classe que vai conter a lógica dos dados e como eles
serão estruturados */

export class Favorites {
    constructor(root){
        this.root = document.querySelector(root);
    }
};

/* Classe que vai criar a visualização e os eventos do HTML */

export class FavoritesView extends Favorites {
    constructor(root){
        super(root);
        this.update();
    };

    update(){
        this.removeAllTr();
    };

    removeAllTr(){
        const tbody = this.root.querySelector("table tbody");

        tbody.querySelectorAll("tr")
            .forEach((tr) => {
                tr.remove();
            });
    };
};