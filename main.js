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

function removeLastMinus(str){
    let idx = str.lastIndexOf('-')
    if (idx === -1) {
        return ''
    }
    let newStr = str.slice(0,idx) + str.slice(idx+1)

    return newStr
}

calculator.addEventListener('click',(e)=>{
    if (isNumber(e.target.textContent) && e.target.textContent.length < 2){
        if (e.target.textContent === '0' && result.textContent === '0'){        
            return
        }
        if (minCalc.textContent.includes('=') || result.textContent === '0') {            
            minCalc.textContent = ''
            result.textContent = isNumber(e.target.textContent) ? e.target.textContent : result.textContent
        }else{
            result.textContent += e.target.textContent            
        }
    }
        
    if ((minCalc.textContent.slice(-1) === '+' || minCalc.textContent.slice(-1) === '=') && +removeOperators(minCalc.textContent) === +result.textContent.slice(0,-1)){
        result.textContent = isNumber(e.target.textContent) ? e.target.textContent : result.textContent
    }
    if(e.target.textContent === '+' && !isNaN(result.textContent)){
        if(minCalc.textContent === '' && e.target.textContent === '+' && result.textContent === '') {
            return
        } else if(minCalc.textContent.includes('=') && e.target.textContent === '+') {
            minCalc.textContent = `${result.textContent} +`
        } else if(minCalc.textContent.trim().slice(-1) === '-' || minCalc.textContent.trim().slice(-1) === '*' || minCalc.textContent.trim().slice(-1) === '/'){
            let current = e.target.textContent
            let last = minCalc.textContent.slice(-1)
            let j = minCalc.textContent.lastIndexOf(last)            

            minCalc.textContent = minCalc.textContent.slice(0,j) + current + minCalc.textContent.slice(j + 1)
        } else {            
            minCalc.textContent = +minCalc.textContent.replace('+','') + +result.textContent + ' +'
            result.textContent = minCalc.textContent.replace('+','')            
        }
    }
    
    if (e.target.textContent === '=' && !(minCalc.textContent.at(-1) === '=') && minCalc.textContent !== '' && minCalc.textContent.includes('+')){
        
        let res = +minCalc.textContent.replace('+', '') + +result.textContent
        
        minCalc.textContent = `${minCalc.textContent} ${result.textContent} =`
        result.textContent = res
    }

// ------------------------------------------------------------------------------------------------------------------------

if ((minCalc.textContent.slice(-1) === '*' || minCalc.textContent.slice(-1) === '=') && +removeOperators(minCalc.textContent) === +result.textContent.slice(0,-1)){
        result.textContent = isNumber(e.target.textContent) ? e.target.textContent : result.textContent
    }
    if(e.target.textContent === '*' && !isNaN(result.textContent)){
        if(minCalc.textContent === '' && e.target.textContent === '*' && result.textContent === '') {
            return
        } else if(minCalc.textContent.includes('=') && e.target.textContent === '*') {
            minCalc.textContent = `${result.textContent} *` 
            
        } else if(minCalc.textContent.trim().slice(-1) === '-' || minCalc.textContent.trim().slice(-1) === '+' || minCalc.textContent.trim().slice(-1) === '/'){
            let current = e.target.textContent
            let last = minCalc.textContent.slice(-1)
            let j = minCalc.textContent.lastIndexOf(last)            

            minCalc.textContent = minCalc.textContent.slice(0,j) + current + minCalc.textContent.slice(j + 1)    
                    
        } else {            
            minCalc.textContent = +minCalc.textContent.replace('*','') ?
                 +minCalc.textContent.replace('*','')  * +result.textContent + ' *' : 
                    +minCalc.textContent.replace('*','')  + +result.textContent + ' *'
            result.textContent = minCalc.textContent.replace('*','')
        }
    }
    if (e.target.textContent === '=' && !(minCalc.textContent.at(-1) === '=') && minCalc.textContent !== '' && minCalc.textContent.includes('*')) {
        let res = +minCalc.textContent.replace('*', '') * +result.textContent
        minCalc.textContent = `${minCalc.textContent} ${result.textContent} =`
        result.textContent = res
    }

    // -------------------------------------------------------------------------------------------------------------------------------

    let plusKamMinus = +result.textContent.slice(0,-1) > 0 ? +result.textContent.slice(0,-1) : +result.textContent.slice(0,-1)    
    if ((minCalc.textContent.slice(-1) === '-' || minCalc.textContent.slice(-1) === '=') && +removeOperators(minCalc.textContent) === plusKamMinus){
        result.textContent = isNumber(e.target.textContent) ? e.target.textContent : result.textContent                 
    }
    if(e.target.textContent === '-' && !isNaN(result.textContent)){
        if(minCalc.textContent === '' && e.target.textContent === '-' && result.textContent === '') {
            return
        } else if(minCalc.textContent.includes('=') && e.target.textContent === '-') {
            minCalc.textContent = `${result.textContent} -` 
        } else if(minCalc.textContent.trim().slice(-1) === '+' || minCalc.textContent.trim().slice(-1) === '*' || minCalc.textContent.trim().slice(-1) === '/'){                 
            let current = e.target.textContent
            let last = minCalc.textContent.slice(-1)
            let j = minCalc.textContent.lastIndexOf(last)            

            minCalc.textContent = minCalc.textContent.slice(0,j) + current + minCalc.textContent.slice(j + 1)
        } else {
            let minusOrPlus = removeLastMinus(minCalc.textContent) >= 0 ? +result.textContent : -result.textContent

            minCalc.textContent = +minCalc.textContent.replace('-','').trim() ?
                 +removeLastMinus(minCalc.textContent)  - +result.textContent + ' -' : 
                    +removeLastMinus(minCalc.textContent)  + minusOrPlus + ' -'
            result.textContent = removeLastMinus(minCalc.textContent)            
        }
    }

    if (e.target.textContent === '=' && minCalc.textContent.at(-1) !== '=' && minCalc.textContent !== '' && minCalc.textContent.includes('-') &&  !minCalc.textContent.includes('/')) {    
        let res = +removeLastMinus(minCalc.textContent) - +result.textContent
        minCalc.textContent = `${minCalc.textContent} ${result.textContent} =`
        result.textContent = res
    }

    // --------------------------------------------------------------------------------------------------------------------------------

    if ((minCalc.textContent.slice(-1) === '/' || minCalc.textContent.slice(-1) === '=') && +removeOperators(minCalc.textContent) === +result.textContent.slice(0,-1)){
        result.textContent = isNumber(e.target.textContent) ? e.target.textContent : result.textContent        
    }

    if(e.target.textContent === '/' && !isNaN(result.textContent)){
        if(minCalc.textContent === '' && e.target.textContent === '/' && result.textContent === '') {
            return
        }else if(minCalc.textContent.includes('=') && e.target.textContent === '/') {
            minCalc.textContent = `${result.textContent} /`             
        } else if(minCalc.textContent.trim().slice(-1) === '+' || minCalc.textContent.trim().slice(-1) === '*' || minCalc.textContent.trim().slice(-1) === '-'){
            let current = e.target.textContent
            let last = minCalc.textContent.slice(-1)
            let j = minCalc.textContent.lastIndexOf(last)            

            minCalc.textContent = minCalc.textContent.slice(0,j) + current + minCalc.textContent.slice(j + 1)
        } else{
            minCalc.textContent = +minCalc.textContent.replace('/','') ?
                 +minCalc.textContent.replace('/','')  / +result.textContent + ' /' : 
                    +minCalc.textContent.replace('/','')  + +result.textContent + ' /'
            result.textContent = minCalc.textContent.replace('/','')
        }
    }

    if (e.target.textContent === '='  && minCalc.textContent !== '' && minCalc.textContent.includes('/')) {
        let res = +minCalc.textContent.replace('/','') / +result.textContent
        
        minCalc.textContent = `${minCalc.textContent} ${result.textContent} =`
        result.textContent = res
    }

    if (e.target.textContent === ',') {
        if (!result.textContent.includes('.')) {
            result.textContent = result.textContent.slice(0) + '.'
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