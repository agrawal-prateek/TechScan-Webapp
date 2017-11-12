/**
 * Created by prateek on 11/12/17.
 */
document.getElementById('end').innerHTML = "text for padding";

document.getElementById('search-box').onchange = function () {
    let input = this.value;
    let subrow;
    let rows1 = document.getElementsByClassName('card-row');

    for (let i = 0; i < rows1.length; i++) {
        subrow = rows1[i];
        subrow.style.display = 'block';
        let childs = subrow.childNodes;
        for (let j = 0; j < childs.length; j++) {
            try {
                childs[j].style.display = 'block';
            }
            catch (err) {
            }
        }
    }
    if (input.length === 0)
        return true;
    const language = document.getElementsByClassName('language-name');
    let languages = [];
    let parent = [];
    for (let i = 0; i < language.length; i++) {
        languages.push(language[i].innerHTML);
        let parentObject = language[i].parentNode;
        parent.push(parentObject);
    }

    let temp = [];
    let found = [];
    let foundParent = [];
    for (let i = 0; i < input.length; i++) {

        if (input.charCodeAt(i) >= 97) {
            input = String.fromCharCode(input.charCodeAt(0) - 32);
        }
        for (let j = 0; j < languages.length; j++) {
            if (languages[j][i] === input[i]) {
                temp.push(languages[j]);
                found.push(parent[j]);
                foundParent.push(parent[j].parentNode);
                parent[j] = null;
            }
        }
    }
    for (let i = 0; i < parent.length; i++) {
        if (parent[i]) {
            let flag = 0;
            for (let j = 0; j < foundParent.length; j++) {
                if (parent[i].parentNode === foundParent[j]) {
                    flag = 1;
                    break;
                }
            }
            if (!flag) {
                parent[i].parentNode.style.display = "none";
            }
            parent[i].style.display = "none";
        }
    }
};