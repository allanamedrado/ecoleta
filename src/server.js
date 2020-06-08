const express = require("express") //usar o express
const server = express() //executando a funcao express no server, e sera um objeto de servidor

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta public para ter acesso aos css
server.use(express.static("public"))

//habilitar o uso do req body na aplicacao
server.use(express.urlencoded({ extended: true })) 

//utilizando template engine nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
        express: server,
        noCache: true
})

//configurar caminhos da minha aplicação
//pagina inicial

server.get("/", function(req, res){

        return res.render( "index.html", { title: "Um titulo"}) //render com o nunjucks
})

server.get("/create-point", (req, res) =>{

        //req query trabalha com as query string com as infos da url
        
        return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

        //req body é o mesmo q o corpo do formulario
        //console.log(req.body)

        //inserir dados no bd
        const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
`

        const values = [    
                req.body.image,
                req.body.name,
                req.body.address,
                req.body.address2,
                req.body.state,
                req.body.city,
                req.body.items 
        ]



        function afterInsertData(err){
                if(err){
                        console.log(err)
                        return res.send("Erro no cadastro")
                        } else{
                        console.log("Cadastrado com sucesso!")
                        console.log(this)
                        }
                }

db.run(query, values, afterInsertData) //chamar a funcao depois portanto nao usa ()
      

        return res.render("create-point.html", { saved: true })
})

server.get("/search", (req, res) =>{

        const search = req.query.search
        
        if(search == ""){
                //pesquisa vazia
                //mmostrar a pagina html com os dados do bd
               return res.render("search-results.html", { total: 0 })

        }


        //pegar os dados do bd
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
                if(err){
                   return console.log(err)
                } 

                const total = rows.length

               //mmostrar a pagina html com os dados do bd
               return res.render("search-results.html", { places: rows, total })

        })
})


//ligar o servidor
server.listen(3000)