let calculator = document.querySelector('.bottom')
let result = document.querySelector('.result')
let minCalc = document.querySelector('.minCalc')

function isNumber(str){
    return str !== '' && !isNaN(str)
}

function removeOperators(str){
    let newStr = ''

    for (let i = 0; i < str.length; i++) {
        if (isNumber(str[i]) || str[i] === '.' || (str[i] === '-' && isNumber(str[i+1]))) {
            newStr += str[i]
        }
    }
    return newStr
}

function createOperator(str){
    let arr = str.split(' ')

    switch(arr[1]) {
        case '+':
            return +arr[0] + +arr[2]
        case '-':
            return +arr[0] - +arr[2]
        case '*':
            return +arr[0] * +arr[2]
        case '/':
            return +arr[0] / +arr[2]
    }
}

function removeLastMinus(str){
    let idx = str.lastIndexOf('-')
    if (idx === -1) {
        return ''
    }
    let newStr = str.slice(0,idx) + str.slice(idx+1)

    return newStr
}

function binaryToDecimal(str){
    let res 
    let arr = str.split(' ')
    let n = arr[0].split('.')[1].length
    let m = arr[2].split('.')[1].length
    let operator = arr[1]

    switch(operator){
        case '+':
            return res = ((arr[0] * 10**n + arr[2] * 10**m) / 10**n)
        case '-':
            return res = ((arr[0] * 10**n - arr[2] * 10**m) / 10**n)
        case '*':
            return res = (arr[0] * 10**n) * (arr[2] * 10**m) / 10**(n+m)
        case '/':
            if (n >= m) {
                return res = (arr[0] * 10**n) / (arr[2] * 10**m) / 10**(n-m)
            }else{
                return res = (arr[0] * 10**n) / (arr[2] * 10**m) * 10**(m-n)
            }
    }
    return res
}

calculator.addEventListener('click',(e)=>{
    if (isNumber(e.target.textContent) && e.target.textContent.length < 2){
        if (e.target.textContent === '0' && result.textContent === '0'){        
            return
        }
        if (minCalc.textContent.includes('=')) {            
            minCalc.textContent = ''
            result.textContent = isNumber(e.target.textContent) ? e.target.textContent : result.textContent
        }else{
            if (result.textContent == 0 && result.textContent.slice(-1) != '.') {
                result.textContent = e.target.textContent
            }else{
                result.textContent += e.target.textContent
            }         
        }
    }

    if ((minCalc.textContent.slice(-1) === '+' || minCalc.textContent.slice(-1) === '=')){
        if (!(+result.textContent) && result.textContent != 0){
            result.textContent = e.target.textContent
        }
    }
    if(e.target.textContent === '+' && !isNaN(result.textContent)){
        if(minCalc.textContent === '' && e.target.textContent === '+' && result.textContent === '') {
            return
        } else if(minCalc.textContent.includes('=') && e.target.textContent === '+') {
            minCalc.textContent = `${result.textContent} +`            
            result.textContent = result.textContent + ' '  
            console.log(minCalc.textContent);
        } else if(minCalc.textContent.trim().slice(-1) === '-' || minCalc.textContent.trim().slice(-1) === '*' || minCalc.textContent.trim().slice(-1) === '/'){
            let currentOp = e.target.textContent
            let onGoingOp = minCalc.textContent.slice(-1)            
            let arr = minCalc.textContent.split(' ')
            if (arr[0] > 0) {
                minCalc.textContent = createOperator(`${+minCalc.textContent.replace(onGoingOp,'').trim()} ${onGoingOp} ${+result.textContent} `) + ' ' + currentOp
            }else{
                let idx = minCalc.textContent.lastIndexOf(onGoingOp)
                minCalc.textContent = createOperator(`${+minCalc.textContent.slice(0,idx)} ${onGoingOp} ${+result.textContent} `) + ' ' + currentOp
            }
            result.textContent = minCalc.textContent.replace('+', ' ')
        } else {   
            if (minCalc.textContent.includes('.') && result.textContent.includes('.')) {
                let str = `${minCalc.textContent} ${result.textContent}`
                minCalc.textContent = binaryToDecimal(str) + ' +'
            }else{
                minCalc.textContent = +minCalc.textContent.replace('+','') + +result.textContent + ' +'
            }
            result.textContent = minCalc.textContent.replace('+','')
        }
    }
    
    if (e.target.textContent === '=' && !(minCalc.textContent.at(-1) === '=') && minCalc.textContent !== '' && minCalc.textContent.includes('+')){
        if (minCalc.textContent.replace('+', '').includes('.') && result.textContent.includes('.')) {
            let str = `${minCalc.textContent} ${result.textContent}`
            let res = binaryToDecimal(str)
            minCalc.textContent = `${minCalc.textContent} ${result.textContent} =`
            result.textContent = res
        }else{
            let res = +minCalc.textContent.replace('+', '') + +result.textContent
            minCalc.textContent = `${minCalc.textContent} ${result.textContent} =`
            result.textContent = res
        }
    }

// ------------------------------------------------------------------------------------------------------------------------

if ((minCalc.textContent.slice(-1) === '*' || minCalc.textContent.slice(-1) === '=') && isNumber(e.target.textContent)){
        if (!(+result.textContent)){
            result.textContent = e.target.textContent
        }
    }
    if(e.target.textContent === '*' && !isNaN(result.textContent)){
        if(minCalc.textContent === '' && e.target.textContent === '*' && result.textContent === '') {
            return
        } else if(minCalc.textContent.includes('=') && e.target.textContent === '*') {
            minCalc.textContent = `${result.textContent} *` 
            result.textContent = result.textContent + ' '
        } else if(minCalc.textContent.trim().slice(-1) === '-' || minCalc.textContent.trim().slice(-1) === '+' || minCalc.textContent.trim().slice(-1) === '/'){
            let currentOp = e.target.textContent
            let onGoingOp = minCalc.textContent.slice(-1)
            
            let arr = minCalc.textContent.split(' ')

            if (arr[0] > 0) {
                minCalc.textContent = createOperator(`${+minCalc.textContent.replace(onGoingOp,'').trim()} ${onGoingOp} ${+result.textContent} `) + ' ' + currentOp
            }else{
                let idx = minCalc.textContent.lastIndexOf(onGoingOp)
                minCalc.textContent = createOperator(`${+minCalc.textContent.slice(0,idx)} ${onGoingOp} ${+result.textContent} `) + ' ' + currentOp
            }
            result.textContent = minCalc.textContent.replace('*', ' ')       
        } else {
            if (minCalc.textContent === '') {
                minCalc.textContent = +result.textContent + ' *'
            }else{
                if (minCalc.textContent.includes('.') && result.textContent.includes('.')) {
                    let str = `${minCalc.textContent} ${result.textContent}`
                    minCalc.textContent = binaryToDecimal(str) + ' *'   
                }else{
                    minCalc.textContent = result.textContent * minCalc.textContent.replace('*','') + ' *'
                }
            }
            result.textContent = minCalc.textContent.replace('*','')
        }
    }
    if (e.target.textContent === '=' && !(minCalc.textContent.at(-1) === '=') && minCalc.textContent !== '' && minCalc.textContent.includes('*')) {
        
        if (minCalc.textContent.replace('*','').includes('.') && result.textContent.includes('.')) {
            let str = `${minCalc.textContent} ${result.textContent}`
            let res = binaryToDecimal(str)
            minCalc.textContent = `${minCalc.textContent} ${result.textContent} =`
            result.textContent = res
        }else{
            let res = +minCalc.textContent.replace('*', '') * +result.textContent
            minCalc.textContent = `${minCalc.textContent} ${result.textContent} =`
            result.textContent = res
        }
    }
    // -------------------------------------------------------------------------------------------------------------------------------

    let plusKamMinus = +result.textContent.slice(0,-1) > 0 ? +result.textContent.slice(0,-1) : +result.textContent.slice(0,-1)    
    if ((minCalc.textContent.slice(-1) === '-' || minCalc.textContent.slice(-1) === '=') && +removeOperators(minCalc.textContent) === plusKamMinus){        
        if (!(+result.textContent)){
            result.textContent = e.target.textContent
        }
    }
    if(e.target.textContent === '-' && !isNaN(result.textContent)){
        if(minCalc.textContent === '' && e.target.textContent === '-' && result.textContent === '') {
            return
        } else if(minCalc.textContent.includes('=') && e.target.textContent === '-') {
            minCalc.textContent = `${result.textContent} -`
            result.textContent = result.textContent + ' '
        } else if(minCalc.textContent.trim().slice(-1) === '+' || minCalc.textContent.trim().slice(-1) === '*' || minCalc.textContent.trim().slice(-1) === '/'){                 
            let currentOp = e.target.textContent
            let onGoingOp = minCalc.textContent.slice(-1)            
            minCalc.textContent = createOperator(`${+minCalc.textContent.replace(onGoingOp,'').trim()} ${onGoingOp} ${+result.textContent} `) + ' ' + currentOp
            let secondMinus = minCalc.textContent.lastIndexOf('-')
            result.textContent = minCalc.textContent.slice(0,secondMinus) + minCalc.textContent.slice(secondMinus + 1)
        } else {
            let minusOrPlus = removeLastMinus(minCalc.textContent) >= 0 ? +result.textContent : -result.textContent

            if (minCalc.textContent.includes('.') && result.textContent.includes('.')) {
                let str = `${minCalc.textContent} ${result.textContent}`
                minCalc.textContent = binaryToDecimal(str) + ' -'
                result.textContent = removeLastMinus(minCalc.textContent) 
                
            }else{
                minCalc.textContent = +minCalc.textContent.replace('-','').trim() ?
                 +removeLastMinus(minCalc.textContent)  - +result.textContent + ' -' : 
                    +removeLastMinus(minCalc.textContent)  + minusOrPlus + ' -'
                    
                result.textContent = removeLastMinus(minCalc.textContent) 
            }
        }
    }

    if (e.target.textContent === '=' && minCalc.textContent.at(-1) !== '=' && minCalc.textContent !== '' && minCalc.textContent.includes('-') &&  !minCalc.textContent.includes('/')) {    
        if (+removeLastMinus(minCalc.textContent).includes('.') && result.textContent.includes('.')) {
            let str = `${minCalc.textContent} ${result.textContent}`
            let res = binaryToDecimal(str)
            minCalc.textContent = `${minCalc.textContent} ${result.textContent} =`
            result.textContent = res
        }else{
            let res = +removeLastMinus(minCalc.textContent) - +result.textContent
            minCalc.textContent = `${minCalc.textContent} ${result.textContent} =`
            result.textContent = res
        }
    }

    // --------------------------------------------------------------------------------------------------------------------------------

    if ((minCalc.textContent.slice(-1) === '/' || minCalc.textContent.slice(-1) === '=') && isNumber(e.target.textContent)){
        if (!(+result.textContent)){
            result.textContent = e.target.textContent
        }   
    }

    if(e.target.textContent === '/' && !isNaN(result.textContent)){
        if(minCalc.textContent === '' && e.target.textContent === '/' && result.textContent === '') {
            return
        }else if(minCalc.textContent.includes('=') && e.target.textContent === '/') {
            minCalc.textContent = `${result.textContent} /`
            result.textContent = result.textContent + ' '
        } else if(minCalc.textContent.trim().slice(-1) === '+' || minCalc.textContent.trim().slice(-1) === '*' || minCalc.textContent.trim().slice(-1) === '-'){
            let currentOp = e.target.textContent
            let onGoingOp = minCalc.textContent.slice(-1)
            let arr = minCalc.textContent.split(' ')

            if (arr[0] > 0) {
                minCalc.textContent = createOperator(`${+minCalc.textContent.replace(onGoingOp,'').trim()} ${onGoingOp} ${+result.textContent} `) + ' ' + currentOp
            }else{
                let idx = minCalc.textContent.lastIndexOf(onGoingOp)
                minCalc.textContent = createOperator(`${+minCalc.textContent.slice(0,idx)} ${onGoingOp} ${+result.textContent} `) + ' ' + currentOp
            }
            result.textContent = minCalc.textContent.replace('/', ' ')
        } else{
            if (minCalc.textContent.includes('.') && result.textContent.includes('.')) {
                let str = `${minCalc.textContent} ${result.textContent}`
                minCalc.textContent = binaryToDecimal(str) + ' /'
                result.textContent = minCalc.textContent.replace('/','')
            }else{
                minCalc.textContent = +minCalc.textContent.replace('/','') ?
                 +minCalc.textContent.replace('/','')  / +result.textContent + ' /' : 
                    +minCalc.textContent.replace('/','')  + +result.textContent + ' /'
                result.textContent = minCalc.textContent.replace('/','')
            }
        }
    }

    if (e.target.textContent === '='  && minCalc.textContent !== '' && minCalc.textContent.includes('/')) {
        let res = +minCalc.textContent.replace('/','') / +result.textContent
        
        minCalc.textContent = `${minCalc.textContent} ${result.textContent} =`
        result.textContent = res
    }

    if (e.target.textContent === ',') {
        if (!result.textContent.includes('.') && result.textContent != '') {
            result.textContent = result.textContent + '.'
        }
    }

    if (e.target.textContent === '+/-') {
        if (result.textContent.startsWith('-')) {
            result.textContent = result.textContent.slice(1)
        }else{
            result.textContent = `-${result.textContent}`
        }
    }

    if (e.target.textContent === 'C') {
        result.textContent = ''
        minCalc.textContent = ''
    }
})