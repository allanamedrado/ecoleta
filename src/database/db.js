//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//iniciar o objeto que ira fazer operações no  banco de dados
const db = new sqlite3.Database("./src/database/database.db") //atribuindo a constante um objeto

module.exports = db

//utilizar o objeto de banco de dados para nossas operações 
/*db.serialize( () => {
    //Criar uma tabela com comandos sql
  db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //Inserir dados na tabela
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
    "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
    "Paperside",
    "Guilherme Gemballa, Jardim América",
    "Nº 260",
    "Santa Catarina",
    "Rio do Sul",
    "Papéis e Papelão"
]



function afterInsertData(err){
    if(err){
            return console.log(err)
        } else{
            console.log("Cadastrado com sucesso!")
            console.log(this)
        }
}

db.run(query, values, afterInsertData) //chamar a funcao depois portanto nao usa ()
      
//Consultar os dados da tabela
    db.all(`SELECT name FROM places`, function(err, rows){
      if(err){
         return console.log(err)
      } else{
           console.log("Aqui estão seus registros:")
           console.log(rows)
     }
   })
 
    //Deletar um dado da tabela
 db.run(`DELETE FROM places WHERE id = ?`, [6], function(err){
    if(err){
       return console.log(err)
    } else{
     console.log("Registro deletado com sucesso!")
   }
 })

})*/