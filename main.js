// დავალება 1

function expo(num, x, cb){
    if ( x === 1) return num
    let result = 1 
    return num * expo(cb(result, num), x-1, cb)
}

const a = expo(5, 3, (result, num) => result *= num)

console.log(a)



// დავალება 2

async function fetchData(){
    try{
        const rawData = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (!rawData.ok){
            console.log('Request went wrong')
            }

        const data = await rawData.json()

        data.forEach((el) => {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="elements_cover">
                    <h3>${el.title}</h3>
                    <div class="elements_descr">${el.body}</div>
                </div>
                `;

            
            const div = document.querySelector('.elements')
            div.append(element)
            
        });
        }
    catch(error){
        console.log(error.message)
    }

}

fetchData()



// დავალება 3

const person = {
    name: "Andrew",
    address: {
        tbilisi: {
            district: "Varketili"
        }
    },
    friends: [
        {closeFriend: { name: "Giorgi" }},
        {closeFriend: { name: "Sandro" }}
    ]
}

async function deepCopy(obj){
    return new Promise((resolve, reject) =>{
        if (typeof obj !== 'object'){
            reject('Not an object')
        }else{
            let result = {}
    
            for (let fn in obj){
                if (typeof obj[fn] === 'object'){
                    if(Array.isArray(obj[fn])){
                        result[fn] = obj[fn].map( el => deepCopy(el))                       
                    }else{
                        result[fn] = deepCopy(obj[fn])
                    }
                }
                else{
                    result[fn] = obj[fn];
                }
            }
    
            resolve(result)
    
        }
    })
}

async function promisify(){
    try{
        const objCopy = await  deepCopy(person)
        console.log(objCopy)
    }catch(error){
        console.log(error.message)

    }
}

promisify()

    



