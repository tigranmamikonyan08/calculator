const calculator = document.querySelector('.bottom')
const result = document.querySelector('.result')
const minCalc = document.querySelector('.minCalc')

calculator.addEventListener('click',(e)=>{
    if (/\d/.test(e.target.textContent) && e.target.textContent.length < 2){
        if (minCalc.textContent.includes('=')) {            
            minCalc.textContent = ''
            result.textContent = /\d/.test(e.target.textContent) ? e.target.textContent : result.textContent   
        }else{
            result.textContent += e.target.textContent            
        }
    }
    if ((minCalc.textContent.slice(-1) === '+' || minCalc.textContent.slice(-1) === '=') && +minCalc.textContent.replace(/[+=]/g,'') === +result.textContent.slice(0,-1)){
        result.textContent = /\d/.test(e.target.textContent) ? e.target.textContent : result.textContent
        
    }
    if(e.target.textContent === '+'){
        if(minCalc.textContent === '' && e.target.textContent === '+' && result.textContent === '') {
        } else if(minCalc.textContent.includes('=') && e.target.textContent === '+') {
            minCalc.textContent = `${result.textContent} +` 
            console.log('kkk');

        } else if(minCalc.textContent.trim().slice(-1) === '-' || minCalc.textContent.trim().slice(-1) === '*' || minCalc.textContent.trim().slice(-1) === '/'){
            let current = e.target.textContent
            let last = minCalc.textContent.slice(-1)
            let j = minCalc.textContent.lastIndexOf(last)            

            minCalc.textContent = minCalc.textContent.slice(0,j) + current + minCalc.textContent.slice(j + 1)
        } else {
            
            console.log(+minCalc.textContent.replace('+',''), +result.textContent);
            
            minCalc.textContent = +minCalc.textContent.replace('+','') + +result.textContent + ' +'
            result.textContent = minCalc.textContent.replace('+','')
        }
    }
    
    if (e.target.textContent === '=' && !(minCalc.textContent.at(-1) === '=') && minCalc.textContent !== '' && minCalc.textContent.includes('+')) {    
        const res = +minCalc.textContent.replace('+', '') + +result.textContent
        minCalc.textContent = `${minCalc.textContent} ${result.textContent} =`
        result.textContent = res        
    }

// ------------------------------------------------------------------------------------------------------------------------

if ((minCalc.textContent.slice(-1) === '*' || minCalc.textContent.slice(-1) === '=') && +minCalc.textContent.replace(/[*=]/g,'') === +result.textContent.slice(0,-1)){
        result.textContent = /\d/.test(e.target.textContent) ? e.target.textContent : result.textContent
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
        const res = +minCalc.textContent.replace('*', '') * +result.textContent
        minCalc.textContent = `${minCalc.textContent} ${result.textContent} =`
        result.textContent = res
    }

    // -------------------------------------------------------------------------------------------------------------------------------

    let plusKamMinus = +result.textContent.slice(0,-1) > 0 ? +result.textContent.slice(0,-1) : +(-result.textContent.slice(0,-1))
    if ((minCalc.textContent.slice(-1) === '-' || minCalc.textContent.slice(-1) === '=') && +minCalc.textContent.replace(/[-=]/g,'') === plusKamMinus){
        result.textContent = /\d/.test(e.target.textContent) ? e.target.textContent : result.textContent             
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
            let minusOrPlus = minCalc.textContent.replace(/-(?=[^-]*$)/, '') >= 0 ? +result.textContent : -result.textContent
            
            minCalc.textContent = +minCalc.textContent.replace('-','').trim() ?
                 +minCalc.textContent.replace(/-(?=[^-]*$)/, '').trim()  - +result.textContent + ' -' : 
                    +minCalc.textContent.replace(/-(?=[^-]*$)/, '').trim()  + minusOrPlus + ' -'
            result.textContent = minCalc.textContent.replace(/-(?=[^-]*$)/, '')
        }
    }

    if (e.target.textContent === '=' && !(minCalc.textContent.at(-1) === '=') && minCalc.textContent !== '' && minCalc.textContent.includes('-')) {    
        const res = +minCalc.textContent.replace(/-(?=[^-]*$)/, '') - +result.textContent
        minCalc.textContent = `${minCalc.textContent} ${result.textContent} =`
        result.textContent = res
    }

    // --------------------------------------------------------------------------------------------------------------------------------

    if ((minCalc.textContent.slice(-1) === '/' || minCalc.textContent.slice(-1) === '=') && +minCalc.textContent.replace(/[/=]/g,'') === +result.textContent.slice(0,-1)){
        result.textContent = /\d/.test(e.target.textContent) ? e.target.textContent : result.textContent
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
                 +minCalc.textContent.replace('/','')  * +result.textContent + ' /' : 
                    +minCalc.textContent.replace('/','')  + +result.textContent + ' /'
            result.textContent = minCalc.textContent.replace('/','')
        }
    }

    if (e.target.textContent === '=' && !(minCalc.textContent.at(-1) === '=') && minCalc.textContent !== '' && minCalc.textContent.includes('/')) {                
        const res = +minCalc.textContent.replace('/', '') / +result.textContent
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

