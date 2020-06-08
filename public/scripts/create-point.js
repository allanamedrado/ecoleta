function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados") //busca estados
    .then( (res) => { return res.json() }) //transforma em json
    .then( states => { 
            for(state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs();

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = (event.target.value)

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ""
    citySelect.innerHTML = true

    fetch(url) //busca estados
    .then( (res) => { return res.json() }) //transforma em json
    .then( cities => {             
            for(city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)  
    
//itens de coleta pegar todos os lis

const itensToCollect = document.querySelectorAll(".items-grid li") //pegar todos os li

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItem = []

function handleSelectedItem(event){
    const itemLi = event.target

    //adc ou remover classe com js
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id // pegar cada id da li 

    //verificar se existem items selecionados, se sim pegar os items selecionados
    const alreadySelected = selectedItem.findIndex( item =>{
        const itemFound = item == itemId
        return itemFound
    })

    //se ja estiver selecionado, e clicar novamente, tirar da seleção
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItem.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent 
        })
        selectedItem = filteredItems
    } else {        
    //se não estiver selecionado, adicionar à seleção
    selectedItem.push(itemId)
    }
    console.log(selectedItem)

    //atualizar o campo escondido com os items selecionados
    collectedItems.value = selectedItem
}

