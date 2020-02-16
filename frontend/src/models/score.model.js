import axios from 'axios'

export default async function isWordValid(word) {
    let url = 'https://dictionaryapi.com/api/v3/references/collegiate/json/'+word+'?key=09fb0fc9-618d-4c2c-a04a-81417adbd811'
    try {
        const response = await axios.get(url)
        let responseData = response.data
        let responseDataLength = responseData.length
        console.log('result from api: ')
        console.log(response.data)
        if (responseDataLength === 0) {
            return false
        }
        else {
            return typeof responseData[0] === 'object'
        }
    } catch (error) {
        console.log('Error in checking validity of word with dictionary api and error message is:')
        console.error(error)
        return null
    }
}

// let result = isWordValid('test')
