const fs = require('fs');

const get = async (req, res, next) => {

    var file, text = '';
    var extesion = '.txt';
    var lista = [];

    for (let i = 1; i <= 2; i++) {
        file = `files/${i.toString()}${extesion}`;

        text = await leitura(file);
        text = filtro(text);

        text.forEach((element,iPalavra) => {
            var palavra = {indexFile: i, indexPalavra: iPalavra, palavra: element};
            lista.push(palavra);
        });
        
    }
    // file = `files/tornados.txt`;

    // text = await leitura(file);
    // text = filtro(text);

    // text.forEach((element,iPalavra) => {
    //     var palavra = {
    //         indexFile: 1, 
    //         indexPalavra: iPalavra, 
    //         palavra: element.toLowerCase()
    //     };
    //     lista.push(palavra);
    // });

    const countFile1 = countPalavrasFiles(lista, 1);
    const countFile2 = countPalavrasFiles(lista, 2);

    const junta = juntaPalavras(lista);
    var ascending = junta.sort((a, b) => Number(b.qtd) - Number(a.qtd));

    res.render('index', { title: JSON.stringify(ascending) });
    // res.render('index', { title: JSON.stringify(lista) });
   
};

const countPalavrasFiles = (lista, file) => {
    var l = lista.filter(element => element.indexFile === file);
    return l.length;
};

const juntaPalavras = (lista) => {
    var array = [];
    var palavras = [];
    lista.forEach(element => {
        var jaContemArray = palavras.includes(element.palavra.toLowerCase());
        if (!jaContemArray) {
            const conjunto = lista.filter(e => e.palavra.toLowerCase() === element.palavra.toLowerCase());
            const data = {
                chave: element.palavra.toLowerCase(),
                qtd: conjunto.length,
                // lista: conjunto
            };
            array.push(data);
        }
        palavras.push(element.palavra.toLowerCase());
    });
    return array;
};

const leitura = (file) => {
    return new Promise((resolve,reject)=>{
        fs.readFile(file, 'utf8', (err, contents) => {
            resolve(contents);
        });
    });
};

const filtro = (text) => {
    var filter = text.replace(',','').replace('.','').replace(';','');
    return filter.split(" ");
};

module.exports = {
    get: get
};