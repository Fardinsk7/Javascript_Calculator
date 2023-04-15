class Calculator{
    constructor(previousScreenText,currentScreenText){
        this.previousScreenText =previousScreenText
        this.currentScreenText= currentScreenText
        this.clear()
    }
    clear(){
        this.currentText=''
        this.previousText = ''
        this.operation = undefined
    }

    delete(){
        this.currentText = this.currentText.toString().slice(0, -1)
    }

    // appendNumber(number){
    //     if(number === '.'&& this.currentText.includes('.'))return
    //     this.currentText=this.currentText.toString() + number.toString()

    // }
    appendNumber(number){
        if(number === '.' && this.currentText.includes('.')) return
        this.currentText = this.currentText.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentText ==='')return
        if(this.previousText != null){
            this.compute()
        }
        this.operation = operation
        this.previousText = this.currentText
        this.currentText =''
        console.log(operation)
    }

    compute(){
        let computation
        const pre= parseFloat(this.previousText)
        const cur = parseFloat(this.currentText)
        if(isNaN(pre) || isNaN(cur)) return
        switch(this.operation){
            case '+':
                computation = pre + cur
                break
            case '-':
                computation = pre - cur
                break
            case '*':
                computation = pre * cur
                break
            case '/':
                computation = pre / cur
                break
            default:
                return
        }
        this.previousText = ''
        this.currentText = computation
        this.operation = undefined

    }
    getDisplay(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let i
        if(isNaN(integerDigits)){
            i =''
        }
        else{
            i = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${i}.${decimalDigits}`
        }
        else{
            return i
        }
    }

   
   

    updateDisplay(){
        this.currentScreenText.innerHTML= this.getDisplay(this.currentText)
        // this.currentScreenText.innerHTML= this.currentText
        if(this.operation != null){
            this.previousScreenText.innerHTML= `${this.getDisplay(this.previousText)} ${this.operation}`

        }
        else{
            this.previousScreenText.innerHTML =''
        }

    }
}





const numberButtons = document.querySelectorAll('[data-numbers]')
const operationButtons = document.querySelectorAll('[data-operations]')
const AllClearButtons = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousScreenText = document.querySelector('[data-previous]')
const currentScreenText = document.querySelector('[data-current]')
const equalsButton = document.querySelector('[data-equals]')


const calculator = new Calculator(previousScreenText,currentScreenText)

numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})



AllClearButtons.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})